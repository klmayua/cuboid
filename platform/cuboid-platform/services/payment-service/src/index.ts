export * from './providers/stripe';
export * from './providers/paystack';
export * from './providers/flutterwave';
export * from './billing';

import { PaymentService, StripeProvider } from './providers/stripe';
import { PaystackPaymentService, PaystackProviderImpl } from './providers/paystack';
import { FlutterwavePaymentService, FlutterwaveProviderImpl } from './providers/flutterwave';
import { SubscriptionService } from './billing';

const paymentService = new PaymentService();
let paystackService: PaystackPaymentService | null = null;
let flutterwaveService: FlutterwavePaymentService | null = null;

export interface PaymentConfig {
  stripeKey?: string;
  paystackKey?: string;
  flutterwaveKey?: string;
}

export function initPaymentService(config: PaymentConfig) {
  if (config.stripeKey) {
    paymentService.registerProvider('stripe', new StripeProvider(config.stripeKey));
  }
  if (config.paystackKey) {
    paystackService = new PaystackPaymentService(config.paystackKey);
    paymentService.registerProvider('paystack', new PaystackProviderImpl(config.paystackKey) as any);
  }
  if (config.flutterwaveKey) {
    flutterwaveService = new FlutterwavePaymentService(config.flutterwaveKey);
    paymentService.registerProvider('flutterwave', new FlutterwaveProviderImpl(config.flutterwaveKey) as any);
  }
  return { paymentService, paystackService, flutterwaveService };
}

export function createSubscriptionService(stripeKey?: string) {
  return new SubscriptionService(stripeKey);
}

export type PaymentProviderType = 'stripe' | 'paystack' | 'flutterwave';

export interface CreatePaymentParams {
  provider: PaymentProviderType;
  amount: number;
  currency: string;
  email?: string;
  customer?: { name?: string; email: string; phone?: string };
  reference?: string;
  metadata?: Record<string, string>;
  callbackUrl?: string;
}

export interface PaymentResult {
  success: boolean;
  provider: PaymentProviderType;
  reference?: string;
  checkoutUrl?: string;
  virtualAccount?: { accountNumber: string; bankName: string; bankCode: string };
  error?: string;
}

export class UnifiedPaymentService {
  private stripeService: PaymentService | null = null;
  private paystackService: PaystackPaymentService | null = null;
  private flutterwaveService: FlutterwavePaymentService | null = null;

  constructor(config: PaymentConfig) {
    if (config.stripeKey) {
      this.stripeService = new PaymentService();
      this.stripeService.registerProvider('stripe', new StripeProvider(config.stripeKey));
    }
    if (config.paystackKey) {
      this.paystackService = new PaystackPaymentService(config.paystackKey);
    }
    if (config.flutterwaveKey) {
      this.flutterwaveService = new FlutterwavePaymentService(config.flutterwaveKey);
    }
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    try {
      switch (params.provider) {
        case 'stripe': {
          if (!this.stripeService) throw new Error('Stripe not configured');
          const session = await this.stripeService.createCheckout('stripe', {
            successUrl: params.callbackUrl || 'https://cuboid.africa/success',
            cancelUrl: params.callbackUrl || 'https://cuboid.africa/cancel',
            customerEmail: params.email,
            lineItems: [{
              name: 'Cuboid Payment',
              amount: params.amount,
              currency: params.currency,
              quantity: 1,
            }],
            metadata: params.metadata,
          });
          return { success: true, provider: 'stripe', reference: session.id, checkoutUrl: session.url };
        }
        case 'paystack': {
          if (!this.paystackService) throw new Error('Paystack not configured');
          const result = await this.paystackService.initializePayment(
            params.amount,
            params.email || params.customer?.email || '',
            params.currency,
            params.metadata
          );
          return { success: true, provider: 'paystack', reference: result.reference, checkoutUrl: result.authorizationUrl };
        }
        case 'flutterwave': {
          if (!this.flutterwaveService) throw new Error('Flutterwave not configured');
          const result = await this.flutterwaveService.initializePayment(
            params.amount,
            params.currency,
            { email: params.email || params.customer?.email || '', name: params.customer?.name, phone: params.customer?.phone },
            params.metadata
          );
          return { success: true, provider: 'flutterwave', reference: result.txRef, checkoutUrl: result.link };
        }
        default:
          throw new Error('Unknown provider');
      }
    } catch (error: any) {
      return { success: false, provider: params.provider, error: error.message };
    }
  }

  async createVirtualAccount(provider: 'paystack' | 'flutterwave', businessName: string, customerEmail: string): Promise<PaymentResult> {
    try {
      if (provider === 'paystack') {
        if (!this.paystackService) throw new Error('Paystack not configured');
        const result = await this.paystackService.createVirtualAccount(businessName, customerEmail);
        return { success: true, provider: 'paystack', virtualAccount: { accountNumber: result.accountNumber, bankName: result.bankName, bankCode: result.bankCode } };
      }
      if (provider === 'flutterwave') {
        if (!this.flutterwaveService) throw new Error('Flutterwave not configured');
        const result = await this.flutterwaveService.createVirtualAccount(businessName, customerEmail);
        return { success: true, provider: 'flutterwave', virtualAccount: { accountNumber: result.accountNumber, bankName: result.bankName, bankCode: result.bankCode } };
      }
      throw new Error('Provider not supported for virtual accounts');
    } catch (error: any) {
      return { success: false, provider, error: error.message };
    }
  }

  async verifyPayment(provider: PaymentProviderType, reference: string): Promise<{ success: boolean; amount?: number; status?: string }> {
    try {
      switch (provider) {
        case 'paystack': {
          if (!this.paystackService) throw new Error('Paystack not configured');
          const result = await this.paystackService.verifyPayment(reference);
          return { success: result.status === 'success', amount: result.amount, status: result.status };
        }
        case 'flutterwave': {
          if (!this.flutterwaveService) throw new Error('Flutterwave not configured');
          const result = await this.flutterwaveService.verifyPayment(reference);
          return { success: result.status === 'success', amount: result.amount, status: result.status };
        }
        default:
          throw new Error('Verification not supported for this provider');
      }
    } catch (error: any) {
      return { success: false, status: error.message };
    }
  }

  async createPayout(provider: PaymentProviderType, accountName: string, accountNumber: string, bankCode: string, amount: number, currency?: string): Promise<PaymentResult> {
    try {
      switch (provider) {
        case 'paystack': {
          if (!this.paystackService) throw new Error('Paystack not configured');
          const result = await this.paystackService.createPayout(accountName, accountNumber, bankCode, amount, currency);
          return { success: result.status === 'success', provider: 'paystack', reference: result.reference };
        }
        case 'flutterwave': {
          if (!this.flutterwaveService) throw new Error('Flutterwave not configured');
          const result = await this.flutterwaveService.createPayout(accountName, accountNumber, bankCode, amount, currency);
          return { success: result.status === 'SUCCESS', provider: 'flutterwave', reference: result.reference };
        }
        default:
          throw new Error('Payout not supported for this provider');
      }
    } catch (error: any) {
      return { success: false, provider, error: error.message };
    }
  }
}

export { PaymentService, PaystackPaymentService, FlutterwavePaymentService, SubscriptionService };