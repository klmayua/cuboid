import { v4 as uuidv4 } from 'uuid';

export interface Invoice {
  id: string;
  organizationId: string;
  number: string;
  items: { description: string; quantity: number; unitPrice: string; total: string }[];
  subtotal: string;
  tax: string;
  total: string;
  currency: string;
  status: 'DRAFT' | 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface PricingRule {
  id: string;
  name: string;
  type: 'VOLUME' | 'TIER' | 'CORRIDOR' | 'PARTNER';
  conditions: Record<string, unknown>;
  fee: string;
  minAmount?: string;
  maxAmount?: string;
}

class BillingStore {
  private invoices: Map<string, Invoice> = new Map();
  private pricingRules: Map<string, PricingRule> = new Map();

  async createInvoice(data: Omit<Invoice, 'id' | 'number' | 'createdAt'>): Promise<Invoice> {
    const invoice: Invoice = { ...data, id: uuidv4(), number: `INV-${Date.now()}`, createdAt: new Date().toISOString() };
    this.invoices.set(invoice.id, invoice); return invoice;
  }

  async get(id: string): Promise<Invoice | null> { return this.invoices.get(id) ?? null; }
  async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.invoices.get(id); if (!invoice) throw new Error('Invoice not found');
    const updated = { ...invoice, ...data }; this.invoices.set(id, updated); return updated;
  }
  async getByOrg(organizationId: string): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(i => i.organizationId === organizationId);
  }
}

export class BillingService {
  private store: BillingStore;
  constructor() { this.store = new BillingStore(); this.initPricing(); }

  private async initPricing() {
    const rules: PricingRule[] = [
      { id: '1', name: 'Standard', type: 'TIER', conditions: { tier: 'standard' }, fee: '25' },
      { id: '2', name: 'Enterprise', type: 'TIER', conditions: { tier: 'enterprise' }, fee: '15' },
    ];
    rules.forEach(r => (this.store as any).pricingRules.set(r.id, r));
  }

  async createInvoice(data: { organizationId: string; items: Invoice['items']; dueDate: string }): Promise<Invoice> {
    const subtotal = data.items.reduce((sum, i) => sum + BigInt(i.total), 0n).toString();
    const tax = (BigInt(subtotal) * 10n / 100n).toString();
    return this.store.createInvoice({ ...data, subtotal, tax, total: (BigInt(subtotal) + BigInt(tax)).toString(), currency: 'USD', status: 'PENDING' });
  }

  async markPaid(invoiceId: string): Promise<Invoice> {
    return this.store.update(invoiceId, { status: 'PAID', paidAt: new Date().toISOString() });
  }

  async getInvoice(invoiceId: string): Promise<Invoice | null> { return this.store.get(invoiceId); }
  async getOrgInvoices(organizationId: string): Promise<Invoice[]> { return this.store.getByOrg(organizationId); }

  async calculateFee(amount: string, corridor?: string): Promise<{ fee: string; total: string }> {
    const fee = '25';
    return { fee, total: (BigInt(amount) + BigInt(fee)).toString() };
  }
}

export default BillingService;