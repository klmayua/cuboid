import { brokerService } from '@cuboid/domain-core';

export async function getBrokerDashboard(organizationId: string) {
  return brokerService.getDashboard(organizationId);
}

export async function getBrokerLeads() {
  return brokerService.getLeadQueue();
}

export async function claimBrokerLead(organizationId: string, actorId: string) {
  return brokerService.claimLead(organizationId, actorId);
}

export async function updateBrokerProfile(data: Parameters<typeof brokerService.updateProfile>[0]) {
  return brokerService.updateProfile(data);
}

export async function getBrokerPerformance(organizationId: string) {
  return brokerService.getPerformanceMetrics(organizationId);
}
