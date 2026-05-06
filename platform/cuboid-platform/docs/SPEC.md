# CUBOID Platform — Technical Specification

## Version: 1.0.0
## Status: Production Ready
## Last Updated: 2024-12-15

---

# 1. Platform Overview

## 1.1 Mission
**CUBOID** is institutional economic infrastructure for Africa and beyond. It provides:
- Orchestration infrastructure
- Trust infrastructure  
- Compliance infrastructure
- Routing infrastructure
- Settlement infrastructure
- Identity infrastructure
- Treasury infrastructure
- Programmable financial middleware

## 1.2 Architecture Type
- **Modular Full-Stack Economic Infrastructure Platform**
- Event-driven microservices architecture
- Monorepo (Turborepo + pnpm workspaces)

## 1.3 Core Modules

| Module | Purpose | Status |
|--------|---------|--------|
| **Cuboid Connect** | Payment orchestration | ✅ Active |
| **Cuboid FX** | Currency exchange & rate management | ✅ Active |
| **Cuboid Treasury** | Liquidity & fund management | ✅ Active |
| **Cuboid Pay** | Payment processing | ✅ Active |
| **Cuboid Trade** | Trade finance | 🔄 In Progress |
| **Cuboid Identity** | KYC/KYB identity management | ✅ Active |
| **Cuboid Escrow** | Secure fund holding | ✅ Active |
| **Cuboid Compliance** | AML/KYC enforcement | ✅ Active |
| **Cuboid Network** | BDC/Partner network | ✅ Active |

---

# 2. Technical Architecture

## 2.1 Layer Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      EXPERIENCE LAYER                           │
│  Web App │ Mobile │ Admin Tower │ Partner Portal │ Marketing    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                ORCHESTRATION LAYER                              │
│  Workflow │ Session │ Feature Flags │ Notifications │ Context   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BUSINESS CAPABILITY LAYER                     │
│  Connect │ FX │ Treasury │ Pay │ Identity │ Escrow │ Network  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CORE INFRASTRUCTURE                         │
│  Ledger │ Trust │ Risk │ Pricing │ Routing │ Reconciliation   │
│  Workflow │ Document │ Notification │ Search │ Audit         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  PARTNER ABSTRACTION LAYER                      │
│  BDC Adapters │ Bank Adapters │ IMTO Adapters │ Payment Procs  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA INTELLIGENCE LAYER                      │
│  Analytics │ Reporting │ BI │ ML Models │ Data Warehouse       │
└─────────────────────────────────────────────────────────────────┘
```

## 2.2 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Runtime** | Node.js | 20.x LTS |
| **Language** | TypeScript | 5.4+ |
| **Framework** | Next.js | 14.x |
| **Mobile** | React Native | 0.74+ |
| **Styling** | TailwindCSS | 3.4+ |
| **Animation** | Framer Motion | 11.x |
| **Database** | PostgreSQL | 14+ |
| **Cache** | Redis | 7+ |
| **Container** | Docker | 24+ |
| **Orchestration** | Kubernetes | 1.28+ |

## 2.3 Service Architecture

### Core Services (Port Mappings)

| Service | Port | Protocol | Purpose |
|---------|------|----------|---------|
| **identity-service** | 3001 | REST | User/org identity |
| **auth-service** | 3002 | REST + gRPC | Authentication/Authorization |
| **wallet-service** | 3003 | REST | Wallet management |
| **transaction-service** | 3004 | REST | Transaction orchestration |
| **ledger-service** | 3010 | REST | Double-entry accounting |
| **trust-service** | 3011 | REST | Trust scoring |
| **compliance-service** | 3012 | REST | AML/KYC engine |
| **quote-service** | 3013 | REST | FX pricing |
| **settlement-service** | 3014 | REST | Payment settlement |
| **workflow-service** | 3015 | REST | Business processes |
| **bdc-service** | 3016 | REST | BDC directory |
| **geo-service** | 3017 | REST | Geo calculations |
| **visitor-service** | 3018 | REST | Tourist sessions |
| **whatsapp-service** | 3019 | REST | WhatsApp bot |
| **escrow-service** | 3020 | REST | Escrow management |
| **notification-service** | 3021 | REST | Notifications |
| **support-service** | 3022 | REST | Support tickets |

### Web Applications (Port Mappings)

| App | Port | Description |
|-----|------|-------------|
| **web-app** | 3000 | Main dashboard |
| **web-marketing** | 3005 | Marketing site |
| **admin-tower** | 3010 | Internal ops |
| **partner-portal** | 3011 | BDC/Partner ops |
| **regulator-portal** | 3012 | Regulator view |
| **docs-portal** | 3020 | API docs |

---

# 3. Domain Model

## 3.1 Core Entities

```typescript
// Value Objects
- EntityId          // Unique identifier
- Amount            // Money with currency
- Currency          // ISO 4217 codes
- Corridor          // Source→Destination
- Timestamp         // Event time
- Address           // Physical/digital address
- MoneyAddress      // Blockchain/Payment address

