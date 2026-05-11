'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { TrendingUp, AlertTriangle, RefreshCw, Activity, Shield } from 'lucide-react';

const CORRIDORS = ['USD_NGN', 'GBP_NGN', 'EUR_NGN', 'AED_NGN'];

export default function TreasuryExposurePage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [exposure, setExposure] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadExposure(); }, [orgId]);

  async function loadExposure() {
    setLoading(true);
    try {
      const res = await fetch(`/api/treasury?organizationId=${orgId}&action=exposure`);
      const json = await res.json();
      if (json.success) setExposure(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const byCoroutine: Record<string, any> = {};
  for (const exp of exposure) {
    byCoroutine[exp.corridor] = exp;
  }

  const totalExposure = exposure.reduce((s, e) => s + Number(e.exposure), 0);
  const totalReserve = exposure.reduce((s, e) => s + Number(e.reserve), 0);
  const totalAvailable = exposure.reduce((s, e) => s + Number(e.available), 0);
  const overallRisk = totalReserve > 0 ? (totalExposure / totalReserve) * 100 : 0;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Exposure Dashboard</h1>
          <p className="text-[#7183A6]">Treasury book, risk positions, and availability.</p>
        </div>
        <button onClick={loadExposure} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
          <RefreshCw className="w-4 h-4 text-[#7183A6]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-semantic-warning" />
            <span className="text-xs text-[#7183A6]">Total Exposure</span>
          </div>
          <p className="text-xl font-display text-white">{totalExposure.toLocaleString('en-NG', { minimumFractionDigits: 0 })}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-semantic-success" />
            <span className="text-xs text-[#7183A6]">Total Reserve</span>
          </div>
          <p className="text-xl font-display text-white">{totalReserve.toLocaleString('en-NG', { minimumFractionDigits: 0 })}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-semantic-info" />
            <span className="text-xs text-[#7183A6]">Available</span>
          </div>
          <p className="text-xl font-display text-white">{totalAvailable.toLocaleString('en-NG', { minimumFractionDigits: 0 })}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-semantic-danger" />
            <span className="text-xs text-[#7183A6]">Risk Ratio</span>
          </div>
          <p className="text-xl font-display text-white">{overallRisk.toFixed(1)}%</p>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium text-white mb-6">Corridor Positions</h2>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}
          </div>
        ) : exposure.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]">
            <Activity className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No exposure data</p>
          </div>
        ) : (
          <div className="space-y-3">
            {exposure.map((exp: any) => {
              const riskRatio = exp.reserve > 0 ? (exp.exposure / exp.reserve) * 100 : 0;
              const status = riskRatio > 90 ? 'CRITICAL' : riskRatio > 75 ? 'WARNING' : 'HEALTHY';
              return (
                <div key={exp.corridor} className="p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white font-medium">{exp.corridor}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-lg ${status === 'CRITICAL' ? 'bg-semantic-danger/10 text-semantic-danger' : status === 'WARNING' ? 'bg-semantic-warning/10 text-semantic-warning' : 'bg-semantic-success/10 text-semantic-success'}`}>{status}</span>
                    </div>
                    <span className="text-sm text-white">Risk {riskRatio.toFixed(1)}%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-[#7183A6]">Exposure</p>
                      <p className="text-white">{Number(exp.exposure).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7183A6]">Reserve</p>
                      <p className="text-white">{Number(exp.reserve).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7183A6]">Allocated</p>
                      <p className="text-white">{Number(exp.allocated).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7183A6]">Available</p>
                      <p className="text-white">{Number(exp.available).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}