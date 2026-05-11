import { bdcTowerService } from '@cuboid/domain-core';

// Desk Ops
export async function getBdcDashboard(organizationId: string) {
  return bdcTowerService.getDashboard(organizationId);
}

export async function getBdcDesks(organizationId: string) {
  return bdcTowerService.getDesks(organizationId);
}

export async function getBdcDesk(id: string) {
  return bdcTowerService.getDesk(id);
}

export async function createBdcDesk(data: Parameters<typeof bdcTowerService.createDesk>[0]) {
  return bdcTowerService.createDesk(data);
}

export async function updateBdcDesk(id: string, data: Parameters<typeof bdcTowerService.updateDesk>[1]) {
  return bdcTowerService.updateDesk(id, data);
}

export async function setBdcDeskStatus(id: string, status: string, actorId: string) {
  return bdcTowerService.setDeskStatus(id, status, actorId);
}

// Staff
export async function addBdcStaff(data: Parameters<typeof bdcTowerService.addStaff>[0]) {
  return bdcTowerService.addStaff(data);
}

export async function listBdcStaff(organizationId: string) {
  return bdcTowerService.listStaff(organizationId);
}

export async function listBdcStaffByDesk(deskId: string) {
  return bdcTowerService.listStaffByDesk(deskId);
}

export async function updateBdcStaff(id: string, data: Parameters<typeof bdcTowerService.updateStaff>[1], actorId: string) {
  return bdcTowerService.updateStaff(id, data, actorId);
}

export async function removeBdcStaff(id: string, actorId: string) {
  return bdcTowerService.removeStaff(id, actorId);
}

// Inventory
export async function createBdcInventory(data: Parameters<typeof bdcTowerService.createInventory>[0]) {
  return bdcTowerService.createInventory(data);
}

export async function listBdcInventory(organizationId: string) {
  return bdcTowerService.listInventory(organizationId);
}

export async function listBdcInventoryByDesk(deskId: string) {
  return bdcTowerService.listInventoryByDesk(deskId);
}

export async function addBdcStock(inventoryId: string, amount: number, actorId: string, organizationId: string) {
  return bdcTowerService.addStock(inventoryId, amount, actorId, organizationId);
}

export async function reserveBdcStock(inventoryId: string, amount: number, actorId: string, organizationId: string) {
  return bdcTowerService.reserveStock(inventoryId, amount, actorId, organizationId);
}

export async function releaseBdcStock(inventoryId: string, amount: number, actorId: string, organizationId: string) {
  return bdcTowerService.releaseStock(inventoryId, amount, actorId, organizationId);
}

// Deals
export async function createBdcDeal(data: Parameters<typeof bdcTowerService.createDeal>[0]) {
  return bdcTowerService.createDeal(data);
}

export async function listBdcDeals(organizationId: string) {
  return bdcTowerService.listDeals(organizationId);
}

export async function listBdcDealsByDesk(deskId: string) {
  return bdcTowerService.listDealsByDesk(deskId);
}

export async function advanceBdcDeal(dealId: string, status: string, actorId: string, organizationId: string) {
  return bdcTowerService.advanceDeal(dealId, status, actorId, organizationId);
}

export async function closeBdcDeal(dealId: string, settledAmount: number, actorId: string, organizationId: string) {
  return bdcTowerService.closeDeal(dealId, settledAmount, actorId, organizationId);
}

export async function failBdcDeal(dealId: string, actorId: string, organizationId: string) {
  return bdcTowerService.failDeal(dealId, actorId, organizationId);
}

// Compliance
export async function createComplianceDoc(data: Parameters<typeof bdcTowerService.createComplianceDoc>[0]) {
  return bdcTowerService.createComplianceDoc(data);
}

export async function listComplianceDocs(organizationId: string) {
  return bdcTowerService.listComplianceDocs(organizationId);
}

export async function listExpiringComplianceDocs(organizationId: string, days?: number) {
  return bdcTowerService.listExpiringDocs(organizationId, days);
}

// Rates
export async function publishBdcRate(data: Parameters<typeof bdcTowerService.publishRate>[0]) {
  return bdcTowerService.publishRate(data);
}

// Analytics
export async function getBdcAnalytics(organizationId: string) {
  return bdcTowerService.getAnalytics(organizationId);
}

// Legacy aliases for backward compat
export async function getBdcLiquidity() {
  return bdcTowerService.getDesks('');
}

export async function getBdcStaff(organizationId: string) {
  return bdcTowerService.listStaff(organizationId);
}

export async function getBdcReports(organizationId: string) {
  return bdcTowerService.getAnalytics(organizationId);
}