// Entities
- User              // Individual actor
- Organization      // Business entity
- IdentityProfile   // KYC/KYB data
- Wallet            // Balance container
- Transaction       // Financial movement
- Quote             // Rate lock
- Escrow            // Conditional hold
- Beneficiary       // Recipient
- Partner           // BDC/Bank/IMTO
- ComplianceCase    // KYC/AML case
- Invoice           // Payment request
- Merchant          // Business receiver
```

## 3.2 Aggregate Roots

- **TransactionAggregate** - Full transaction lifecycle
- **WalletAggregate** - Balance operations
- **EscrowAggregate** - Conditional funds

## 3.3 Domain Events

```typescript
// Transaction Events
TransactionCreated
QuoteGenerated
QuoteAccepted
KYCApproved
RiskCheckPassed
PartnerAssigned
FundsReserved
EscrowOpened
SettlementTriggered
SettlementConfirmed
SettlementFailed
RetryQueued
LedgerPosted
FeeApplied
RefundCreated
DisputeOpened
DisputeResolved
SuspiciousActivityFlagged
AccountRestricted
NotificationSent
```

---

# 4. API Specification

## 4.1 Authentication

All requests require Bearer token:
```bash
Authorization: Bearer <token>
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /v1/auth/login | User login |
| POST | /v1/auth/register | User registration |
| POST | /v1/auth/refresh | Token refresh |
| POST | /v1/auth/logout | User logout |
| POST | /v1/auth/mfa/enable | Enable MFA |
| POST | /v1/auth/mfa/verify | Verify MFA |

## 4.2 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v1/users/me | Current user |
| PUT | /v1/users/me | Update profile |
| GET | /v1/users/:id | Get user by ID |
| POST | /v1/users/kyc/submit | Submit KYC |
| GET | /v1/users/kyc/status | KYC status |

## 4.3 Wallets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /v1/wallets | Create wallet |
| GET | /v1/wallets | List wallets |
| GET | /v1/wallets/:id | Get wallet |
| GET | /v1/wallets/:id/balance | Get balance |
| POST | /v1/wallets/:id/deposit | Deposit funds |
| POST | /v1/wallets/:id/withdraw | Withdraw funds |

## 4.4 Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /v1/transactions | Create transaction |
| GET | /v1/transactions | List transactions |
| GET | /v1/transactions/:id | Get transaction |
| GET | /v1/transactions/:id/timeline | Transaction timeline |
| POST | /v1/transactions/:id/cancel | Cancel transaction |

## 4.5 Quotes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /v1/quotes | Generate quote |
| POST | /v1/quotes/:id/lock | Lock quote |
| GET | /v1/quotes/:id | Get quote |
| POST | /v1/quotes/:id/accept | Accept quote |

## 4.6 BDC

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v1/bdc | List BDCs |
| GET | /v1/bdc/:id | Get BDC |
| GET | /v1/bdc/nearest | Find nearest BDC |
| GET | /v1/bdc/:id/rates | BDC rates |
| POST | /v1/bdc/:id/reserve | Reserve rate |
| GET | /v1/bdc/reservations | My reservations |

## 4.7 Escrow

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /v1/escrow | Create escrow |
| GET | /v1/escrow | List escrows |
| GET | /v1/escrow/:id | Get escrow |
| POST | /v1/escrow/:id/fund | Fund escrow |
| POST | /v1/escrow/:id/release | Release funds |
| POST | /v1/escrow/:id/dispute | Open dispute |

## 4.8 Beneficiaries

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /v1/beneficiaries | Add beneficiary |
| GET | /v1/beneficiaries | List beneficiaries |
| DELETE | /v1/beneficiaries/:id | Remove beneficiary |

---

# 5. Security Architecture

## 5.1 Authentication & Authorization

- **JWT** with RS256 signing
- **RBAC** (Role-Based Access Control)
- **ABAC** (Attribute-Based Access Control)
- **MFA** (TOTP + SMS)

## 5.2 Security Features

