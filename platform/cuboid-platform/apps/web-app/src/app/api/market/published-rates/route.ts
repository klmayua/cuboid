import { NextResponse } from 'next/server';
import { marketService, shouldUseMockData } from '@cuboid/domain-core';
import { getMockRates } from '@cuboid/domain-core/mock';

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
    if (shouldUseMockData()) {
      const rates = getMockRates();
      return NextResponse.json({
        success: true,
        mock: true,
        data: rates,
        meta: { count: rates.length },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'PUBLISHED_RATES_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}