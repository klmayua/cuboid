import { v4 as uuidv4 } from 'uuid';

export interface RiskRule {
  id: string;
  name: string;
  type: 'AMOUNT' | 'VELOCITY' | 'CORRIDOR' | 'DEVICE' | 'BEHAVIOR' | 'GEO';
  conditions: Record<string, unknown>;
  action: 'BLOCK' | 'REVIEW' | 'HOLD' | 'ALERT' | 'STEP_UP';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  enabled: boolean;
}

export interface RiskEvaluation {
  id: string;
  entityType: 'USER' | 'TRANSACTION' | 'DEVICE';
  entityId: string;
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: { rule: string; contribution: number; reason: string }[];
  triggeredRules: string[];
  recommendation: 'APPROVE' | 'REVIEW' | 'BLOCK';
  createdAt: string;
}

export class RiskService {
  private rules: Map<string, RiskRule> = new Map();
  private evaluations: Map<string, RiskEvaluation[]> = new Map();

  constructor() {
    this.initDefaultRules();
  }

  private initDefaultRules() {
    const defaults: Omit<RiskRule, 'id'>[] = [
      { name: 'Large Transaction', type: 'AMOUNT', conditions: { threshold: 10000 }, action: 'REVIEW', severity: 'MEDIUM', enabled: true },
      { name: 'Very Large Transaction', type: 'AMOUNT', conditions: { threshold: 50000 }, action: 'BLOCK', severity: 'CRITICAL', enabled: true },
      { name: 'High Velocity', type: 'VELOCITY', conditions: { count: 10, window: '1h' }, action: 'HOLD', severity: 'HIGH', enabled: true },
      { name: 'New Corridor', type: 'CORRIDOR', conditions: {}, action: 'REVIEW', severity: 'MEDIUM', enabled: true },
      { name: 'High Risk Country', type: 'GEO', conditions: { countries: ['XX'] }, action: 'BLOCK', severity: 'HIGH', enabled: true },
    ];
    defaults.forEach(r => this.rules.set(uuidv4(), { ...r, id: uuidv4() }));
  }

  async evaluate(data: { entityType: 'USER' | 'TRANSACTION' | 'DEVICE'; entityId: string; context: Record<string, unknown> }): Promise<RiskEvaluation> {
    const factors: RiskEvaluation['factors'] = [];
    let totalScore = 0;
    const triggered: string[] = [];

    for (const rule of this.rules.values()) {
      if (!rule.enabled) continue;
      let isTriggered = false;
      
      if (rule.type === 'AMOUNT' && data.context.amount) {
        const amount = Number(data.context.amount);
        const threshold = rule.conditions.threshold as number;
        if (amount >= threshold) isTriggered = true;
      }

      if (isTriggered) {
        triggered.push(rule.id);
        const contribution = rule.severity === 'CRITICAL' ? 80 : rule.severity === 'HIGH' ? 50 : rule.severity === 'MEDIUM' ? 25 : 10;
        totalScore += contribution;
        factors.push({ rule: rule.name, contribution, reason: `${rule.name} triggered` });
      }
    }

    let level: RiskEvaluation['level'] = 'LOW';
    if (totalScore >= 80) level = 'CRITICAL';
    else if (totalScore >= 50) level = 'HIGH';
    else if (totalScore >= 25) level = 'MEDIUM';

    const evaluation: RiskEvaluation = {
      id: uuidv4(),
      ...data,
      score: totalScore,
      level,
      factors,
      triggeredRules: triggered,
      recommendation: totalScore >= 80 ? 'BLOCK' : totalScore >= 25 ? 'REVIEW' : 'APPROVE',
      createdAt: new Date().toISOString(),
    };

    const existing = this.evaluations.get(data.entityId) ?? [];
    existing.push(evaluation);
    this.evaluations.set(data.entityId, existing);

    return evaluation;
  }

  async getRules(): Promise<RiskRule[]> { return Array.from(this.rules.values()); }
  async createRule(rule: Omit<RiskRule, 'id'>): Promise<RiskRule> { const r = { ...rule, id: uuidv4() }; this.rules.set(r.id, r); return r; }
  async updateRule(id: string, data: Partial<RiskRule>): Promise<RiskRule> {
    const rule = this.rules.get(id); if (!rule) throw new Error('Rule not found');
    const updated = { ...rule, ...data }; this.rules.set(id, updated); return updated;
  }
  async getEvaluationHistory(entityId: string): Promise<RiskEvaluation[]> { return this.evaluations.get(entityId) ?? []; }
}

export default RiskService;