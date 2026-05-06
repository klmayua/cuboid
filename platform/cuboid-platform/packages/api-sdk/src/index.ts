import { z } from 'zod';

const APIResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }).optional(),
});

export class CuboidAPI {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: { baseUrl: string; apiKey: string }) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    const json = await response.json();
    const parsed = APIResponseSchema.parse(json);
    
    if (!parsed.success) {
      throw new Error(parsed.error?.message ?? 'API request failed');
    }
    
    return parsed.data as T;
  }

  async getQuote(params: {
    sourceCurrency: string;
    targetCurrency: string;
    sourceAmount: string;
  }) {
    return this.request('/v1/quotes', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async createTransaction(params: {
    quoteId: string;
    sourceWalletId: string;
    destinationCorridor: string;
    destinationAccount: {
      bankName: string;
      accountNumber: string;
      routingNumber?: string;
    };
  }) {
    return this.request('/v1/transactions', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getTransaction(id: string) {
    return this.request(`/v1/transactions/${id}`);
  }

  async getWallets(params?: { currency?: string; status?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/v1/wallets?${query}`);
  }

  async getCounterparties(params?: { type?: string; country?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/v1/counterparties?${query}`);
  }

  async createEscrow(params: {
    walletId: string;
    amount: string;
    currency: string;
    releaseConditions: Array<{
      type: 'MILESTONE' | 'DATE' | 'MANUAL' | 'AUTO';
      description: string;
    }>;
  }) {
    return this.request('/v1/escrow', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async releaseEscrow(id: string, params?: { conditionId?: string }) {
    return this.request(`/v1/escrow/${id}/release`, {
      method: 'POST',
      body: JSON.stringify(params ?? {}),
    });
  }
}

export default CuboidAPI;