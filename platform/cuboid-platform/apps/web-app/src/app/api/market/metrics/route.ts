import { NextResponse } from 'next/server';
import { marketEngine, shouldUseMockData } from '@cuboid/domain-core';
import { getMockMarketMetrics } from '@cuboid/domain-core/mock';
import { z } from 'zod';

const MetricsResponseSchema = z.object({
  activePairs: z.number(),
  publishedRates: z.number(),
  avgConfidence: z.number(),
  avgLiquidity: z.number(),
  totalSources: z.number(),
});

export async function GET() {
  try {
    const metrics = await marketEngine.getMarketMetrics();
    const validated = MetricsResponseSchema.parse(metrics);
    
    return NextResponse.json({
      success: true,
      data: validated,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: getMockMarketMetrics(),
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'METRICS_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}