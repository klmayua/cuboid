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
  Building,
  Smartphone,
} from 'lucide-react';
import { useAuthStore, selectUserRole } from '@/features/auth';
import { getSidebarItemsForRole } from '@/config/rbac';
import type { UserRole } from '@/features/auth';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
  Building,
  Smartphone,
};

export function AppSidebar() {
  const pathname = usePathname();
  const role = useAuthStore(selectUserRole);
  const { nav, bottom } = getSidebarItemsForRole(role as UserRole);

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
        {nav.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-[#5E8DFF]/20 text-[#5E8DFF] border border-[#5E8DFF]/30'
                  : 'text-[#7183A6] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/7 pt-4 space-y-1">
        {bottom.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-[#5E8DFF]/20 text-[#5E8DFF] border border-[#5E8DFF]/30'
                  : 'text-[#7183A6] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default AppSidebar;
