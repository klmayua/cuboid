import { v4 as uuidv4 } from 'uuid';
import { TransactionSchema, type Transaction } from '@cuboid/schemas';

export interface TransactionRepository {
  create(data: {
    sourceWalletId: string;
    destinationWalletId?: string;
    amount: string;
    currency: string;
    corridor: string;
    sourceCorridor?: string;
    destinationCorridor?: string;
    partnerId?: string;
    quoteId?: string;
    fees?: string;
    exchangeRate?: string;
    estimatedSettlement?: string;
  }): Promise<Transaction>;
  get(id: string): Promise<Transaction | null>;
  getByWallet(walletId: string): Promise<Transaction[]>;
  update(id: string, data: Partial<Transaction>): Promise<Transaction>;
  updateStatus(id: string, status: Transaction['status']): Promise<Transaction>;
}

class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Map<string, Transaction> = new Map();

  async create(data: {
    sourceWalletId: string;
    destinationWalletId?: string;
    amount: string;
    currency: string;
    corridor: string;
    sourceCorridor?: string;
    destinationCorridor?: string;
    partnerId?: string;
    quoteId?: string;
    fees?: string;
    exchangeRate?: string;
    estimatedSettlement?: string;
  }): Promise<Transaction> {
    const now = new Date().toISOString();
    const tx: Transaction = {
      id: uuidv4(),
      sourceWalletId: data.sourceWalletId,
      destinationWalletId: data.destinationWalletId,
      amount: data.amount,
      currency: data.currency.toUpperCase(),
      corridor: data.corridor,
      status: 'PENDING',
      sourceCorridor: data.sourceCorridor,
      destinationCorridor: data.destinationCorridor,
      partnerId: data.partnerId,
      quoteId: data.quoteId,
      fees: data.fees,
      exchangeRate: data.exchangeRate,
      estimatedSettlement: data.estimatedSettlement,
      createdAt: now,
      updatedAt: now,
    };
    this.transactions.set(tx.id, tx);
    return tx;
  }

  async get(id: string): Promise<Transaction | null> {
    return this.transactions.get(id) ?? null;
  }

  async getByWallet(walletId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      tx => tx.sourceWalletId === walletId || tx.destinationWalletId === walletId
    );
  }

  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const tx = await this.get(id);
    if (!tx) throw new Error('Transaction not found');
    const updated = { ...tx, ...data, updatedAt: new Date().toISOString() };
    this.transactions.set(id, updated);
    return updated;
  }

  async updateStatus(id: string, status: Transaction['status']): Promise<Transaction> {
    return this.update(id, { status });
  }
}

const TRANSITION_MATRIX: Record<Transaction['status'], Transaction['status'][]> = {
  PENDING: ['VERIFIED', 'FAILED'],
  VERIFIED: ['FUNDED', 'FAILED'],
  FUNDED: ['PROCESSING', 'FAILED'],
  PROCESSING: ['SETTLED', 'RETURNED', 'FAILED'],
  SETTLED: ['RETURNED', 'DISPUTED'],
  RETURNED: [],
  FAILED: ['RETURNED'],
  DISPUTED: ['SETTLED', 'RETURNED'],
};

export class TransactionService {
  private repository: TransactionRepository;

  constructor(repository: TransactionRepository = new InMemoryTransactionRepository()) {
    this.repository = repository;
  }

  async createTransaction(data: {
    sourceWalletId: string;
    destinationWalletId?: string;
    amount: string;
    currency: string;
    corridor: string;
    sourceCorridor?: string;
    destinationCorridor?: string;
    partnerId?: string;
    quoteId?: string;
    fees?: string;
    exchangeRate?: string;
    estimatedSettlement?: string;
  }): Promise<Transaction> {
    return this.repository.create(data);
  }

  async getTransaction(id: string): Promise<Transaction | null> {
    return this.repository.get(id);
  }

  async getWalletTransactions(walletId: string): Promise<Transaction[]> {
    return this.repository.getByWallet(walletId);
  }

  private isValidTransition(from: Transaction['status'], to: Transaction['status']): boolean {
    const validNextStates = TRANSITION_MATRIX[from] ?? [];
    return validNextStates.includes(to);
  }

  async transitionStatus(id: string, newStatus: Transaction['status']): Promise<Transaction> {
    const tx = await this.repository.get(id);
    if (!tx) throw new Error('Transaction not found');

    if (!this.isValidTransition(tx.status, newStatus)) {
      throw new Error(`Invalid status transition from ${tx.status} to ${newStatus}`);
    }

    return this.repository.updateStatus(id, newStatus);
  }

  async markVerified(id: string): Promise<Transaction> {
    return this.transitionStatus(id, 'VERIFIED');
  }

  async markFunded(id: string): Promise<Transaction> {
    return this.transitionStatus(id, 'FUNDED');
  }

  async markProcessing(id: string): Promise<Transaction> {
    return this.transitionStatus(id, 'PROCESSING');
  }

  async markSettled(id: string): Promise<Transaction> {
    return this.transitionStatus(id, 'SETTLED');
  }

  async markFailed(id: string): Promise<Transaction> {
    return this.transitionStatus(id, 'FAILED');
  }

  async markReturned(id: string): Promise<Transaction> {
    return this.transitionStatus(id, 'RETURNED');
  }

  async markDisputed(id: string): Promise<Transaction> {
    return this.transitionStatus(id, 'DISPUTED');
  }

  async retryFailed(id: string): Promise<Transaction> {
    return this.repository.updateStatus(id, 'PENDING');
  }

  async getTransactionTimeline(id: string): Promise<{
    current: Transaction['status'];
    history: { status: Transaction['status']; at: string }[];
  }> {
    const tx = await this.repository.get(id);
    if (!tx) throw new Error('Transaction not found');

    return {
      current: tx.status,
      history: [
        { status: 'PENDING', at: tx.createdAt },
        { status: tx.status, at: tx.updatedAt },
      ],
    };
  }
}

export default TransactionService;