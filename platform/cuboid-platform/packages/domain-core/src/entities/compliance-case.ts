import { z } from 'zod';
import { Entity } from './base-entity.js';
import { EntityIdLike } from '../value-objects/entity-id.js';
import { TimestampLike } from '../value-objects/timestamp.js';

export const ComplianceCaseTypeSchema = z.enum(['KYC', 'KYB', 'AML', 'SAR', 'FRAUD', 'DISPUTE', 'SANCTIONS', 'PEP']);
export type ComplianceCaseType = z.infer<typeof ComplianceCaseTypeSchema>;

export const ComplianceCaseStatusSchema = z.enum(['OPEN', 'UNDER_REVIEW', 'PENDING_DOCUMENTATION', 'RESOLVED', 'ESCALATED', 'CLOSED', 'REJECTED']);
export type ComplianceCaseStatus = z.infer<typeof ComplianceCaseStatusSchema>;

export const ComplianceCaseSeveritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export type ComplianceCaseSeverity = z.infer<typeof ComplianceCaseSeveritySchema>;

export interface ComplianceCaseProps {
  id: string;
  type: ComplianceCaseType;
  status: ComplianceCaseStatus;
  severity: ComplianceCaseSeverity;
  subjectType: 'USER' | 'ORGANIZATION' | 'TRANSACTION' | 'BENEFICIARY' | 'PARTNER';
  subjectId: string;
  description: string;
  assignedTo?: string;
  notes: string[];
  documents: { id: string; name: string; url: string; uploadedAt: string }[];
  resolution?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const ComplianceCaseSchema = z.object({
  id: z.string(),
  type: ComplianceCaseTypeSchema,
  status: ComplianceCaseStatusSchema,
  severity: ComplianceCaseSeveritySchema,
  subjectType: z.enum(['USER', 'ORGANIZATION', 'TRANSACTION', 'BENEFICIARY', 'PARTNER']),
  subjectId: z.string().uuid(),
  description: z.string().max(2000),
  assignedTo: z.string().uuid().optional(),
  notes: z.array(z.string()),
  documents: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    uploadedAt: z.string().datetime(),
  })),
  resolution: z.string().max(2000).optional(),
  resolvedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ComplianceCaseData = z.infer<typeof ComplianceCaseSchema>;

export class ComplianceCase extends Entity<ComplianceCaseProps> {
  protected get entityType(): string { return 'compliance_case'; }

  private constructor(
    id: EntityIdLike,
    private _props: ComplianceCaseProps,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version?: number
  ) {
    super(id, createdAt, updatedAt, version);
  }

  static create(data: {
    type: ComplianceCaseType;
    severity: ComplianceCaseSeverity;
    subjectType: ComplianceCaseProps['subjectType'];
    subjectId: string;
    description: string;
  }): ComplianceCase {
    const now = new Date().toISOString();
    const props: ComplianceCaseProps = {
      id: '',
      type: data.type,
      status: 'OPEN',
      severity: data.severity,
      subjectType: data.subjectType,
      subjectId: data.subjectId,
      description: data.description,
      notes: [],
      documents: [],
      createdAt: now,
      updatedAt: now,
    };
    return new ComplianceCase(EntityId.create('compliance_case'), props);
  }

  static fromData(data: ComplianceCaseData): ComplianceCase {
    return new ComplianceCase(
      EntityId.create('compliance_case', data.id),
      { ...data, id: data.id },
      data.createdAt,
      data.updatedAt
    );
  }

  get type() { return this._props.type; }
  get status() { return this._props.status; }
  get severity() { return this._props.severity; }
  get subjectType() { return this._props.subjectType; }
  get subjectId() { return this._props.subjectId; }
  get description() { return this._props.description; }
  get assignedTo() { return this._props.assignedTo; }
  get notes() { return this._props.notes; }
  get resolution() { return this._props.resolution; }

  isOpen(): boolean { return ['OPEN', 'UNDER_REVIEW', 'PENDING_DOCUMENTATION', 'ESCALATED'].includes(this._props.status); }
  isResolved(): boolean { return this._props.status === 'RESOLVED' || this._props.status === 'CLOSED'; }
  isCritical(): boolean { return this._props.severity === 'CRITICAL'; }

  assignTo(userId: string): void {
    this._props.assignedTo = userId;
    if (this._props.status === 'OPEN') {
      this._props.status = 'UNDER_REVIEW';
    }
    this.markUpdated();
  }

  addNote(note: string): void {
    this._props.notes.push(note);
    this.markUpdated();
  }

  addDocument(doc: { id: string; name: string; url: string }): void {
    this._props.documents.push({
      ...doc,
      uploadedAt: new Date().toISOString(),
    });
    this.markUpdated();
  }

  requestDocumentation(): void {
    if (this._props.status === 'UNDER_REVIEW') {
      this._props.status = 'PENDING_DOCUMENTATION';
      this.markUpdated();
    }
  }

  escalate(): void {
    if (this.isOpen()) {
      this._props.status = 'ESCALATED';
      this.markUpdated();
    }
  }

  resolve(resolution: string): void {
    if (this.isOpen()) {
      this._props.status = 'RESOLVED';
      this._props.resolution = resolution;
      this._props.resolvedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  reject(reason: string): void {
    if (this._props.status === 'OPEN') {
      this._props.status = 'REJECTED';
      this._props.resolution = reason;
      this._props.resolvedAt = new Date().toISOString();
      this.markUpdated();
    }
  }

  close(): void {
    if (this.isResolved()) {
      this._props.status = 'CLOSED';
      this.markUpdated();
    }
  }

  toJSON(): ComplianceCaseProps {
    return { ...this._props, id: this._id.value };
  }

  toData(): ComplianceCaseData {
    return ComplianceCaseSchema.parse(this.toJSON());
  }
}