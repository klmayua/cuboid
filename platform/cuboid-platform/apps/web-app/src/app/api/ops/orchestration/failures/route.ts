import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId');
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const flows = await pglite.query(
      `SELECT * FROM workflow_jobs WHERE state IN ('FAILED', 'COMPENSATED') ORDER BY updated_at DESC LIMIT $1`,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { flowId, action } = body;

    if (action === 'replay' && flowId) {
      const flow = await pglite.query('SELECT * FROM workflow_jobs WHERE id = $1', [flowId]).then(r => r.rows[0]);
      if (flow) {
        await pglite.query(
          `INSERT INTO workflow_jobs (id, organization_id, workflow, subject_type, subject_id, state, context)
           VALUES ($1, $2, $3, $4, $5, 'PENDING', $6)`,
          [`replay_${Date.now()}`, flow.organization_id, flow.workflow + '_replay', flow.subject_type, flow.subject_id, flow.context]
        );
      }
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
      errorCode: 'ORCHESTRATION_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}