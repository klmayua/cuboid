import { z } from 'zod';
import { Entity } from './base-entity.js';
import { EntityIdLike } from '../value-objects/entity-id.js';
import { TimestampLike } from '../value-objects/timestamp.js';

export const PartnerTypeSchema = z.enum(['BANK', 'IMTO', 'BDC', 'SWITCH', 'PAYMENT_PROCESSOR', 'CORRESPONDENT']);
export type PartnerType = z.infer<typeof PartnerTypeSchema>;

export const PartnerStatusSchema = z.enum(['APPLIED', 'REVIEWING', 'DUE_DILIGENCE', 'TECHNICAL_VALIDATION', 'APPROVED', 'SANDBOX', 'PRODUCTION', 'RESTRICTED', 'SUSPENDED', 'TERMINATED']);
export type PartnerStatus = z.infer<typeof PartnerStatusSchema>;

export const PartnerCapabilitySchema = z.enum(['QUOTE', 'FUND', 'HOLD', 'TRANSFER', 'PAYOUT', 'CONFIRM', 'REVERSE', 'RECONCILE', 'REPORT', 'FX']);
export type PartnerCapability = z.infer<typeof PartnerCapabilitySchema>;

export interface PartnerProps {
  id: string;
  legalName: string;
  displayName: string;
  type: PartnerType;
  status: PartnerStatus;
  country: string;
  supportedCorridors: string[];
  supportedCurrencies: string[];
  capabilities: PartnerCapability[];
  trustScore: number;
  riskScore: number;
  dailyLimit: string;
  monthlyLimit: string;
  technicalContact?: string;
  businessContact?: string;
  webhookUrl?: string;
  apiVersion: string;
  createdAt: string;
  updatedAt: string;
}

export const PartnerSchema = z.object({
  id: z.string(),
  legalName: z.string().min(1).max(200),
  displayName: z.string().min(1).max(100),
  type: PartnerTypeSchema,
  status: PartnerStatusSchema,
  country: z.string().length(2).toUpperCase(),
  supportedCorridors: z.array(z.string()),
  supportedCurrencies: z.array(z.string().length(3)),
  capabilities: z.array(PartnerCapabilitySchema),
  trustScore: z.number().min(0).max(100),
  riskScore: z.number().min(0).max(100),
  dailyLimit: z.string(),
  monthlyLimit: z.string(),
  technicalContact: z.string().email().optional(),
  businessContact: z.string().email().optional(),
  webhookUrl: z.string().url().optional(),
  apiVersion: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PartnerData = z.infer<typeof PartnerSchema>;

export class Partner extends Entity<PartnerProps> {
  protected get entityType(): string { return 'partner'; }

  private constructor(
    id: EntityIdLike,
    private _props: PartnerProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    legalName: string;
    displayName?: string;
    type: PartnerType;
    country: string;
    supportedCorridors?: string[];
    supportedCurrencies?: string[];
    capabilities?: PartnerCapability[];
    technicalContact?: string;
    businessContact?: string;
    webhookUrl?: string;
  }): Partner {
    const now = new Date().toISOString();
    const props: PartnerProps = {
      id: '',
      legalName: data.legalName,
      displayName: data.displayName ?? data.legalName,
      type: data.type,
      status: 'APPLIED',
      country: data.country.toUpperCase(),
      supportedCorridors: data.supportedCorridors ?? [],
      supportedCurrencies: data.supportedCurrencies ?? [],
      capabilities: data.capabilities ?? [],
      trustScore: 0,
      riskScore: 0,
      dailyLimit: '0',
      monthlyLimit: '0',
      technicalContact: data.technicalContact,
      businessContact: data.businessContact,
      webhookUrl: data.webhookUrl,
      apiVersion: 'v1',
      createdAt: now,
      updatedAt: now,
    };
    return new Partner(EntityId.create('partner'), props);
  }

  static fromData(data: PartnerData): Partner {
    return new Partner(
      EntityId.create('partner', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get legalName() { return this._props.legalName; }
  get displayName() { return this._props.displayName; }
  get type() { return this._props.type; }
  get status() { return this._props.status; }
  get country() { return this._props.country; }
  get supportedCorridors() { return this._props.supportedCorridors; }
  get supportedCurrencies() { return this._props.supportedCurrencies; }
  get capabilities() { return this._props.capabilities; }
  get trustScore() { return this._props.trustScore; }
  get riskScore() { return this._props.riskScore; }

  isActive(): boolean {
    return ['APPROVED', 'SANDBOX', 'PRODUCTION'].includes(this._props.status);
  }

  supportsCorridor(corridorId: string): boolean {
    return this._props.supportedCorridors.includes(corridorId);
  }

  supportsCurrency(currency: string): boolean {
    return this._props.supportedCurrencies.includes(currency.toUpperCase());
  }

  hasCapability(capability: PartnerCapability): boolean {
    return this._props.capabilities.includes(capability);
  }

  approve(status: 'APPROVED' | 'SANDBOX' | 'PRODUCTION' = 'APPROVED'): void {
    this._props.status = status;
    this.markUpdated();
  }

  suspend(): void {
    if (this.isActive()) {
      this._props.status = 'SUSPENDED';
      this.markUpdated();
    }
  }

  restrict(): void {
    if (this.isActive()) {
      this._props.status = 'RESTRICTED';
      this.markUpdated();
    }
  }

  setTrustScore(score: number): void {
    this._props.trustScore = Math.min(100, Math.max(0, score));
    this.markUpdated();
  }

  setRiskScore(score: number): void {
    this._props.riskScore = Math.min(100, Math.max(0, score));
    this.markUpdated();
  }

  toJSON(): PartnerProps {
    return { ...this._props, id: this._id.value };
  }

  toData(): PartnerData {
    return PartnerSchema.parse(this.toJSON());
  }
}