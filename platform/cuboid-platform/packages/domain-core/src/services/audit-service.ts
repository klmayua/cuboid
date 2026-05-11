import { prisma } from '@cuboid/database';

export interface AuditLogInput {
  organizationId?: string;
  actorId?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  requestId?: string;
}

export async function auditLog(input: AuditLogInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        organizationId: input.organizationId ?? 'default',
        actorId: input.actorId ?? null,
        action: input.action,
        entityType: input.entityType ?? 'SYSTEM',
        entityId: input.entityId ?? input.requestId ?? 'unknown',
        metadataJson: (input.metadata ?? {}) as any,
        ip: input.ip ?? null,
      },
    });
  } catch {
    // Audit failures must not break the main flow
    // In production, this should be sent to a dead-letter queue
  }
}
