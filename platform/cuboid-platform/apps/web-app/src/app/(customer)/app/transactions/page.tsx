'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { ArrowLeftRight, RefreshCw, Search, Filter, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  reference: string;
  createdAt: string;
}

export default function CustomerTransactionsPage() {
  const user = useAuthStore((state) => state.user);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => { if (user?.orgId) loadData(); }, [user?.orgId, filter]);

  async function loadData() {
    if (!user?.orgId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/transactions?organizationId=' + user.orgId + '&status=' + (filter === 'ALL' ? '' : filter));
      const json = await res.json();
      if (json.success) setTransactions(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Transactions</h1>
            <p className="text-[#7183A6]">Your transaction history.</p>
          </div>
          <button onClick={loadData} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
            <RefreshCw className="w-4 h-4 text-[#7183A6]" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          {['ALL', 'PENDING', 'EXECUTING', 'COMPLETED', 'FAILED'].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === s ? 'bg-brand-light-trust/20 text-brand-light-trust' : 'text-[#7183A6] hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>

        <Card variant="glass" className="p-6">
          {loading ? (
            <div className="space-y-3">{[1,2,3,4,5].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]">
              <ArrowLeftRight className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No transactions</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${txn.type === 'CREDIT' ? 'bg-semantic-success/10' : 'bg-semantic-danger/10'}`}>
                      {txn.type === 'CREDIT' ? <ArrowDownRight className="w-5 h-5 text-semantic-success" /> : <ArrowUpRight className="w-5 h-5 text-semantic-danger" />}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{txn.type}</p>
                      <p className="text-xs text-[#7183A6]">{txn.reference} · {new Date(txn.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`text-sm font-medium ${txn.type === 'CREDIT' ? 'text-semantic-success' : 'text-semantic-danger'}`}>
                      {txn.type === 'CREDIT' ? '+' : '-'}{txn.amount?.toLocaleString('en-NG')} {txn.currency}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-lg ${txn.status === 'COMPLETED' ? 'bg-semantic-success/10 text-semantic-success' : txn.status === 'FAILED' ? 'bg-semantic-danger/10 text-semantic-danger' : 'bg-semantic-warning/10 text-semantic-warning'}`}>{txn.status}</span>
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