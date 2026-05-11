import { NextResponse } from 'next/server';
import { listMySettlements } from '@cuboid/api-sdk';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId');
    if (!orgId) {
      return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'organizationId is required', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    const result = await listMySettlements(orgId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ success: false, errorCode: 'SETTLEMENT_LIST_FAILED', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
