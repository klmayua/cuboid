export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import {
  getBdcDashboard,
  getBdcDesks,
  getBdcDesk,
  createBdcDesk,
  updateBdcDesk,
  setBdcDeskStatus,
  addBdcStaff,
  listBdcStaff,
  listBdcStaffByDesk,
  updateBdcStaff,
  removeBdcStaff,
  createBdcInventory,
  listBdcInventory,
  listBdcInventoryByDesk,
  addBdcStock,
  reserveBdcStock,
  releaseBdcStock,
  createBdcDeal,
  listBdcDeals,
  listBdcDealsByDesk,
  advanceBdcDeal,
  closeBdcDeal,
  failBdcDeal,
  createComplianceDoc,
  listComplianceDocs,
  listExpiringComplianceDocs,
  publishBdcRate,
  getBdcAnalytics,
} from '@cuboid/api-sdk';
import { ValidationError, idempotencyRepository, shouldUseMockData } from '@cuboid/domain-core';
import { getMockBdcMetrics, getMockBdcDesks, getMockBdcInventory } from '@cuboid/domain-core/mock';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId');
    const action = searchParams.get('action');

    if (action === 'liquidity') {
      const result = await getBdcDashboard(orgId ?? '');
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    if (!orgId) {
      return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'organizationId is required', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }

    if (action === 'desks') {
      const result = await getBdcDesks(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'desk') {
      const id = searchParams.get('id');
      if (!id) return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'id is required' }, { status: 400 });
      const result = await getBdcDesk(id);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'staff') {
      const result = await listBdcStaff(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'staffByDesk') {
      const deskId = searchParams.get('deskId');
      if (!deskId) return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'deskId is required' }, { status: 400 });
      const result = await listBdcStaffByDesk(deskId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'inventory') {
      const result = await listBdcInventory(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'inventoryByDesk') {
      const deskId = searchParams.get('deskId');
      if (!deskId) return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'deskId is required' }, { status: 400 });
      const result = await listBdcInventoryByDesk(deskId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'deals') {
      const result = await listBdcDeals(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'dealsByDesk') {
      const deskId = searchParams.get('deskId');
      if (!deskId) return NextResponse.json({ success: false, errorCode: 'MISSING_PARAM', message: 'deskId is required' }, { status: 400 });
      const result = await listBdcDealsByDesk(deskId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'compliance') {
      const result = await listComplianceDocs(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'complianceExpiring') {
      const days = searchParams.get('days') ? parseInt(searchParams.get('days')!, 10) : undefined;
      const result = await listExpiringComplianceDocs(orgId, days);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'reports') {
      const result = await getBdcAnalytics(orgId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    const result = await getBdcDashboard(orgId);
    return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (err) {
    if (shouldUseMockData()) {
      const { searchParams } = new URL(req.url);
      const action = searchParams.get('action');
      let data;
      if (action === 'desks' || action === 'desk') data = getMockBdcDesks();
      else if (action === 'inventory' || action === 'inventoryByDesk') data = getMockBdcInventory();
      else data = getMockBdcMetrics();
      return NextResponse.json({ success: true, mock: true, data, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    return NextResponse.json({ success: false, errorCode: 'BDC_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action;

    // Desk
    if (action === 'createDesk') {
      const result = await createBdcDesk(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'updateDesk') {
      const schema = z.object({ id: z.string().uuid(), actorId: z.string().uuid() }).passthrough();
      const parsed = schema.parse(body);
      const result = await updateBdcDesk(parsed.id, parsed);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'setDeskStatus') {
      const schema = z.object({ id: z.string().uuid(), status: z.string(), actorId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await setBdcDeskStatus(parsed.id, parsed.status, parsed.actorId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Staff
    if (action === 'addStaff') {
      const result = await addBdcStaff(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'updateStaff') {
      const schema = z.object({ id: z.string().uuid(), actorId: z.string().uuid() }).passthrough();
      const parsed = schema.parse(body);
      const { id, actorId, ...rest } = parsed;
      const result = await updateBdcStaff(id, rest, actorId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'removeStaff') {
      const schema = z.object({ id: z.string().uuid(), actorId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await removeBdcStaff(parsed.id, parsed.actorId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Inventory
    if (action === 'createInventory') {
      const result = await createBdcInventory(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'addStock') {
      const schema = z.object({ inventoryId: z.string().uuid(), amount: z.number().positive(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await addBdcStock(parsed.inventoryId, parsed.amount, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'reserveStock') {
      const schema = z.object({ inventoryId: z.string().uuid(), amount: z.number().positive(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      
      const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const idempotencyKey = `reserve_${parsed.inventoryId}_${parsed.amount}_${requestId}`;
      const existing = await idempotencyRepository.get(idempotencyKey);
      
      if (existing && existing.response) {
        return NextResponse.json({ success: true, data: existing.response, idempotent重复: true, requestId, timestamp: new Date().toISOString() });
      }
      
      if (!existing) {
        await idempotencyRepository.create(idempotencyKey, 'BDC_RESERVE', { ...parsed, requestId });
      }
      
      const result = await reserveBdcStock(parsed.inventoryId, parsed.amount, parsed.actorId, parsed.organizationId);
      await idempotencyRepository.updateResponse(idempotencyKey, result.id, result);
      
      return NextResponse.json({ success: true, data: result, requestId, timestamp: new Date().toISOString() });
    }
    if (action === 'releaseStock') {
      const schema = z.object({ inventoryId: z.string().uuid(), amount: z.number().positive(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await releaseBdcStock(parsed.inventoryId, parsed.amount, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Deals
    if (action === 'createDeal') {
      const result = await createBdcDeal(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'advanceDeal') {
      const schema = z.object({ dealId: z.string().uuid(), status: z.string(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await advanceBdcDeal(parsed.dealId, parsed.status, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'closeDeal') {
      const schema = z.object({ dealId: z.string().uuid(), settledAmount: z.number().nonnegative(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await closeBdcDeal(parsed.dealId, parsed.settledAmount, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (action === 'failDeal') {
      const schema = z.object({ dealId: z.string().uuid(), actorId: z.string().uuid(), organizationId: z.string().uuid() });
      const parsed = schema.parse(body);
      const result = await failBdcDeal(parsed.dealId, parsed.actorId, parsed.organizationId);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Compliance
    if (action === 'createComplianceDoc') {
      const result = await createComplianceDoc(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    // Rate
    if (action === 'publishRate') {
      const result = await publishBdcRate(body);
      return NextResponse.json({ success: true, data: result, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ success: false, errorCode: 'UNKNOWN_ACTION', message: 'Unknown action', requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({ success: true, mock: true, data: getMockBdcMetrics(), requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() });
    }
    if (err instanceof ValidationError || err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errorCode: 'VALIDATION_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 400 });
    }
    return NextResponse.json({ success: false, errorCode: 'BDC_ERROR', message: (err as Error).message, requestId: `req_${Date.now()}`, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
