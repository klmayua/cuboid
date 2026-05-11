import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'settlement-service' });

export enum SettlementStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  AUTHORIZED = 'AUTHORIZED',
  SUBMITTED = 'SUBMITTED',
  PROCESSING = 'PROCESSING',
  CONFIRMED = 'CONFIRMED',
  SETTLED = 'SETTLED',
  FAILED = 'FAILED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export enum SettlementMode {
  IMMEDIATE = 'IMMEDIATE',
  SCHEDULED = 'SCHEDULED',
  BATCH = 'BATCH',
  ESCROW = 'ESCROW',
}

export enum SettlementType {
  PUSH = 'PUSH',
  PULL = 'PULL',
  INTERNAL = 'INTERNAL',
  CROSS_CURRENCY = 'CROSS_CURRENCY',
  CROSS_BORDER = 'CROSS_BORDER',
}

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
  returnedAt?: string;
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
  status: 'OPEN' | 'LOCKED' | 'PROCESSING' | 'SETTLED' | 'FAILED' | 'PARTIAL';
  settlementIds: string[];
  totalAmount: string;
  currency: string;
  settledCount: number;
  failedCount: number;
  initiatedAt: string;
  processedAt?: string;
  settledAt?: string;
}

export interface SettlementEvent {
  type: string;
  settlementId: string;
  previousStatus?: SettlementStatus;
  newStatus: SettlementStatus;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

const STATE_TRANSITIONS: Record<SettlementStatus, SettlementStatus[]> = {
  [SettlementStatus.PENDING]: [SettlementStatus.INITIATED, SettlementStatus.CANCELLED, SettlementStatus.FAILED],
  [SettlementStatus.INITIATED]: [SettlementStatus.AUTHORIZED, SettlementStatus.CANCELLED, SettlementStatus.FAILED],
  [SettlementStatus.AUTHORIZED]: [SettlementStatus.SUBMITTED, SettlementStatus.CANCELLED, SettlementStatus.FAILED],
  [SettlementStatus.SUBMITTED]: [SettlementStatus.PROCESSING, SettlementStatus.FAILED],
  [SettlementStatus.PROCESSING]: [SettlementStatus.CONFIRMED, SettlementStatus.FAILED, SettlementStatus.ON_HOLD],
  [SettlementStatus.CONFIRMED]: [SettlementStatus.SETTLED, SettlementStatus.FAILED, SettlementStatus.RETURNED],
  [SettlementStatus.SETTLED]: [],
  [SettlementStatus.FAILED]: [SettlementStatus.RETURNED, SettlementStatus.CANCELLED, SettlementStatus.PENDING],
  [SettlementStatus.RETURNED]: [],
  [SettlementStatus.CANCELLED]: [],
  [SettlementStatus.ON_HOLD]: [SettlementStatus.PROCESSING, SettlementStatus.CANCELLED, SettlementStatus.FAILED],
};

export class SettlementService {
  private settlements: Map<string, SettlementInstruction> = new Map();
  private batches: Map<string, SettlementBatch> = new Map();
  private eventHandlers: Map<SettlementStatus, ((event: SettlementEvent) => void)[]> = new Map();

  constructor() {}

  async initialize(): Promise<void> {
    logger.info('Settlement service initialized');
  }

  create(data: {
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
      id: `stl_${uuidv4()}`,
      transactionId: data.transactionId,
      amount: data.amount,
      currency: data.currency.toUpperCase(),
      type: data.type,
      mode: data.mode,
      status: SettlementStatus.PENDING,
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
    logger.info({ settlementId: settlement.id, transactionId: data.transactionId }, 'Settlement created');
    
    return settlement;
  }

  get(settlementId: string): SettlementInstruction | undefined {
    return this.settlements.get(settlementId);
  }

  getByTransaction(transactionId: string): SettlementInstruction | undefined {
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
        `Allowed: ${allowedTransitions.join(', ')}`
      );
    }

