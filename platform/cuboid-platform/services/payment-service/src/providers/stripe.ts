import Stripe from 'stripe';
import crypto from 'crypto';

export interface PaymentProvider {
  name: string;
  createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>): Promise<PaymentIntent>;
  createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession>;
  createPaymentLink(params: PaymentLinkParams): Promise<PaymentLink>;
  createCustomer(email: string, name?: string, metadata?: Record<string, string>): Promise<Customer>;
  verifyWebhookSignature(payload: string, signature: string, secret: string): boolean;
  createRefund(paymentIntentId: string, amount?: number): Promise<Refund>;
  getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null>;
}

export interface PaymentIntent {
  id: string;
  provider: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  clientSecret?: string;
  metadata?: Record<string, string>;
  createdAt: string;
}

export interface CheckoutParams {
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  lineItems: LineItem[];
  metadata?: Record<string, string>;
  expiresAt?: number;
}

export interface LineItem {
  name: string;
  description?: string;
  amount: number;
  currency: string;
  quantity: number;
  images?: string[];
}

export interface CheckoutSession {
  id: string;
  url: string;
  status: 'open' | 'complete' | 'expired';
  metadata?: Record<string, string>;
}

export interface PaymentLinkParams {
  lineItems: LineItem[];
  metadata?: Record<string, string>;
  active?: boolean;
  paymentIntentData?: {
    captureMethod?: 'automatic' | 'manual';
  };
}

export interface PaymentLink {
  id: string;
  url: string;
  active: boolean;
  metadata?: Record<string, string>;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface Refund {
  id: string;
  paymentIntentId: string;
  amount: number;
  status: 'succeeded' | 'pending' | 'failed' | 'canceled';
}

export class StripeProvider implements PaymentProvider {
  name = 'stripe';
  private client: Stripe;

  constructor(apiKey: string) {
    this.client = new Stripe(apiKey, { apiVersion: '2023-10-16' });
  }

  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>): Promise<PaymentIntent> {
    const intent = await this.client.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    return {
      id: intent.id,
      provider: this.name,
      amount: intent.amount / 100,
      currency: intent.currency,
      status: intent.status as any,
      clientSecret: intent.client_secret ?? undefined,
      metadata: intent.metadata ?? undefined,
      createdAt: new Date(intent.created * 1000).toISOString(),
    };
  }

