import { NextResponse } from 'next/server';
import { getSettlement } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const result = await getSettlement(params.id);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, errorCode: 'NOT_FOUND', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 404 });
    }
    return NextResponse.json({ success: false, errorCode: 'SETTLEMENT_GET_FAILED', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
