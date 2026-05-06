import { v4 as uuidv4 } from 'uuid';

export interface FraudAlert {
  id: string;
  type: 'DEVICE' | 'ACCOUNT' | 'TRANSACTION' | 'PATTERN';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  entityId: string;
  description: string;
  signals: string[];
  status: 'OPEN' | 'UNDER_REVIEW' | 'BLOCKED' | 'CLEARED' | 'ESCALATED';
  assignee?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FraudPattern {
  id: string;
  name: string;
  indicators: string[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  frequency: number;
}

class FraudStore {
  private alerts: Map<string, FraudAlert> = new Map();
  private patterns: Map<string, FraudPattern> = new Map();
  private investigations: Map<string, { status: string; findings: string[]; createdAt: string }> = new Map();

  async createAlert(data: Omit<FraudAlert, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<FraudAlert> {
    const alert: FraudAlert = { ...data, id: uuidv4(), status: 'OPEN', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.alerts.set(alert.id, alert);
    return alert;
  }

  async getAlert(id: string): Promise<FraudAlert | null> { return this.alerts.get(id) ?? null; }
  async updateAlert(id: string, data: Partial<FraudAlert>): Promise<FraudAlert> {
    const alert = this.alerts.get(id); if (!alert) throw new Error('Alert not found');
    const updated = { ...alert, ...data, updatedAt: new Date().toISOString() };
    this.alerts.set(id, updated); return updated;
  }

  async getAlerts(filters?: { status?: string; severity?: string }): Promise<FraudAlert[]> {
    let alerts = Array.from(this.alerts.values());
    if (filters?.status) alerts = alerts.filter(a => a.status === filters.status);
    if (filters?.severity) alerts = alerts.filter(a => a.severity === filters.severity);
    return alerts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async createPattern(data: Omit<FraudPattern, 'id'>): Promise<FraudPattern> {
    const pattern: FraudPattern = { ...data, id: uuidv4() };
    this.patterns.set(pattern.id, pattern); return pattern;
  }

  async getPatterns(): Promise<FraudPattern[]> { return Array.from(this.patterns.values()); }

  async detect(entityId: string, signals: string[]): Promise<{ risk: number; matchedPatterns: string[] }> {
    let risk = 0; const matched: string[] = [];
    for (const pattern of this.patterns.values()) {
      const matches = signals.filter(s => pattern.indicators.includes(s)).length;
      if (matches > 0) {
        risk += pattern.severity === 'CRITICAL' ? 80 : pattern.severity === 'HIGH' ? 50 : pattern.severity === 'MEDIUM' ? 25 : 10;
        matched.push(pattern.id);
      }
    }
    return { risk, matchedPatterns: matched };
  }
}

export class FraudService {
  private store: FraudStore;
  constructor() { this.store = new FraudStore(); this.initPatterns(); }

  private async initPatterns() {
    const patterns = [
      { name: 'SIM Swap', indicators: ['sim_change', 'location_jump'], severity: 'HIGH' as const, frequency: 0 },
      { name: 'Velocity Burst', indicators: ['rapid_transactions', 'max_amount'], severity: 'HIGH' as const, frequency: 0 },
      { name: 'New Device', indicators: ['new_device', 'first_transaction'], severity: 'MEDIUM' as const, frequency: 0 },
    ];
    for (const p of patterns) await this.store.createPattern(p);
  }

  async createAlert(data: { type: FraudAlert['type']; severity: FraudAlert['severity']; entityId: string; description: string; signals: string[] }): Promise<FraudAlert> {
    return this.store.createAlert(data);
  }

  async getAlerts(filters?: { status?: string; severity?: string }): Promise<FraudAlert[]> {
    return this.store.getAlerts(filters);
  }

  async assignAlert(alertId: string, assignee: string): Promise<FraudAlert> {
    return this.store.updateAlert(alertId, { status: 'UNDER_REVIEW', assignee });
  }

  async resolveAlert(alertId: string, resolution: string): Promise<FraudAlert> {
    return this.store.updateAlert(alertId, { status: 'CLEARED', resolution });
  }

  async blockAlert(alertId: string): Promise<FraudAlert> {
    return this.store.updateAlert(alertId, { status: 'BLOCKED' });
  }

  async analyze(entityId: string, signals: string[]): Promise<{ risk: number; matchedPatterns: string[]; action: string }> {
    const { risk, matchedPatterns } = await this.store.detect(entityId, signals);
    if (risk >= 80) return { risk, matchedPatterns, action: 'BLOCK' };
    if (risk >= 50) return { risk, matchedPatterns, action: 'REVIEW' };
    return { risk, matchedPatterns, action: 'APPROVE' };
  }
}

export default FraudService;