import { z } from 'zod';

export const SettlementStatusSchema = z.enum([
  'PENDING',
  'INITIATED',
  'AUTHORIZED',
  'SUBMITTED',
  'PROCESSING',
  'CONFIRMED',
  'SETTLED',
  'FAILED',
  'RETURNED',
  'CANCELLED',
  'ON_HOLD',
]);
export type SettlementStatus = z.infer<typeof SettlementStatusSchema>;

export const SettlementModeSchema = z.enum(['IMMEDIATE', 'SCHEDULED', 'BATCH', 'ESCROW']);
export type SettlementMode = z.infer<typeof SettlementModeSchema>;

export const SettlementTypeSchema = z.enum(['PUSH', 'PULL', 'INTERNAL', 'CROSS_CURRENCY', 'CROSS_BORDER']);
export type SettlementType = z.infer<typeof SettlementTypeSchema>;

export interface SettlementInstruction {
  id: string;
  transactionId: string;
  amount: string;
  currency: string;
  type: SettlementType;
  mode: SettlementMode;
  status: SettlementStatus;
  sourceAccountId: string;
  destinationAccountId: string;
  partnerId?: string;
  corridorId?: string;
  reference: string;
  description?: string;
  initiatedAt: string;
  authorizedAt?: string;
  submittedAt?: string;
  processingAt?: string;
  confirmedAt?: string;
  settledAt?: string;
  failedAt?: string;
  failureReason?: string;
  returnReason?: string;
  onHoldReason?: string;
  retryCount: number;
  maxRetries: number;
  createdAt: string;
  updatedAt: string;
}

export interface SettlementBatch {
  id: string;
  status: 'OPEN' | 'LOCKED' | 'PROCESSING' | 'SETTLED' | 'FAILED';
  settlementIds: string[];
  totalAmount: string;
  currency: string;
  initiatedAt: string;
  processedAt?: string;
  settledAt?: string;
}

export interface SettlementStateTransition {
  from: SettlementStatus;
  to: SettlementStatus;
  allowed: boolean;
  reason?: string;
}

const STATE_TRANSITIONS: Record<SettlementStatus, SettlementStatus[]> = {
  PENDING: ['INITIATED', 'CANCELLED', 'FAILED'],
  INITIATED: ['AUTHORIZED', 'CANCELLED', 'FAILED'],
  AUTHORIZED: ['SUBMITTED', 'CANCELLED', 'FAILED'],
  SUBMITTED: ['PROCESSING', 'FAILED'],
  PROCESSING: ['CONFIRMED', 'FAILED', 'ON_HOLD'],
  CONFIRMED: ['SETTLED', 'FAILED', 'RETURNED'],
  SETTLED: [],
  FAILED: ['RETURNED', 'CANCELLED'],
  RETURNED: [],
  CANCELLED: [],
  ON_HOLD: ['PROCESSING', 'CANCELLED', 'FAILED'],
};

export class SettlementService {
  private settlements: Map<string, SettlementInstruction> = new Map();
  private batches: Map<string, SettlementBatch> = new Map();
  private eventHandlers: Map<SettlementStatus, ((settlement: SettlementInstruction) => void)[]> = new Map();

  createSettlement(data: {
    transactionId: string;
    amount: string;
    currency: string;
    type: SettlementType;
    mode: SettlementMode;
    sourceAccountId: string;
    destinationAccountId: string;
    partnerId?: string;
    corridorId?: string;
    reference: string;
    description?: string;
    maxRetries?: number;
  }): SettlementInstruction {
    const now = new Date().toISOString();
    const settlement: SettlementInstruction = {
      id: `stl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      transactionId: data.transactionId,
      amount: data.amount,
      currency: data.currency,
      type: data.type,
      mode: data.mode,
      status: 'PENDING',
      sourceAccountId: data.sourceAccountId,
      destinationAccountId: data.destinationAccountId,
      partnerId: data.partnerId,
      corridorId: data.corridorId,
      reference: data.reference,
      description: data.description,
      initiatedAt: now,
      retryCount: 0,
      maxRetries: data.maxRetries ?? 3,
      createdAt: now,
      updatedAt: now,
    };

    this.settlements.set(settlement.id, settlement);
    return settlement;
  }

  getSettlement(settlementId: string): SettlementInstruction | undefined {
    return this.settlements.get(settlementId);
  }

  getSettlementByTransaction(transactionId: string): SettlementInstruction | undefined {
    for (const settlement of this.settlements.values()) {
      if (settlement.transactionId === transactionId) {
        return settlement;
      }
    }
    return undefined;
  }

  transition(settlementId: string, newStatus: SettlementStatus): SettlementInstruction | null {
    const settlement = this.settlements.get(settlementId);
    if (!settlement) {
      throw new Error(`Settlement not found: ${settlementId}`);
    }

    const currentStatus = settlement.status;
    const allowedTransitions = STATE_TRANSITIONS[currentStatus] ?? [];
    
    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid state transition: ${currentStatus} -> ${newStatus}. ` +
        `Allowed transitions: ${allowedTransitions.join(', ')}`
      );
    }

