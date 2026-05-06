import { z } from 'zod';

export const LedgerEntryTypeSchema = z.enum([
  'CREDIT', 'DEBIT', 'RESERVE', 'RELEASE', 'FEE', 'REFUND', 'ADJUSTMENT'
]);
export type LedgerEntryType = z.infer<typeof LedgerEntryTypeSchema>;

export interface LedgerAccount {
  id: string;
  walletId: string;
  type: 'MAIN' | 'RESERVE' | 'FEE' | 'SETTLEMENT';
  currency: string;
  balance: string;
  availableBalance: string;
  reservedBalance: string;
}

export interface LedgerEntry {
  id: string;
  accountId: string;
  transactionId: string;
  type: LedgerEntryType;
  amount: string;
  balanceAfter: string;
  reference: string;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface LedgerEntryFilter {
  accountId?: string;
  transactionId?: string;
  type?: LedgerEntryType;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
}

export interface LedgerBalance {
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
  currency: string;
  fromDate: string;
  toDate: string;
}

export interface LedgerJournalEntry {
  id: string;
  transactionId: string;
  description: string;
  entries: {
    accountId: string;
    type: LedgerEntryType;
    amount: string;
    currency: string;
  }[];
  createdAt: string;
}

export class LedgerService {
  private accounts: Map<string, LedgerAccount> = new Map();
  private entries: Map<string, LedgerEntry[]> = new Map();
  private journal: Map<string, LedgerJournalEntry> = new Map();

  createAccount(walletId: string, type: LedgerAccount['type'], currency: string): LedgerAccount {
    const account: LedgerAccount = {
      id: `acc_${walletId}_${type.toLowerCase()}`,
      walletId,
      type,
      currency,
      balance: '0',
      availableBalance: '0',
      reservedBalance: '0',
    };
    this.accounts.set(account.id, account);
    this.entries.set(account.id, []);
    return account;
  }

  getAccount(accountId: string): LedgerAccount | undefined {
    return this.accounts.get(accountId);
  }

  getAccountByWallet(walletId: string, type: LedgerAccount['type'] = 'MAIN'): LedgerAccount | undefined {
    const accountId = `acc_${walletId}_${type.toLowerCase()}`;
    return this.accounts.get(accountId);
  }

