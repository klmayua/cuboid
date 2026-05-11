import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class LeadRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    source: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    customerType: string;
    corridor: string;
    amount: number;
    currency?: string;
    urgency?: string;
    trustFlag?: boolean;
    expiresAt: Date;
    notes?: string;
  }) {
    return this.db.brokerLead.create({
      data: {
        organizationId: data.organizationId,
        source: data.source,
        customerName: data.customerName,
        customerEmail: data.customerEmail ?? null,
        customerPhone: data.customerPhone ?? null,
        customerType: data.customerType as any,
        corridor: data.corridor,
        amount: data.amount,
        currency: data.currency ?? 'NGN',
        urgency: data.urgency ?? 'normal',
        trustFlag: data.trustFlag ?? false,
        expiresAt: data.expiresAt,
        notes: data.notes ?? null,
        status: 'NEW',
      },
    });
  }

  async findById(id: string) {
    const lead = await this.db.brokerLead.findUnique({
      where: { id, deletedAt: null },
      include: { assignedBroker: true, convertedDeal: true },
    });
    if (!lead) throw new NotFoundError('BrokerLead');
    return lead;
  }

  async listClaimable(organizationId?: string) {
    const where: any = {
      status: { in: ['NEW', 'CLAIMABLE'] },
      deletedAt: null,
      expiresAt: { gt: new Date() },
      assignedTo: null,
    };
    if (organizationId) where.organizationId = organizationId;
    return this.db.brokerLead.findMany({
      where,
      orderBy: [{ trustFlag: 'desc' }, { createdAt: 'desc' }],
      include: { assignedBroker: true },
    });
  }

  async listByOrg(organizationId: string) {
    return this.db.brokerLead.findMany({
      where: { organizationId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { assignedBroker: true, convertedDeal: true },
    });
  }

  async listByBroker(brokerId: string) {
    return this.db.brokerLead.findMany({
      where: { assignedTo: brokerId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { convertedDeal: true },
    });
  }

  async claim(id: string, brokerId: string) {
    return this.db.brokerLead.update({
      where: { id },
      data: {
        status: 'CLAIMED',
        assignedTo: brokerId,
        claimedAt: new Date(),
      },
    });
  }

  async release(id: string) {
    return this.db.brokerLead.update({
      where: { id },
      data: {
        status: 'CLAIMABLE',
        assignedTo: null,
        claimedAt: null,
      },
    });
  }

  async convertToDeal(id: string, dealId: string) {
    return this.db.brokerLead.update({
      where: { id },
      data: {
        status: 'CONVERTED',
        convertedToDealId: dealId,
      },
    });
  }

  async archive(id: string) {
    return this.db.brokerLead.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.db.brokerLead.update({
      where: { id },
      data: { status: status as any },
    });
  }
}

export const leadRepository = new LeadRepository();
