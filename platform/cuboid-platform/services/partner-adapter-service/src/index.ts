import { v4 as uuidv4 } from 'uuid';

export interface PartnerQuote {
  partnerId: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: string;
  targetAmount: string;
  rate: string;
  spread: string;
  fees: string;
  expiresAt: string;
}

export interface QuoteRequest {
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: string;
}

export interface FundRequest {
  sourceWalletId: string;
  destinationCorridor: string;
  destinationAccount: {
    bankName: string;
    accountNumber: string;
    routingNumber?: string;
    accountName: string;
  };
  amount: string;
  currency: string;
  reference: string;
}

export interface TransferRequest {
  quoteId: string;
  fundId: string;
  destinationCorridor: string;
}

export interface PayoutRequest {
  transferId: string;
  destinationAccount: {
    bankName: string;
    accountNumber: string;
    routingNumber?: string;
    accountName: string;
  };
}

export interface PartnerCapabilities {
  QUOTE: boolean;
  FUND: boolean;
  HOLD: boolean;
  TRANSFER: boolean;
  PAYOUT: boolean;
  CONFIRM: boolean;
  REVERSE: boolean;
  RECONCILE: boolean;
  REPORT: boolean;
}

export interface PartnerStatus {
  connected: boolean;
  lastHealthCheck?: string;
  latency?: number;
  uptime?: number;
}

export interface PartnerAdapter {
  partnerId: string;
  partnerType: string;
  capabilities: PartnerCapabilities;
  status: PartnerStatus;

  connect(): Promise<void>;
  authenticate(): Promise<void>;
  healthCheck(): Promise<PartnerStatus>;
  
  quote(request: QuoteRequest): Promise<PartnerQuote>;
  fund(request: FundRequest): Promise<{ fundId: string; status: string }>;
  holdFunds(fundId: string, amount: string): Promise<{ holdId: string }>;
  releaseFunds(holdId: string): Promise<{ status: string }>;
  settle(request: TransferRequest): Promise<{ transferId: string; status: string }>;
  confirmSettlement(transferId: string): Promise<{ settledAt: string; confirmationRef: string }>;
  reverse(transferId: string): Promise<{ status: string }>;
  reconcile(request: { startDate: string; endDate: string }): Promise<{ records: any[]; breaks: any[] }>;
  report(type: string, params: any): Promise<{ url: string }>;
  handleWebhook(payload: any): Promise<{ event: string; data: any }>;
}

class MockPartnerAdapter implements PartnerAdapter {
  partnerId: string;
  partnerType: string;
  capabilities: PartnerCapabilities;
  status: PartnerStatus;

  constructor(partnerId: string, partnerType: string) {
    this.partnerId = partnerId;
    this.partnerType = partnerType;
    this.capabilities = {
      QUOTE: true,
      FUND: true,
      HOLD: true,
      TRANSFER: true,
      PAYOUT: true,
      CONFIRM: true,
      REVERSE: true,
      RECONCILE: true,
      REPORT: true,
    };
    this.status = { connected: false };
  }

  async connect(): Promise<void> {
    this.status.connected = true;
  }

  async authenticate(): Promise<void> {
    console.log(`[${this.partnerId}] Authenticating...`);
  }

  async healthCheck(): Promise<PartnerStatus> {
    const now = new Date().toISOString();
    this.status.lastHealthCheck = now;
    this.status.latency = Math.floor(Math.random() * 100) + 20;
    this.status.uptime = 99.9;
    return this.status;
  }

