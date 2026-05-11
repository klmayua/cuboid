// CUBOID Market Engine — Market Computation
// Pure functions. No side effects. No DB calls.

export interface WeightedValue {
  value: number;
  weight: number;
}

function sortByValue(values: WeightedValue[]): WeightedValue[] {
  return [...values].sort((a, b) => a.value - b.value);
}

/**
 * Trimmed weighted median: sort, trim extremes by percentage, then take weighted median.
 */
export function trimmedWeightedMedian(
  values: WeightedValue[],
  trimPercent: number = 10
): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0].value;

  const sorted = sortByValue(values);
  const totalWeight = sorted.reduce((s, v) => s + v.weight, 0);

  // Determine trim bounds by cumulative weight
  let trimWeight = (totalWeight * trimPercent) / 100;
  let lowTrim = 0;
  let cumulative = 0;
  for (let i = 0; i < sorted.length; i++) {
    cumulative += sorted[i].weight;
    if (cumulative >= trimWeight) {
      lowTrim = i;
      break;
    }
  }

  let highTrim = sorted.length - 1;
  cumulative = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    cumulative += sorted[i].weight;
    if (cumulative >= trimWeight) {
      highTrim = i;
      break;
    }
  }

  const trimmed = sorted.slice(lowTrim, highTrim + 1);
  if (trimmed.length === 0) return sorted[Math.floor(sorted.length / 2)].value;

  const trimmedWeight = trimmed.reduce((s, v) => s + v.weight, 0);
  const midpointWeight = trimmedWeight / 2;

  cumulative = 0;
  for (const item of trimmed) {
    cumulative += item.weight;
    if (cumulative >= midpointWeight) {
      return item.value;
    }
  }

  return trimmed[trimmed.length - 1].value;
}

export function computeWeightedBuy(buyRates: WeightedValue[]): number {
  return trimmedWeightedMedian(buyRates, 10);
}

export function computeWeightedSell(sellRates: WeightedValue[]): number {
  return trimmedWeightedMedian(sellRates, 10);
}

export function computeMidpoint(buy: number, sell: number): number {
  return (buy + sell) / 2;
}

export function computeSpread(buy: number, sell: number): number {
  return sell - buy;
}

export function computeBestBid(buyRates: WeightedValue[]): number {
  if (buyRates.length === 0) return 0;
  return Math.max(...buyRates.map((r) => r.value));
}

export function computeBestOffer(sellRates: WeightedValue[]): number {
  if (sellRates.length === 0) return 0;
  return Math.min(...sellRates.map((r) => r.value));
}

export function computeVolatility(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

export function computeLiquidityScore(
  sourceCount: number,
  totalVolume: number,
  spread: number
): number {
  // Higher source count = more liquid
  const sourceScore = Math.min(40, sourceCount * 8);
  // Higher volume = more liquid
  const volumeScore = Math.min(40, Math.log10(Math.max(1, totalVolume)) * 4);
  // Tighter spread = more liquid (normalized around 0.5%)
  const spreadScore = Math.max(0, 20 - (spread / (spread + 0.005)) * 20);

  return Math.min(100, sourceScore + volumeScore + spreadScore);
}

export interface ConfidenceInputs {
  sourceCount: number;
  trustScores: number[];
  liquidityDepth: number;
  volatility: number;
  recencySeconds: number;
}

export function computeConfidenceScore(inputs: ConfidenceInputs): number {
  // Source diversity (0-30)
  const sourceScore = Math.min(30, inputs.sourceCount * 6);

  // Trust distribution (0-25)
  const avgTrust =
    inputs.trustScores.reduce((a, b) => a + b, 0) /
    Math.max(1, inputs.trustScores.length);
  const trustScore = (avgTrust / 100) * 25;

  // Liquidity depth (0-20)
  const liquidityScore = Math.min(20, (inputs.liquidityDepth / 1_000_000) * 20);

  // Volatility penalty (0-15, lower is better)
  const volatilityPenalty = Math.min(15, inputs.volatility * 1000);
  const volatilityScore = Math.max(0, 15 - volatilityPenalty);

  // Recency (0-10)
  const recencyScore =
    inputs.recencySeconds < 120
      ? 10
      : inputs.recencySeconds < 300
        ? 8
        : inputs.recencySeconds < 600
          ? 6
          : inputs.recencySeconds < 1800
            ? 4
            : 2;

  return Math.min(100, sourceScore + trustScore + liquidityScore + volatilityScore + recencyScore);
}

export function computeChangePercent(
  currentMidpoint: number,
  previousMidpoint: number
): number {
  if (previousMidpoint === 0) return 0;
  return ((currentMidpoint - previousMidpoint) / previousMidpoint) * 100;
}

export function computeTrend(changePercent: number): 'UP' | 'DOWN' | 'FLAT' {
  if (changePercent > 0.02) return 'UP';
  if (changePercent < -0.02) return 'DOWN';
  return 'FLAT';
}
