import { NextResponse } from 'next/server';
import { orchestrationEngine } from '@cuboid/domain-core';
import { pglite } from '@cuboid/db';
import { z } from 'zod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId');
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const flows = await pglite.query(
      `SELECT * FROM workflow_jobs WHERE state IN ('RUNNING', 'RETRY', 'PENDING') ORDER BY created_at DESC LIMIT $1`,
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
    const { action, flowId, name, steps, context } = body;

    if (action === 'startFlow') {
      const flowIdResult = await orchestrationEngine.startFlow(name, context, steps);
      return NextResponse.json({
        success: true,
        data: { flowId: flowIdResult },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === 'retry' && flowId) {
      await orchestrationEngine.executeNextStep(flowId);
      return NextResponse.json({
        success: true,
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === 'replay' && flowId) {
      const flow = await pglite.query('SELECT * FROM workflow_jobs WHERE id = $1', [flowId]).then(r => r.rows[0]);
      if (flow) {
        await orchestrationEngine.startFlow(flow.workflow, JSON.parse(flow.context || '{}'), [{ name: 'replay', action: 'AUDIT' }]);
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