import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class BdcRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    name?: string;
    location: string;
    city: string;
    latitude?: number;
    longitude?: number;
    manager?: string;
    licenseStatus?: string;
    openTime?: string;
    closeTime?: string;
    operatingHours?: string;
    status?: string;
  }) {
    return this.db.bdcDesk.create({
      data: {
        organizationId: data.organizationId,
        name: data.name ?? 'Main Desk',
        location: data.location,
        city: data.city,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        manager: data.manager ?? null,
        licenseStatus: data.licenseStatus ?? 'ACTIVE',
        openTime: data.openTime ?? null,
        closeTime: data.closeTime ?? null,
        operatingHours: data.operatingHours ?? null,
        status: data.status as any ?? 'OPEN',
      },
    });
  }

  async findById(id: string) {
    const desk = await this.db.bdcDesk.findUnique({
      where: { id, deletedAt: null },
      include: { organization: true, staff: { where: { deletedAt: null }, include: { user: true } }, inventory: true, deals: { where: { deletedAt: null }, orderBy: { createdAt: 'desc' }, take: 10 } },
    });
    if (!desk) throw new NotFoundError('BDC Desk');
    return desk;
  }

  async findByOrg(organizationId: string) {
    return this.db.bdcDesk.findMany({
      where: { organizationId, deletedAt: null },
      include: { staff: { where: { deletedAt: null } }, inventory: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Partial<{
    name: string;
    location: string;
    city: string;
    latitude: number;
    longitude: number;
    manager: string;
    licenseStatus: string;
    openTime: string;
    closeTime: string;
    operatingHours: string;
    status: string;
    active: boolean;
  }>) {
    return this.db.bdcDesk.update({
      where: { id },
      data: data as any,
    });
  }

  async updateStatus(id: string, status: string) {
    return this.db.bdcDesk.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async listActive() {
    return this.db.bdcDesk.findMany({
      where: { active: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async archive(id: string) {
    return this.db.bdcDesk.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const bdcRepository = new BdcRepository();
