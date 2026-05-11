import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId');
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const flows = await pglite.query(
      `SELECT * FROM workflow_jobs WHERE state = 'COMPLETED' ORDER BY completed_at DESC LIMIT $1`,
      [limit]
    ).then(r => r.rows);

    return NextResponse.json({
      success: true,
      data: flows,
      meta: { count: flows.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'ORCHESTRATION_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}