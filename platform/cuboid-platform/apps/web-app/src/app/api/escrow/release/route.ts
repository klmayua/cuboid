import { NextResponse } from 'next/server';
import { releaseEscrow } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';
import { z } from 'zod';

const schema = z.object({
  id: z.string().uuid(),
  walletId: z.string().uuid(),
  actorId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const result = await releaseEscrow(body.id, body.walletId, body.actorId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'ESCROW_RELEASE_FAILED', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
