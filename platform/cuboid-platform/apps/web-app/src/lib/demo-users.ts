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
    password: 'Demo123!',
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
    password: 'Demo123!',
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
    password: 'Demo123!',
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
    password: 'Demo123!',
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
    password: 'Demo123!',
    redirectTo: '/ops',
    accent: '#EF4444',
    description: 'Monitor orchestration and workflows',
    icon: 'ShieldCheck',
  },
];
