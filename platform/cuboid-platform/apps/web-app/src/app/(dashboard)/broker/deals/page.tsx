'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Briefcase, ArrowRight, Filter, Plus, Search, Play, RotateCcw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const PIPELINE_STATES = [
  { key: 'LEAD', label: 'Lead', color: 'bg-[#7183A6]/10 text-[#7183A6]' },
  { key: 'QUOTED', label: 'Quoted', color: 'bg-brand-light-trust/10 text-brand-light-trust' },
  { key: 'MATCHED', label: 'Matched', color: 'bg-semantic-info/10 text-semantic-info' },
  { key: 'ESCROWED', label: 'Escrow', color: 'bg-semantic-warning/10 text-semantic-warning' },
  { key: 'PROCESSING', label: 'Processing', color: 'bg-semantic-pending/10 text-semantic-pending' },
  { key: 'CLEARED', label: 'Cleared', color: 'bg-semantic-success/10 text-semantic-success' },
  { key: 'PAID', label: 'Paid', color: 'bg-semantic-success/20 text-semantic-success' },
  { key: 'CLOSED', label: 'Closed', color: 'bg-semantic-success/30 text-semantic-success' },
  { key: 'FAILED', label: 'Failed', color: 'bg-semantic-danger/10 text-semantic-danger' },
];

export default function BrokerDealsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    leadId: '',
    amount: '',
    currency: 'NGN',
    corridor: '',
    brokerRate: '',
  });

  useEffect(() => {
    if (!orgId) return;
    loadDeals();
  }, [orgId]);

  async function loadDeals() {
    setLoading(true);
    try {
      const res = await fetch(`/api/broker?organizationId=${orgId}&action=deals`);
      const json = await res.json();
      if (json.success) setDeals(json.data ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId || !user?.id) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createDeal',
          organizationId: orgId,
          leadId: form.leadId || undefined,
          amount: Number(form.amount),
          currency: form.currency,
          corridor: form.corridor,
          brokerRate: form.brokerRate ? Number(form.brokerRate) : undefined,
          actorId: user.id,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setForm({ leadId: '', amount: '', currency: 'NGN', corridor: '', brokerRate: '' });
        loadDeals();
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAdvance(dealId: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'advanceDeal', dealId, actorId: user.id, organizationId: orgId }),
      });
      if (res.ok) loadDeals();
    } catch {
      // silent
    }
  }

  async function handleRollback(dealId: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'rollbackDeal', dealId, actorId: user.id, organizationId: orgId }),
      });
      if (res.ok) loadDeals();
    } catch {
      // silent
    }
  }

  async function handleClose(dealId: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'closeDeal', dealId, actorId: user.id, organizationId: orgId }),
      });
      if (res.ok) loadDeals();
    } catch {
      // silent
    }
  }

  async function handleDispute(dealId: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disputeDeal', dealId, actorId: user.id, organizationId: orgId }),
      });
      if (res.ok) loadDeals();
    } catch {
      // silent
    }
  }

  const filtered = deals.filter((d) =>
    JSON.stringify(d).toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Deal Desk</h1>
          <p className="text-[#7183A6]">Pipeline, progress, and close control.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7183A6]" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search deals..."
              className="pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50 w-64"
            />
          </div>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm((s) => !s)}>
            {showForm ? 'Cancel' : 'New Deal'}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card variant="glass" className="p-6 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">Create Deal</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Lead ID (optional)" value={form.leadId} onChange={(e) => setForm((f) => ({ ...f, leadId: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input required type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input required placeholder="Currency" value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input required placeholder="Corridor" value={form.corridor} onChange={(e) => setForm((f) => ({ ...f, corridor: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input type="number" step="0.0001" placeholder="Broker rate %" value={form.brokerRate} onChange={(e) => setForm((f) => ({ ...f, brokerRate: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <div>
              <Button type="submit" size="sm" isLoading={submitting} leftIcon={<Plus className="w-4 h-4" />}>Create</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Pipeline Header */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {PIPELINE_STATES.map((s) => (
          <div key={s.key} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${s.color}`}>
            {s.label}
          </div>
        ))}
      </div>

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[#7183A6]">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-white mb-2">No deals yet</p>
            <p className="text-sm max-w-md mx-auto mb-6">Your deal pipeline will populate as you claim leads and create deals.</p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/broker/leads">
                <Button variant="secondary" size="sm">Browse Leads</Button>
              </Link>
              <Button size="sm" onClick={() => setShowForm(true)}>Create Deal</Button>
            </div>
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
                <div className="flex items-center gap-2">
                  {d.status !== 'CLOSED' && d.status !== 'FAILED' && (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => handleAdvance(d.id)} leftIcon={<Play className="w-4 h-4" />}>Advance</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRollback(d.id)} leftIcon={<RotateCcw className="w-4 h-4" />}>Rollback</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleClose(d.id)} leftIcon={<CheckCircle className="w-4 h-4" />}>Close</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDispute(d.id)} leftIcon={<XCircle className="w-4 h-4" />}>Fail</Button>
                    </>
                  )}
                  <span className="text-xs text-[#7183A6]">{new Date(d.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
