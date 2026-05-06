import { z } from 'zod';

export const EVENT_VERSION = '1.0.0';

export const EventMetadataSchema = z.object({
  correlationId: z.string().optional(),
  causationId: z.string().optional(),
  userId: z.string().optional(),
  organizationId: z.string().optional(),
  sourceService: z.string(),
  version: z.string().default(EVENT_VERSION),
  timestamp: z.string().datetime(),
  traceId: z.string().optional(),
  spanId: z.string().optional(),
});

export type EventMetadata = z.infer<typeof EventMetadataSchema>;

export const BaseEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: EventMetadataSchema,
  payload: z.record(z.unknown()),
});

export type BaseEvent = z.infer<typeof BaseEventSchema>;

export const EventContracts = {
  IDENTITY: {
    USER_CREATED: 'identity.user.created',
    USER_UPDATED: 'identity.user.updated',
    USER_VERIFIED: 'identity.user.verified',
    USER_SUSPENDED: 'identity.user.suspended',
    USER_DELETED: 'identity.user.deleted',
    USER_LOGIN: 'identity.user.login',
    USER_LOGOUT: 'identity.user.logout',
    ORGANIZATION_CREATED: 'identity.organization.created',
    ORGANIZATION_UPDATED: 'identity.organization.updated',
    ORGANIZATION_VERIFIED: 'identity.organization.verified',
    ORGANIZATION_SUSPENDED: 'identity.organization.suspended',
  },
  TRANSACTION: {
    CREATED: 'transaction.created',
    VERIFIED: 'transaction.verified',
    FUNDED: 'transaction.funded',
    PROCESSING: 'transaction.processing',
    SETTLED: 'transaction.settled',
    FAILED: 'transaction.failed',
    RETURNED: 'transaction.returned',
    DISPUTED: 'transaction.disputed',
    CANCELLED: 'transaction.cancelled',
    RETRY_QUEUED: 'transaction.retry.queued',
  },
  QUOTE: {
    REQUESTED: 'quote.requested',
    GENERATED: 'quote.generated',
    LOCKED: 'quote.locked',
    EXPIRED: 'quote.expired',
    ACCEPTED: 'quote.accepted',
    REJECTED: 'quote.rejected',
  },
  ESCROW: {
    CREATED: 'escrow.created',
    ACTIVATED: 'escrow.activated',
    MILESTONE_ACHIEVED: 'escrow.milestone.achieved',
    COMPLETED: 'escrow.completed',
    RELEASED: 'escrow.released',
    RETURNED: 'escrow.returned',
    DISPUTED: 'escrow.disputed',
    CANCELLED: 'escrow.cancelled',
  },
  SETTLEMENT: {
    INITIATED: 'settlement.initiated',
    AUTHORIZED: 'settlement.authorized',
    SUBMITTED: 'settlement.submitted',
    PROCESSING: 'settlement.processing',
    CONFIRMED: 'settlement.confirmed',
    SETTLED: 'settlement.settled',
    FAILED: 'settlement.failed',
    RETURNED: 'settlement.returned',
    CANCELLED: 'settlement.cancelled',
    ON_HOLD: 'settlement.on_hold',
    RETRY_QUEUED: 'settlement.retry.queued',
  },
  COMPLIANCE: {
    CHECK_INITIATED: 'compliance.check.initiated',
    CHECK_PASSED: 'compliance.check.passed',
    CHECK_FAILED: 'compliance.check.failed',
    HOLD_APPLIED: 'compliance.hold.applied',
    HOLD_RELEASED: 'compliance.hold.released',
    ALERT_TRIGGERED: 'compliance.alert.triggered',
    CASE_OPENED: 'compliance.case.opened',
    CASE_ASSIGNED: 'compliance.case.assigned',
    CASE_ESCALATED: 'compliance.case.escalated',
    CASE_RESOLVED: 'compliance.case.resolved',
    CASE_CLOSED: 'compliance.case.closed',
    SANCTIONS_MATCH: 'compliance.sanctions.match',
    PEP_MATCH: 'compliance.pep.match',
  },
  TRUST: {
    SCORE_UPDATED: 'trust.score.updated',
    REVIEW_TRIGGERED: 'trust.review.triggered',
    DEVICE_TRUST_UPDATED: 'trust.device.updated',
    BEHAVIOR_ANOMALY_DETECTED: 'trust.behavior.anomaly.detected',
    RISK_SIGNAL_GENERATED: 'trust.risk_signal.generated',
  },
  FRAUD: {
    ALERT_TRIGGERED: 'fraud.alert.triggered',
    INVESTIGATION_OPENED: 'fraud.investigation.opened',
    BLOCKED: 'fraud.blocked',
    RULE_TRIGGERED: 'fraud.rule.triggered',
    SCORE_UPDATED: 'fraud.score.updated',
  },
  PARTNER: {
    CREATED: 'partner.created',
    APPROVED: 'partner.approved',
    SUSPENDED: 'partner.suspended',
    RESTRICTED: 'partner.restricted',
    TERMINATED: 'partner.terminated',
    STATUS_UPDATED: 'partner.status.updated',
    INCIDENT_REPORTED: 'partner.incident.reported',
  },
  WALLET: {
    CREATED: 'wallet.created',
    ACTIVATED: 'wallet.activated',
    BALANCE_UPDATED: 'wallet.balance.updated',
    FROZEN: 'wallet.frozen',
    UNFROZEN: 'wallet.unfrozen',
    CLOSED: 'wallet.closed',
    LIMIT_UPDATED: 'wallet.limit.updated',
  },
  NOTIFICATION: {
    SENT: 'notification.sent',
    DELIVERED: 'notification.delivered',
    FAILED: 'notification.failed',
    READ: 'notification.read',
  },
  SUPPORT: {
    TICKET_CREATED: 'support.ticket.created',
    TICKET_ASSIGNED: 'support.ticket.assigned',
    TICKET_UPDATED: 'support.ticket.updated',
    TICKET_RESOLVED: 'support.ticket.resolved',
    TICKET_CLOSED: 'support.ticket.closed',
  },
  LEDGER: {
    ENTRY_CREATED: 'ledger.entry.created',
    JOURNAL_CREATED: 'ledger.journal.created',
    RECONCILIATION_COMPLETED: 'ledger.reconciliation.completed',
    BALANCE_UPDATED: 'ledger.balance.updated',
  },
  WORKFLOW: {
    STARTED: 'workflow.started',
    STEP_COMPLETED: 'workflow.step.completed',
    STEP_FAILED: 'workflow.step.failed',
    COMPLETED: 'workflow.completed',
    FAILED: 'workflow.failed',
    CANCELLED: 'workflow.cancelled',
  },
} as const;

