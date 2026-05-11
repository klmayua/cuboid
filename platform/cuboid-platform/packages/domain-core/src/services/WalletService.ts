import { walletRepository } from '../repositories/WalletRepository';
import { LiquidityError } from '../errors';
import { globalEventBus } from '../events';

export class WalletService {
  private repo = walletRepository;

  async createWallet(organizationId: string, currency: string) {
    return this.repo.createWallet(organizationId, currency);
  }

  async getBalances(organizationId: string) {
    return this.repo.findByOrg(organizationId);
  }

  async reserveFunds(walletId: string, amount: number, actorId: string) {
    const wallet = await this.repo.reserveBalance(walletId, amount);

    await globalEventBus.emit('WALLET_RESERVED', {
      actorId,
      organizationId: wallet.organizationId,
      payload: { walletId, amount, action: 'RESERVE' },
    });

    return wallet;
  }

  async releaseFunds(walletId: string, amount: number, actorId: string) {
    const wallet = await this.repo.releaseReserve(walletId, amount);
    return wallet;
  }

  async debit(walletId: string, amount: number, reference: string, actorId: string) {
    const wallet = await this.repo.debit(walletId, amount, reference);
    return wallet;
  }

  async credit(walletId: string, amount: number, reference: string, actorId: string) {
    const wallet = await this.repo.credit(walletId, amount, reference);
    return wallet;
  }

  async transfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number,
    reference: string,
    actorId: string
  ) {
    const [fromWallet, toWallet] = await Promise.all([
      this.repo.findById(fromWalletId),
      this.repo.findById(toWalletId),
    ]);

    await this.repo.debit(fromWalletId, amount, reference);
    await this.repo.credit(toWalletId, amount, reference);

    return { fromWallet, toWallet };
  }
}

export const walletService = new WalletService();
