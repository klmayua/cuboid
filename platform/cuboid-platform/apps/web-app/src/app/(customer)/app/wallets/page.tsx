'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Wallet, Plus, Search, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

interface WalletData {
  id: string;
  currency: string;
  balance: number;
  availableBalance: number;
  reservedBalance: number;
}

export default function CustomerWalletsPage() {
  const user = useAuthStore((state) => state.user);
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user?.orgId) loadWallets(); }, [user?.orgId]);

  async function loadWallets() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/wallets?organizationId=' + user.orgId);
      const json = await res.json();
      if (json.success) setWallets(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Wallets</h1>
            <p className="text-[#7183A6]">Manage your multi-currency wallets.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadWallets} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
              <RefreshCw className="w-4 h-4 text-[#7183A6]" />
            </button>
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Wallet</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {['NGN', 'USD', 'GBP', 'EUR', 'AED'].map((currency) => {
            const wallet = wallets.find((w) => w.currency === currency);
            return (
              <Card key={currency} variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#7183A6]">{currency} Wallet</span>
                  <Wallet className="w-4 h-4 text-brand-light-trust" />
                </div>
                <p className="text-2xl font-display text-white mb-1">
                  {wallet?.availableBalance?.toLocaleString('en-NG', { style: 'currency', currency }) ?? 
                   new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(0)}
                </p>
                {wallet?.reservedBalance != null && wallet.reservedBalance > 0 && (
                  <p className="text-xs text-semantic-warning">{wallet.reservedBalance?.toLocaleString()} reserved</p>
                )}
              </Card>
            );
          })}
        </div>

        <Card variant="glass" className="p-6">
          <h2 className="text-lg font-medium text-white mb-6">All Wallets</h2>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : wallets.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <Wallet className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No wallets configured</p>
            </div>
          ) : (
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-brand-light-trust">{wallet.currency}</span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{wallet.currency} Wallet</p>
                      <p className="text-xs text-[#7183A6]">Available: {wallet.availableBalance?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">Total</p>
                    <p className="text-sm text-[#7183A6]">{wallet.balance?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </CustomerAppLayout>
  );
}