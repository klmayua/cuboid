'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { TrendingUp, TrendingDown, RefreshCw, Activity, Globe, ArrowRight, AlertTriangle } from 'lucide-react';

const CORRIDORS = [
  { id: 'usd_ngn', symbol: 'USD/NGN' },
  { id: 'gbp_ngn', symbol: 'GBP/NGN' },
  { id: 'eur_ngn', symbol: 'EUR/NGN' },
  { id: 'aed_ngn', symbol: 'AED/NGN' },
];

const CITIES = ['LAGOS', 'ABUJA', 'KANO', 'PORT_HARCOURT', 'IBADAN'];

export default function TreasuryMarketsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [rates, setRates] = useState<any[]>([]);
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadData(); }, [orgId]);

  async function loadData() {
    setLoading(true);
    try {
      const [tickerRes, historyRes] = await Promise.all([
        fetch('/api/market/published-rates'),
        fetch('/api/market/history'),
      ]);
      const [tickerJson, historyJson] = await Promise.all([tickerRes.json(), historyRes.json()]);
      if (tickerJson.success) setRates(tickerJson.data ?? []);
      if (historyJson.success) setSnapshots(historyJson.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
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
          <h1 className="text-3xl font-display font-light text-white mb-2">Market Intelligence</h1>
          <p className="text-[#7183A6]">Weighted rates, source health, and corridor analytics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadData} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CORRIDORS.map((corr) => {
          const rate = rates.find((r) => r.symbol === corr.symbol);
          return (
            <Card key={corr.id} variant="glass" size="compact">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white font-medium">{corr.symbol}</span>
                {rate && <TrendIcon trend={rate.trend} />}
              </div>
              {rate ? (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-[#7183A6]">Canonical Buy</p>
                      <p className="text-lg font-display text-white">{rate.cuboidBuy?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7183A6]">Canonical Sell</p>
                      <p className="text-lg font-display text-white">{rate.cuboidSell?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-[#7183A6]">Spread</span>
                    <span className="text-xs text-white">{rate.spread?.toFixed(2)}</span>
                  </div>
                </>
              ) : <p className="text-sm text-[#7183A6]">No data</p>}
            </Card>
          );
        })}
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Market Depth</h2>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}
          </div>
        ) : rates.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]">
            <Globe className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No market data available.</p>
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
                    <p className="text-sm text-white font-medium">{rate.symbol}</p>
                    <p className="text-xs text-[#7183A6]">{rate.sourceCount} sources · {Math.round(rate.confidence)}% confidence</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs text-[#7183A6]">Buy</p>
                    <p className="text-sm text-white">{rate.cuboidBuy?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#7183A6]">Mid</p>
                    <p className="text-sm text-white">{rate.cuboidMidpoint?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#7183A6]">Sell</p>
                    <p className="text-sm text-white">{rate.cuboidSell?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#7183A6]">Spread</p>
                    <p className="text-sm text-white">{rate.spread?.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 min-w-[80px] justify-end">
                    <TrendIcon trend={rate.trend} />
                    <span className={`text-sm font-medium ${rate.trend === 'UP' ? 'text-semantic-success' : rate.trend === 'DOWN' ? 'text-semantic-danger' : 'text-[#7183A6]'}`}>
                      {rate.changePercent?.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}