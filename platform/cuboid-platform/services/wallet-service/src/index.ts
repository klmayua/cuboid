import { v4 as uuidv4 } from 'uuid';
import { WalletSchema, type Wallet } from '@cuboid/schemas';

export interface WalletRepository {
  create(data: {
    organizationId: string;
    currency: string;
    ledgerType: 'OPERATIONAL' | 'ESCROW' | 'RESERVE';
  }): Promise<Wallet>;
  get(id: string): Promise<Wallet | null>;
  getByOrganization(organizationId: string): Promise<Wallet[]>;
  update(id: string, data: Partial<Wallet>): Promise<Wallet>;
  updateBalance(id: string, balance: string, availableBalance: string, reservedBalance: string): Promise<Wallet>;
  freeze(id: string): Promise<Wallet>;
  unfreeze(id: string): Promise<Wallet>;
}

class InMemoryWalletRepository implements WalletRepository {
  private wallets: Map<string, Wallet> = new Map();

  async create(data: {
    organizationId: string;
    currency: string;
    ledgerType: 'OPERATIONAL' | 'ESCROW' | 'RESERVE';
  }): Promise<Wallet> {
    const now = new Date().toISOString();
    const wallet: Wallet = {
      id: uuidv4(),
      organizationId: data.organizationId,
      currency: data.currency.toUpperCase(),
      balance: '0',
      availableBalance: '0',
      reservedBalance: '0',
      ledgerType: data.ledgerType,
      status: 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    };
    this.wallets.set(wallet.id, wallet);
    return wallet;
  }

  async get(id: string): Promise<Wallet | null> {
    return this.wallets.get(id) ?? null;
  }

  async getByOrganization(organizationId: string): Promise<Wallet[]> {
    return Array.from(this.wallets.values()).filter(w => w.organizationId === organizationId);
  }

  async update(id: string, data: Partial<Wallet>): Promise<Wallet> {
    const wallet = await this.get(id);
    if (!wallet) throw new Error('Wallet not found');
    const updated = { ...wallet, ...data, updatedAt: new Date().toISOString() };
    this.wallets.set(id, updated);
    return updated;
  }

  async updateBalance(id: string, balance: string, availableBalance: string, reservedBalance: string): Promise<Wallet> {
    return this.update(id, { balance, availableBalance, reservedBalance });
  }

  async freeze(id: string): Promise<Wallet> {
    return this.update(id, { status: 'FROZEN' });
  }

  async unfreeze(id: string): Promise<Wallet> {
    return this.update(id, { status: 'ACTIVE' });
  }
}

export class WalletService {
  private repository: WalletRepository;

  constructor(repository: WalletRepository = new InMemoryWalletRepository()) {
    this.repository = repository;
  }

  async createWallet(data: {
    organizationId: string;
    currency: string;
    ledgerType?: 'OPERATIONAL' | 'ESCROW' | 'RESERVE';
  }): Promise<Wallet> {
    return this.repository.create({
      organizationId: data.organizationId,
      currency: data.currency,
      ledgerType: data.ledgerType ?? 'OPERATIONAL',
    });
  }

  async getWallet(id: string): Promise<Wallet | null> {
    return this.repository.get(id);
  }

  async getOrganizationWallets(organizationId: string): Promise<Wallet[]> {
    return this.repository.getByOrganization(organizationId);
  }

  async creditWallet(walletId: string, amount: string): Promise<Wallet> {
    const wallet = await this.repository.get(walletId);
    if (!wallet) throw new Error('Wallet not found');
    if (wallet.status === 'FROZEN') throw new Error('Wallet is frozen');

    const currentBalance = BigInt(wallet.balance);
    const newBalance = (currentBalance + BigInt(amount)).toString();
    const currentAvailable = BigInt(wallet.availableBalance);
    const newAvailable = (currentAvailable + BigInt(amount)).toString();

    return this.repository.updateBalance(walletId, newBalance, newAvailable, wallet.reservedBalance);
  }

  async debitWallet(walletId: string, amount: string): Promise<Wallet> {
    const wallet = await this.repository.get(walletId);
    if (!wallet) throw new Error('Wallet not found');
    if (wallet.status === 'FROZEN') throw new Error('Wallet is frozen');

    const available = BigInt(wallet.availableBalance);
    if (available < BigInt(amount)) throw new Error('Insufficient funds');

    const currentBalance = BigInt(wallet.balance);
    const newBalance = (currentBalance - BigInt(amount)).toString();
    const newAvailable = (available - BigInt(amount)).toString();

    return this.repository.updateBalance(walletId, newBalance, newAvailable, wallet.reservedBalance);
  }

  async reserveFunds(walletId: string, amount: string): Promise<Wallet> {
    const wallet = await this.repository.get(walletId);
    if (!wallet) throw new Error('Wallet not found');

    const available = BigInt(wallet.availableBalance);
    if (available < BigInt(amount)) throw new Error('Insufficient available funds');

    const currentReserved = BigInt(wallet.reservedBalance);
    const newReserved = (currentReserved + BigInt(amount)).toString();
    const newAvailable = (available - BigInt(amount)).toString();

    return this.repository.updateBalance(walletId, wallet.balance, newAvailable, newReserved);
  }

  async releaseFunds(walletId: string, amount: string): Promise<Wallet> {
    const wallet = await this.repository.get(walletId);
    if (!wallet) throw new Error('Wallet not found');

    const reserved = BigInt(wallet.reservedBalance);
    const newReserved = (reserved - BigInt(amount)).toString();
    const available = BigInt(wallet.availableBalance);
    const newAvailable = (available + BigInt(amount)).toString();

    return this.repository.updateBalance(walletId, wallet.balance, newAvailable, newReserved);
  }

  async freezeWallet(walletId: string): Promise<Wallet> {
    return this.repository.freeze(walletId);
  }

  async unfreezeWallet(walletId: string): Promise<Wallet> {
    return this.repository.unfreeze(walletId);
  }
}

export default WalletService;