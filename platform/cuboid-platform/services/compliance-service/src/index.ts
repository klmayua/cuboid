import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'compliance-service' });

export enum ComplianceRuleType {
  AML_SCREENING = 'AML_SCREENING',
  SANCTIONS_CHECK = 'SANCTIONS_CHECK',
  PEP_CHECK = 'PEP_CHECK',
  TRANSACTION_LIMIT = 'TRANSACTION_LIMIT',
  GEOGRAPHIC_RESTRICTION = 'GEOGRAPHIC_RESTRICTION',
  CURRENCY_CONTROL = 'CURRENCY_CONTROL',
  DOCUMENT_REQUIREMENT = 'DOCUMENT_REQUIREMENT',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
  TRANSACTION_MONITORING = 'TRANSACTION_MONITORING',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
}

export enum ComplianceAction {
  ALLOW = 'ALLOW',
  BLOCK = 'BLOCK',
  HOLD = 'HOLD',
  REVIEW = 'REVIEW',
  REJECT = 'REJECT',
  ESCALATE = 'ESCALATE',
  FLAG = 'FLAG',
  REPORT = 'REPORT',
}

export enum ConditionOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  CONTAINS = 'CONTAINS',
  MATCHES = 'MATCHES',
  EXISTS = 'EXISTS',
  NOT_EXISTS = 'NOT_EXISTS',
}

export interface ComplianceCondition {
  field: string;
  operator: ConditionOperator;
  value: unknown;
}

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

export enum ComplianceCheckEntityType {
  USER = 'USER',
  ORGANIZATION = 'ORGANIZATION',
  TRANSACTION = 'TRANSACTION',
  BENEFICIARY = 'BENEFICIARY',
  PARTNER = 'PARTNER',
}

export interface ComplianceCheckRequest {
  requestId?: string;
  entityType: ComplianceCheckEntityType;
  entityId: string;
  context: Record<string, unknown>;
  rules?: string[];
  skipRules?: string[];
}

export interface ComplianceCheckResult {
  requestId: string;
  status: 'PASS' | 'FAIL' | 'HOLD' | 'REVIEW' | 'ERROR';
  action: ComplianceAction;
  rulesTriggered: { rule: ComplianceRule; details: string; severity: string }[];
  holdReason?: string;
  checkedAt: string;
  processingTimeMs: number;
}

