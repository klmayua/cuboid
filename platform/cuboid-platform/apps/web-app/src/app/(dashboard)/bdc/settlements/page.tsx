'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { ArrowLeftRight, Clock, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface Settlement {
  id: string;
  corridor: string;
  amount: number;
  currency: string;
  status: string;
  fromDesk: string;
  toDesk: string;
  createdAt: string;
}

export default function BdcSettlementsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadSettlements(); }, [orgId]);

  async function loadSettlements() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bdc?organizationId=${orgId}&action=settlements`);
      const json = await res.json();
      if (json.success) setSettlements(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const pending = settlements.filter((s) => s.status === 'PENDING').length;
  const settled = settlements.filter((s) => s.status === 'SETTLED').length;
  const failed = settlements.filter((s) => s.status === 'FAILED').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Settlements</h1>
          <p className="text-[#7183A6]">Inter-desk reconciliation and settlement flows.</p>
        </div>
        <button onClick={loadSettlements} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Pending</span></div>
          <p className="text-xl font-display text-white">{pending}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-semantic-success" /><span className="text-xs text-[#7183A6]">Settled</span></div>
          <p className="text-xl font-display text-white">{settled}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-semantic-danger" /><span className="text-xs text-[#7183A6]">Failed</span></div>
          <p className="text-xl font-display text-white">{failed}</p>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Settlement Queue</h2>
        {loading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : settlements.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]"><ArrowLeftRight className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No settlements in queue.</p></div>
        ) : (
          <div className="space-y-2">
            {settlements.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${s.status === 'SETTLED' ? 'bg-semantic-success' : s.status === 'FAILED' ? 'bg-semantic-danger' : 'bg-semantic-warning'}`} />
                  <div><p className="text-sm text-white font-medium">{s.corridor} · {Number(s.amount).toLocaleString()} {s.currency}</p><p className="text-xs text-[#7183A6]">{s.fromDesk} → {s.toDesk}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-lg ${s.status === 'SETTLED' ? 'bg-semantic-success/10 text-semantic-success' : s.status === 'FAILED' ? 'bg-semantic-danger/10 text-semantic-danger' : 'bg-semantic-warning/10 text-semantic-warning'}`}>{s.status}</span>
                  <span className="text-xs text-[#7183A6]">{new Date(s.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}