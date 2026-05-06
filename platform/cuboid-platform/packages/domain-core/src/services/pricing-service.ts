import { z } from 'zod';

export const PricingStrategySchema = z.enum(['FIXED', 'DYNAMIC', 'MARKET', 'VOLUME', 'CORRIDOR_BASED']);
export type PricingStrategy = z.infer<typeof PricingStrategySchema>;

export interface CurrencyPair {
  base: string;
  quote: string;
}

export interface RateQuote {
  id: string;
  pair: CurrencyPair;
  bid: string;
  ask: string;
  mid: string;
  spread: string;
  spreadBps: number;
  timestamp: string;
  expiresAt: string;
  liquidityProvider?: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  type: 'FLAT' | 'PERCENTAGE' | 'TIERED' | 'VOLUME_DISCOUNT';
  currency: string;
  rates: { threshold?: string; fee: string; percentage?: string }[];
  minFee?: string;
  maxFee?: string;
}

export interface QuoteRequest {
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount?: string;
  targetAmount?: string;
  partnerId?: string;
  corridorId?: string;
  expiresIn?: number;
}

export interface QuoteResult {
  id: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: string;
  targetAmount: string;
  rate: string;
  spread: string;
  fees: string;
  totalCost: string;
  totalReceive: string;
  expiresAt: string;
  lockDuration: number;
}

export interface Route {
  id: string;
  corridors: string[];
  partners: string[];
  estimatedTime: number;
  successRate: number;
  totalCost: string;
}

export interface PricingNode {
  id: string;
  currency: string;
  type: 'CENTRAL_BANK' | 'COMMERCIAL_BANK' | 'MARKET' | 'PARTNER';
  rates: Record<string, { bid: string; ask: string; timestamp: string }>;
  liquidity: string;
  available: boolean;
}

export class PricingService {
  private rates: Map<string, RateQuote> = new Map();
  private feeStructures: Map<string, FeeStructure> = new Map();
  private pricingNodes: Map<string, PricingNode> = new Map();
  private markups: Map<string, { markup: string; strategy: PricingStrategy }> = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData(): void {
    const defaultPairs: CurrencyPair[] = [
      { base: 'USD', quote: 'EUR' },
      { base: 'USD', quote: 'GBP' },
      { base: 'USD', quote: 'KES' },
      { base: 'USD', quote: 'NGN' },
      { base: 'USD', quote: 'GHS' },
      { base: 'EUR', quote: 'GBP' },
      { base: 'EUR', quote: 'KES' },
      { base: 'GBP', quote: 'EUR' },
    ];

    defaultPairs.forEach(pair => {
      const key = `${pair.base}/${pair.quote}`;
      const mid = this.getMockRate(pair.base, pair.quote);
      const spreadBps = Math.floor(Math.random() * 50 + 20);
      const spread = (parseFloat(mid) * spreadBps / 10000).toFixed(4);
      
      this.rates.set(key, {
        id: `rate_${key}`,
        pair,
        bid: (parseFloat(mid) - parseFloat(spread) / 2).toFixed(4),
        ask: (parseFloat(mid) + parseFloat(spread) / 2).toFixed(4),
        mid,
        spread,
        spreadBps,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
      });
    });

    const defaultFees: Omit<FeeStructure, 'id'>[] = [
      {
        name: 'Transaction Fee',
        type: 'PERCENTAGE',
        currency: 'USD',
        rates: [{ threshold: '1000', fee: '0', percentage: '0.5' }],
        minFee: '1.00',
      },
      {
        name: 'Foreign Exchange Fee',
        type: 'TIERED',
        currency: 'USD',
        rates: [
          { threshold: '0', fee: '0', percentage: '0.15' },
          { threshold: '10000', fee: '0', percentage: '0.10' },
          { threshold: '50000', fee: '0', percentage: '0.05' },
        ],
      },
    ];

    defaultFees.forEach((fee, i) => {
      this.feeStructures.set(`fee_${i + 1}`, { ...fee, id: `fee_${i + 1}` });
    });
  }

  private getMockRate(base: string, quote: string): string {
    const rates: Record<string, string> = {
      'USD/EUR': '0.9200',
      'USD/GBP': '0.7890',
      'USD/KES': '153.50',
      'USD/NGN': '1550.00',
      'USD/GHS': '12.40',
      'EUR/GBP': '0.8570',
      'EUR/KES': '166.85',
      'GBP/EUR': '1.1670',
    };
    return rates[`${base}/${quote}`] ?? '1.0000';
  }

  async getRate(pair: CurrencyPair): Promise<RateQuote | null> {
    const key = `${pair.base}/${pair.quote}`;
    return this.rates.get(key) ?? null;
  }

