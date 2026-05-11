'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Send, Plus, Bell, Shield, FileText, AlertTriangle, RefreshCw, ArrowLeftRight } from 'lucide-react';

interface WalletData {
  id: string;
  currency: string;
  availableBalance: number;
  reservedBalance: number;
  balance: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export default function CustomerHomePage() {
  const user = useAuthStore((state) => state.user);
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, [user?.orgId]);

  async function loadData() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const [walletRes, txRes, trustRes] = await Promise.all([
        fetch('/api/wallets'),
        fetch('/api/transactions?limit=10'),
        fetch('/api/trust'),
      ]);
      const [walletJson, txJson, trustJson] = await Promise.all([walletRes.json(), txRes.json(), trustRes.json()]);
      if (walletJson.success) setWallets(walletJson.data ?? []);
      if (txJson.success) setTransactions(txJson.data ?? []);
      if (trustJson.success) setTrustScore(trustJson.data?.score ?? null);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const totalNaira = wallets.find((w) => w.currency === 'NGN');

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Welcome back</h1>
            <p className="text-[#7183A6]">Your FX dashboard at a glance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadData} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
              <RefreshCw className="w-4 h-4 text-[#7183A6]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="glass" size="compact">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7183A6]">Available Balance</span>
              <Wallet className="w-4 h-4 text-brand-light-trust" />
            </div>
            <p className="text-xl font-display text-white">
              {totalNaira?.availableBalance?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) ?? '₦0.00'}
            </p>
          </Card>

          <Card variant="glass" size="compact">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7183A6]">Trust Score</span>
              <Shield className="w-4 h-4 text-semantic-success" />
            </div>
            <p className="text-xl font-display text-white">{trustScore ?? '—'}</p>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-semantic-success rounded-full" style={{ width: `${trustScore ?? 0}%` }} />
            </div>
          </Card>

          <Card variant="glass" size="compact">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7183A6]">This Month</span>
              <TrendingUp className="w-4 h-4 text-semantic-success" />
            </div>
            <p className="text-xl font-display text-white">
              {transactions.filter((t) => t.status === 'COMPLETED').length} txns
            </p>
          </Card>

          <Card variant="glass" size="compact">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7183A6]">Pending</span>
              <AlertTriangle className="w-4 h-4 text-semantic-warning" />
            </div>
            <p className="text-xl font-display text-white">
              {transactions.filter((t) => t.status === 'PENDING').length} txns
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-white">Your Wallets</h2>
                <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Wallet</Button>
              </div>
              {loading ? (
                <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
              ) : wallets.length === 0 ? (
                <div className="text-center py-8 text-[#7183A6]">
                  <Wallet className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p>No wallets yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {wallets.map((wallet) => (
                    <div key={wallet.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-brand-light-trust">{wallet.currency}</span>
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{wallet.currency} Wallet</p>
                          <p className="text-xs text-[#7183A6]">Available</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white font-medium">
                          {wallet.availableBalance?.toLocaleString('en-NG', { style: 'currency', currency: wallet.currency })}
                        </p>
                        {wallet.reservedBalance > 0 && (
                          <p className="text-xs text-semantic-warning">{wallet.reservedBalance?.toLocaleString()} reserved</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <Send className="w-5 h-5 text-brand-light-trust" />
                  <span className="text-sm text-white">Send Money</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#7183A6]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <ArrowDownRight className="w-5 h-5 text-brand-light-trust" />
                  <span className="text-sm text-white">Receive</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#7183A6]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-brand-light-trust" />
                  <span className="text-sm text-white">Get Quote</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#7183A6]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-brand-light-trust" />
                  <span className="text-sm text-white">Add Beneficiary</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#7183A6]" />
              </button>
            </div>
          </Card>
        </div>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Recent Transactions</h2>
            <a href="/app/transactions" className="text-sm text-brand-light-trust hover:text-white">View All</a>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-[#7183A6]">
              <ArrowLeftRight className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 5).map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${txn.type === 'CREDIT' ? 'bg-semantic-success/10' : 'bg-semantic-danger/10'}`}>
                      {txn.type === 'CREDIT' ? <ArrowDownRight className="w-4 h-4 text-semantic-success" /> : <ArrowUpRight className="w-4 h-4 text-semantic-danger" />}
                    </div>
                    <div>
                      <p className="text-sm text-white">{txn.type}</p>
                      <p className="text-xs text-[#7183A6]">{new Date(txn.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`text-sm font-medium ${txn.type === 'CREDIT' ? 'text-semantic-success' : 'text-semantic-danger'}`}>
                      {txn.type === 'CREDIT' ? '+' : '-'}{txn.amount?.toLocaleString('en-NG')} {txn.currency}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-lg ${txn.status === 'COMPLETED' ? 'bg-semantic-success/10 text-semantic-success' : txn.status === 'PENDING' ? 'bg-semantic-warning/10 text-semantic-warning' : 'bg-white/10 text-[#7183A6]'}`}>{txn.status}</span>
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