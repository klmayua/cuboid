import { NextResponse } from 'next/server';
import { whatsappService } from '@cuboid/domain-core';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get('organizationId') || 'default';
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    const workflows = await whatsappService.getPendingWorkflows(organizationId, limit);
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
      errorCode: 'WHATSAPP_WORKFLOWS_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}