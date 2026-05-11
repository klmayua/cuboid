import { NextResponse } from 'next/server';
import { marketEngine } from '@cuboid/domain-core';
import { auditLog } from '@cuboid/domain-core';
import { z } from 'zod';

const AggregateSchema = z.object({
  organizationId: z.string().uuid(),
  actorId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationId, actorId } = AggregateSchema.parse(body);

    await auditLog({
      actorId,
      action: 'MARKET_AGGREGATE',
      organizationId,
      metadata: { triggeredAt: new Date().toISOString() },
    });

    const results = await marketEngine.aggregateAndPublish(actorId);

    return NextResponse.json({
      success: true,
      data: results.map((r) => ({
        pairId: r.pairId,
        symbol: r.symbol,
        cuboidBuy: r.cuboidBuy,
        cuboidSell: r.cuboidSell,
        cuboidMidpoint: r.cuboidMidpoint,
        spread: r.spread,
        confidence: r.confidence,
        trend: r.trend,
        liquidityDepth: r.liquidityDepth,
      })),
      meta: { count: results.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'AGGREGATE_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}