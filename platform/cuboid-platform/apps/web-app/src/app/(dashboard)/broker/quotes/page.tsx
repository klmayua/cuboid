'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Target, TrendingUp, Clock, AlertCircle, Plus } from 'lucide-react';

export default function BrokerQuotesPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [rates, setRates] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ pairId: '', side: 'BUY' as 'BUY' | 'SELL', amount: '', rate: '', expiresIn: 30 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!orgId) return;
    Promise.all([
      fetch('/api/market/ticker').then((r) => r.json()),
      fetch(`/api/quotes?organizationId=${orgId}`).then((r) => r.json()),
    ]).then(([ratesRes, quotesRes]) => {
      if (ratesRes.success) setRates(ratesRes.data ?? []);
      if (quotesRes.success) setQuotes(quotesRes.data ?? []);
    }).finally(() => setLoading(false));
  }, [orgId]);

  async function createQuote(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId || !user?.id) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: orgId,
          pairId: form.pairId,
          side: form.side,
          amount: Number(form.amount),
          quotedRate: Number(form.rate),
          expiresInMinutes: form.expiresIn,
          createdBy: user.id,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setQuotes((prev) => [json.data, ...prev]);
        setForm({ pairId: '', side: 'BUY', amount: '', rate: '', expiresIn: 30 });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const selectedPair = rates.find((r) => r.pairId === form.pairId);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-light text-white mb-2">Quote Desk</h1>
        <p className="text-[#7183A6]">Build, price, and manage client quotes with live market intelligence.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quote Builder */}
        <Card variant="glass" className="p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-white mb-6">Create Quote</h2>
          <form onSubmit={createQuote} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#7183A6] mb-2">Currency Pair</label>
                <select
                  value={form.pairId}
                  onChange={(e) => setForm((f) => ({ ...f, pairId: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50"
                >
                  <option value="" className="bg-[#0B1020]">Select pair</option>
                  {rates.map((r) => (
                    <option key={r.pairId} value={r.pairId} className="bg-[#0B1020]">
                      {r.symbol.replace('_', '/')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#7183A6] mb-2">Side</label>
                <select
                  value={form.side}
                  onChange={(e) => setForm((f) => ({ ...f, side: e.target.value as 'BUY' | 'SELL' }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50"
                >
                  <option value="BUY" className="bg-[#0B1020]">Buy</option>
                  <option value="SELL" className="bg-[#0B1020]">Sell</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#7183A6] mb-2">Amount</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  required
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7183A6] mb-2">Offered Rate</label>
                <input
                  type="number"
                  step="0.0001"
                  value={form.rate}
                  onChange={(e) => setForm((f) => ({ ...f, rate: e.target.value }))}
                  required
                  placeholder="0.0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#7183A6] mb-2">Expires in (minutes)</label>
              <input
                type="number"
                value={form.expiresIn}
                onChange={(e) => setForm((f) => ({ ...f, expiresIn: Number(e.target.value) }))}
                min={1}
                max={1440}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50"
              />
            </div>
            <Button type="submit" isLoading={submitting} leftIcon={<Plus className="w-4 h-4" />}>
              Publish Quote
            </Button>
          </form>
        </Card>

        {/* Rate Intelligence */}
        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-4">Rate Intelligence</h2>
          {selectedPair ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.04]">
                <p className="text-xs text-[#7183A6] mb-1">Cuboid Midpoint</p>
                <p className="text-2xl font-display text-white">{selectedPair.cuboidMidpoint.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.04]">
                  <p className="text-xs text-[#7183A6] mb-1">Best Bid</p>
                  <p className="text-sm text-white font-medium">{selectedPair.bestBid?.toFixed(2) ?? selectedPair.cuboidBuy.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04]">
                  <p className="text-xs text-[#7183A6] mb-1">Best Offer</p>
                  <p className="text-sm text-white font-medium">{selectedPair.bestOffer?.toFixed(2) ?? selectedPair.cuboidSell.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.04]">
                  <p className="text-xs text-[#7183A6] mb-1">Confidence</p>
                  <p className="text-sm text-white font-medium">{Math.round(selectedPair.confidence)}%</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04]">
                  <p className="text-xs text-[#7183A6] mb-1">Liquidity</p>
                  <p className="text-sm text-white font-medium">{selectedPair.liquidityScore?.toFixed(0) ?? 'N/A'}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04]">
                <p className="text-xs text-[#7183A6] mb-1">Suggested Spread</p>
                <p className="text-sm text-white font-medium">{selectedPair.spread.toFixed(2)}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-[#7183A6]">
              <Target className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Select a pair to see rate intelligence.</p>
            </div>
          )}
        </Card>
      </div>

      {/* My Quotes */}
      <Card variant="glass" className="p-6 mt-6">
        <h2 className="text-lg font-medium text-white mb-4">My Quotes</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-8 text-[#7183A6]">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No quotes yet. Create your first quote above.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {quotes.map((q) => (
              <div key={q.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${q.status === 'LIVE' ? 'bg-semantic-success' : q.status === 'RESERVED' ? 'bg-semantic-warning' : 'bg-[#7183A6]'}`} />
                  <div>
                    <p className="text-sm text-white font-medium">{q.side} {Number(q.amount).toLocaleString()}</p>
                    <p className="text-xs text-[#7183A6]">Rate {Number(q.quotedRate).toFixed(4)} · {q.status}</p>
                  </div>
                </div>
                <p className="text-xs text-[#7183A6]">Expires {new Date(q.expiresAt).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
