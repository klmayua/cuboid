import { v4 as uuidv4 } from 'uuid';

export interface AnalyticsEvent {
  id: string;
  eventType: string;
  entityType?: string;
  entityId?: string;
  userId?: string;
  properties: Record<string, unknown>;
  timestamp: string;
}

export interface Dashboard {
  id: string;
  name: string;
  type: 'RETAIL' | 'BUSINESS' | 'ENTERPRISE' | 'PARTNER';
  widgets: { id: string; type: string; config: Record<string, unknown> }[];
}

class AnalyticsStore {
  private events: Map<string, AnalyticsEvent> = new Map();
  private dashboards: Map<string, Dashboard> = new Map();

  async track(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<AnalyticsEvent> {
    const e: AnalyticsEvent = { ...event, id: uuidv4(), timestamp: new Date().toISOString() };
    this.events.set(e.id, e); return e;
  }

  async query(params: { eventType?: string; from?: string; to?: string; groupBy?: string }): Promise<Record<string, unknown>[]> {
    let events = Array.from(this.events.values());
    if (params.eventType) events = events.filter(e => e.eventType === params.eventType);
    return [{ count: events.length, events }];
  }
}

export class AnalyticsService {
  private store: AnalyticsStore;

  constructor() {
    this.store = new AnalyticsStore();
    this.initDashboards();
  }

  private async initDashboards() {
    const dashboards: Dashboard[] = [
      { id: '1', name: 'Executive', type: 'ENTERPRISE', widgets: [{ id: 'w1', type: 'metric', config: { metric: 'volume' } }] },
      { id: '2', name: 'Partner', type: 'PARTNER', widgets: [{ id: 'w1', type: 'metric', config: { metric: 'settlements' } }] },
    ];
    dashboards.forEach(d => (this.store as any).dashboards.set(d.id, d));
  }

  async trackEvent(data: { eventType: string; entityType?: string; entityId?: string; userId?: string; properties?: Record<string, unknown> }): Promise<void> {
    await this.store.track(data as any);
  }

  async getDashboard(dashboardId: string): Promise<Dashboard | null> { return (this.store as any).dashboards.get(dashboardId) ?? null; }

  async queryAnalytics(params: { eventType?: string; from?: string; to?: string }): Promise<Record<string, unknown>[]> {
    return this.store.query(params);
  }

  async getVolumeMetrics(period: '1d' | '7d' | '30d' | '90d'): Promise<{ volume: number; transactions: number; avgTicket: number }> {
    return { volume: 2400000, transactions: 1247, avgTicket: 1925 };
  }

  async getCorridorAnalytics(): Promise<{ corridor: string; volume: string; tps: number }[]> {
    return [
      { corridor: 'USA-NGA', volume: '850000', tps: 45 },
      { corridor: 'UK-KEN', volume: '420000', tps: 22 },
      { corridor: 'USA-GHA', volume: '280000', tps: 15 },
    ];
  }
}

export default AnalyticsService;