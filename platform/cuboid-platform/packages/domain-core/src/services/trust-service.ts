import { z } from 'zod';

export const TrustFactorTypeSchema = z.enum([
  'IDENTITY_VERIFICATION',
  'KYC_COMPLETION',
  'DEVICE_TRUST',
  'BEHAVIOR_ANALYSIS',
  'TRANSACTION_HISTORY',
  'ACCOUNT_AGE',
  'PARTNER_REFERENCE',
  'DOCUMENT_VERIFICATION',
  'BIOGRAPHIC_MATCH',
  'FINANCIAL_RISK',
]);
export type TrustFactorType = z.infer<typeof TrustFactorTypeSchema>;

export const TrustScoreLevelSchema = z.enum(['NONE', 'LOW', 'MEDIUM', 'HIGH', 'EXCELLENT']);
export type TrustScoreLevel = z.infer<typeof TrustScoreLevelSchema>;

export interface TrustFactor {
  type: TrustFactorType;
  weight: number;
  score: number;
  maxScore: number;
  lastUpdated: string;
  reason?: string;
}

export interface TrustScore {
  entityId: string;
  entityType: 'USER' | 'ORGANIZATION' | 'BENEFICIARY' | 'PARTNER';
  overallScore: number;
  level: TrustScoreLevel;
  factors: TrustFactor[];
  calculatedAt: string;
  expiresAt: string;
}

export interface TrustSignal {
  id: string;
  entityId: string;
  entityType: TrustScore['entityType'];
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  evidence?: Record<string, unknown>;
  createdAt: string;
  expiresAt?: string;
}

export interface TrustPolicy {
  id: string;
  name: string;
  description: string;
  factors: {
    type: TrustFactorType;
    weight: number;
    enabled: boolean;
  }[];
  thresholds: {
    level: TrustScoreLevel;
    minScore: number;
  }[];
}

const DEFAULT_POLICY: TrustPolicy = {
  id: 'default',
  name: 'Default Trust Policy',
  description: 'Standard trust computation policy',
  factors: [
    { type: 'IDENTITY_VERIFICATION', weight: 0.20, enabled: true },
    { type: 'KYC_COMPLETION', weight: 0.15, enabled: true },
    { type: 'DEVICE_TRUST', weight: 0.10, enabled: true },
    { type: 'BEHAVIOR_ANALYSIS', weight: 0.10, enabled: true },
    { type: 'TRANSACTION_HISTORY', weight: 0.15, enabled: true },
    { type: 'ACCOUNT_AGE', weight: 0.10, enabled: true },
    { type: 'PARTNER_REFERENCE', weight: 0.10, enabled: true },
    { type: 'DOCUMENT_VERIFICATION', weight: 0.10, enabled: true },
  ],
  thresholds: [
    { level: 'NONE', minScore: 0 },
    { level: 'LOW', minScore: 20 },
    { level: 'MEDIUM', minScore: 40 },
    { level: 'HIGH', minScore: 60 },
    { level: 'EXCELLENT', minScore: 80 },
  ],
};

export class TrustService {
  private scores: Map<string, TrustScore> = new Map();
  private signals: TrustSignal[] = [];
  private policies: Map<string, TrustPolicy> = new Map();

  constructor() {
    this.policies.set('default', DEFAULT_POLICY);
  }

  setPolicy(policy: TrustPolicy): void {
    this.policies.set(policy.id, policy);
  }

  getPolicy(policyId: string): TrustPolicy | undefined {
    return this.policies.get(policyId);
  }