export interface SanctionsMatch {
  id: string;
  type: 'INDIVIDUAL' | 'ORGANIZATION' | 'VESSEL' | 'AIRCRAFT';
  name: string;
  list: 'OFAC' | 'EU' | 'UN' | 'UK' | 'OTHER';
  score: number;
  matchDetails: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface AmlCheckResult {
  requestId: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  factors: { type: string; description: string; severity: string }[];
  matches: SanctionsMatch[];
  recommendations: string[];
  checkedAt: string;
}

export interface ComplianceCase {
  id: string;
  type: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'PENDING_DOCUMENTATION' | 'RESOLVED' | 'ESCALATED' | 'CLOSED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  subjectType: ComplianceCheckEntityType;
  subjectId: string;
  description: string;
  assignedTo?: string;
  notes: string[];
  documents: { id: string; name: string; url: string; uploadedAt: string }[];
  resolution?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export class ComplianceService {
  private rules: Map<string, ComplianceRule> = new Map();
  private checkHistory: ComplianceCheckResult[] = [];
  private cases: Map<string, ComplianceCase> = new Map();

  constructor() {
    this.initializeDefaultRules();
  }

  async initialize(): Promise<void> {
    logger.info('Compliance service initialized');
  }

  private initializeDefaultRules(): void {
    const defaultRules: Omit<ComplianceRule, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'OFAC Sanctions Check',
        type: ComplianceRuleType.SANCTIONS_CHECK,
        description: 'Screen against OFAC sanctions list',
        enabled: true,
        priority: 1,
        conditions: [{ field: 'entityType', operator: ConditionOperator.IN, value: ['USER', 'ORGANIZATION', 'BENEFICIARY'] }],
        action: ComplianceAction.BLOCK,
      },
      {
        name: 'PEP Screening',
        type: ComplianceRuleType.PEP_CHECK,
        description: 'Check for Politically Exposed Persons',
        enabled: true,
        priority: 2,
        conditions: [{ field: 'entityType', operator: ConditionOperator.IN, value: ['USER', 'ORGANIZATION'] }],
        action: ComplianceAction.REVIEW,
      },
      {
        name: 'Daily Transaction Limit',
        type: ComplianceRuleType.TRANSACTION_LIMIT,
        description: 'Enforce daily transaction limits',
        enabled: true,
        priority: 10,
        conditions: [{ field: 'amount', operator: ConditionOperator.GREATER_THAN, value: '10000' }],
        action: ComplianceAction.HOLD,
        parameters: { dailyLimit: 10000 },
      },
      {
        name: 'High Risk Country Block',
        type: ComplianceRuleType.GEOGRAPHIC_RESTRICTION,
        description: 'Block transactions from high risk countries',
        enabled: true,
        priority: 3,
        conditions: [{ field: 'country', operator: ConditionOperator.IN, value: ['KP', 'IR', 'SY', 'CU', 'BY'] }],
        action: ComplianceAction.BLOCK,
      },
      {
        name: 'Large Transaction Review',
        type: ComplianceRuleType.TRANSACTION_MONITORING,
        description: 'Flag large transactions for manual review',
        enabled: true,
        priority: 5,
        conditions: [{ field: 'amount', operator: ConditionOperator.GREATER_THAN, value: '50000' }],
        action: ComplianceAction.REVIEW,
      },
      {
        name: 'Currency Control - USD',
        type: ComplianceRuleType.CURRENCY_CONTROL,
        description: 'Apply USD transaction restrictions',
        enabled: true,
        priority: 4,
        conditions: [{ field: 'currency', operator: ConditionOperator.EQUALS, value: 'USD' }],
        action: ComplianceAction.REVIEW,
        parameters: { requiresDocumentation: true },
      },
      {
        name: 'New Account Restriction',
        type: ComplianceRuleType.TRANSACTION_LIMIT,
        description: 'Limit transactions for accounts less than 30 days old',
        enabled: true,
        priority: 6,
        conditions: [{ field: 'accountAgeDays', operator: ConditionOperator.LESS_THAN, value: 30 }],
        action: ComplianceAction.HOLD,
        parameters: { limit: 5000 },
      },
      {
        name: 'Suspicious Activity Detection',
        type: ComplianceRuleType.SUSPICIOUS_ACTIVITY,
        description: 'Detect suspicious transaction patterns',
        enabled: true,
        priority: 7,
        conditions: [{ field: 'patternFlags', operator: ConditionOperator.EXISTS, value: null }],
        action: ComplianceAction.ESCALATE,
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

    logger.info({ ruleCount: defaultRules.length }, 'Default compliance rules initialized');
  }

  addRule(rule: Omit<ComplianceRule, 'id' | 'createdAt' | 'updatedAt'>): ComplianceRule {
    const now = new Date().toISOString();
    const fullRule: ComplianceRule = {
      ...rule,
      id: `rule_${uuidv4()}`,
      createdAt: now,
      updatedAt: now,
    };
    this.rules.set(fullRule.id, fullRule);
    logger.info({ ruleId: fullRule.id, ruleName: rule.name }, 'Compliance rule added');
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
    const startTime = Date.now();
    const requestId = request.requestId ?? `check_${uuidv4()}`;
    const triggeredRules: { rule: ComplianceRule; details: string; severity: string }[] = [];
    
    let enabledRules = request.rules
      ? this.getAllRules().filter(r => request.rules!.includes(r.id))
      : this.getEnabledRules();

    if (request.skipRules) {
      enabledRules = enabledRules.filter(r => !request.skipRules!.includes(r.id));
    }

    for (const rule of enabledRules) {
      const result = this.evaluateRule(rule, request);
      if (result.matches) {
        triggeredRules.push({
          rule,
          details: result.details,
          severity: this.getRuleSeverity(rule),
        });
      }
    }

    let status: ComplianceCheckResult['status'];
    let action: ComplianceAction;
    let holdReason: string | undefined;

    if (triggeredRules.length === 0) {
      status = 'PASS';
      action = ComplianceAction.ALLOW;
    } else {
      triggeredRules.sort((a, b) => a.rule.priority - b.rule.priority);
      const highestPriority = triggeredRules[0];
      action = highestPriority.rule.action;
      
      switch (action) {
        case ComplianceAction.BLOCK:
        case ComplianceAction.REJECT:
          status = 'FAIL';
          holdReason = `Blocked by rule: ${highestPriority.rule.name}`;
          break;
        case ComplianceAction.HOLD:
        case ComplianceAction.ESCALATE:
          status = 'HOLD';
          holdReason = `Held for review: ${triggeredRules.map(r => r.rule.name).join(', ')}`;
          break;
        case ComplianceAction.REVIEW:
        case ComplianceAction.FLAG:
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
      processingTimeMs: Date.now() - startTime,
    };

    this.checkHistory.push(result);
    
    logger.info(
      { requestId, status, action, rulesTriggered: triggeredRules.length },
      'Compliance check completed'
    );

    return result;
  }

  private getRuleSeverity(rule: ComplianceRule): string {
    switch (rule.type) {
      case ComplianceRuleType.SANCTIONS_CHECK:
      case ComplianceRuleType.PEP_CHECK:
        return 'CRITICAL';
      case ComplianceRuleType.GEOGRAPHIC_RESTRICTION:
      case ComplianceRuleType.SUSPICIOUS_ACTIVITY:
        return 'HIGH';
      case ComplianceRuleType.TRANSACTION_LIMIT:
      case ComplianceRuleType.CURRENCY_CONTROL:
        return 'MEDIUM';
      default:
        return 'LOW';
    }
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
      return { matches: false, details: `Error: ${error}` };
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
      case ConditionOperator.EQUALS:
        return value === targetValue;
      case ConditionOperator.NOT_EQUALS:
        return value !== targetValue;
      case ConditionOperator.GREATER_THAN:
        if (typeof value === 'number' && typeof targetValue === 'number') {
          return value > targetValue;
        }
        if (typeof value === 'string' && typeof targetValue === 'string') {
          const numValue = parseFloat(value);
          const numTarget = parseFloat(targetValue);
          return !isNaN(numValue) && !isNaN(numTarget) && numValue > numTarget;
        }
        return false;
      case ConditionOperator.LESS_THAN:
        if (typeof value === 'number' && typeof targetValue === 'number') {
          return value < targetValue;
        }
        if (typeof value === 'string' && typeof targetValue === 'string') {
          const numValue = parseFloat(value);
          const numTarget = parseFloat(targetValue);
          return !isNaN(numValue) && !isNaN(numTarget) && numValue < numTarget;
        }
        return false;
      case ConditionOperator.IN:
        if (Array.isArray(targetValue)) {
          return targetValue.includes(value);
        }
        return false;
      case ConditionOperator.NOT_IN:
        if (Array.isArray(targetValue)) {
          return !targetValue.includes(value);
        }
        return true;
      case ConditionOperator.CONTAINS:
        if (typeof value === 'string' && typeof targetValue === 'string') {
          return value.toLowerCase().includes(targetValue.toLowerCase());
        }
        return false;
      case ConditionOperator.MATCHES:
        if (typeof value === 'string' && typeof targetValue === 'string') {
          try {
            return new RegExp(targetValue, 'i').test(value);
          } catch {
            return false;
          }
        }
        return false;
      case ConditionOperator.EXISTS:
        return value !== undefined && value !== null;
      case ConditionOperator.NOT_EXISTS:
        return value === undefined || value === null;
      default:
        return false;
    }
  }

  async performAmlCheck(data: {
    name: string;
    entityType: string;
    country?: string;
    dateOfBirth?: string;
    idNumber?: string;
  }): Promise<AmlCheckResult> {
    const requestId = `aml_${uuidv4()}`;
    const factors: AmlCheckResult['factors'] = [];
    const matches: SanctionsMatch[] = [];
    let riskScore = 0;

    const highRiskCountries = ['KP', 'IR', 'SY', 'CU', 'VN', 'BY', 'MM', 'ZW'];
    if (data.country && highRiskCountries.includes(data.country.toUpperCase())) {
      factors.push({
        type: 'HIGH_RISK_COUNTRY',
        description: `Entity from high-risk country: ${data.country}`,
        severity: 'HIGH',
      });
      riskScore += 30;
    }

    if (data.name.toLowerCase().includes('test') || data.name.toLowerCase().includes('sanction')) {
      factors.push({
        type: 'TEST_NAME',
        description: 'Name matches test patterns - likely false positive',
        severity: 'LOW',
      });
      riskScore += 5;
    }

    const pepNames = ['politician', 'minister', 'president', 'governor', 'senator'];
    if (pepNames.some(n => data.name.toLowerCase().includes(n))) {
      factors.push({
        type: 'PEP_MATCH',
        description: 'Name matches PEP patterns',
        severity: 'HIGH',
      });
      riskScore += 25;
    }

    if (data.idNumber) {
      factors.push({
        type: 'ID_VERIFICATION',
        description: 'ID number provided for verification',
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

    const recommendations: string[] = [];
    if (riskLevel === 'HIGH' || riskLevel === 'CRITICAL') {
      recommendations.push('Enhanced due diligence required');
      recommendations.push('Manager approval required');
    }
    if (data.country && highRiskCountries.includes(data.country.toUpperCase())) {
      recommendations.push('Senior compliance officer review required');
    }
    if (factors.some(f => f.type === 'PEP_MATCH')) {
      recommendations.push('PEP screening certificate required');
      recommendations.push('Source of wealth verification required');
    }

    return {
      requestId,
      riskLevel,
      score: riskScore,
      factors,
      matches,
      recommendations,
      checkedAt: new Date().toISOString(),
    };
  }

  createCase(data: {
    type: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    subjectType: ComplianceCheckEntityType;
    subjectId: string;
    description: string;
  }): ComplianceCase {
    const now = new Date().toISOString();
    const caseData: ComplianceCase = {
      id: `case_${uuidv4()}`,
      type: data.type,
      status: 'OPEN',
      severity: data.severity,
      subjectType: data.subjectType,
      subjectId: data.subjectId,
      description: data.description,
      notes: [],
      documents: [],
      createdAt: now,
      updatedAt: now,
    };

    this.cases.set(caseData.id, caseData);
    logger.info({ caseId: caseData.id, severity: data.severity }, 'Compliance case created');
    
    return caseData;
  }

  getCase(caseId: string): ComplianceCase | undefined {
    return this.cases.get(caseId);
  }

  updateCase(caseId: string, updates: Partial<ComplianceCase>): ComplianceCase | null {
    const existing = this.cases.get(caseId);
    if (!existing) return null;

    const updated: ComplianceCase = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };
    this.cases.set(caseId, updated);
    return updated;
  }

  getCases(filter?: {
    status?: ComplianceCase['status'];
    severity?: ComplianceCase['severity'];
    subjectId?: string;
  }): ComplianceCase[] {
    let cases = Array.from(this.cases.values());

    if (filter?.status) {
      cases = cases.filter(c => c.status === filter.status);
    }
    if (filter?.severity) {
      cases = cases.filter(c => c.severity === filter.severity);
    }
    if (filter?.subjectId) {
      cases = cases.filter(c => c.subjectId === filter.subjectId);
    }

    return cases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getCheckHistory(entityId?: string, limit: number = 100): ComplianceCheckResult[] {
    const history = entityId 
      ? this.checkHistory.filter(h => h.requestId.includes(entityId))
      : this.checkHistory;
    return history.slice(-limit);
  }

  getStats(): {
    totalRules: number;
    enabledRules: number;
    totalChecks: number;
    passRate: number;
    casesByStatus: Record<string, number>;
  } {
    const allRules = this.getAllRules();
    const enabledRules = this.getEnabledRules();
    
    const passCount = this.checkHistory.filter(h => h.status === 'PASS').length;
    const passRate = this.checkHistory.length > 0 
      ? (passCount / this.checkHistory.length) * 100 
      : 100;

    const casesByStatus: Record<string, number> = {};
    for (const c of this.cases.values()) {
      casesByStatus[c.status] = (casesByStatus[c.status] || 0) + 1;
    }

    return {
      totalRules: allRules.length,
      enabledRules: enabledRules.length,
      totalChecks: this.checkHistory.length,
      passRate: Math.round(passRate * 10) / 10,
      casesByStatus,
    };
  }
}

export const complianceService = new ComplianceService();

if (require.main === module) {
  (async () => {
    await complianceService.initialize();
    logger.info('Compliance service running');
  })();
}