  async quote(request: QuoteRequest): Promise<PartnerQuote> {
    const rate = '0.85';
    const targetAmount = (BigInt(request.sourceAmount) * BigInt(Math.round(Number(rate) * 1000)) / 1000n;
    return {
      partnerId: this.partnerId,
      sourceCurrency: request.sourceCurrency,
      targetCurrency: request.targetCurrency,
      sourceAmount: request.sourceAmount,
      targetAmount: targetAmount.toString(),
      rate,
      spread: '0.5',
      fees: '100',
      expiresAt: new Date(Date.now() + 30000).toISOString(),
    };
  }

  async fund(request: FundRequest): Promise<{ fundId: string; status: string }> {
    return {
      fundId: uuidv4(),
      status: 'PENDING',
    };
  }

  async holdFunds(fundId: string, amount: string): Promise<{ holdId: string }> {
    return { holdId: uuidv4() };
  }

  async releaseFunds(holdId: string): Promise<{ status: string }> {
    return { status: 'RELEASED' };
  }

  async settle(request: TransferRequest): Promise<{ transferId: string; status: string }> {
    return {
      transferId: uuidv4(),
      status: 'PROCESSING',
    };
  }

  async confirmSettlement(transferId: string): Promise<{ settledAt: string; confirmationRef: string }> {
    return {
      settledAt: new Date().toISOString(),
      confirmationRef: `REF-${Date.now()}`,
    };
  }

  async reverse(transferId: string): Promise<{ status: string }> {
    return { status: 'REVERSED' };
  }

  async reconcile(request: { startDate: string; endDate: string }): Promise<{ records: any[]; breaks: any[] }> {
    return { records: [], breaks: [] };
  }

  async report(type: string, params: any): Promise<{ url: string }> {
    return { url: `https://reports.cuboid.io/${type}/${Date.now()}.pdf` };
  }

  async handleWebhook(payload: any): Promise<{ event: string; data: any }> {
    return { event: payload.event ?? 'UNKNOWN', data: payload };
  }
}

export class PartnerAdapterService {
  private adapters: Map<string, PartnerAdapter> = new Map();
  private adapterConfigs: Map<string, { baseUrl: string; apiKey: string }> = new Map();

  registerAdapter(
    partnerId: string,
    partnerType: string,
    config: { baseUrl: string; apiKey: string }
  ): PartnerAdapter {
    const adapter = new MockPartnerAdapter(partnerId, partnerType);
    this.adapters.set(partnerId, adapter);
    this.adapterConfigs.set(partnerId, config);
    return adapter;
  }

  getAdapter(partnerId: string): PartnerAdapter | undefined {
    return this.adapters.get(partnerId);
  }

  getAdaptersByCapability(capability: keyof PartnerCapabilities): PartnerAdapter[] {
    return Array.from(this.adapters.values()).filter(
      a => a.capabilities[capability]
    );
  }

  async findBestQuote(params: {
    sourceCurrency: string;
    targetCurrency: string;
    sourceAmount: string;
    requiredCapabilities?: (keyof PartnerCapabilities)[];
  }): Promise<{
    adapter: PartnerAdapter;
    quote: PartnerQuote;
  } | null> {
    let adapters = this.getAdaptersByCapability('QUOTE');

    if (params.requiredCapabilities) {
      adapters = adapters.filter(a =>
        params.requiredCapabilities!.every(cap => a.capabilities[cap])
      );
    }

    if (adapters.length === 0) return null;

    let bestQuote: PartnerQuote | null = null;
    let bestAdapter: PartnerAdapter | null = null;
    let bestAmount = 0n;

    for (const adapter of adapters) {
      try {
        const quote = await adapter.quote({
          sourceCurrency: params.sourceCurrency,
          targetCurrency: params.targetCurrency,
          sourceAmount: params.sourceAmount,
        });

        const targetAmount = BigInt(quote.targetAmount);
        if (targetAmount > bestAmount) {
          bestAmount = targetAmount;
          bestQuote = quote;
          bestAdapter = adapter;
        }
      } catch {
        continue;
      }
    }

    if (!bestQuote || !bestAdapter) return null;

    return { adapter: bestAdapter, quote: bestQuote };
  }

  async selectPartnerForRoute(params: {
    corridor: string;
    sourceCurrency: string;
    targetCurrency: string;
    requiredCapabilities: (keyof PartnerCapabilities)[];
  }): Promise<PartnerAdapter | null> {
    let adapters = this.adapters.values();

    for (const capability of params.requiredCapabilities) {
      adapters = adapters.filter(a => a.capabilities[capability]);
    }

    const availableAdapters = Array.from(adapters);
    if (availableAdapters.length === 0) return null;

    let bestAdapter = availableAdapters[0];
    let bestLatency = Infinity;

    for (const adapter of availableAdapters) {
      try {
        const status = await adapter.healthCheck();
        if (status.latency && status.latency < bestLatency) {
          bestLatency = status.latency;
          bestAdapter = adapter;
        }
      } catch {
        continue;
      }
    }

    return bestAdapter;
  }
}

export default PartnerAdapterService;