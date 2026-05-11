'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Bell, CheckCheck, Trash2, Settings, ChevronRight, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function BdcNotificationsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!orgId) return; loadNotifications(); }, [orgId]);

  async function loadNotifications() {
    setLoading(true);
    try {
      const res = await fetch(`/api/bdc?organizationId=${orgId}&action=notifications`);
      const json = await res.json();
      if (json.success) setNotifications(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Notifications</h1>
          <p className="text-[#7183A6]">Real-time alerts and system updates.</p>
        </div>
        <Button size="sm" variant="secondary" leftIcon={<CheckCheck className="w-4 h-4" />} disabled={unreadCount === 0}>Mark All Read</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Bell className="w-4 h-4 text-brand-light-trust" /><span className="text-xs text-[#7183A6]">Total</span></div>
          <p className="text-xl font-display text-white">{notifications.length}</p>
        </Card>
        <Card variant="glass" size="compact">
          <div className="flex items-center gap-2 mb-2"><Bell className="w-4 h-4 text-semantic-warning" /><span className="text-xs text-[#7183A6]">Unread</span></div>
          <p className="text-xl font-display text-white">{unreadCount}</p>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Activity</h2>
          <Link href="/bdc/settings" className="text-sm text-brand-light-trust hover:text-white transition-colors flex items-center gap-1"><Settings className="w-4 h-4" />Settings</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 text-[#7183A6]"><Bell className="w-10 h-10 mx-auto mb-3 opacity-40" /><p className="text-sm">No notifications yet.</p></div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${n.read ? 'bg-white/[0.02]' : 'bg-white/[0.06] border-l-2 border-brand-light-trust'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    {n.type === 'DEAL' ? <Info className="w-4 h-4 text-semantic-info" /> : n.type === 'RATE' ? <AlertTriangle className="w-4 h-4 text-semantic-warning" /> : <Bell className="w-4 h-4 text-[#7183A6]" />}
                  </div>
                  <div><p className={`text-sm ${n.read ? 'text-[#7183A6]' : 'text-white'}`}>{n.title}</p><p className="text-xs text-[#7183A6]">{n.message}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  {!n.read && <Button variant="ghost" size="sm">Mark Read</Button>}
                  <Button variant="ghost" size="sm" className="text-[#7183A6] hover:text-semantic-danger"><Trash2 className="w-4 h-4" /></Button>
                  <span className="text-xs text-[#7183A6]">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}