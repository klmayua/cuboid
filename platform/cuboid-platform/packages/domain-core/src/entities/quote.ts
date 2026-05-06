import { z } from 'zod';
import { Entity } from './base-entity.js';
import { EntityIdLike } from '../value-objects/entity-id.js';
import { TimestampLike } from '../value-objects/timestamp.js';

export const QuoteStatusSchema = z.enum(['PENDING', 'LOCKED', 'ACCEPTED', 'EXPIRED', 'FAILED']);
export type QuoteStatus = z.infer<typeof QuoteStatusSchema>;

export interface QuoteProps {
  id: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: string;
  targetAmount: string;
  rate: string;
  spread: string;
  fees: string;
  expirationSeconds: number;
  lockedAt?: string;
  acceptedAt?: string;
  expiredAt?: string;
  status: QuoteStatus;
  partnerId?: string;
  corridorId: string;
  createdAt: string;
  updatedAt: string;
}

export const QuoteSchema = z.object({
  id: z.string(),
  sourceCurrency: z.string().length(3).toUpperCase(),
  targetCurrency: z.string().length(3).toUpperCase(),
  sourceAmount: z.string(),
  targetAmount: z.string(),
  rate: z.string(),
  spread: z.string(),
  fees: z.string(),
  expirationSeconds: z.number().int().positive(),
  lockedAt: z.string().datetime().optional(),
  acceptedAt: z.string().datetime().optional(),
  expiredAt: z.string().datetime().optional(),
  status: QuoteStatusSchema,
  partnerId: z.string().uuid().optional(),
  corridorId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type QuoteData = z.infer<typeof QuoteSchema>;

export class Quote extends Entity<QuoteProps> {
  protected get entityType(): string { return 'quote'; }

  private constructor(
    id: EntityIdLike,
    private _props: QuoteProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    sourceCurrency: string;
    targetCurrency: string;
    sourceAmount: string;
    targetAmount: string;
    rate: string;
    spread: string;
    fees: string;
    expirationSeconds: number;
    partnerId?: string;
    corridorId: string;
  }): Quote {
    const now = new Date().toISOString();
    const props: QuoteProps = {
      id: '',
      sourceCurrency: data.sourceCurrency.toUpperCase(),
      targetCurrency: data.targetCurrency.toUpperCase(),
      sourceAmount: data.sourceAmount,
      targetAmount: data.targetAmount,
      rate: data.rate,
      spread: data.spread,
      fees: data.fees,
      expirationSeconds: data.expirationSeconds,
      status: 'PENDING',
      partnerId: data.partnerId,
      corridorId: data.corridorId,
      createdAt: now,
      updatedAt: now,
    };
    return new Quote(EntityId.create('quote'), props);
  }

  static fromData(data: QuoteData): Quote {
    return new Quote(
      EntityId.create('quote', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get sourceCurrency() { return this._props.sourceCurrency; }
  get targetCurrency() { return this._props.targetCurrency; }
  get sourceAmount() { return this._props.sourceAmount; }
  get targetAmount() { return this._props.targetAmount; }
  get rate() { return this._props.rate; }
  get fees() { return this._props.fees; }
  get status() { return this._props.status; }
  get corridorId() { return this._props.corridorId; }

  isExpired(): boolean {
    if (this._props.status === 'EXPIRED') return true;
    if (this._props.status !== 'PENDING' && this._props.status !== 'LOCKED') return false;
    const created = new Date(this._props.createdAt).getTime();
    const now = Date.now();
    return now > created + this._props.expirationSeconds * 1000;
  }

  isValid(): boolean {
    return ['PENDING', 'LOCKED'].includes(this._props.status) && !this.isExpired();
  }

  lock(): void {
    if (this._props.status === 'PENDING') {
      this._props.status = 'LOCKED';
      this._props.lockedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  accept(): void {
    if (this.isValid()) {
      this._props.status = 'ACCEPTED';
      this._props.acceptedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  expire(): void {
    if (['PENDING', 'LOCKED'].includes(this._props.status)) {
      this._props.status = 'EXPIRED';
      this._props.expiredAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  toJSON(): QuoteProps {
    return { ...this._props, id: this._id.value };
  }

  toData(): QuoteData {
    return QuoteSchema.parse(this.toJSON());
  }
}