export type EventContract = typeof EventContracts;

const IdentityPayloadSchema = {
  USER_CREATED: z.object({
    userId: z.string().uuid(),
    email: z.string().email(),
    displayName: z.string(),
    organizationId: z.string().uuid().optional(),
    verificationTier: z.enum(['NONE', 'BASIC', 'ENHANCED', 'FULL']),
  }),
  USER_VERIFIED: z.object({
    userId: z.string().uuid(),
    verificationTier: z.enum(['BASIC', 'ENHANCED', 'FULL']),
    kycLevel: z.number().min(0).max(10),
  }),
  USER_SUSPENDED: z.object({
    userId: z.string().uuid(),
    reason: z.string(),
    suspendedBy: z.string().uuid(),
  }),
  ORGANIZATION_CREATED: z.object({
    organizationId: z.string().uuid(),
    legalName: z.string(),
    displayName: z.string(),
    type: z.enum(['RETAIL', 'BUSINESS', 'INSTITUTIONAL']),
    country: z.string().length(2),
  }),
  ORGANIZATION_VERIFIED: z.object({
    organizationId: z.string().uuid(),
    verificationTier: z.enum(['BASIC', 'ENHANCED', 'FULL']),
  }),
};

const TransactionPayloadSchema = {
  CREATED: z.object({
    transactionId: z.string().uuid(),
    type: z.enum(['PAYOUT', 'COLLECTION', 'TRANSFER', 'EXCHANGE', 'REFUND', 'REVERSAL']),
    direction: z.enum(['CREDIT', 'DEBIT']),
    sourceWalletId: z.string().uuid().optional(),
    destinationWalletId: z.string().uuid().optional(),
    sourceAmount: z.string(),
    sourceCurrency: z.string().length(3),
    destinationAmount: z.string(),
    destinationCurrency: z.string().length(3),
    reference: z.string(),
    status: z.enum(['PENDING', 'VERIFIED', 'FUNDED', 'PROCESSING', 'SETTLED', 'FAILED', 'RETURNED', 'DISPUTED']),
  }),
  SETTLED: z.object({
    transactionId: z.string().uuid(),
    settledAt: z.string().datetime(),
    destinationAmount: z.string(),
    settlementId: z.string().uuid().optional(),
  }),
  FAILED: z.object({
    transactionId: z.string().uuid(),
    failureReason: z.string(),
    failedAt: z.string().datetime(),
  }),
};

