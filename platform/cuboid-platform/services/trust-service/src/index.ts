import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'trust-service' });

export enum TrustFactorType {
  IDENTITY_VERIFICATION = 'IDENTITY_VERIFICATION',
  KYC_COMPLETION = 'KYC_COMPLETION',
  DEVICE_TRUST = 'DEVICE_TRUST',
  BEHAVIOR_ANALYSIS = 'BEHAVIOR_ANALYSIS',
  TRANSACTION_HISTORY = 'TRANSACTION_HISTORY',
  ACCOUNT_AGE = 'ACCOUNT_AGE',
  PARTNER_REFERENCE = 'PARTNER_REFERENCE',
  DOCUMENT_VERIFICATION = 'DOCUMENT_VERIFICATION',
  BIOGRAPHIC_MATCH = 'BIOGRAPHIC_MATCH',
  FINANCIAL_RISK = 'FINANCIAL_RISK',
}

export enum TrustScoreLevel {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  EXCELLENT = 'EXCELLENT',
}

export enum TrustSignalSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum EntityType {
  USER = 'USER',
  ORGANIZATION = 'ORGANIZATION',
  BENEFICIARY = 'BENEFICIARY',
  PARTNER = 'PARTNER',
}

export interface TrustFactor {
  type: TrustFactorType;
  weight: number;
  score: number;
  maxScore: number;
  lastUpdated: string;
  reason?: string;
  evidence?: Record<string, unknown>;
}

export interface TrustScore {
  entityId: string;
  entityType: EntityType;
  overallScore: number;
  level: TrustScoreLevel;
  factors: TrustFactor[];
  calculatedAt: string;
  expiresAt: string;
}

export interface TrustSignal {
  id: string;
  entityId: string;
  entityType: EntityType;
  type: string;
  severity: TrustSignalSeverity;
  description: string;
  evidence?: Record<string, unknown>;
  createdAt: string;
  expiresAt?: string;
  acknowledged: boolean;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
}

export interface TrustPolicy {
  id: string;
  name: string;
  description: string;
  factors: {
    type: TrustFactorType;
    weight: number;
    enabled: boolean;
    minScore?: number;
    maxScore?: number;
  }[];
  thresholds: {
    level: TrustScoreLevel;
    minScore: number;
  }[];
  decayConfig?: {
    enabled: boolean;
    factorAgeDays: number;
    decayRate: number;
  };
}

export interface TrustEvaluationRequest {
  entityId: string;
  entityType: EntityType;
  context?: Record<string, unknown>;
}

export interface TrustEvaluationResult {
  allowed: boolean;
  reason?: string;
  enhancedVerification: boolean;
  limits?: { daily: string; monthly: string; single: string };
  trustScore?: TrustScore;
  requiredActions?: string[];
}

const DEFAULT_POLICY: TrustPolicy = {
  id: 'default',
  name: 'Default Trust Policy',
  description: 'Standard trust computation policy',
  factors: [
    { type: TrustFactorType.IDENTITY_VERIFICATION, weight: 0.20, enabled: true },
    { type: TrustFactorType.KYC_COMPLETION, weight: 0.15, enabled: true },
    { type: TrustFactorType.DEVICE_TRUST, weight: 0.10, enabled: true },
    { type: TrustFactorType.BEHAVIOR_ANALYSIS, weight: 0.10, enabled: true },
    { type: TrustFactorType.TRANSACTION_HISTORY, weight: 0.15, enabled: true },
    { type: TrustFactorType.ACCOUNT_AGE, weight: 0.10, enabled: true },
    { type: TrustFactorType.PARTNER_REFERENCE, weight: 0.10, enabled: true },
    { type: TrustFactorType.DOCUMENT_VERIFICATION, weight: 0.10, enabled: true },
  ],
  thresholds: [
    { level: TrustScoreLevel.NONE, minScore: 0 },
    { level: TrustScoreLevel.LOW, minScore: 20 },
    { level: TrustScoreLevel.MEDIUM, minScore: 40 },
    { level: TrustScoreLevel.HIGH, minScore: 60 },
    { level: TrustScoreLevel.EXCELLENT, minScore: 80 },
  ],
  decayConfig: {
    enabled: true,
    factorAgeDays: 30,
    decayRate: 0.1,
  },
};

export class TrustService {
  private scores: Map<string, TrustScore> = new Map();
  private signals: TrustSignal[] = [];
  private policies: Map<string, TrustPolicy> = new Map();
  private signalHandlers: Map<string, ((signal: TrustSignal) => void)[]> = new Map();

  constructor() {
    this.policies.set('default', DEFAULT_POLICY);
  }

  async initialize(): Promise<void> {
    logger.info('Trust service initialized');
  }

  setPolicy(policy: TrustPolicy): void {
    this.policies.set(policy.id, policy);
    logger.info({ policyId: policy.id }, 'Trust policy updated');
  }

