export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { marketRepository, shouldUseMockData } from '@cuboid/domain-core';
import { getMockRateSources } from '@cuboid/domain-core/mock';
import { z } from 'zod';

const SourcesQuerySchema = z.object({
  status: z.enum(['ACTIVE', 'DEGRADED', 'QUARANTINE']).optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const cursor = searchParams.get('cursor');

  try {
    const query = SourcesQuerySchema.parse({
      status: searchParams.get('status') || undefined,
    });

    const sources = await marketRepository.getRateSources({
      status: query.status,
      limit: limit + 1,
      cursor: cursor ?? undefined,
    });

    const hasMore = sources.length > limit;
    const data = hasMore ? sources.slice(0, -1) : sources;
    const nextCursor = hasMore ? data[data.length - 1]?.createdAt?.toISOString() : null;

    return NextResponse.json({
      success: true,
      data: data.map((s) => ({
        id: s.id,
        type: s.type,
        label: s.label,
        trustWeight: s.trustWeight,
        active: s.active,
        status: s.active ? 'ACTIVE' : 'INACTIVE',
      })),
      meta: { count: data.length, limit, nextCursor, hasMore },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (shouldUseMockData()) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: getMockRateSources(),
        meta: { count: 0, limit, nextCursor: null, hasMore: false },
        requestId: `req_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      success: false,
      errorCode: 'SOURCES_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}