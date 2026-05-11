'use client';

import { useEffect, useState } from 'react';
import { Card } from '@cuboid/design-system';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

interface MarketRate {
  symbol: string;
  cuboidBuy: number;
  cuboidSell: number;
  cuboidMidpoint: number;
  spread: number;
  confidence: number;
  trend: string;
  changePercent: number;
  bestBid?: number;
  bestOffer?: number;
  liquidityScore?: number;
  sourceCount?: number;
}

export default function BrokerMarketPage() {
  const [rates, setRates] = useState<MarketRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/market/ticker')
      .then((r) => r.json())
      .then((json) => { if (json.success) setRates(json.data ?? []); })
      .finally(() => setLoading(false));
  }, []);

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'UP') return <TrendingUp className="w-4 h-4 text-semantic-success" />;
    if (trend === 'DOWN') return <TrendingDown className="w-4 h-4 text-semantic-danger" />;
    return <Minus className="w-4 h-4 text-[#7183A6]" />;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-light text-white mb-2">Market Watch</h1>
        <p className="text-[#7183A6]">Live rates, spreads, and liquidity depth.</p>
      </div>

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : rates.length === 0 ? (
          <div className="text-center py-16 text-[#7183A6]">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-white mb-2">No market data</p>
            <p className="text-sm max-w-md mx-auto">Market feeds will appear once BDC desks and institutional partners begin publishing rates.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rates.map((rate) => (
              <div key={rate.symbol} className="grid grid-cols-2 md:grid-cols-8 gap-4 p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors items-center">
                <div className="md:col-span-1">
                  <p className="text-sm font-medium text-white">{rate.symbol.replace('_', '/')}</p>
                  <p className="text-xs text-[#7183A6]">{rate.sourceCount ?? 0} sources</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#7183A6]">Buy</p>
                  <p className="text-sm text-white font-medium">{rate.cuboidBuy.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#7183A6]">Sell</p>
                  <p className="text-sm text-white font-medium">{rate.cuboidSell.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-[#7183A6]">Mid</p>
                  <p className="text-sm text-white font-medium">{rate.cuboidMidpoint.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-[#7183A6]">Spread</p>
                  <p className="text-sm text-white font-medium">{rate.spread.toFixed(2)}</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-[#7183A6]">Confidence</p>
                  <p className="text-sm text-white font-medium">{Math.round(rate.confidence)}%</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-[#7183A6]">Liquidity</p>
                  <p className="text-sm text-white font-medium">{rate.liquidityScore?.toFixed(0) ?? 'N/A'}</p>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <TrendIcon trend={rate.trend} />
                  <span className={`text-sm font-medium ${rate.trend === 'UP' ? 'text-semantic-success' : rate.trend === 'DOWN' ? 'text-semantic-danger' : 'text-[#7183A6]'}`}>
                    {rate.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
