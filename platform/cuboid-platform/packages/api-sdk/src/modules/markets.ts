import { marketService } from '@cuboid/domain-core';

export async function getTicker(): Promise<ReturnType<typeof marketService.getTicker>> {
  return marketService.getTicker();
}

export async function getLiveRates(pairId?: string, region?: string) {
  return marketService.getLiveRates(pairId, region);
}

export async function getRatesByRegion(region: string) {
  return marketService.getRatesByRegion(region);
}

export async function getSnapshots(): Promise<ReturnType<typeof marketService.getTicker>> {
  return marketService.getTicker();
}

export async function publishRate(data: Parameters<typeof marketService.publishRate>[0]) {
  return marketService.publishRate(data);
}
