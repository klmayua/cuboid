'use client';

import { useEffect, useState } from 'react';
import { Card } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { Bell, Check, Trash2, AlertTriangle } from 'lucide-react';

export default function BrokerNotificationsPage() {
  const user = useAuthStore(selectUser);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/notifications?userId=${user.id}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setNotifications(json.data ?? []); })
      .finally(() => setLoading(false));
  }, [user?.id]);

  async function markRead(id: string) {
    await fetch(`/api/notifications/${id}`, { method: 'PATCH', body: JSON.stringify({}) });
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, readAt: new Date().toISOString() } : n)));
  }

  async function markAllRead() {
    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'markAllRead', userId: user?.id }),
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, readAt: new Date().toISOString() })));
  }

  async function deleteNotif(id: string) {
    await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Notifications</h1>
          <p className="text-[#7183A6]">Alerts from leads, market, settlements, and trust.</p>
        </div>
        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-sm text-white hover:bg-white/[0.08] transition-colors flex items-center gap-2"
        >
          <Check className="w-4 h-4" /> Mark all read
        </button>
      </div>

      <Card variant="glass" className="p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 text-[#7183A6]">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-white mb-2">All caught up</p>
            <p className="text-sm max-w-md mx-auto">Notifications appear here for leads, market moves, settlement updates, and trust changes.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-colors ${n.readAt ? 'bg-white/[0.02]' : 'bg-white/[0.04]'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 mt-1.5 rounded-full ${n.readAt ? 'bg-[#7183A6]' : 'bg-semantic-warning'}`} />
                  <div>
                    <p className={`text-sm font-medium ${n.readAt ? 'text-[#7183A6]' : 'text-white'}`}>{n.title}</p>
                    <p className="text-xs text-[#7183A6]">{n.body}</p>
                    <p className="text-xs text-[#7183A6] mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!n.readAt && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="p-2 rounded-lg hover:bg-white/[0.06] text-[#7183A6] hover:text-white transition-colors"
                      title="Mark read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotif(n.id)}
                    className="p-2 rounded-lg hover:bg-white/[0.06] text-[#7183A6] hover:text-semantic-danger transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
