import crypto from 'crypto';

export interface PaystackProvider {
  name: string;
  initializeTransaction(amount: number, email: string, currency?: string, metadata?: Record<string, string>): Promise<TransactionInitialize>;
  verifyTransaction(reference: string): Promise<TransactionVerify>;
  createTransferRecipient(name: string, accountNumber: string, bankCode: string, currency?: string): Promise<TransferRecipient>;
  initiateTransfer(amount: number, recipient: string, reference?: string): Promise<Transfer>;
  createVirtualAccount(businessName: string, customerEmail: string, bankCode?: string): Promise<VirtualAccount>;
  getBanks(): Promise<Bank[]>;
  createCustomer(email: string, firstName?: string, lastName?: string, phone?: string): Promise<Customer>;
  chargeAuthorization(email: string, authorizationCode: string, amount: number, reference?: string): Promise<Charge>;
}

export interface TransactionInitialize {
  reference: string;
  authorizationUrl: string;
  accessCode: string;
  amount: number;
}

export interface TransactionVerify {
  reference: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed';
  customer: { email: string; phone?: string };
  authorization: Authorization;
}

export interface Authorization {
  authorizationCode: string;
  cardType: string;
  last4: string;
  expMonth: string;
  expYear: string;
}

export interface TransferRecipient {
  recipientCode: string;
  type: 'account' | 'mobile_money';
  name: string;
  accountNumber?: string;
  bankCode?: string;
  bankName?: string;
}

export interface Transfer {
  reference: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  recipient: string;
}

export interface VirtualAccount {
  accountNumber: string;
  accountStatus: string;
  accountId: string;
  frequency: string;
  bankName: string;
  bankCode: string;
  customer: { email: string; name?: string };
}

export interface Bank {
  code: string;
  name: string;
  type: string;
  currency?: string;
}

export interface Customer {
  email: string;
  customerCode: string;
  id: number;
}

export interface Charge {
  reference: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
}

export class PaystackProviderImpl implements PaystackProvider {
  name = 'paystack';
  private baseUrl = 'https://api.paystack.co';
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  private async request<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT', body?: object): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Paystack API error');
    }
    return data.data;
  }

  async initializeTransaction(amount: number, email: string, currency: string = 'NGN', metadata?: Record<string, string>): Promise<TransactionInitialize> {
    return this.request('/transaction/initialize', 'POST', {
      amount: Math.round(amount * 100),
      email,
      currency,
      metadata,
    });
  }

  async verifyTransaction(reference: string): Promise<TransactionVerify> {
    return this.request(`/transaction/verify/${reference}`, 'GET');
  }

  async createTransferRecipient(name: string, accountNumber: string, bankCode: string, currency: string = 'NGN'): Promise<TransferRecipient> {
    return this.request('/transferrecipient', 'POST', {
      type: 'account',
      name,
      account_number: accountNumber,
      bank_code: bankCode,
      currency,
    });
  }

  async initiateTransfer(amount: number, recipient: string, reference?: string): Promise<Transfer> {
    return this.request('/transfer', 'POST', {
      amount: Math.round(amount * 100),
      recipient,
      reference,
    });
  }

  async createVirtualAccount(businessName: string, customerEmail: string, bankCode?: string): Promise<VirtualAccount> {
    return this.request('/dedicated_account', 'POST', {
      business_name: businessName,
      customer_email: customerEmail,
      bank_code: bankCode,
      preferred_bank: bankCode,
    });
  }

  async getBanks(): Promise<Bank[]> {
    const response = await fetch(`${this.baseUrl}/bank?country=nigeria`, {
      headers: { Authorization: `Bearer ${this.secretKey}` },
    });
    const data = await response.json();
    return data.data;
  }

  async createCustomer(email: string, firstName?: string, lastName?: string, phone?: string): Promise<Customer> {
    return this.request('/customer', 'POST', {
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
    });
  }

  async chargeAuthorization(email: string, authorizationCode: string, amount: number, reference?: string): Promise<Charge> {
    return this.request('/charge_authorization', 'POST', {
      email,
      authorization_code: authorizationCode,
      amount: Math.round(amount * 100),
      reference,
    });
  }
}

export class PaystackPaymentService {
  private provider: PaystackProviderImpl;
  private transactions: Map<string, PaymentTransactionRecord> = new Map();

  constructor(secretKey: string) {
    this.provider = new PaystackProviderImpl(secretKey);
  }

  getProvider() {
    return this.provider;
  }

  async initializePayment(amount: number, email: string, currency?: string, metadata?: Record<string, string>): Promise<TransactionInitialize> {
    const result = await this.provider.initializeTransaction(amount, email, currency, metadata);
    
    const tx: PaymentTransactionRecord = {
      id: crypto.randomUUID(),
      reference: result.reference,
      provider: 'paystack',
      amount,
      currency: currency ?? 'NGN',
      email,
      status: 'pending',
      metadata,
      createdAt: new Date().toISOString(),
    };
    this.transactions.set(tx.id, tx);
    
    return result;
  }

  async verifyPayment(reference: string): Promise<TransactionVerify> {
    const result = await this.provider.verifyTransaction(reference);
    
    for (const [id, tx] of this.transactions) {
      if (tx.reference === reference) {
        tx.status = result.status === 'success' ? 'paid' : 'failed';
        tx.updatedAt = new Date().toISOString();
      }
    }
    
    return result;
  }

  async createPayout(accountName: string, accountNumber: string, bankCode: string, amount: number, currency?: string): Promise<Transfer> {
    const recipient = await this.provider.createTransferRecipient(accountName, accountNumber, bankCode, currency);
    return this.provider.initiateTransfer(amount, recipient.recipientCode);
  }

  async createVirtualAccount(businessName: string, customerEmail: string): Promise<VirtualAccount> {
    return this.provider.createVirtualAccount(businessName, customerEmail);
  }

  async getTransactionByReference(reference: string): Promise<PaymentTransactionRecord | undefined> {
    return Array.from(this.transactions.values()).find(tx => tx.reference === reference);
  }

  async chargeSavedCard(email: string, authorizationCode: string, amount: number): Promise<Charge> {
    return this.provider.chargeAuthorization(email, authorizationCode, amount);
  }
}

export interface PaymentTransactionRecord {
  id: string;
  reference: string;
  provider: string;
  amount: number;
  currency: string;
  email: string;
  status: 'pending' | 'paid' | 'failed';
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt?: string;
}

export default PaystackPaymentService;