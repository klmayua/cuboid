import { leadRepository } from '../repositories/LeadRepository';
import { ValidationError, NotFoundError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class LeadService {
  private repo = leadRepository;

  async createLead(data: {
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
    expiresInMinutes?: number;
    notes?: string;
    actorId: string;
  }) {
    const expiresAt = new Date(Date.now() + (data.expiresInMinutes ?? 60) * 60 * 1000);
    const lead = await this.repo.create({
      organizationId: data.organizationId,
      source: data.source,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerType: data.customerType,
      corridor: data.corridor,
      amount: data.amount,
      currency: data.currency,
      urgency: data.urgency,
      trustFlag: data.trustFlag,
      expiresAt,
      notes: data.notes,
    });

    await globalEventBus.emit('BROKER_LEAD_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { leadId: lead.id, amount: data.amount, corridor: data.corridor },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BROKER_LEAD_CREATED',
      entityType: 'BrokerLead',
      entityId: lead.id,
      metadata: { source: data.source, amount: data.amount, corridor: data.corridor },
    });

    return lead;
  }

  async listClaimable(organizationId?: string) {
    return this.repo.listClaimable(organizationId);
  }

  async listByBroker(brokerId: string) {
    return this.repo.listByBroker(brokerId);
  }

  async listByOrg(organizationId: string) {
    return this.repo.listByOrg(organizationId);
  }

  async claimLead(leadId: string, brokerId: string, organizationId: string) {
    const lead = await this.repo.findById(leadId);
    if (lead.status !== 'NEW' && lead.status !== 'CLAIMABLE') {
      throw new ValidationError('Lead is not claimable');
    }
    if (lead.assignedTo) {
      throw new ValidationError('Lead already claimed');
    }
    if (new Date(lead.expiresAt) < new Date()) {
      throw new ValidationError('Lead has expired');
    }

    const claimed = await this.repo.claim(leadId, brokerId);

    await globalEventBus.emit('BROKER_LEAD_CLAIMED', {
      actorId: brokerId,
      organizationId,
      payload: { leadId, brokerId },
    });

    await auditLog({
      organizationId,
      actorId: brokerId,
      action: 'BROKER_LEAD_CLAIMED',
      entityType: 'BrokerLead',
      entityId: leadId,
      metadata: { brokerId },
    });

    return claimed;
  }

  async releaseLead(leadId: string, brokerId: string, organizationId: string) {
    const lead = await this.repo.findById(leadId);
    if (lead.assignedTo !== brokerId) {
      throw new ValidationError('Lead not assigned to this broker');
    }

    const released = await this.repo.release(leadId);

    await globalEventBus.emit('BROKER_LEAD_RELEASED', {
      actorId: brokerId,
      organizationId,
      payload: { leadId },
    });

    await auditLog({
      organizationId,
      actorId: brokerId,
      action: 'BROKER_LEAD_RELEASED',
      entityType: 'BrokerLead',
      entityId: leadId,
    });

    return released;
  }

  async convertLead(leadId: string, dealId: string, brokerId: string, organizationId: string) {
    const lead = await this.repo.findById(leadId);
    if (lead.status !== 'CLAIMED' && lead.status !== 'NEGOTIATING') {
      throw new ValidationError('Lead must be claimed or negotiating to convert');
    }

    const converted = await this.repo.convertToDeal(leadId, dealId);

    await globalEventBus.emit('BROKER_LEAD_CONVERTED', {
      actorId: brokerId,
      organizationId,
      payload: { leadId, dealId },
    });

    await auditLog({
      organizationId,
      actorId: brokerId,
      action: 'BROKER_LEAD_CONVERTED',
      entityType: 'BrokerLead',
      entityId: leadId,
      metadata: { dealId },
    });

    return converted;
  }

  async archiveLead(leadId: string, brokerId: string, organizationId: string) {
    const archived = await this.repo.archive(leadId);

    await globalEventBus.emit('BROKER_LEAD_ARCHIVED', {
      actorId: brokerId,
      organizationId,
      payload: { leadId },
    });

    await auditLog({
      organizationId,
      actorId: brokerId,
      action: 'BROKER_LEAD_ARCHIVED',
      entityType: 'BrokerLead',
      entityId: leadId,
    });

    return archived;
  }
}

export const leadService = new LeadService();
