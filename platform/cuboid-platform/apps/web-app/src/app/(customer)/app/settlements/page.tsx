'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Building, RefreshCw, Clock, CheckCircle, AlertTriangle, ArrowRight, XCircle } from 'lucide-react';

interface Settlement {
  id: string;
  amount: number;
  currency: string;
  status: string;
  channel: string;
  createdAt: string;
}

export default function CustomerSettlementsPage() {
  const user = useAuthStore((state) => state.user);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user?.orgId) loadData(); }, [user?.orgId]);

  async function loadData() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/settlements?organizationId=' + user.orgId);
      const json = await res.json();
      if (json.success) setSettlements(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Settlements</h1>
            <p className="text-[#7183A6]">Payouts and settlements.</p>
          </div>
          <button onClick={loadData} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Processing</span></div>
            <p className="text-xl font-display text-white">{settlements.filter((s) => s.status === 'PROCESSING').length}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-semantic-success" /><span className="text-xs text-[#7183A6]">Cleared</span></div>
            <p className="text-xl font-display text-white">{settlements.filter((s) => s.status === 'CLEARED').length}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Pending</span></div>
            <p className="text-xl font-display text-white">{settlements.filter((s) => s.status === 'INITIATED').length}</p>
          </Card>
          <Card variant="glass" size="compact">
            <div className="flex items-center gap-2 mb-2"><XCircle className="w-4 h-4 text-semantic-danger" /><span className="text-xs text-[#7183A6]">Failed</span></div>
            <p className="text-xl font-display text-white">{settlements.filter((s) => s.status === 'FAILED').length}</p>
          </Card>
        </div>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Settlement History</h2>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : settlements.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]"><Building className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No settlements yet</p></div>
          ) : (
            <div className="space-y-2">
              {settlements.map((settle) => (
                <div key={settle.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${settle.status === 'CLEARED' ? 'bg-semantic-success/10' : settle.status === 'FAILED' ? 'bg-semantic-danger/10' : 'bg-semantic-warning/10'}`}>
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{settle.amount?.toLocaleString('en-NG')} {settle.currency}</p>
                      <p className="text-xs text-[#7183A6]">{settle.channel} · {new Date(settle.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${settle.status === 'CLEARED' ? 'bg-semantic-success/10 text-semantic-success' : settle.status === 'FAILED' ? 'bg-semantic-danger/10 text-semantic-danger' : settle.status === 'REVERSED' ? 'bg-semantic-danger/10 text-semantic-danger' : 'bg-semantic-warning/10 text-semantic-warning'}`}>{settle.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </CustomerAppLayout>
  );
}