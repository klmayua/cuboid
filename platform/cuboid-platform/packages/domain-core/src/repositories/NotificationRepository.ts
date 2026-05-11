import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError } from '../errors';

export class NotificationRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    userId: string;
    channel?: string;
    title: string;
    body: string;
  }) {
    return this.db.notification.create({
      data: {
        organizationId: data.organizationId,
        userId: data.userId,
        channel: data.channel as any ?? 'IN_APP',
        title: data.title,
        body: data.body,
      },
    });
  }

  async findByUser(userId: string, organizationId?: string) {
    return this.db.notification.findMany({
      where: {
        userId,
        ...(organizationId && { organizationId }),
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async findById(id: string) {
    const n = await this.db.notification.findUnique({ where: { id } });
    if (!n) throw new NotFoundError('Notification');
    return n;
  }

  async markRead(id: string) {
    return this.db.notification.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  async markAllRead(userId: string) {
    return this.db.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  async delete(id: string) {
    return this.db.notification.delete({ where: { id } });
  }
}

export const notificationRepository = new NotificationRepository();
