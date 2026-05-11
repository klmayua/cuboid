import { dealRepository } from '../repositories/DealRepository';
import { leadRepository } from '../repositories/LeadRepository';
import { quoteRepository } from '../repositories/QuoteRepository';
import { ValidationError, NotFoundError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

const ADVANCE_MAP: Record<string, string> = {
  LEAD: 'QUOTED',
  QUOTED: 'MATCHED',
  MATCHED: 'ESCROWED',
  ESCROWED: 'PROCESSING',
  PROCESSING: 'CLEARED',
  CLEARED: 'PAID',
  PAID: 'CLOSED',
};

const ROLLBACK_MAP: Record<string, string> = {
  CLOSED: 'PAID',
  PAID: 'CLEARED',
  CLEARED: 'PROCESSING',
  PROCESSING: 'ESCROWED',
  ESCROWED: 'MATCHED',
  MATCHED: 'QUOTED',
  QUOTED: 'LEAD',
};

export class DealPipelineService {
  private repo = dealRepository;
  private leadRepo = leadRepository;
  private quoteRepo = quoteRepository;

  async createDeal(data: {
    organizationId: string;
    leadId?: string;
    quoteId?: string;
    amount: number;
    currency: string;
    corridor: string;
    brokerRate?: number;
    actorId: string;
  }) {
    const deal = await this.repo.create({
      organizationId: data.organizationId,
      leadId: data.leadId,
      quoteId: data.quoteId,
      amount: data.amount,
      currency: data.currency,
      corridor: data.corridor,
      brokerRate: data.brokerRate,
    });

    if (data.leadId) {
      await this.leadRepo.updateStatus(data.leadId, 'NEGOTIATING');
    }

    await globalEventBus.emit('BROKER_DEAL_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { dealId: deal.id, amount: data.amount, corridor: data.corridor },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BROKER_DEAL_CREATED',
      entityType: 'BrokerDeal',
      entityId: deal.id,
      metadata: { leadId: data.leadId, amount: data.amount },
    });

    return deal;
  }

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async listByOrg(organizationId: string) {
    return this.repo.listByOrg(organizationId);
  }

  async advance(id: string, actorId: string, organizationId: string) {
    const deal = await this.repo.findById(id);
    const nextStatus = ADVANCE_MAP[deal.status];
    if (!nextStatus) {
      throw new ValidationError('Deal cannot be advanced from current state');
    }

    const updated = await this.repo.updateStatus(id, nextStatus);

    await globalEventBus.emit('BROKER_DEAL_ADVANCED', {
      actorId,
      organizationId,
      payload: { dealId: id, from: deal.status, to: nextStatus },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_DEAL_ADVANCED',
      entityType: 'BrokerDeal',
      entityId: id,
      metadata: { from: deal.status, to: nextStatus },
    });

    return updated;
  }

  async rollback(id: string, actorId: string, organizationId: string) {
    const deal = await this.repo.findById(id);
    const prevStatus = ROLLBACK_MAP[deal.status];
    if (!prevStatus) {
      throw new ValidationError('Deal cannot be rolled back from current state');
    }

    const updated = await this.repo.updateStatus(id, prevStatus);

    await globalEventBus.emit('BROKER_DEAL_ROLLBACK', {
      actorId,
      organizationId,
      payload: { dealId: id, from: deal.status, to: prevStatus },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_DEAL_ROLLBACK',
      entityType: 'BrokerDeal',
      entityId: id,
      metadata: { from: deal.status, to: prevStatus },
    });

    return updated;
  }

  async escalate(id: string, actorId: string, organizationId: string, reason?: string) {
    const deal = await this.repo.findById(id);

    await globalEventBus.emit('BROKER_DEAL_ESCALATED', {
      actorId,
      organizationId,
      payload: { dealId: id, status: deal.status, reason },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_DEAL_ESCALATED',
      entityType: 'BrokerDeal',
      entityId: id,
      metadata: { reason },
    });

    return deal;
  }

  async settle(id: string, settlementId: string, actorId: string, organizationId: string) {
    const updated = await this.repo.linkSettlement(id, settlementId);

    await globalEventBus.emit('BROKER_DEAL_SETTLED', {
      actorId,
      organizationId,
      payload: { dealId: id, settlementId },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_DEAL_SETTLED',
      entityType: 'BrokerDeal',
      entityId: id,
      metadata: { settlementId },
    });

    return updated;
  }

  async dispute(id: string, actorId: string, organizationId: string, reason?: string) {
    const updated = await this.repo.updateStatus(id, 'FAILED');

    await globalEventBus.emit('BROKER_DEAL_DISPUTED', {
      actorId,
      organizationId,
      payload: { dealId: id, reason },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_DEAL_DISPUTED',
      entityType: 'BrokerDeal',
      entityId: id,
      metadata: { reason },
    });

    return updated;
  }

  async close(id: string, actorId: string, organizationId: string) {
    const updated = await this.repo.updateStatus(id, 'CLOSED');

    await globalEventBus.emit('BROKER_DEAL_CLOSED', {
      actorId,
      organizationId,
      payload: { dealId: id },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_DEAL_CLOSED',
      entityType: 'BrokerDeal',
      entityId: id,
    });

    return updated;
  }
}

export const dealPipelineService = new DealPipelineService();