  async createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession> {
    const session = await this.client.checkout.sessions.create({
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      customer_email: params.customerEmail,
      line_items: params.lineItems.map(item => ({
        price_data: {
          currency: item.currency.toLowerCase(),
          product_data: {
            name: item.name,
            images: item.images,
          },
          unit_amount: Math.round(item.amount * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      metadata: params.metadata,
      expires_at: params.expiresAt,
    });

    return {
      id: session.id,
      url: session.url!,
      status: session.status as any,
      metadata: session.metadata ?? undefined,
    };
  }

  async createPaymentLink(params: PaymentLinkParams): Promise<PaymentLink> {
    const lineItems = await Promise.all(
      params.lineItems.map(async (item) => {
        const price = await this.client.prices.create({
          currency: item.currency.toLowerCase(),
          unit_amount: Math.round(item.amount * 100),
          product_data: {
            name: item.name,
          },
        });
        return { price: price.id, quantity: item.quantity };
      })
    );

    const link = await this.client.paymentLinks.create({
      line_items: lineItems,
      metadata: params.metadata,
      payment_intent_data: params.paymentIntentData as any,
    });

    return {
      id: link.id,
      url: link.url,
      active: link.active,
      metadata: link.metadata ?? undefined,
    };
  }

  async createCustomer(email: string, name?: string, metadata?: Record<string, string>): Promise<Customer> {
    const customer = await this.client.customers.create({
      email,
      name,
      metadata,
    });

    return {
      id: customer.id ?? '',
      email: customer.email ?? '',
      name: customer.name ?? undefined,
      metadata: customer.metadata ?? undefined,
    };
  }

  verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    try {
      this.client.webhooks.constructEvent(payload, signature, secret);
      return true;
    } catch {
      return false;
    }
  }

  async createRefund(paymentIntentId: string, amount?: number): Promise<Refund> {
    const refund = await this.client.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });

    return {
      id: refund.id,
      paymentIntentId: typeof refund.payment_intent === 'string' ? refund.payment_intent : refund.payment_intent!.id,
      amount: refund.amount / 100,
      status: refund.status as any,
    };
  }

  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null> {
    try {
      const intent = await this.client.paymentIntents.retrieve(paymentIntentId);
      return {
        id: intent.id,
        provider: this.name,
        amount: intent.amount / 100,
        currency: intent.currency,
        status: intent.status as any,
        clientSecret: intent.client_secret ?? undefined,
        metadata: intent.metadata ?? undefined,
        createdAt: new Date(intent.created * 1000).toISOString(),
      };
    } catch {
      return null;
    }
  }
}

export class PaymentService {
  private providers: Map<string, PaymentProvider> = new Map();
  private transactions: Map<string, PaymentTransaction> = new Map();

  registerProvider(name: string, provider: PaymentProvider) {
    this.providers.set(name, provider);
  }

  getProvider(name: string): PaymentProvider | undefined {
    return this.providers.get(name);
  }

  getDefaultProvider(): PaymentProvider | undefined {
    return this.providers.get('stripe');
  }

  async createPayment(
    provider: string,
    amount: number,
    currency: string,
    metadata?: Record<string, string>
  ): Promise<PaymentIntent> {
    const p = this.providers.get(provider);
    if (!p) throw new Error(`Provider ${provider} not registered`);

    const intent = await p.createPaymentIntent(amount, currency, metadata);
    
    const tx: PaymentTransaction = {
      id: crypto.randomUUID(),
      provider,
      providerPaymentId: intent.id,
      amount,
      currency,
      status: 'pending',
      metadata,
      createdAt: new Date().toISOString(),
    };
    this.transactions.set(tx.id, tx);
    
    return intent;
  }

  async createCheckout(provider: string, params: CheckoutParams): Promise<CheckoutSession> {
    const p = this.providers.get(provider);
    if (!p) throw new Error(`Provider ${provider} not registered`);
    return p.createCheckoutSession(params);
  }

  async createPaymentLink(provider: string, params: PaymentLinkParams): Promise<PaymentLink> {
    const p = this.providers.get(provider);
    if (!p) throw new Error(`Provider ${provider} not registered`);
    return p.createPaymentLink(params);
  }

  async createCustomer(provider: string, email: string, name?: string): Promise<Customer> {
    const p = this.providers.get(provider);
    if (!p) throw new Error(`Provider ${provider} not registered`);
    return p.createCustomer(email, name);
  }

  async refundPayment(provider: string, paymentIntentId: string, amount?: number): Promise<Refund> {
    const p = this.providers.get(provider);
    if (!p) throw new Error(`Provider ${provider} not registered`);
    return p.createRefund(paymentIntentId, amount);
  }

  async handleWebhook(provider: string, payload: string, signature: string, secret: string): Promise<WebhookEvent> {
    const p = this.providers.get(provider);
    if (!p) throw new Error(`Provider ${provider} not registered`);

    if (!p.verifyWebhookSignature(payload, signature, secret)) {
      throw new Error('Invalid webhook signature');
    }

    const event = JSON.parse(payload);
    return {
      type: event.type,
      data: event.data.object,
    };
  }

  getPaymentTransaction(id: string): PaymentTransaction | undefined {
    return this.transactions.get(id);
  }
}

export interface PaymentTransaction {
  id: string;
  provider: string;
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  metadata?: Record<string, string>;
  createdAt: string;
}

export interface WebhookEvent {
  type: string;
  data: any;
}

export default PaymentService;