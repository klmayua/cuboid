import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().min(1).max(100),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  legalName: z.string().min(1),
  displayName: z.string().min(1).max(100),
  country: z.string().length(2).toUpperCase(),
  entityType: z.enum(['RETAIL', 'BUSINESS', 'INSTITUTIONAL']),
  verificationTier: z.enum(['NONE', 'BASIC', 'ENHANCED', 'FULL']),
  trustScore: z.number().min(0).max(100),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const WalletSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  currency: z.string().length(3).toUpperCase(),
  balance: z.string(),
  availableBalance: z.string(),
  reservedBalance: z.string(),
  ledgerType: z.enum(['OPERATIONAL', 'ESCROW', 'RESERVE']),
  status: z.enum(['ACTIVE', 'FROZEN', 'CLOSED']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  sourceWalletId: z.string().uuid(),
  destinationWalletId: z.string().uuid().optional(),
  amount: z.string(),
  currency: z.string().length(3).toUpperCase(),
  corridor: z.string(),
  status: z.enum(['PENDING', 'VERIFIED', 'FUNDED', 'PROCESSING', 'SETTLED', 'FAILED', 'RETURNED', 'DISPUTED']),
  sourceCorridor: z.string().optional(),
  destinationCorridor: z.string().optional(),
  partnerId: z.string().uuid().optional(),
  quoteId: z.string().uuid().optional(),
  fees: z.string().optional(),
  exchangeRate: z.string().optional(),
  estimatedSettlement: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const QuoteSchema = z.object({
  id: z.string().uuid(),
  sourceCurrency: z.string().length(3).toUpperCase(),
  targetCurrency: z.string().length(3).toUpperCase(),
  sourceAmount: z.string(),
  targetAmount: z.string(),
  rate: z.string(),
  spread: z.string(),
  fees: z.string(),
  lockDuration: z.number(),
  expiresAt: z.string().datetime(),
  status: z.enum(['PENDING', 'LOCKED', 'EXPIRED', 'ACCEPTED']),
  createdAt: z.string().datetime(),
});

export const EscrowSchema = z.object({
  id: z.string().uuid(),
  walletId: z.string().uuid(),
  amount: z.string(),
  currency: z.string().length(3).toUpperCase(),
  status: z.enum(['PENDING', 'ACTIVE', 'RELEASED', 'RETURNED', 'DISPUTED', 'CANCELLED']),
  releaseConditions: z.array(z.object({
    id: z.string(),
    type: z.enum(['MILESTONE', 'DATE', 'MANUAL', 'AUTO']),
    description: z.string(),
    fulfilled: z.boolean(),
  })),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CounterpartySchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['INDIVIDUAL', 'BUSINESS', 'INSTITUTIONAL']),
  country: z.string().length(2).toUpperCase(),
  trustScore: z.number().min(0).max(100),
  verificationState: z.enum(['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED']),
  bankAccount: z.object({
    bankName: z.string(),
    accountNumber: z.string(),
    routingNumber: z.string().optional(),
  }).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const PartnerSchema = z.object({
  id: z.string().uuid(),
  legalName: z.string().min(1),
  type: z.enum(['BANK', 'IMTO', 'BDC', 'SWITCH', 'PAYMENT_PROCESSOR']),
  supportedCorridors: z.array(z.string()),
  supportedCurrencies: z.array(z.string().length(3)),
  trustScore: z.number().min(0).max(100),
  status: z.enum(['APPLIED', 'REVIEWING', 'DUE_DILIGENCE', 'TECHNICAL_VALIDATION', 'APPROVED', 'SANDBOX', 'PRODUCTION', 'RESTRICTED', 'SUSPENDED']),
  capabilities: z.array(z.enum(['QUOTE', 'FUND', 'HOLD', 'TRANSFER', 'PAYOUT', 'CONFIRM', 'REVERSE', 'RECONCILE', 'REPORT'])),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ComplianceCaseSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['KYC', 'KYB', 'AML', 'SAR', 'FRAUD', 'DISPUTE']),
  status: z.enum(['OPEN', 'UNDER_REVIEW', 'PENDING_DOCUMENTATION', 'RESOLVED', 'ESCALATED', 'CLOSED']),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  subjectId: z.string().uuid().optional(),
  assignedTo: z.string().uuid().optional(),
  resolution: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type Wallet = z.infer<typeof WalletSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Quote = z.infer<typeof QuoteSchema>;
export type Escrow = z.infer<typeof EscrowSchema>;
export type Counterparty = z.infer<typeof CounterpartySchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type ComplianceCase = z.infer<typeof ComplianceCaseSchema>;