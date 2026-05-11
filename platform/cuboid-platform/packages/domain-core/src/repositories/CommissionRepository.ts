import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class CommissionRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    dealId: string;
    amount: number;
    currency: string;
    rate: number;
    computedFromVolume: number;
    computedFromMargin: number;
    computedFromBrokerRate: number;
    performanceMultiplier?: number;
  }) {
    return this.db.commissionEntry.create({
      data: {
        organizationId: data.organizationId,
        dealId: data.dealId,
        amount: data.amount,
        currency: data.currency,
        rate: data.rate,
        computedFromVolume: data.computedFromVolume,
        computedFromMargin: data.computedFromMargin,
        computedFromBrokerRate: data.computedFromBrokerRate,
        performanceMultiplier: data.performanceMultiplier ?? 1,
        status: 'ACCRUED',
      },
    });
  }

  async findById(id: string) {
    const entry = await this.db.commissionEntry.findUnique({
      where: { id },
    });
    if (!entry) throw new NotFoundError('CommissionEntry');
    return entry;
  }

  async findByDeal(dealId: string) {
    return this.db.commissionEntry.findUnique({
      where: { dealId },
    });
  }

  async listByOrg(organizationId: string) {
    return this.db.commissionEntry.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    const data: any = { status: status as any };
    if (status === 'RELEASED') data.releasedAt = new Date();
    return this.db.commissionEntry.update({
      where: { id },
      data,
    });
  }

  async sumByStatus(organizationId: string, status: string) {
    const result = await this.db.commissionEntry.aggregate({
      where: { organizationId, status: status as any },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  }

  async countByStatus(organizationId: string, status: string) {
    return this.db.commissionEntry.count({
      where: { organizationId, status: status as any },
    });
  }
}

export const commissionRepository = new CommissionRepository();
