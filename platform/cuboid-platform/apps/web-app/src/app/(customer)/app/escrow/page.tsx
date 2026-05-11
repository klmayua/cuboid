'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Shield, RefreshCw, Clock, CheckCircle, AlertTriangle, ArrowRight, Key, Lock, Unlock } from 'lucide-react';

interface EscrowData {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export default function CustomerEscrowPage() {
  const user = useAuthStore((state) => state.user);
  const [escrows, setEscrows] = useState<EscrowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user?.orgId) loadData(); }, [user?.orgId]);

  async function loadData() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/escrow?organizationId=' + user.orgId);
      const json = await res.json();
      if (json.success) setEscrows(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const active = escrows.filter((e) => e.status === 'FUNDED' || e.status === 'LOCKED').length;
  const released = escrows.filter((e) => e.status === 'RELEASED').length;

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Escrow</h1>
            <p className="text-[#7183A6]">Protected transactions.</p>
          </div>
          <button onClick={loadData} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-brand-light-trust" /><span className="text-xs text-[#7183A6]">Active</span></div>
            <p className="text-xl font-display text-white">{active}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-semantic-success" /><span className="text-xs text-[#7183A6]">Released</span></div>
            <p className="text-xl font-display text-white">{released}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Disputed</span></div>
            <p className="text-xl font-display text-white">{escrows.filter((e) => e.status === 'DISPUTED').length}</p>
          </Card>
        </div>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Escrow Transactions</h2>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : escrows.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]"><Shield className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No active escrows</p></div>
          ) : (
            <div className="space-y-2">
              {escrows.map((escrow) => (
                <div key={escrow.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${escrow.status === 'LOCKED' ? 'bg-semantic-warning/10' : escrow.status === 'RELEASED' ? 'bg-semantic-success/10' : 'bg-white/10'}`}>
                      {escrow.status === 'LOCKED' ? <Lock className="w-5 h-5 text-semantic-warning" /> : escrow.status === 'RELEASED' ? <Unlock className="w-5 h-5 text-semantic-success" /> : <Shield className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{escrow.amount?.toLocaleString('en-NG')} {escrow.currency}</p>
                      <p className="text-xs text-[#7183A6]">{new Date(escrow.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${escrow.status === 'LOCKED' ? 'bg-semantic-warning/10 text-semantic-warning' : escrow.status === 'RELEASED' ? 'bg-semantic-success/10 text-semantic-success' : 'bg-white/10 text-[#7183A6]'}`}>{escrow.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </CustomerAppLayout>
  );
}