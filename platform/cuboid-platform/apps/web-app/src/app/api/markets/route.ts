import { NextResponse } from 'next/server';
import { getLiveRates, getRatesByRegion } from '@cuboid/api-sdk';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pairId = searchParams.get('pairId') ?? undefined;
    const region = searchParams.get('region') ?? undefined;

    if (region) {
      const rates = await getRatesByRegion(region);
      return NextResponse.json({ success: true, data: rates });
    }

    const rates = await getLiveRates(pairId, region);
    return NextResponse.json({ success: true, data: rates });
  } catch (err) {
    return NextResponse.json({ success: false, error: { code: 'MARKET_ERROR', message: (err as Error).message } }, { status: 500 });
  }
}
