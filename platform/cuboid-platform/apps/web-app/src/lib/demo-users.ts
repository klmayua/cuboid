import type { UserRole } from '@/features/auth';

export interface DemoUser {
  id: string;
  role: UserRole;
  title: string;
  email: string;
  password: string;
  redirectTo: string;
  accent: string;
  description: string;
  icon: string;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'demo-broker',
    role: 'BROKER',
    title: 'Broker OS',
    email: 'demo+broker@cuboid.app',
    password: 'Cuboid@2026',
    redirectTo: '/broker',
    accent: '#3B82F6',
    description: 'Manage clients, quotes, and settlements',
    icon: 'Briefcase',
  },
  {
    id: 'demo-bdc',
    role: 'BDC_OPERATOR',
    title: 'BDC Tower',
    email: 'demo+bdc@cuboid.app',
    password: 'Cuboid@2026',
    redirectTo: '/bdc',
    accent: '#10B981',
    description: 'Operate bureau desks and inventory',
    icon: 'Building2',
  },
  {
    id: 'demo-treasury',
    role: 'TREASURY',
    title: 'Treasury Command',
    email: 'demo+treasury@cuboid.app',
    password: 'Cuboid@2026',
    redirectTo: '/treasury',
    accent: '#D4AF37',
    description: 'Oversee liquidity and market exposure',
    icon: 'Landmark',
  },
  {
    id: 'demo-customer',
    role: 'USER',
    title: 'Customer App',
    email: 'demo+customer@cuboid.app',
    password: 'Cuboid@2026',
    redirectTo: '/app',
    accent: '#8B5CF6',
    description: 'Personal wallets and transfers',
    icon: 'Wallet',
  },
  {
    id: 'demo-ops',
    role: 'ADMIN',
    title: 'Operations Control',
    email: 'demo+ops@cuboid.app',
    password: 'Cuboid@2026',
    redirectTo: '/ops',
    accent: '#EF4444',
    description: 'Monitor orchestration and workflows',
    icon: 'ShieldCheck',
  },
  {
    id: 'demo-super-admin',
    role: 'SUPER_ADMIN',
    title: 'Super Administrator',
    email: 'admin@cuboid.demo',
    password: 'Cuboid@2026',
    redirectTo: '/dashboard',
    accent: '#FF6B35',
    description: 'Full platform administration with unrestricted access',
    icon: 'Crown',
  },
  {
    id: 'demo-manager',
    role: 'MANAGER',
    title: 'Operations Manager',
    email: 'ops@cuboid.demo',
    password: 'Cuboid@2026',
    redirectTo: '/ops',
    accent: '#6366F1',
    description: 'Team management, workflow orchestration, reporting oversight',
    icon: 'Users',
  },
  {
    id: 'demo-analyst',
    role: 'ANALYST',
    title: 'Data Analyst',
    email: 'analyst@cuboid.demo',
    password: 'Cuboid@2026',
    redirectTo: '/treasury',
    accent: '#0EA5E9',
    description: 'Market data analysis, FX rate monitoring, liquidity insights',
    icon: 'BarChart3',
  },
  {
    id: 'demo-partner',
    role: 'PARTNER',
    title: 'Partner',
    email: 'partner@cuboid.demo',
    password: 'Cuboid@2026',
    redirectTo: '/broker',
    accent: '#10B981',
    description: 'Partner network access, deal pipeline, commission tracking',
    icon: 'Handshake',
  },
];
