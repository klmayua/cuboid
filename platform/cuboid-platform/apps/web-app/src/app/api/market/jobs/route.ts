import { NextResponse } from 'next/server';
import { marketService } from '@cuboid/domain-core';
import { z } from 'zod';

const schema = z.object({
  job: z.enum(['aggregate', 'cleanup', 'metrics']),
  maxAgeMinutes: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());

    if (body.job === 'aggregate') {
      const results = await marketService.aggregateMarketRates('cron');
      return NextResponse.json({
        success: true,
        data: { aggregated: results.length },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (body.job === 'cleanup') {
      const count = await marketService.cleanupStaleRates(body.maxAgeMinutes ?? 60);
      return NextResponse.json({
        success: true,
        data: { deleted: count },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (body.job === 'metrics') {
      const metrics = await marketService.getMarketMetrics();
      return NextResponse.json({
        success: true,
        data: metrics,
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: false,
      errorCode: 'UNKNOWN_JOB',
      message: 'Unknown job type',
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 400 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: err.message,
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'MARKET_JOB_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