  getPolicy(policyId: string): TrustPolicy | undefined {
    return this.policies.get(policyId);
  }

  getDefaultPolicy(): TrustPolicy {
    return this.policies.get('default')!;
  }

  updateFactor(
    entityId: string,
    entityType: EntityType,
    factorType: TrustFactorType,
    score: number,
    reason?: string,
    evidence?: Record<string, unknown>
  ): TrustScore {
    const policy = this.getDefaultPolicy();
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
        level: TrustScoreLevel.NONE,
        factors: [],
        calculatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
    }

    const existingFactorIndex = scoreRecord.factors.findIndex(f => f.type === factorType);
    const factor: TrustFactor = {
      type: factorType,
      weight: factorConfig.weight,
      score: Math.min(factorConfig.maxScore ?? 100, Math.max(factorConfig.minScore ?? 0, score)),
      maxScore: factorConfig.maxScore ?? 100,
      lastUpdated: new Date().toISOString(),
      reason,
      evidence,
    };

    if (existingFactorIndex >= 0) {
      scoreRecord.factors[existingFactorIndex] = factor;
    } else {
      scoreRecord.factors.push(factor);
    }

    scoreRecord = this.recalculateScore(scoreRecord, policy);
    this.scores.set(key, scoreRecord);

    logger.info(
      { entityId, entityType, factorType, score: factor.score, overallScore: scoreRecord.overallScore },
      'Trust factor updated'
    );

