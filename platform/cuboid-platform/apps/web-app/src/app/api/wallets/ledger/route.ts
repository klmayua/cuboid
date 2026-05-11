import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletId = searchParams.get('walletId');
  const limit = parseInt(searchParams.get('limit') || '50');
  const organizationId = searchParams.get('organizationId');

  if (!walletId) {
    return NextResponse.json({ success: false, errorCode: 'MISSING_WALLET_ID' }, { status: 400 });
  }

  try {
    const ledger = await pglite.query(
      `SELECT * FROM wallet_entries WHERE wallet_id = $1 ORDER BY created_at DESC LIMIT $2`,
      [walletId, limit]
    ).then(r => r.rows);

    return NextResponse.json({
      success: true,
      data: ledger,
      meta: { count: ledger.length },
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'LEDGER_ERROR',
      message: (err as Error).message,
      requestId: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}