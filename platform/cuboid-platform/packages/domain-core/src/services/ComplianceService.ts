import { complianceRepository } from '../repositories/ComplianceRepository';
import { ValidationError, NotFoundError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class ComplianceOpsService {
  private repo = complianceRepository;

  async submitKyc(data: {
    organizationId: string;
    userId: string;
    idType?: string;
    idNumber?: string;
    idDocumentUrl?: string;
    selfieUrl?: string;
    actorId: string;
  }) {
    const kyc = await this.repo.createKyc({
      organizationId: data.organizationId,
      userId: data.userId,
      idType: data.idType,
      idNumber: data.idNumber,
      idDocumentUrl: data.idDocumentUrl,
      selfieUrl: data.selfieUrl,
    });

    await globalEventBus.emit('COMPLIANCE_SUBMITTED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { kycId: kyc.id, userId: data.userId, type: 'KYC' },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'KYC_SUBMITTED',
      entityType: 'KycProfile',
      entityId: kyc.id,
      metadata: { userId: data.userId },
    });

    return kyc;
  }

  async submitKyb(data: {
    organizationId: string;
    incorporationDoc?: string;
    directorsJson?: unknown;
    beneficialOwnersJson?: unknown;
    actorId: string;
  }) {
    const kyb = await this.repo.createKyb({
      organizationId: data.organizationId,
      incorporationDoc: data.incorporationDoc,
      directorsJson: data.directorsJson,
      beneficialOwnersJson: data.beneficialOwnersJson,
    });

    await globalEventBus.emit('COMPLIANCE_SUBMITTED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { kybId: kyb.id, type: 'KYB' },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'KYB_SUBMITTED',
      entityType: 'KybProfile',
      entityId: kyb.id,
    });

    return kyb;
  }

  async reviewCase(id: string, reviewerId: string, type: 'KYC' | 'KYB', status: string) {
    const review = type === 'KYC'
      ? await this.repo.reviewKyc(id, reviewerId, status)
      : await this.repo.reviewKyb(id, reviewerId, status);

    await globalEventBus.emit(`COMPLIANCE_${status.toUpperCase()}` as any, {
      actorId: reviewerId,
      organizationId: review.organizationId,
      payload: { caseId: id, type, status },
    });

    await auditLog({
      organizationId: review.organizationId,
      actorId: reviewerId,
      action: `COMPLIANCE_${status.toUpperCase()}`,
      entityType: type === 'KYC' ? 'KycProfile' : 'KybProfile',
      entityId: review.id,
      metadata: { status },
    });

    return review;
  }

  async getCases(organizationId: string) {
    const [kycProfiles, kybProfile] = await Promise.all([
      this.repo.findKycByOrg(organizationId),
      this.repo.findKybByOrg(organizationId),
    ]);
    return { kycProfiles, kybProfile };
  }

  async getCase(id: string, type: 'KYC' | 'KYB') {
    if (type === 'KYC') {
      const items = await this.repo.findKycByOrg(id);
      if (!items || items.length === 0) throw new NotFoundError('KYC profile');
      return items[0];
    }
    const kyb = await this.repo.findKybByOrg(id);
    if (!kyb) throw new NotFoundError('KYB profile');
    return kyb;
  }

  async sanctionsScreen(name: string): Promise<{ matches: number }> {
    // Placeholder for sanctions screening integration
    return { matches: 0 };
  }
}

export const complianceOpsService = new ComplianceOpsService();


