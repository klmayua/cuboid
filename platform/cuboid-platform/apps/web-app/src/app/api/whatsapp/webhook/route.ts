export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { globalEventBus, auditLog } from '@cuboid/domain-core';
import { z } from 'zod';

const WhatsAppWebhookVerifySchema = z.object({
  'hub.mode': z.enum(['subscribe']),
  'hub.verify_token': z.string(),
  'hub.challenge': z.string().optional(),
});

const MAX_AGE_SECONDS = 300;
const EXPECTED_SIGNATURE_PREFIX = 'sha256=';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'cuboid_verify_token_' + Date.now();

  if (mode === 'subscribe') {
    if (token !== verifyToken) {
      await auditLog({
        actorId: 'system',
        action: 'WHATSAPP_WEBHOOK_VERIFY_FAILED',
        metadata: { reason: 'Invalid token provided' },
      });
      return NextResponse.json({
        success: false,
        errorCode: 'INVALID_VERIFY_TOKEN',
        message: 'Verification token mismatch',
      }, { status: 403 });
    }
    await auditLog({
      actorId: 'system',
      action: 'WHATSAPP_WEBHOOK_VERIFIED',
      metadata: { mode },
    });
    return new Response(challenge || 'OK', { status: 200 });
  }
  return NextResponse.json({ success: true, status: 'Webhook endpoint active' }, { status: 200 });
}

export async function POST(request: Request) {
  const requestId = `wa_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const timestamp = new Date().toISOString();

  try {
    const signature = request.headers.get('x-hub-signature-256') || undefined;
    const bodyText = await request.text();
    const body = JSON.parse(bodyText);

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) {
      return NextResponse.json({ success: true, requestId, timestamp });
    }

    const phone = message.from;
    const msgId = message.id;
    const msgTimestamp = new Date(parseInt(message.timestamp) * 1000);

    if (Date.now() - msgTimestamp.getTime() > MAX_AGE_SECONDS * 1000) {
      await auditLog({
        actorId: 'system',
        action: 'WHATSAPP_WEBHOOK_REPLAY_DETECTED',
        metadata: { requestId, msgTimestamp: msgTimestamp.toISOString() },
      });
      return NextResponse.json({
        success: false,
        errorCode: 'MESSAGE_TOO_OLD',
        message: 'Message timestamp exceeds replay protection threshold',
        requestId,
        timestamp,
      }, { status: 400 });
    }

    const identity = await pglite.query(
      'SELECT * FROM whatsapp_identities WHERE phone = $1',
      [phone]
    ).then(r => r.rows[0]);

    if (identity?.status === 'SUSPENDED') {
      await auditLog({
        actorId: 'system',
        action: 'WHATSAPP_MESSAGE_BLOCKED_SUSPENDED',
        metadata: { requestId, phone },
      });
      return NextResponse.json({
        success: false,
        errorCode: 'IDENTITY_SUSPENDED',
        message: 'This identity is suspended',
        requestId,
        timestamp,
      }, { status: 403 });
    }

    const conversation = await pglite.query(
      `SELECT * FROM whatsapp_conversations 
       WHERE whatsapp_id = $1 AND organization_id = $2 AND state IN ('PENDING', 'ACTIVE')
       ORDER BY created_at DESC LIMIT 1`,
      [identity?.id, 'default']
    ).then(r => r.rows[0]);

    const convId = conversation?.id || await pglite.query(
      `INSERT INTO whatsapp_conversations (whatsapp_id, organization_id, channel) VALUES ($1, 'default', 'INBOUND')
       RETURNING id`,
      [identity?.id]
    ).then(r => r.rows[0]?.id);

    const content = message.text?.body || '';
    const type = message.type || 'TEXT';

    const savedMessage = await pglite.query(
      `INSERT INTO whatsapp_messages (conversation_id, message_id, direction, type, body, status)
       VALUES ($1, $2, 'INBOUND', $3, $4, 'DELIVERED')
       RETURNING *`,
      [convId, msgId, type, content]
    ).then(r => r.rows[0]);

    await pglite.query(
      `UPDATE whatsapp_conversations SET last_message_at = NOW(), state = 'ACTIVE', updated_at = NOW() WHERE id = $1`,
      [convId]
    );

    await auditLog({
      actorId: identity?.userId || 'anonymous',
      action: 'WHATSAPP_INBOUND_RECEIVED',
      organizationId: 'default',
      metadata: { requestId, messageId: savedMessage.id, conversationId: convId, phone, type },
    });

    await globalEventBus.emit('WHATSAPP_MESSAGE_RECEIVED', {
      actorId: identity?.userId || 'system',
      payload: {
        requestId,
        messageId: savedMessage.id,
        conversationId: convId,
        phone,
        content,
        type,
      },
    });

    return NextResponse.json({
      success: true,
      data: { messageId: savedMessage.id, conversationId: convId },
      requestId,
      timestamp,
    });
  } catch (err) {
    console.error('[WhatsAppWebhook] Error:', err);
    await auditLog({
      actorId: 'system',
      action: 'WHATSAPP_WEBHOOK_ERROR',
      metadata: { requestId, error: (err as Error).message },
    });
    return NextResponse.json({
      success: false,
      errorCode: 'WEBHOOK_PROCESSING_ERROR',
      message: (err as Error).message,
      requestId,
      timestamp,
    }, { status: 500 });
  }
}