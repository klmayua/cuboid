import { NextResponse } from 'next/server';
import { pglite } from '@cuboid/db';
import { globalEventBus, auditLog, idempotencyRepository } from '@cuboid/domain-core';
import { z } from 'zod';

const TransferSchema = z.object({
  organizationId: z.string().uuid(),
  fromWalletId: z.string().uuid().optional(),
  toWalletId: z.string().uuid().optional(),
  amount: z.number().positive(),
  currency: z.string(),
  reference: z.string().optional(),
  actorId: z.string().uuid(),
});

export async function POST(request: Request) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  
  try {
    const body = await request.json();
    const { organizationId, fromWalletId, toWalletId, amount, currency, reference, actorId } = TransferSchema.parse(body);

    const idempotencyKey = `transfer_${fromWalletId}_${toWalletId}_${amount}_${reference || requestId}`;
    const existing = await idempotencyRepository.get(idempotencyKey);
    
    if (existing && existing.response) {
      return NextResponse.json({ 
        success: true, 
        data: existing.response,
        idempotent重复: true,
        requestId, 
        timestamp: new Date().toISOString() 
      });
    }
    
    if (!existing) {
      await idempotencyRepository.create(idempotencyKey, 'TRANSFER', { organizationId, fromWalletId, toWalletId, amount, currency, reference, actorId, requestId });
    }

    const fromWallet = fromWalletId ? await pglite.query('SELECT * FROM wallets WHERE id = $1 AND deleted_at IS NULL', [fromWalletId]).then(r => r.rows[0]) : null;
    const toWallet = toWalletId ? await pglite.query('SELECT * FROM wallets WHERE id = $1 AND deleted_at IS NULL', [toWalletId]).then(r => r.rows[0]) : null;

    if (fromWallet && Number(fromWallet.available_balance) < amount) {
      return NextResponse.json({ success: false, errorCode: 'INSUFFICIENT_BALANCE', requestId, timestamp: new Date().toISOString() }, { status: 400 });
    }

    if (fromWallet) {
      await pglite.query(
        'UPDATE wallets SET available_balance = available_balance - $2, updated_at = NOW() WHERE id = $1',
        [fromWalletId, amount]
      );
      await pglite.query(
        `INSERT INTO wallet_entries (wallet_id, debit, running_balance, reference) VALUES ($1, $2, (SELECT available_balance FROM wallets WHERE id = $1), $3)`,
        [fromWalletId, amount, reference || `TXN_${Date.now()}`]
      );
    }

    if (toWallet) {
      await pglite.query(
        'UPDATE wallets SET available_balance = available_balance + $2, updated_at = NOW() WHERE id = $1',
        [toWalletId, amount]
      );
      await pglite.query(
        `INSERT INTO wallet_entries (wallet_id, credit, running_balance, reference) VALUES ($1, $2, (SELECT available_balance FROM wallets WHERE id = $1), $3)`,
        [toWalletId, amount, reference || `TXN_${Date.now()}`]
      );
    }

    await auditLog({
      actorId,
      action: 'WALLET_TRANSFER',
      organizationId,
      metadata: { fromWalletId, toWalletId, amount, currency },
    });

    await globalEventBus.emit('WALLET_TRANSFERRED', {
      actorId,
      payload: { fromWalletId, toWalletId, amount, currency, reference },
    });

    const response = { message: 'Transfer completed', transferId: requestId };
    
    await idempotencyRepository.updateResponse(idempotencyKey, requestId, response);

    return NextResponse.json({
      success: true,
      data: response,
      requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      errorCode: 'TRANSFER_ERROR',
      message: (err as Error).message,
      requestId,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}