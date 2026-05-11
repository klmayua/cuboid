import { NextResponse } from 'next/server';
import { auditLog } from '@cuboid/domain-core';
import { globalEventBus } from '@cuboid/domain-core';
import { z } from 'zod';

const InterventionSchema = z.object({
  organizationId: z.string().uuid(),
  actorId: z.string().uuid(),
  corridor: z.string(),
  type: z.enum(['TIGHTEN_SPREAD', 'WIDEN_SPREAD', 'LIQUIDITY_INCENTIVE', 'SOURCE_PENALTY', 'SOURCE_BOOST', 'CORRIDOR_PAUSE']),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  instruction: z.string().optional(),
  parameters: z.record(z.number()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { organizationId, actorId, corridor, type, severity, instruction, parameters } = InterventionSchema.parse(body);

    await auditLog({
      actorId,
      action: 'MARKET_INTERVENTION',
      organizationId,
      metadata: { corridor, type, severity, instruction, parameters },
    });

    await globalEventBus.emit('MARKET_INTERVENTION', {
      actorId,
      payload: { corridor, type, severity, instruction, parameters },
    });

    return NextResponse.json({
      success: true,
      message: 'Intervention applied',
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'INTERVENTION_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}