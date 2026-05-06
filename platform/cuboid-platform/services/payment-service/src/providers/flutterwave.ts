import crypto from 'crypto';

export interface FlutterwaveProvider {
  name: string;
  initializeTransaction(amount: number, currency: string, txRef: string, customer: Customer, meta?: Record<string, string>): Promise<TransactionInit>;
  verifyTransaction(transactionId: string): Promise<TransactionVerify>;
  createVirtualAccount(businessName: string, customerEmail: string, customerPhone?: string): Promise<FlutterwaveVirtualAccount>;
  createTransferRecipient(name: string, accountNumber: string, bankCode: string, currency?: string): Promise<FLWTransferRecipient>;
  initiateTransfer(amount: number, recipient: string, reference: string): Promise<FLWTransfer>;
  getBankBranches(bankCode: string): Promise<BankBranch[]>;
  resolveAccount(accountNumber: string, bankCode: string): Promise<AccountResolution>;
}

export interface Customer {
  email: string;
  name?: string;
  phone?: string;
}

export interface TransactionInit {
  id: number;
  link: string;
  txRef: string;
  amount: number;
  currency: string;
}

export interface TransactionVerify {
  id: number;
  txRef: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending';
  customer: Customer;
}

export interface FlutterwaveVirtualAccount {
  orderRef: string;
  accountNumber: string;
  accountStatus: string;
  frequency: string;
  bankName: string;
  bankCode: string;
  createdAt: string;
}

export interface FLWTransferRecipient {
  recipientCode: string;
  type: string;
  name: string;
  accountNumber: string;
  bankCode: string;
}

export interface FLWTransfer {
  id: number;
  reference: string;
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  recipient: string;
}

export interface BankBranch {
  id: number;
  name: string;
  code: string;
  swiftCode?: string;
}

export interface AccountResolution {
  accountNumber: string;
  accountName: string;
  bankCode: string;
}

export class FlutterwaveProviderImpl implements FlutterwaveProvider {
  name = 'flutterwave';
  private baseUrl = 'https://api.flutterwave.com/v3';
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  private async request<T>(endpoint: string, method: 'GET' | 'POST', body?: object): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (data.status !== 'success') {
      throw new Error(data.message || 'Flutterwave API error');
    }
    return data.data;
  }

  async initializeTransaction(amount: number, currency: string, txRef: string, customer: Customer, meta?: Record<string, string>): Promise<TransactionInit> {
    return this.request('/payments', 'POST', {
      amount,
      currency,
      tx_ref: txRef,
      customer,
      meta,
      redirect_url: `${process.env.APP_URL || 'http://localhost:3000'}/flutterwave/callback`,
    });
  }

  async verifyTransaction(transactionId: string): Promise<TransactionVerify> {
    return this.request(`/transactions/${transactionId}/verify`, 'GET');
  }

  async createVirtualAccount(businessName: string, customerEmail: string, customerPhone?: string): Promise<FlutterwaveVirtualAccount> {
    return this.request('/virtual-account-numbers', 'POST', {
      email: customerEmail,
      bvn: '',
      business_name: businessName,
      phone: customerPhone,
    });
  }

  async createTransferRecipient(name: string, accountNumber: string, bankCode: string, currency: string = 'NGN'): Promise<FLWTransferRecipient> {
    return this.request('/transfers', 'POST', {
      account_number: accountNumber,
      account_bank: bankCode,
      amount: 0,
      currency,
      reference: `rcpt_${crypto.randomUUID()}`,
      debit_currency: currency,
      recipient_type: 'account',
      recipient_name: name,
    });
  }

  async initiateTransfer(amount: number, recipient: string, reference: string): Promise<FLWTransfer> {
    return this.request('/transfers', 'POST', {
      amount,
      recipient,
      reference,
    });
  }

  async getBankBranches(bankCode: string): Promise<BankBranch[]> {
    return this.request(`/banks/${bankCode}/branches`, 'GET');
  }

  async resolveAccount(accountNumber: string, bankCode: string): Promise<AccountResolution> {
    return this.request('/accounts/resolve', 'POST', {
      account_number: accountNumber,
      account_bank: bankCode,
    });
  }
}

export class FlutterwavePaymentService {
  private provider: FlutterwaveProviderImpl;
  private transactions: Map<string, FLWTransactionRecord> = new Map();

  constructor(secretKey: string) {
    this.provider = new FlutterwaveProviderImpl(secretKey);
  }

  getProvider() {
    return this.provider;
  }

  async initializePayment(amount: number, currency: string, customer: Customer, metadata?: Record<string, string>): Promise<TransactionInit> {
    const txRef = `tx_${crypto.randomUUID()}`;
    
    const result = await this.provider.initializeTransaction(amount, currency, txRef, customer, metadata);
    
    const tx: FLWTransactionRecord = {
      id: crypto.randomUUID(),
      txRef,
      flwTransactionId: result.id.toString(),
      provider: 'flutterwave',
      amount,
      currency,
      email: customer.email,
      status: 'pending',
      metadata,
      createdAt: new Date().toISOString(),
    };
    this.transactions.set(tx.id, tx);
    
    return result;
  }

  async verifyPayment(transactionId: string): Promise<TransactionVerify> {
    const result = await this.provider.verifyTransaction(transactionId);
    
    for (const [id, tx] of this.transactions) {
      if (tx.flwTransactionId === transactionId) {
        tx.status = result.status === 'success' ? 'paid' : 'failed';
        tx.updatedAt = new Date().toISOString();
      }
    }
    
    return result;
  }

  async createPayout(accountName: string, accountNumber: string, bankCode: string, amount: number, currency?: string): Promise<FLWTransfer> {
    const recipient = await this.provider.createTransferRecipient(accountName, accountNumber, bankCode, currency);
    return this.provider.initiateTransfer(amount, recipient.recipientCode, `tx_${crypto.randomUUID()}`);
  }

  async createVirtualAccount(businessName: string, customerEmail: string, customerPhone?: string): Promise<FlutterwaveVirtualAccount> {
    return this.provider.createVirtualAccount(businessName, customerEmail, customerPhone);
  }

  async resolveAccount(accountNumber: string, bankCode: string): Promise<AccountResolution> {
    return this.provider.resolveAccount(accountNumber, bankCode);
  }

  getTransaction(id: string): FLWTransactionRecord | undefined {
    return this.transactions.get(id);
  }
}

export interface FLWTransactionRecord {
  id: string;
  txRef: string;
  flwTransactionId: string;
  provider: string;
  amount: number;
  currency: string;
  email: string;
  status: 'pending' | 'paid' | 'failed';
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt?: string;
}

export default FlutterwavePaymentService;