  updateFactor(
    entityId: string,
    entityType: TrustScore['entityType'],
    factorType: TrustFactorType,
    score: number,
    reason?: string
  ): TrustScore {
    const policy = this.policies.get('default')!;
    const factorConfig = policy.factors.find(f => f.type === factorType);
    
    if (!factorConfig || !factorConfig.enabled) {
      throw new Error(`Trust factor not enabled: ${factorType}`);
    }

    const key = `${entityType}:${entityId}`;
    let scoreRecord = this.scores.get(key);
    
    if (!scoreRecord) {
      scoreRecord = {
        entityId,
        entityType,
        overallScore: 0,
        level: 'NONE',
        factors: [],
        calculatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
    }

    const existingFactorIndex = scoreRecord.factors.findIndex(f => f.type === factorType);
    const factor: TrustFactor = {
      type: factorType,
      weight: factorConfig.weight,
      score,
      maxScore: 100,
      lastUpdated: new Date().toISOString(),
      reason,
    };

    if (existingFactorIndex >= 0) {
      scoreRecord.factors[existingFactorIndex] = factor;
    } else {
      scoreRecord.factors.push(factor);
    }

    scoreRecord = this.recalculateScore(scoreRecord, policy);
    this.scores.set(key, scoreRecord);

    return scoreRecord;
  }

  private recalculateScore(score: TrustScore, policy: TrustPolicy): TrustScore {
    const totalWeight = score.factors
      .filter(f => policy.factors.find(pf => pf.type === f.type && pf.enabled))
      .reduce((sum, f) => sum + f.weight, 0);

    const weightedScore = score.factors
      .filter(f => policy.factors.find(pf => pf.type === f.type && pf.enabled))
      .reduce((sum, f) => {
        const normalizedScore = (f.score / f.maxScore) * 100;
        return sum + (normalizedScore * f.weight);
      }, 0);

    const overallScore = totalWeight > 0 
      ? Math.round(weightedScore / totalWeight) 
      : 0;

    const threshold = policy.thresholds
      .slice()
      .reverse()
      .find(t => overallScore >= t.minScore);

    const level = threshold?.level ?? 'NONE';

    return {
      ...score,
      overallScore,
      level,
      calculatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  getScore(entityId: string, entityType: TrustScore['entityType']): TrustScore | null {
    const key = `${entityType}:${entityId}`;
    const score = this.scores.get(key);
    
    if (score && new Date(score.expiresAt) > new Date()) {
      return score;
    }
    
    return score ?? null;
  }

  addSignal(signal: Omit<TrustSignal, 'id' | 'createdAt'>): TrustSignal {
    const newSignal: TrustSignal = {
      ...signal,
      id: `sig_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    this.signals.push(newSignal);

    if (signal.severity === 'CRITICAL' || signal.severity === 'HIGH') {
      this.updateFactor(
        signal.entityId,
        signal.entityType,
        'FINANCIAL_RISK',
        Math.max(0, this.getScore(signal.entityId, signal.entityType)?.overallScore ?? 50 - 20),
        `Risk signal: ${signal.description}`
      );
    }

    return newSignal;
  }

  getSignals(entityId: string, entityType: TrustScore['entityType']): TrustSignal[] {
    return this.signals.filter(
      s => s.entityId === entityId && s.entityType === entityType
    );
  }

  evaluateTransaction(entityId: string, entityType: TrustScore['entityType'], amount: string): {
    allowed: boolean;
    reason?: string;
    enhancedVerification: boolean;
    limits?: { daily: string; monthly: string };
  } {
    const score = this.getScore(entityId, entityType);
    
    if (!score || score.level === 'NONE') {
      return {
        allowed: false,
        reason: 'No trust score available',
        enhancedVerification: true,
      };
    }

    if (score.level === 'LOW') {
      return {
        allowed: true,
        reason: 'Low trust - enhanced monitoring required',
        enhancedVerification: true,
        limits: { daily: '1000', monthly: '5000' },
      };
    }

    if (score.level === 'MEDIUM') {
      return {
        allowed: true,
        enhancedVerification: false,
        limits: { daily: '10000', monthly: '50000' },
      };
    }

    if (score.level === 'HIGH' || score.level === 'EXCELLENT') {
      return {
        allowed: true,
        enhancedVerification: false,
      };
    }

    return { allowed: false, reason: 'Unknown trust level', enhancedVerification: true };
  }
}

export const trustService = new TrustService();