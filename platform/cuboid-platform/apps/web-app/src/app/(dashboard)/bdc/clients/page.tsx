'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Users, Search, Plus, Phone, Mail, Building } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  phone: string;
  type: string;
  tier: string;
  createdAt: string;
}

export default function BdcClientsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { if (!orgId) return; loadClients(); }, [orgId]);

  async function loadClients() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bdc?organizationId=${orgId}&action=clients`);
      const json = await res.json();
      if (json.success) setClients(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const filtered = clients.filter((c) => JSON.stringify(c).toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Clients</h1>
          <p className="text-[#7183A6]">Active clients across all BDC desks.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7183A6]" />
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50 w-56" />
          </div>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Add Client'}</Button>
        </div>
      </div>

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No clients yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-brand-light-trust">{client.name?.charAt(0) ?? '?'}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{client.name}</p>
                    <div className="flex items-center gap-3 text-xs text-[#7183A6]">
                      {client.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{client.phone}</span>}
                      {client.type && <span className="flex items-center gap-1"><Building className="w-3 h-3" />{client.type}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-lg ${client.tier === 'VIP' ? 'bg-semantic-warning/10 text-semantic-warning' : client.tier === 'PREMIUM' ? 'bg-brand-light-trust/10 text-brand-light-trust' : 'bg-white/10 text-[#7183A6]'}`}>{client.tier}</span>
                  <span className="text-xs text-[#7183A6]">{new Date(client.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}