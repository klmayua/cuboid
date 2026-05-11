'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { User, Briefcase, Shield, Mail, Phone, Building2, Save } from 'lucide-react';

export default function BrokerProfilePage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ specialty: '', commissionRate: 0 });

  useEffect(() => {
    if (!orgId) return;
    fetch(`/api/broker?organizationId=${orgId}&action=performance`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setProfile(json.data ?? null);
          setForm({
            specialty: json.data?.profile?.specialty ?? '',
            commissionRate: json.data?.profile?.commissionRate ?? 0,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [orgId]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId) return;
    setSaving(true);
    try {
      await fetch('/api/broker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateProfile',
          organizationId: orgId,
          specialty: form.specialty,
          commissionRate: form.commissionRate,
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-light text-white mb-2">Broker Profile</h1>
        <p className="text-[#7183A6]">Your public broker identity and commission terms.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity Card */}
        <Card variant="glass" className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0A2A66] to-[#123E91] flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-medium text-white">{user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Broker' : 'Broker'}</p>
            <p className="text-sm text-[#7183A6] mb-4">{user?.email ?? ''}</p>
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04]">
                <Mail className="w-4 h-4 text-[#7183A6]" />
                <span className="text-sm text-white">{user?.email ?? '—'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04]">
                <Phone className="w-4 h-4 text-[#7183A6]" />
                <span className="text-sm text-white">—</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04]">
                <Building2 className="w-4 h-4 text-[#7183A6]" />
                <span className="text-sm text-white">{orgId ? 'Verified Organization' : 'No Organization'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Edit Profile */}
        <Card variant="glass" className="p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-white mb-6">Broker Settings</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 rounded-xl bg-white/[0.04] animate-pulse" />
              ))}
            </div>
          ) : (
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className="block text-xs text-[#7183A6] mb-2">Specialty</label>
                <input
                  value={form.specialty}
                  onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                  placeholder="e.g. USD/NGN institutional, retail remittance"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7183A6] mb-2">Commission Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  max={5}
                  value={form.commissionRate}
                  onChange={(e) => setForm((f) => ({ ...f, commissionRate: Number(e.target.value) }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50"
                />
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04]">
                <Shield className="w-5 h-5 text-brand-light-trust" />
                <div>
                  <p className="text-sm text-white font-medium">Active Status</p>
                  <p className="text-xs text-[#7183A6]">{profile?.profile?.active ? 'Your broker profile is live and visible to clients.' : 'Your broker profile is pending activation.'}</p>
                </div>
              </div>
              <Button type="submit" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
