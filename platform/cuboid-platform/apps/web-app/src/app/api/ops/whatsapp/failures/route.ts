import { NextResponse } from 'next/server';
import { whatsappService } from '@cuboid/domain-core';
import { pglite } from '@cuboid/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId') || 'default';
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const workflows = await pglite.query(
      `SELECT * FROM workflow_jobs WHERE organization_id = $1 AND state IN ('FAILED', 'RETRY') ORDER BY updated_at DESC LIMIT $2`,
      [organizationId, limit]
    ).then(r => r.rows);

    return NextResponse.json({
      success: true,
      data: workflows,
      meta: { count: workflows.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'WHATSAPP_FAILURES_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, action } = body;

    if (action === 'retry' && jobId) {
      await pglite.query(
        `UPDATE workflow_jobs SET state = 'PENDING', attempts = 0, next_retry_at = NULL, error = NULL WHERE id = $1`,
        [jobId]
      );
      return NextResponse.json({
        success: true,
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: false,
      errorCode: 'UNKNOWN_ACTION',
      message: `Unknown action: ${action}`,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 400 });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'WHATSAPP_RETRY_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}