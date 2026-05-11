'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Globe, DollarSign } from 'lucide-react';

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

export default function BdcMarketPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [rates, setRates] = useState<MarketRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => { if (!orgId) return; loadMarketRates(); }, [orgId]);

  async function loadMarketRates() {
    setLoading(true);
    try {
      const res = await fetch('/api/market/published-rates');
      const json = await res.json();
      if (json.success) { setRates(json.data ?? []); setLastUpdate(new Date().toLocaleTimeString()); }
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'UP') return <TrendingUp className="w-4 h-4 text-semantic-success" />;
    if (trend === 'DOWN') return <TrendingDown className="w-4 h-4 text-semantic-danger" />;
    return <Minus className="w-4 h-4 text-[#7183A6]" />;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Market</h1>
          <p className="text-[#7183A6]">Live market rates and competitor comparison.</p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdate && <span className="text-xs text-[#7183A6] flex items-center gap-1"><RefreshCw className="w-3 h-3" />Updated {lastUpdate}</span>}
          <button onClick={loadMarketRates} className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
        </div>
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Market Depth</h2>
        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : rates.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]"><Globe className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No market data available.</p></div>
        ) : (
          <div className="space-y-2">
            {rates.map((rate) => (
              <div key={rate.symbol} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center"><DollarSign className="w-5 h-5 text-brand-light-trust" /></div>
                  <div><p className="text-sm text-white font-medium">{rate.symbol}</p><p className="text-xs text-[#7183A6]">Confidence {Math.round(rate.confidence)}%</p></div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right"><p className="text-xs text-[#7183A6]">Our Buy</p><p className="text-sm text-white">{rate.cuboidBuy?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ?? '—'}</p></div>
                  <div className="text-right"><p className="text-xs text-[#7183A6]">Our Sell</p><p className="text-sm text-white">{rate.cuboidSell?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ?? '—'}</p></div>
                  <div className="flex items-center gap-2 min-w-[100px] justify-end"><TrendIcon trend={rate.trend} /><span className={`text-sm font-medium ${rate.trend === 'UP' ? 'text-semantic-success' : rate.trend === 'DOWN' ? 'text-semantic-danger' : 'text-[#7183A6]'}`}>{rate.changePercent?.toFixed(2)}%</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}