import { NextResponse } from 'next/server';
import { marketService, shouldUseMockData } from '@cuboid/domain-core';
import { getMockRates } from '@cuboid/domain-core/mock';

export async function GET() {
  try {
    const rates = await marketService.getPublishedRates();
    return NextResponse.json({
      success: true,
      data: rates,
      meta: { count: rates.length, deprecated: 'Use /api/market/published-rates instead' },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
      deprecated: true,
      migration: '/api/market/published-rates',
    }, { status: 410 });
  } catch (error) {
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
      errorCode: 'MARKET_ERROR',
      message: (error as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}