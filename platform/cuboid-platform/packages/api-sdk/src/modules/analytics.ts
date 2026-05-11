import { analyticsService } from '@cuboid/domain-core';

export async function getAnalyticsOverview(organizationId?: string) {
  return analyticsService.overview(organizationId);
}

export async function getAnalyticsVolume(organizationId?: string, from?: string, to?: string) {
  return analyticsService.volumeMetrics(organizationId, from, to);
}

export async function getAnalyticsCorridors(organizationId?: string) {
  return analyticsService.corridorMetrics(organizationId);
}

export async function getAnalyticsLiquidity() {
  return analyticsService.liquidityMetrics();
}

export async function getAnalyticsPerformance(organizationId?: string) {
  return analyticsService.deskPerformance(organizationId);
}

export async function getBrokerMetrics(organizationId: string) {
  return analyticsService.brokerMetrics(organizationId);
}

export async function getBrokerRanking(organizationId: string) {
  return analyticsService.brokerRanking(organizationId);
}
