import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class DealRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    leadId?: string;
    quoteId?: string;
    amount: number;
    currency: string;
    corridor: string;
    brokerRate?: number;
  }) {
    return this.db.brokerDeal.create({
      data: {
        organizationId: data.organizationId,
        leadId: data.leadId ?? null,
        quoteId: data.quoteId ?? null,
        amount: data.amount,
        currency: data.currency,
        corridor: data.corridor,
        brokerRate: data.brokerRate ?? 0,
        status: 'LEAD',
      },
    });
  }

  async findById(id: string) {
    const deal = await this.db.brokerDeal.findUnique({
      where: { id, deletedAt: null },
      include: { lead: true, commissionEntry: true },
    });
    if (!deal) throw new NotFoundError('BrokerDeal');
    return deal;
  }

  async listByOrg(organizationId: string) {
    return this.db.brokerDeal.findMany({
      where: { organizationId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { lead: true, commissionEntry: true },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.db.brokerDeal.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async linkQuote(id: string, quoteId: string) {
    return this.db.brokerDeal.update({
      where: { id },
      data: { quoteId, status: 'QUOTED' },
    });
  }

  async linkMatch(id: string, quoteMatchId: string) {
    return this.db.brokerDeal.update({
      where: { id },
      data: { quoteMatchId, status: 'MATCHED' },
    });
  }

  async linkEscrow(id: string, escrowId: string) {
    return this.db.brokerDeal.update({
      where: { id },
      data: { escrowId, status: 'ESCROWED' },
    });
  }

  async linkSettlement(id: string, settlementId: string) {
    return this.db.brokerDeal.update({
      where: { id },
      data: { settlementId, status: 'CLEARED' },
    });
  }

  async setCommission(id: string, commissionEntryId: string) {
    return this.db.brokerDeal.update({
      where: { id },
      data: { commissionEntryId },
    });
  }

  async archive(id: string) {
    return this.db.brokerDeal.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const dealRepository = new DealRepository();
