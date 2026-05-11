'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Briefcase,
  Shield,
  Wallet,
  Clock,
  AlertTriangle,
  ArrowRight,
  Users,
  BarChart3,
  Zap,
  Target,
  Store
} from 'lucide-react';

interface MarketRate {
  symbol: string;
  cuboidBuy: number;
  cuboidSell: number;
  cuboidMidpoint: number;
  spread: number;
  confidence: number;
  trend: string;
  changePercent: number;
}

interface BrokerDashboardData {
  profile: { specialty?: string; commissionRate?: number; active?: boolean } | null;
  active: boolean;
  leads: { total: number; claimable: number };
  deals: { total: number; active: number };
  commissions: { total: number; count: number };
  clients: { total: number };
}

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  readAt: string | null;
  createdAt: string;
}

interface LeadItem {
  id: string;
  customerName: string;
  corridor: string;
  amount: number;
  currency: string;
  status: string;
  urgency: string;
  trustFlag: boolean;
}

interface DealItem {
  id: string;
  status: string;
  amount: number;
  currency: string;
  corridor: string;
  createdAt: string;
}

export default function BrokerDashboardPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';

  const [rates, setRates] = useState<MarketRate[]>([]);
  const [brokerData, setBrokerData] = useState<BrokerDashboardData | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [deals, setDeals] = useState<DealItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    async function load() {
      try {
        const [ratesRes, brokerRes, notifRes, trustRes, leadsRes, dealsRes] = await Promise.all([
          fetch('/api/market/ticker').then((r) => r.json()),
          fetch(`/api/broker?organizationId=${orgId}`).then((r) => r.json()),
          user?.id ? fetch(`/api/notifications?userId=${user.id}&organizationId=${orgId}`).then((r) => r.json()) : Promise.resolve({ success: true, data: [] }),
          fetch(`/api/trust?organizationId=${orgId}`).then((r) => r.json()),
          fetch(`/api/broker?organizationId=${orgId}&action=claimableLeads`).then((r) => r.json()),
          fetch(`/api/broker?organizationId=${orgId}&action=deals`).then((r) => r.json()),
        ]);

        if (ratesRes.success) setRates(ratesRes.data ?? []);
        if (brokerRes.success) setBrokerData(brokerRes.data ?? null);
        if (notifRes.success) setNotifications((notifRes.data ?? []).slice(0, 5));
        if (trustRes.success) setTrustScore(Number(trustRes.data?.score ?? 0));
        if (leadsRes.success) setLeads(leadsRes.data ?? []);
        if (dealsRes.success) setDeals((dealsRes.data ?? []).slice(0, 5));
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [orgId, user?.id]);

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'UP') return <TrendingUp className="w-4 h-4 text-semantic-success" />;
    if (trend === 'DOWN') return <TrendingDown className="w-4 h-4 text-semantic-danger" />;
    return <Minus className="w-4 h-4 text-[#7183A6]" />;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Broker OS</h1>
          <p className="text-[#7183A6]">Commercial deal desk. Live market intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/broker/deals">
            <Button size="sm" leftIcon={<Zap className="w-4 h-4" />}>New Deal</Button>
          </Link>
          <Link href="/broker/quotes">
            <Button variant="secondary" size="sm" leftIcon={<Target className="w-4 h-4" />}>Create Quote</Button>
          </Link>
        </div>
      </div>

      {/* Hero KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-brand-light-trust" />
            <span className="text-xs text-[#7183A6]">Active Deals</span>
          </div>
          <p className="text-xl font-display text-white">{brokerData?.deals?.active ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Commission</span>
          </div>
          <p className="text-xl font-display text-white">₦{Math.round(brokerData?.commissions?.total ?? 0).toLocaleString()}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">Claimable Leads</span>
          </div>
          <p className="text-xl font-display text-white">{brokerData?.leads?.claimable ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-brand-light-trust" />
            <span className="text-xs text-[#7183A6]">Trust Score</span>
          </div>
          <p className="text-xl font-display text-white">{trustScore ?? 0}<span className="text-sm text-[#7183A6]">/100</span></p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Clients</span>
          </div>
          <p className="text-xl font-display text-white">{brokerData?.clients?.total ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-semantic-info" />
            <span className="text-xs text-[#7183A6]">Liquidity</span>
          </div>
          <p className="text-xl font-display text-white">{brokerData?.active ? 'Active' : 'Inactive'}</p>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Watch */}
        <Card variant="glass" className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Market Watch</h2>
            <Link href="/broker/market" className="text-sm text-brand-light-trust hover:text-white transition-colors">
              Full Market
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />
              ))}
            </div>
          ) : rates.length === 0 ? (
            <div className="text-center py-8 text-[#7183A6]">
              <p>No live rates available.</p>
              <p className="text-sm mt-1">Market feeds will appear once sources begin publishing.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rates.map((rate) => (
                <div key={rate.symbol} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-brand-light-trust">{rate.symbol.replace('_', '/')}</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{rate.symbol.replace('_', '/')}</p>
                      <p className="text-xs text-[#7183A6]">Confidence {Math.round(rate.confidence)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-[#7183A6]">Buy</p>
                      <p className="text-sm text-white font-medium">{rate.cuboidBuy.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#7183A6]">Sell</p>
                      <p className="text-sm text-white font-medium">{rate.cuboidSell.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#7183A6]">Spread</p>
                      <p className="text-sm text-white font-medium">{rate.spread.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1 min-w-[80px] justify-end">
                      <TrendIcon trend={rate.trend} />
                      <span className={`text-sm font-medium ${rate.trend === 'UP' ? 'text-semantic-success' : rate.trend === 'DOWN' ? 'text-semantic-danger' : 'text-[#7183A6]'}`}>
                        {rate.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Right Rail */}
        <div className="space-y-6">
          {/* Lead Queue */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Lead Queue</h2>
              <Link href="/broker/leads" className="text-sm text-brand-light-trust hover:text-white transition-colors">
                View all
              </Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                ))}
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-6 text-[#7183A6]">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No active leads</p>
                <p className="text-xs mt-1">New leads appear here when clients request broker assistance.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                    <div>
                      <p className="text-sm text-white font-medium">{lead.customerName}</p>
                      <p className="text-xs text-[#7183A6]">{lead.corridor} · {Number(lead.amount).toLocaleString()} {lead.currency}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg ${lead.trustFlag ? 'bg-semantic-success/10 text-semantic-success' : 'bg-[#7183A6]/10 text-[#7183A6]'}`}>
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Alerts */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Alerts</h2>
              <Link href="/broker/notifications" className="text-sm text-brand-light-trust hover:text-white transition-colors">
                View all
              </Link>
            </div>
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-[#7183A6]">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04]">
                    <div className={`w-2 h-2 mt-1.5 rounded-full ${n.readAt ? 'bg-[#7183A6]' : 'bg-semantic-warning'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{n.title}</p>
                      <p className="text-xs text-[#7183A6] truncate">{n.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Live Deals */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Live Deals</h2>
            <Link href="/broker/deals" className="text-sm text-brand-light-trust hover:text-white transition-colors flex items-center gap-1">
              Deal Desk <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />
              ))}
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-8 text-[#7183A6]">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No active deals</p>
              <p className="text-xs mt-1 max-w-md mx-auto">Deals appear here as you claim leads and create quotes. Start by visiting the Lead Queue or Deal Desk.</p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <Link href="/broker/leads">
                  <Button size="sm" variant="secondary">Browse Leads</Button>
                </Link>
                <Link href="/broker/deals">
                  <Button size="sm">Open Deal Desk</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {deals.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${d.status === 'CLOSED' ? 'bg-semantic-success' : d.status === 'FAILED' ? 'bg-semantic-danger' : 'bg-semantic-warning'}`} />
                    <div>
                      <p className="text-sm text-white font-medium">{d.corridor}</p>
                      <p className="text-xs text-[#7183A6]">{Number(d.amount).toLocaleString()} {d.currency} · {d.status}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#7183A6]">{new Date(d.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Commission Wallet */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Commission</h2>
            <Link href="/broker/commissions" className="text-sm text-brand-light-trust hover:text-white transition-colors">
              Details
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-white/[0.04]">
              <p className="text-xs text-[#7183A6] mb-1">Rate</p>
              <p className="text-2xl font-display text-white">{(brokerData?.profile?.commissionRate ?? 0).toFixed(2)}%</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04]">
              <p className="text-xs text-[#7183A6] mb-1">Accrued</p>
              <p className="text-2xl font-display text-white">₦{Math.round(brokerData?.commissions?.total ?? 0).toLocaleString()}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#7183A6] mb-1">Specialty</p>
                <p className="text-sm text-white">{brokerData?.profile?.specialty ?? 'General FX'}</p>
              </div>
              <Link href="/broker/profile">
                <Button variant="ghost" size="sm">Edit Profile</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
