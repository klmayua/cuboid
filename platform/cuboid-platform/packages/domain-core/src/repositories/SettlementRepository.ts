import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class SettlementRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    escrowId?: string;
    reference: string;
    amount: number;
    currency: string;
  }) {
    return this.db.transaction.create({
      data: { ...data, status: 'INITIATED' },
    });
  }

  async findById(id: string) {
    const tx = await this.db.transaction.findUnique({
      where: { id, deletedAt: null },
      include: { escrow: true, settlement: true },
    });
    if (!tx) throw new NotFoundError('Transaction');
    return tx;
  }

  async process(id: string) {
    return this.db.transaction.update({
      where: { id },
      data: { status: 'PROCESSING' },
    });
  }

  async clear(id: string, channel: string) {
    const [tx] = await this.db.$transaction([
      this.db.transaction.update({
        where: { id },
        data: { status: 'CLEARED' },
      }),
      this.db.settlementRecord.create({
        data: {
          transactionId: id,
          channel: channel as any,
          clearedAt: new Date(),
        },
      }),
    ]);
    return tx;
  }

  async fail(id: string) {
    return this.db.transaction.update({
      where: { id },
      data: { status: 'FAILED' },
    });
  }

  async reverse(id: string) {
    return this.db.transaction.update({
      where: { id },
      data: { status: 'REVERSED' },
    });
  }

  async findByOrg(organizationId: string) {
    return this.db.transaction.findMany({
      where: { organizationId, deletedAt: null },
      include: { settlement: true, escrow: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}

export const settlementRepository = new SettlementRepository();
