import { pglite } from '@cuboid/database';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';
import { z } from 'zod';

export interface WhatsAppIdentity {
  id: string;
  userId: string | null;
  phone: string;
  countryCode: string;
  verified: boolean;
  optedIn: boolean;
  language: string;
  timezone: string;
  lastSeenAt: Date | null;
  trustScore: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WhatsAppConversation {
  id: string;
  whatsappId: string;
  organizationId: string;
  state: string;
  channel: string;
  assignedTo: string | null;
  workflow: string | null;
  context: Record<string, any> | null;
  lastMessageAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WhatsAppMessage {
  id: string;
  conversationId: string;
  messageId: string | null;
  direction: string;
  type: string;
  body: string;
  payload: Record<string, any> | null;
  status: string;
  mediaUrl: string | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  createdAt: Date;
}

export interface WorkflowJob {
  id: string;
  organizationId: string;
  workflow: string;
  subjectType: string;
  subjectId: string;
  state: string;
  attempts: number;
  maxAttempts: number;
  error: string | null;
  nextRetryAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
}

const WhatsAppIdentitySchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().nullable(),
  phone: z.string(),
  countryCode: z.string().default('+234'),
  verified: z.boolean().default(false),
  optedIn: z.boolean().default(true),
  language: z.string().default('en'),
  timezone: z.string().default('Africa/Lagos'),
});

export class WhatsAppService {
  async findOrCreateIdentity(phone: string, countryCode: string = '+234'): Promise<WhatsAppIdentity> {
    const normalized = this.normalizePhone(phone, countryCode);
    
    let existing = await pglite.query(
      'SELECT * FROM whatsapp_identities WHERE phone = $1',
      [normalized]
    ).then(r => r.rows[0]);

    if (existing) {
      await pglite.query(
        'UPDATE whatsapp_identities SET last_seen_at = NOW() WHERE id = $1',
        [existing.id]
      );
      return existing as WhatsAppIdentity;
    }

    const newIdentity = await pglite.query(
      `INSERT INTO whatsapp_identities (phone, country_code) VALUES ($1, $2) 
       RETURNING *`,
      [normalized, countryCode]
    ).then(r => r.rows[0]);

    await auditLog({
      actorId: 'system',
      action: 'WHATSAPP_IDENTITY_CREATED',
      organizationId: 'system',
      metadata: { phone: normalized },
    });

    return newIdentity as WhatsAppIdentity;
  }

  async getOrCreateConversation(
    whatsappId: string,
    organizationId: string,
    channel: string = 'INBOUND'
  ): Promise<WhatsAppConversation> {
    const existing = await pglite.query(
      `SELECT * FROM whatsapp_conversations 
       WHERE whatsapp_id = $1 AND organization_id = $2 AND state IN ('PENDING', 'ACTIVE')
       ORDER BY created_at DESC LIMIT 1`,
      [whatsappId, organizationId]
    ).then(r => r.rows[0]);

    if (existing) {
      return existing as WhatsAppConversation;
    }

    const conversation = await pglite.query(
      `INSERT INTO whatsapp_conversations (whatsapp_id, organization_id, channel) VALUES ($1, $2, $3)
       RETURNING *`,
      [whatsappId, organizationId, channel]
    ).then(r => r.rows[0]);

    await globalEventBus.emit('WHATSAPP_CONVERSATION_STARTED', {
      actorId: 'system',
      payload: { conversationId: conversation.id, whatsappId, organizationId },
    });

    return conversation as WhatsAppConversation;
  }

  async receiveMessage(
    conversationId: string,
    body: string,
    type: string = 'TEXT',
    mediaUrl?: string
  ): Promise<WhatsAppMessage> {
    const message = await pglite.query(
      `INSERT INTO whatsapp_messages (conversation_id, direction, type, body, media_url)
       VALUES ($1, 'INBOUND', $2, $3, $4) RETURNING *`,
      [conversationId, type, body, mediaUrl ?? null]
    ).then(r => r.rows[0]);

    await pglite.query(
      `UPDATE whatsapp_conversations SET last_message_at = NOW(), updated_at = NOW() WHERE id = $1`,
      [conversationId]
    );

    await globalEventBus.emit('WHATSAPP_MESSAGE_RECEIVED', {
      actorId: 'system',
      payload: { messageId: message.id, conversationId, body },
    });

    return message as WhatsAppMessage;
  }

  async sendMessage(
    conversationId: string,
    body: string,
    type: string = 'TEXT',
    payload?: Record<string, any>
  ): Promise<WhatsAppMessage> {
    const message = await pglite.query(
      `INSERT INTO whatsapp_messages (conversation_id, direction, type, body, payload)
       VALUES ($1, 'OUTBOUND', $2, $3, $4) RETURNING *`,
      [conversationId, type, body, payload ? JSON.stringify(payload) : null]
    ).then(r => r.rows[0]);

    await globalEventBus.emit('WHATSAPP_MESSAGE_SENT', {
      actorId: 'system',
      payload: { messageId: message.id, conversationId, body },
    });

    return message as WhatsAppMessage;
  }

