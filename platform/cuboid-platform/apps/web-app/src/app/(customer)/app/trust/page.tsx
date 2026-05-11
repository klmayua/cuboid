'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Shield, RefreshCw, CheckCircle, AlertTriangle, ArrowUpRight, TrendingUp, Clock } from 'lucide-react';

export default function CustomerTrustPage() {
  const user = useAuthStore((state) => state.user);
  const [trust, setTrust] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user?.orgId) loadTrust(); }, [user?.orgId]);

  async function loadTrust() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/trust?organizationId=' + user.orgId);
      const json = await res.json();
      if (json.success) setTrust(json.data);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const score = trust?.score ?? 0;
  const tier = score >= 90 ? 'PLATINUM' : score >= 75 ? 'GOLD' : score >= 50 ? 'SILVER' : score >= 25 ? 'BRONZE' : 'NONE';

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Trust Score</h1>
            <p className="text-[#7183A6]">Your verification and trust standing.</p>
          </div>
          <button onClick={loadTrust} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray={score * 3.52} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-display text-white">{score}</span>
                </div>
              </div>
            </div>
            <p className="text-center text-white font-medium">{tier} Tier</p>
            <p className="text-center text-xs text-[#7183A6] mt-1">Current trust score</p>
          </Card>

          <Card variant="glass" className="p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-white mb-6">Benefits Unlocked</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-brand-light-trust" />
                  <span className="text-sm text-white">Higher transaction limits</span>
                </div>
                {score >= 50 ? <CheckCircle className="w-5 h-5 text-semantic-success" /> : <AlertTriangle className="w-5 h-5 text-semantic-warning" />}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-light-trust" />
                  <span className="text-sm text-white">Faster quote matching</span>
                </div>
                {score >= 75 ? <CheckCircle className="w-5 h-5 text-semantic-success" /> : <AlertTriangle className="w-5 h-5 text-semantic-warning" />}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-brand-light-trust" />
                  <span className="text-sm text-white">Premium desk access</span>
                </div>
                {score >= 90 ? <CheckCircle className="w-5 h-5 text-semantic-success" /> : <AlertTriangle className="w-5 h-5 text-semantic-warning" />}
              </div>
            </div>
          </Card>
        </div>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">Trust Factors</h2>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : (
            <div className="space-y-3">
              {[{ name: 'Identity Verification', value: trust?.identityVerified ? 25 : 0, max: 25 }, { name: 'Completed Transactions', value: trust?.transactionCount ? 25 : 0, max: 25 }, { name: 'Compliance Standing', value: trust?.complianceScore ? 25 : 0, max: 25 }, { name: 'Account Age', value: trust?.accountAge ? 25 : 0, max: 25 }].map((factor) => (
                <div key={factor.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <span className="text-sm text-white">{factor.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-light-trust rounded-full" style={{ width: `${(factor.value / factor.max) * 100}%` }} />
                    </div>
                    <span className="text-sm text-white w-12 text-right">{factor.value}/{factor.max}</span>
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