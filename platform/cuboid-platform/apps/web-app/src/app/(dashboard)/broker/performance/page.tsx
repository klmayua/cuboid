'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Trophy, TrendingUp, Target, Users, Clock, Shield, BarChart3, AlertCircle } from 'lucide-react';

export default function BrokerPerformancePage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [trust, setTrust] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [ranking, setRanking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;
    Promise.all([
      fetch(`/api/trust?organizationId=${orgId}&action=breakdown`).then((r) => r.json()),
      fetch(`/api/analytics?organizationId=${orgId}&action=brokerMetrics`).then((r) => r.json()),
      fetch(`/api/analytics?organizationId=${orgId}&action=brokerRanking`).then((r) => r.json()),
    ]).then(([trustRes, metricsRes, rankRes]) => {
      if (trustRes.success) setTrust(trustRes.data ?? null);
      if (metricsRes.success) setMetrics(metricsRes.data ?? null);
      if (rankRes.success) setRanking(rankRes.data ?? null);
    }).finally(() => setLoading(false));
  }, [orgId]);

  const kpis = [
    { label: 'Trust Score', value: trust?.overall ?? 0, suffix: '/100', icon: Shield, color: 'text-brand-light-trust' },
    { label: 'Velocity', value: trust?.velocity ?? 0, suffix: '/100', icon: TrendingUp, color: 'text-semantic-success' },
    { label: 'Settlement', value: trust?.settlement ?? 0, suffix: '/100', icon: CheckIcon, color: 'text-semantic-info' },
    { label: 'Compliance', value: trust?.compliance ?? 0, suffix: '/100', icon: Shield, color: 'text-semantic-warning' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-light text-white mb-2">Performance Intelligence</h1>
        <p className="text-[#7183A6]">Rank, metrics, and competitive position.</p>
      </div>

      {/* Leaderboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-brand-light-trust" />
            <span className="text-xs text-[#7183A6]">Rank</span>
          </div>
          <p className="text-2xl font-display text-white">{ranking ? `#${ranking.rank}` : '—'}</p>
          <p className="text-xs text-[#7183A6] mt-1">of {ranking?.total ?? '—'} brokers</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Close Rate</span>
          </div>
          <p className="text-2xl font-display text-white">{metrics ? `${(metrics.closeRate * 100).toFixed(1)}%` : '—'}</p>
          <p className="text-xs text-[#7183A6] mt-1">{metrics?.closedDeals ?? 0} / {metrics?.totalDeals ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-semantic-info" />
            <span className="text-xs text-[#7183A6]">Repeat Clients</span>
          </div>
          <p className="text-2xl font-display text-white">{metrics ? `${(metrics.repeatClientRatio * 100).toFixed(1)}%` : '—'}</p>
          <p className="text-xs text-[#7183A6] mt-1">{metrics?.totalClients ?? 0} total clients</p>
        </Card>
      </div>

      {/* Broker Metrics */}
      <Card variant="glass" className="p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">Deal Metrics</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : metrics ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.04]">
              <p className="text-xs text-[#7183A6] mb-1">Avg Ticket</p>
              <p className="text-xl font-display text-white">₦{Math.round(metrics.avgTicket).toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04]">
              <p className="text-xs text-[#7183A6] mb-1">Avg Margin</p>
              <p className="text-xl font-display text-white">{Number(metrics.avgMargin).toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04]">
              <p className="text-xs text-[#7183A6] mb-1">Settlement Speed</p>
              <p className="text-xl font-display text-white">{Number(metrics.avgSettlementSpeed).toFixed(1)}h</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04]">
              <p className="text-xs text-[#7183A6] mb-1">Commission Velocity</p>
              <p className="text-xl font-display text-white">₦{Math.round(metrics.commissionVelocity).toLocaleString()}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-[#7183A6]">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No performance data yet. Complete deals to build metrics.</p>
          </div>
        )}
      </Card>

      {/* Trust Breakdown */}
      <Card variant="glass" className="p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">Trust Breakdown</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : trust ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-2 mb-2">
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  <span className="text-xs text-[#7183A6]">{kpi.label}</span>
                </div>
                <p className="text-2xl font-display text-white">{kpi.value}{kpi.suffix}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[#7183A6]">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No trust data yet. Complete deals to build your score.</p>
          </div>
        )}
      </Card>

      {/* Activity Metrics */}
      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-4">Activity Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.04]">
            <p className="text-xs text-[#7183A6] mb-1">Total Deals</p>
            <p className="text-2xl font-display text-white">{metrics?.totalDeals ?? 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04]">
            <p className="text-xs text-[#7183A6] mb-1">Total Volume</p>
            <p className="text-2xl font-display text-white">₦{Math.round(metrics?.totalVolume ?? 0).toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04]">
            <p className="text-xs text-[#7183A6] mb-1">Converted Leads</p>
            <p className="text-2xl font-display text-white">{metrics?.convertedLeads ?? 0}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04]">
            <p className="text-xs text-[#7183A6] mb-1">Total Commissions</p>
            <p className="text-2xl font-display text-white">₦{Math.round(metrics?.totalCommissions ?? 0).toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
