import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class EscrowRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    quoteMatchId?: string;
    amount: number;
    currency: string;
  }) {
    return this.db.escrow.create({
      data: { ...data, status: 'CREATED' },
    });
  }

  async findById(id: string) {
    const escrow = await this.db.escrow.findUnique({
      where: { id, deletedAt: null },
      include: { quoteMatch: true },
    });
    if (!escrow) throw new NotFoundError('Escrow');
    return escrow;
  }

  async fund(id: string) {
    return this.db.escrow.update({
      where: { id },
      data: { status: 'FUNDED' },
    });
  }

  async lock(id: string) {
    return this.db.escrow.update({
      where: { id },
      data: { status: 'LOCKED' },
    });
  }

  async release(id: string) {
    return this.db.escrow.update({
      where: { id },
      data: { status: 'RELEASED' },
    });
  }

  async dispute(id: string) {
    return this.db.escrow.update({
      where: { id },
      data: { status: 'DISPUTED' },
    });
  }

  async cancel(id: string) {
    return this.db.escrow.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async findByOrg(organizationId: string) {
    return this.db.escrow.findMany({
      where: { organizationId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}

export const escrowRepository = new EscrowRepository();
