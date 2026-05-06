import { v4 as uuidv4 } from 'uuid';
import { EscrowSchema, type Escrow } from '@cuboid/schemas';

export interface EscrowMilestone {
  id: string;
  type: 'MILESTONE' | 'DATE' | 'MANUAL' | 'AUTO';
  description: string;
  fulfilled: boolean;
  fulfilledAt?: string;
  evidence?: string;
}

export interface EscrowCondition {
  type: 'MILESTONE' | 'DATE' | 'MANUAL' | 'AUTO';
  description: string;
  fulfilled: boolean;
}

export interface EscrowRepository {
  create(data: {
    walletId: string;
    amount: string;
    currency: string;
    releaseConditions: EscrowCondition[];
  }): Promise<Escrow>;
  get(id: string): Promise<Escrow | null>;
  getByWallet(walletId: string): Promise<Escrow[]>;
  update(id: string, data: Partial<Escrow>): Promise<Escrow>;
  updateMilestone(escrowId: string, milestoneId: string, fulfilled: boolean, evidence?: string): Promise<Escrow>;
}

class InMemoryEscrowRepository implements EscrowRepository {
  private escrows: Map<string, Escrow> = new Map();

  async create(data: {
    walletId: string;
    amount: string;
    currency: string;
    releaseConditions: EscrowCondition[];
  }): Promise<Escrow> {
    const now = new Date().toISOString();
    const escrow: Escrow = {
      id: uuidv4(),
      walletId: data.walletId,
      amount: data.amount,
      currency: data.currency,
      status: 'PENDING',
      releaseConditions: data.releaseConditions.map(c => ({
        ...c,
        fulfilled: false,
      })),
      createdAt: now,
      updatedAt: now,
    };
    this.escrows.set(escrow.id, escrow);
    return escrow;
  }

  async get(id: string): Promise<Escrow | null> {
    return this.escrows.get(id) ?? null;
  }

  async getByWallet(walletId: string): Promise<Escrow[]> {
    return Array.from(this.escrows.values()).filter(e => e.walletId === walletId);
  }

  async update(id: string, data: Partial<Escrow>): Promise<Escrow> {
    const escrow = await this.get(id);
    if (!escrow) throw new Error('Escrow not found');
    const updated = { ...escrow, ...data, updatedAt: new Date().toISOString() };
    this.escrows.set(id, updated);
    return updated;
  }

  async updateMilestone(escrowId: string, milestoneId: string, fulfilled: boolean, evidence?: string): Promise<Escrow> {
    const escrow = await this.get(escrowId);
    if (!escrow) throw new Error('Escrow not found');

    const conditions = escrow.releaseConditions.map(c => 
      c.id === milestoneId 
        ? { ...c, fulfilled, fulfilledAt: fulfilled ? new Date().toISOString() : undefined, evidence }
        : c
    );

    return this.update(escrowId, { releaseConditions: conditions });
  }
}

export class EscrowService {
  private repository: EscrowRepository;

  constructor(repository: EscrowRepository = new InMemoryEscrowRepository()) {
    this.repository = repository;
  }

  async createEscrow(data: {
    walletId: string;
    amount: string;
    currency: string;
    releaseConditions: EscrowCondition[];
  }): Promise<Escrow> {
    const escrow = await this.repository.create(data);
    return this.repository.update(escrow.id, { status: 'ACTIVE' });
  }

  async getEscrow(id: string): Promise<Escrow | null> {
    return this.repository.get(id);
  }

  async getWalletEscrows(walletId: string): Promise<Escrow[]> {
    return this.repository.getByWallet(walletId);
  }

  async fulfillMilestone(
    escrowId: string, 
    milestoneId: string, 
    evidence?: string
  ): Promise<Escrow> {
    const escrow = await this.repository.get(escrowId);
    if (!escrow) throw new Error('Escrow not found');
    if (escrow.status !== 'ACTIVE') throw new Error('Escrow not active');

    return this.repository.updateMilestone(escrowId, milestoneId, true, evidence);
  }

  async releaseEscrow(id: string, partialRelease?: { amount?: string }): Promise<Escrow> {
    const escrow = await this.repository.get(id);
    if (!escrow) throw new Error('Escrow not found');
    if (escrow.status !== 'ACTIVE') throw new Error('Escrow not active');

    const allFulfilled = escrow.releaseConditions.every(c => c.fulfilled);
    if (!allFulfilled) throw new Error('Not all conditions fulfilled');

    const releaseAmount = partialRelease?.amount ?? escrow.amount;
    if (BigInt(releaseAmount) > BigInt(escrow.amount)) {
      throw new Error('Release amount exceeds escrow balance');
    }

    const remaining = BigInt(escrow.amount) - BigInt(releaseAmount);
    
    if (remaining === 0n) {
      return this.repository.update(id, { status: 'RELEASED' });
    }

    return this.repository.update(id, {
      amount: remaining.toString(),
      status: 'ACTIVE',
    });
  }

  async disputeEscrow(id: string, reason: string): Promise<Escrow> {
    const escrow = await this.repository.get(id);
    if (!escrow) throw new Error('Escrow not found');

    return this.repository.update(id, { status: 'DISPUTED' });
  }

  async cancelEscrow(id: string): Promise<Escrow> {
    const escrow = await this.repository.get(id);
    if (!escrow) throw new Error('Escrow not found');
    
    if (escrow.status === 'RELEASED') {
      throw new Error('Cannot cancel released escrow');
    }

    return this.repository.update(id, { status: 'CANCELLED' });
  }

  async returnFunds(id: string): Promise<Escrow> {
    const escrow = await this.repository.get(id);
    if (!escrow) throw new Error('Escrow not found');

    return this.repository.update(id, { status: 'RETURNED' });
  }

  async getEscrowStatus(id: string): Promise<{
    status: Escrow['status'];
    amount: string;
    fulfilledConditions: number;
    totalConditions: number;
    canRelease: boolean;
    canDispute: boolean;
  } | null> {
    const escrow = await this.repository.get(id);
    if (!escrow) return null;

    const fulfilledConditions = escrow.releaseConditions.filter(c => c.fulfilled).length;
    const totalConditions = escrow.releaseConditions.length;
    const canRelease = fulfilledConditions === totalConditions && escrow.status === 'ACTIVE';

    return {
      status: escrow.status,
      amount: escrow.amount,
      fulfilledConditions,
      totalConditions,
      canRelease,
      canDispute: escrow.status === 'ACTIVE',
    };
  }
}

export default EscrowService;