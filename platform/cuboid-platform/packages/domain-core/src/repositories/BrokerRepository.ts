import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class BrokerRepository extends BaseRepository {
  async findByOrg(organizationId: string) {
    return this.db.brokerProfile.findUnique({
      where: { organizationId },
      include: { organization: true },
    });
  }

  async upsert(data: {
    organizationId: string;
    specialty?: string;
    commissionRate?: number;
    active?: boolean;
  }) {
    return this.db.brokerProfile.upsert({
      where: { organizationId: data.organizationId },
      create: {
        organizationId: data.organizationId,
        specialty: data.specialty ?? null,
        commissionRate: data.commissionRate ?? 0,
        active: data.active ?? true,
      },
      update: {
        specialty: data.specialty ?? undefined,
        commissionRate: data.commissionRate ?? undefined,
        active: data.active ?? undefined,
      },
    });
  }

  async listActive() {
    return this.db.brokerProfile.findMany({
      where: { active: true },
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const brokerRepository = new BrokerRepository();