    const now = new Date().toISOString();
    settlement.status = newStatus;
    settlement.updatedAt = now;

    switch (newStatus) {
      case 'INITIATED':
        settlement.initiatedAt = now;
        break;
      case 'AUTHORIZED':
        settlement.authorizedAt = now;
        break;
      case 'SUBMITTED':
        settlement.submittedAt = now;
        break;
      case 'PROCESSING':
        settlement.processingAt = now;
        break;
      case 'CONFIRMED':
        settlement.confirmedAt = now;
        break;
      case 'SETTLED':
        settlement.settledAt = now;
        break;
      case 'FAILED':
        settlement.failedAt = now;
        break;
      case 'CANCELLED':
        break;
      case 'RETURNED':
        settlement.returnedAt = now;
        break;
      case 'ON_HOLD':
        break;
    }

    this.notifyEventHandlers(newStatus, settlement);

    return settlement;
  }

  canTransition(settlementId: string, newStatus: SettlementStatus): SettlementStateTransition {
    const settlement = this.settlements.get(settlementId);
    if (!settlement) {
      return { from: 'PENDING', to: newStatus, allowed: false, reason: 'Settlement not found' };
    }

    const allowedTransitions = STATE_TRANSITIONS[settlement.status] ?? [];
    const allowed = allowedTransitions.includes(newStatus);

    return {
      from: settlement.status,
      to: newStatus,
      allowed,
      reason: allowed ? undefined : `Transition not allowed from ${settlement.status} to ${newStatus}`,
    };
  }

  initiate(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'INITIATED');
  }

  authorize(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'AUTHORIZED');
  }

  submit(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'SUBMITTED');
  }

  process(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'PROCESSING');
  }

  confirm(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'CONFIRMED');
  }

  settle(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'SETTLED');
  }

  fail(settlementId: string, reason: string): SettlementInstruction | null {
    const settlement = this.transition(settlementId, 'FAILED');
    if (settlement) {
      settlement.failureReason = reason;
    }
    return settlement;
  }

  hold(settlementId: string, reason: string): SettlementInstruction | null {
    const settlement = this.transition(settlementId, 'ON_HOLD');
    if (settlement) {
      settlement.onHoldReason = reason;
    }
    return settlement;
  }

  release(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'PROCESSING');
  }

  return(settlementId: string, reason: string): SettlementInstruction | null {
    const settlement = this.transition(settlementId, 'RETURNED');
    if (settlement) {
      settlement.returnReason = reason;
    }
    return settlement;
  }

  cancel(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, 'CANCELLED');
  }

  retry(settlementId: string): SettlementInstruction | null {
    const settlement = this.settlements.get(settlementId);
    if (!settlement) {
      throw new Error(`Settlement not found: ${settlementId}`);
    }

    if (settlement.retryCount >= settlement.maxRetries) {
      throw new Error(`Max retries exceeded for settlement: ${settlementId}`);
    }

    if (!['FAILED', 'ON_HOLD'].includes(settlement.status)) {
      throw new Error(`Cannot retry settlement in status: ${settlement.status}`);
    }

    settlement.retryCount += 1;
    settlement.status = 'PENDING';
    settlement.updatedAt = new Date().toISOString();
    settlement.failureReason = undefined;
    settlement.onHoldReason = undefined;

    return settlement;
  }

  createBatch(settlementIds: string[], currency: string): SettlementBatch {
    const settlements = settlementIds
      .map(id => this.settlements.get(id))
      .filter((s): s is SettlementInstruction => s !== undefined);

    if (settlements.length === 0) {
      throw new Error('No valid settlements provided for batch');
    }

    const totalAmount = settlements
      .reduce((sum, s) => sum + BigInt(s.amount), 0n)
      .toString();

    const batch: SettlementBatch = {
      id: `bat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      status: 'OPEN',
      settlementIds,
      totalAmount,
      currency,
      initiatedAt: new Date().toISOString(),
    };

    this.batches.set(batch.id, batch);
    return batch;
  }

  lockBatch(batchId: string): SettlementBatch | null {
    const batch = this.batches.get(batchId);
    if (!batch || batch.status !== 'OPEN') {
      return null;
    }

    batch.status = 'LOCKED';
    return batch;
  }

  processBatch(batchId: string): SettlementBatch | null {
    const batch = this.batches.get(batchId);
    if (!batch || batch.status !== 'LOCKED') {
      return null;
    }

    batch.status = 'PROCESSING';
    batch.processedAt = new Date().toISOString();

    for (const settlementId of batch.settlementIds) {
      try {
        this.transition(settlementId, 'SUBMITTED');
        this.transition(settlementId, 'PROCESSING');
        this.transition(settlementId, 'CONFIRMED');
        this.transition(settlementId, 'SETTLED');
      } catch (error) {
        console.error(`Failed to settle ${settlementId}:`, error);
      }
    }

    return batch;
  }

  settleBatch(batchId: string): SettlementBatch | null {
    const batch = this.batches.get(batchId);
    if (!batch || batch.status !== 'PROCESSING') {
      return null;
    }

    batch.status = 'SETTLED';
    batch.settledAt = new Date().toISOString();
    return batch;
  }

  getSettlements(filter: {
    status?: SettlementStatus;
    currency?: string;
    partnerId?: string;
    fromDate?: string;
    toDate?: string;
  }): SettlementInstruction[] {
    let results = Array.from(this.settlements.values());

    if (filter.status) {
      results = results.filter(s => s.status === filter.status);
    }
    if (filter.currency) {
      results = results.filter(s => s.currency === filter.currency);
    }
    if (filter.partnerId) {
      results = results.filter(s => s.partnerId === filter.partnerId);
    }
    if (filter.fromDate) {
      results = results.filter(s => s.createdAt >= filter.fromDate!);
    }
    if (filter.toDate) {
      results = results.filter(s => s.createdAt <= filter.toDate!);
    }

    return results;
  }

  onStatusChange(status: SettlementStatus, handler: (settlement: SettlementInstruction) => void): () => void {
    const handlers = this.eventHandlers.get(status) ?? [];
    handlers.push(handler);
    this.eventHandlers.set(status, handlers);

    return () => {
      const h = this.eventHandlers.get(status);
      if (h) {
        const index = h.indexOf(handler);
        if (index >= 0) {
          h.splice(index, 1);
        }
      }
    };
  }

  private notifyEventHandlers(status: SettlementStatus, settlement: SettlementInstruction): void {
    const handlers = this.eventHandlers.get(status) ?? [];
    handlers.forEach(handler => handler(settlement));
  }

  getSettlementStats(): {
    total: number;
    pending: number;
    settled: number;
    failed: number;
    onHold: number;
    totalValue: string;
    settledValue: string;
  } {
    const settlements = Array.from(this.settlements.values());
    
    return {
      total: settlements.length,
      pending: settlements.filter(s => ['PENDING', 'INITIATED', 'AUTHORIZED', 'SUBMITTED', 'PROCESSING'].includes(s.status)).length,
      settled: settlements.filter(s => s.status === 'SETTLED').length,
      failed: settlements.filter(s => s.status === 'FAILED').length,
      onHold: settlements.filter(s => s.status === 'ON_HOLD').length,
      totalValue: settlements.reduce((sum, s) => sum + BigInt(s.amount), 0n).toString(),
      settledValue: settlements
        .filter(s => s.status === 'SETTLED')
        .reduce((sum, s) => sum + BigInt(s.amount), 0n)
        .toString(),
    };
  }
}

export const settlementService = new SettlementService();