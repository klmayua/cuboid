'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Wallet, TrendingUp, Clock, CheckCircle, AlertCircle, Lock, RotateCcw } from 'lucide-react';

export default function BrokerCommissionsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [summary, setSummary] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;
    Promise.all([
      fetch(`/api/broker?organizationId=${orgId}&action=commissionSummary`).then((r) => r.json()),
      fetch(`/api/broker?organizationId=${orgId}&action=commissions`).then((r) => r.json()),
      fetch(`/api/broker?organizationId=${orgId}&action=performance`).then((r) => r.json()),
    ]).then(([sumRes, entRes, profRes]) => {
      if (sumRes.success) setSummary(sumRes.data ?? null);
      if (entRes.success) setEntries(entRes.data ?? []);
      if (profRes.success) setProfile(profRes.data ?? null);
    }).finally(() => setLoading(false));
  }, [orgId]);

  async function handleRelease(id: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'releaseCommission', id, actorId: user.id, organizationId: orgId }),
      });
      if (res.ok) window.location.reload();
    } catch {
      // silent
    }
  }

  async function handleHold(id: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'holdCommission', id, actorId: user.id, organizationId: orgId }),
      });
      if (res.ok) window.location.reload();
    } catch {
      // silent
    }
  }

  const commissionRate = profile?.profile?.commissionRate ?? 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-light text-white mb-2">Commission Engine</h1>
        <p className="text-[#7183A6]">Accrued, pending, and payout history.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-brand-light-trust" />
            <span className="text-xs text-[#7183A6]">Rate</span>
          </div>
          <p className="text-2xl font-display text-white">{commissionRate.toFixed(2)}%</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Accrued</span>
          </div>
          <p className="text-2xl font-display text-white">₦{Math.round(summary?.accrued?.amount ?? 0).toLocaleString()}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">Pending</span>
          </div>
          <p className="text-2xl font-display text-white">₦{Math.round(summary?.pending?.amount ?? 0).toLocaleString()}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Released</span>
          </div>
          <p className="text-2xl font-display text-white">₦{Math.round(summary?.released?.amount ?? 0).toLocaleString()}</p>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Ledger</h2>
          <span className="text-xs text-[#7183A6]">{entries.length} entries</span>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-8 text-[#7183A6]">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No commission entries yet.</p>
            <p className="text-xs mt-1">Commissions accrue as deals clear and settle.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${e.status === 'RELEASED' ? 'bg-semantic-success' : e.status === 'HELD' ? 'bg-semantic-warning' : e.status === 'REVERSED' ? 'bg-semantic-danger' : 'bg-brand-light-trust'}`} />
                  <div>
                    <p className="text-sm text-white font-medium">₦{Number(e.amount).toLocaleString()} {e.currency}</p>
                    <p className="text-xs text-[#7183A6]">Rate {Number(e.rate).toFixed(2)}% · Vol {Number(e.computedFromVolume).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-lg ${e.status === 'RELEASED' ? 'bg-semantic-success/10 text-semantic-success' : e.status === 'HELD' ? 'bg-semantic-warning/10 text-semantic-warning' : e.status === 'REVERSED' ? 'bg-semantic-danger/10 text-semantic-danger' : 'bg-brand-light-trust/10 text-brand-light-trust'}`}>
                    {e.status}
                  </span>
                  {e.status === 'ACCRUED' && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleRelease(e.id)} leftIcon={<CheckCircle className="w-4 h-4" />}>Release</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleHold(e.id)} leftIcon={<Lock className="w-4 h-4" />}>Hold</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
