import { v4 as uuidv4 } from 'uuid';
import stripe from 'stripe';

export interface Subscription {
  id: string;
  customerId: string;
  priceId: string;
  status: 'active' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'canceled' | 'unpaid' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  metadata?: Record<string, string>;
  plan: SubscriptionPlan;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount: number;
  features: string[];
  metadata?: Record<string, string>;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  subscriptionId?: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  amount: number;
  currency: string;
  dueDate: string;
  paidAt?: string;
  lineItems: InvoiceLineItem[];
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitAmount: number;
  amount: number;
  planId?: string;
}

export interface PaymentMethod {
  id: string;
  customerId: string;
  type: 'card' | 'bank_account' | 'wallet';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  bankAccount?: {
    bankName: string;
    last4: string;
    accountType: string;
  };
  isDefault: boolean;
}

const defaultPlans: SubscriptionPlan[] = [
  {
    id: 'plan_lite',
    name: 'Lite',
    description: 'For small BDCs',
    amount: 2000,
    currency: 'NGN',
    interval: 'month',
    intervalCount: 1,
    features: ['10 BDCs', '100 transactions/mo', 'Email support'],
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    description: 'For growing businesses',
    amount: 5000,
    currency: 'NGN',
    interval: 'month',
    intervalCount: 1,
    features: ['50 BDCs', '500 transactions/mo', 'Priority support', 'Analytics'],
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    amount: 10000,
    currency: 'NGN',
    interval: 'month',
    intervalCount: 1,
    features: ['Unlimited BDCs', 'Unlimited transactions', '24/7 support', 'Custom integrations', 'Dedicated account manager'],
  },
];

class InMemorySubscriptionStore {
  private subscriptions: Map<string, Subscription> = new Map();
  private plans: Map<string, SubscriptionPlan> = new Map();
  private invoices: Map<string, Invoice> = new Map();
  private paymentMethods: Map<string, PaymentMethod[]> = new Map();
  private invoiceNumber = 1000;

  constructor() {
    defaultPlans.forEach(plan => this.plans.set(plan.id, plan));
  }

  async createSubscription(data: Omit<Subscription, 'id' | 'plan' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    const plan = this.plans.get(data.priceId);
    if (!plan) throw new Error('Plan not found');

    const subscription: Subscription = {
      id: uuidv4(),
      ...data,
      plan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.subscriptions.set(subscription.id, subscription);
    return subscription;
  }

  async getSubscription(id: string): Promise<Subscription | null> {
    return this.subscriptions.get(id) ?? null;
  }

  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(s => s.customerId === customerId);
  }

  async updateSubscription(id: string, data: Partial<Subscription>): Promise<Subscription> {
    const sub = this.subscriptions.get(id);
    if (!sub) throw new Error('Subscription not found');
    const updated = { ...sub, ...data, updatedAt: new Date().toISOString() };
    this.subscriptions.set(id, updated);
    return updated;
  }

