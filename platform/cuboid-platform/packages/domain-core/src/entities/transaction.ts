import { z } from 'zod';
import { Entity } from './base-entity.js';
import { EntityIdLike } from '../value-objects/entity-id.js';
import { TimestampLike } from '../value-objects/timestamp.js';

export const TransactionTypeSchema = z.enum([
  'PAYOUT', 'COLLECTION', 'TRANSFER', 'EXCHANGE', 'REFUND', 'REVERSAL'
]);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const TransactionStatusSchema = z.enum([
  'PENDING', 'VERIFIED', 'FUNDED', 'PROCESSING', 
  'SETTLED', 'FAILED', 'RETURNED', 'DISPUTED', 'CANCELLED'
]);
export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

export const TransactionDirectionSchema = z.enum(['CREDIT', 'DEBIT']);
export type TransactionDirection = z.infer<typeof TransactionDirectionSchema>;

export const SettlementModeSchema = z.enum([
  'IMMEDIATE', 'SCHEDULED', 'BATCH', 'ESCROW'
]);
export type SettlementMode = z.infer<typeof SettlementModeSchema>;

export interface TransactionProps {
  id: string;
  type: TransactionType;
  direction: TransactionDirection;
  sourceWalletId?: string;
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
  quoteId?: string;
  reference: string;
  description?: string;
  status: TransactionStatus;
  settlementMode: SettlementMode;
  settlementDeadline?: string;
  initiatedAt: string;
  verifiedAt?: string;
  fundedAt?: string;
  processingAt?: string;
  settledAt?: string;
  failedAt?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export const TransactionSchema = z.object({
  id: z.string(),
  type: TransactionTypeSchema,
  direction: TransactionDirectionSchema,
  sourceWalletId: z.string().uuid().optional(),
  destinationWalletId: z.string().uuid().optional(),
  sourceCorridor: z.string(),
  destinationCorridor: z.string().optional(),
  sourceAmount: z.string(),
  sourceCurrency: z.string().length(3).toUpperCase(),
  destinationAmount: z.string(),
  destinationCurrency: z.string().length(3).toUpperCase(),
  exchangeRate: z.string(),
  spread: z.string(),
  fees: z.string(),
  partnerId: z.string().uuid().optional(),
  quoteId: z.string().uuid().optional(),
  reference: z.string(),
  description: z.string().max(500).optional(),
  status: TransactionStatusSchema,
  settlementMode: SettlementModeSchema,
  settlementDeadline: z.string().datetime().optional(),
  initiatedAt: z.string().datetime(),
  verifiedAt: z.string().datetime().optional(),
  fundedAt: z.string().datetime().optional(),
  processingAt: z.string().datetime().optional(),
  settledAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  failureReason: z.string().max(1000).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TransactionData = z.infer<typeof TransactionSchema>;

export class Transaction extends Entity<TransactionProps> {
  protected get entityType(): string {
    return 'transaction';
  }

  private constructor(
    id: EntityIdLike,
    private _props: TransactionProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    type: TransactionType;
    direction: TransactionDirection;
    sourceWalletId?: string;
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
    quoteId?: string;
    reference: string;
    description?: string;
    settlementMode?: SettlementMode;
    settlementDeadline?: string;
  }): Transaction {
    const now = new Date().toISOString();
    const props: TransactionProps = {
      id: '',
      type: data.type,
      direction: data.direction,
      sourceWalletId: data.sourceWalletId,
      destinationWalletId: data.destinationWalletId,
      sourceCorridor: data.sourceCorridor,
      destinationCorridor: data.destinationCorridor,
      sourceAmount: data.sourceAmount,
      sourceCurrency: data.sourceCurrency.toUpperCase(),
      destinationAmount: data.destinationAmount,
      destinationCurrency: data.destinationCurrency.toUpperCase(),
      exchangeRate: data.exchangeRate,
      spread: data.spread,
      fees: data.fees,
      partnerId: data.partnerId,
      quoteId: data.quoteId,
      reference: data.reference,
      description: data.description,
      status: 'PENDING',
      settlementMode: data.settlementMode ?? 'IMMEDIATE',
      settlementDeadline: data.settlementDeadline,
      initiatedAt: now,
      createdAt: now,
      updatedAt: now,
    };
    return new Transaction(EntityId.create('transaction'), props);
  }

  static fromData(data: TransactionData): Transaction {
    return new Transaction(
      EntityId.create('transaction', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get type(): TransactionType { return this._props.type; }
  get direction(): TransactionDirection { return this._props.direction; }
  get sourceWalletId(): string | undefined { return this._props.sourceWalletId; }
  get destinationWalletId(): string | undefined { return this._props.destinationWalletId; }
  get sourceCorridor(): string { return this._props.sourceCorridor; }
  get destinationCorridor(): string | undefined { return this._props.destinationCorridor; }
  get sourceAmount(): string { return this._props.sourceAmount; }
  get sourceCurrency(): string { return this._props.sourceCurrency; }
  get destinationAmount(): string { return this._props.destinationAmount; }
  get destinationCurrency(): string { return this._props.destinationCurrency; }
  get exchangeRate(): string { return this._props.exchangeRate; }
  get fees(): string { return this._props.fees; }
  get reference(): string { return this._props.reference; }
  get status(): TransactionStatus { return this._props.status; }
  get settlementMode(): SettlementMode { return this._props.settlementMode; }

  get initiatedAt(): string { return this._props.initiatedAt; }
  get verifiedAt(): string | undefined { return this._props.verifiedAt; }
  get fundedAt(): string | undefined { return this._props.fundedAt; }
  get settledAt(): string | undefined { return this._props.settledAt; }
  get failedAt(): string | undefined { return this._props.failedAt; }
  get failureReason(): string | undefined { return this._props.failureReason; }

  isPending(): boolean { return this._props.status === 'PENDING'; }
  isSettled(): boolean { return this._props.status === 'SETTLED'; }
  isFailed(): boolean { return this._props.status === 'FAILED'; }
  isTerminal(): boolean {
    return ['SETTLED', 'FAILED', 'RETURNED', 'DISPUTED', 'CANCELLED'].includes(this._props.status);
  }

  verify(): void {
    if (this._props.status === 'PENDING') {
      this._props.status = 'VERIFIED';
      this._props.verifiedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  fund(): void {
    if (this._props.status === 'VERIFIED') {
      this._props.status = 'FUNDED';
      this._props.fundedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  process(): void {
    if (this._props.status === 'FUNDED') {
      this._props.status = 'PROCESSING';
      this._props.processingAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  settle(): void {
    if (this._props.status === 'PROCESSING') {
      this._props.status = 'SETTLED';
      this._props.settledAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  fail(reason: string): void {
    if (!this.isTerminal()) {
      this._props.status = 'FAILED';
      this._props.failedAt = new Date().toISOString();
      this._props.failureReason = reason;
      this.markUpdated();
    }
  }

  cancel(): void {
    if (['PENDING', 'VERIFIED'].includes(this._props.status)) {
      this._props.status = 'CANCELLED';
      this.markUpdated();
    }
  }

  toJSON(): TransactionProps {
    return { ...this._props, id: this._id.value };
  }

  toData(): TransactionData {
    return TransactionSchema.parse(this.toJSON());
  }
}