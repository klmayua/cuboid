import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { auditLog, globalEventBus, shouldUseMockData } from '@cuboid/domain-core';
import { getMockSettlements } from '@cuboid/domain-core/mock';
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
    let query = `SELECT s.*, t.amount, t.currency, t.status as txn_status 
       FROM settlement_records s
       JOIN transactions t ON s.transaction_id = t.id
       WHERE t.organization_id = $1 AND t.deleted_at IS NULL`;
    const params: any[] = [organizationId];
    let paramIndex = 2;

    if (cursor) {
      query += ` AND s.created_at < $${paramIndex++}`;
      params.push(new Date(cursor));
    }

    query += ' ORDER BY s.created_at DESC';
    query += ` LIMIT ${limit + 1}`;

    const settlements = await pglite.query(query, params).then(r => r.rows);

    const hasMore = settlements.length > limit;
    const data = hasMore ? settlements.slice(0, -1) : settlements;
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
        data: getMockSettlements(),
        meta: { count: 0, limit, nextCursor: null, hasMore: false },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'SETTLEMENTS_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}