import { z } from 'zod';
import { EntityId, Timestamp } from '../value-objects/index.js';

export const DomainEventTypeSchema = z.enum([
  'USER_CREATED',
  'USER_UPDATED',
  'USER_VERIFIED',
  'USER_SUSPENDED',
  'USER_DELETED',
  'ORGANIZATION_CREATED',
  'ORGANIZATION_UPDATED',
  'ORGANIZATION_VERIFIED',
  'ORGANIZATION_SUSPENDED',
  'WALLET_CREATED',
  'WALLET_CREDITED',
  'WALLET_DEBITED',
  'WALLET_RESERVED',
  'WALLET_RELEASED',
  'WALLET_FROZEN',
  'WALLET_UNFROZEN',
  'TRANSACTION_CREATED',
  'TRANSACTION_VERIFIED',
  'TRANSACTION_FUNDED',
  'TRANSACTION_PROCESSING',
  'TRANSACTION_SETTLED',
  'TRANSACTION_FAILED',
  'TRANSACTION_CANCELLED',
  'TRANSACTION_DISPUTED',
  'QUOTE_REQUESTED',
  'QUOTE_GENERATED',
  'QUOTE_LOCKED',
  'QUOTE_ACCEPTED',
  'QUOTE_EXPIRED',
  'ESCROW_CREATED',
  'ESCROW_ACTIVATED',
  'ESCROW_CONDITION_FULFILLED',
  'ESCROW_COMPLETED',
  'ESCROW_RELEASED',
  'ESCROW_RETURNED',
  'ESCROW_DISPUTED',
  'BENEFICIARY_CREATED',
  'BENEFICIARY_VERIFIED',
  'BENEFICIARY_SUSPENDED',
  'PARTNER_CREATED',
  'PARTNER_APPROVED',
  'PARTNER_SUSPENDED',
  'PARTNER_RESTRICTED',
  'COMPLIANCE_CASE_CREATED',
  'COMPLIANCE_CASE_ASSIGNED',
  'COMPLIANCE_CASE_ESCALATED',
  'COMPLIANCE_CASE_RESOLVED',
  'COMPLIANCE_CASE_CLOSED',
  'TRUST_SCORE_UPDATED',
  'RISK_SIGNAL_GENERATED',
  'AUDIT_EVENT',
]);

export type DomainEventType = z.infer<typeof DomainEventTypeSchema>;

export interface DomainEventProps<T = unknown> {
  id: string;
  type: DomainEventType;
  aggregateId: string;
  aggregateType: string;
  payload: T;
  metadata?: Record<string, unknown>;
  occurredAt: string;
  version: number;
}

export const DomainEventSchema = z.object({
  id: z.string().min(1),
  type: DomainEventTypeSchema,
  aggregateId: z.string().min(1),
  aggregateType: z.string().min(1),
  payload: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
  occurredAt: z.string().datetime(),
  version: z.number().int().positive(),
});

export type DomainEventData = z.infer<typeof DomainEventSchema>;

export abstract class DomainEvent<T = unknown> {
  protected readonly _id: string;
  protected readonly _type: DomainEventType;
  protected readonly _aggregateId: string;
  protected readonly _aggregateType: string;
  protected readonly _payload: T;
  protected readonly _metadata?: Record<string, unknown>;
  protected readonly _occurredAt: Timestamp;
  protected readonly _version: number;

  constructor(props: DomainEventProps<T>) {
    this._id = props.id;
    this._type = props.type;
    this._aggregateId = props.aggregateId;
    this._aggregateType = props.aggregateType;
    this._payload = props.payload;
    this._metadata = props.metadata;
    this._occurredAt = Timestamp.fromISO(props.occurredAt);
    this._version = props.version;
  }

  get id(): string { return this._id; }
  get type(): DomainEventType { return this._type; }
  get aggregateId(): string { return this._aggregateId; }
  get aggregateType(): string { return this._aggregateType; }
  get payload(): T { return this._payload; }
  get metadata(): Record<string, unknown> | undefined { return this._metadata; }
  get occurredAt(): Timestamp { return this._occurredAt; }
  get version(): number { return this._version; }

  toJSON(): DomainEventProps<T> {
    return {
      id: this._id,
      type: this._type,
      aggregateId: this._aggregateId,
      aggregateType: this._aggregateType,
      payload: this._payload,
      metadata: this._metadata,
      occurredAt: this._occurredAt.toISO(),
      version: this._version,
    };
  }

  toData(): DomainEventData {
    return DomainEventSchema.parse(this.toJSON());
  }
}

export function createDomainEvent<T>(
  type: DomainEventType,
  aggregateId: string,
  aggregateType: string,
  payload: T,
  metadata?: Record<string, unknown>,
  version: number = 1
): DomainEventProps<T> {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    type,
    aggregateId,
    aggregateType,
    payload,
    metadata,
    occurredAt: new Date().toISOString(),
    version,
  };
}