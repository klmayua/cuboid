import { bdcRepository } from '../repositories/BdcRepository';
import { bdcStaffRepository } from '../repositories/BdcStaffRepository';
import { bdcInventoryRepository } from '../repositories/BdcInventoryRepository';
import { bdcDealRepository } from '../repositories/BdcDealRepository';
import { complianceRepository } from '../repositories/ComplianceRepository';
import { marketRepository } from '../repositories/MarketRepository';
import { ValidationError, NotFoundError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class BdcTowerService {
  private deskRepo = bdcRepository;
  private staffRepo = bdcStaffRepository;
  private inventoryRepo = bdcInventoryRepository;
  private dealRepo = bdcDealRepository;
  private complianceRepo = complianceRepository;
  private marketRepo = marketRepository;

  // ── DESK OPS ──
  async createDesk(data: {
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
    actorId: string;
  }) {
    const desk = await this.deskRepo.create(data);
    await globalEventBus.emit('BDC_DESK_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { deskId: desk.id, name: desk.name, location: desk.location },
    });
    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BDC_DESK_CREATED',
      entityType: 'BdcDesk',
      entityId: desk.id,
      metadata: { name: desk.name, location: desk.location, city: desk.city },
    });
    return desk;
  }

  async updateDesk(id: string, data: {
    name?: string;
    location?: string;
    city?: string;
    manager?: string;
    licenseStatus?: string;
    openTime?: string;
    closeTime?: string;
    operatingHours?: string;
    active?: boolean;
    actorId: string;
  }) {
    const desk = await this.deskRepo.update(id, data);
    await auditLog({
      organizationId: desk.organizationId,
      actorId: data.actorId,
      action: 'BDC_DESK_UPDATED',
      entityType: 'BdcDesk',
      entityId: desk.id,
      metadata: { name: desk.name, location: desk.location },
    });
    return desk;
  }

  async setDeskStatus(id: string, status: string, actorId: string) {
    const desk = await this.deskRepo.findById(id);
    const updated = await this.deskRepo.updateStatus(id, status);
    await globalEventBus.emit('BDC_DESK_STATUS_CHANGED', {
      actorId,
      organizationId: desk.organizationId,
      payload: { deskId: id, status },
    });
    return updated;
  }

  async getDesks(organizationId: string) {
    return this.deskRepo.findByOrg(organizationId);
  }

  async getDesk(id: string) {
    return this.deskRepo.findById(id);
  }

  // ── STAFF ──
  async addStaff(data: {
    organizationId: string;
    deskId: string;
    userId: string;
    name: string;
    email?: string;
    phone?: string;
    role?: string;
    actorId: string;
  }) {
    const staff = await this.staffRepo.create(data);
    await globalEventBus.emit('BDC_STAFF_ADDED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { staffId: staff.id, name: staff.name, role: staff.role },
    });
    return staff;
  }

  async listStaff(organizationId: string) {
    return this.staffRepo.listByOrg(organizationId);
  }

  async listStaffByDesk(deskId: string) {
    return this.staffRepo.listByDesk(deskId);
  }

  async updateStaff(id: string, data: Partial<{ name: string; email: string; phone: string; role: string; active: boolean }>, actorId: string) {
    const staff = await this.staffRepo.findById(id);
    const updated = await this.staffRepo.update(id, data);
    await auditLog({
      organizationId: staff.organizationId,
      actorId,
      action: 'BDC_STAFF_UPDATED',
      entityType: 'BdcStaff',
      entityId: id,
      metadata: { role: data.role, active: data.active },
    });
    return updated;
  }

  async removeStaff(id: string, actorId: string) {
    const staff = await this.staffRepo.findById(id);
    await this.staffRepo.archive(id);
    await auditLog({
      organizationId: staff.organizationId,
      actorId,
      action: 'BDC_STAFF_REMOVED',
      entityType: 'BdcStaff',
      entityId: id,
    });
    return { removed: true };
  }

  // ── INVENTORY ──
  async createInventory(data: {
    organizationId: string;
    deskId: string;
    currency: string;
    available?: number;
    reserved?: number;
    pendingSettlement?: number;
    minimumThreshold?: number;
    actorId: string;
  }) {
    const item = await this.inventoryRepo.create(data);
    await globalEventBus.emit('BDC_INVENTORY_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { inventoryId: item.id, currency: item.currency, deskId: item.deskId },
    });
    return item;
  }

  async listInventory(organizationId: string) {
    return this.inventoryRepo.listByOrg(organizationId);
  }

  async listInventoryByDesk(deskId: string) {
    return this.inventoryRepo.findByDesk(deskId);
  }

  async addStock(inventoryId: string, amount: number, actorId: string, organizationId: string) {
    const updated = await this.inventoryRepo.addStock(inventoryId, amount);
    await globalEventBus.emit('BDC_INVENTORY_ADDED', {
      actorId,
      organizationId,
      payload: { inventoryId, amount },
    });
    return updated;
  }

  async reserveStock(inventoryId: string, amount: number, actorId: string, organizationId: string) {
    const item = await this.inventoryRepo.findById(inventoryId);
    if (Number(item.available) < amount) {
      throw new ValidationError('Insufficient inventory available');
    }
    const updated = await this.inventoryRepo.reserve(inventoryId, amount);
    await globalEventBus.emit('BDC_INVENTORY_RESERVED', {
      actorId,
      organizationId,
      payload: { inventoryId, amount },
    });
    return updated;
  }

  async releaseStock(inventoryId: string, amount: number, actorId: string, organizationId: string) {
    const updated = await this.inventoryRepo.release(inventoryId, amount);
    await globalEventBus.emit('BDC_INVENTORY_RELEASED', {
      actorId,
      organizationId,
      payload: { inventoryId, amount },
    });
    return updated;
  }

  // ── DEALS ──
  async createDeal(data: {
    organizationId: string;
    deskId: string;
    source?: string;
    customerName: string;
    customerPhone?: string;
    corridor: string;
    amount: number;
    currency?: string;
    rate: number;
    side?: string;
    notes?: string;
    actorId: string;
  }) {
    const deal = await this.dealRepo.create(data);
    await globalEventBus.emit('BDC_DEAL_CREATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { dealId: deal.id, amount: deal.amount, corridor: deal.corridor },
    });
    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BDC_DEAL_CREATED',
      entityType: 'BdcDeal',
      entityId: deal.id,
      metadata: { customerName: deal.customerName, amount: deal.amount, corridor: deal.corridor },
    });
    return deal;
  }

  async listDeals(organizationId: string) {
    return this.dealRepo.listByOrg(organizationId);
  }

  async listDealsByDesk(deskId: string) {
    return this.dealRepo.listByDesk(deskId);
  }

  async advanceDeal(dealId: string, status: string, actorId: string, organizationId: string) {
    const deal = await this.dealRepo.findById(dealId);
    const updated = await this.dealRepo.updateStatus(dealId, status);
    await globalEventBus.emit('BDC_DEAL_ADVANCED', {
      actorId,
      organizationId,
      payload: { dealId, from: deal.status, to: status },
    });
    return updated;
  }

  async closeDeal(dealId: string, settledAmount: number, actorId: string, organizationId: string) {
    await this.dealRepo.setSettledAmount(dealId, settledAmount);
    const updated = await this.dealRepo.updateStatus(dealId, 'CLOSED');
    await globalEventBus.emit('BDC_DEAL_CLOSED', {
      actorId,
      organizationId,
      payload: { dealId, settledAmount },
    });
    return updated;
  }

  async failDeal(dealId: string, actorId: string, organizationId: string) {
    const updated = await this.dealRepo.updateStatus(dealId, 'FAILED');
    await globalEventBus.emit('BDC_DEAL_FAILED', {
      actorId,
      organizationId,
      payload: { dealId },
    });
    return updated;
  }

  // ── COMPLIANCE ──
  async createComplianceDoc(data: {
    organizationId: string;
    docType: string;
    title: string;
    reference?: string;
    issuedAt?: Date;
    expiresAt?: Date;
    status?: string;
    metadataJson?: any;
    actorId: string;
  }) {
    const doc = await this.complianceRepo.create(data);
    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'COMPLIANCE_DOC_CREATED',
      entityType: 'ComplianceDoc',
      entityId: doc.id,
      metadata: { title: doc.title, docType: doc.docType },
    });
    return doc;
  }

  async listComplianceDocs(organizationId: string) {
    return this.complianceRepo.listByOrg(organizationId);
  }

  async listExpiringDocs(organizationId: string, days?: number) {
    return this.complianceRepo.listExpiringSoon(organizationId, days);
  }

  // ── RATE PUBLISH ──
  async publishRate(data: {
    organizationId: string;
    pairId: string;
    region: string;
    buyRate: number;
    sellRate: number;
    quotedVolume?: number;
    actorId: string;
  }) {
    const rate = await this.marketRepo.publishRate({
      organizationId: data.organizationId,
      pairId: data.pairId,
      region: data.region,
      buyRate: data.buyRate,
      sellRate: data.sellRate,
      spread: data.sellRate - data.buyRate,
      quotedVolume: data.quotedVolume,
    });
    await globalEventBus.emit('BDC_RATE_PUBLISHED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { rateId: rate.id, pairId: data.pairId, region: data.region },
    });
    return rate;
  }

  // ── DASHBOARD ──
  async getDashboard(organizationId: string) {
    const [desks, staff, inventory, deals, docs] = await Promise.all([
      this.deskRepo.findByOrg(organizationId),
      this.staffRepo.listByOrg(organizationId),
      this.inventoryRepo.listByOrg(organizationId),
      this.dealRepo.listByOrg(organizationId),
      this.complianceRepo.listByOrg(organizationId),
    ]);

    const openDesks = desks.filter((d: any) => d.status === 'OPEN').length;
    const lowInventory = inventory.filter((i: any) => i.lowInventoryAlert).length;
    const todayDeals = deals.filter((d: any) => {
      const created = new Date(d.createdAt);
      const now = new Date();
      return created.toDateString() === now.toDateString();
    }).length;
    const expiringDocs = docs.filter((d: any) => {
      if (!d.expiresAt) return false;
      const days = Math.ceil((new Date(d.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return days <= 30 && days >= 0;
    }).length;

    return {
      desks: { total: desks.length, open: openDesks },
      staff: { total: staff.length },
      inventory: { total: inventory.length, lowAlert: lowInventory },
      deals: { total: deals.length, today: todayDeals },
      compliance: { total: docs.length, expiringSoon: expiringDocs },
    };
  }

  async getAnalytics(organizationId: string) {
    const [deals, inventory] = await Promise.all([
      this.dealRepo.listByOrg(organizationId),
      this.inventoryRepo.listByOrg(organizationId),
    ]);

    const byCorridor: Record<string, { count: number; volume: number }> = {};
    for (const d of deals) {
      const c = d.corridor;
      if (!byCorridor[c]) byCorridor[c] = { count: 0, volume: 0 };
      byCorridor[c].count += 1;
      byCorridor[c].volume += Number(d.amount);
    }

    const closedDeals = deals.filter((d: any) => d.status === 'CLOSED');
    const avgTicket = closedDeals.length > 0
      ? closedDeals.reduce((sum: number, d: any) => sum + Number(d.amount), 0) / closedDeals.length
      : 0;

    return {
      totalDeals: deals.length,
      closedDeals: closedDeals.length,
      avgTicket,
      byCorridor,
      inventorySummary: inventory.map((i: any) => ({
        currency: i.currency,
        available: Number(i.available),
        reserved: Number(i.reserved),
        pendingSettlement: Number(i.pendingSettlement),
        lowAlert: i.lowInventoryAlert,
      })),
    };
  }
}

export const bdcTowerService = new BdcTowerService();
