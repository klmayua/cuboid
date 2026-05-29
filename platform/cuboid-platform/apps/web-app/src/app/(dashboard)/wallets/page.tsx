'use client';

import { useState, useMemo } from 'react';
import { Card, Button } from '@cuboid/design-system';
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Wallet,
  Search,
  Filter,
  Shield,
} from 'lucide-react';
import { getMockCustomerWallets, getMockCustomerTransactions } from '@cuboid/domain-core/mock';

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  NGN: '₦',
  AED: 'د.إ',
};

const CURRENCY_LOCALES: Record<string, string> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  NGN: 'en-NG',
  AED: 'ar-AE',
};

const CURRENCY_COLORS: Record<string, string> = {
  USD: '#3B82F6',
  GBP: '#8B5CF6',
  EUR: '#10B981',
  NGN: '#F59E0B',
  AED: '#EF4444',
};

function formatCurrency(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat(CURRENCY_LOCALES[currency] ?? 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${CURRENCY_SYMBOLS[currency] ?? ''}${value.toLocaleString()}`;
  }
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

const statusConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  COMPLETED: { icon: CheckCircle2, color: '#17C964', label: 'Completed' },
  PENDING: { icon: Clock, color: '#F5A524', label: 'Pending' },
  PROCESSING: { icon: Loader2, color: '#5E8DFF', label: 'Processing' },
  FAILED: { icon: XCircle, color: '#F31260', label: 'Failed' },
};

const directionConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; sign: string }> = {
  DEPOSIT: { icon: ArrowDownLeft, color: '#17C964', sign: '+' },
  WITHDRAWAL: { icon: ArrowUpRight, color: '#F31260', sign: '-' },
  TRANSFER: { icon: ArrowLeftRight, color: '#5E8DFF', sign: '±' },
};

export default function WalletsPage() {
  const [search, setSearch] = useState('');
  const wallets = useMemo(() => getMockCustomerWallets(), []);
  const transactions = useMemo(() => getMockCustomerTransactions(), []);

  const filteredWallets = useMemo(() => {
    if (!search.trim()) return wallets;
    const q = search.toLowerCase();
    return wallets.filter((w) => w.currency.toLowerCase().includes(q) || w.type.toLowerCase().includes(q));
  }, [wallets, search]);

  const totalBalance = useMemo(() => wallets.reduce((sum, w) => sum + w.balance, 0), [wallets]);
  const totalAvailable = useMemo(() => wallets.reduce((sum, w) => sum + w.availableBalance, 0), [wallets]);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Wallets</h1>
          <p className="text-sm text-[#7183A6] mt-0.5">Manage balances, monitor liquidity, and review settlements.</p>
        </div>
        <Button size="sm" className="self-start">
          <Plus className="w-4 h-4 mr-2" />
          New Wallet
        </Button>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card variant="glass" className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-4 h-4 text-[#7183A6]" />
            <span className="text-xs font-medium text-[#7183A6] uppercase tracking-wider">Total Balance</span>
          </div>
          <p className="text-2xl font-semibold text-white">{formatCurrency(totalBalance, 'USD')}</p>
          <p className="text-xs text-[#51617D] mt-1">Across {wallets.length} currencies</p>
        </Card>
        <Card variant="glass" className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#17C964]" />
            <span className="text-xs font-medium text-[#7183A6] uppercase tracking-wider">Available</span>
          </div>
          <p className="text-2xl font-semibold text-white">{formatCurrency(totalAvailable, 'USD')}</p>
          <p className="text-xs text-[#51617D] mt-1">Ready to transact</p>
        </Card>
        <Card variant="glass" className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[#F5A524]" />
            <span className="text-xs font-medium text-[#7183A6] uppercase tracking-wider">Reserved</span>
          </div>
          <p className="text-2xl font-semibold text-white">{formatCurrency(totalBalance - totalAvailable, 'USD')}</p>
          <p className="text-xs text-[#51617D] mt-1">In escrow & settlements</p>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7183A6]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search wallets..."
            className="bg-transparent border-none text-white text-sm placeholder-[#7183A6] outline-none flex-1"
          />
        </div>
        <button className="p-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-[#7183A6] hover:text-white transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filteredWallets.map((wallet) => {
          const accent = CURRENCY_COLORS[wallet.currency] ?? '#5E8DFF';
          const pctAvailable = wallet.balance > 0 ? (wallet.availableBalance / wallet.balance) * 100 : 0;

          return (
            <div
              key={wallet.id}
              className="relative flex flex-col p-5 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0B1020] to-[#0F1629] hover:border-white/[0.14] transition-all duration-200 overflow-hidden"
            >
              {/* Accent glow */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.08] blur-2xl pointer-events-none"
                style={{ backgroundColor: accent }}
              />

              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold"
                    style={{ backgroundColor: `${accent}14`, color: accent }}
                  >
                    {CURRENCY_SYMBOLS[wallet.currency] ?? wallet.currency}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{wallet.currency}</p>
                    <p className="text-[10px] text-[#51617D] uppercase tracking-wider">{wallet.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#17C964]/10 border border-[#17C964]/20">
                  <Shield className="w-3 h-3 text-[#17C964]" />
                  <span className="text-[10px] font-semibold text-[#17C964]">Active</span>
                </div>
              </div>

              <div className="mb-4 relative">
                <p className="text-2xl font-semibold text-white tracking-tight">
                  {formatCurrency(wallet.balance, wallet.currency)}
                </p>
              </div>

              <div className="space-y-2 mb-4 relative">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7183A6]">Available</span>
                  <span className="text-white font-medium">{formatCurrency(wallet.availableBalance, wallet.currency)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pctAvailable}%`, backgroundColor: accent }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7183A6]">Reserved</span>
                  <span className="text-[#7183A6]">{formatCurrency(wallet.reservedBalance, wallet.currency)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-auto relative">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-white hover:bg-white/[0.10] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Send
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-white hover:bg-white/[0.10] transition-colors">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  Deposit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transactions */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white tracking-tight">Recent Transactions</h2>
        <p className="text-xs text-[#7183A6] mt-0.5">Settlement activity across all wallets</p>
      </div>

      <div className="space-y-2">
        {transactions.map((tx) => {
          const dir = directionConfig[tx.type] ?? directionConfig.TRANSFER;
          const status = statusConfig[tx.status] ?? statusConfig.PROCESSING;
          const DirIcon = dir.icon;
          const StatusIcon = status.icon;

          return (
            <div
              key={tx.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                style={{ backgroundColor: `${dir.color}10`, color: dir.color }}
              >
                <DirIcon className="w-4 h-4" />
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">{tx.description}</p>
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0"
                    style={{ backgroundColor: `${status.color}10`, color: status.color }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#51617D] uppercase tracking-wider">{tx.type}</span>
                  <span className="text-[10px] text-[#51617D]">•</span>
                  <span className="text-[10px] text-[#51617D]">{formatRelativeTime(tx.createdAt)}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-white">
                  {dir.sign}{formatCurrency(tx.amount, tx.currency)}
                </p>
                <p className="text-[10px] text-[#51617D]">{tx.currency}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
