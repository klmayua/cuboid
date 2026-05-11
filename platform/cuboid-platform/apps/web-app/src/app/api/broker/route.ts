import { NextResponse } from 'next/server';
import {
  getBrokerDashboard,
  getBrokerPerformance,
  updateBrokerProfile,
  listClaimableLeads,
  listBrokerLeads,
  claimBrokerLead,
  releaseBrokerLead,
  convertBrokerLead,
  archiveBrokerLead,
  createBrokerLead,
  listBrokerDeals,
  createBrokerDeal,
  advanceBrokerDeal,
  rollbackBrokerDeal,
  settleBrokerDeal,
  disputeBrokerDeal,
  closeBrokerDeal,
  listBrokerCommissions,
  getBrokerCommissionSummary,
  computeBrokerCommission,
  releaseBrokerCommission,
  holdBrokerCommission,
  reverseBrokerCommission,
  listBrokerClients,
  createBrokerClient,
  archiveBrokerClient,
} from '@cuboid/api-sdk';
import { ValidationError, shouldUseMockData } from '@cuboid/domain-core';
import { getMockBrokerMetrics, getMockBrokerDeals, getMockBrokerLeads } from '@cuboid/domain-core/mock';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId');
    const action = searchParams.get('action');

    if (!orgId) {
      return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'organizationId is required', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }

    if (action === 'leads') {
      const result = await listBrokerLeads(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'claimableLeads') {
      const result = await listClaimableLeads(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'deals') {
      const result = await listBrokerDeals(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'commissions') {
      const result = await listBrokerCommissions(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'commissionSummary') {
      const result = await getBrokerCommissionSummary(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'clients') {
      const result = await listBrokerClients(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'performance') {
      const result = await getBrokerPerformance(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    const result = await getBrokerDashboard(orgId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (shouldUseMockData()) {
      const { searchParams } = new URL(req.url);
      const action = searchParams.get('action');
      let data;
      if (action === 'leads' || action === 'claimableLeads') data = getMockBrokerLeads();
      else if (action === 'deals') data = getMockBrokerDeals();
      else data = getMockBrokerMetrics();
      return NextResponse.json({ success: true, mock: true, data, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    return NextResponse.json({ success: false, errorCode: 'BROKER_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action;

    // Leads
    if (action === 'createLead') {
      const result = await createBrokerLead(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'claimLead') {
      const schema = z.object({ leadId: z.string().uuid(), brokerId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await claimBrokerLead(parsed.leadId, parsed.brokerId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'releaseLead') {
      const schema = z.object({ leadId: z.string().uuid(), brokerId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await releaseBrokerLead(parsed.leadId, parsed.brokerId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'convertLead') {
      const schema = z.object({ leadId: z.string().uuid(), dealId: z.string().uuid(), brokerId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await convertBrokerLead(parsed.leadId, parsed.dealId, parsed.brokerId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'archiveLead') {
      const schema = z.object({ leadId: z.string().uuid(), brokerId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await archiveBrokerLead(parsed.leadId, parsed.brokerId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Deals
    if (action === 'createDeal') {
      const result = await createBrokerDeal(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'advanceDeal') {
      const schema = z.object({ dealId: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await advanceBrokerDeal(parsed.dealId, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'rollbackDeal') {
      const schema = z.object({ dealId: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await rollbackBrokerDeal(parsed.dealId, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'settleDeal') {
      const schema = z.object({ dealId: z.string().uuid(), settlementId: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await settleBrokerDeal(parsed.dealId, parsed.settlementId, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'disputeDeal') {
      const schema = z.object({ dealId: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await disputeBrokerDeal(parsed.dealId, parsed.actorId, parsed.organizationId, body.reason);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'closeDeal') {
      const schema = z.object({ dealId: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await closeBrokerDeal(parsed.dealId, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Commissions
    if (action === 'computeCommission') {
      const result = await computeBrokerCommission(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'releaseCommission') {
      const schema = z.object({ id: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await releaseBrokerCommission(parsed.id, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'holdCommission') {
      const schema = z.object({ id: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await holdBrokerCommission(parsed.id, parsed.actorId, parsed.organizationId, body.reason);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'reverseCommission') {
      const schema = z.object({ id: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await reverseBrokerCommission(parsed.id, parsed.actorId, parsed.organizationId, body.reason);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Clients
    if (action === 'createClient') {
      const result = await createBrokerClient(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'archiveClient') {
      const schema = z.object({ clientId: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await archiveBrokerClient(parsed.clientId, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Profile
    if (action === 'updateProfile') {
      const result = await updateBrokerProfile(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ success: false, errorCode: 'UNKNOWN_ACTION', message: 'Unknown action', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({ success: true, mock: true, data: getMockBrokerMetrics(), requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'BROKER_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
