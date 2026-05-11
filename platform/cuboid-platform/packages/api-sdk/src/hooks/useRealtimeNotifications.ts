"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export function useRealtimeNotifications(
  listUrl: string = '/api/notifications',
  userId?: string,
  organizationId?: string
) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const params = new URLSearchParams();
      params.set('userId', userId);
      if (organizationId) params.set('organizationId', organizationId);
      const res = await fetch(`${listUrl}?${params.toString()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNotifications(json.data);
        setUnreadCount(json.data.filter((n: any) => !n.readAt).length);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [listUrl, userId, organizationId]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markRead = useCallback(
    async (id: string) => {
      try {
        await fetch(`${listUrl}/${id}`, { method: 'PATCH', body: JSON.stringify({}) });
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
        setUnreadCount((c) => Math.max(0, c - 1));
      } catch {
        // silent
      }
    },
    [listUrl]
  );

  return { notifications, unreadCount, loading, markRead, refetch: fetchNotifications };
}
