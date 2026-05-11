export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { listLiveQuotes, createQuote } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';
import { idempotencyRepository } from '@cuboid/domain-core';
import { z } from 'zod';

const QUOTE_IDEMPOTENCY_KEY_SCHEMA = z.object({
  organizationId: z.string().uuid(),
  pairId: z.string().uuid(),
  side: z.enum(['BUY', 'SELL']),
  amount: z.number().positive(),
  rate: z.number().positive(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId') ?? undefined;
    const quotes = await listLiveQuotes(orgId);
    return NextResponse.json({ success: true, data: quotes });
  } catch (err) {
    return NextResponse.json({ success: false, error: { code: 'QUOTE_ERROR', message: (err as Error).message } }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  
  try {
    const body = await req.json();
    const parsed = QUOTE_IDEMPOTENCY_KEY_SCHEMA.parse(body);
    
    const idempotencyKey = `quote_${parsed.organizationId}_${parsed.pairId}_${parsed.side}_${parsed.amount}_${requestId}`;
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
      await idempotencyRepository.create(idempotencyKey, 'QUOTE', { ...parsed, requestId });
    }
    
    const quote = await createQuote(body);
    
    await idempotencyRepository.updateResponse(idempotencyKey, quote.id, quote);
    
    return NextResponse.json({ success: true, data: quote, requestId, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, error: { code: err.code, message: err.message }, requestId, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: { code: 'QUOTE_CREATE_FAILED', message: (err as Error).message }, requestId, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
