import { NextResponse } from 'next/server';
import { marketEngine } from '@cuboid/domain-core';
import { auditLog } from '@cuboid/domain-core';
import { globalEventBus } from '@cuboid/domain-core';
import { z } from 'zod';

const PublishSchema = z.object({
  organizationId: z.string().uuid(),
  actorId: z.string().uuid(),
  pairId: z.string().uuid().optional(),
  cuboidBuy: z.number().positive(),
  cuboidSell: z.number().positive(),
  corridor: z.string().optional(),
  city: z.string().optional(),
  liquidityDepth: z.number().nonnegative().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationId, actorId, pairId, cuboidBuy, cuboidSell, corridor, city, liquidityDepth } = PublishSchema.parse(body);

    await auditLog({
      actorId,
      action: 'RATE_PUBLISH',
      organizationId,
      metadata: { pairId, corridor, city, cuboidBuy, cuboidSell },
    });

    await globalEventBus.emit('RATE_PUBLISHED', {
      actorId,
      payload: { pairId, corridor, city, cuboidBuy, cuboidSell, liquidityDepth },
    });

    return NextResponse.json({
      success: true,
      message: 'Rate published',
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'PUBLISH_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}