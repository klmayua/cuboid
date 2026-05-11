export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { listNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification, createNotification } from '@cuboid/api-sdk';
import { ValidationError, shouldUseMockData } from '@cuboid/domain-core';
import { getMockNotifications } from '@cuboid/domain-core/mock';
import { z } from 'zod';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const orgId = searchParams.get('organizationId') ?? undefined;
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const cursor = searchParams.get('cursor');

  try {
    if (!userId) {
      return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'userId is required', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }

    const result = await listNotifications(userId, orgId);
    
    const limited = result.slice(0, limit);
    const hasMore = result.length > limit;
    const nextCursor = hasMore ? limited[limited.length - 1]?.createdAt?.toISOString() : null;

    return NextResponse.json({ 
      success: true, 
      data: limited, 
      meta: { count: limited.length, limit, nextCursor, hasMore },
      requestId: `req_${Date.now()}`, 
      timestamp: new Date().toISOString() 
    });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({ 
        success: true, 
        mock: true, 
        data: getMockNotifications(), 
        meta: { count: 0, limit, nextCursor: null, hasMore: false },
        requestId: `req_${Date.now()}`, 
        timestamp: new Date().toISOString() 
      });
    }
    return NextResponse.json({ success: false, errorCode: 'NOTIFICATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action;

    if (action === 'create') {
      const result = await createNotification(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'markAllRead') {
      const schema = z.object({ userId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await markAllNotificationsRead(parsed.userId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ success: false, errorCode: 'UNKNOWN_ACTION', message: 'Unknown action', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({ success: true, mock: true, data: getMockNotifications()[0] || { id: `mock_${Date.now()}` }, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'NOTIFICATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
