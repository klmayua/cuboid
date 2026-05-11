import { NextResponse } from 'next/server';
import { marketService } from '@cuboid/domain-core';

export async function GET() {
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
}