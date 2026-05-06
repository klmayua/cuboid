export * from './value-objects/index.js';
export * from './entities/index.js';
export * from './events/index.js';
export * from './services/index.js';
export * from './aggregates/index.js';

export { Entity, type DomainEvent } from './entities/base-entity.js';
export { User, type UserProps, type UserData } from './entities/user.js';
export { Organization, type OrganizationProps, type OrganizationData } from './entities/organization.js';
export { Wallet, type WalletProps, type WalletData } from './entities/wallet.js';
export { Transaction, type TransactionProps, type TransactionData, TransactionType, TransactionDirection, TransactionStatus } from './entities/transaction.js';
export { Quote, type QuoteProps, type QuoteData, QuoteStatus } from './entities/quote.js';
export { Escrow, type EscrowProps, type EscrowData, EscrowStatus, type ReleaseCondition } from './entities/escrow.js';
export { Beneficiary, type BeneficiaryProps, type BeneficiaryData } from './entities/beneficiary.js';
export { Partner, type PartnerProps, type PartnerData, PartnerType, PartnerStatus, PartnerCapability } from './entities/partner.js';
export { ComplianceCase, type ComplianceCaseProps, type ComplianceCaseData, ComplianceCaseType, ComplianceCaseStatus, ComplianceCaseSeverity } from './entities/compliance-case.js';

export { Currency, type CurrencyLike, type SupportedCurrency, SUPPORTED_CURRENCIES } from './value-objects/currency.js';
export { Amount, type AmountLike, formatAmount, normalizeAmount, getDecimalPlaces } from './value-objects/amount.js';
export { EntityId, type EntityIdLike, generateEntityId } from './value-objects/entity-id.js';
export { Timestamp, type TimestampLike } from './value-objects/timestamp.js';
export { AddressValue, type Address, type CountryCode, CountryCodeSchema } from './value-objects/address.js';
export { MoneyAddressValue, type MoneyAddress, type MoneyAddressLike, type BankAccountAddress, type MobileMoneyAddress, type WalletAddress, type CardAddress, type CryptoWalletAddress } from './value-objects/money-address.js';
export { CorridorValue, type Corridor, type CorridorLike, CorridorType } from './value-objects/corridor.js';

export { DomainEvent, type DomainEventProps, type DomainEventData, type DomainEventType, createDomainEvent } from './events/base-event.js';
export { EventBus, EventHandler, EventSubscription, InMemoryEventBus, globalEventBus } from './events/event-bus.js';

export { LedgerService, ledgerService, type LedgerAccount, type LedgerEntry, type LedgerEntryType, type LedgerBalance, type LedgerStatement, type LedgerJournalEntry } from './services/ledger-domain-service.js';
export { TrustService, trustService, type TrustScore, type TrustSignal, type TrustFactor, type TrustFactorType, type TrustScoreLevel, type TrustPolicy } from './services/trust-service.js';
export { ComplianceService, complianceService, type ComplianceRule, type ComplianceRuleType, type ComplianceCheckResult, type ComplianceCheckRequest, type AmlCheckResult, type SanctionsMatch, type ComplianceAction } from './services/compliance-service.js';
export { PricingService, pricingService, type RateQuote, type CurrencyPair, type QuoteRequest, type QuoteResult, type Route, type PricingStrategy, type FeeStructure, type PricingNode } from './services/pricing-service.js';
export { SettlementService, settlementService, type SettlementInstruction, type SettlementStatus, type SettlementMode, type SettlementType, type SettlementBatch } from './services/settlement-service.js';
export { WorkflowService, workflowService, type WorkflowDefinition, type WorkflowExecution, type WorkflowStep, type WorkflowStatus, type StepStatus, type WorkflowContext, WORKFLOW_DEFINITIONS } from './services/workflow-service.js';

export { TransactionAggregate, type TransactionAggregateState } from './aggregates/transaction-aggregate.js';