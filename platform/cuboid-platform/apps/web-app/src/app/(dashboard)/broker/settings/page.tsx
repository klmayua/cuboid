'use client';

import { useState } from 'react';
import { Card } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Settings, Bell, Shield, Globe, Moon, Check } from 'lucide-react';

export default function BrokerSettingsPage() {
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketAlerts: true,
    settlementAlerts: true,
    leadAlerts: true,
    darkMode: true,
    language: 'en',
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const ToggleRow = ({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
      <div>
        <p className="text-sm text-white font-medium">{label}</p>
        <p className="text-xs text-[#7183A6]">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-brand-light-trust' : 'bg-white/10'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-light text-white mb-2">Settings</h1>
        <p className="text-[#7183A6]">Preferences, alerts, and account configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-brand-light-trust" />
            <h2 className="text-lg font-medium text-white">Notifications</h2>
          </div>
          <div className="space-y-3">
            <ToggleRow label="Email notifications" description="Receive deal and settlement updates via email." value={prefs.emailNotifications} onChange={() => toggle('emailNotifications')} />
            <ToggleRow label="Push notifications" description="Real-time push alerts on your device." value={prefs.pushNotifications} onChange={() => toggle('pushNotifications')} />
            <ToggleRow label="Market alerts" description="Notify when rates move significantly." value={prefs.marketAlerts} onChange={() => toggle('marketAlerts')} />
            <ToggleRow label="Settlement alerts" description="Notify when settlements clear or fail." value={prefs.settlementAlerts} onChange={() => toggle('settlementAlerts')} />
            <ToggleRow label="Lead alerts" description="Notify when new leads are available." value={prefs.leadAlerts} onChange={() => toggle('leadAlerts')} />
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-brand-light-trust" />
            <h2 className="text-lg font-medium text-white">Preferences</h2>
          </div>
          <div className="space-y-3">
            <ToggleRow label="Dark mode" description="Always use dark theme." value={prefs.darkMode} onChange={() => toggle('darkMode')} />
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
              <div>
                <p className="text-sm text-white font-medium">Language</p>
                <p className="text-xs text-[#7183A6]">Interface language preference.</p>
              </div>
              <select
                value={prefs.language}
                onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))}
                className="px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none"
              >
                <option value="en" className="bg-[#0B1020]">English</option>
              </select>
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-brand-light-trust" />
            <h2 className="text-lg font-medium text-white">Security</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
              <div>
                <p className="text-sm text-white font-medium">Two-factor authentication</p>
                <p className="text-xs text-[#7183A6]">Add an extra layer of security to your account.</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white hover:bg-white/[0.08] transition-colors">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
              <div>
                <p className="text-sm text-white font-medium">Change password</p>
                <p className="text-xs text-[#7183A6]">Update your account password.</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white hover:bg-white/[0.08] transition-colors">
                Update
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
