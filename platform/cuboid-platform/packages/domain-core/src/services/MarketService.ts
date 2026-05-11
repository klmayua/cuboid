import { marketRepository } from '../repositories/MarketRepository';
import { marketEngine } from '../market/MarketEngine';
import { globalEventBus } from '../events';

export class MarketService {
  private repo = marketRepository;
  private engine = marketEngine;

  async getLiveRates(pairId?: string, region?: string) {
    return this.repo.getLiveRates(pairId, region);
  }

  async getRatesByRegion(region: string) {
    return this.repo.getRatesByRegion(region);
  }

  async getTicker() {
    return this.engine.getPublishedRates();
  }

  async publishRate(data: {
    organizationId: string;
    pairId: string;
    region: string;
    buyRate: number;
    sellRate: number;
    quotedVolume?: number;
    sourceId?: string;
  }) {
    const spread = data.sellRate - data.buyRate;
    const rate = await this.repo.publishRate({ ...data, spread });

    await globalEventBus.emit('RATE_PUBLISHED', {
      actorId: data.organizationId,
      organizationId: data.organizationId,
      payload: {
        pairId: data.pairId,
        buyRate: data.buyRate,
        sellRate: data.sellRate,
        region: data.region,
      },
    });

    return rate;
  }

  async aggregateMarketRates(actorId: string = 'system') {
    return this.engine.aggregateAndPublish(actorId);
  }

  async getPublishedRates() {
    return this.engine.getPublishedRates();
  }

  async getMarketMetrics() {
    return this.engine.getMarketMetrics();
  }

  async cleanupStaleRates(maxAgeMinutes: number = 60) {
    return this.engine.cleanupStaleRates(maxAgeMinutes);
  }
}

export const marketService = new MarketService();
