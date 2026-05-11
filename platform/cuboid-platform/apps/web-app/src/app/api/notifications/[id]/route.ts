import { NextResponse } from 'next/server';
import { markNotificationRead, deleteNotification } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const result = await markNotificationRead(params.id, body.actorId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, errorCode: 'NOT_FOUND', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 404 });
    }
    return NextResponse.json({ success: false, errorCode: 'NOTIFICATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    // actorId would come from auth context in production
    const result = await deleteNotification(params.id, 'system');
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, errorCode: 'NOT_FOUND', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 404 });
    }
    return NextResponse.json({ success: false, errorCode: 'NOTIFICATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
