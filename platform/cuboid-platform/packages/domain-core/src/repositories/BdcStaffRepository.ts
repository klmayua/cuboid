import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class BdcStaffRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    deskId: string;
    userId: string;
    name: string;
    email?: string;
    phone?: string;
    role?: string;
  }) {
    return this.db.bdcStaff.create({
      data: {
        organizationId: data.organizationId,
        deskId: data.deskId,
        userId: data.userId,
        name: data.name,
        email: data.email ?? null,
        phone: data.phone ?? null,
        role: data.role as any ?? 'CASHIER',
      },
    });
  }

  async findById(id: string) {
    const staff = await this.db.bdcStaff.findUnique({
      where: { id, deletedAt: null },
      include: { user: true, desk: true },
    });
    if (!staff) throw new NotFoundError('BDC Staff');
    return staff;
  }

  async listByOrg(organizationId: string) {
    return this.db.bdcStaff.findMany({
      where: { organizationId, deletedAt: null },
      include: { user: true, desk: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listByDesk(deskId: string) {
    return this.db.bdcStaff.findMany({
      where: { deskId, deletedAt: null },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Partial<{ name: string; email: string; phone: string; role: string; active: boolean }>) {
    return this.db.bdcStaff.update({
      where: { id },
      data: { ...data, role: data.role as any },
    });
  }

  async archive(id: string) {
    return this.db.bdcStaff.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const bdcStaffRepository = new BdcStaffRepository();
