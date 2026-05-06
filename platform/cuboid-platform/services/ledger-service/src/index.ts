import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'ledger-service' });

export enum LedgerEntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  RESERVE = 'RESERVE',
  RELEASE = 'RELEASE',
  FEE = 'FEE',
  REFUND = 'REFUND',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum LedgerAccountType {
  MAIN = 'MAIN',
  RESERVE = 'RESERVE',
  FEE = 'FEE',
  SETTLEMENT = 'SETTLEMENT',
  ESCROW = 'ESCROW',
}

export enum LedgerAccountStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
}

export interface LedgerAccount {
  id: string;
  walletId: string;
  type: LedgerAccountType;
  currency: string;
  balance: string;
  availableBalance: string;
  reservedBalance: string;
  status: LedgerAccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LedgerEntry {
  id: string;
  accountId: string;
  transactionId: string;
  journalEntryId?: string;
  type: LedgerEntryType;
  amount: string;
  balanceAfter: string;
  reference: string;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface LedgerJournalEntry {
  id: string;
  transactionId: string;
  description: string;
  entries: {
    accountId: string;
    accountType: LedgerAccountType;
    type: LedgerEntryType;
    amount: string;
    currency: string;
  }[];
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface BalanceSnapshot {
  accountId: string;
  balance: string;
  availableBalance: string;
  reservedBalance: string;
  asOf: string;
}

export interface LedgerStatement {
  accountId: string;
  entries: LedgerEntry[];
  openingBalance: string;
  closingBalance: string;
  totalCredits: string;
  totalDebits: string;
  netChange: string;
  currency: string;
  fromDate: string;
  toDate: string;
}

export interface CreateAccountParams {
  walletId: string;
  type: LedgerAccountType;
  currency: string;
}

export interface RecordEntryParams {
  accountId: string;
  transactionId: string;
  type: LedgerEntryType;
  amount: string;
  reference: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateJournalEntryParams {
  transactionId: string;
  description: string;
  entries: {
    accountId: string;
    accountType: LedgerAccountType;
    type: LedgerEntryType;
    amount: string;
    currency: string;
  }[];
  metadata?: Record<string, unknown>;
}

export interface EntryFilter {
  accountId?: string;
  transactionId?: string;
  type?: LedgerEntryType;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
}

export class LedgerService {
  private accounts: Map<string, LedgerAccount> = new Map();
  private entries: Map<string, LedgerEntry[]> = new Map();
  private journals: Map<string, LedgerJournalEntry> = new Map();
  private balanceCache: Map<string, BalanceSnapshot> = new Map();

  async initialize(): Promise<void> {
    logger.info('Ledger service initialized');
  }

  async createAccount(params: CreateAccountParams): Promise<LedgerAccount> {
    const accountId = `acc_${params.walletId}_${params.type.toLowerCase()}`;
    
    if (this.accounts.has(accountId)) {
      throw new Error(`Account already exists: ${accountId}`);
    }

    const account: LedgerAccount = {
      id: accountId,
      walletId: params.walletId,
      type: params.type,
      currency: params.currency.toUpperCase(),
      balance: '0',
      availableBalance: '0',
      reservedBalance: '0',
      status: LedgerAccountStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.accounts.set(accountId, account);
    this.entries.set(accountId, []);
    
    logger.info({ accountId: account.id, walletId: params.walletId, type: params.type }, 'Account created');
    
    return account;
  }

  async getAccount(accountId: string): Promise<LedgerAccount | null> {
    return this.accounts.get(accountId) ?? null;
  }

  async getAccountByWallet(walletId: string, type: LedgerAccountType = LedgerAccountType.MAIN): Promise<LedgerAccount | null> {
    const accountId = `acc_${walletId}_${type.toLowerCase()}`;
    return this.accounts.get(accountId) ?? null;
  }

  async getOrCreateAccount(params: CreateAccountParams): Promise<LedgerAccount> {
    const accountId = `acc_${params.walletId}_${params.type.toLowerCase()}`;
    const existing = this.accounts.get(accountId);
    
    if (existing) {
      return existing;
    }

    return this.createAccount(params);
  }

  private updateAccountBalance(accountId: string): LedgerAccount | null {
    const account = this.accounts.get(accountId);
    if (!account) return null;

    const accountEntries = this.entries.get(accountId) ?? [];
    
    let credits = 0n;
    let debits = 0n;
    let reserved = 0n;

    for (const entry of accountEntries) {
      if ([LedgerEntryType.CREDIT, LedgerEntryType.RELEASE, LedgerEntryType.REFUND].includes(entry.type)) {
        credits += BigInt(entry.amount);
      }
      if ([LedgerEntryType.DEBIT, LedgerEntryType.FEE, LedgerEntryType.ADJUSTMENT].includes(entry.type)) {
        debits += BigInt(entry.amount);
      }
      if (entry.type === LedgerEntryType.RESERVE) {
        reserved += BigInt(entry.amount);
      }
    }

    const released = accountEntries
      .filter(e => e.type === LedgerEntryType.RELEASE)
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    reserved = reserved - released;

    const total = credits - debits;
    const reservedAmount = reserved > 0n ? reserved : 0n;
    
    account.balance = total.toString();
    account.availableBalance = (total - reservedAmount).toString();
    account.reservedBalance = reservedAmount.toString();
    account.updatedAt = new Date().toISOString();

    this.balanceCache.set(accountId, {
      accountId: account.id,
      balance: account.balance,
      availableBalance: account.availableBalance,
      reservedBalance: account.reservedBalance,
      asOf: new Date().toISOString(),
    });

    return account;
  }

  async recordEntry(params: RecordEntryParams): Promise<LedgerEntry> {
    const account = this.accounts.get(params.accountId);
    
    if (!account) {
      throw new Error(`Account not found: ${params.accountId}`);
    }

    if (account.status === LedgerAccountStatus.CLOSED) {
      throw new Error(`Cannot record entry on closed account: ${params.accountId}`);
    }

    if (account.status === LedgerAccountStatus.FROZEN) {
      if (params.type !== LedgerEntryType.RELEASE) {
        throw new Error(`Cannot record entry on frozen account: ${params.accountId}`);
      }
    }

    const amount = BigInt(params.amount);
    
    if (amount <= 0n) {
      throw new Error('Amount must be positive');
    }

    if ([LedgerEntryType.DEBIT, LedgerEntryType.RESERVE, LedgerEntryType.FEE].includes(params.type)) {
      const currentBalance = BigInt(account.availableBalance);
      if (currentBalance < amount) {
        throw new Error(
          `Insufficient available balance: have ${currentBalance}, need ${amount}`
        );
      }
    }

    const currentBalance = BigInt(account.balance);
    let newBalance: bigint;
    
    if ([LedgerEntryType.CREDIT, LedgerEntryType.RELEASE, LedgerEntryType.REFUND].includes(params.type)) {
      newBalance = currentBalance + amount;
    } else if ([LedgerEntryType.DEBIT, LedgerEntryType.RESERVE, LedgerEntryType.FEE, LedgerEntryType.ADJUSTMENT].includes(params.type)) {
      newBalance = currentBalance - amount;
    } else {
      newBalance = currentBalance;
    }

    const entry: LedgerEntry = {
      id: `le_${uuidv4()}`,
      accountId: params.accountId,
      transactionId: params.transactionId,
      type: params.type,
      amount: params.amount,
      balanceAfter: newBalance.toString(),
      reference: params.reference,
      description: params.description,
      metadata: params.metadata,
      createdAt: new Date().toISOString(),
    };

    const accountEntries = this.entries.get(params.accountId) ?? [];
    accountEntries.push(entry);
    this.entries.set(params.accountId, accountEntries);

    this.updateAccountBalance(params.accountId);

    logger.info(
      { entryId: entry.id, accountId: params.accountId, type: params.type, amount: params.amount },
      'Ledger entry recorded'
    );

    return entry;
  }

  async recordJournalEntry(params: CreateJournalEntryParams): Promise<LedgerJournalEntry> {
    const journalEntries = params.entries;
    
    const totalDebits = journalEntries
      .filter(e => [LedgerEntryType.DEBIT, LedgerEntryType.RESERVE, LedgerEntryType.FEE].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    const totalCredits = journalEntries
      .filter(e => [LedgerEntryType.CREDIT, LedgerEntryType.RELEASE, LedgerEntryType.REFUND].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);

    if (totalDebits !== totalCredits) {
      throw new Error(
        `Journal entry must balance: debits (${totalDebits}) must equal credits (${totalCredits})`
      );
    }

    const journalEntry: LedgerJournalEntry = {
      id: `je_${uuidv4()}`,
      transactionId: params.transactionId,
      description: params.description,
      entries: journalEntries,
      metadata: params.metadata,
      createdAt: new Date().toISOString(),
    };

    for (const je of journalEntries) {
      await this.recordEntry({
        accountId: je.accountId,
        transactionId: params.transactionId,
        type: je.type,
        amount: je.amount,
        reference: journalEntry.id,
        description: params.description,
        metadata: { ...params.metadata, journalEntryId: journalEntry.id },
      });
    }

    this.journals.set(journalEntry.id, journalEntry);

    logger.info(
      { journalId: journalEntry.id, transactionId: params.transactionId, entryCount: journalEntries.length },
      'Journal entry created'
    );

    return journalEntry;
  }

  async getEntries(filter: EntryFilter): Promise<LedgerEntry[]> {
    let allEntries: LedgerEntry[] = [];
    
    if (filter.accountId) {
      allEntries = this.entries.get(filter.accountId) ?? [];
    } else {
      for (const entries of this.entries.values()) {
        allEntries = allEntries.concat(entries);
      }
    }

    let filtered = allEntries;

    if (filter.transactionId) {
      filtered = filtered.filter(e => e.transactionId === filter.transactionId);
    }

    if (filter.type) {
      filtered = filtered.filter(e => e.type === filter.type);
    }

    if (filter.fromDate) {
      filtered = filtered.filter(e => e.createdAt >= filter.fromDate!);
    }

    if (filter.toDate) {
      filtered = filtered.filter(e => e.createdAt <= filter.toDate!);
    }

    filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const offset = filter.offset ?? 0;
    const limit = filter.limit ?? 100;
    
    return filtered.slice(offset, offset + limit);
  }

  async getBalance(accountId: string): Promise<BalanceSnapshot | null> {
    const cached = this.balanceCache.get(accountId);
    if (cached) {
      return cached;
    }

    const account = this.accounts.get(accountId);
    if (!account) {
      return null;
    }

    this.updateAccountBalance(accountId);
    
    return this.balanceCache.get(accountId) ?? null;
  }

  async getStatement(accountId: string, fromDate: string, toDate: string): Promise<LedgerStatement> {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error(`Account not found: ${accountId}`);
    }

    const entries = await this.getEntries({
      accountId,
      fromDate,
      toDate,
      limit: 10000,
    });

    const totalCredits = entries
      .filter(e => [LedgerEntryType.CREDIT, LedgerEntryType.RELEASE, LedgerEntryType.REFUND].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    const totalDebits = entries
      .filter(e => [LedgerEntryType.DEBIT, LedgerEntryType.RESERVE, LedgerEntryType.FEE].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);

    const lastEntryBalance = entries.length > 0 
      ? entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0].balanceAfter 
      : '0';
    
    const openingBalance = (BigInt(lastEntryBalance) + totalDebits - totalCredits).toString();

    return {
      accountId,
      entries,
      openingBalance,
      closingBalance: account.balance,
      totalCredits: totalCredits.toString(),
      totalDebits: totalDebits.toString(),
      netChange: (totalCredits - totalDebits).toString(),
      currency: account.currency,
      fromDate,
      toDate,
    };
  }

  async reconcile(accountId: string): Promise<{
    isBalanced: boolean;
    discrepancy: string;
    calculatedBalance: string;
    actualBalance: string;
    entryCount: number;
  }> {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error(`Account not found: ${accountId}`);
    }

    const entries = this.entries.get(accountId) ?? [];
    
    let calculatedBalance = 0n;
    const sortedEntries = [...entries].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    
    for (const entry of sortedEntries) {
      if ([LedgerEntryType.CREDIT, LedgerEntryType.RELEASE, LedgerEntryType.REFUND].includes(entry.type)) {
        calculatedBalance += BigInt(entry.amount);
      } else {
        calculatedBalance -= BigInt(entry.amount);
      }
    }

    const actualBalance = BigInt(account.balance);
    const isBalanced = calculatedBalance === actualBalance;

    return {
      isBalanced,
      discrepancy: (actualBalance - calculatedBalance).toString(),
      calculatedBalance: calculatedBalance.toString(),
      actualBalance: account.balance,
      entryCount: entries.length,
    };
  }

  async freezeAccount(accountId: string): Promise<LedgerAccount | null> {
    const account = this.accounts.get(accountId);
    if (!account) return null;

    if (account.status === LedgerAccountStatus.CLOSED) {
      throw new Error('Cannot freeze closed account');
    }

    account.status = LedgerAccountStatus.FROZEN;
    account.updatedAt = new Date().toISOString();
    
    logger.info({ accountId }, 'Account frozen');
    
    return account;
  }

  async unfreezeAccount(accountId: string): Promise<LedgerAccount | null> {
    const account = this.accounts.get(accountId);
    if (!account) return null;

    if (account.status !== LedgerAccountStatus.FROZEN) {
      return account;
    }

    account.status = LedgerAccountStatus.ACTIVE;
    account.updatedAt = new Date().toISOString();
    
    logger.info({ accountId }, 'Account unfrozen');
    
    return account;
  }

  async closeAccount(accountId: string): Promise<LedgerAccount | null> {
    const account = this.accounts.get(accountId);
    if (!account) return null;

    if (BigInt(account.balance) !== 0n) {
      throw new Error('Cannot close account with non-zero balance');
    }

    account.status = LedgerAccountStatus.CLOSED;
    account.updatedAt = new Date().toISOString();
    
    logger.info({ accountId }, 'Account closed');
    
    return account;
  }

  async getAccountsByWallet(walletId: string): Promise<LedgerAccount[]> {
    const accounts: LedgerAccount[] = [];
    
    for (const account of this.accounts.values()) {
      if (account.walletId === walletId) {
        accounts.push(account);
      }
    }

    return accounts;
  }

  async getAllAccounts(): Promise<LedgerAccount[]> {
    return Array.from(this.accounts.values());
  }

  async getAccountCount(): Promise<number> {
    return this.accounts.size;
  }

  async getJournalEntry(journalId: string): Promise<LedgerJournalEntry | null> {
    return this.journals.get(journalId) ?? null;
  }

  async getJournalEntriesByTransaction(transactionId: string): Promise<LedgerJournalEntry[]> {
    const journals: LedgerJournalEntry[] = [];
    
    for (const journal of this.journals.values()) {
      if (journal.transactionId === transactionId) {
        journals.push(journal);
      }
    }

    return journals;
  }
}

export const ledgerService = new LedgerService();

if (require.main === module) {
  (async () => {
    await ledgerService.initialize();
    logger.info('Ledger service running');
  })();
}