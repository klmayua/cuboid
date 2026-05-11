'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { 
  TrendingUp, TrendingDown, DollarSign, Activity, 
  Briefcase, ArrowRight, RefreshCw, Building,
  Clock, Shield, AlertTriangle, CheckCircle
} from 'lucide-react';

const CORRIDORS = [
  { id: 'USD_NGN', label: 'USD/NGN' },
  { id: 'GBP_NGN', label: 'GBP/NGN' },
  { id: 'EUR_NGN', label: 'EUR/NGN' },
  { id: 'AED_NGN', label: 'AED/NGN' },
];

export default function TreasuryPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [rates, setRates] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => { if (!orgId) return; loadMarketData(); }, [orgId]);

  async function loadMarketData() {
    setLoading(true);
    try {
      const [ratesRes, metricsRes] = await Promise.all([
        fetch('/api/market/published-rates'),
        fetch('/api/market/metrics'),
      ]);
      const [ratesJson, metricsJson] = await Promise.all([ratesRes.json(), metricsRes.json()]);
      if (ratesJson.success) setRates(ratesJson.data ?? []);
      if (metricsJson.success) setMetrics(metricsJson.data ?? {});
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function handlePublishRates() {
    if (!user?.id || !orgId) return;
    setPublishing(true);
    try {
      const res = await fetch('/api/market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'aggregateAndPublish', organizationId: orgId, actorId: user.id }),
      });
      if (res.ok) loadMarketData();
    } finally { setPublishing(false); }
  }

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'UP') return <TrendingUp className="w-4 h-4 text-semantic-success" />;
    if (trend === 'DOWN') return <TrendingDown className="w-4 h-4 text-semantic-danger" />;
    return <Activity className="w-4 h-4 text-[#7183A6]" />;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Treasury Command</h1>
          <p className="text-[#7183A6]">Market intelligence, rate governance, and liquidity control.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadMarketData} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
          <Button size="sm" onClick={handlePublishRates} isLoading={publishing} leftIcon={<CheckCircle className="w-4 h-4" />}>Publish Rates</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Active Corridors</span>
            <Briefcase className="w-4 h-4 text-brand-light-trust" />
          </div>
          <p className="text-xl font-display text-white">{metrics?.activePairs ?? rates.length}</p>
          <p className="text-xs text-[#7183A6] mt-2">of {CORRIDORS.length} configured</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Avg Confidence</span>
            <Shield className="w-4 h-4 text-semantic-success" />
          </div>
          <p className="text-xl font-display text-white">{metrics?.avgConfidence ? Math.round(metrics.avgConfidence) : 0}%</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-semantic-success rounded-full" style={{ width: `${metrics?.avgConfidence ?? 0}%` }} />
          </div>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Total Liquidity</span>
            <DollarSign className="w-4 h-4 text-semantic-warning" />
          </div>
          <p className="text-xl font-display text-white">{metrics?.avgLiquidity ? Math.round(metrics.avgLiquidity) : 0}</p>
          <p className="text-xs text-[#7183A6] mt-2">{metrics?.totalSources ?? 0} sources</p>
        </Card>

        <Card variant="glass" size="compact">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#7183A6]">Sources Health</span>
            <Activity className="w-4 h-4 text-semantic-info" />
          </div>
          <p className="text-xl font-display text-white">{rates.filter((r: any) => r.confidence > 70).length}</p>
          <p className="text-xs text-semantic-success mt-2">healthy</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Canonical Rates</h2>
            <Link href="/treasury/markets" className="text-sm text-brand-light-trust hover:text-white transition-colors">Full View</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}
            </div>
          ) : rates.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <Activity className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No market data</p>
              <p className="text-xs mt-1">Publish rates to initialize market feed.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {rates.map((rate: any) => (
                <div key={rate.symbol} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-brand-light-trust">{rate.symbol?.slice(0,3)}</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{rate.symbol?.replace('_','/')}</p>
                      <p className="text-xs text-[#7183A6]">Confidence {Math.round(rate.confidence)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-[#7183A6]">Buy</p>
                      <p className="text-sm text-white font-medium">{rate.cuboidBuy?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#7183A6]">Sell</p>
                      <p className="text-sm text-white font-medium">{rate.cuboidSell?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="flex items-center gap-1 min-w-[60px] justify-end">
                      <TrendIcon trend={rate.trend} />
                      <span className={`text-xs font-medium ${rate.trend === 'UP' ? 'text-semantic-success' : rate.trend === 'DOWN' ? 'text-semantic-danger' : 'text-[#7183A6]'}`}>
                        {rate.changePercent?.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link href="/treasury/markets" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Market Intelligence</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/treasury/liquidity" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Liquidity Distribution</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/treasury/corridors" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Corridor Controls</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/treasury/exposure" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Exposure Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/treasury/directives" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Treasury Directives</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
            <Link href="/treasury/settlement" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
              <span className="text-sm text-white">Settlement Queue</span>
              <ArrowRight className="w-4 h-4 text-[#7183A6]" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}