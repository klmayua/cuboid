'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Package, Plus, DollarSign, AlertTriangle } from 'lucide-react';

interface Inventory {
  id: string;
  currency: string;
  available: number;
  reserved: number;
  minimumThreshold: number;
  lowInventoryAlert: boolean;
  desk: { name: string } | null;
}

export default function BdcInventoryPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { if (!orgId) return; loadInventory(); }, [orgId]);

  async function loadInventory() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bdc?organizationId=${orgId}&action=inventory`);
      const json = await res.json();
      if (json.success) setInventory(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Inventory</h1>
          <p className="text-[#7183A6]">Cash and currency balances across desks.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="secondary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Add Inventory'}</Button>
        </div>
      </div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Desk Balances</h2>
          <Link href="/bdc/profile" className="text-sm text-brand-light-trust hover:text-white transition-colors">Manage Desks</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]"><Package className="w-10 h-10 mx-auto mb-3 opacity-40" /><p className="text-sm">No inventory tracked yet.</p></div>
        ) : (
          <div className="space-y-2">
            {inventory.map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl ${item.lowInventoryAlert ? 'bg-semantic-danger/5 border border-semantic-danger/20' : 'bg-white/[0.04]'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center"><span className="text-sm font-medium text-brand-light-trust">{item.currency}</span></div>
                  <div><p className="text-sm text-white font-medium">{item.desk?.name ?? 'Unassigned'}</p><p className="text-xs text-[#7183A6]">Available {Number(item.available).toLocaleString()} · Reserved {Number(item.reserved).toLocaleString()}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  {item.lowInventoryAlert && <span className="text-xs text-semantic-warning flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Below threshold</span>}
                  <Button variant="ghost" size="sm">Add Stock</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}