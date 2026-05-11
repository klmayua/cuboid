'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Database, RefreshCw, Activity, ArrowRight, Globe, DollarSign } from 'lucide-react';

const CORRIDORS = ['USD_NGN', 'GBP_NGN', 'EUR_NGN', 'AED_NGN'];
const CITIES = ['LAGOS', 'ABUJA', 'KANO', 'PORT_HARCOURT', 'IBADAN'];

export default function TreasuryLiquidityPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [liquidity, setLiquidity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadLiquidity(); }, [orgId]);

  async function loadLiquidity() {
    setLoading(true);
    try {
      const res = await fetch(`/api/market?organizationId=${orgId}&action=liquidity`);
      const json = await res.json();
      if (json.success) setLiquidity(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const byCorridor: Record<string, any> = {};
  for (const item of liquidity) {
    if (!byCorridor[item.corridor]) byCorridor[item.corridor] = { total: 0, byCity: {} };
    byCorridor[item.corridor].total += Number(item.volume);
    byCorridor[item.corridor].byCity[item.city] = (byCorridor[item.corridor].byCity[item.city] || 0) + Number(item.volume);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Liquidity Distribution</h1>
          <p className="text-[#7183A6]">Corridor depth and city-level liquidity allocation.</p>
        </div>
        <button onClick={loadLiquidity} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-brand-light-trust" />
            <span className="text-xs text-[#7183A6]">Total Depth</span>
          </div>
          <p className="text-xl font-display text-white">{Object.values(byCorridor).reduce((s: any, c: any) => s + c.total, 0).toLocaleString('en-NG', { minimumFractionDigits: 0 })}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-semantic-info" />
            <span className="text-xs text-[#7183A6]">Active Cities</span>
          </div>
          <p className="text-xl font-display text-white">{CITIES.length}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">USD Liquidity</span>
          </div>
          <p className="text-xl font-display text-white">{byCorridor['USD_NGN']?.total?.toLocaleString('en-NG', { minimumFractionDigits: 0 }) ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">GBP Liquidity</span>
          </div>
          <p className="text-xl font-display text-white">{byCorridor['GBP_NGN']?.total?.toLocaleString('en-NG', { minimumFractionDigits: 0 }) ?? 0}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Corridor Depth</h2>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map((i) => <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {CORRIDORS.map((corr) => {
                const total = byCorridor[corr]?.total ?? 0;
                const max = Math.max(...Object.values(byCorridor).map((c: any) => c.total), 1);
                return (
                  <div key={corr} className="p-3 rounded-xl bg-white/[0.04]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white font-medium">{corr.replace('_','/')}</span>
                      <span className="text-sm text-white">{total.toLocaleString('en-NG', { minimumFractionDigits: 0 })}</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-light-trust rounded-full transition-all" style={{ width: `${(total / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">City Distribution</h2>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map((i) => <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-2">
              {CITIES.map((city) => {
                const cityTotal = liquidity.filter((l) => l.city === city).reduce((s, l) => s + Number(l.volume), 0);
                return (
                  <div key={city} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                    <span className="text-sm text-white">{city}</span>
                    <span className="text-sm text-white">{cityTotal.toLocaleString('en-NG', { minimumFractionDigits: 0 })}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}