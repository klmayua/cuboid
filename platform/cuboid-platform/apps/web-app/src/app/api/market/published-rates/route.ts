import { NextResponse } from 'next/server';
import { marketService } from '@cuboid/domain-core';

export async function GET() {
  try {
    const rates = await marketService.getPublishedRates();
    
    return NextResponse.json({
      success: true,
      data: rates,
      meta: { count: rates.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'PUBLISHED_RATES_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}