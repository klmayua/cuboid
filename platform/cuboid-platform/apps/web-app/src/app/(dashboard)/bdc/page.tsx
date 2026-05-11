'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Building,
  Shield,
  Wallet,
  Clock,
  AlertTriangle,
  ArrowRight,
  Users,
  BarChart3,
  DollarSign,
  Activity,
  Edit
} from 'lucide-react';

interface DeskStats {
  id: string;
  name: string;
  city: string;
  status: string;
  activeDeals: number;
  dailyVolume: number;
}

interface DailyStats {
  totalDeals: number;
  totalVolume: number;
  pendingSettlements: number;
  activeDesks: number;
}

export default function BdcDashboardPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [deskStats, setDeskStats] = useState<DeskStats[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    async function load() {
      try {
        const [deskRes, statsRes] = await Promise.all([
          fetch(`/api/bdc?organizationId=${orgId}&action=deskStats`).then((r) => r.json()),
          fetch(`/api/bdc?organizationId=${orgId}&action=dailyStats`).then((r) => r.json()),
        ]);

        if (deskRes.success) setDeskStats(deskRes.data ?? []);
        if (statsRes.success) setDailyStats(statsRes.data);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [orgId]);

  const activeDeskCount = deskStats.filter((d) => d.status === 'OPEN').length;
  const totalVolume = dailyStats?.totalVolume ?? 0;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">BDC Operating System</h1>
          <p className="text-[#7183A6]">Desk operations, liquidity, and market control.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/bdc/profile">
            <Button variant="secondary" size="sm" leftIcon={<Edit className="w-4 h-4" />}>Manage Desks</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Active Desks</span>
            <Building className="w-4 h-4 text-brand-light-trust" />
          </div>
          <p className="text-xl font-display text-white">{activeDeskCount}</p>
          <p className="text-xs text-[#7183A6] mt-2">{deskStats.length} total desks</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Today's Volume</span>
            <DollarSign className="w-4 h-4 text-semantic-success" />
          </div>
          <p className="text-xl font-display text-white">{totalVolume.toLocaleString('en-NG', { minimumFractionDigits: 0 })}</p>
          <p className="text-xs text-[#7183A6] mt-2">NGN</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Active Deals</span>
            <Activity className="w-4 h-4 text-semantic-info" />
          </div>
          <p className="text-xl font-display text-white">{dailyStats?.totalDeals ?? 0}</p>
          <p className="text-xs text-[#7183A6] mt-2">in progress</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Pending Settlements</span>
            <Clock className="w-4 h-4 text-semantic-warning" />
          </div>
          <p className="text-xl font-display text-white">{dailyStats?.pendingSettlements ?? 0}</p>
          <p className="text-xs text-[#7183A6] mt-2">awaiting</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Desk Performance</h2>
            <Link href="/bdc/performance" className="text-sm text-brand-light-trust hover:text-white transition-colors">View All</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : deskStats.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <Building className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No desk data yet</p>
              <p className="text-xs mt-1">Configure desks in profile to start tracking.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {deskStats.slice(0, 5).map((desk) => (
                <div key={desk.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${desk.status === 'OPEN' ? 'bg-semantic-success' : 'bg-[#7183A6]'}`} />
                    <div>
                      <p className="text-sm text-white font-medium">{desk.name}</p>
                      <p className="text-xs text-[#7183A6]">{desk.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-[#7183A6]">Deals</p>
                      <p className="text-sm text-white">{desk.activeDeals}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#7183A6]">Volume</p>
                      <p className="text-sm text-white">{desk.dailyVolume.toLocaleString('en-NG', { minimumFractionDigits: 0 })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/bdc/rates" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Publish Rate</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/bdc/deals" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Deal Desk</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/bdc/inventory" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Inventory</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/bdc/settlements" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Settlements</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/bdc/clients" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Clients</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}