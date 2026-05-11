import { z } from 'zod';
import { Entity, DomainEvent } from './base-entity';
import { EntityId } from '../value-objects/entity-id';
import { TimestampLike } from '../value-objects/timestamp';
import { AddressValue, Address } from '../value-objects/address';

export const UserVerificationTierSchema = z.enum(['NONE', 'BASIC', 'ENHANCED', 'FULL']);
export type UserVerificationTier = z.infer<typeof UserVerificationTierSchema>;

export const UserStatusSchema = z.enum(['PENDING', 'ACTIVE', 'SUSPENDED', 'DELETED']);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export interface UserProps {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  status: UserStatus;
  verificationTier: UserVerificationTier;
  organizationId?: string;
  kycLevel: number;
  riskScore: number;
  lastLoginAt?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().min(1).max(100),
  phoneNumber: z.string().max(20).optional(),
  status: UserStatusSchema,
  verificationTier: UserVerificationTierSchema,
  organizationId: z.string().uuid().optional(),
  kycLevel: z.number().min(0).max(10),
  riskScore: z.number().min(0).max(100),
  lastLoginAt: z.string().datetime().optional(),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  mfaEnabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserData = z.infer<typeof UserSchema>;

export class User extends Entity<UserProps> {
  protected get entityType(): string {
    return 'user';
  }

  private constructor(
    id: EntityId,
    private _props: UserProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    email: string;
    displayName: string;
    phoneNumber?: string;
  }): User {
    const now = new Date().toISOString();
    const props: UserProps = {
      id: '',
      email: data.email.toLowerCase(),
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
      status: 'PENDING',
      verificationTier: 'NONE',
      organizationId: undefined,
      kycLevel: 0,
      riskScore: 0,
      emailVerified: false,
      phoneVerified: false,
      mfaEnabled: false,
      createdAt: now,
      updatedAt: now,
    };
    return new User(EntityId.create('user'), props);
  }

  static fromData(data: UserData): User {
    return new User(
      EntityId.create('user', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get email(): string {
    return this._props.email;
  }

  get displayName(): string {
    return this._props.displayName;
  }

  get phoneNumber(): string | undefined {
    return this._props.phoneNumber;
  }

  get status(): UserStatus {
    return this._props.status;
  }

  get verificationTier(): UserVerificationTier {
    return this._props.verificationTier;
  }

  get organizationId(): string | undefined {
    return this._props.organizationId;
  }

  get kycLevel(): number {
    return this._props.kycLevel;
  }

  get riskScore(): number {
    return this._props.riskScore;
  }

  get lastLoginAt(): string | undefined {
    return this._props.lastLoginAt;
  }

  get emailVerified(): boolean {
    return this._props.emailVerified;
  }

  get phoneVerified(): boolean {
    return this._props.phoneVerified;
  }

  get mfaEnabled(): boolean {
    return this._props.mfaEnabled;
  }

  isActive(): boolean {
    return this._props.status === 'ACTIVE';
  }

  isVerified(): boolean {
    return this._props.verificationTier !== 'NONE';
  }

  activate(): void {
    if (this._props.status === 'PENDING') {
      this._props.status = 'ACTIVE';
      this.markUpdated();
    }
  }

  suspend(): void {
    if (this._props.status === 'ACTIVE') {
      this._props.status = 'SUSPENDED';
      this.markUpdated();
    }
  }

  verifyEmail(): void {
    this._props.emailVerified = true;
    this._props.updatedAt = new Date().toISOString();
  }

  verifyPhone(): void {
    this._props.phoneVerified = true;
    this._props.updatedAt = new Date().toISOString();
  }

  enableMfa(): void {
    this._props.mfaEnabled = true;
    this.markUpdated();
  }

  recordLogin(): void {
    this._props.lastLoginAt = new Date().toISOString();
    this.markUpdated();
  }

  setKycLevel(level: number): void {
    this._props.kycLevel = Math.min(10, Math.max(0, level));
    this.markUpdated();
  }

  setRiskScore(score: number): void {
    this._props.riskScore = Math.min(100, Math.max(0, score));
    this.markUpdated();
  }

  toJSON(): UserProps {
    return {
      ...this._props,
      id: this._id.value,
    };
  }

  toData(): UserData {
    return UserSchema.parse(this.toJSON());
  }
}