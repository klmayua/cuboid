import { leadService, dealPipelineService, commissionService, clientBookService } from '@cuboid/domain-core';

// Lead Engine
export async function createBrokerLead(data: Parameters<typeof leadService.createLead>[0]) {
  return leadService.createLead(data);
}

export async function listClaimableLeads(organizationId?: string) {
  return leadService.listClaimable(organizationId);
}

export async function listBrokerLeads(organizationId: string) {
  return leadService.listByOrg(organizationId);
}

export async function claimBrokerLead(leadId: string, brokerId: string, organizationId: string) {
  return leadService.claimLead(leadId, brokerId, organizationId);
}

export async function releaseBrokerLead(leadId: string, brokerId: string, organizationId: string) {
  return leadService.releaseLead(leadId, brokerId, organizationId);
}

export async function convertBrokerLead(leadId: string, dealId: string, brokerId: string, organizationId: string) {
  return leadService.convertLead(leadId, dealId, brokerId, organizationId);
}

export async function archiveBrokerLead(leadId: string, brokerId: string, organizationId: string) {
  return leadService.archiveLead(leadId, brokerId, organizationId);
}

// Deal Pipeline
export async function createBrokerDeal(data: Parameters<typeof dealPipelineService.createDeal>[0]) {
  return dealPipelineService.createDeal(data);
}

export async function listBrokerDeals(organizationId: string) {
  return dealPipelineService.listByOrg(organizationId);
}

export async function advanceBrokerDeal(dealId: string, actorId: string, organizationId: string) {
  return dealPipelineService.advance(dealId, actorId, organizationId);
}

export async function rollbackBrokerDeal(dealId: string, actorId: string, organizationId: string) {
  return dealPipelineService.rollback(dealId, actorId, organizationId);
}

export async function settleBrokerDeal(dealId: string, settlementId: string, actorId: string, organizationId: string) {
  return dealPipelineService.settle(dealId, settlementId, actorId, organizationId);
}

export async function disputeBrokerDeal(dealId: string, actorId: string, organizationId: string, reason?: string) {
  return dealPipelineService.dispute(dealId, actorId, organizationId, reason);
}

export async function closeBrokerDeal(dealId: string, actorId: string, organizationId: string) {
  return dealPipelineService.close(dealId, actorId, organizationId);
}

// Commission Ledger
export async function computeBrokerCommission(data: Parameters<typeof commissionService.computeCommission>[0]) {
  return commissionService.computeCommission(data);
}

export async function listBrokerCommissions(organizationId: string) {
  return commissionService.listByOrg(organizationId);
}

export async function releaseBrokerCommission(id: string, actorId: string, organizationId: string) {
  return commissionService.release(id, actorId, organizationId);
}

export async function holdBrokerCommission(id: string, actorId: string, organizationId: string, reason?: string) {
  return commissionService.hold(id, actorId, organizationId, reason);
}

export async function reverseBrokerCommission(id: string, actorId: string, organizationId: string, reason?: string) {
  return commissionService.reverse(id, actorId, organizationId, reason);
}

export async function getBrokerCommissionSummary(organizationId: string) {
  return commissionService.ledgerSummary(organizationId);
}

// Client Book
export async function createBrokerClient(data: Parameters<typeof clientBookService.createClient>[0]) {
  return clientBookService.createClient(data);
}

export async function listBrokerClients(organizationId: string) {
  return clientBookService.listByOrg(organizationId);
}

export async function archiveBrokerClient(clientId: string, actorId: string, organizationId: string) {
  return clientBookService.archiveClient(clientId, actorId, organizationId);
}
