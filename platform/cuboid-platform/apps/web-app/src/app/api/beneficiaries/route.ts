import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { auditLog, shouldUseMockData } from '@cuboid/domain-core';
import { z } from 'zod';

const mockBeneficiaries = [
  { id: 'ben_1', organization_id: 'org_1', name: 'Adewale Ogunleye', country: 'NG', bank: 'GTBank', account_name: 'Adewale Ogunleye', account_number: '0123456789', swift: 'GTBINGLA', mobile_number: '+2348012345678', payout_method: 'BANK', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'ben_2', organization_id: 'org_1', name: 'Nneka Chukwu', country: 'NG', bank: 'Access Bank', account_name: 'Nneka Chukwu', account_number: '9876543210', swift: 'ACBINGLA', mobile_number: null, payout_method: 'BANK', created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 'ben_3', organization_id: 'org_1', name: 'Ibukun Adebayo', country: 'GH', bank: null, account_name: null, account_number: null, swift: null, mobile_number: '+233501234567', payout_method: 'MOBILE_MONEY', created_at: new Date(Date.now() - 259200000).toISOString() },
  { id: 'ben_4', organization_id: 'org_1', name: 'Chiamaka Ezeh', country: 'KE', bank: 'KCB', account_name: 'Chiamaka Ezeh', account_number: '1122334455', swift: 'KCBLKENX', mobile_number: null, payout_method: 'BANK', created_at: new Date(Date.now() - 345600000).toISOString() },
  { id: 'ben_5', organization_id: 'org_1', name: 'Olusegun Adeleke', country: 'NG', bank: 'First Bank', account_name: 'Olusegun Adeleke', account_number: '5566778899', swift: 'FBNINGLA', mobile_number: '+2348023456789', payout_method: 'BANK', created_at: new Date(Date.now() - 432000000).toISOString() },
];

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
    if (shouldUseMockData()) {
      let data = mockBeneficiaries;
      if (id) data = data.filter(b => b.id === id);
      return NextResponse.json({
        success: true, mock: true, data,
        meta: { count: data.length, limit, nextCursor: null, hasMore: false },
        requestId: `req_${Date.now()}`, timestamp: new Date().toISOString(),
      });
    }
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
    if (shouldUseMockData()) {
      const body = await request.clone().json().catch(() => ({}));
      const newBeneficiary = {
        id: `ben_${Date.now()}`,
        organization_id: body.organizationId || 'org_1',
        name: body.name || 'New Beneficiary',
        country: body.country || 'NG',
        bank: body.bank || null,
        account_name: body.accountName || null,
        account_number: body.accountNumber || null,
        swift: body.swift || null,
        mobile_number: body.mobileNumber || null,
        payout_method: body.payoutMethod || 'BANK',
        created_at: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, mock: true, data: newBeneficiary, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'CREATE_BENEFICIARY_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
