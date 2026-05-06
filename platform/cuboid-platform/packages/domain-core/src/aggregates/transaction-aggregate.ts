import { Transaction, TransactionProps, TransactionStatus, TransactionType, TransactionDirection } from '../entities/transaction.js';
import { Quote } from '../entities/quote.js';
import { Wallet } from '../entities/wallet.js';
import { DomainEvent, createDomainEvent } from '../events/base-event.js';

export interface TransactionAggregateState {
  transaction: TransactionProps;
  quote?: Quote['props'];
  ledgerEntries: { id: string; type: string; amount: string }[];
  settlementId?: string;
  escrowId?: string;
}

export class TransactionAggregate {
  private transaction: Transaction;
  private quote?: Quote;
  private ledgerEntries: { id: string; type: string; amount: string; walletId: string }[] = [];
  private events: DomainEvent[] = [];

  constructor(transaction: Transaction, quote?: Quote) {
    this.transaction = transaction;
    this.quote = quote;
  }

  static createPayout(data: {
    sourceWallet: Wallet;
    destinationWalletId?: string;
    sourceCorridor: string;
    destinationCorridor?: string;
    sourceAmount: string;
    sourceCurrency: string;
    destinationAmount: string;
    destinationCurrency: string;
    exchangeRate: string;
    spread: string;
    fees: string;
    partnerId?: string;
    reference: string;
    description?: string;
    settlementMode?: 'IMMEDIATE' | 'SCHEDULED' | 'BATCH' | 'ESCROW';
    quote?: Quote;
  }): TransactionAggregate {
    const transaction = Transaction.create({
      type: 'PAYOUT',
      direction: 'DEBIT',
      sourceWalletId: data.sourceWallet.id.value,
      destinationWalletId: data.destinationWalletId,
      sourceCorridor: data.sourceCorridor,
      destinationCorridor: data.destinationCorridor,
      sourceAmount: data.sourceAmount,
      sourceCurrency: data.sourceCurrency,
      destinationAmount: data.destinationAmount,
      destinationCurrency: data.destinationCurrency,
      exchangeRate: data.exchangeRate,
      spread: data.spread,
      fees: data.fees,
      partnerId: data.partnerId,
      quoteId: data.quote?.id.value,
      reference: data.reference,
      description: data.description,
      settlementMode: data.settlementMode ?? 'IMMEDIATE',
    });

    const aggregate = new TransactionAggregate(transaction, data.quote);
    aggregate.addEvent(createDomainEvent(
      'TRANSACTION_CREATED',
      transaction.id.value,
      'transaction',
      { ...transaction.toJSON() }
    ));

    return aggregate;
  }

  private addEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  verify(): void {
    if (!this.transaction.isPending()) {
      throw new Error('Transaction cannot be verified in current state');
    }

    this.transaction.verify();
    this.addEvent(createDomainEvent(
      'TRANSACTION_VERIFIED',
      this.transaction.id.value,
      'transaction',
      { status: 'VERIFIED' }
    ));
  }

  fund(): void {
    if (!this.transaction.isPending() && this.transaction.status !== 'VERIFIED') {
      throw new Error('Transaction cannot be funded in current state');
    }

    this.transaction.fund();
    this.addEvent(createDomainEvent(
      'TRANSACTION_FUNDED',
      this.transaction.id.value,
      'transaction',
      { status: 'FUNDED' }
    ));
  }

  process(): void {
    if (this.transaction.status !== 'FUNDED') {
      throw new Error('Transaction must be funded before processing');
    }

    this.transaction.process();
    this.addEvent(createDomainEvent(
      'TRANSACTION_PROCESSING',
      this.transaction.id.value,
      'transaction',
      { status: 'PROCESSING' }
    ));
  }

  settle(): void {
    if (this.transaction.status !== 'PROCESSING') {
      throw new Error('Transaction must be processing before settlement');
    }

    this.transaction.settle();
    this.addEvent(createDomainEvent(
      'TRANSACTION_SETTLED',
      this.transaction.id.value,
      'transaction',
      { status: 'SETTLED', settledAt: new Date().toISOString() }
    ));
  }

  fail(reason: string): void {
    if (this.transaction.isTerminal()) {
      throw new Error('Transaction is already in terminal state');
    }

    this.transaction.fail(reason);
    this.addEvent(createDomainEvent(
      'TRANSACTION_FAILED',
      this.transaction.id.value,
      'transaction',
      { status: 'FAILED', failureReason: reason }
    ));
  }

  cancel(): void {
    if (!this.transaction.isPending() && this.transaction.status !== 'VERIFIED') {
      throw new Error('Transaction can only be cancelled in pending or verified state');
    }

    this.transaction.cancel();
    this.addEvent(createDomainEvent(
      'TRANSACTION_CANCELLED',
      this.transaction.id.value,
      'transaction',
      { status: 'CANCELLED' }
    ));
  }

  addLedgerEntry(walletId: string, type: string, amount: string): void {
    this.ledgerEntries.push({ id: `le_${Date.now()}`, type, amount, walletId });
    this.addEvent(createDomainEvent(
      'TRANSACTION_CREATED',
      this.transaction.id.value,
      'ledger_entry',
      { walletId, type, amount }
    ));
  }

  getEvents(): DomainEvent[] {
    return this.events;
  }

  clearEvents(): void {
    this.events = [];
  }

  getState(): TransactionAggregateState {
    return {
      transaction: this.transaction.toJSON(),
      quote: this.quote?.toJSON(),
      ledgerEntries: this.ledgerEntries,
    };
  }

  getTransaction(): Transaction {
    return this.transaction;
  }

  getQuote(): Quote | undefined {
    return this.quote;
  }
}