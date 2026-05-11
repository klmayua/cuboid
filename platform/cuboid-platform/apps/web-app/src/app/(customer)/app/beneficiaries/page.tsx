'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Users, Plus, Search, RefreshCw, ArrowRight, Trash2, Edit } from 'lucide-react';

interface Beneficiary {
  id: string;
  name: string;
  country: string;
  bank: string | null;
  accountNumber: string | null;
  accountName: string | null;
  payoutMethod: string;
}

export default function CustomerBeneficiariesPage() {
  const user = useAuthStore((state) => state.user);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => { if (user?.orgId) loadBeneficiaries(); }, [user?.orgId]);

  async function loadBeneficiaries() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/beneficiaries?organizationId=' + user.orgId);
      const json = await res.json();
      if (json.success) setBeneficiaries(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const filtered = beneficiaries.filter((b) => 
    b.name.toLowerCase().includes(filter.toLowerCase()) ||
    (b.bank && b.bank.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Beneficiaries</h1>
            <p className="text-[#7183A6]">People you send money to.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7183A6]" />
              <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] w-56" />
            </div>
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Beneficiary</Button>
          </div>
        </div>

        <Card variant="glass" className="p-6">
          {loading ? (
            <div className="space-y-3">{[1,2,3,4].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No beneficiaries yet</p>
              <p className="text-xs mt-1">Add someone to send money to.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((beneficiary) => (
                <div key={beneficiary.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-brand-light-trust">{beneficiary.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{beneficiary.name}</p>
                      <div className="flex items-center gap-2 text-xs text-[#7183A6]">
                        <span>{beneficiary.country}</span>
                        {beneficiary.bank && <span>· {beneficiary.bank}</span>}
                        {beneficiary.accountNumber && <span>· ****{beneficiary.accountNumber?.slice(-4)}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/10 text-[#7183A6]">{beneficiary.payoutMethod}</span>
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-semantic-danger"><Trash2 className="w-4 h-4" /></Button>
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