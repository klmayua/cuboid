import { shouldUseMockData } from '../../runtime/runtime-mode';

export interface MockRate {
  pair: string;
  symbol: string;
  cuboidBuy: number;
  cuboidSell: number;
  cuboidMidpoint: number;
  spread: number;
  confidence: number;
  liquidityScore: number;
  liquidityDepth: 'HIGH' | 'MEDIUM' | 'LOW';
  volatility: number;
  sourceCount: number;
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'FLAT';
  region: string;
  updatedAt: string;
}

const BASE_RATES: Record<string, { buy: number; sell: number }> = {
  'USD/NGN': { buy: 1588, sell: 1596 },
  'GBP/NGN': { buy: 2042, sell: 2058 },
  'EUR/NGN': { buy: 1724, sell: 1738 },
  'AED/NGN': { buy: 432, sell: 438 },
  'USDT/NGN': { buy: 1585, sell: 1593 },
};

const REGIONS = ['LAGOS', 'ABUJA', 'PORT_HARCOURT', 'KANO', 'INFLOW_BANK'];

function jitter(value: number, variancePercent = 0.2): number {
  const variance = value * (variancePercent / 100);
  const shift = (Math.sin(Date.now() / 60000) * variance); // deterministic, time-based
  return Math.round((value + shift) * 100) / 100;
}

function generateTrend(): { trend: 'UP' | 'DOWN' | 'FLAT'; changePercent: number } {
  const cycle = Math.sin(Date.now() / 300000); // 5-minute cycle
  if (cycle > 0.3) return { trend: 'UP', changePercent: jitter(Math.abs(cycle) * 1.5, 5) };
  if (cycle < -0.3) return { trend: 'DOWN', changePercent: -jitter(Math.abs(cycle) * 1.5, 5) };
  return { trend: 'FLAT', changePercent: jitter(0.05, 10) };
}

export function getMockRates(): MockRate[] {
  return Object.entries(BASE_RATES).map(([pair, rates]) => {
    const buy = jitter(rates.buy);
    const sell = jitter(rates.sell);
    const { trend, changePercent } = generateTrend();
    return {
      pair,
      symbol: pair.split('/')[0],
      cuboidBuy: buy,
      cuboidSell: sell,
      cuboidMidpoint: Math.round(((buy + sell) / 2) * 100) / 100,
      spread: Math.round((sell - buy) * 100) / 100,
      confidence: Math.round(jitter(94, 2)),
      liquidityScore: Math.round(jitter(87, 3)),
      liquidityDepth: 'HIGH',
      volatility: Math.round(jitter(0.8, 10) * 100) / 100,
      sourceCount: Math.round(jitter(38, 5)),
      changePercent: Math.round(changePercent * 100) / 100,
      trend,
      region: REGIONS[0],
      updatedAt: new Date().toISOString(),
    };
  });
}

export function getMockRateSources() {
  return [
    { id: 'src_1', type: 'BANK', label: 'First Bank of Nigeria', trustWeight: 0.95, active: true, status: 'ACTIVE' },
    { id: 'src_2', type: 'BANK', label: 'GTBank', trustWeight: 0.94, active: true, status: 'ACTIVE' },
    { id: 'src_3', type: 'BDC', label: 'Lagos Island BDC', trustWeight: 0.88, active: true, status: 'ACTIVE' },
    { id: 'src_4', type: 'FINTECH', label: 'Flutterwave', trustWeight: 0.91, active: true, status: 'ACTIVE' },
    { id: 'src_5', type: 'CRYPTO', label: 'Binance P2P', trustWeight: 0.85, active: true, status: 'ACTIVE' },
    { id: 'src_6', type: 'BANK', label: 'Zenith Bank', trustWeight: 0.93, active: true, status: 'ACTIVE' },
    { id: 'src_7', type: 'BDC', label: 'Wuse Zone 4 BDC', trustWeight: 0.86, active: true, status: 'ACTIVE' },
    { id: 'src_8', type: 'FINTECH', label: 'Paystack', trustWeight: 0.90, active: true, status: 'ACTIVE' },
  ];
}

export function getMockLiquidityDistribution() {
  return [
    { currency: 'USD', available: 8500000, reserved: 1200000, total: 9700000, region: 'LAGOS' },
    { currency: 'GBP', available: 3200000, reserved: 450000, total: 3650000, region: 'LAGOS' },
    { currency: 'EUR', available: 4100000, reserved: 600000, total: 4700000, region: 'ABUJA' },
    { currency: 'AED', available: 1800000, reserved: 200000, total: 2000000, region: 'PORT_HARCOURT' },
    { currency: 'NGN', available: 450000000, reserved: 50000000, total: 500000000, region: 'LAGOS' },
  ];
}

export function getMockMarketMetrics() {
  return {
    activePairs: 5,
    publishedRates: 5,
    avgConfidence: 93.4,
    avgLiquidity: 87.2,
    totalSources: 38,
  };
}
