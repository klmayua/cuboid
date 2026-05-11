import { notificationService } from '@cuboid/domain-core';

export async function listNotifications(userId: string, organizationId?: string) {
  return notificationService.listForUser(userId, organizationId);
}

export async function markNotificationRead(id: string, actorId: string) {
  return notificationService.markRead(id, actorId);
}

export async function markAllNotificationsRead(userId: string) {
  return notificationService.markAllRead(userId);
}

export async function deleteNotification(id: string, actorId: string) {
  return notificationService.delete(id, actorId);
}

export async function createNotification(data: Parameters<typeof notificationService.create>[0]) {
  return notificationService.create(data);
}
