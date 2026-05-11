'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Settings, RefreshCw, Save, Plus, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

const CORRIDORS = ['USD_NGN', 'GBP_NGN', 'EUR_NGN', 'AED_NGN'];

const DEFAULT_CONTROLS: Record<string, any> = {
  USD_NGN: { minSpread: 2, targetSpread: 5, maxSpread: 15, liquidityThreshold: 1000000, trustThreshold: 70, interventionThreshold: 85 },
  GBP_NGN: { minSpread: 3, targetSpread: 8, maxSpread: 20, liquidityThreshold: 500000, trustThreshold: 65, interventionThreshold: 80 },
  EUR_NGN: { minSpread: 3, targetSpread: 8, maxSpread: 20, liquidityThreshold: 500000, trustThreshold: 65, interventionThreshold: 80 },
  AED_NGN: { minSpread: 5, targetSpread: 12, maxSpread: 30, liquidityThreshold: 250000, trustThreshold: 60, interventionThreshold: 75 },
};

export default function TreasuryCorridorsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [controls, setControls] = useState<any>(DEFAULT_CONTROLS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState<string | null>(null);

  useEffect(() => { if (!orgId) return; loadControls(); }, [orgId]);

  async function loadControls() {
    setLoading(true);
    try {
      const res = await fetch(`/api/treasury?organizationId=${orgId}&action=corridorControls`);
      const json = await res.json();
      if (json.success && json.data) setControls(json.data);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function handleSave(corridor: string) {
    if (!user?.id) return;
    setSaving(true);
    try {
      const res = await fetch('/api/treasury', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'saveCorridorControl', organizationId: orgId, corridor, ...controls[corridor], actorId: user.id }),
      });
      if (res.ok) setShowForm(null);
    } finally { setSaving(false); }
  }

  function updateControl(corridor: string, field: string, value: number) {
    setControls((c: any) => ({ ...c, [corridor]: { ...c[corridor], [field]: value } }));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Corridor Controls</h1>
          <p className="text-[#7183A6]">Spread governance, thresholds, and intervention rules.</p>
        </div>
        <button onClick={loadControls} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CORRIDORS.map((corr) => {
          const ctrl = controls[corr] || DEFAULT_CONTROLS[corr];
          const needsAttention = ctrl.maxSpread < ctrl.targetSpread || ctrl.liquidityThreshold > 10000000;
          return (
            <Card key={corr} variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-white">{corr.replace('_', '/')}</h3>
                  {needsAttention && <AlertTriangle className="w-4 h-4 text-semantic-warning" />}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowForm(showForm === corr ? null : corr)}>Edit</Button>
              </div>
              
              {showForm === corr ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-[#7183A6] mb-1">Min Spread</label>
                      <input type="number" value={ctrl.minSpread} onChange={(e) => updateControl(corr, 'minSpread', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#7183A6] mb-1">Target</label>
                      <input type="number" value={ctrl.targetSpread} onChange={(e) => updateControl(corr, 'targetSpread', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#7183A6] mb-1">Max Spread</label>
                      <input type="number" value={ctrl.maxSpread} onChange={(e) => updateControl(corr, 'maxSpread', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#7183A6] mb-1">Liquidity Threshold</label>
                    <input type="number" value={ctrl.liquidityThreshold} onChange={(e) => updateControl(corr, 'liquidityThreshold', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#7183A6] mb-1">Trust Threshold</label>
                      <input type="number" value={ctrl.trustThreshold} onChange={(e) => updateControl(corr, 'trustThreshold', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#7183A6] mb-1">Intervention</label>
                      <input type="number" value={ctrl.interventionThreshold} onChange={(e) => updateControl(corr, 'interventionThreshold', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white" />
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleSave(corr)} isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>Save Control</Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-[#7183A6]">Target Spread</p>
                    <p className="text-lg font-display text-white">{ctrl.targetSpread}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7183A6]">Max Spread</p>
                    <p className="text-lg font-display text-white">{ctrl.maxSpread}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7183A6]">Liquidity</p>
                    <p className="text-lg font-display text-white">{ctrl.liquidityThreshold?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7183A6]">Trust Threshold</p>
                    <p className="text-lg font-display text-white">{ctrl.trustThreshold}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7183A6]">Intervention</p>
                    <p className="text-lg font-display text-white">{ctrl.interventionThreshold}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7183A6]">Status</p>
                    <p className={`text-lg font-display ${needsAttention ? 'text-semantic-warning' : 'text-semantic-success'}`}>{needsAttention ? 'Attention' : 'Healthy'}</p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}