'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CuboidLogo } from '@cuboid/design-system';
import { 
  LayoutDashboard, 
  Send, 
  Wallet, 
  Building2, 
  LineChart, 
  Shield, 
  HelpCircle, 
  Settings,
  Users,
  ArrowLeftRight,
  MapPin,
  HeartHandshake,
  Store,
  Bell,
  Activity,
  Briefcase,
  Building
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Briefcase, label: 'Broker OS', href: '/broker' },
  { icon: Building, label: 'BDC OS', href: '/bdc' },
  { icon: Send, label: 'Move Value', href: '/transfer' },
  { icon: ArrowLeftRight, label: 'Convert', href: '/convert' },
  { icon: MapPin, label: 'Find BDC', href: '/nearest-bdc' },
  { icon: Wallet, label: 'Wallets', href: '/wallets' },
  { icon: HeartHandshake, label: 'Escrow', href: '/escrow' },
  { icon: Users, label: 'Beneficiaries', href: '/beneficiaries' },
  { icon: Store, label: 'Merchants', href: '/merchants' },
  { icon: Building2, label: 'Treasury', href: '/treasury' },
  { icon: Users, label: 'Customer App', href: '/app' },
  { icon: Activity, label: 'Ops', href: '/ops' },
  { icon: LineChart, label: 'Analytics', href: '/analytics' },
  { icon: Activity, label: 'Activity', href: '/activity' },
];

const bottomItems = [
  { icon: Shield, label: 'Trust', href: '/trust' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: HelpCircle, label: 'Support', href: '/support' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function AppSidebar() {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0B1020] border-r border-white/7 p-4 flex flex-col">
      <div className="mb-8 px-2">
        <Link href="/dashboard" className="flex items-center gap-3">
          <CuboidLogo variant="mark" mode="light" width={36} height={36} />
          <span className="text-lg font-semibold text-white">CUBOID</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              isActive(item.href) 
                ? 'bg-[#5E8DFF]/20 text-[#5E8DFF] border border-[#5E8DFF]/30' 
                : 'text-[#7183A6] hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/7 pt-4 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              isActive(item.href) 
                ? 'bg-[#5E8DFF]/20 text-[#5E8DFF] border border-[#5E8DFF]/30' 
                : 'text-[#7183A6] hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default AppSidebar;