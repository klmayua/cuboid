export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { submitKyc, submitKyb, getComplianceCases, getComplianceCase, reviewComplianceCase } from '@cuboid/api-sdk';
import { ValidationError } from '@cuboid/domain-core';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId');
    const caseId = searchParams.get('caseId');
    const type = searchParams.get('type') as 'KYC' | 'KYB' | null;

    if (caseId && type) {
      const result = await getComplianceCase(caseId, type);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (!orgId) {
      return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'organizationId is required', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }

    const result = await getComplianceCases(orgId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, errorCode: 'NOT_FOUND', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 404 });
    }
    return NextResponse.json({ success: false, errorCode: 'COMPLIANCE_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action;

    if (action === 'submitKyc') {
      const result = await submitKyc(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'submitKyb') {
      const result = await submitKyb(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (action === 'reviewCase') {
      const schema = z.object({
        id: z.string().uuid(),
        reviewerId: z.string().uuid(),
        type: z.enum(['KYC', 'KYB']),
        status: z.string(),
      });
      const parsed = schema.parse(body);
      const result = await reviewComplianceCase(parsed.id, parsed.reviewerId, parsed.type, parsed.status);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ success: false, errorCode: 'UNKNOWN_ACTION', message: 'Unknown action', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'COMPLIANCE_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
