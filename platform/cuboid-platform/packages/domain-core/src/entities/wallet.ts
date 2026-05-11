import { z } from 'zod';
import { Entity } from './base-entity';
import { EntityId } from '../value-objects/entity-id';
import { TimestampLike } from '../value-objects/timestamp';
import { Currency, CurrencyLike } from '../value-objects/currency';

export const LedgerTypeSchema = z.enum(['OPERATIONAL', 'ESCROW', 'RESERVE', 'SETTLEMENT']);
export type LedgerType = z.infer<typeof LedgerTypeSchema>;

export const WalletStatusSchema = z.enum(['ACTIVE', 'FROZEN', 'CLOSED', 'LIMITED']);
export type WalletStatus = z.infer<typeof WalletStatusSchema>;

export interface WalletProps {
  id: string;
  organizationId: string;
  userId?: string;
  currency: string;
  ledgerType: LedgerType;
  balance: string;
  availableBalance: string;
  reservedBalance: string;
  status: WalletStatus;
  freezeReason?: string;
  dailyLimit?: string;
  monthlyLimit?: string;
  createdAt: string;
  updatedAt: string;
}

export const WalletSchema = z.object({
  id: z.string(),
  organizationId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  currency: z.string().length(3).toUpperCase(),
  ledgerType: LedgerTypeSchema,
  balance: z.string(),
  availableBalance: z.string(),
  reservedBalance: z.string(),
  status: WalletStatusSchema,
  freezeReason: z.string().max(500).optional(),
  dailyLimit: z.string().optional(),
  monthlyLimit: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type WalletData = z.infer<typeof WalletSchema>;

export class Wallet extends Entity<WalletProps> {
  protected get entityType(): string {
    return 'wallet';
  }

  private constructor(
    id: EntityId,
    private _props: WalletProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    organizationId: string;
    userId?: string;
    currency: CurrencyLike;
    ledgerType?: LedgerType;
  }): Wallet {
    const currency = data.currency instanceof Currency 
      ? data.currency 
      : Currency.create(data.currency);
    
    const now = new Date().toISOString();
    const props: WalletProps = {
      id: '',
      organizationId: data.organizationId,
      userId: data.userId,
      currency: currency.value,
      ledgerType: data.ledgerType ?? 'OPERATIONAL',
      balance: '0',
      availableBalance: '0',
      reservedBalance: '0',
      status: 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    };
    return new Wallet(EntityId.create('wallet'), props);
  }

  static fromData(data: WalletData): Wallet {
    return new Wallet(
      EntityId.create('wallet', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get organizationId(): string {
    return this._props.organizationId;
  }

  get userId(): string | undefined {
    return this._props.userId;
  }

  get currency(): string {
    return this._props.currency;
  }

  get ledgerType(): LedgerType {
    return this._props.ledgerType;
  }

  get balance(): string {
    return this._props.balance;
  }

  get availableBalance(): string {
    return this._props.availableBalance;
  }

  get reservedBalance(): string {
    return this._props.reservedBalance;
  }

  get status(): WalletStatus {
    return this._props.status;
  }

  get freezeReason(): string | undefined {
    return this._props.freezeReason;
  }

  get dailyLimit(): string | undefined {
    return this._props.dailyLimit;
  }

  get monthlyLimit(): string | undefined {
    return this._props.monthlyLimit;
  }

  isActive(): boolean {
    return this._props.status === 'ACTIVE';
  }

  isFrozen(): boolean {
    return this._props.status === 'FROZEN';
  }

  isOperational(): boolean {
    return this._props.status === 'ACTIVE' && this._props.ledgerType === 'OPERATIONAL';
  }

  canDebit(amount: bigint): boolean {
    if (this.isFrozen()) return false;
    const available = BigInt(this._props.availableBalance);
    return available >= amount;
  }

  freeze(reason: string): void {
    if (this._props.status === 'ACTIVE') {
      this._props.status = 'FROZEN';
      this._props.freezeReason = reason;
      this.markUpdated();
    }
  }

  unfreeze(): void {
    if (this._props.status === 'FROZEN') {
      this._props.status = 'ACTIVE';
      this._props.freezeReason = undefined;
      this.markUpdated();
    }
  }

  close(): void {
    if (this._props.status !== 'CLOSED' && BigInt(this._props.balance) === 0n) {
      this._props.status = 'CLOSED';
      this.markUpdated();
    }
  }

  credit(amount: bigint): void {
    const newBalance = BigInt(this._props.balance) + amount;
    this._props.balance = newBalance.toString();
    this._props.availableBalance = newBalance.toString();
    this.markUpdated();
  }

  debit(amount: bigint): void {
    if (!this.canDebit(amount)) {
      throw new Error('Insufficient available balance');
    }
    const newBalance = BigInt(this._props.balance) - amount;
    const newAvailable = BigInt(this._props.availableBalance) - amount;
    this._props.balance = newBalance.toString();
    this._props.availableBalance = newAvailable.toString();
    this.markUpdated();
  }

  reserve(amount: bigint): void {
    const available = BigInt(this._props.availableBalance);
    if (available < amount) {
      throw new Error('Insufficient available balance to reserve');
    }
    const newReserved = BigInt(this._props.reservedBalance) + amount;
    const newAvailable = available - amount;
    this._props.reservedBalance = newReserved.toString();
    this._props.availableBalance = newAvailable.toString();
    this.markUpdated();
  }

  release(amount: bigint): void {
    const reserved = BigInt(this._props.reservedBalance);
    if (reserved < amount) {
      throw new Error('Cannot release more than reserved');
    }
    const newReserved = reserved - amount;
    const newAvailable = BigInt(this._props.availableBalance) + amount;
    this._props.reservedBalance = newReserved.toString();
    this._props.availableBalance = newAvailable.toString();
    this.markUpdated();
  }

  toJSON(): WalletProps {
    return {
      ...this._props,
      id: this._id.value,
    };
  }

  toData(): WalletData {
    return WalletSchema.parse(this.toJSON());
  }
}