'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CuboidLogo } from '@cuboid/design-system';
import {
  LayoutDashboard,
  Wallet,
  Users,
  FileText,
  ArrowLeftRight,
  Shield,
  Bell,
  User,
  Settings,
  Activity,
  Send,
  Building,
  ArrowRight
} from 'lucide-react';

const customerNavItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/app' },
  { icon: Wallet, label: 'Wallets', href: '/app/wallets' },
  { icon: Users, label: 'Beneficiaries', href: '/app/beneficiaries' },
  { icon: FileText, label: 'Quotes', href: '/app/quotes' },
  { icon: ArrowLeftRight, label: 'Transactions', href: '/app/transactions' },
  { icon: Shield, label: 'Escrow', href: '/app/escrow' },
  { icon: Building, label: 'Settlements', href: '/app/settlements' },
  { icon: Shield, label: 'Trust', href: '/app/trust' },
  { icon: Bell, label: 'Notifications', href: '/app/notifications' },
];

const customerBottomItems = [
  { icon: User, label: 'Profile', href: '/app/profile' },
  { icon: Settings, label: 'Settings', href: '/app/settings' },
];

export function CustomerAppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-[280px] h-screen bg-[#07111A] border-r border-white/[0.06] flex flex-col z-50">
      <div className="p-6 border-b border-white/[0.06]">
        <Link href="/app" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-light-trust/20 flex items-center justify-center">
            <CuboidLogo className="w-5 h-5 text-brand-light-trust" />
          </div>
          <div>
            <p className="text-white font-medium text-lg">CUBOID</p>
            <p className="text-[#7183A6] text-xs">Customer Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {customerNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-brand-light-trust/10 text-brand-light-trust'
                    : 'text-[#7183A6] hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/[0.06]">
        <div className="space-y-1">
          {customerBottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-brand-light-trust/10 text-brand-light-trust'
                    : 'text-[#7183A6] hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export function CustomerAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07111A]">
      <CustomerAppSidebar />
      <main className="ml-[280px]">
        {children}
      </main>
    </div>
  );
}