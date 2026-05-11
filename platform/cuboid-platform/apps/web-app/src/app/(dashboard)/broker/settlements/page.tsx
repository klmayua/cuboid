'use client';

import { useEffect, useState } from 'react';
import { Card } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Clock, CheckCircle, AlertCircle, XCircle, RotateCcw } from 'lucide-react';

export default function BrokerSettlementsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [settlements, setSettlements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;
    fetch(`/api/settlement/mine?organizationId=${orgId}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setSettlements(json.data ?? []); })
      .finally(() => setLoading(false));
  }, [orgId]);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'CLEARED': return <CheckCircle className="w-4 h-4 text-semantic-success" />;
      case 'FAILED': return <XCircle className="w-4 h-4 text-semantic-danger" />;
      case 'REVERSED': return <RotateCcw className="w-4 h-4 text-semantic-warning" />;
      case 'PROCESSING': return <Clock className="w-4 h-4 text-semantic-pending" />;
      default: return <Clock className="w-4 h-4 text-[#7183A6]" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-light text-white mb-2">Settlements</h1>
        <p className="text-[#7183A6]">Clearing status and settlement history.</p>
      </div>

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : settlements.length === 0 ? (
          <div className="text-center py-16 text-[#7183A6]">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-white mb-2">No settlements</p>
            <p className="text-sm max-w-md mx-auto">Settlements appear here once deals progress through escrow and reach the clearing stage.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {settlements.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4">
                  {statusIcon(s.status)}
                  <div>
                    <p className="text-sm text-white font-medium">{s.reference}</p>
                    <p className="text-xs text-[#7183A6]">{s.currency} · {Number(s.amount).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#7183A6]">{s.status}</p>
                  <p className="text-xs text-[#7183A6]">{new Date(s.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
