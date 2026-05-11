import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { globalEventBus } from '@cuboid/domain-core';
import { auditLog } from '@cuboid/domain-core';
import { shouldUseMockData } from '@cuboid/domain-core';
import { getMockCustomerWallets } from '@cuboid/domain-core/mock';
import { z } from 'zod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get('currency');
  const organizationId = searchParams.get('organizationId');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const cursor = searchParams.get('cursor');

  try {
    let query = 'SELECT * FROM wallets WHERE deleted_at IS NULL';
    const params: any[] = [];
    let paramIndex = 1;

    if (currency) {
      query += ` AND currency = $${paramIndex++}`;
      params.push(currency);
    }

    if (organizationId) {
      query += ` AND organization_id = $${paramIndex++}`;
      params.push(organizationId);
    }

    if (cursor) {
      query += ` AND created_at < $${paramIndex++}`;
      params.push(new Date(cursor));
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT ${limit + 1}`;

    const wallets = await pglite.query(query, params).then(r => r.rows);
    
    const hasMore = wallets.length > limit;
    const data = hasMore ? wallets.slice(0, -1) : wallets;
    const nextCursor = hasMore ? data[data.length - 1]?.created_at?.toISOString() : null;

    const totalCount = await pglite.query(
      'SELECT COUNT(*) as c FROM wallets WHERE deleted_at IS NULL' + 
      (organizationId ? ` AND organization_id = '${organizationId}'` : ''),
    ).then(r => parseInt(r.rows[0]?.c || '0'));

    return NextResponse.json({
      success: true,
      data,
      meta: { 
        count: data.length,
        totalCount,
        limit,
        nextCursor,
        hasMore,
      },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: getMockCustomerWallets(),
        meta: { count: 0, limit, nextCursor: null, hasMore: false },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'WALLETS_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}