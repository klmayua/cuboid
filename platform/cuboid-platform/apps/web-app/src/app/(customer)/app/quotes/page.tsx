'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { FileText, Plus, Search, RefreshCw, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Quote {
  id: string;
  pair: string;
  side: string;
  amount: number;
  currency: string;
  rate: number;
  status: string;
  expiresAt: string;
  createdAt: string;
}

export default function CustomerQuotesPage() {
  const user = useAuthStore((state) => state.user);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => { if (user?.orgId) loadQuotes(); }, [user?.orgId]);

  async function loadQuotes() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/quotes?organizationId=' + user.orgId);
      const json = await res.json();
      if (json.success) setQuotes(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function acceptQuote(quoteId: string) {
    try {
      await fetch('/api/quotes/' + quoteId + '/accept', { method: 'POST' });
      loadQuotes();
    } catch { /* silent */ }
  }

  async function cancelQuote(quoteId: string) {
    try {
      await fetch('/api/quotes/' + quoteId + '/cancel', { method: 'POST' });
      loadQuotes();
    } catch { /* silent */ }
  }

  const filtered = quotes.filter((q) => 
    q.pair.toLowerCase().includes(filter.toLowerCase()) || q.status.includes(filter.toUpperCase())
  );

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Quotes</h1>
            <p className="text-[#7183A6]">Your FX quotes and pricing.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7183A6]" />
              <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] w-56" />
            </div>
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>Get Quote</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Pending</span></div>
            <p className="text-xl font-display text-white">{quotes.filter((q) => q.status === 'PENDING').length}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-semantic-success" /><span className="text-xs text-[#7183A6]">Accepted</span></div>
            <p className="text-xl font-display text-white">{quotes.filter((q) => q.status === 'ACCEPTED').length}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><FileText className="w-4 h-4 text-brand-light-trust" /><span className="text-xs text-[#7183A6]">Executing</span></div>
            <p className="text-xl font-display text-white">{quotes.filter((q) => q.status === 'EXECUTING').length}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><XCircle className="w-4 h-4 text-semantic-danger" /><span className="text-xs text-[#7183A6]">Expired</span></div>
            <p className="text-xl font-display text-white">{quotes.filter((q) => q.status === 'EXPIRED').length}</p>
          </Card>
        </div>

        <Card variant="glass" className="p-6">
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No quotes yet</p>
              <p className="text-xs mt-1">Get a quote to see pricing.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${quote.side === 'BUY' ? 'bg-semantic-success/10' : 'bg-semantic-danger/10'}`}>
                      <span className="text-sm font-medium text-white">{quote.pair?.slice(0,3)}</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{quote.pair} · {quote.side}</p>
                      <p className="text-xs text-[#7183A6]">{quote.amount?.toLocaleString()} {quote.currency} @ {quote.rate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-lg ${quote.status === 'ACCEPTED' ? 'bg-semantic-success/10 text-semantic-success' : quote.status === 'PENDING' ? 'bg-semantic-warning/10 text-semantic-warning' : quote.status === 'EXPIRED' ? 'bg-semantic-danger/10 text-semantic-danger' : 'bg-white/10 text-[#7183A6]'}`}>{quote.status}</span>
                    {quote.status === 'PENDING' && (
                      <>
                        <Button size="sm" onClick={() => acceptQuote(quote.id)}>Accept</Button>
                        <Button size="sm" variant="ghost" onClick={() => cancelQuote(quote.id)}>Cancel</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </CustomerAppLayout>
  );
}