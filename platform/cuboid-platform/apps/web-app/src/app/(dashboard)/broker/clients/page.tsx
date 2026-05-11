'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Users, Search, Mail, MessageCircle, UserPlus, Phone, TrendingUp, Shield } from 'lucide-react';

const TYPES = ['INDIVIDUAL', 'SME', 'ENTERPRISE', 'INSTITUTION'];
const TIERS = ['bronze', 'silver', 'gold', 'platinum'];

export default function BrokerClientsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    whatsappNumber: '',
    customerType: TYPES[0],
    trustTier: TIERS[0],
  });

  useEffect(() => {
    if (!orgId) return;
    loadClients();
  }, [orgId]);

  async function loadClients() {
    setLoading(true);
    try {
      const res = await fetch(`/api/broker?organizationId=${orgId}&action=clients`);
      const json = await res.json();
      if (json.success) setClients(json.data ?? []);
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
          action: 'createClient',
          organizationId: orgId,
          clientName: form.clientName,
          clientEmail: form.clientEmail || undefined,
          clientPhone: form.clientPhone || undefined,
          whatsappNumber: form.whatsappNumber || undefined,
          customerType: form.customerType,
          actorId: user.id,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setForm({ clientName: '', clientEmail: '', clientPhone: '', whatsappNumber: '', customerType: TYPES[0], trustTier: TIERS[0] });
        loadClients();
      }
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = clients.filter((c) =>
    JSON.stringify(c).toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Client Book</h1>
          <p className="text-[#7183A6]">Relationships, volume, and profitability.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7183A6]" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search clients..."
              className="pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50 w-64"
            />
          </div>
          <Button size="sm" leftIcon={<UserPlus className="w-4 h-4" />} onClick={() => setShowForm((s) => !s)}>
            {showForm ? 'Cancel' : 'Add Client'}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card variant="glass" className="p-6 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">New Client</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required placeholder="Name" value={form.clientName} onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input placeholder="Email" value={form.clientEmail} onChange={(e) => setForm((f) => ({ ...f, clientEmail: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input placeholder="Phone" value={form.clientPhone} onChange={(e) => setForm((f) => ({ ...f, clientPhone: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input placeholder="WhatsApp" value={form.whatsappNumber} onChange={(e) => setForm((f) => ({ ...f, whatsappNumber: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <select value={form.customerType} onChange={(e) => setForm((f) => ({ ...f, customerType: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50">
              {TYPES.map((t) => <option key={t} value={t} className="bg-[#0B1020]">{t}</option>)}
            </select>
            <div>
              <Button type="submit" size="sm" isLoading={submitting} leftIcon={<UserPlus className="w-4 h-4" />}>Add</Button>
            </div>
          </form>
        </Card>
      )}

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[#7183A6]">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-white mb-2">No clients yet</p>
            <p className="text-sm max-w-md mx-auto mb-6">Your client book will grow as you register relationships. Start by adding your first client.</p>
            <Button size="sm" leftIcon={<UserPlus className="w-4 h-4" />} onClick={() => setShowForm(true)}>Add Client</Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2A66] to-[#123E91] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{c.clientName?.charAt(0) ?? 'C'}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{c.clientName}</p>
                    <p className="text-xs text-[#7183A6]">{c.customerType} · {c.totalTransactions} txs · ₦{Number(c.totalVolume).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-[#7183A6]">
                    <TrendingUp className="w-3 h-3" />
                    <span>{(Number(c.conversionRatio) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#7183A6]">
                    <Shield className="w-3 h-3" />
                    <span className="capitalize">{c.trustTier}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.clientEmail && <Button variant="ghost" size="sm" leftIcon={<Mail className="w-4 h-4" />}>Email</Button>}
                    {c.whatsappNumber && <Button variant="ghost" size="sm" leftIcon={<MessageCircle className="w-4 h-4" />}>WA</Button>}
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
