import { commissionRepository } from '../repositories/CommissionRepository';
import { dealRepository } from '../repositories/DealRepository';
import { ValidationError, NotFoundError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class CommissionService {
  private repo = commissionRepository;
  private dealRepo = dealRepository;

  async computeCommission(data: {
    organizationId: string;
    dealId: string;
    settledVolume: number;
    margin: number;
    brokerRate: number;
    performanceMultiplier?: number;
    currency: string;
    actorId: string;
  }) {
    const base = data.settledVolume * (data.margin / 100) * (data.brokerRate / 100);
    const multiplier = data.performanceMultiplier ?? 1;
    const amount = base * multiplier;

    const entry = await this.repo.create({
      organizationId: data.organizationId,
      dealId: data.dealId,
      amount,
      currency: data.currency,
      rate: data.brokerRate,
      computedFromVolume: data.settledVolume,
      computedFromMargin: data.margin,
      computedFromBrokerRate: data.brokerRate,
      performanceMultiplier: multiplier,
    });

    await this.dealRepo.setCommission(data.dealId, entry.id);

    await globalEventBus.emit('COMMISSION_ACCRUED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { commissionId: entry.id, dealId: data.dealId, amount },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'COMMISSION_ACCRUED',
      entityType: 'CommissionEntry',
      entityId: entry.id,
      metadata: { dealId: data.dealId, amount, rate: data.brokerRate },
    });

    return entry;
  }

  async findByDeal(dealId: string) {
    return this.repo.findByDeal(dealId);
  }

  async listByOrg(organizationId: string) {
    return this.repo.listByOrg(organizationId);
  }

  async release(id: string, actorId: string, organizationId: string) {
    const entry = await this.repo.findById(id);
    if (entry.status !== 'ACCRUED' && entry.status !== 'PENDING_RELEASE') {
      throw new ValidationError('Commission cannot be released from current state');
    }

    const updated = await this.repo.updateStatus(id, 'RELEASED');

    await globalEventBus.emit('COMMISSION_RELEASED', {
      actorId,
      organizationId,
      payload: { commissionId: id, amount: entry.amount },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'COMMISSION_RELEASED',
      entityType: 'CommissionEntry',
      entityId: id,
      metadata: { amount: entry.amount },
    });

    return updated;
  }

  async hold(id: string, actorId: string, organizationId: string, reason?: string) {
    const entry = await this.repo.findById(id);
    if (entry.status !== 'ACCRUED' && entry.status !== 'PENDING_RELEASE') {
      throw new ValidationError('Commission cannot be held from current state');
    }

    const updated = await this.repo.updateStatus(id, 'HELD');

    await globalEventBus.emit('COMMISSION_HELD', {
      actorId,
      organizationId,
      payload: { commissionId: id, reason },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'COMMISSION_HELD',
      entityType: 'CommissionEntry',
      entityId: id,
      metadata: { reason },
    });

    return updated;
  }

  async reverse(id: string, actorId: string, organizationId: string, reason?: string) {
    const updated = await this.repo.updateStatus(id, 'REVERSED');

    await globalEventBus.emit('COMMISSION_REVERSED', {
      actorId,
      organizationId,
      payload: { commissionId: id, reason },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'COMMISSION_REVERSED',
      entityType: 'CommissionEntry',
      entityId: id,
      metadata: { reason },
    });

    return updated;
  }

  async ledgerSummary(organizationId: string) {
    const [accrued, pending, released, held, reversed] = await Promise.all([
      this.repo.sumByStatus(organizationId, 'ACCRUED'),
      this.repo.sumByStatus(organizationId, 'PENDING_RELEASE'),
      this.repo.sumByStatus(organizationId, 'RELEASED'),
      this.repo.sumByStatus(organizationId, 'HELD'),
      this.repo.sumByStatus(organizationId, 'REVERSED'),
    ]);

    const [accruedCount, pendingCount, releasedCount] = await Promise.all([
      this.repo.countByStatus(organizationId, 'ACCRUED'),
      this.repo.countByStatus(organizationId, 'PENDING_RELEASE'),
      this.repo.countByStatus(organizationId, 'RELEASED'),
    ]);

    return {
      accrued: { amount: Number(accrued), count: accruedCount },
      pending: { amount: Number(pending), count: pendingCount },
      released: { amount: Number(released), count: releasedCount },
      held: { amount: Number(held), count: 0 },
      reversed: { amount: Number(reversed), count: 0 },
      total: Number(accrued) + Number(pending) + Number(released) + Number(held) + Number(reversed),
    };
  }
}

export const commissionService = new CommissionService();
