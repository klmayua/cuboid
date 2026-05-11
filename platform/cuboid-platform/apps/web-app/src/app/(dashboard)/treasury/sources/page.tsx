'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Server, RefreshCw, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react';

export default function TreasurySourcesPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadSources(); }, [orgId]);

  async function loadSources() {
    setLoading(true);
    try {
      const res = await fetch(`/api/treasury?organizationId=${orgId}&action=sources`);
      const json = await res.json();
      if (json.success) setSources(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function updateSourceHealth(sourceId: string, action: string) {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/treasury', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, sourceId, organizationId: orgId, actorId: user.id }),
      });
      if (res.ok) loadSources();
    } catch { /* silent */ }
  }

  const healthy = sources.filter((s: any) => s.status === 'HEALTHY').length;
  const degraded = sources.filter((s: any) => s.status === 'DEGRADED').length;
  const quarantined = sources.filter((s: any) => s.status === 'QUARANTINE').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Source Health</h1>
          <p className="text-[#7183A6]">Rate source monitoring and trust evaluation.</p>
        </div>
        <button onClick={loadSources} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-brand-light-trust" />
            <span className="text-xs text-[#7183A6]">Total Sources</span>
          </div>
          <p className="text-xl font-display text-white">{sources.length}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Healthy</span>
          </div>
          <p className="text-xl font-display text-white">{healthy}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">Degraded</span>
          </div>
          <p className="text-xl font-display text-white">{degraded}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-semantic-danger" />
            <span className="text-xs text-[#7183A6]">Quarantined</span>
          </div>
          <p className="text-xl font-display text-white">{quarantined}</p>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Source Status</h2>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}
          </div>
        ) : sources.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]">
            <Server className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No sources configured</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sources.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${s.status === 'HEALTHY' ? 'bg-semantic-success' : s.status === 'DEGRADED' ? 'bg-semantic-warning' : 'bg-semantic-danger'}`} />
                  <div>
                    <p className="text-sm text-white font-medium">{s.label}</p>
                    <p className="text-xs text-[#7183A6]">Trust weight {s.trustWeight} · Last quote {new Date(s.lastQuotedAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-lg ${s.status === 'HEALTHY' ? 'bg-semantic-success/10 text-semantic-success' : s.status === 'DEGRADED' ? 'bg-semantic-warning/10 text-semantic-warning' : 'bg-semantic-danger/10 text-semantic-danger'}`}>{s.status}</span>
                  {s.status !== 'QUARANTINE' && (
                    <Button variant="ghost" size="sm" onClick={() => updateSourceHealth(s.id, 'quarantineSource')}>Quarantine</Button>
                  )}
                  {s.status === 'QUARANTINE' && (
                    <Button variant="ghost" size="sm" onClick={() => updateSourceHealth(s.id, 'restoreSource')}>Restore</Button>
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