    return scoreRecord;
  }

  private recalculateScore(score: TrustScore, policy: TrustPolicy): TrustScore {
    const enabledFactors = score.factors.filter(f => {
      const config = policy.factors.find(pf => pf.type === f.type);
      return config?.enabled;
    });

    const totalWeight = enabledFactors.reduce((sum, f) => sum + f.weight, 0);

    if (totalWeight === 0) {
      return {
        ...score,
        overallScore: 0,
        level: TrustScoreLevel.NONE,
        calculatedAt: new Date().toISOString(),
      };
    }

    const weightedScore = enabledFactors.reduce((sum, f) => {
      const normalizedScore = (f.score / f.maxScore) * 100;
      return sum + (normalizedScore * f.weight);
    }, 0);

    let overallScore = Math.round(weightedScore / totalWeight);

    if (policy.decayConfig?.enabled) {
      for (const factor of enabledFactors) {
        const daysSinceUpdate = (Date.now() - new Date(factor.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceUpdate > policy.decayConfig.factorAgeDays) {
          const decayAmount = Math.min(
            policy.decayConfig.decayRate * Math.floor(daysSinceUpdate / policy.decayConfig.factorAgeDays) * 5,
            30
          );
          overallScore = Math.max(0, overallScore - decayAmount);
        }
      }
    }

    const threshold = policy.thresholds
      .slice()
      .reverse()
      .find(t => overallScore >= t.minScore);

    const level = threshold?.level ?? TrustScoreLevel.NONE;

    return {
      ...score,
      overallScore,
      level,
      calculatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  getScore(entityId: string, entityType: EntityType): TrustScore | null {
    const key = `${entityType}:${entityId}`;
    const score = this.scores.get(key);
    
    if (!score) {
      return null;
    }

    if (new Date(score.expiresAt) < new Date()) {
      this.scores.delete(key);
      return null;
    }
    
    return score;
  }

  addSignal(signal: Omit<TrustSignal, 'id' | 'createdAt' | 'acknowledged'>): TrustSignal {
    const newSignal: TrustSignal = {
      ...signal,
      id: `sig_${uuidv4()}`,
      createdAt: new Date().toISOString(),
      acknowledged: false,
    };

    this.signals.push(newSignal);

    const handlers = this.signalHandlers.get(signal.severity) ?? [];
    handlers.forEach(handler => handler(newSignal));

    if (signal.severity === TrustSignalSeverity.CRITICAL || signal.severity === TrustSignalSeverity.HIGH) {
      this.updateFactor(
        signal.entityId,
        signal.entityType,
        TrustFactorType.FINANCIAL_RISK,
        Math.max(0, (this.getScore(signal.entityId, signal.entityType)?.overallScore ?? 50) - 20),
        `Risk signal: ${signal.description}`
      );
    }

    logger.info(
      { signalId: newSignal.id, entityId: signal.entityId, severity: signal.severity },
      'Trust signal added'
    );

    return newSignal;
  }

  getSignals(entityId: string, entityType: EntityType, filter?: {
    severity?: TrustSignalSeverity;
    acknowledged?: boolean;
    fromDate?: string;
  }): TrustSignal[] {
    let signals = this.signals.filter(
      s => s.entityId === entityId && s.entityType === entityType
    );

    if (filter?.severity) {
      signals = signals.filter(s => s.severity === filter.severity);
    }

    if (filter?.acknowledged !== undefined) {
      signals = signals.filter(s => s.acknowledged === filter.acknowledged);
    }

    if (filter?.fromDate) {
      signals = signals.filter(s => s.createdAt >= filter.fromDate!);
    }

    return signals.sort((a, b) => b.severity.localeCompare(a.severity));
  }

  acknowledgeSignal(signalId: string, acknowledgedBy: string): TrustSignal | null {
    const signal = this.signals.find(s => s.id === signalId);
    if (!signal) return null;

    signal.acknowledged = true;
    signal.acknowledgedAt = new Date().toISOString();
    signal.acknowledgedBy = acknowledgedBy;

    return signal;
  }

  onSignal(severity: TrustSignalSeverity, handler: (signal: TrustSignal) => void): () => void {
    const handlers = this.signalHandlers.get(severity) ?? [];
    handlers.push(handler);
    this.signalHandlers.set(severity, handlers);

    return () => {
      const h = this.signalHandlers.get(severity);
      if (h) {
        const index = h.indexOf(handler);
        if (index >= 0) h.splice(index, 1);
      }
    };
  }

  evaluate(request: TrustEvaluationRequest): TrustEvaluationResult {
    const score = this.getScore(request.entityId, request.entityType);
    
    if (!score || score.level === TrustScoreLevel.NONE) {
      return {
        allowed: false,
        reason: 'No trust score available',
        enhancedVerification: true,
        requiredActions: ['COMPLETE_IDENTITY_VERIFICATION'],
      };
    }

    if (score.level === TrustScoreLevel.LOW) {
      return {
        allowed: true,
        reason: 'Low trust - enhanced monitoring required',
        enhancedVerification: true,
        limits: { daily: '1000', monthly: '5000', single: '500' },
        trustScore: score,
        requiredActions: ['ENHANCED_MONITORING'],
      };
    }

    if (score.level === TrustScoreLevel.MEDIUM) {
      return {
        allowed: true,
        enhancedVerification: false,
        limits: { daily: '10000', monthly: '50000', single: '10000' },
        trustScore: score,
      };
    }

    if (score.level === TrustScoreLevel.HIGH) {
      return {
        allowed: true,
        enhancedVerification: false,
        limits: { daily: '50000', monthly: '200000', single: '25000' },
        trustScore: score,
      };
    }

    if (score.level === TrustScoreLevel.EXCELLENT) {
      return {
        allowed: true,
        enhancedVerification: false,
        trustScore: score,
      };
    }

    return {
      allowed: false,
      reason: 'Unknown trust level',
      enhancedVerification: true,
    };
  }

  evaluateTransaction(
    entityId: string,
    entityType: EntityType,
    amount: string
  ): TrustEvaluationResult {
    const result = this.evaluate({ entityId, entityType });
    
    const amountNum = BigInt(amount);
    
    if (result.limits) {
      const singleLimit = BigInt(result.limits.single);
      if (amountNum > singleLimit) {
        return {
          ...result,
          allowed: false,
          reason: `Amount exceeds single transaction limit of ${result.limits.single}`,
          enhancedVerification: true,
        };
      }
    }

    return result;
  }

  getAllScores(): TrustScore[] {
    return Array.from(this.scores.values());
  }

  getScoreSummary(): {
    total: number;
    byLevel: Record<TrustScoreLevel, number>;
    byEntityType: Record<EntityType, number>;
  } {
    const scores = this.getAllScores();
    
    const byLevel: Record<TrustScoreLevel, number> = {
      [TrustScoreLevel.NONE]: 0,
      [TrustScoreLevel.LOW]: 0,
      [TrustScoreLevel.MEDIUM]: 0,
      [TrustScoreLevel.HIGH]: 0,
      [TrustScoreLevel.EXCELLENT]: 0,
    };
    
    const byEntityType: Record<EntityType, number> = {
      [EntityType.USER]: 0,
      [EntityType.ORGANIZATION]: 0,
      [EntityType.BENEFICIARY]: 0,
      [EntityType.PARTNER]: 0,
    };

    for (const score of scores) {
      byLevel[score.level]++;
      byEntityType[score.entityType]++;
    }

    return {
      total: scores.length,
      byLevel,
      byEntityType,
    };
  }

  getSignalSummary(): {
    total: number;
    bySeverity: Record<TrustSignalSeverity, number>;
    unacknowledged: number;
  } {
    const bySeverity: Record<TrustSignalSeverity, number> = {
      [TrustSignalSeverity.LOW]: 0,
      [TrustSignalSeverity.MEDIUM]: 0,
      [TrustSignalSeverity.HIGH]: 0,
      [TrustSignalSeverity.CRITICAL]: 0,
    };

    for (const signal of this.signals) {
      bySeverity[signal.severity]++;
    }

    return {
      total: this.signals.length,
      bySeverity,
      unacknowledged: this.signals.filter(s => !s.acknowledged).length,
    };
  }
}

export const trustService = new TrustService();

if (require.main === module) {
  (async () => {
    await trustService.initialize();
    logger.info('Trust service running');
  })();
}