import { notificationRepository } from '../repositories/NotificationRepository';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class NotificationService {
  private repo = notificationRepository;

  async create(data: {
    organizationId: string;
    userId: string;
    channel?: string;
    title: string;
    body: string;
    actorId: string;
  }) {
    const notification = await this.repo.create({
      organizationId: data.organizationId,
      userId: data.userId,
      channel: data.channel,
      title: data.title,
      body: data.body,
    });

    await globalEventBus.emit('NOTIFICATION_SENT', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { notificationId: notification.id, userId: data.userId },
    });

    return notification;
  }

  async listForUser(userId: string, organizationId?: string) {
    return this.repo.findByUser(userId, organizationId);
  }

  async markRead(id: string, actorId: string) {
    const notification = await this.repo.markRead(id);

    await globalEventBus.emit('NOTIFICATION_READ', {
      actorId,
      organizationId: notification.organizationId,
      payload: { notificationId: id },
    });

    return notification;
  }

  async markAllRead(userId: string) {
    return this.repo.markAllRead(userId);
  }

  async delete(id: string, actorId: string) {
    const notification = await this.repo.findById(id);
    await this.repo.delete(id);

    await auditLog({
      organizationId: notification.organizationId,
      actorId,
      action: 'NOTIFICATION_DELETED',
      entityType: 'Notification',
      entityId: id,
    });

    return { deleted: true };
  }
}

export const notificationService = new NotificationService();
