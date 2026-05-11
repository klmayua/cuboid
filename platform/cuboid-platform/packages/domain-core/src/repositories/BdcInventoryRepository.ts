import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class BdcInventoryRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    deskId: string;
    currency: string;
    available?: number;
    reserved?: number;
    pendingSettlement?: number;
    minimumThreshold?: number;
  }) {
    return this.db.bdcInventory.create({
      data: {
        organizationId: data.organizationId,
        deskId: data.deskId,
        currency: data.currency,
        available: data.available ?? 0,
        reserved: data.reserved ?? 0,
        pendingSettlement: data.pendingSettlement ?? 0,
        minimumThreshold: data.minimumThreshold ?? 0,
        lowInventoryAlert: (data.available ?? 0) <= (data.minimumThreshold ?? 0),
      },
    });
  }

  async findById(id: string) {
    const item = await this.db.bdcInventory.findUnique({
      where: { id },
      include: { desk: true },
    });
    if (!item) throw new NotFoundError('BDC Inventory');
    return item;
  }

  async findByDesk(deskId: string) {
    return this.db.bdcInventory.findMany({
      where: { deskId },
      include: { desk: true },
      orderBy: { currency: 'asc' },
    });
  }

  async listByOrg(organizationId: string) {
    return this.db.bdcInventory.findMany({
      where: { organizationId },
      include: { desk: true },
      orderBy: { currency: 'asc' },
    });
  }

  async update(id: string, data: Partial<{
    available: number;
    reserved: number;
    pendingSettlement: number;
    minimumThreshold: number;
  }>) {
    const current = await this.findById(id);
    const available = data.available ?? Number(current.available);
    const minimumThreshold = data.minimumThreshold ?? Number(current.minimumThreshold);
    return this.db.bdcInventory.update({
      where: { id },
      data: {
        ...data,
        lowInventoryAlert: available <= minimumThreshold,
      },
    });
  }

  async addStock(id: string, amount: number) {
    return this.db.bdcInventory.update({
      where: { id },
      data: { available: { increment: amount } },
    });
  }

  async reserve(id: string, amount: number) {
    return this.db.bdcInventory.update({
      where: { id },
      data: {
        available: { decrement: amount },
        reserved: { increment: amount },
      },
    });
  }

  async release(id: string, amount: number) {
    return this.db.bdcInventory.update({
      where: { id },
      data: {
        available: { increment: amount },
        reserved: { decrement: amount },
      },
    });
  }

  async delete(id: string) {
    return this.db.bdcInventory.delete({ where: { id } });
  }
}

export const bdcInventoryRepository = new BdcInventoryRepository();
