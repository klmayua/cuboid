import { z } from 'zod';
import { Entity } from './base-entity.js';
import { EntityIdLike } from '../value-objects/entity-id.js';
import { TimestampLike } from '../value-objects/timestamp.js';

export const OrganizationTypeSchema = z.enum(['RETAIL', 'BUSINESS', 'INSTITUTIONAL']);
export type OrganizationType = z.infer<typeof OrganizationTypeSchema>;

export const OrganizationVerificationTierSchema = z.enum(['NONE', 'BASIC', 'ENHANCED', 'FULL']);
export type OrganizationVerificationTier = z.infer<typeof OrganizationVerificationTierSchema>;

export const OrganizationStatusSchema = z.enum(['PENDING', 'ACTIVE', 'SUSPENDED', 'CLOSED']);
export type OrganizationStatus = z.infer<typeof OrganizationStatusSchema>;

export interface OrganizationProps {
  id: string;
  legalName: string;
  displayName: string;
  type: OrganizationType;
  status: OrganizationStatus;
  verificationTier: OrganizationVerificationTier;
  country: string;
  registrationNumber?: string;
  taxId?: string;
  website?: string;
  trustScore: number;
  riskScore: number;
  parentOrganizationId?: string;
  createdAt: string;
  updatedAt: string;
}

export const OrganizationSchema = z.object({
  id: z.string(),
  legalName: z.string().min(1),
  displayName: z.string().min(1).max(100),
  type: OrganizationTypeSchema,
  status: OrganizationStatusSchema,
  verificationTier: OrganizationVerificationTierSchema,
  country: z.string().length(2).toUpperCase(),
  registrationNumber: z.string().max(50).optional(),
  taxId: z.string().max(50).optional(),
  website: z.string().url().optional(),
  trustScore: z.number().min(0).max(100),
  riskScore: z.number().min(0).max(100),
  parentOrganizationId: z.string().uuid().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type OrganizationData = z.infer<typeof OrganizationSchema>;

export class Organization extends Entity<OrganizationProps> {
  protected get entityType(): string {
    return 'organization';
  }

  private constructor(
    id: EntityIdLike,
    private _props: OrganizationProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    legalName: string;
    displayName?: string;
    type: OrganizationType;
    country: string;
    registrationNumber?: string;
    taxId?: string;
    website?: string;
  }): Organization {
    const now = new Date().toISOString();
    const props: OrganizationProps = {
      id: '',
      legalName: data.legalName,
      displayName: data.displayName ?? data.legalName,
      type: data.type,
      status: 'PENDING',
      verificationTier: 'NONE',
      country: data.country.toUpperCase(),
      registrationNumber: data.registrationNumber,
      taxId: data.taxId,
      website: data.website,
      trustScore: 0,
      riskScore: 0,
      createdAt: now,
      updatedAt: now,
    };
    return new Organization(EntityId.create('organization'), props);
  }

  static fromData(data: OrganizationData): Organization {
    return new Organization(
      EntityId.create('organization', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get legalName(): string {
    return this._props.legalName;
  }

  get displayName(): string {
    return this._props.displayName;
  }

  get type(): OrganizationType {
    return this._props.type;
  }

  get status(): OrganizationStatus {
    return this._props.status;
  }

  get verificationTier(): OrganizationVerificationTier {
    return this._props.verificationTier;
  }

  get country(): string {
    return this._props.country;
  }

  get registrationNumber(): string | undefined {
    return this._props.registrationNumber;
  }

  get taxId(): string | undefined {
    return this._props.taxId;
  }

  get trustScore(): number {
    return this._props.trustScore;
  }

  get riskScore(): number {
    return this._props.riskScore;
  }

  get parentOrganizationId(): string | undefined {
    return this._props.parentOrganizationId;
  }

  isActive(): boolean {
    return this._props.status === 'ACTIVE';
  }

  isVerified(): boolean {
    return this._props.verificationTier !== 'NONE';
  }

  isInstitutional(): boolean {
    return this._props.type === 'INSTITUTIONAL';
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

  close(): void {
    this._props.status = 'CLOSED';
    this.markUpdated();
  }

  updateVerificationTier(tier: OrganizationVerificationTier): void {
    this._props.verificationTier = tier;
    this.markUpdated();
  }

  setTrustScore(score: number): void {
    this._props.trustScore = Math.min(100, Math.max(0, score));
    this.markUpdated();
  }

  setRiskScore(score: number): void {
    this._props.riskScore = Math.min(100, Math.max(0, score));
    this.markUpdated();
  }

  toJSON(): OrganizationProps {
    return {
      ...this._props,
      id: this._id.value,
    };
  }

  toData(): OrganizationData {
    return OrganizationSchema.parse(this.toJSON());
  }
}