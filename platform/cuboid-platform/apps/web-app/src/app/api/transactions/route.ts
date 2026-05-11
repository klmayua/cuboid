import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { auditLog } from '@cuboid/domain-core';
import { z } from 'zod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId');
  const status = searchParams.get('status');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const cursor = searchParams.get('cursor');

  if (!organizationId) {
    return NextResponse.json({ success: false, errorCode: 'MISSING_ORG_ID', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
  }

  try {
    let query = 'SELECT * FROM transactions WHERE organization_id = $1 AND deleted_at IS NULL';
    const params: any[] = [organizationId];
    let paramIndex = 2;

    if (status && status !== 'ALL') {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }

    if (cursor) {
      query += ` AND created_at < $${paramIndex++}`;
      params.push(new Date(cursor));
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT ${limit + 1}`;

    const transactions = await pglite.query(query, params).then(r => r.rows);

    const hasMore = transactions.length > limit;
    const data = hasMore ? transactions.slice(0, -1) : transactions;
    const nextCursor = hasMore ? data[data.length - 1]?.created_at?.toISOString() : null;

    return NextResponse.json({
      success: true,
      data,
      meta: { count: data.length, limit, nextCursor, hasMore },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'TRANSACTIONS_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}