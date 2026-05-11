'use client';

import { useEffect, useState } from 'react';
import { CustomerAppLayout } from '@/components/CustomerAppLayout';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore } from '@/features/auth';
import { Bell, CheckCheck, Trash2, RefreshCw, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  body: string;
  readAt: string | null;
  createdAt: string;
}

export default function CustomerNotificationsPage() {
  const user = useAuthStore((state) => state.user);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user?.id) loadNotifications(); }, [user?.id]);

  async function loadNotifications() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await fetch('/api/notifications?userId=' + user.id);
      const json = await res.json();
      if (json.success) setNotifications(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function markAllRead() {
    try {
      await fetch('/api/notifications/mark-all-read', { method: 'POST' });
      loadNotifications();
    } catch { /* silent */ }
  }

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return (
    <CustomerAppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-light text-white mb-2">Notifications</h1>
            <p className="text-[#7183A6]">Your alerts and updates.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadNotifications} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1]">
              <RefreshCw className="w-4 h-4 text-[#7183A6]" />
            </button>
            <Button size="sm" variant="secondary" leftIcon={<CheckCheck className="w-4 h-4" />} onClick={markAllRead} disabled={unreadCount === 0}>Mark All Read</Button>
          </div>
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
          {loading ? (
            <div className="space-y-3">{[1,2,3,4,5].map((i) => <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />)}</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12 text-[#7183A6]"><Bell className="w-10 h-10 mx-auto mb-3 opacity-40" /><p>No notifications</p></div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif) => (
                <div key={notif.id} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${notif.readAt ? 'bg-white/[0.02]' : 'bg-white/[0.06] border-l-2 border-brand-light-trust'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-[#7183A6]" />
                    </div>
                    <div>
                      <p className={`text-sm ${notif.readAt ? 'text-[#7183A6]' : 'text-white'}`}>{notif.title}</p>
                      <p className="text-xs text-[#7183A6]">{notif.body}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7183A6]">{new Date(notif.createdAt).toLocaleString()}</span>
                    {!notif.readAt && <Button variant="ghost" size="sm">Mark Read</Button>}
                    <Button variant="ghost" size="sm" className="text-[#7183A6] hover:text-semantic-danger"><Trash2 className="w-4 h-4" /></Button>
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