'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Bell, Plus, Save, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

const CORRIDORS = ['USD_NGN', 'GBP_NGN', 'EUR_NGN', 'AED_NGN'];
const DIRECTIVE_TYPES = ['TIGHTEN_SPREAD', 'WIDEN_SPREAD', 'LIQUIDITY_INCENTIVE', 'SOURCE_PENALTY', 'SOURCE_BOOST', 'CORRIDOR_PAUSE'];

export default function TreasuryDirectivesPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [directives, setDirectives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ corridor: 'USD_NGN', type: 'TIGHTEN_SPREAD', severity: 'MEDIUM', instruction: '' });

  useEffect(() => { if (!orgId) return; loadDirectives(); }, [orgId]);

  async function loadDirectives() {
    setLoading(true);
    try {
      const res = await fetch(`/api/treasury?organizationId=${orgId}&action=directives`);
      const json = await res.json();
      if (json.success) setDirectives(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/treasury', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'createDirective', organizationId: orgId, ...form, actorId: user.id }),
      });
      if (res.ok) { setShowForm(false); setForm({ corridor: 'USD_NGN', type: 'TIGHTEN_SPREAD', severity: 'MEDIUM', instruction: '' }); loadDirectives(); }
    } finally { setSubmitting(false); }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Treasury Directives</h1>
          <p className="text-[#7183A6]">Market interventions and governance instructions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadDirectives} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'New Directive'}</Button>
        </div>
      </div>

      {showForm && (
        <Card variant="glass" className="p-6 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">Create Directive</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select value={form.corridor} onChange={(e) => setForm((f) => ({ ...f, corridor: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white">
              {CORRIDORS.map((c) => <option key={c} value={c} className="bg-[#0B1020]">{c}</option>)}
            </select>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white">
              {DIRECTIVE_TYPES.map((t) => <option key={t} value={t} className="bg-[#0B1020]">{t.replace('_', ' ')}</option>)}
            </select>
            <select value={form.severity} onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white">
              <option value="LOW" className="bg-[#0B1020]">Low</option>
              <option value="MEDIUM" className="bg-[#0B1020]">Medium</option>
              <option value="HIGH" className="bg-[#0B1020]">High</option>
              <option value="CRITICAL" className="bg-[#0B1020]">Critical</option>
            </select>
            <Button type="submit" size="sm" isLoading={submitting} leftIcon={<Save className="w-4 h-4" />}>Issue</Button>
          </form>
        </Card>
      )}

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Active Directives</h2>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}
          </div>
        ) : directives.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]">
            <Bell className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No active directives</p>
          </div>
        ) : (
          <div className="space-y-2">
            {directives.map((d: any) => (
              <div key={d.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${d.severity === 'CRITICAL' ? 'bg-semantic-danger' : d.severity === 'HIGH' ? 'bg-semantic-warning' : 'bg-brand-light-trust'}`} />
                  <div>
                    <p className="text-sm text-white font-medium">{d.type.replace('_', ' ')} — {d.corridor}</p>
                    <p className="text-xs text-[#7183A6]">{d.instruction}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-lg ${d.severity === 'CRITICAL' ? 'bg-semantic-danger/10 text-semantic-danger' : d.severity === 'HIGH' ? 'bg-semantic-warning/10 text-semantic-warning' : 'bg-brand-light-trust/10 text-brand-light-trust'}`}>{d.severity}</span>
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