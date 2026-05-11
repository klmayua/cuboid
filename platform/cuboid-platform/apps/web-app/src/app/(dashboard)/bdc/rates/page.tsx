'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Target, ArrowRight, Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Rate {
  symbol: string;
  cuboidBuy: number;
  cuboidSell: number;
  spread: number;
  confidence: number;
  trend: string;
  changePercent: number;
}

const CORRIDORS = [
  { id: 'usd_ngn', label: 'USD/NGN' },
  { id: 'gbp_ngn', label: 'GBP/NGN' },
  { id: 'eur_ngn', label: 'EUR/NGN' },
  { id: 'aed_ngn', label: 'AED/NGN' },
];

export default function BdcRatesPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadRates(); }, [orgId]);

  async function loadRates() {
    setLoading(true);
    try {
      const res = await fetch('/api/market/published-rates');
      const json = await res.json();
      if (json.success) setRates(json.data ?? []);
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
          <h1 className="text-3xl font-display font-light text-white mb-2">Rate Desk</h1>
          <p className="text-[#7183A6]">Publish buy/sell rates and monitor market spreads.</p>
        </div>
        <Link href="/bdc"><Button variant="secondary" size="sm">Back to Dashboard</Button></Link>
      </div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Market Rates</h2>
          <Link href="/bdc/market" className="text-sm text-brand-light-trust hover:text-white transition-colors">Full Market</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : rates.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]"><p>No market rates available.</p></div>
        ) : (
          <div className="space-y-2">
            {rates.map((rate) => (
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
                  <div className="text-right"><p className="text-xs text-[#7183A6]">Buy</p><p className="text-sm text-white font-medium">{rate.cuboidBuy?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p></div>
                  <div className="text-right"><p className="text-xs text-[#7183A6]">Sell</p><p className="text-sm text-white font-medium">{rate.cuboidSell?.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p></div>
                  <div className="text-right"><p className="text-xs text-[#7183A6]">Spread</p><p className="text-sm text-white font-medium">{rate.spread?.toFixed(2)}</p></div>
                  <div className="flex items-center gap-1 min-w-[80px] justify-end"><TrendIcon trend={rate.trend} /><span className={`text-sm font-medium ${rate.trend === 'UP' ? 'text-semantic-success' : rate.trend === 'DOWN' ? 'text-semantic-danger' : 'text-[#7183A6]'}`}>{rate.changePercent?.toFixed(2)}%</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}