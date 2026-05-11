import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class BdcDealRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    deskId: string;
    source?: string;
    customerName: string;
    customerPhone?: string;
    corridor: string;
    amount: number;
    currency?: string;
    rate: number;
    side?: string;
    notes?: string;
  }) {
    return this.db.bdcDeal.create({
      data: {
        organizationId: data.organizationId,
        deskId: data.deskId,
        source: data.source ?? 'walk_in',
        customerName: data.customerName,
        customerPhone: data.customerPhone ?? null,
        corridor: data.corridor,
        amount: data.amount,
        currency: data.currency ?? 'NGN',
        rate: data.rate,
        side: data.side ?? 'BUY',
        status: 'REQUESTED',
        notes: data.notes ?? null,
      },
    });
  }

  async findById(id: string) {
    const deal = await this.db.bdcDeal.findUnique({
      where: { id, deletedAt: null },
      include: { desk: true },
    });
    if (!deal) throw new NotFoundError('BDC Deal');
    return deal;
  }

  async listByOrg(organizationId: string) {
    return this.db.bdcDeal.findMany({
      where: { organizationId, deletedAt: null },
      include: { desk: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listByDesk(deskId: string) {
    return this.db.bdcDeal.findMany({
      where: { deskId, deletedAt: null },
      include: { desk: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.db.bdcDeal.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async setSettledAmount(id: string, amount: number) {
    return this.db.bdcDeal.update({
      where: { id },
      data: { settledAmount: amount },
    });
  }

  async archive(id: string) {
    return this.db.bdcDeal.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const bdcDealRepository = new BdcDealRepository();