const QuotePayloadSchema = {
  REQUESTED: z.object({
    quoteId: z.string().uuid(),
    sourceCurrency: z.string().length(3),
    targetCurrency: z.string().length(3),
    sourceAmount: z.string().optional(),
    targetAmount: z.string().optional(),
    corridorId: z.string(),
    partnerId: z.string().uuid().optional(),
  }),
  GENERATED: z.object({
    quoteId: z.string().uuid(),
    sourceCurrency: z.string().length(3),
    targetCurrency: z.string().length(3),
    sourceAmount: z.string(),
    targetAmount: z.string(),
    rate: z.string(),
    spread: z.string(),
    fees: z.string(),
    expiresAt: z.string().datetime(),
  }),
  LOCKED: z.object({
    quoteId: z.string().uuid(),
    lockedAt: z.string().datetime(),
    lockDuration: z.number(),
  }),
  EXPIRED: z.object({
    quoteId: z.string().uuid(),
    expiredAt: z.string().datetime(),
  }),
  ACCEPTED: z.object({
    quoteId: z.string().uuid(),
    transactionId: z.string().uuid(),
    acceptedAt: z.string().datetime(),
  }),
};

const SettlementPayloadSchema = {
  INITIATED: z.object({
    settlementId: z.string().uuid(),
    transactionId: z.string().uuid(),
    amount: z.string(),
    currency: z.string().length(3),
    type: z.enum(['PUSH', 'PULL', 'INTERNAL', 'CROSS_CURRENCY', 'CROSS_BORDER']),
    mode: z.enum(['IMMEDIATE', 'SCHEDULED', 'BATCH', 'ESCROW']),
    sourceAccountId: z.string(),
    destinationAccountId: z.string(),
    partnerId: z.string().uuid().optional(),
  }),
  SETTLED: z.object({
    settlementId: z.string().uuid(),
    transactionId: z.string().uuid(),
    settledAt: z.string().datetime(),
    confirmationReference: z.string().optional(),
  }),
  FAILED: z.object({
    settlementId: z.string().uuid(),
    transactionId: z.string().uuid(),
    failureReason: z.string(),
    retryCount: z.number(),
    maxRetries: z.number(),
  }),
  ON_HOLD: z.object({
    settlementId: z.string().uuid(),
    reason: z.string(),
    holdBy: z.string().uuid().optional(),
  }),
};

const CompliancePayloadSchema = {
  CHECK_INITIATED: z.object({
    checkId: z.string().uuid(),
    entityType: z.enum(['USER', 'ORGANIZATION', 'TRANSACTION', 'BENEFICIARY', 'PARTNER']),
    entityId: z.string().uuid(),
    checkType: z.string(),
  }),
  CHECK_PASSED: z.object({
    checkId: z.string().uuid(),
    entityId: z.string().uuid(),
    riskScore: z.number(),
    checksPerformed: z.array(z.string()),
  }),
  CHECK_FAILED: z.object({
    checkId: z.string().uuid(),
    entityId: z.string().uuid(),
    failedChecks: z.array(z.string()),
    action: z.enum(['BLOCK', 'HOLD', 'REVIEW', 'REJECT']),
  }),
  CASE_OPENED: z.object({
    caseId: z.string().uuid(),
    type: z.enum(['KYC', 'KYB', 'AML', 'SAR', 'FRAUD', 'DISPUTE', 'SANCTIONS', 'PEP']),
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    subjectType: z.enum(['USER', 'ORGANIZATION', 'TRANSACTION', 'BENEFICIARY', 'PARTNER']),
    subjectId: z.string().uuid(),
    description: z.string(),
  }),
  CASE_RESOLVED: z.object({
    caseId: z.string().uuid(),
    resolution: z.string(),
    resolvedBy: z.string().uuid(),
    resolvedAt: z.string().datetime(),
  }),
};

const TrustPayloadSchema = {
  SCORE_UPDATED: z.object({
    entityId: z.string().uuid(),
    entityType: z.enum(['USER', 'ORGANIZATION', 'BENEFICIARY', 'PARTNER']),
    previousScore: z.number(),
    newScore: z.number(),
    level: z.enum(['NONE', 'LOW', 'MEDIUM', 'HIGH', 'EXCELLENT']),
    factors: z.array(z.object({
      type: z.string(),
      score: z.number(),
      reason: z.string().optional(),
    })),
  }),
  RISK_SIGNAL_GENERATED: z.object({
    signalId: z.string().uuid(),
    entityId: z.string().uuid(),
    entityType: z.enum(['USER', 'ORGANIZATION', 'BENEFICIARY', 'PARTNER']),
    type: z.string(),
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    description: z.string(),
    evidence: z.record(z.unknown()).optional(),
  }),
};

