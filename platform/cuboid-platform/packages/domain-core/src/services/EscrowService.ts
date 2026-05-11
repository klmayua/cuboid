import { escrowRepository } from '../repositories/EscrowRepository';
import { walletRepository } from '../repositories/WalletRepository';
import { ValidationError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class EscrowService {
  private repo = escrowRepository;
  private walletRepo = walletRepository;

  async create(data: {
    organizationId: string;
    quoteMatchId?: string;
    amount: number;
    currency: string;
    walletId: string;
    actorId: string;
  }) {
    const escrow = await this.repo.create({
      organizationId: data.organizationId,
      quoteMatchId: data.quoteMatchId,
      amount: data.amount,
      currency: data.currency,
    });

    await this.walletRepo.reserveBalance(data.walletId, data.amount);
    await this.repo.fund(escrow.id);

    await globalEventBus.emit('ESCROW_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { escrowId: escrow.id, amount: data.amount, currency: data.currency },
    });

    return escrow;
  }

  async getById(id: string) {
    return this.repo.findById(id);
  }

  async fund(id: string, actorId: string) {
    const escrow = await this.repo.findById(id);
    if (escrow.status !== 'CREATED') throw new ValidationError('Escrow must be created before funding');
    const funded = await this.repo.fund(id);

    await globalEventBus.emit('ESCROW_FUNDED', {
      actorId,
      organizationId: escrow.organizationId,
      payload: { escrowId: id, status: 'FUNDED' },
    });

    await auditLog({
      organizationId: escrow.organizationId,
      actorId,
      action: 'ESCROW_FUNDED',
      entityType: 'Escrow',
      entityId: id,
      metadata: { status: 'FUNDED' },
    });

    return funded;
  }

  async lock(id: string, actorId: string) {
    const escrow = await this.repo.findById(id);
    if (escrow.status !== 'FUNDED') throw new ValidationError('Escrow must be funded before locking');
    return this.repo.lock(id);
  }

  async release(id: string, walletId: string, actorId: string) {
    const escrow = await this.repo.findById(id);
    if (escrow.status !== 'LOCKED') throw new ValidationError('Escrow must be locked before release');

    await this.walletRepo.releaseReserve(walletId, Number(escrow.amount));
    const released = await this.repo.release(id);

    await globalEventBus.emit('ESCROW_RELEASED', {
      actorId,
      organizationId: escrow.organizationId,
      payload: { escrowId: id, amount: escrow.amount },
    });

    return released;
  }

  async dispute(id: string, actorId: string) {
    return this.repo.dispute(id);
  }

  async cancel(id: string, actorId: string) {
    return this.repo.cancel(id);
  }

  async listByOrg(organizationId: string) {
    return this.repo.findByOrg(organizationId);
  }
}

export const escrowService = new EscrowService();