    const previousStatus = currentStatus;
    const now = new Date().toISOString();
    settlement.status = newStatus;
    settlement.updatedAt = now;

    switch (newStatus) {
      case SettlementStatus.INITIATED: settlement.initiatedAt = now; break;
      case SettlementStatus.AUTHORIZED: settlement.authorizedAt = now; break;
      case SettlementStatus.SUBMITTED: settlement.submittedAt = now; break;
      case SettlementStatus.PROCESSING: settlement.processingAt = now; break;
      case SettlementStatus.CONFIRMED: settlement.confirmedAt = now; break;
      case SettlementStatus.SETTLED: settlement.settledAt = now; break;
      case SettlementStatus.FAILED: settlement.failedAt = now; break;
      case SettlementStatus.CANCELLED: break;
      case SettlementStatus.RETURNED: settlement.returnedAt = now; break;
      case SettlementStatus.ON_HOLD: break;
    }

    this.notifyHandlers({
      type: `settlement.${newStatus.toLowerCase()}`,
      settlementId,
      previousStatus,
      newStatus,
      timestamp: now,
    });

    logger.info(
      { settlementId, previousStatus, newStatus },
      'Settlement status transition'
    );

    return settlement;
  }

  canTransition(settlementId: string, newStatus: SettlementStatus): { allowed: boolean; reason?: string } {
    const settlement = this.settlements.get(settlementId);
    if (!settlement) {
      return { allowed: false, reason: 'Settlement not found' };
    }

    const allowed = (STATE_TRANSITIONS[settlement.status] ?? []).includes(newStatus);
    return {
      allowed,
      reason: allowed ? undefined : `Cannot transition from ${settlement.status} to ${newStatus}`,
    };
  }

