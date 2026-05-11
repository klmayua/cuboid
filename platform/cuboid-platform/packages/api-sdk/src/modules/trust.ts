import { trustOpsService } from '@cuboid/domain-core';

export async function getTrustScore(organizationId: string) {
  return trustOpsService.calculateScore(organizationId);
}

export async function getTrustBreakdown(organizationId: string) {
  return trustOpsService.scoreBreakdown(organizationId);
}

export async function getTrustHistory(limit?: number) {
  return trustOpsService.scoreHistory(limit);
}
