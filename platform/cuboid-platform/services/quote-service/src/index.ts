import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'quote-service' });

export enum QuoteStatus {
  PENDING = 'PENDING',
  LOCKED = 'LOCKED',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
}

export enum QuoteRequestSide {
  SOURCE = 'SOURCE',
  TARGET = 'TARGET',
}

export interface CurrencyPair {
  base: string;
  quote: string;
}

export interface MarketRate {
  pair: CurrencyPair;
  bid: string;
  ask: string;
  mid: string;
  spread: string;
  spreadBps: number;
  timestamp: string;
  expiresAt: string;
  source: string;
  liquidity: string;
}

export interface QuoteRequest {
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount?: string;
  targetAmount?: string;
  side?: QuoteRequestSide;
  partnerId?: string;
  corridorId?: string;
  expiresIn?: number;
  preferredRoute?: string;
}

export interface Quote {
  id: string;
  request: QuoteRequest;
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
  status: QuoteStatus;
  route: Route;
  createdAt: string;
}

export interface Route {
  id: string;
  name: string;
  type: 'DIRECT' | 'VIA_INTERMEDIATE' | 'MULTI_LEG';
  corridors: string[];
  partners: string[];
  estimatedTimeSeconds: number;
  successRate: number;
  rate: string;
  totalFees: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  type: 'FLAT' | 'PERCENTAGE' | 'TIERED';
  currency: string;
  rates: { threshold?: string; fee: string; percentage?: string }[];
  minFee?: string;
  maxFee?: string;
}

export interface PricingNode {
  id: string;
  name: string;
  currency: string;
  type: 'CENTRAL_BANK' | 'COMMERCIAL_BANK' | 'MARKET' | 'PARTNER';
  rates: Record<string, { bid: string; ask: string; timestamp: string }>;
  available: boolean;
  priority: number;
}

export class QuoteService {
  private rates: Map<string, MarketRate> = new Map();
  private quotes: Map<string, Quote> = new Map();
  private feeStructures: Map<string, FeeStructure> = new Map();
  private pricingNodes: Map<string, PricingNode> = new Map();
  private routes: Map<string, Route> = new Map();
  private markups: Map<string, { markup: string; strategy: string }> = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  async initialize(): Promise<void> {
    logger.info('Quote service initialized');
  }

