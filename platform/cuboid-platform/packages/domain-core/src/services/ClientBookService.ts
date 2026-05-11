import { clientRepository } from '../repositories/ClientRepository';
import { dealRepository } from '../repositories/DealRepository';
import { ValidationError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class ClientBookService {
  private repo = clientRepository;
  private dealRepo = dealRepository;

  async createClient(data: {
    organizationId: string;
    clientName: string;
    clientEmail?: string;
    clientPhone?: string;
    whatsappNumber?: string;
    customerType: string;
    preferredCorridors?: string[];
    actorId: string;
  }) {
    const existing = data.clientEmail
      ? await this.repo.findByEmail(data.organizationId, data.clientEmail)
      : null;
    if (existing) {
      throw new ValidationError('Client with this email already exists');
    }

    const client = await this.repo.create({
      organizationId: data.organizationId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      whatsappNumber: data.whatsappNumber,
      customerType: data.customerType,
      preferredCorridors: data.preferredCorridors ? JSON.stringify(data.preferredCorridors) : null,
    });

    await globalEventBus.emit('BROKER_CLIENT_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { clientId: client.id, name: data.clientName },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BROKER_CLIENT_CREATED',
      entityType: 'BrokerClient',
      entityId: client.id,
      metadata: { name: data.clientName, email: data.clientEmail },
    });

    return client;
  }

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async listByOrg(organizationId: string) {
    return this.repo.listByOrg(organizationId);
  }

  async getClientHistory(clientId: string, organizationId: string) {
    const deals = await this.dealRepo.listByOrg(organizationId);
    // Filter deals that originated from leads matching this client
    // For now, return all deals as proxy for history
    return deals.filter((d: any) => d.leadId || d.amount);
  }

  async updateMetrics(clientId: string, data: {
    totalTransactions?: number;
    totalVolume?: number;
    conversionRatio?: number;
    repeatFrequency?: number;
    profitabilityScore?: number;
    trustTier?: string;
    lastTransactionAt?: Date;
    actorId: string;
    organizationId: string;
  }) {
    const updated = await this.repo.updateMetrics(clientId, {
      totalTransactions: data.totalTransactions,
      totalVolume: data.totalVolume,
      conversionRatio: data.conversionRatio,
      repeatFrequency: data.repeatFrequency,
      profitabilityScore: data.profitabilityScore,
      trustTier: data.trustTier,
      lastTransactionAt: data.lastTransactionAt,
    });

    await globalEventBus.emit('BROKER_CLIENT_UPDATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { clientId },
    });

    return updated;
  }

  async archiveClient(clientId: string, actorId: string, organizationId: string) {
    const archived = await this.repo.archive(clientId);

    await globalEventBus.emit('BROKER_CLIENT_ARCHIVED', {
      actorId,
      organizationId,
      payload: { clientId },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_CLIENT_ARCHIVED',
      entityType: 'BrokerClient',
      entityId: clientId,
    });

    return archived;
  }
}

export const clientBookService = new ClientBookService();