const WalletPayloadSchema = {
  CREATED: z.object({
    walletId: z.string().uuid(),
    organizationId: z.string().uuid(),
    currency: z.string().length(3),
    ledgerType: z.enum(['OPERATIONAL', 'ESCROW', 'RESERVE', 'SETTLEMENT']),
  }),
  BALANCE_UPDATED: z.object({
    walletId: z.string().uuid(),
    previousBalance: z.string(),
    newBalance: z.string(),
    availableBalance: z.string(),
    reservedBalance: z.string(),
    changeType: z.enum(['CREDIT', 'DEBIT', 'RESERVE', 'RELEASE', 'FEE', 'REFUND']),
    transactionId: z.string().uuid().optional(),
  }),
  FROZEN: z.object({
    walletId: z.string().uuid(),
    reason: z.string(),
    freezeType: z.enum(['FULL', 'PARTIAL']),
    limitedAmount: z.string().optional(),
  }),
  UNFROZEN: z.object({
    walletId: z.string().uuid(),
    releasedBy: z.string().uuid(),
  }),
};

const LedgerPayloadSchema = {
  ENTRY_CREATED: z.object({
    entryId: z.string().uuid(),
    accountId: z.string(),
    transactionId: z.string().uuid(),
    type: z.enum(['CREDIT', 'DEBIT', 'RESERVE', 'RELEASE', 'FEE', 'REFUND', 'ADJUSTMENT']),
    amount: z.string(),
    balanceAfter: z.string(),
    reference: z.string(),
    description: z.string().optional(),
  }),
  JOURNAL_CREATED: z.object({
    journalId: z.string().uuid(),
    transactionId: z.string().uuid(),
    description: z.string(),
    entries: z.array(z.object({
      accountId: z.string(),
      type: z.enum(['CREDIT', 'DEBIT', 'RESERVE', 'RELEASE', 'FEE', 'REFUND']),
      amount: z.string(),
      currency: z.string().length(3),
    })),
  }),
  RECONCILIATION_COMPLETED: z.object({
    accountId: z.string(),
    isBalanced: z.boolean(),
    discrepancy: z.string().optional(),
    reconciledAt: z.string().datetime(),
  }),
};

const WorkflowPayloadSchema = {
  STARTED: z.object({
    executionId: z.string().uuid(),
    workflowId: z.string(),
    input: z.record(z.unknown()),
    startedBy: z.string().uuid().optional(),
  }),
  STEP_COMPLETED: z.object({
    executionId: z.string().uuid(),
    workflowId: z.string(),
    stepId: z.string(),
    stepName: z.string(),
    output: z.record(z.unknown()).optional(),
  }),
  STEP_FAILED: z.object({
    executionId: z.string().uuid(),
    workflowId: z.string(),
    stepId: z.string(),
    stepName: z.string(),
    error: z.string(),
    retryable: z.boolean(),
  }),
  COMPLETED: z.object({
    executionId: z.string().uuid(),
    workflowId: z.string(),
    output: z.record(z.unknown()).optional(),
    completedAt: z.string().datetime(),
  }),
  FAILED: z.object({
    executionId: z.string().uuid(),
    workflowId: z.string(),
    error: z.string(),
    failedAt: z.string().datetime(),
  }),
};

export const EventPayloadSchemas = {
  identity: IdentityPayloadSchema,
  transaction: TransactionPayloadSchema,
  quote: QuotePayloadSchema,
  settlement: SettlementPayloadSchema,
  compliance: CompliancePayloadSchema,
  trust: TrustPayloadSchema,
  wallet: WalletPayloadSchema,
  ledger: LedgerPayloadSchema,
  workflow: WorkflowPayloadSchema,
} as const;

export function validateEventPayload<T>(
  eventType: string,
  payload: unknown
): T {
  const [namespace, eventName] = eventType.split('.');
  const namespaceSchemas = EventPayloadSchemas[namespace as keyof typeof EventPayloadSchemas];
  
  if (!namespaceSchemas) {
    throw new Error(`Unknown event namespace: ${namespace}`);
  }

  const schema = namespaceSchemas[eventName as keyof typeof namespaceSchemas];
  
  if (!schema) {
    throw new Error(`Unknown event type: ${eventType}`);
  }

  const result = schema.safeParse(payload);
  
  if (!result.success) {
    throw new Error(`Invalid payload for ${eventType}: ${result.error.message}`);
  }

  return result.data as T;
}

export function createEvent<T>(
  type: string,
  payload: T,
  metadata: Partial<EventMetadata> = {}
): BaseEvent {
  const fullMetadata: EventMetadata = {
    sourceService: metadata.sourceService ?? 'unknown',
    version: EVENT_VERSION,
    timestamp: new Date().toISOString(),
    ...metadata,
  };

  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    type,
    metadata: fullMetadata,
    payload: payload as Record<string, unknown>,
  };
}

export default EventContracts;