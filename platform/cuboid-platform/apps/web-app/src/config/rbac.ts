import type { UserRole } from '@/features/auth';

// ============================================================================
// ROLE-BASED ACCESS CONTROL CONFIGURATION
// ============================================================================
// This is the single source of truth for all role permissions.
// DO NOT hardcode role checks elsewhere — import from this file.
// ============================================================================

export const ROLE_ROUTE_ACCESS: Record<UserRole, string[]> = {
  PUBLIC: ['/signin', '/signup', '/forgot-password', '/reset-password', '/verify'],
  USER: ['/app', '/wallets', '/transfer', '/escrow', '/beneficiaries', '/merchants', '/trust', '/notifications', '/support', '/settings', '/activity', '/dashboard'],
  BROKER: ['/broker', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  BDC_OPERATOR: ['/bdc', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  TREASURY: ['/treasury', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  COMPLIANCE: ['/compliance', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  ADMIN: ['/ops', '/ops/orchestration', '/ops/whatsapp', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity', '/analytics'],
  SUPER_ADMIN: ['/admin', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  REGULATOR: ['/regulator', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  MANAGER: ['/ops', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  ANALYST: ['/treasury', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
  PARTNER: ['/broker', '/dashboard', '/trust', '/notifications', '/support', '/settings', '/activity'],
};

export const ROLE_DEFAULT_REDIRECT: Record<UserRole, string> = {
  PUBLIC: '/signin',
  USER: '/app',
  BROKER: '/broker',
  BDC_OPERATOR: '/bdc',
  TREASURY: '/treasury',
  COMPLIANCE: '/compliance',
  ADMIN: '/ops',
  SUPER_ADMIN: '/admin',
  REGULATOR: '/regulator',
  MANAGER: '/ops',
  ANALYST: '/treasury',
  PARTNER: '/broker',
};

export interface SidebarItem {
  icon: string;
  label: string;
  href: string;
  roles: UserRole[];
}

export const SIDEBAR_NAV_ITEMS: SidebarItem[] = [
  { icon: 'LayoutDashboard', label: 'Dashboard', href: '/dashboard', roles: ['USER', 'BROKER', 'BDC_OPERATOR', 'TREASURY', 'COMPLIANCE', 'ADMIN', 'SUPER_ADMIN', 'REGULATOR', 'MANAGER', 'ANALYST', 'PARTNER'] },
  { icon: 'Briefcase', label: 'Broker OS', href: '/broker', roles: ['BROKER', 'PARTNER'] },
  { icon: 'Building', label: 'BDC OS', href: '/bdc', roles: ['BDC_OPERATOR'] },
  { icon: 'Send', label: 'Move Value', href: '/transfer', roles: ['USER'] },
  { icon: 'ArrowLeftRight', label: 'Convert', href: '/convert', roles: ['USER', 'BROKER', 'BDC_OPERATOR'] },
  { icon: 'MapPin', label: 'Find BDC', href: '/nearest-bdc', roles: ['USER'] },
  { icon: 'Wallet', label: 'Wallets', href: '/wallets', roles: ['USER'] },
  { icon: 'HeartHandshake', label: 'Escrow', href: '/escrow', roles: ['USER', 'BROKER'] },
  { icon: 'Users', label: 'Beneficiaries', href: '/beneficiaries', roles: ['USER', 'BROKER'] },
  { icon: 'Store', label: 'Merchants', href: '/merchants', roles: ['USER'] },
  { icon: 'Building2', label: 'Treasury', href: '/treasury', roles: ['TREASURY'] },
  { icon: 'Smartphone', label: 'Customer App', href: '/app', roles: ['USER'] },
  { icon: 'Activity', label: 'Ops', href: '/ops', roles: ['ADMIN'] },
  { icon: 'LineChart', label: 'Analytics', href: '/analytics', roles: ['TREASURY', 'ADMIN', 'SUPER_ADMIN'] },
  { icon: 'Activity', label: 'Activity', href: '/activity', roles: ['USER', 'BROKER', 'BDC_OPERATOR', 'TREASURY', 'COMPLIANCE', 'ADMIN', 'SUPER_ADMIN', 'REGULATOR'] },
];

export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
  { icon: 'Shield', label: 'Trust', href: '/trust', roles: ['USER', 'BROKER', 'BDC_OPERATOR', 'TREASURY', 'COMPLIANCE', 'ADMIN', 'SUPER_ADMIN', 'REGULATOR'] },
  { icon: 'Bell', label: 'Notifications', href: '/notifications', roles: ['USER', 'BROKER', 'BDC_OPERATOR', 'TREASURY', 'COMPLIANCE', 'ADMIN', 'SUPER_ADMIN', 'REGULATOR'] },
  { icon: 'HelpCircle', label: 'Support', href: '/support', roles: ['USER', 'BROKER', 'BDC_OPERATOR', 'TREASURY', 'COMPLIANCE', 'ADMIN', 'SUPER_ADMIN', 'REGULATOR'] },
  { icon: 'Settings', label: 'Settings', href: '/settings', roles: ['USER', 'BROKER', 'BDC_OPERATOR', 'TREASURY', 'COMPLIANCE', 'ADMIN', 'SUPER_ADMIN', 'REGULATOR'] },
];

/**
 * Check if a route is accessible by a given role.
 * Always returns true for SUPER_ADMIN.
 */
export function isRouteAllowed(role: UserRole, pathname: string): boolean {
  if (role === 'SUPER_ADMIN') return true;

  const allowedPrefixes = ROLE_ROUTE_ACCESS[role] ?? [];
  return allowedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Get the default redirect path for a role.
 */
export function getRoleDefaultRedirect(role: UserRole): string {
  return ROLE_DEFAULT_REDIRECT[role] ?? '/dashboard';
}

/**
 * Filter sidebar items by role.
 */
export function getSidebarItemsForRole(role: UserRole): {
  nav: SidebarItem[];
  bottom: SidebarItem[];
} {
  if (role === 'SUPER_ADMIN') {
    return {
      nav: SIDEBAR_NAV_ITEMS,
      bottom: SIDEBAR_BOTTOM_ITEMS,
    };
  }

  return {
    nav: SIDEBAR_NAV_ITEMS.filter((item) => item.roles.includes(role)),
    bottom: SIDEBAR_BOTTOM_ITEMS.filter((item) => item.roles.includes(role)),
  };
}
