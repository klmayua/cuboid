'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Briefcase, ArrowRight, Search, Plus, Play, CheckCircle, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';

const STATES = [
  { key: 'REQUESTED', label: 'Requested', color: 'bg-[#7183A6]/10 text-[#7183A6]' },
  { key: 'QUOTED', label: 'Quoted', color: 'bg-brand-light-trust/10 text-brand-light-trust' },
  { key: 'ACCEPTED', label: 'Accepted', color: 'bg-semantic-info/10 text-semantic-info' },
  { key: 'ESCROWED', label: 'Escrow', color: 'bg-semantic-warning/10 text-semantic-warning' },
  { key: 'PROCESSING', label: 'Processing', color: 'bg-semantic-pending/10 text-semantic-pending' },
  { key: 'CLEARED', label: 'Cleared', color: 'bg-semantic-success/10 text-semantic-success' },
  { key: 'CLOSED', label: 'Closed', color: 'bg-semantic-success/20 text-semantic-success' },
  { key: 'FAILED', label: 'Failed', color: 'bg-semantic-danger/10 text-semantic-danger' },
];

interface Deal {
  id: string;
  corridor: string;
  amount: number;
  currency: string;
  status: string;
  customerName: string;
  createdAt: string;
}

export default function BdcDealsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { if (!orgId) return; loadDeals(); }, [orgId]);

  async function loadDeals() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bdc?organizationId=${orgId}&action=deals`);
      const json = await res.json();
      if (json.success) setDeals(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const filtered = deals.filter((d) => JSON.stringify(d).toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Deal Desk</h1>
          <p className="text-[#7183A6]">Walk-in, broker-routed, and institutional deals.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7183A6]" />
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search deals..." className="pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50 w-64" />
          </div>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'New Deal'}</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {STATES.map((s) => <div key={s.key} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${s.color}`}>{s.label}</div>)}
      </div>

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[#7183A6]">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-white mb-2">No deals yet</p>
            <p className="text-sm max-w-md mx-auto mb-6">Your deal desk will populate as walk-in clients transact.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${d.status === 'CLOSED' ? 'bg-semantic-success' : d.status === 'FAILED' ? 'bg-semantic-danger' : 'bg-semantic-warning'}`} />
                  <div>
                    <p className="text-sm text-white font-medium">{d.corridor}</p>
                    <p className="text-xs text-[#7183A6]">{Number(d.amount).toLocaleString()} {d.currency} · {d.status}</p>
                  </div>
                </div>
                <span className="text-xs text-[#7183A6]">{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}