  async updateMessageStatus(
    messageId: string,
    status: string,
    deliveredAt?: Date,
    readAt?: Date
  ): Promise<void> {
    const updates: string[] = ['status = $2'];
    const params: any[] = [messageId, status];
    let idx = 3;

    if (deliveredAt) {
      updates.push(`delivered_at = $${idx++}`);
      params.push(deliveredAt);
    }
    if (readAt) {
      updates.push(`read_at = $${idx++}`);
      params.push(readAt);
    }

    await pglite.query(
      `UPDATE whatsapp_messages SET ${updates.join(', ')} WHERE id = $1`,
      params
    );
  }

  async assignConversation(
    conversationId: string,
    assignedTo: string
  ): Promise<void> {
    await pglite.query(
      `UPDATE whatsapp_conversations SET assigned_to = $2, state = 'ASSIGNED' WHERE id = $1`,
      [conversationId, assignedTo]
    );
  }

  async completeConversation(conversationId: string): Promise<void> {
    await pglite.query(
      `UPDATE whatsapp_conversations SET state = 'COMPLETED', updated_at = NOW() WHERE id = $1`,
      [conversationId]
    );
  }

  async scheduleWorkflow(
    organizationId: string,
    workflow: string,
    subjectType: string,
    subjectId: string,
    runAt?: Date
  ): Promise<WorkflowJob> {
    const job = await pglite.query(
      `INSERT INTO workflow_jobs (organization_id, workflow, subject_type, subject_id, next_retry_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [organizationId, workflow, subjectType, subjectId, runAt ?? null]
    ).then(r => r.rows[0]);

    await globalEventBus.emit('WORKFLOW_STARTED', {
      actorId: 'system',
      payload: { jobId: job.id, workflow, subjectType, subjectId },
    });

    return job as WorkflowJob;
  }

  async getActiveConversations(
    organizationId: string,
    limit: number = 50
  ): Promise<WhatsAppConversation[]> {
    return await pglite.query(
      `SELECT c.*, w.phone as whatsapp_phone, w.language as whatsapp_language
       FROM whatsapp_conversations c
       JOIN whatsapp_identities w ON c.whatsapp_id = w.id
       WHERE c.organization_id = $1 AND c.state IN ('PENDING', 'ACTIVE', 'ASSIGNED')
       ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC
       LIMIT $2`,
      [organizationId, limit]
    ).then(r => r.rows as WhatsAppConversation[]);
  }

  async getMessages(
    conversationId: string,
    limit: number = 100
  ): Promise<WhatsAppMessage[]> {
    return await pglite.query(
      `SELECT * FROM whatsapp_messages 
       WHERE conversation_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2`,
      [conversationId, limit]
    ).then(r => r.rows as WhatsAppMessage[]);
  }

  async getPendingWorkflows(
    organizationId: string,
    limit: number = 50
  ): Promise<WorkflowJob[]> {
    return await pglite.query(
      `SELECT * FROM workflow_jobs 
       WHERE organization_id = $1 AND state IN ('PENDING', 'RETRY')
       AND (next_retry_at IS NULL OR next_retry_at <= NOW())
       ORDER BY created_at ASC
       LIMIT $2`,
      [organizationId, limit]
    ).then(r => r.rows as WorkflowJob[]);
  }

  async markWorkflowComplete(jobId: string): Promise<void> {
    const job = await pglite.query('SELECT * FROM workflow_jobs WHERE id = $1', [jobId]).then(r => r.rows[0]);
    
    await pglite.query(
      `UPDATE workflow_jobs SET state = 'COMPLETED', completed_at = NOW() WHERE id = $1`,
      [jobId]
    );

    await globalEventBus.emit('WORKFLOW_COMPLETED', {
      actorId: 'system',
      payload: { jobId, workflow: job?.workflow, subjectType: job?.subject_type, subjectId: job?.subject_id },
    });
  }

  async markWorkflowFailed(jobId: string, error: string): Promise<void> {
    const job = await pglite.query('SELECT * FROM workflow_jobs WHERE id = $1', [jobId]).then(r => r.rows[0]);
    
    if (job && job.attempts + 1 >= job.max_attempts) {
      await pglite.query(
        `UPDATE workflow_jobs SET state = 'FAILED', error = $2, attempts = attempts + 1 WHERE id = $1`,
        [jobId, error]
      );

      await globalEventBus.emit('WORKFLOW_FAILED', {
        actorId: 'system',
        payload: { jobId, error, workflow: job?.workflow },
      });
    } else {
      const nextRetry = new Date(Date.now() + (job?.attempts ?? 0) * 60000 * 5);
      await pglite.query(
        `UPDATE workflow_jobs SET state = 'RETRY', error = $2, attempts = attempts + 1, next_retry_at = $3 WHERE id = $1`,
        [jobId, error, nextRetry]
      );
    }
  }

  private normalizePhone(phone: string, countryCode: string = '+234'): string {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith(countryCode)) return cleaned;
    if (cleaned.startsWith('0')) return countryCode + cleaned.slice(1);
    if (cleaned.startsWith('234')) return '+' + cleaned;
    return countryCode + cleaned;
  }
}

export const whatsappService = new WhatsAppService();