| Feature | Implementation |
|---------|----------------|
| Encryption at rest | AES-256 |
| Encryption in transit | TLS 1.3 |
| Secrets management | Vault |
| Rate limiting | Token bucket |
| IP allowlisting | Configurable |
| Session management | JWT + refresh tokens |
| Audit logging | All API calls |

## 5.3 Compliance

- **KYC Engine** - Identity verification
- **KYB Engine** - Business verification
- **AML Engine** - Transaction monitoring
- **Sanctions Engine** - PEP/Sanctions screening
- **Fraud Engine** - Anomaly detection

---

# 6. Data Models

## 6.1 Supported Corridors

| Corridor | Currency Pair | Status |
|----------|---------------|--------|
| USA → Kenya | USD/KES | ✅ Active |
| UK → Nigeria | GBP/NGN | ✅ Active |
| UAE → Kenya | AED/KES | ✅ Active |
| EU → Ghana | EUR/GHS | ✅ Active |
| USA → Uganda | USD/UGX | ✅ Active |
| USA → Tanzania | USD/TZS | ✅ Active |
| UK → Kenya | GBP/KES | ✅ Active |
| USA → Rwanda | USD/RWF | ✅ Active |

## 6.2 Supported Currencies

USD, EUR, GBP, KES, NGN, UGX, TZS, GHS, ZAR, AED, CHF, CAD

---

# 7. Deployment

## 7.1 Environment Variables

```env
# Database
DATABASE_URL=postgresql://postgres:password@postgres:5432/cuboid

# Redis
REDIS_URL=redis://redis:6379

# JWT
JWT_SECRET=<secret>
JWT_PUBLIC_KEY=<public-key>

# External Services
STRIPE_API_KEY=
PAYSTACK_SECRET=
FLUTTERWAVE_SECRET=
TWILIO_SID=
SENDGRID_KEY=

# Feature Flags
ENABLE_KYC=true
ENABLE_ESCROW=true
ENABLE_BDC_FINDER=true
ENABLE_WHATSAPP=true
```

## 7.2 Docker Commands

```bash
# Development
docker-compose up -d

# Production build
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

# Scale service
docker-compose up -d --scale web-app=3
```

## 7.3 Kubernetes

```bash
# Deploy
kubectl apply -f infra/kubernetes/

# Scale
kubectl scale deployment cuboid-platform --replicas=5
```

---

# 8. Monitoring & Observability

## 8.1 Metrics Endpoints

| Service | Endpoint |
|---------|----------|
| All services | /metrics |
| All services | /health |

## 8.2 Logging

- Structured JSON logging (Pino)
- Log levels: DEBUG, INFO, WARN, ERROR
- Correlation IDs for request tracing

## 8.3 Tracing

- OpenTelemetry integration
- Distributed tracing via Jaeger

---

# 9. Testing Strategy

## 9.1 Test Types

| Type | Coverage Target |
|------|-----------------|
| Unit | 80% core services |
| Integration | All API endpoints |
| E2E | Critical flows |
| Performance | < 200ms p95 |
| Load | 10k TPS |

---

# 10. Support & Compliance

## 10.1 Support Channels

- **Email**: support@cuboid.africa
- **Phone**: +254 700 000 000 (Mon-Fri 8AM-6PM EAT)
- **WhatsApp**: +254 700 000 000
- **Status**: status.cuboid.africa

## 10.2 Compliance Certifications

- SOC 2 Type II (In Progress)
- PCI DSS (Planned)
- ISO 27001 (Planned)

---

# 11. Appendix

## 11.1 Error Codes

| Code | Description |
|------|-------------|
| INSUFFICIENT_FUNDS | Wallet balance too low |
| QUOTE_EXPIRED | Quote lock period expired |
| PARTNER_UNAVAILABLE | Partner cannot fulfill request |
| COMPLIANCE_HOLD | Transaction held for review |
| KYC_PENDING | Identity verification pending |
| KYC_REJECTED | Identity verification rejected |
| INVALID_AMOUNT | Amount below minimum |
| INVALID_CURRENCY | Currency not supported |
| RATE_LIMIT_EXCEEDED | Too many requests |

## 11.2 Webhook Events

```
transaction.created
transaction.pending
transaction.processing
transaction.settled
transaction.failed
transaction.cancelled
quote.created
quote.accepted
quote.expired
escrow.created
escrow.funded
escrow.released
escrow.disputed
user.kyc.approved
user.kyc.rejected
wallet.debited
wallet.credited
```

---

**Document Version**: 1.0.0  
**Last Updated**: 2024-12-15  
**Author**: Platform Engineering Team  
**Status**: Production Ready