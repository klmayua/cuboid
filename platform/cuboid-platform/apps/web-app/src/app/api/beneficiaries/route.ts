import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { auditLog } from '@cuboid/domain-core';
import { z } from 'zod';

const BeneficiarySchema = z.object({
  organizationId: z.string().uuid(),
  name: z.string().min(1),
  country: z.string(),
  bank: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  swift: z.string().optional(),
  mobileNumber: z.string().optional(),
  payoutMethod: z.enum(['BANK', 'MOBILE_MONEY', 'PICKUP', 'INTERNAL']),
  actorId: z.string().uuid(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId');
  const id = searchParams.get('id');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const cursor = searchParams.get('cursor');

  try {
    if (!organizationId) {
      return NextResponse.json({ success: false, errorCode: 'MISSING_ORG_ID', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }

    let query = 'SELECT * FROM beneficiaries WHERE organization_id = $1 AND deleted_at IS NULL';
    const params: any[] = [organizationId];
    let paramIndex = 2;

    if (id) {
      query += ' AND id = $2';
      params.push(id);
    }

    if (cursor) {
      query += ` AND created_at < $${paramIndex++}`;
      params.push(new Date(cursor));
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT ${limit + 1}`;

    const beneficiaries = await pglite.query(query, params).then(r => r.rows);

    const hasMore = beneficiaries.length > limit;
    const data = hasMore ? beneficiaries.slice(0, -1) : beneficiaries;
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
      errorCode: 'BENEFICIARIES_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationId, name, country, bank, accountName, accountNumber, swift, mobileNumber, payoutMethod, actorId } = BeneficiarySchema.parse(body);

    const beneficiary = await pglite.query(
      `INSERT INTO beneficiaries (organization_id, name, country, bank, account_name, account_number, swift, mobile_number, payout_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [organizationId, name, country, bank, accountName, accountNumber, swift, mobileNumber, payoutMethod]
    ).then(r => r.rows[0]);

    await auditLog({
      actorId,
      action: 'BENEFICIARY_CREATED',
      organizationId,
      metadata: { beneficiaryId: beneficiary.id, name },
    });

    return NextResponse.json({
      success: true,
      data: beneficiary,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'CREATE_BENEFICIARY_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}