'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, Clock } from 'lucide-react';

interface Stats {
  totalVolume: number;
  dealsClosed: number;
  activeDesks: number;
  totalDesks: number;
  trustScore: number;
}

interface DeskStat {
  id: string;
  name: string;
  city: string;
  volume: number;
  deals: number;
}

export default function BdcPerformancePage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [stats, setStats] = useState<Stats | null>(null);
  const [deskStats, setDeskStats] = useState<DeskStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadStats(); }, [orgId]);

  async function loadStats() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bdc?organizationId=${orgId}&action=analytics`);
      const json = await res.json();
      if (json.success) {
        setStats(json.summary ?? null);
        setDeskStats(json.byDesk ?? []);
      }
    } catch { /* silent */ } finally { setLoading(false); }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Performance</h1>
          <p className="text-[#7183A6]">Desk profitability and operational metrics.</p>
        </div>
        <Link href="/bdc/settlements" className="text-sm text-brand-light-trust hover:text-white transition-colors">Settlements</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Total Volume (₦)</span>
            <DollarSign className="w-4 h-4 text-brand-light-trust" />
          </div>
          <p className="text-xl font-display text-white">{stats?.totalVolume ? Number(stats.totalVolume).toLocaleString('en-NG', { minimumFractionDigits: 2 }) : '—'}</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Deals Closed</span>
            <Activity className="w-4 h-4 text-semantic-success" />
          </div>
          <p className="text-xl font-display text-white">{stats?.dealsClosed ?? '—'}</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Active Desks</span>
            <Users className="w-4 h-4 text-brand-light-trust" />
          </div>
          <p className="text-xl font-display text-white">{stats?.activeDesks ?? '—'}</p>
          <p className="text-xs text-[#7183A6]">{stats?.totalDesks ?? 0} total desks</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Trust Score</span>
            <Activity className="w-4 h-4 text-semantic-info" />
          </div>
          <p className="text-xl font-display text-white">{stats?.trustScore ?? '—'}</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-semantic-success rounded-full" style={{ width: `${stats?.trustScore ?? 0}%` }} />
          </div>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Desk Performance</h2>
        {loading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : deskStats.length === 0 ? (
          <div className="text-center py-8 text-[#7183A6]"><p>No desk data yet.</p></div>
        ) : (
          <div className="space-y-3">
            {deskStats.map((desk) => (
              <div key={desk.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                <div><p className="text-sm text-white font-medium">{desk.name}</p><p className="text-xs text-[#7183A6]">{desk.city}</p></div>
                <div className="text-right"><p className="text-sm text-white font-medium">{Number(desk.volume).toLocaleString('en-NG', { minimumFractionDigits: 0 })}</p><p className="text-xs text-[#7183A6]">{desk.deals} deals</p></div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}