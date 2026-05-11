import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class TrustRepository extends BaseRepository {
  async findByOrg(organizationId: string) {
    return this.db.trustScore.findUnique({
      where: { organizationId },
    });
  }

  async upsert(data: {
    organizationId: string;
    score?: number;
    velocityScore?: number;
    settlementScore?: number;
    disputeScore?: number;
    complianceScore?: number;
  }) {
    return this.db.trustScore.upsert({
      where: { organizationId: data.organizationId },
      create: {
        organizationId: data.organizationId,
        score: data.score ?? 0,
        velocityScore: data.velocityScore ?? 0,
        settlementScore: data.settlementScore ?? 0,
        disputeScore: data.disputeScore ?? 0,
        complianceScore: data.complianceScore ?? 0,
      },
      update: {
        score: data.score ?? undefined,
        velocityScore: data.velocityScore ?? undefined,
        settlementScore: data.settlementScore ?? undefined,
        disputeScore: data.disputeScore ?? undefined,
        complianceScore: data.complianceScore ?? undefined,
      },
    });
  }

  async listOrdered(limit: number = 50) {
    return this.db.trustScore.findMany({
      orderBy: { score: 'desc' },
      take: limit,
      include: { organization: true },
    });
  }
}

export const trustRepository = new TrustRepository();
