import { trustRepository } from '../repositories/TrustRepository';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class TrustOpsService {
  private repo = trustRepository;

  async calculateScore(organizationId: string) {
    const score = await this.repo.findByOrg(organizationId);
    if (!score) {
      return this.repo.upsert({ organizationId, score: 0 });
    }
    return score;
  }

  async scoreBreakdown(organizationId: string) {
    const score = await this.repo.findByOrg(organizationId);
    if (!score) {
      const created = await this.repo.upsert({ organizationId, score: 0 });
      return {
        overall: created.score,
        velocity: created.velocityScore,
        settlement: created.settlementScore,
        dispute: created.disputeScore,
        compliance: created.complianceScore,
      };
    }
    return {
      overall: score.score,
      velocity: score.velocityScore,
      settlement: score.settlementScore,
      dispute: score.disputeScore,
      compliance: score.complianceScore,
    };
  }

  async updateScore(data: {
    organizationId: string;
    score?: number;
    velocityScore?: number;
    settlementScore?: number;
    disputeScore?: number;
    complianceScore?: number;
    actorId: string;
  }) {
    const updated = await this.repo.upsert({
      organizationId: data.organizationId,
      score: data.score,
      velocityScore: data.velocityScore,
      settlementScore: data.settlementScore,
      disputeScore: data.disputeScore,
      complianceScore: data.complianceScore,
    });

    await globalEventBus.emit('TRUST_SCORE_UPDATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: {
        score: updated.score,
        velocity: updated.velocityScore,
        settlement: updated.settlementScore,
        dispute: updated.disputeScore,
        compliance: updated.complianceScore,
      },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'TRUST_SCORE_UPDATED',
      entityType: 'TrustScore',
      entityId: updated.id,
      metadata: {
        score: updated.score,
        velocityScore: updated.velocityScore,
        settlementScore: updated.settlementScore,
      },
    });

    return updated;
  }

  async scoreHistory(limit: number = 50) {
    return this.repo.listOrdered(limit);
  }
}

export const trustOpsService = new TrustOpsService();


