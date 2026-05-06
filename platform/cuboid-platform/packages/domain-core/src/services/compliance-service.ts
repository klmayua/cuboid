import { z } from 'zod';

export const ComplianceRuleTypeSchema = z.enum([
  'AML_SCREENING',
  'SANCTIONS_CHECK',
  'PEP_CHECK',
  'TRANSACTION_LIMIT',
  'GEOGRAPHIC_RESTRICTION',
  'CURRENCY_CONTROL',
  'DOCUMENT_REQUIREMENT',
  'MANUAL_REVIEW',
  'TRANSACTION_MONITORING',
  'SUSPICIOUS_ACTIVITY',
]);
export type ComplianceRuleType = z.infer<typeof ComplianceRuleTypeSchema>;

export const ComplianceActionSchema = z.enum([
  'ALLOW',
  'BLOCK',
  'HOLD',
  'REVIEW',
  'REJECT',
  'ESCALATE',
  'FLAG',
  'REPORT',
]);
export type ComplianceAction = z.infer<typeof ComplianceActionSchema>;

export interface ComplianceRule {
  id: string;
  name: string;
  type: ComplianceRuleType;
  description: string;
  enabled: boolean;
  priority: number;
  conditions: ComplianceCondition[];
  action: ComplianceAction;
  parameters?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'IN' | 'NOT_IN' | 'CONTAINS' | 'MATCHES';
  value: unknown;
}

export interface ComplianceCheckRequest {
  entityType: 'USER' | 'ORGANIZATION' | 'TRANSACTION' | 'BENEFICIARY' | 'PARTNER';
  entityId: string;
  context: Record<string, unknown>;
  rules?: string[];
}

export interface ComplianceCheckResult {
  requestId: string;
  status: 'PASS' | 'FAIL' | 'HOLD' | 'REVIEW' | 'ERROR';
  action: ComplianceAction;
  rulesTriggered: { rule: ComplianceRule; details: string }[];
  holdReason?: string;
  checkedAt: string;
}

export interface SanctionsMatch {
  id: string;
  type: 'INDIVIDUAL' | 'ORGANIZATION' | 'VESSEL' | 'AIRCRAFT';
  name: string;
  list: 'OFAC' | 'EU' | 'UN' | 'UK' | 'OTHER';
  score: number;
  matchDetails: string;
}

export interface AmlCheckResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  factors: { type: string; description: string; severity: string }[];
  matches: SanctionsMatch[];
  checkedAt: string;
}

export class ComplianceService {
  private rules: Map<string, ComplianceRule> = new Map();
  private checkHistory: ComplianceCheckResult[] = [];

  constructor() {
    this.initializeDefaultRules();
  }