  async createInvoice(data: Omit<Invoice, 'id' | 'number' | 'createdAt' | 'updatedAt'>): Promise<Invoice> {
    const invoice: Invoice = {
      id: uuidv4(),
      number: `INV-${++this.invoiceNumber}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.invoices.set(invoice.id, invoice);
    return invoice;
  }

  async getInvoice(id: string): Promise<Invoice | null> {
    return this.invoices.get(id) ?? null;
  }

  async getCustomerInvoices(customerId: string): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(i => i.customerId === customerId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoices.get(id);
    if (!invoice) throw new Error('Invoice not found');
    const updated = { ...invoice, ...data, updatedAt: new Date().toISOString() };
    this.invoices.set(id, updated);
    return updated;
  }

  async getPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.plans.values());
  }

  async getPlan(id: string): Promise<SubscriptionPlan | null> {
    return this.plans.get(id) ?? null;
  }

  async createPlan(plan: Omit<SubscriptionPlan, 'id'>): Promise<SubscriptionPlan> {
    const newPlan: SubscriptionPlan = { id: `plan_${uuidv4().slice(0, 8)}`, ...plan };
    this.plans.set(newPlan.id, newPlan);
    return newPlan;
  }

  async addPaymentMethod(method: PaymentMethod): Promise<PaymentMethod> {
    const methods = this.paymentMethods.get(method.customerId) || [];
    methods.push(method);
    this.paymentMethods.set(method.customerId, methods);
    return method;
  }

  async getPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
    return this.paymentMethods.get(customerId) || [];
  }

  async setDefaultPaymentMethod(customerId: string, methodId: string): Promise<void> {
    const methods = this.paymentMethods.get(customerId) || [];
    methods.forEach(m => { m.isDefault = m.id === methodId; });
    this.paymentMethods.set(customerId, methods);
  }
}

export class SubscriptionService {
  private store: InMemorySubscriptionStore;
  private stripeClient?: stripe;

  constructor(stripeKey?: string) {
    this.store = new InMemorySubscriptionStore();
    if (stripeKey) {
      this.stripeClient = new stripe(stripeKey, { apiVersion: '2023-10-16' });
    }
  }

  async createSubscription(customerId: string, priceId: string, metadata?: Record<string, string>): Promise<Subscription> {
    const plan = await this.store.getPlan(priceId);
    if (!plan) throw new Error('Plan not found');

    const currentPeriodStart = new Date();
    const currentPeriodEnd = this.calculatePeriodEnd(plan.interval, plan.intervalCount);

    return this.store.createSubscription({
      customerId,
      priceId,
      status: 'active',
      currentPeriodStart: currentPeriodStart.toISOString(),
      currentPeriodEnd: currentPeriodEnd.toISOString(),
      cancelAtPeriodEnd: false,
      metadata,
    });
  }

  async getSubscription(id: string): Promise<Subscription | null> {
    return this.store.getSubscription(id);
  }

  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    return this.store.getCustomerSubscriptions(customerId);
  }

  async cancelSubscription(id: string, immediate: boolean = false): Promise<Subscription> {
    const sub = await this.store.getSubscription(id);
    if (!sub) throw new Error('Subscription not found');

    if (immediate) {
      return this.store.updateSubscription(id, { status: 'canceled' });
    }
    return this.store.updateSubscription(id, { cancelAtPeriodEnd: true });
  }

  async changePlan(subscriptionId: string, newPriceId: string): Promise<Subscription> {
    const sub = await this.store.getSubscription(subscriptionId);
    if (!sub) throw new Error('Subscription not found');

    const newPlan = await this.store.getPlan(newPriceId);
    if (!newPlan) throw new Error('Plan not found');

    const currentPeriodEnd = this.calculatePeriodEnd(newPlan.interval, newPlan.intervalCount);

    return this.store.updateSubscription(subscriptionId, {
      priceId: newPriceId,
      plan: newPlan,
      currentPeriodEnd: currentPeriodEnd.toISOString(),
    });
  }

  async createInvoice(customerId: string, subscriptionId: string, lineItems: Omit<InvoiceLineItem, 'id'>[]): Promise<Invoice> {
    const sub = await this.store.getSubscription(subscriptionId);
    if (!sub) throw new Error('Subscription not found');

    const invoiceLineItems: InvoiceLineItem[] = lineItems.map(item => ({
      ...item,
      id: uuidv4(),
      amount: item.quantity * item.unitAmount,
    }));

    const totalAmount = invoiceLineItems.reduce((sum, item) => sum + item.amount, 0);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    return this.store.createInvoice({
      customerId,
      subscriptionId,
      status: 'open',
      amount: totalAmount,
      currency: sub.plan.currency,
      dueDate: dueDate.toISOString(),
      lineItems: invoiceLineItems,
    });
  }

  async payInvoice(invoiceId: string): Promise<Invoice> {
    return this.store.updateInvoice(invoiceId, {
      status: 'paid',
      paidAt: new Date().toISOString(),
    });
  }

  async sendInvoice(invoiceId: string): Promise<Invoice> {
    return this.store.updateInvoice(invoiceId, { status: 'open' });
  }

  async getInvoice(invoiceId: string): Promise<Invoice | null> {
    return this.store.getInvoice(invoiceId);
  }

  async getCustomerInvoices(customerId: string): Promise<Invoice[]> {
    return this.store.getCustomerInvoices(customerId);
  }

  async createPlan(plan: Omit<SubscriptionPlan, 'id'>): Promise<SubscriptionPlan> {
    return this.store.createPlan(plan);
  }

  async getPlans(): Promise<SubscriptionPlan[]> {
    return this.store.getPlans();
  }

  async getPlan(planId: string): Promise<SubscriptionPlan | null> {
    return this.store.getPlan(planId);
  }

  private calculatePeriodEnd(interval: SubscriptionPlan['interval'], intervalCount: number): Date {
    const end = new Date();
    switch (interval) {
      case 'day': end.setDate(end.getDate() + intervalCount); break;
      case 'week': end.setDate(end.getDate() + 7 * intervalCount); break;
      case 'month': end.setMonth(end.getMonth() + intervalCount); break;
      case 'year': end.setFullYear(end.getFullYear() + intervalCount); break;
    }
    return end;
  }

  async generatePaymentLink(invoiceId: string, successUrl: string, cancelUrl: string): Promise<string> {
    const invoice = await this.store.getInvoice(invoiceId);
    if (!invoice) throw new Error('Invoice not found');

    if (this.stripeClient) {
      const session = await this.stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: invoice.lineItems.map(item => ({
          price_data: {
            currency: invoice.currency.toLowerCase(),
            product_data: { name: item.description },
            unit_amount: Math.round(item.unitAmount * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: { invoiceId },
      });
      return session.url!;
    }

    return `${successUrl}?invoiceId=${invoiceId}`;
  }
}

export default SubscriptionService;