  private updateAccountBalance(accountId: string): void {
    const accountEntries = this.entries.get(accountId) ?? [];
    
    const credits = accountEntries
      .filter(e => ['CREDIT', 'RELEASE', 'REFUND'].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    const debits = accountEntries
      .filter(e => ['DEBIT', 'RESERVE', 'FEE', 'ADJUSTMENT'].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    const reserved = accountEntries
      .filter(e => e.type === 'RESERVE')
      .reduce((sum, e) => sum + BigInt(e.amount), 0n) -
      accountEntries
        .filter(e => e.type === 'RELEASE')
        .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    const account = this.accounts.get(accountId);
    if (account) {
      const total = credits - debits;
      const reservedBigInt = reserved > 0n ? reserved : 0n;
      
      account.balance = total.toString();
      account.availableBalance = (total - reservedBigInt).toString();
      account.reservedBalance = reservedBigInt.toString();
    }
  }

  recordEntry(data: {
    accountId: string;
    transactionId: string;
    type: LedgerEntryType;
    amount: string;
    reference: string;
    description?: string;
    metadata?: Record<string, unknown>;
  }): LedgerEntry {
    const account = this.accounts.get(data.accountId);
    if (!account) {
      throw new Error(`Account not found: ${data.accountId}`);
    }

    const currentBalance = BigInt(account.balance);
    const amount = BigInt(data.amount);
    
    let newBalance: bigint;
    if (['CREDIT', 'RELEASE', 'REFUND'].includes(data.type)) {
      newBalance = currentBalance + amount;
    } else if (['DEBIT', 'RESERVE', 'FEE', 'ADJUSTMENT'].includes(data.type)) {
      if (amount > currentBalance) {
        throw new Error('Insufficient balance');
      }
      newBalance = currentBalance - amount;
    } else {
      newBalance = currentBalance;
    }

    const entry: LedgerEntry = {
      id: `le_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      accountId: data.accountId,
      transactionId: data.transactionId,
      type: data.type,
      amount: data.amount,
      balanceAfter: newBalance.toString(),
      reference: data.reference,
      description: data.description,
      metadata: data.metadata,
      createdAt: new Date().toISOString(),
    };

    const accountEntries = this.entries.get(data.accountId) ?? [];
    accountEntries.push(entry);
    this.entries.set(data.accountId, accountEntries);

    this.updateAccountBalance(data.accountId);

    return entry;
  }

  recordJournalEntry(data: {
    transactionId: string;
    description: string;
    entries: {
      accountId: string;
      type: LedgerEntryType;
      amount: string;
      currency: string;
    }[];
  }): LedgerJournalEntry {
    const totalDebits = data.entries
      .filter(e => ['DEBIT', 'RESERVE', 'FEE'].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    const totalCredits = data.entries
      .filter(e => ['CREDIT', 'RELEASE', 'REFUND'].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    if (totalDebits !== totalCredits) {
      throw new Error('Journal entry must balance: debits must equal credits');
    }

    const journalEntry: LedgerJournalEntry = {
      id: `je_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      transactionId: data.transactionId,
      description: data.description,
      entries: data.entries,
      createdAt: new Date().toISOString(),
    };

    for (const je of data.entries) {
      this.recordEntry({
        accountId: je.accountId,
        transactionId: data.transactionId,
        type: je.type,
        amount: je.amount,
        reference: journalEntry.id,
        description: data.description,
      });
    }

    this.journal.set(journalEntry.id, journalEntry);
    return journalEntry;
  }

  getEntries(filter: LedgerEntryFilter): LedgerEntry[] {
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

  getBalance(accountId: string): LedgerBalance | null {
    const account = this.accounts.get(accountId);
    if (!account) {
      return null;
    }

    return {
      accountId: account.id,
      balance: account.balance,
      availableBalance: account.availableBalance,
      reservedBalance: account.reservedBalance,
      asOf: new Date().toISOString(),
    };
  }

  getStatement(accountId: string, fromDate: string, toDate: string): LedgerStatement {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error(`Account not found: ${accountId}`);
    }

    const entries = this.getEntries({
      accountId,
      fromDate,
      toDate,
      limit: 10000,
    });

    const totalCredits = entries
      .filter(e => ['CREDIT', 'RELEASE', 'REFUND'].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);
    
    const totalDebits = entries
      .filter(e => ['DEBIT', 'RESERVE', 'FEE'].includes(e.type))
      .reduce((sum, e) => sum + BigInt(e.amount), 0n);

    return {
      accountId,
      entries,
      openingBalance: (BigInt(account.balance) + totalDebits - totalCredits).toString(),
      closingBalance: account.balance,
      totalCredits: totalCredits.toString(),
      totalDebits: totalDebits.toString(),
      currency: account.currency,
      fromDate,
      toDate,
    };
  }

  reconcile(accountId: string): {
    isBalanced: boolean;
    discrepancy: string;
    lastEntryBalance: string;
    calculatedBalance: string;
  } {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error(`Account not found: ${accountId}`);
    }

    const entries = this.entries.get(accountId) ?? [];
    
    let calculatedBalance = 0n;
    for (const entry of entries.sort((a, b) => a.createdAt.localeCompare(b.createdAt))) {
      if (['CREDIT', 'RELEASE', 'REFUND'].includes(entry.type)) {
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
      lastEntryBalance: entries.length > 0 
        ? entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0].balanceAfter 
        : '0',
      calculatedBalance: calculatedBalance.toString(),
    };
  }
}

export const ledgerService = new LedgerService();