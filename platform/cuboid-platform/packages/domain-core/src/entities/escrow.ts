import { z } from 'zod';
import { Entity } from './base-entity';
import { EntityId } from '../value-objects/entity-id';
import { TimestampLike } from '../value-objects/timestamp';

export const EscrowStatusSchema = z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'RELEASED', 'RETURNED', 'DISPUTED', 'CANCELLED']);
export type EscrowStatus = z.infer<typeof EscrowStatusSchema>;

export const ReleaseConditionTypeSchema = z.enum(['MILESTONE', 'DATE', 'MANUAL', 'AUTO', 'MULTISIG']);
export type ReleaseConditionType = z.infer<typeof ReleaseConditionTypeSchema>;

export interface ReleaseCondition {
  id: string;
  type: ReleaseConditionType;
  description: string;
  amount?: string;
  dueDate?: string;
  fulfilled: boolean;
  fulfilledAt?: string;
}

export interface EscrowProps {
  id: string;
  transactionId: string;
  walletId: string;
  amount: string;
  currency: string;
  status: EscrowStatus;
  releaseConditions: ReleaseCondition[];
  releasedAt?: string;
  returnedAt?: string;
  disputedAt?: string;
  disputeReason?: string;
  createdAt: string;
  updatedAt: string;
}

export const EscrowSchema = z.object({
  id: z.string(),
  transactionId: z.string().uuid(),
  walletId: z.string().uuid(),
  amount: z.string(),
  currency: z.string().length(3).toUpperCase(),
  status: EscrowStatusSchema,
  releaseConditions: z.array(z.object({
    id: z.string(),
    type: ReleaseConditionTypeSchema,
    description: z.string(),
    amount: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    fulfilled: z.boolean(),
    fulfilledAt: z.string().datetime().optional(),
  })),
  releasedAt: z.string().datetime().optional(),
  returnedAt: z.string().datetime().optional(),
  disputedAt: z.string().datetime().optional(),
  disputeReason: z.string().max(1000).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type EscrowData = z.infer<typeof EscrowSchema>;

export class Escrow extends Entity<EscrowProps> {
  protected get entityType(): string { return 'escrow'; }

  private constructor(
    id: EntityId,
    private _props: EscrowProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    transactionId: string;
    walletId: string;
    amount: string;
    currency: string;
    releaseConditions: Omit<ReleaseCondition, 'id' | 'fulfilled'>[];
  }): Escrow {
    const now = new Date().toISOString();
    const props: EscrowProps = {
      id: '',
      transactionId: data.transactionId,
      walletId: data.walletId,
      amount: data.amount,
      currency: data.currency.toUpperCase(),
      status: 'PENDING',
      releaseConditions: data.releaseConditions.map((rc, i) => ({
        ...rc,
        id: `rc_${i}`,
        fulfilled: false,
      })),
      createdAt: now,
      updatedAt: now,
    };
    return new Escrow(EntityId.create('escrow'), props);
  }

  static fromData(data: EscrowData): Escrow {
    return new Escrow(
      EntityId.create('escrow', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get transactionId() { return this._props.transactionId; }
  get walletId() { return this._props.walletId; }
  get amount() { return this._props.amount; }
  get currency() { return this._props.currency; }
  get status() { return this._props.status; }
  get releaseConditions() { return this._props.releaseConditions; }

  isActive(): boolean { return this._props.status === 'ACTIVE'; }
  isCompleted(): boolean { return this._props.status === 'COMPLETED'; }
  isDisputed(): boolean { return this._props.status === 'DISPUTED'; }

  activate(): void {
    if (this._props.status === 'PENDING') {
      this._props.status = 'ACTIVE';
      this.markUpdated();
    }
  }

  fulfillCondition(conditionId: string): void {
    const condition = this._props.releaseConditions.find(c => c.id === conditionId);
    if (condition && !condition.fulfilled) {
      condition.fulfilled = true;
      condition.fulfilledAt = new Date().toISOString();
      this.markUpdated();
      this.checkCompletion();
    }
  }

  private checkCompletion(): void {
    const allFulfilled = this._props.releaseConditions.every(c => c.fulfilled);
    if (allFulfilled && this._props.status === 'ACTIVE') {
      this._props.status = 'COMPLETED';
      this.markUpdated();
    }
  }

  release(): void {
    if (this._props.status === 'COMPLETED' || this._props.status === 'ACTIVE') {
      this._props.status = 'RELEASED';
      this._props.releasedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  return(): void {
    if (['PENDING', 'ACTIVE'].includes(this._props.status)) {
      this._props.status = 'RETURNED';
      this._props.returnedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  dispute(reason: string): void {
    if (!['RELEASED', 'RETURNED'].includes(this._props.status)) {
      this._props.status = 'DISPUTED';
      this._props.disputedAt = new Date().toISOString();
      this._props.disputeReason = reason;
      this.markUpdated();
    }
  }

  toJSON(): EscrowProps {
    return { ...this._props, id: this._id.value };
  }

  toData(): EscrowData {
    return EscrowSchema.parse(this.toJSON());
  }
}