  private initializeDefaultRules(): void {
    const defaultRules: Omit<ComplianceRule, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'OFAC Sanctions Check',
        type: 'SANCTIONS_CHECK',
        description: 'Screen against OFAC sanctions list',
        enabled: true,
        priority: 1,
        conditions: [{ field: 'entityType', operator: 'IN', value: ['USER', 'ORGANIZATION', 'BENEFICIARY'] }],
        action: 'BLOCK',
      },
      {
        name: 'PEP Screening',
        type: 'PEP_CHECK',
        description: 'Check for Politically Exposed Persons',
        enabled: true,
        priority: 2,
        conditions: [{ field: 'entityType', operator: 'IN', value: ['USER', 'ORGANIZATION'] }],
        action: 'REVIEW',
      },
      {
        name: 'Daily Transaction Limit',
        type: 'TRANSACTION_LIMIT',
        description: 'Enforce daily transaction limits',
        enabled: true,
        priority: 10,
        conditions: [{ field: 'amount', operator: 'GREATER_THAN', value: '10000' }],
        action: 'HOLD',
        parameters: { dailyLimit: 10000 },
      },
      {
        name: 'High Risk Country Block',
        type: 'GEOGRAPHIC_RESTRICTION',
        description: 'Block transactions from high risk countries',
        enabled: true,
        priority: 3,
        conditions: [{ field: 'country', operator: 'IN', value: ['KP', 'IR', 'SY', 'CU'] }],
        action: 'BLOCK',
      },
      {
        name: 'Large Transaction Review',
        type: 'TRANSACTION_MONITORING',
        description: 'Flag large transactions for manual review',
        enabled: true,
        priority: 5,
        conditions: [{ field: 'amount', operator: 'GREATER_THAN', value: '50000' }],
        action: 'REVIEW',
      },
      {
        name: 'Currency Control - USD',
        type: 'CURRENCY_CONTROL',
        description: 'Apply USD transaction restrictions',
        enabled: true,
        priority: 4,
        conditions: [{ field: 'currency', operator: 'EQUALS', value: 'USD' }],
        action: 'REVIEW',
        parameters: { requiresDocumentation: true },
      },
      {
        name: 'New Account Restriction',
        type: 'TRANSACTION_LIMIT',
        description: 'Limit transactions for accounts less than 30 days old',
        enabled: true,
        priority: 6,
        conditions: [{ field: 'accountAgeDays', operator: 'LESS_THAN', value: 30 }],
        action: 'HOLD',
        parameters: { limit: 5000 },
      },
    ];

    defaultRules.forEach((rule, index) => {
      const now = new Date().toISOString();
      const fullRule: ComplianceRule = {
        ...rule,
        id: `rule_${index + 1}`,
        createdAt: now,
        updatedAt: now,
      };
      this.rules.set(fullRule.id, fullRule);
    });
  }

  addRule(rule: Omit<ComplianceRule, 'id' | 'createdAt' | 'updatedAt'>): ComplianceRule {
    const now = new Date().toISOString();
    const fullRule: ComplianceRule = {
      ...rule,
      id: `rule_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    this.rules.set(fullRule.id, fullRule);
    return fullRule;
  }

  updateRule(ruleId: string, updates: Partial<ComplianceRule>): ComplianceRule | null {
    const existing = this.rules.get(ruleId);
    if (!existing) return null;

    const updated: ComplianceRule = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.rules.set(ruleId, updated);
    return updated;
  }

  deleteRule(ruleId: string): boolean {
    return this.rules.delete(ruleId);
  }

  getRule(ruleId: string): ComplianceRule | undefined {
    return this.rules.get(ruleId);
  }

  getAllRules(): ComplianceRule[] {
    return Array.from(this.rules.values()).sort((a, b) => a.priority - b.priority);
  }

  getEnabledRules(): ComplianceRule[] {
    return this.getAllRules().filter(r => r.enabled);
  }

  async check(request: ComplianceCheckRequest): Promise<ComplianceCheckResult> {
    const requestId = `check_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const triggeredRules: { rule: ComplianceRule; details: string }[] = [];
    
    const enabledRules = request.rules
      ? this.getAllRules().filter(r => request.rules!.includes(r.id))
      : this.getEnabledRules();

    for (const rule of enabledRules) {
      const result = this.evaluateRule(rule, request);
      if (result.matches) {
        triggeredRules.push({
          rule,
          details: result.details,
        });
      }
    }

    let status: ComplianceCheckResult['status'];
    let action: ComplianceAction;
    let holdReason: string | undefined;

    if (triggeredRules.length === 0) {
      status = 'PASS';
      action = 'ALLOW';
    } else {
      const highestPriority = triggeredRules.sort((a, b) => a.rule.priority - b.rule.priority)[0];
      action = highestPriority.rule.action;
      
      switch (action) {
        case 'BLOCK':
        case 'REJECT':
          status = 'FAIL';
          holdReason = `Blocked by rule: ${highestPriority.rule.name}`;
          break;
        case 'HOLD':
        case 'REVIEW':
        case 'ESCALATE':
          status = 'HOLD';
          holdReason = `Held for review: ${triggeredRules.map(r => r.rule.name).join(', ')}`;
          break;
        case 'FLAG':
          status = 'REVIEW';
          break;
        default:
          status = 'PASS';
      }
    }

    const result: ComplianceCheckResult = {
      requestId,
      status,
      action,
      rulesTriggered: triggeredRules,
      holdReason,
      checkedAt: new Date().toISOString(),
    };

    this.checkHistory.push(result);
    return result;
  }

  private evaluateRule(
    rule: ComplianceRule,
    request: ComplianceCheckRequest
  ): { matches: boolean; details: string } {
    try {
      for (const condition of rule.conditions) {
        const value = this.getFieldValue(request.context, condition.field);
        const matches = this.evaluateCondition(condition, value);
        
        if (matches) {
          return {
            matches: true,
            details: `Condition matched: ${condition.field} ${condition.operator} ${JSON.stringify(condition.value)}`,
          };
        }
      }
      return { matches: false, details: '' };
    } catch (error) {
      return {
        matches: false,
        details: `Error evaluating rule: ${error}`,
      };
    }
  }

  private getFieldValue(context: Record<string, unknown>, field: string): unknown {
    const parts = field.split('.');
    let value: unknown = context;
    
    for (const part of parts) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    
    return value;
  }

  private evaluateCondition(condition: ComplianceCondition, value: unknown): boolean {
    const targetValue = condition.value;

    switch (condition.operator) {
      case 'EQUALS':
        return value === targetValue;
      case 'NOT_EQUALS':
        return value !== targetValue;
      case 'GREATER_THAN':
        if (typeof value === 'string' && typeof targetValue === 'string') {
          const numValue = parseFloat(value);
          const numTarget = parseFloat(targetValue);
          return !isNaN(numValue) && !isNaN(numTarget) && numValue > numTarget;
        }
        return false;
      case 'LESS_THAN':
        if (typeof value === 'string' && typeof targetValue === 'string') {
          const numValue = parseFloat(value);
          const numTarget = parseFloat(targetValue);
          return !isNaN(numValue) && !isNaN(numTarget) && numValue < numTarget;
        }
        return false;
      case 'IN':
        if (Array.isArray(targetValue)) {
          return targetValue.includes(value);
        }
        return false;
      case 'NOT_IN':
        if (Array.isArray(targetValue)) {
          return !targetValue.includes(value);
        }
        return true;
      case 'CONTAINS':
        if (typeof value === 'string' && typeof targetValue === 'string') {
          return value.toLowerCase().includes(targetValue.toLowerCase());
        }
        return false;
      case 'MATCHES':
        if (typeof value === 'string' && typeof targetValue === 'string') {
          try {
            return new RegExp(targetValue).test(value);
          } catch {
            return false;
          }
        }
        return false;
      default:
        return false;
    }
  }

  async performAmlCheck(data: {
    name: string;
    entityType: string;
    country?: string;
  }): Promise<AmlCheckResult> {
    const factors: AmlCheckResult['factors'] = [];
    const matches: SanctionsMatch[] = [];
    let riskScore = 0;

    if (data.country) {
      const highRiskCountries = ['KP', 'IR', 'SY', 'CU', 'VN', 'BY', 'MM', 'ZW'];
      if (highRiskCountries.includes(data.country.toUpperCase())) {
        factors.push({
          type: 'HIGH_RISK_COUNTRY',
          description: `Entity from high-risk country: ${data.country}`,
          severity: 'HIGH',
        });
        riskScore += 30;
      }
    }

    if (data.name.toLowerCase().includes('test') || data.name.toLowerCase().includes('foo')) {
      factors.push({
        type: 'TEST_NAME',
        description: 'Name matches test patterns',
        severity: 'LOW',
      });
      riskScore += 5;
    }

    let riskLevel: AmlCheckResult['riskLevel'];
    if (riskScore >= 70) {
      riskLevel = 'CRITICAL';
    } else if (riskScore >= 40) {
      riskLevel = 'HIGH';
    } else if (riskScore >= 20) {
      riskLevel = 'MEDIUM';
    } else {
      riskLevel = 'LOW';
    }

    return {
      riskLevel,
      score: riskScore,
      factors,
      matches,
      checkedAt: new Date().toISOString(),
    };
  }

  getCheckHistory(entityId?: string): ComplianceCheckResult[] {
    if (entityId) {
      return this.checkHistory.slice(-100);
    }
    return this.checkHistory.slice(-100);
  }
}

export const complianceService = new ComplianceService();