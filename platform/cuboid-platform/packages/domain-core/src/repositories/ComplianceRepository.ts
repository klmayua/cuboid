import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class ComplianceRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    docType: string;
    title: string;
    reference?: string;
    issuedAt?: Date;
    expiresAt?: Date;
    status?: string;
    metadataJson?: any;
  }) {
    return this.db.complianceDoc.create({
      data: {
        organizationId: data.organizationId,
        docType: data.docType as any,
        title: data.title,
        reference: data.reference ?? null,
        issuedAt: data.issuedAt ?? null,
        expiresAt: data.expiresAt ?? null,
        status: data.status ?? 'ACTIVE',
        metadataJson: data.metadataJson ?? null,
      },
    });
  }

  async findById(id: string) {
    const doc = await this.db.complianceDoc.findUnique({ where: { id } });
    if (!doc) throw new NotFoundError('Compliance Document');
    return doc;
  }

  async listByOrg(organizationId: string) {
    return this.db.complianceDoc.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listExpiringSoon(organizationId: string, days: number = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + days);
    return this.db.complianceDoc.findMany({
      where: {
        organizationId,
        expiresAt: { lte: cutoff, gte: new Date() },
      },
      orderBy: { expiresAt: 'asc' },
    });
  }

  async update(id: string, data: Partial<{
    title: string;
    reference: string;
    issuedAt: Date;
    expiresAt: Date;
    status: string;
    metadataJson: any;
  }>) {
    return this.db.complianceDoc.update({
      where: { id },
      data: { ...data, docType: undefined },
    });
  }

  async delete(id: string) {
    return this.db.complianceDoc.delete({ where: { id } });
  }

  // KYC/KYB helpers
  async createKyc(data: {
    organizationId: string;
    userId: string;
    idType?: string;
    idNumber?: string;
    idDocumentUrl?: string;
    selfieUrl?: string;
  }) {
    return this.db.complianceDoc.create({
      data: {
        organizationId: data.organizationId,
        docType: 'KYC' as any,
        title: `KYC for user ${data.userId}`,
        metadataJson: data as any,
        status: 'PENDING',
      },
    });
  }

  async createKyb(data: {
    organizationId: string;
    incorporationDoc?: string;
    directorsJson?: unknown;
    beneficialOwnersJson?: unknown;
  }) {
    return this.db.complianceDoc.create({
      data: {
        organizationId: data.organizationId,
        docType: 'KYB' as any,
        title: `KYB for org ${data.organizationId}`,
        metadataJson: data as any,
        status: 'PENDING',
      },
    });
  }

  async reviewKyc(id: string, reviewerId: string, status: string) {
    return this.db.complianceDoc.update({
      where: { id },
      data: { status, metadataJson: { reviewerId, reviewedAt: new Date().toISOString() } as any },
    });
  }

  async reviewKyb(id: string, reviewerId: string, status: string) {
    return this.db.complianceDoc.update({
      where: { id },
      data: { status, metadataJson: { reviewerId, reviewedAt: new Date().toISOString() } as any },
    });
  }

  async findKycByOrg(organizationId: string) {
    return this.db.complianceDoc.findMany({
      where: { organizationId, docType: 'KYC' as any },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findKybByOrg(organizationId: string) {
    return this.db.complianceDoc.findMany({
      where: { organizationId, docType: 'KYB' as any },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const complianceRepository = new ComplianceRepository();
