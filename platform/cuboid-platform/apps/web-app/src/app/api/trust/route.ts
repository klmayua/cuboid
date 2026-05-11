import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { shouldUseMockData } from '@cuboid/domain-core';
import { getMockTrustScores } from '@cuboid/domain-core/mock';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId');

  if (!organizationId) {
    return NextResponse.json({ success: false, errorCode: 'MISSING_ORG_ID' }, { status: 400 });
  }

  try {
    const trust = await pglite.query(
      'SELECT * FROM trust_scores WHERE entity_id = $1 AND entity_type = $2 ORDER BY created_at DESC LIMIT 1',
      [organizationId, 'ORGANIZATION']
    ).then(r => r.rows[0]);

    return NextResponse.json({
      success: true,
      data: trust,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: getMockTrustScores(),
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'TRUST_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}