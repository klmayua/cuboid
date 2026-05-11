import { NextResponse } from 'next/server';
import { clearSettlement } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';
import { z } from 'zod';

const schema = z.object({
  id: z.string().uuid(),
  channel: z.string(),
  actorId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const result = await clearSettlement(body.id, body.channel, body.actorId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'SETTLEMENT_CLEAR_FAILED', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
