import { settlementRepository } from '../repositories/SettlementRepository';
import { walletRepository } from '../repositories/WalletRepository';
import { ValidationError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class SettlementService {
  private repo = settlementRepository;
  private walletRepo = walletRepository;

  async initiate(data: {
    organizationId: string;
    escrowId?: string;
    reference: string;
    amount: number;
    currency: string;
    fromWalletId: string;
    toWalletId: string;
    actorId: string;
  }) {
    const tx = await this.repo.create({
      organizationId: data.organizationId,
      escrowId: data.escrowId,
      reference: data.reference,
      amount: data.amount,
      currency: data.currency,
    });

    await this.repo.process(tx.id);

    await this.walletRepo.debit(data.fromWalletId, data.amount, data.reference);
    await this.walletRepo.credit(data.toWalletId, data.amount, data.reference);

    const cleared = await this.repo.clear(tx.id, 'INTERNAL');

    await globalEventBus.emit('SETTLEMENT_COMPLETED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { transactionId: tx.id, amount: data.amount, currency: data.currency },
    });

    return cleared;
  }

  async getTransaction(id: string) {
    return this.repo.findById(id);
  }

  async listByOrg(organizationId: string) {
    return this.repo.findByOrg(organizationId);
  }

  async verify(id: string, actorId: string) {
    const tx = await this.repo.findById(id);
    const updated = await this.repo.process(id);

    await globalEventBus.emit('SETTLEMENT_VERIFIED', {
      actorId,
      organizationId: tx.organizationId,
      payload: { transactionId: id, status: 'PROCESSING' },
    });

    await auditLog({
      organizationId: tx.organizationId,
      actorId,
      action: 'SETTLEMENT_VERIFIED',
      entityType: 'Transaction',
      entityId: id,
      metadata: { status: 'PROCESSING' },
    });

    return updated;
  }

  async clear(id: string, channel: string, actorId: string) {
    const tx = await this.repo.findById(id);
    const updated = await this.repo.clear(id, channel);

    await globalEventBus.emit('SETTLEMENT_CLEARED', {
      actorId,
      organizationId: tx.organizationId,
      payload: { transactionId: id, channel },
    });

    await auditLog({
      organizationId: tx.organizationId,
      actorId,
      action: 'SETTLEMENT_CLEARED',
      entityType: 'Transaction',
      entityId: id,
      metadata: { channel },
    });

    return updated;
  }

  async fail(id: string, actorId: string) {
    const tx = await this.repo.findById(id);
    const updated = await this.repo.fail(id);

    await globalEventBus.emit('SETTLEMENT_FAILED', {
      actorId,
      organizationId: tx.organizationId,
      payload: { transactionId: id },
    });

    await auditLog({
      organizationId: tx.organizationId,
      actorId,
      action: 'SETTLEMENT_FAILED',
      entityType: 'Transaction',
      entityId: id,
    });

    return updated;
  }

  async reverse(id: string, actorId: string) {
    const tx = await this.repo.findById(id);
    const updated = await this.repo.reverse(id);

    await globalEventBus.emit('SETTLEMENT_REVERSED', {
      actorId,
      organizationId: tx.organizationId,
      payload: { transactionId: id },
    });

    await auditLog({
      organizationId: tx.organizationId,
      actorId,
      action: 'SETTLEMENT_REVERSED',
      entityType: 'Transaction',
      entityId: id,
    });

    return updated;
  }
}

export const settlementService = new SettlementService();
