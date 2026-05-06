import { v4 as uuidv4 } from 'uuid';

export interface PricingRule {
  id: string;
  name: string;
  corridor?: string;
  currencyPair?: string;
  feeType: 'FIXED' | 'PERCENTAGE' | 'TIERED';
  feeValue: string;
  minFee?: string;
  maxFee?: string;
  priority: number;
  active: boolean;
}

export interface FeeQuote {
  amount: string;
  currency: string;
  feeBreakdown: { type: string; label: string; amount: string }[];
  totalFee: string;
  netAmount: string;
}

class PricingStore {
  private rules: Map<string, PricingRule> = new Map();

  constructor() {
    const defaults: PricingRule[] = [
      { id: '1', name: 'Standard Fee', feeType: 'PERCENTAGE', feeValue: '0.5', minFee: '5', maxFee: '50', priority: 1, active: true },
      { id: '2', name: 'Large Transaction', corridor: 'USA-NGA', feeType: 'PERCENTAGE', feeValue: '0.3', minFee: '10', maxFee: '100', priority: 2, active: true },
    ];
    defaults.forEach(r => this.rules.set(r.id, r));
  }

  async getRules(): Promise<PricingRule[]> { return Array.from(this.rules.values()).sort((a, b) => b.priority - a.priority); }
  async createRule(data: Omit<PricingRule, 'id'>): Promise<PricingRule> { const r = { ...data, id: uuidv4() }; this.rules.set(r.id, r); return r; }
  async updateRule(id: string, data: Partial<PricingRule>): Promise<PricingRule> {
    const rule = this.rules.get(id); if (!rule) throw new Error('Rule not found');
    const updated = { ...rule, ...data }; this.rules.set(id, updated); return updated;
  }
}

export class PricingService {
  private store: PricingStore;
  constructor() { this.store = new PricingStore(); }

  async calculateFee(amount: string, currency: string, corridor?: string): Promise<FeeQuote> {
    const rules = await this.store.getRules();
    const applicableRules = corridor ? rules.filter(r => r.corridor === corridor || !r.corridor) : rules;
    const rule = applicableRules[0];

    let fee: bigint;
    if (rule.feeType === 'FIXED') {
      fee = BigInt(rule.feeValue);
    } else if (rule.feeType === 'PERCENTAGE') {
      fee = (BigInt(amount) * BigInt(Math.round(Number(rule.feeValue) * 1000)) / 100000n);
    } else {
      fee = 0n;
    }

    if (rule.minFee && fee < BigInt(rule.minFee)) fee = BigInt(rule.minFee);
    if (rule.maxFee && fee > BigInt(rule.maxFee)) fee = BigInt(rule.maxFee);

    const totalFee = fee.toString();
    const netAmount = (BigInt(amount) - fee).toString();

    return {
      amount,
      currency,
      feeBreakdown: [{ type: rule.feeType, label: rule.name, amount: totalFee }],
      totalFee,
      netAmount,
    };
  }

  async getRules(): Promise<PricingRule[]> { return this.store.getRules(); }
}

export default PricingService;