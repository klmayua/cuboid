import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export interface LiveRateWithSource {
  id: string;
  organizationId: string;
  pairId: string;
  region: string;
  buyRate: number;
  sellRate: number;
  spread: number;
  quotedVolume: number;
  quotedAt: Date;
  sourceId: string | null;
  sourceType: string;
  trustWeight: number;
  trustScore: number;
}

export class MarketRepository extends BaseRepository {
  async getLiveRates(pairId?: string, region?: string) {
    return this.db.fxRate.findMany({
      where: {
        ...(pairId && { pairId }),
        ...(region && { region: region as any }),
      },
      include: { pair: true, source: true },
      orderBy: { quotedAt: 'desc' },
      take: 100,
    });
  }

  async getRatesWithSourceInfo(pairId: string, since: Date): Promise<LiveRateWithSource[]> {
    const rows = await this.db.$queryRaw<LiveRateWithSource[]>`
      SELECT
        fr.id,
        fr.organization_id AS "organizationId",
        fr.pair_id AS "pairId",
        fr.region::text,
        fr.buy_rate AS "buyRate",
        fr.sell_rate AS "sellRate",
        fr.spread,
        fr.quoted_volume AS "quotedVolume",
        fr.quoted_at AS "quotedAt",
        fr.source_id AS "sourceId",
        COALESCE(rs.type::text, 'PLATFORM') AS "sourceType",
        COALESCE(rs.trust_weight, 1.0) AS "trustWeight",
        COALESCE(ts.score, 50.0) AS "trustScore"
      FROM fx_rates fr
      LEFT JOIN rate_sources rs ON fr.source_id = rs.id
      LEFT JOIN trust_scores ts ON fr.organization_id = ts.organization_id
      WHERE fr.pair_id = ${pairId}::uuid
        AND fr.quoted_at >= ${since}
      ORDER BY fr.quoted_at DESC
      LIMIT 200
    `;
    return rows;
  }

  async getRatesByRegion(region: string) {
    return this.db.fxRate.findMany({
      where: { region: region as any },
      include: { pair: true },
      orderBy: { quotedAt: 'desc' },
    });
  }

  async publishRate(data: {
    organizationId: string;
    pairId: string;
    region: string;
    buyRate: number;
    sellRate: number;
    spread: number;
    quotedVolume?: number;
    sourceId?: string;
  }) {
    return this.db.fxRate.create({
      data: {
        organizationId: data.organizationId,
        pairId: data.pairId,
        region: data.region as any,
        buyRate: data.buyRate,
        sellRate: data.sellRate,
        spread: data.spread,
        quotedVolume: data.quotedVolume ?? 0,
        sourceId: data.sourceId,
      },
    });
  }

  async getSnapshots(pairId?: string, limit: number = 50) {
    return this.db.marketSnapshot.findMany({
      where: { ...(pairId && { pairId }) },
      include: { pair: true },
      orderBy: { snapshotAt: 'desc' },
      take: limit,
    });
  }

  async getLatestSnapshot(pairId: string) {
    return this.db.marketSnapshot.findFirst({
      where: { pairId },
      orderBy: { snapshotAt: 'desc' },
    });
  }

  async createSnapshot(data: {
    pairId: string;
    weightedBuy: number;
    weightedSell: number;
    midpoint: number;
    bestBid: number;
    bestOffer: number;
    spread: number;
    volatility: number;
    liquidityScore: number;
    confidenceScore: number;
    sourceCount: number;
  }) {
    return this.db.marketSnapshot.create({ data });
  }

  async getPublishedRate(pairId: string) {
    return this.db.publishedRate.findFirst({
      where: { pairId },
      orderBy: { publishedAt: 'desc' },
      include: { pair: true },
    });
  }

  async upsertPublishedRate(data: {
    pairId: string;
    cuboidBuy: number;
    cuboidSell: number;
    cuboidMidpoint: number;
    confidence: number;
    changePercent: number;
    trend: string;
    liquidityDepth: number;
  }) {
    return this.db.publishedRate.create({
      data: {
        pairId: data.pairId,
        cuboidBuy: data.cuboidBuy,
        cuboidSell: data.cuboidSell,
        cuboidMidpoint: data.cuboidMidpoint,
        confidence: data.confidence,
        changePercent: data.changePercent,
        trend: data.trend,
        liquidityDepth: data.liquidityDepth,
      },
    });
  }

  async getPair(symbol: string) {
    const pair = await this.db.currencyPair.findUnique({ where: { symbol } });
    if (!pair) throw new NotFoundError('Currency pair');
    return pair;
  }

  async getPairs() {
    return this.db.currencyPair.findMany({ where: { isActive: true } });
  }

  async cleanupStaleRates(cutoff: Date) {
    return this.db.fxRate.deleteMany({
      where: { quotedAt: { lt: cutoff } },
    });
  }

  async countActiveSources(pairId: string, since: Date) {
    const result = await this.db.fxRate.groupBy({
      by: ['sourceId'],
      where: {
        pairId,
        quotedAt: { gte: since },
      },
      _count: { sourceId: true },
    });
    return result.length;
  }

  async getRateSources(options?: { status?: string; limit?: number; cursor?: string }) {
    const sources = await this.db.rateSource.findMany({
      where: options?.status ? { active: options.status === 'ACTIVE' } : undefined,
      orderBy: { createdAt: 'desc' },
      take: Math.min(options?.limit ?? 50, 100),
    });
    return sources;
  }

  async getLiquidityDistribution() {
    const result = await this.db.bdcInventory.groupBy({
      by: ['currency'],
      _sum: { available: true, reserved: true },
    });
    return result.map((r: any) => ({
      currency: r.currency,
      available: r._sum.available ?? 0,
      reserved: r._sum.reserved ?? 0,
    }));
  }
}

export const marketRepository = new MarketRepository();