  initiate(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.INITIATED);
  }

  authorize(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.AUTHORIZED);
  }

  submit(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.SUBMITTED);
  }

  process(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.PROCESSING);
  }

  confirm(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.CONFIRMED);
  }

  settle(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.SETTLED);
  }

  fail(settlementId: string, reason: string): SettlementInstruction | null {
    const settlement = this.transition(settlementId, SettlementStatus.FAILED);
    if (settlement) {
      settlement.failureReason = reason;
    }
    return settlement;
  }

  hold(settlementId: string, reason: string): SettlementInstruction | null {
    const settlement = this.transition(settlementId, SettlementStatus.ON_HOLD);
    if (settlement) {
      settlement.onHoldReason = reason;
    }
    return settlement;
  }

  release(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.PROCESSING);
  }

  return(settlementId: string, reason: string): SettlementInstruction | null {
    const settlement = this.transition(settlementId, SettlementStatus.RETURNED);
    if (settlement) {
      settlement.returnReason = reason;
    }
    return settlement;
  }

  cancel(settlementId: string): SettlementInstruction | null {
    return this.transition(settlementId, SettlementStatus.CANCELLED);
  }

  retry(settlementId: string): SettlementInstruction | null {
    const settlement = this.settlements.get(settlementId);
    if (!settlement) {
      throw new Error(`Settlement not found: ${settlementId}`);
    }

    if (settlement.retryCount >= settlement.maxRetries) {
      throw new Error(`Max retries exceeded for settlement: ${settlementId}`);
    }

    if (![SettlementStatus.FAILED, SettlementStatus.ON_HOLD].includes(settlement.status)) {
      throw new Error(`Cannot retry settlement in status: ${settlement.status}`);
    }

    settlement.retryCount += 1;
    settlement.status = SettlementStatus.PENDING;
    settlement.updatedAt = new Date().toISOString();
    settlement.failureReason = undefined;
    settlement.onHoldReason = undefined;

    logger.info({ settlementId, retryCount: settlement.retryCount }, 'Settlement queued for retry');
    
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
      id: `bat_${uuidv4()}`,
      status: 'OPEN',
      settlementIds,
      totalAmount,
      currency,
      settledCount: 0,
      failedCount: 0,
      initiatedAt: new Date().toISOString(),
    };

    this.batches.set(batch.id, batch);
    logger.info({ batchId: batch.id, settlementCount: settlementIds.length }, 'Settlement batch created');
    
    return batch;
  }

  lockBatch(batchId: string): SettlementBatch | null {
    const batch = this.batches.get(batchId);
    if (!batch || batch.status !== 'OPEN') return null;
    batch.status = 'LOCKED';
    return batch;
  }

  processBatch(batchId: string): SettlementBatch | null {
    const batch = this.batches.get(batchId);
    if (!batch || batch.status !== 'LOCKED') return null;

    batch.status = 'PROCESSING';
    batch.processedAt = new Date().toISOString();

    let settled = 0, failed = 0;
    
    for (const settlementId of batch.settlementIds) {
      try {
        this.transition(settlementId, SettlementStatus.SUBMITTED);
        this.transition(settlementId, SettlementStatus.PROCESSING);
        this.transition(settlementId, SettlementStatus.CONFIRMED);
        this.transition(settlementId, SettlementStatus.SETTLED);
        settled++;
      } catch (error) {
        this.fail(settlementId, `Batch processing failed: ${error}`);
        failed++;
      }
    }

    batch.settledCount = settled;
    batch.failedCount = failed;
    batch.status = failed > 0 && settled === 0 ? 'FAILED' : 'SETTLED';
    
    if (batch.status === 'SETTLED') {
      batch.settledAt = new Date().toISOString();
    }

    return batch;
  }

  onStatusChange(status: SettlementStatus, handler: (event: SettlementEvent) => void): () => void {
    const handlers = this.eventHandlers.get(status) ?? [];
    handlers.push(handler);
    this.eventHandlers.set(status, handlers);

    return () => {
      const h = this.eventHandlers.get(status);
      if (h) {
        const index = h.indexOf(handler);
        if (index >= 0) h.splice(index, 1);
      }
    };
  }

  private notifyHandlers(event: SettlementEvent): void {
    const handlers = this.eventHandlers.get(event.newStatus) ?? [];
    handlers.forEach(handler => handler(event));
  }

  getAll(filter?: {
    status?: SettlementStatus;
    currency?: string;
    partnerId?: string;
    fromDate?: string;
    toDate?: string;
  }): SettlementInstruction[] {
    let results = Array.from(this.settlements.values());

    if (filter?.status) results = results.filter(s => s.status === filter.status);
    if (filter?.currency) results = results.filter(s => s.currency === filter.currency);
    if (filter?.partnerId) results = results.filter(s => s.partnerId === filter.partnerId);
    if (filter?.fromDate) results = results.filter(s => s.createdAt >= filter.fromDate!);
    if (filter?.toDate) results = results.filter(s => s.createdAt <= filter.toDate!);

    return results;
  }

  getStats(): {
    total: number;
    byStatus: Record<SettlementStatus, number>;
    totalValue: string;
    settledValue: string;
    failedValue: string;
    batchCount: number;
  } {
    const settlements = Array.from(this.settlements.values());
    
    const byStatus: Record<SettlementStatus, number> = {} as Record<SettlementStatus, number>;
    for (const status of Object.values(SettlementStatus)) {
      byStatus[status] = 0;
    }
    
    let totalValue = 0n, settledValue = 0n, failedValue = 0n;
    
    for (const s of settlements) {
      byStatus[s.status]++;
      totalValue += BigInt(s.amount);
      if (s.status === SettlementStatus.SETTLED) {
        settledValue += BigInt(s.amount);
      }
      if (s.status === SettlementStatus.FAILED) {
        failedValue += BigInt(s.amount);
      }
    }

    return {
      total: settlements.length,
      byStatus,
      totalValue: totalValue.toString(),
      settledValue: settledValue.toString(),
      failedValue: failedValue.toString(),
      batchCount: this.batches.size,
    };
  }
}

export const settlementService = new SettlementService();

if (require.main === module) {
  (async () => {
    await settlementService.initialize();
    logger.info('Settlement service running');
  })();
}