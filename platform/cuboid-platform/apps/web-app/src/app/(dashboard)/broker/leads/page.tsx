'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Users, Zap, ArrowRight, AlertCircle, Plus, X, CheckCircle, Trash2, Flame } from 'lucide-react';

const SOURCES = ['public_quote', 'whatsapp', 'referral', 'enterprise', 'bdc_overflow'];
const TYPES = ['INDIVIDUAL', 'SME', 'ENTERPRISE', 'INSTITUTION'];
const URGENCY = ['low', 'normal', 'high', 'critical'];

export default function BrokerLeadsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [leads, setLeads] = useState<any[]>([]);
  const [claimable, setClaimable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    source: SOURCES[0],
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerType: TYPES[0],
    corridor: '',
    amount: '',
    currency: 'NGN',
    urgency: 'normal',
    trustFlag: false,
    expiresIn: 60,
    notes: '',
  });

  useEffect(() => {
    if (!orgId) return;
    loadLeads();
  }, [orgId]);

  async function loadLeads() {
    setLoading(true);
    try {
      const [myRes, claimableRes] = await Promise.all([
        fetch(`/api/broker?organizationId=${orgId}&action=leads`).then((r) => r.json()),
        fetch(`/api/broker?organizationId=${orgId}&action=claimableLeads`).then((r) => r.json()),
      ]);
      if (myRes.success) setLeads(myRes.data ?? []);
      if (claimableRes.success) setClaimable(claimableRes.data ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function handleClaim(leadId: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'claimLead', leadId, brokerId: user.id, organizationId: orgId }),
      });
      if (res.ok) loadLeads();
    } catch {
      // silent
    }
  }

  async function handleRelease(leadId: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'releaseLead', leadId, brokerId: user.id, organizationId: orgId }),
      });
      if (res.ok) loadLeads();
    } catch {
      // silent
    }
  }

  async function handleArchive(leadId: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'archiveLead', leadId, brokerId: user.id, organizationId: orgId }),
      });
      if (res.ok) loadLeads();
    } catch {
      // silent
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
          action: 'createLead',
          organizationId: orgId,
          source: form.source,
          customerName: form.customerName,
          customerEmail: form.customerEmail || undefined,
          customerPhone: form.customerPhone || undefined,
          customerType: form.customerType,
          corridor: form.corridor,
          amount: Number(form.amount),
          currency: form.currency,
          urgency: form.urgency,
          trustFlag: form.trustFlag,
          expiresInMinutes: Number(form.expiresIn),
          notes: form.notes || undefined,
          actorId: user.id,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setForm({ source: SOURCES[0], customerName: '', customerEmail: '', customerPhone: '', customerType: TYPES[0], corridor: '', amount: '', currency: 'NGN', urgency: 'normal', trustFlag: false, expiresIn: 60, notes: '' });
        loadLeads();
      }
    } finally {
      setSubmitting(false);
    }
  }

  const myClaimed = leads.filter((l) => l.status === 'CLAIMED' || l.status === 'NEGOTIATING');
  const myConverted = leads.filter((l) => l.status === 'CONVERTED');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Lead Queue</h1>
          <p className="text-[#7183A6]">Intake, claim, and convert opportunities.</p>
        </div>
        <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : 'Add Lead'}
        </Button>
      </div>

      {showForm && (
        <Card variant="glass" className="p-6 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">New Lead</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input required placeholder="Customer name" value={form.customerName} onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input placeholder="Email" value={form.customerEmail} onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input placeholder="Phone" value={form.customerPhone} onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <select value={form.customerType} onChange={(e) => setForm((f) => ({ ...f, customerType: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50">
              {TYPES.map((t) => <option key={t} value={t} className="bg-[#0B1020]">{t}</option>)}
            </select>
            <input required placeholder="Corridor (e.g. USD/NGN)" value={form.corridor} onChange={(e) => setForm((f) => ({ ...f, corridor: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input required type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <select value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50">
              {SOURCES.map((s) => <option key={s} value={s} className="bg-[#0B1020]">{s.replace('_', ' ')}</option>)}
            </select>
            <select value={form.urgency} onChange={(e) => setForm((f) => ({ ...f, urgency: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50">
              {URGENCY.map((u) => <option key={u} value={u} className="bg-[#0B1020]">{u}</option>)}
            </select>
            <input type="number" placeholder="Expires in (min)" value={form.expiresIn} onChange={(e) => setForm((f) => ({ ...f, expiresIn: Number(e.target.value) }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <label className="flex items-center gap-2 text-sm text-white">
              <input type="checkbox" checked={form.trustFlag} onChange={(e) => setForm((f) => ({ ...f, trustFlag: e.target.checked }))} className="rounded bg-white/[0.06] border-white/10" />
              Trust flagged
            </label>
            <div className="lg:col-span-3">
              <Button type="submit" size="sm" isLoading={submitting} leftIcon={<Plus className="w-4 h-4" />}>Create Lead</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Claimable Leads */}
      <Card variant="glass" className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Claimable</h2>
          <span className="text-xs text-[#7183A6]">{claimable.length} available</span>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : claimable.length === 0 ? (
          <div className="text-center py-8 text-[#7183A6]">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No claimable leads right now.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {claimable.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2A66] to-[#123E91] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{lead.customerName?.charAt(0) ?? 'L'}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{lead.customerName}</p>
                    <p className="text-xs text-[#7183A6]">{lead.corridor} · {Number(lead.amount).toLocaleString()} {lead.currency} · {lead.source.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {lead.trustFlag && <Flame className="w-4 h-4 text-semantic-warning" />}
                  <Button size="sm" onClick={() => handleClaim(lead.id)} rightIcon={<ArrowRight className="w-4 h-4" />}>Claim</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* My Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">My Claimed</h2>
            <span className="text-xs text-[#7183A6]">{myClaimed.length}</span>
          </div>
          {myClaimed.length === 0 ? (
            <div className="text-center py-6 text-[#7183A6]">
              <p className="text-sm">No claimed leads.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {myClaimed.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div>
                    <p className="text-sm text-white font-medium">{lead.customerName}</p>
                    <p className="text-xs text-[#7183A6]">{lead.corridor} · {lead.status}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleRelease(lead.id)} leftIcon={<X className="w-4 h-4" />}>Release</Button>
                    <Link href="/broker/deals">
                      <Button size="sm" leftIcon={<Zap className="w-4 h-4" />}>Convert</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Converted</h2>
            <span className="text-xs text-[#7183A6]">{myConverted.length}</span>
          </div>
          {myConverted.length === 0 ? (
            <div className="text-center py-6 text-[#7183A6]">
              <p className="text-sm">No converted leads yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {myConverted.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-semantic-success" />
                    <div>
                      <p className="text-sm text-white font-medium">{lead.customerName}</p>
                      <p className="text-xs text-[#7183A6]">{lead.corridor}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleArchive(lead.id)} leftIcon={<Trash2 className="w-4 h-4" />}>Archive</Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
