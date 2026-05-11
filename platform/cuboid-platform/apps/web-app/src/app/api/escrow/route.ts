export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { auditLog, globalEventBus, shouldUseMockData } from '@cuboid/domain-core';
import { getMockEscrows } from '@cuboid/domain-core/mock';
import { z } from 'zod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const cursor = searchParams.get('cursor');

  if (!organizationId) {
    return NextResponse.json({ success: false, errorCode: 'MISSING_ORG_ID', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
  }

  try {
    let query = 'SELECT * FROM escrows WHERE organization_id = $1 AND deleted_at IS NULL';
    const params: any[] = [organizationId];
    let paramIndex = 2;

    if (cursor) {
      query += ` AND created_at < $${paramIndex++}`;
      params.push(new Date(cursor));
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT ${limit + 1}`;

    const escrows = await pglite.query(query, params).then(r => r.rows);

    const hasMore = escrows.length > limit;
    const data = hasMore ? escrows.slice(0, -1) : escrows;
    const nextCursor = hasMore ? data[data.length - 1]?.created_at?.toISOString() : null;

    return NextResponse.json({
      success: true,
      data,
      meta: { count: data.length, limit, nextCursor, hasMore },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: getMockEscrows(),
        meta: { count: 0, limit, nextCursor: null, hasMore: false },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'ESCROW_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}