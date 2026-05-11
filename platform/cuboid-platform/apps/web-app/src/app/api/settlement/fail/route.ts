import { NextResponse } from 'next/server';
import { failSettlement } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';
import { z } from 'zod';

const schema = z.object({
  id: z.string().uuid(),
  actorId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const result = await failSettlement(body.id, body.actorId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'SETTLEMENT_FAIL_FAILED', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
