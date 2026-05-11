import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class ClientRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    clientName: string;
    clientEmail?: string;
    clientPhone?: string;
    whatsappNumber?: string;
    customerType: string;
    preferredCorridors?: any;
  }) {
    return this.db.brokerClient.create({
      data: {
        organizationId: data.organizationId,
        clientName: data.clientName,
        clientEmail: data.clientEmail ?? null,
        clientPhone: data.clientPhone ?? null,
        whatsappNumber: data.whatsappNumber ?? null,
        customerType: data.customerType as any,
        preferredCorridors: data.preferredCorridors ?? null,
      },
    });
  }

  async findById(id: string) {
    const client = await this.db.brokerClient.findUnique({
      where: { id, deletedAt: null },
    });
    if (!client) throw new NotFoundError('BrokerClient');
    return client;
  }

  async findByEmail(organizationId: string, email: string) {
    return this.db.brokerClient.findFirst({
      where: { organizationId, clientEmail: email, deletedAt: null },
    });
  }

  async listByOrg(organizationId: string) {
    return this.db.brokerClient.findMany({
      where: { organizationId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateMetrics(id: string, data: {
    totalTransactions?: number;
    totalVolume?: number;
    conversionRatio?: number;
    repeatFrequency?: number;
    profitabilityScore?: number;
    trustTier?: string;
    lastTransactionAt?: Date;
  }) {
    return this.db.brokerClient.update({
      where: { id },
      data: {
        totalTransactions: data.totalTransactions,
        totalVolume: data.totalVolume,
        conversionRatio: data.conversionRatio,
        repeatFrequency: data.repeatFrequency,
        profitabilityScore: data.profitabilityScore,
        trustTier: data.trustTier,
        lastTransactionAt: data.lastTransactionAt,
      },
    });
  }

  async archive(id: string) {
    return this.db.brokerClient.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const clientRepository = new ClientRepository();
