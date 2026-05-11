import { NextResponse } from 'next/server';
import { createEscrow } from '@cuboid/api-sdk';
import { ValidationError, idempotencyRepository } from '@cuboid/domain-core';
import { z } from 'zod';

const schema = z.object({
  organizationId: z.string().uuid(),
  quoteMatchId: z.string().uuid().optional(),
  amount: z.number().positive(),
  currency: z.string().length(3).toUpperCase(),
  walletId: z.string().uuid(),
  actorId: z.string().uuid(),
});

export async function POST(req: Request) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  
  try {
    const body = schema.parse(await req.json());
    
    const idempotencyKey = `escrow_${body.organizationId}_${body.walletId}_${body.amount}_${requestId}`;
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
      await idempotencyRepository.create(idempotencyKey, 'ESCROW', { ...body, requestId });
    }
    
    const result = await createEscrow(body);
    
    await idempotencyRepository.updateResponse(idempotencyKey, result.id, result);
    
    return NextResponse.json({ success: true, data: result, requestId, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'ESCROW_CREATE_FAILED', message: (err as Error).message, requestId, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
