'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { TrendingUp, TrendingDown, RefreshCw, Activity, DollarSign } from 'lucide-react';

export default function TreasuryAnalyticsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadAnalytics(); }, [orgId]);

  async function loadAnalytics() {
    setLoading(true);
    try {
      const res = await fetch(`/api/treasury?organizationId=${orgId}&action=analytics`);
      const json = await res.json();
      if (json.success) setAnalytics(json.data);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Treasury Analytics</h1>
          <p className="text-[#7183A6]">Market performance and treasury metrics.</p>
        </div>
        <button onClick={loadAnalytics} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-brand-light-trust" />
            <span className="text-xs text-[#7183A6]">Total Volume</span>
          </div>
          <p className="text-xl font-display text-white">{analytics?.totalVolume?.toLocaleString() ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Avg Spread</span>
          </div>
          <p className="text-xl font-display text-white">{analytics?.avgSpread?.toFixed(2) ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-semantic-info" />
            <span className="text-xs text-[#7183A6]">Volume Growth</span>
          </div>
          <p className="text-xl font-display text-white">%+{analytics?.volumeGrowth?.toFixed(1) ?? 0}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">Volatility</span>
          </div>
          <p className="text-xl font-display text-white">{analytics?.volatility?.toFixed(2) ?? 0}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Corridor Performance</h2>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map((i) => <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {(analytics?.corridorPerformance ?? []).map((corr: any) => (
                <div key={corr.corridor} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <span className="text-sm text-white font-medium">{corr.corridor}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white">{corr.volume.toLocaleString()}</span>
                    <span className="text-sm text-white">{corr.spread.toFixed(2)}</span>
                    <span className={`text-sm ${corr.trend === 'UP' ? 'text-semantic-success' : 'text-semantic-danger'}`}>{corr.trend === 'UP' ? '+' : '-'}{Math.abs(corr.change).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Source Performance</h2>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {(analytics?.sourcePerformance ?? []).map((src: any) => (
                <div key={src.source} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <span className="text-sm text-white font-medium">{src.source}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#7183A6]">{src.quotes} quotes</span>
                    <span className="text-xs text-[#7183A6]">{src.avgSpread.toFixed(2)}</span>
                    <span className={`text-xs ${src.trust > 70 ? 'text-semantic-success' : src.trust > 40 ? 'text-semantic-warning' : 'text-semantic-danger'}`}>{src.trust}% trust</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}