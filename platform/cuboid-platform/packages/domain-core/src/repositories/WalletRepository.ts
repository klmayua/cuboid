import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError, LiquidityError } from '../errors';

export class WalletRepository extends BaseRepository {
  async createWallet(organizationId: string, currency: string) {
    return this.db.wallet.create({
      data: { organizationId, currency, balance: 0, availableBalance: 0, reservedBalance: 0 },
    });
  }

  async findByOrg(organizationId: string) {
    return this.db.wallet.findMany({
      where: { organizationId, deletedAt: null },
      include: { entries: { take: 10, orderBy: { createdAt: 'desc' } } },
    });
  }

  async findById(id: string) {
    const wallet = await this.db.wallet.findUnique({
      where: { id, deletedAt: null },
      include: { entries: { take: 20, orderBy: { createdAt: 'desc' } } },
    });
    if (!wallet) throw new NotFoundError('Wallet');
    return wallet;
  }

  async findByOrgAndCurrency(organizationId: string, currency: string) {
    return this.db.wallet.findUnique({
      where: { organizationId_currency: { organizationId, currency } },
    });
  }

  async reserveBalance(walletId: string, amount: number) {
    const wallet = await this.findById(walletId);
    if (Number(wallet.availableBalance) < amount) {
      throw new LiquidityError('Insufficient available balance');
    }
    return this.db.wallet.update({
      where: { id: walletId },
      data: {
        availableBalance: { decrement: amount },
        reservedBalance: { increment: amount },
      },
    });
  }

  async releaseReserve(walletId: string, amount: number) {
    return this.db.wallet.update({
      where: { id: walletId },
      data: {
        availableBalance: { increment: amount },
        reservedBalance: { decrement: amount },
      },
    });
  }

  async debit(walletId: string, amount: number, reference?: string) {
    const wallet = await this.findById(walletId);
    if (Number(wallet.balance) < amount) {
      throw new LiquidityError('Insufficient balance');
    }

    const [updated] = await this.db.$transaction([
      this.db.wallet.update({
        where: { id: walletId },
        data: {
          balance: { decrement: amount },
          availableBalance: { decrement: amount },
        },
      }),
      this.db.walletEntry.create({
        data: {
          walletId,
          debit: amount,
          credit: 0,
          runningBalance: Number(wallet.balance) - amount,
          reference,
        },
      }),
    ]);

    return updated;
  }

  async credit(walletId: string, amount: number, reference?: string) {
    const wallet = await this.findById(walletId);

    const [updated] = await this.db.$transaction([
      this.db.wallet.update({
        where: { id: walletId },
        data: {
          balance: { increment: amount },
          availableBalance: { increment: amount },
        },
      }),
      this.db.walletEntry.create({
        data: {
          walletId,
          debit: 0,
          credit: amount,
          runningBalance: Number(wallet.balance) + amount,
          reference,
        },
      }),
    ]);

    return updated;
  }
}

export const walletRepository = new WalletRepository();
