'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Settings as SettingsIcon, Bell, Shield, Globe, Save, Eye, EyeOff } from 'lucide-react';

interface Settings {
  orgName: string;
  defaultCurrency: string;
  timezone: string;
  dateFormat: string;
  rateRefreshInterval: string;
  settlementWindow: string;
  alertThreshold: string;
  notifyDeal: boolean;
  notifyRate: boolean;
  notifySettlement: boolean;
  notifyInventory: boolean;
  kycRequired: boolean;
  amlCheck: boolean;
  sourceOfFunds: boolean;
}

export default function BdcSettingsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [settings, setSettings] = useState<Settings>({
    orgName: '', defaultCurrency: 'NGN', timezone: 'Africa/Lagos', dateFormat: 'DD/MM/YYYY',
    rateRefreshInterval: '60', settlementWindow: '24', alertThreshold: '10000',
    notifyDeal: true, notifyRate: true, notifySettlement: true, notifyInventory: true,
    kycRequired: true, amlCheck: true, sourceOfFunds: true,
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!user?.id) return;
    setSaving(true);
    try {
      await fetch('/api/bdc', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'saveSettings', organizationId: orgId, ...settings, actorId: user.id }) });
    } finally { setSaving(false); }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Settings</h1>
          <p className="text-[#7183A6]">Configure BDC operations and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-2 mb-6"><Globe className="w-5 h-5 text-brand-light-trust" /><h2 className="text-lg font-medium text-white">General</h2></div>
          <div className="space-y-4">
            <div><label className="block text-xs text-[#7183A6] mb-2">Organization Name</label><input value={settings.orgName} onChange={(e) => setSettings((s) => ({ ...s, orgName: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white" /></div>
            <div><label className="block text-xs text-[#7183A6] mb-2">Default Currency</label><select value={settings.defaultCurrency} onChange={(e) => setSettings((s) => ({ ...s, defaultCurrency: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white"><option value="NGN" className="bg-[#0B1020]">NGN</option><option value="USD" className="bg-[#0B1020]">USD</option></select></div>
            <div><label className="block text-xs text-[#7183A6] mb-2">Timezone</label><select value={settings.timezone} onChange={(e) => setSettings((s) => ({ ...s, timezone: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white"><option value="Africa/Lagos" className="bg-[#0B1020]">Africa/Lagos</option></select></div>
            <Button onClick={handleSave} size="sm" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>Save</Button>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-2 mb-6"><Bell className="w-5 h-5 text-semantic-warning" /><h2 className="text-lg font-medium text-white">Notifications</h2></div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-white">Deal Updates</span><button onClick={() => setSettings((s) => ({ ...s, notifyDeal: !s.notifyDeal }))} className={`w-10 h-6 rounded-full transition-colors ${settings.notifyDeal ? 'bg-brand-light-trust' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.notifyDeal ? 'translate-x-5' : 'translate-x-1'}`} /></button></label>
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-white">Rate Alerts</span><button onClick={() => setSettings((s) => ({ ...s, notifyRate: !s.notifyRate }))} className={`w-10 h-6 rounded-full transition-colors ${settings.notifyRate ? 'bg-brand-light-trust' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.notifyRate ? 'translate-x-5' : 'translate-x-1'}`} /></button></label>
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-white">Settlement</span><button onClick={() => setSettings((s) => ({ ...s, notifySettlement: !s.notifySettlement }))} className={`w-10 h-6 rounded-full transition-colors ${settings.notifySettlement ? 'bg-brand-light-trust' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.notifySettlement ? 'translate-x-5' : 'translate-x-1'}`} /></button></label>
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-white">Inventory Low</span><button onClick={() => setSettings((s) => ({ ...s, notifyInventory: !s.notifyInventory }))} className={`w-10 h-6 rounded-full transition-colors ${settings.notifyInventory ? 'bg-brand-light-trust' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.notifyInventory ? 'translate-x-5' : 'translate-x-1'}`} /></button></label>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-2 mb-6"><Shield className="w-5 h-5 text-semantic-success" /><h2 className="text-lg font-medium text-white">Compliance</h2></div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-white">KYC Required</span><button onClick={() => setSettings((s) => ({ ...s, kycRequired: !s.kycRequired }))} className={`w-10 h-6 rounded-full transition-colors ${settings.kycRequired ? 'bg-brand-light-trust' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.kycRequired ? 'translate-x-5' : 'translate-x-1'}`} /></button></label>
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-white">AML Check</span><button onClick={() => setSettings((s) => ({ ...s, amlCheck: !s.amlCheck }))} className={`w-10 h-6 rounded-full transition-colors ${settings.amlCheck ? 'bg-brand-light-trust' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.amlCheck ? 'translate-x-5' : 'translate-x-1'}`} /></button></label>
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-white">Source of Funds</span><button onClick={() => setSettings((s) => ({ ...s, sourceOfFunds: !s.sourceOfFunds }))} className={`w-10 h-6 rounded-full transition-colors ${settings.sourceOfFunds ? 'bg-brand-light-trust' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.sourceOfFunds ? 'translate-x-5' : 'translate-x-1'}`} /></button></label>
          </div>
        </Card>
      </div>
    </div>
  );
}