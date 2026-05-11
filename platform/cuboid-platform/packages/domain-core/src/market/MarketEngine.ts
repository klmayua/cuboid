import { marketRepository } from '../repositories/MarketRepository';
import { globalEventBus } from '../events';
import { auditLog } from '../services/audit-service';
import {
  computeWeights,
  type RateInput,
} from '../market/weight-engine';
import {
  computeWeightedBuy,
  computeWeightedSell,
  computeMidpoint,
  computeSpread,
  computeBestBid,
  computeBestOffer,
  computeVolatility,
  computeLiquidityScore,
  computeConfidenceScore,
  computeChangePercent,
  computeTrend,
  type WeightedValue,
} from '../market/computation';

const AGGREGATION_WINDOW_MINUTES = 30;

export interface CanonicalRate {
  pairId: string;
  symbol: string;
  cuboidBuy: number;
  cuboidSell: number;
  cuboidMidpoint: number;
  spread: number;
  bestBid: number;
  bestOffer: number;
  confidence: number;
  liquidityScore: number;
  volatility: number;
  sourceCount: number;
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'FLAT';
  liquidityDepth: number;
  publishedAt: Date;
}

export class MarketEngine {
  private repo = marketRepository;

  async computeCanonicalRate(pairId: string, pairSymbol: string): Promise<CanonicalRate | null> {
    const since = new Date(Date.now() - AGGREGATION_WINDOW_MINUTES * 60 * 1000);
    const rows = await this.repo.getRatesWithSourceInfo(pairId, since);

    if (rows.length === 0) return null;

    const rateInputs: RateInput[] = rows.map((r) => ({
      buyRate: Number(r.buyRate),
      sellRate: Number(r.sellRate),
      quotedAt: new Date(r.quotedAt),
      sourceType: r.sourceType,
      trustWeight: Number(r.trustWeight),
      trustScore: Number(r.trustScore),
      quotedVolume: Number(r.quotedVolume),
    }));

    const weights = computeWeights(rateInputs);

    const buyRates: WeightedValue[] = rateInputs.map((r, i) => ({
      value: r.buyRate,
      weight: weights[i],
    }));
    const sellRates: WeightedValue[] = rateInputs.map((r, i) => ({
      value: r.sellRate,
      weight: weights[i],
    }));

    const cuboidBuy = computeWeightedBuy(buyRates);
    const cuboidSell = computeWeightedSell(sellRates);
    const cuboidMidpoint = computeMidpoint(cuboidBuy, cuboidSell);
    const spread = computeSpread(cuboidBuy, cuboidSell);
    const bestBid = computeBestBid(buyRates);
    const bestOffer = computeBestOffer(sellRates);

    const buyValues = rateInputs.map((r) => r.buyRate);
    const sellValues = rateInputs.map((r) => r.sellRate);
    const volatility =
      (computeVolatility(buyValues) + computeVolatility(sellValues)) / 2;

    const totalVolume = rateInputs.reduce((s, r) => s + r.quotedVolume, 0);
    const liquidityScore = computeLiquidityScore(
      rows.length,
      totalVolume,
      spread
    );

    const trustScores = rateInputs.map((r) => r.trustScore);
    const newestQuote = Math.max(...rateInputs.map((r) => r.quotedAt.getTime()));
    const recencySeconds = (Date.now() - newestQuote) / 1000;

    const confidence = computeConfidenceScore({
      sourceCount: rows.length,
      trustScores,
      liquidityDepth: totalVolume,
      volatility,
      recencySeconds,
    });

    const previous = await this.repo.getPublishedRate(pairId);
    const previousMidpoint = previous ? Number(previous.cuboidMidpoint) : cuboidMidpoint;
    const changePercent = computeChangePercent(cuboidMidpoint, previousMidpoint);
    const trend = computeTrend(changePercent);

    return {
      pairId,
      symbol: pairSymbol,
      cuboidBuy,
      cuboidSell,
      cuboidMidpoint,
      spread,
      bestBid,
      bestOffer,
      confidence,
      liquidityScore,
      volatility,
      sourceCount: rows.length,
      changePercent,
      trend,
      liquidityDepth: totalVolume,
      publishedAt: new Date(),
    };
  }

