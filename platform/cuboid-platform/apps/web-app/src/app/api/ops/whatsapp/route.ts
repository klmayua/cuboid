import { NextResponse } from 'next/server';
import { whatsappService, idempotencyRepository } from '@cuboid/domain-core';
import { z } from 'zod';

const SendMessageSchema = z.object({
  conversationId: z.string().uuid(),
  body: z.string().min(1),
  type: z.string().optional(),
  payload: z.record(z.any()).optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conversationId');
  const organizationId = searchParams.get('organizationId');
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    if (conversationId) {
      const messages = await whatsappService.getMessages(conversationId, limit);
      return NextResponse.json({
        success: true,
        data: messages,
        meta: { count: messages.length },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }

    const conversations = await whatsappService.getActiveConversations(organizationId || 'default', limit);
    return NextResponse.json({
      success: true,
      data: conversations,
      meta: { count: conversations.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'WHATSAPP_OPS_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  
  try {
    const body = await request.json();
    const { conversationId, body: messageBody, type, payload } = SendMessageSchema.parse(body);
    
    const idempotencyKey = `whatsapp_${conversationId}_${messageBody}_${requestId}`;
    const existing = await idempotencyRepository.get(idempotencyKey);
    
    if (existing && existing.response) {
      return NextResponse.json({ 
        success: true, 
        data: existing.response,
        idempotent重复: true,
        requestId, 
        timestamp: new Date().toISOString() 
      });
    }
    
    if (!existing) {
      await idempotencyRepository.create(idempotencyKey, 'WHATSAPP_MESSAGE', { conversationId, body: messageBody, type, payload, requestId });
    }
    
    const message = await whatsappService.sendMessage(conversationId, messageBody, type, payload);
    
    await idempotencyRepository.updateResponse(idempotencyKey, message.id, message);
    
    return NextResponse.json({
      success: true,
      data: message,
      requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: (err as Error).message,
        requestId,
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'WHATSAPP_SEND_ERROR',
      message: (err as Error).message,
      requestId,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}