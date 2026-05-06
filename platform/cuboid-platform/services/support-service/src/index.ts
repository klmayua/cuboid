import { v4 as uuidv4 } from 'uuid';

export interface Ticket {
  id: string;
  userId: string;
  type: 'TECHNICAL' | 'BILLING' | 'COMPLIANCE' | 'ESCROW' | 'DISPUTE' | 'OTHER';
  subject: string;
  description: string;
  status: 'OPEN' | 'PENDING' | 'IN_PROGRESS' | 'WAITING_USER' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignee?: string;
  slaDeadline?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

class SupportStore {
  private tickets: Map<string, Ticket> = new Map();

  async create(data: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Ticket> {
    const ticket: Ticket = { ...data, id: uuidv4(), status: 'OPEN', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.tickets.set(ticket.id, ticket); return ticket;
  }

  async get(id: string): Promise<Ticket | null> { return this.tickets.get(id) ?? null; }

  async update(id: string, data: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.tickets.get(id); if (!ticket) throw new Error('Ticket not found');
    const updated = { ...ticket, ...data, updatedAt: new Date().toISOString() };
    this.tickets.set(id, updated); return updated;
  }

  async getByUser(userId: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(t => t.userId === userId);
  }
}

export class SupportService {
  private store: SupportStore;
  constructor() { this.store = new SupportStore(); }

  async createTicket(data: { userId: string; type: Ticket['type']; subject: string; description: string; priority?: Ticket['priority'] }): Promise<Ticket> {
    const priority = data.priority ?? 'MEDIUM';
    const slaDeadline = new Date(Date.now() + (priority === 'URGENT' ? 4 : priority === 'HIGH' ? 8 : priority === 'MEDIUM' ? 24 : 48) * 60 * 60 * 1000).toISOString();
    return this.store.create({ ...data, priority, slaDeadline });
  }

  async assignTicket(ticketId: string, assignee: string): Promise<Ticket> {
    return this.store.update(ticketId, { assignee, status: 'IN_PROGRESS' });
  }

  async reply(ticketId: string, message: string): Promise<Ticket> {
    return this.store.update(ticketId, { status: 'WAITING_USER' });
  }

  async resolve(ticketId: string, resolution: string): Promise<Ticket> {
    return this.store.update(ticketId, { status: 'RESOLVED', resolution });
  }

  async getTicket(ticketId: string): Promise<Ticket | null> { return this.store.get(ticketId); }
  async getUserTickets(userId: string): Promise<Ticket[]> { return this.store.getByUser(userId); }
}

export default SupportService;