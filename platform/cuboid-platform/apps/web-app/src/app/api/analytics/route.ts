import { NextResponse } from 'next/server';
import { getAnalyticsOverview, getAnalyticsVolume, getAnalyticsCorridors, getAnalyticsLiquidity, getAnalyticsPerformance, getBrokerMetrics, getBrokerRanking } from '@cuboid/api-sdk';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId') ?? undefined;
    const action = searchParams.get('action');
    const from = searchParams.get('from') ?? undefined;
    const to = searchParams.get('to') ?? undefined;

    if (action === 'volume') {
      const result = await getAnalyticsVolume(orgId, from, to);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'corridors') {
      const result = await getAnalyticsCorridors(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'liquidity') {
      const result = await getAnalyticsLiquidity();
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'performance') {
      const result = await getAnalyticsPerformance(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'brokerMetrics') {
      if (!orgId) {
        return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'organizationId is required', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
      }
      const result = await getBrokerMetrics(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'brokerRanking') {
      if (!orgId) {
        return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'organizationId is required', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
      }
      const result = await getBrokerRanking(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    const result = await getAnalyticsOverview(orgId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ success: false, errorCode: 'ANALYTICS_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
