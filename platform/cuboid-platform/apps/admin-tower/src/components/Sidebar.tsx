import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';
import {
  LayoutDashboard, Users, Building2, Shield, AlertTriangle, Bell, Activity,
  Settings, Database, Globe, Key, FileText, MessageSquare, TrendingUp
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Operations', href: '/ops', active: true },
  { icon: Activity, label: 'Live Monitor', href: '/monitor' },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: Building2, label: 'Partners', href: '/partners' },
  { icon: Key, label: 'API Keys', href: '/keys' },
  { icon: Database, label: 'Ledger', href: '/ledger' },
  { icon: FileText, label: 'Compliance', href: '/compliance' },
  { icon: AlertTriangle, label: 'Fraud', href: '/fraud' },
];

const bottomItems = [
  { icon: MessageSquare, label: 'Support', href: '/support' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function ControlTowerSidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0B1020] border-r border-white/7 p-4 flex flex-col">
      <div className="mb-8 px-2">
        <Link href="/" className="flex items-center gap-3">
          <CuboidLogo variant="mark" mode="light" width={36} height={36} />
          <div>
            <span className="text-lg font-semibold text-white">CUBOID</span>
            <p className="text-xs text-semantic-danger">Control Tower</p>
          </div>
        </Link>
      </div>

      <div className="mb-4">
        <p className="text-xs text-[#7183A6] uppercase tracking-wider mb-2 px-3">Platform</p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active 
                  ? 'bg-white/[0.08] text-white' 
                  : 'text-[#7183A6] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/7 pt-4">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#7183A6] hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default ControlTowerSidebar;