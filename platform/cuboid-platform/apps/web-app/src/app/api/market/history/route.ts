import { NextResponse } from 'next/server';
import { marketRepository } from '@cuboid/domain-core';
import { z } from 'zod';

const HistoryQuerySchema = z.object({
  pair: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.coerce.number().min(1).max(1000).default(100),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = HistoryQuerySchema.parse({
      pair: searchParams.get('pair') || undefined,
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      limit: searchParams.get('limit') || 100,
    });

    const snapshots = await marketRepository.getSnapshots(query.pair, query.limit);

    return NextResponse.json({
      success: true,
      data: snapshots.map((s) => ({
        pairId: s.pairId,
        weightedBuy: s.weightedBuy,
        weightedSell: s.weightedSell,
        midpoint: s.midpoint,
        spread: s.spread,
        volatility: s.volatility,
        liquidityScore: s.liquidityScore,
        confidenceScore: s.confidenceScore,
        sourceCount: s.sourceCount,
        snapshotAt: s.snapshotAt,
      })),
      meta: { count: snapshots.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'HISTORY_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}