import { NextResponse } from 'next/server';
import { marketRepository, shouldUseMockData } from '@cuboid/domain-core';
import { getMockLiquidityDistribution } from '@cuboid/domain-core/mock';
import { z } from 'zod';

const LiquidityQuerySchema = z.object({
  corridor: z.string().optional(),
  city: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = LiquidityQuerySchema.parse({
      corridor: searchParams.get('corridor') || undefined,
      city: searchParams.get('city') || undefined,
    });

    const liquidity = await marketRepository.getLiquidityDistribution();

    return NextResponse.json({
      success: true,
      data: liquidity.map((l) => ({
        currency: l.currency,
        available: Number(l.available),
        reserved: Number(l.reserved),
      })),
      meta: { count: liquidity.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: getMockLiquidityDistribution(),
        meta: { count: 0 },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'LIQUIDITY_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}