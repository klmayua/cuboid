import Link from 'next/link';
import { Card } from '@cuboid/design-system';
import { User, Shield, Bell, Key, Globe, Smartphone, LogOut, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { title: 'Account', items: [{ icon: User, label: 'Profile', desc: 'Name, email, phone' }, { icon: Shield, label: 'Security', desc: 'Password, MFA' }, { icon: Bell, label: 'Notifications', desc: 'Email, SMS preferences' }] },
    { title: 'Developer', items: [{ icon: Key, label: 'API Keys', desc: 'Manage API keys' }, { icon: Globe, label: 'Webhooks', desc: 'Configure webhooks' }] },
    { title: 'Organization', items: [{ icon: User, label: 'Team', desc: 'Manage team members' }, { icon: Shield, label: 'Limits', desc: 'Transaction limits' }] },
  ];

  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <div className="fixed left-0 top-0 w-64 bg-[#0B1020] border-r border-white/7 p-4">
        <div className="mb-8 px-2"><span className="text-lg font-semibold text-white">CUBOID</span></div>
        <nav className="space-y-1">
          {[{ label: 'Dashboard', href: '/dashboard', icon: '📊' }, { label: 'Settings', href: '/settings', icon: '⚙️', active: true }].map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${item.active ? 'bg-white/[0.08] text-white' : 'text-[#7183A6]'}`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8"><h1 className="text-2xl text-white">Settings</h1><p className="text-sm text-[#7183A6]">Manage your account and preferences</p></div>

        <div className="grid grid-cols-2 gap-8">
          {sections.map((section, si) => (
            <Card key={si} variant="glass" className="p-0">
              <div className="p-4 border-b border-white/7"><h2 className="text-sm text-[#7183A6] uppercase">{section.title}</h2></div>
              {section.items.map((item, i) => (
                <Link key={i} href="#" className="flex items-center justify-between p-4 border-b border-white/4 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#7183A6]" />
                    </div>
                    <div><p className="text-sm text-white">{item.label}</p><p className="text-xs text-[#7183A6]">{item.desc}</p></div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7183A6]" />
                </Link>
              ))}
            </Card>
          ))}
        </div>

        <Card variant="glass" className="mt-8 p-0">
          <Link href="#" className="flex items-center justify-between p-4 text-semantic-danger hover:bg-semantic-danger/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-semantic-danger/10 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-semantic-danger" />
              </div>
              <div><p className="text-sm text-semantic-danger">Sign Out</p><p className="text-xs text-[#7183A6]">Log out of your account</p></div>
            </div>
          </Link>
        </Card>
      </main>
    </div>
  );
}