  private initializeDefaultData(): void {
    const defaultPairs: CurrencyPair[] = [
      { base: 'USD', quote: 'EUR' },
      { base: 'USD', quote: 'GBP' },
      { base: 'USD', quote: 'KES' },
      { base: 'USD', quote: 'NGN' },
      { base: 'USD', quote: 'GHS' },
      { base: 'USD', quote: 'ZAR' },
      { base: 'EUR', quote: 'GBP' },
      { base: 'EUR', quote: 'KES' },
      { base: 'GBP', quote: 'EUR' },
      { base: 'GBP', quote: 'KES' },
    ];

    const mockRates: Record<string, string> = {
      'USD/EUR': '0.9200', 'USD/GBP': '0.7890', 'USD/KES': '153.50',
      'USD/NGN': '1550.00', 'USD/GHS': '12.40', 'USD/ZAR': '18.90',
      'EUR/GBP': '0.8570', 'EUR/KES': '166.85', 'GBP/EUR': '1.1670', 'GBP/KES': '194.50',
    };

    defaultPairs.forEach(pair => {
      const key = `${pair.base}/${pair.quote}`;
      const mid = mockRates[key] ?? '1.0000';
      const spreadBps = Math.floor(Math.random() * 50 + 20);
      const spreadVal = (parseFloat(mid) * spreadBps / 10000).toFixed(4);
      
      this.rates.set(key, {
        pair,
        bid: (parseFloat(mid) - parseFloat(spreadVal) / 2).toFixed(4),
        ask: (parseFloat(mid) + parseFloat(spreadVal) / 2).toFixed(4),
        mid,
        spread: spreadVal,
        spreadBps,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
        source: 'internal',
        liquidity: 'high',
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
        name: 'FX Fee',
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

    const directRoutes: Route[] = [
      {
        id: 'direct_usd_eur',
        name: 'USD → EUR Direct',
        type: 'DIRECT',
        corridors: ['USD_EUR'],
        partners: [],
        estimatedTimeSeconds: 60,
        successRate: 0.98,
        rate: '0.9200',
        totalFees: '0.50%',
      },
      {
        id: 'direct_usd_kes',
        name: 'USD → KES Direct',
        type: 'DIRECT',
        corridors: ['USD_KES'],
        partners: [],
        estimatedTimeSeconds: 120,
        successRate: 0.95,
        rate: '153.50',
        totalFees: '0.75%',
      },
    ];

    directRoutes.forEach(route => this.routes.set(route.id, route));
  }

  getRate(pair: CurrencyPair): MarketRate | null {
    const key = `${pair.base}/${pair.quote}`;
    return this.rates.get(key) ?? null;
  }

  async getQuote(request: QuoteRequest): Promise<Quote> {
    const { sourceCurrency, targetCurrency, sourceAmount, targetAmount, partnerId, expiresIn } = request;
    
    if (!sourceAmount && !targetAmount) {
      throw new Error('Either sourceAmount or targetAmount must be provided');
    }

    let sourceAmt: string;
    let targetAmt: string;

    const pair: CurrencyPair = { base: sourceCurrency, quote: targetCurrency };
    const marketRate = this.getRate(pair);
    
    if (!marketRate) {
      const alternativeRoutes = await this.findRoute(sourceCurrency, targetCurrency, sourceAmount ?? targetAmount!);
      if (alternativeRoutes.length === 0) {
        throw new Error(`No rate available for ${sourceCurrency}/${targetCurrency}`);
      }
      return this.buildQuoteFromRoute(request, alternativeRoutes[0]);
    }

    let rate: string;
    const partnerMarkup = partnerId ? this.markups.get(partnerId)?.markup ?? '0' : '0';
    const totalMarkup = (parseFloat(marketRate.spread) + parseFloat(partnerMarkup)).toFixed(4);
    rate = (parseFloat(marketRate.mid) - parseFloat(totalMarkup) / 2).toFixed(4);

    if (sourceAmount) {
      sourceAmt = sourceAmount;
      targetAmt = (parseFloat(sourceAmount) * parseFloat(rate)).toFixed(2);
    } else if (targetAmount) {
      targetAmt = targetAmount;
      sourceAmt = (parseFloat(targetAmount) / parseFloat(rate)).toFixed(2);
    } else {
      throw new Error('Amount calculation error');
    }

    const fees = this.calculateFees(sourceAmt, sourceCurrency);
    const totalCost = (parseFloat(sourceAmt) + parseFloat(fees)).toFixed(2);
    const totalReceive = targetAmt;

    const lockDuration = expiresIn ?? 300;
    const expiresAt = new Date(Date.now() + lockDuration * 1000).toISOString();

    const quote: Quote = {
      id: `quote_${uuidv4()}`,
      request,
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
      lockDuration,
      status: QuoteStatus.PENDING,
      route: this.buildDirectRoute(sourceCurrency, targetCurrency, rate),
      createdAt: new Date().toISOString(),
    };

    this.quotes.set(quote.id, quote);
    
    logger.info({ quoteId: quote.id, sourceCurrency, targetCurrency, rate }, 'Quote generated');
    
    return quote;
  }

  private buildDirectRoute(source: string, target: string, rate: string): Route {
    return {
      id: `direct_${source}_${target}`,
      name: `${source} → ${target} Direct`,
      type: 'DIRECT',
      corridors: [`${source}_${target}`],
      partners: [],
      estimatedTimeSeconds: 60,
      successRate: 0.98,
      rate,
      totalFees: '0.50%',
    };
  }

  private buildQuoteFromRoute(request: QuoteRequest, route: Route): Quote {
    const rate = route.rate;
    const sourceAmt = request.sourceAmount ?? '0';
    const targetAmt = (parseFloat(sourceAmt) * parseFloat(rate)).toFixed(2);
    
    return {
      id: `quote_${uuidv4()}`,
      request,
      sourceCurrency: request.sourceCurrency,
      targetCurrency: request.targetCurrency,
      sourceAmount: sourceAmt,
      targetAmount: targetAmt,
      rate,
      spread: route.totalFees,
      fees: '0',
      totalCost: sourceAmt,
      totalReceive: targetAmt,
      expiresAt: new Date(Date.now() + (request.expiresIn ?? 300) * 1000).toISOString(),
      lockDuration: request.expiresIn ?? 300,
      status: QuoteStatus.PENDING,
      route,
      createdAt: new Date().toISOString(),
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

  async findRoute(sourceCurrency: string, targetCurrency: string, amount: string): Promise<Route[]> {
    const routes: Route[] = [];
    
    const directPair = this.getRate({ base: sourceCurrency, quote: targetCurrency });
    if (directPair) {
      routes.push({
        id: 'direct',
        name: 'Direct Route',
        type: 'DIRECT',
        corridors: [`${sourceCurrency}_${targetCurrency}`],
        partners: [],
        estimatedTimeSeconds: 60,
        successRate: 0.98,
        rate: directPair.mid,
        totalFees: directPair.spread,
      });
    }

    const intermediates = ['USD', 'EUR', 'GBP'];
    for (const intermediate of intermediates) {
      if (intermediate === sourceCurrency || intermediate === targetCurrency) continue;
      
      const firstLeg = this.getRate({ base: sourceCurrency, quote: intermediate });
      const secondLeg = this.getRate({ base: intermediate, quote: targetCurrency });
      
      if (firstLeg && secondLeg) {
        const impliedRate = (parseFloat(firstLeg.mid) * parseFloat(secondLeg.mid)).toFixed(4);
        
        routes.push({
          id: `via_${intermediate}`,
          name: `Via ${intermediate}`,
          type: 'VIA_INTERMEDIATE',
          corridors: [`${sourceCurrency}_${intermediate}`, `${intermediate}_${targetCurrency}`],
          partners: [],
          estimatedTimeSeconds: 300,
          successRate: 0.95,
          rate: impliedRate,
          totalFees: (parseFloat(firstLeg.spread) + parseFloat(secondLeg.spread)).toFixed(4),
        });
      }
    }

    return routes.sort((a, b) => {
      const rateA = parseFloat(a.rate);
      const rateB = parseFloat(b.rate);
      return Math.abs(parseFloat(amount) - rateA) - Math.abs(parseFloat(amount) - rateB);
    });
  }

  getQuoteById(quoteId: string): Quote | undefined {
    return this.quotes.get(quoteId);
  }

  lockQuote(quoteId: string): Quote | null {
    const quote = this.quotes.get(quoteId);
    if (!quote) return null;

    if (new Date(quote.expiresAt) < new Date()) {
      quote.status = QuoteStatus.EXPIRED;
      return quote;
    }

    quote.status = QuoteStatus.LOCKED;
    return quote;
  }

  acceptQuote(quoteId: string): Quote | null {
    const quote = this.quotes.get(quoteId);
    if (!quote) return null;

    if (new Date(quote.expiresAt) < new Date()) {
      quote.status = QuoteStatus.EXPIRED;
      return null;
    }

    quote.status = QuoteStatus.ACCEPTED;
    return quote;
  }

  expireQuote(quoteId: string): Quote | null {
    const quote = this.quotes.get(quoteId);
    if (!quote) return null;

    quote.status = QuoteStatus.EXPIRED;
    return quote;
  }

  expireOldQuotes(): number {
    const now = new Date();
    let expiredCount = 0;
    
    for (const quote of this.quotes.values()) {
      if (quote.status === QuoteStatus.PENDING && new Date(quote.expiresAt) < now) {
        quote.status = QuoteStatus.EXPIRED;
        expiredCount++;
      }
    }
    
    return expiredCount;
  }

  setPartnerMarkup(partnerId: string, markup: string, strategy: string): void {
    this.markups.set(partnerId, { markup, strategy });
  }

  updateMarketRate(pair: CurrencyPair, bid: string, ask: string): void {
    const key = `${pair.base}/${pair.quote}`;
    const mid = ((parseFloat(bid) + parseFloat(ask)) / 2).toFixed(4);
    const spread = (parseFloat(ask) - parseFloat(bid)).toFixed(4);
    const spreadBps = Math.round((parseFloat(spread) / parseFloat(mid)) * 10000);
    
    this.rates.set(key, {
      pair,
      bid,
      ask,
      mid,
      spread,
      spreadBps,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
      source: 'live',
      liquidity: 'high',
    });
  }

  getAvailableCorridors(): { source: string; target: string; rate: string }[] {
    const corridors: { source: string; target: string; rate: string }[] = [];
    
    for (const rate of this.rates.values()) {
      corridors.push({
        source: rate.pair.base,
        target: rate.pair.quote,
        rate: rate.mid,
      });
    }
    
    return corridors;
  }

  getStats(): {
    activeQuotes: number;
    expiredQuotes: number;
    acceptedQuotes: number;
    availableCorridors: number;
  } {
    let active = 0, expired = 0, accepted = 0;
    
    for (const quote of this.quotes.values()) {
      if (quote.status === QuoteStatus.PENDING || quote.status === QuoteStatus.LOCKED) active++;
      else if (quote.status === QuoteStatus.EXPIRED) expired++;
      else if (quote.status === QuoteStatus.ACCEPTED) accepted++;
    }
    
    return {
      activeQuotes: active,
      expiredQuotes: expired,
      acceptedQuotes: accepted,
      availableCorridors: this.rates.size,
    };
  }
}

export const quoteService = new QuoteService();

if (require.main === module) {
  (async () => {
    await quoteService.initialize();
    logger.info('Quote service running');
  })();
}