import { bdcRepository } from '../repositories/BdcRepository';
import { marketRepository } from '../repositories/MarketRepository';
import { ValidationError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class BdcService {
  private repo = bdcRepository;
  private marketRepo = marketRepository;

  async createDesk(data: {
    organizationId: string;
    location: string;
    city: string;
    latitude?: number;
    longitude?: number;
    operatingHours?: string;
    actorId: string;
  }) {
    const desk = await this.repo.create({
      organizationId: data.organizationId,
      location: data.location,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      operatingHours: data.operatingHours,
    });

    await globalEventBus.emit('BDC_DESK_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { deskId: desk.id, location: desk.location },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BDC_DESK_CREATED',
      entityType: 'BdcDesk',
      entityId: desk.id,
      metadata: { location: desk.location, city: desk.city },
    });

    return desk;
  }

  async updateDesk(id: string, data: {
    location?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    operatingHours?: string;
    active?: boolean;
    actorId: string;
  }) {
    const desk = await this.repo.update(id, {
      location: data.location,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      operatingHours: data.operatingHours,
      active: data.active,
    });

    await auditLog({
      organizationId: desk.organizationId,
      actorId: data.actorId,
      action: 'BDC_DESK_UPDATED',
      entityType: 'BdcDesk',
      entityId: desk.id,
      metadata: { location: desk.location },
    });

    return desk;
  }

  async publishRate(data: {
    organizationId: string;
    pairId: string;
    region: string;
    buyRate: number;
    sellRate: number;
    actorId: string;
  }) {
    const rate = await this.marketRepo.publishRate({
      organizationId: data.organizationId,
      pairId: data.pairId,
      region: data.region,
      buyRate: data.buyRate,
      sellRate: data.sellRate,
      spread: data.sellRate - data.buyRate,
    });

    await globalEventBus.emit('BDC_RATE_PUBLISHED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { rateId: rate.id, pairId: data.pairId, region: data.region },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BDC_RATE_PUBLISHED',
      entityType: 'FxRate',
      entityId: rate.id,
      metadata: { pairId: data.pairId, buyRate: data.buyRate, sellRate: data.sellRate },
    });

    return rate;
  }

  async getDesks(organizationId: string) {
    return this.repo.findByOrg(organizationId);
  }

  async getLiquidity() {
    return this.repo.listActive();
  }

  async getOperationalReport(organizationId: string) {
    return this.repo.findByOrg(organizationId);
  }
}

export const bdcService = new BdcService();