  async calculateQuote(request: QuoteRequest): Promise<QuoteResult> {
    const { sourceCurrency, targetCurrency, sourceAmount, targetAmount, partnerId } = request;
    
    let sourceAmt: string;
    let targetAmt: string;
    let rate: string;

    const pair: CurrencyPair = { base: sourceCurrency, quote: targetCurrency };
    const marketRate = await this.getRate(pair);
    
    if (!marketRate) {
      throw new Error(`No rate available for ${sourceCurrency}/${targetCurrency}`);
    }

    const partnerMarkup = partnerId ? this.markups.get(partnerId)?.markup ?? '0' : '0';
    const totalMarkup = (parseFloat(marketRate.spread) + parseFloat(partnerMarkup)).toString();
    rate = (parseFloat(marketRate.mid) - parseFloat(totalMarkup) / 2).toFixed(4);

    if (sourceAmount) {
      sourceAmt = sourceAmount;
      targetAmt = (parseFloat(sourceAmount) * parseFloat(rate)).toFixed(2);
    } else if (targetAmount) {
      targetAmt = targetAmount;
      sourceAmt = (parseFloat(targetAmount) / parseFloat(rate)).toFixed(2);
    } else {
      throw new Error('Either sourceAmount or targetAmount must be provided');
    }

    const fees = this.calculateFees(sourceAmt, sourceCurrency);
    const totalCost = (parseFloat(sourceAmt) + parseFloat(fees)).toFixed(2);
    const totalReceive = targetAmt;

    const expiresIn = request.expiresIn ?? 300;
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    return {
      id: `quote_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      sourceCurrency,
      targetCurrency,
      sourceAmount: sourceAmt,
      targetAmount: targetAmt,
      rate,
      spread: totalMarkup,
      fees,
      totalCost,
      totalReceive,
      expiresAt,
      lockDuration: expiresIn,
    };
  }

  private calculateFees(amount: string, currency: string): string {
    const feeStructure = this.feeStructures.get('fee_1');
    if (!feeStructure) return '0';

    const amountNum = parseFloat(amount);
    const rate = feeStructure.rates[0];
    const percentage = rate.percentage ? parseFloat(rate.percentage) : 0;
    const fee = amountNum * (percentage / 100);
    
    let finalFee = fee;
    
    if (feeStructure.minFee) {
      finalFee = Math.max(fee, parseFloat(feeStructure.minFee));
    }
    if (feeStructure.maxFee) {
      finalFee = Math.min(fee, parseFloat(feeStructure.maxFee));
    }

    return finalFee.toFixed(2);
  }

  async findBestRoute(
    sourceCurrency: string,
    targetCurrency: string,
    amount: string
  ): Promise<Route[]> {
    const routes: Route[] = [];
    
    const directPair = await this.getRate({ base: sourceCurrency, quote: targetCurrency });
    if (directPair) {
      routes.push({
        id: 'direct',
        corridors: [`${sourceCurrency}_${targetCurrency}`],
        partners: [],
        estimatedTime: 60,
        successRate: 0.98,
        totalCost: directPair.spread,
      });
    }

    const commonIntermediates = ['USD', 'EUR', 'GBP'];
    for (const intermediate of commonIntermediates) {
      if (intermediate === sourceCurrency || intermediate === targetCurrency) continue;
      
      const firstLeg = await this.getRate({ base: sourceCurrency, quote: intermediate });
      const secondLeg = await this.getRate({ base: intermediate, quote: targetCurrency });
      
      if (firstLeg && secondLeg) {
        const impliedRate = parseFloat(firstLeg.mid) * parseFloat(secondLeg.mid);
        const directRate = directPair ? parseFloat(directPair.mid) : impliedRate;
        
        routes.push({
          id: `via_${intermediate}`,
          corridors: [`${sourceCurrency}_${intermediate}`, `${intermediate}_${targetCurrency}`],
          partners: [],
          estimatedTime: 300,
          successRate: 0.95,
          totalCost: (impliedRate - directRate).toFixed(4),
        });
      }
    }

    return routes.sort((a, b) => parseFloat(a.totalCost) - parseFloat(b.totalCost));
  }

  addPricingNode(node: PricingNode): void {
    this.pricingNodes.set(node.id, node);
  }

  getPricingNodes(currency?: string): PricingNode[] {
    const nodes = Array.from(this.pricingNodes.values());
    if (currency) {
      return nodes.filter(n => n.currency === currency);
    }
    return nodes;
  }

  setPartnerMarkup(partnerId: string, markup: string, strategy: PricingStrategy): void {
    this.markups.set(partnerId, { markup, strategy });
  }

  updateRate(pair: CurrencyPair, bid: string, ask: string): void {
    const key = `${pair.base}/${pair.quote}`;
    const mid = ((parseFloat(bid) + parseFloat(ask)) / 2).toFixed(4);
    const spread = (parseFloat(ask) - parseFloat(bid)).toFixed(4);
    const spreadBps = Math.round((parseFloat(spread) / parseFloat(mid)) * 10000);
    
    this.rates.set(key, {
      id: `rate_${key}`,
      pair,
      bid,
      ask,
      mid,
      spread,
      spreadBps,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
    });
  }
}

export const pricingService = new PricingService();