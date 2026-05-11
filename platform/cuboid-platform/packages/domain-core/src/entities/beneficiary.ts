import { z } from 'zod';
import { Entity } from './base-entity';
import { EntityId } from '../value-objects/entity-id';
import { TimestampLike } from '../value-objects/timestamp';
import { MoneyAddress } from '../value-objects/money-address';

export const BeneficiaryTypeSchema = z.enum(['INDIVIDUAL', 'BUSINESS', 'INSTITUTIONAL']);
export type BeneficiaryType = z.infer<typeof BeneficiaryTypeSchema>;

export const BeneficiaryStatusSchema = z.enum(['PENDING', 'VERIFIED', 'SUSPENDED', 'DELETED']);
export type BeneficiaryStatus = z.infer<typeof BeneficiaryStatusSchema>;

export interface BeneficiaryProps {
  id: string;
  organizationId: string;
  type: BeneficiaryType;
  name: string;
  email?: string;
  phoneNumber?: string;
  country: string;
  address?: {
    streetLine1: string;
    streetLine2?: string;
    city: string;
    stateProvince?: string;
    postalCode?: string;
    country: string;
  };
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    routingNumber?: string;
    bankCode?: string;
    branchCode?: string;
    swiftCode?: string;
    iban?: string;
  };
  mobileMoneyAccount?: {
    provider: string;
    phoneNumber: string;
  };
  trustScore: number;
  status: BeneficiaryStatus;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export const BeneficiarySchema = z.object({
  id: z.string(),
  organizationId: z.string().uuid(),
  type: BeneficiaryTypeSchema,
  name: z.string().min(1).max(200),
  email: z.string().email().optional(),
  phoneNumber: z.string().max(20).optional(),
  country: z.string().length(2).toUpperCase(),
  address: z.object({
    streetLine1: z.string().min(1).max(200),
    streetLine2: z.string().max(200).optional(),
    city: z.string().min(1).max(100),
    stateProvince: z.string().max(100).optional(),
    postalCode: z.string().max(20).optional(),
    country: z.string().length(2).toUpperCase(),
  }).optional(),
  bankAccount: z.object({
    bankName: z.string().min(1).max(200),
    accountNumber: z.string().min(1).max(50),
    accountName: z.string().min(1).max(100),
    routingNumber: z.string().max(20).optional(),
    bankCode: z.string().max(20).optional(),
    branchCode: z.string().max(20).optional(),
    swiftCode: z.string().optional(),
    iban: z.string().max(42).optional(),
  }).optional(),
  mobileMoneyAccount: z.object({
    provider: z.string().min(1).max(50),
    phoneNumber: z.string().min(1).max(20),
  }).optional(),
  trustScore: z.number().min(0).max(100),
  status: BeneficiaryStatusSchema,
  isFavorite: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type BeneficiaryData = z.infer<typeof BeneficiarySchema>;

export class Beneficiary extends Entity<BeneficiaryProps> {
  protected get entityType(): string { return 'beneficiary'; }

  private constructor(
    id: EntityId,
    private _props: BeneficiaryProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    organizationId: string;
    type: BeneficiaryType;
    name: string;
    email?: string;
    phoneNumber?: string;
    country: string;
    bankAccount?: BeneficiaryProps['bankAccount'];
    mobileMoneyAccount?: BeneficiaryProps['mobileMoneyAccount'];
  }): Beneficiary {
    const now = new Date().toISOString();
    const props: BeneficiaryProps = {
      id: '',
      organizationId: data.organizationId,
      type: data.type,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      country: data.country.toUpperCase(),
      trustScore: 0,
      status: 'PENDING',
      isFavorite: false,
      bankAccount: data.bankAccount,
      mobileMoneyAccount: data.mobileMoneyAccount,
      createdAt: now,
      updatedAt: now,
    };
    return new Beneficiary(EntityId.create('beneficiary'), props);
  }

  static fromData(data: BeneficiaryData): Beneficiary {
    return new Beneficiary(
      EntityId.create('beneficiary', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get organizationId() { return this._props.organizationId; }
  get type() { return this._props.type; }
  get name() { return this._props.name; }
  get email() { return this._props.email; }
  get phoneNumber() { return this._props.phoneNumber; }
  get country() { return this._props.country; }
  get trustScore() { return this._props.trustScore; }
  get status() { return this._props.status; }
  get isFavorite() { return this._props.isFavorite; }

  isVerified(): boolean { return this._props.status === 'VERIFIED'; }
  isActive(): boolean { return this._props.status === 'VERIFIED'; }

  verify(): void {
    if (this._props.status === 'PENDING') {
      this._props.status = 'VERIFIED';
      this.markUpdated();
    }
  }

  suspend(): void {
    if (this._props.status === 'VERIFIED') {
      this._props.status = 'SUSPENDED';
      this.markUpdated();
    }
  }

  setFavorite(favorite: boolean): void {
    this._props.isFavorite = favorite;
    this.markUpdated();
  }

  setTrustScore(score: number): void {
    this._props.trustScore = Math.min(100, Math.max(0, score));
    this.markUpdated();
  }

  toJSON(): BeneficiaryProps {
    return { ...this._props, id: this._id.value };
  }

  toData(): BeneficiaryData {
    return BeneficiarySchema.parse(this.toJSON());
  }
}