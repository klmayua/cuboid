'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Building, MapPin, Clock, Shield, Plus, Edit, Trash2, Save } from 'lucide-react';

interface Desk {
  id: string;
  name: string;
  city: string;
  address: string;
  status: string;
  openTime: string;
  closeTime: string;
  licenseStatus: string;
}

interface FormData {
  name: string;
  city: string;
  address: string;
  openTime: string;
  closeTime: string;
  licenseStatus: string;
}

const CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City', 'Enugu', 'Warri'];

export default function BdcProfilePage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [desks, setDesks] = useState<Desk[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ name: '', city: 'Lagos', address: '', openTime: '08:00', closeTime: '17:00', licenseStatus: 'ACTIVE' });

  useEffect(() => { if (!orgId) return; loadDesks(); }, [orgId]);

  async function loadDesks() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bdc?organizationId=${orgId}&action=desks`);
      const json = await res.json();
      if (json.success) setDesks(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  function handleEdit(desk: Desk) {
    setForm({ name: desk.name, city: desk.city, address: desk.address || '', openTime: desk.openTime?.slice(0,5) || '08:00', closeTime: desk.closeTime?.slice(0,5) || '17:00', licenseStatus: desk.licenseStatus || 'ACTIVE' });
    setEditingId(desk.id);
    setShowForm(true);
  }

  const resetForm = () => { setForm({ name: '', city: 'Lagos', address: '', openTime: '08:00', closeTime: '17:00', licenseStatus: 'ACTIVE' }); setEditingId(null); setShowForm(false); };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Desks</h1>
          <p className="text-[#7183A6]">Manage BDC desks, branches, and locations.</p>
        </div>
        <Button size="sm" variant="secondary" leftIcon={showForm ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} onClick={resetForm}>{showForm ? 'Cancel' : 'Add Desk'}</Button>
      </div>

      {showForm && (
        <Card variant="glass" className="p-6 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">{editingId ? 'Edit Desk' : 'New Desk'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Desk name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <select value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50">
              {CITIES.map((c) => <option key={c} value={c} className="bg-[#0B1020]">{c}</option>)}
            </select>
            <input placeholder="Address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white placeholder:text-[#7183A6] focus:outline-none focus:border-brand-light-trust/50" />
            <input type="time" value={form.openTime} onChange={(e) => setForm((f) => ({ ...f, openTime: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50" />
            <input type="time" value={form.closeTime} onChange={(e) => setForm((f) => ({ ...f, closeTime: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50" />
            <select value={form.licenseStatus} onChange={(e) => setForm((f) => ({ ...f, licenseStatus: e.target.value }))} className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-brand-light-trust/50">
              <option value="ACTIVE" className="bg-[#0B1020]">Active</option>
              <option value="PENDING" className="bg-[#0B1020]">Pending</option>
              <option value="EXPIRED" className="bg-[#0B1020]">Expired</option>
            </select>
          </div>
        </Card>
      )}

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-20 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : desks.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]"><Building className="w-10 h-10 mx-auto mb-3 opacity-40" /><p className="text-sm">No desks configured.</p></div>
        ) : (
          <div className="space-y-3">
            {desks.map((desk) => (
              <div key={desk.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-deep-trust/20 flex items-center justify-center"><Building className="w-5 h-5 text-brand-light-trust" /></div>
                  <div>
                    <div className="flex items-center gap-2"><p className="text-sm text-white font-medium">{desk.name}</p><span className={`text-xs px-2 py-0.5 rounded-lg ${desk.status === 'OPEN' ? 'bg-semantic-success/10 text-semantic-success' : 'bg-white/10 text-[#7183A6]'}`}>{desk.status}</span></div>
                    <div className="flex items-center gap-3 text-xs text-[#7183A6]"><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{desk.city}</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{desk.openTime?.slice(0,5)}-{desk.closeTime?.slice(0,5)}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(desk)}>Edit</Button>
                  <Button variant="ghost" size="sm" className="text-semantic-danger hover:text-semantic-danger"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}