  async aggregateAndPublish(actorId: string = 'system') {
    const pairs = await this.repo.getPairs();
    const results: CanonicalRate[] = [];

    for (const pair of pairs) {
      const canonical = await this.computeCanonicalRate(pair.id, pair.symbol);
      if (!canonical) continue;

      // Persist snapshot
      await this.repo.createSnapshot({
        pairId: pair.id,
        weightedBuy: canonical.cuboidBuy,
        weightedSell: canonical.cuboidSell,
        midpoint: canonical.cuboidMidpoint,
        bestBid: canonical.bestBid,
        bestOffer: canonical.bestOffer,
        spread: canonical.spread,
        volatility: canonical.volatility,
        liquidityScore: canonical.liquidityScore,
        confidenceScore: canonical.confidence,
        sourceCount: canonical.sourceCount,
      });

      // Persist published rate
      await this.repo.upsertPublishedRate({
        pairId: pair.id,
        cuboidBuy: canonical.cuboidBuy,
        cuboidSell: canonical.cuboidSell,
        cuboidMidpoint: canonical.cuboidMidpoint,
        confidence: canonical.confidence,
        changePercent: canonical.changePercent,
        trend: canonical.trend,
        liquidityDepth: canonical.liquidityDepth,
      });

      // Emit event
      await globalEventBus.emit('MARKET_SNAPSHOT_CREATED', {
        actorId,
        payload: {
          pairId: pair.id,
          symbol: pair.symbol,
          midpoint: canonical.cuboidMidpoint,
          cuboidBuy: canonical.cuboidBuy,
          cuboidSell: canonical.cuboidSell,
          confidence: canonical.confidence,
          trend: canonical.trend,
          changePercent: canonical.changePercent,
          liquidityScore: canonical.liquidityScore,
          sourceCount: canonical.sourceCount,
        },
      });

      results.push(canonical);
    }

    return results;
  }

  async getPublishedRates(): Promise<CanonicalRate[]> {
    const pairs = await this.repo.getPairs();
    const results: CanonicalRate[] = [];

    for (const pair of pairs) {
      const published = await this.repo.getPublishedRate(pair.id);
      if (!published) {
        const computed = await this.computeCanonicalRate(pair.id, pair.symbol);
        if (computed) results.push(computed);
        continue;
      }

      results.push({
        pairId: pair.id,
        symbol: pair.symbol,
        cuboidBuy: Number(published.cuboidBuy),
        cuboidSell: Number(published.cuboidSell),
        cuboidMidpoint: Number(published.cuboidMidpoint),
        spread: Number(published.cuboidSell) - Number(published.cuboidBuy),
        bestBid: Number(published.cuboidBuy),
        bestOffer: Number(published.cuboidSell),
        confidence: Number(published.confidence),
        liquidityScore: Number(published.liquidityDepth),
        volatility: 0,
        sourceCount: 0,
        changePercent: Number(published.changePercent),
        trend: published.trend as any,
        liquidityDepth: Number(published.liquidityDepth),
        publishedAt: published.publishedAt,
      });
    }

    return results;
  }

  async cleanupStaleRates(maxAgeMinutes: number = 60) {
    const cutoff = new Date(Date.now() - maxAgeMinutes * 60 * 1000);
    const { count } = await this.repo.cleanupStaleRates(cutoff);

    await globalEventBus.emit('LIQUIDITY_UPDATED', {
      actorId: 'system',
      payload: { action: 'CLEANUP_STALE_RATES', deletedCount: count },
    });

    return count;
  }

  async getMarketMetrics() {
    const pairs = await this.repo.getPairs();
    const rates = await this.getPublishedRates();

    return {
      activePairs: pairs.length,
      publishedRates: rates.length,
      avgConfidence:
        rates.length > 0
          ? rates.reduce((s, r) => s + r.confidence, 0) / rates.length
          : 0,
      avgLiquidity:
        rates.length > 0
          ? rates.reduce((s, r) => s + r.liquidityScore, 0) / rates.length
          : 0,
      totalSources: rates.reduce((s, r) => s + r.sourceCount, 0),
    };
  }

  async getLiquidityDistribution() {
    return this.repo.getLiquidityDistribution();
  }

  async getRateSources() {
    return this.repo.getRateSources();
  }
}

export const marketEngine = new MarketEngine();
