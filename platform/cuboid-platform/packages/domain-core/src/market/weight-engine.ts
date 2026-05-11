// CUBOID Market Engine — Weight Computation
// Pure functions. No side effects. No DB calls.

export interface RateInput {
  buyRate: number;
  sellRate: number;
  quotedAt: Date;
  sourceType: string;
  trustWeight: number;
  trustScore: number;
  quotedVolume: number;
}

const SOURCE_WEIGHTS: Record<string, number> = {
  BANK_INFLOW: 1.25,
  INSTITUTIONAL_PARTNER: 1.20,
  VERIFIED_BDC: 1.10,
  BROKER_DESK: 1.00,
  RETAIL_SIGNAL: 0.65,
  PLATFORM: 1.00,
  BDC_DESK: 1.05,
  WHOLESALE: 1.15,
};

const FRESHNESS_DECAY: { maxAgeMs: number; multiplier: number }[] = [
  { maxAgeMs: 2 * 60 * 1000, multiplier: 1.00 },
  { maxAgeMs: 5 * 60 * 1000, multiplier: 0.96 },
  { maxAgeMs: 10 * 60 * 1000, multiplier: 0.88 },
  { maxAgeMs: 30 * 60 * 1000, multiplier: 0.72 },
];

function getFreshnessMultiplier(quotedAt: Date, now: Date = new Date()): number {
  const ageMs = now.getTime() - quotedAt.getTime();
  for (const tier of FRESHNESS_DECAY) {
    if (ageMs <= tier.maxAgeMs) return tier.multiplier;
  }
  return 0.40;
}

function getTrustScoreMultiplier(trustScore: number): number {
  return Math.max(0.1, trustScore / 100);
}

function getLiquidityMultiplier(volume: number): number {
  if (volume >= 1_000_000) return 1.20;
  if (volume >= 100_000) return 1.00;
  return 0.75;
}

function getVolumeMultiplier(volume: number): number {
  // Logarithmic volume weight to prevent whale dominance
  return 1 + Math.log10(Math.max(1, volume)) / 10;
}

export function computeRateWeight(input: RateInput, now?: Date): number {
  const sourceWeight = SOURCE_WEIGHTS[input.sourceType] ?? 1.0;
  const freshnessWeight = getFreshnessMultiplier(input.quotedAt, now);
  const trustMultiplier = getTrustScoreMultiplier(input.trustScore);
  const liquidityMultiplier = getLiquidityMultiplier(input.quotedVolume);
  const volumeMultiplier = getVolumeMultiplier(input.quotedVolume);

  return (
    sourceWeight *
    freshnessWeight *
    trustMultiplier *
    liquidityMultiplier *
    volumeMultiplier
  );
}

export function computeWeights(inputs: RateInput[], now?: Date): number[] {
  return inputs.map((r) => computeRateWeight(r, now));
}
