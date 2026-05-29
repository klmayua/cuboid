# CUBOID Platform — Architecture Report
## Phase 01: Reconnaissance Findings
### Generated: 2026-05-30

---

## 1. Repository Topology

```
cuboid/platform/cuboid-platform/
├── apps/                    # 8 deployable applications
│   ├── web-app             # Main dashboard (Next.js 14)
│   ├── web-marketing       # Marketing landing (Next.js 14)
│   ├── admin-tower         # Admin control panel (Next.js 14)
│   ├── partner-portal      # Partner operations (Next.js 14)
│   ├── regulator-portal    # Regulatory view (Next.js 14)
│   ├── internal-tools      # Internal tooling (Next.js 14)
│   ├── docs-portal         # API documentation (Next.js 14)
│   └── mobile-android      # React Native mobile (RN 0.73)
├── services/                # 27 microservices (+1 _template stub)
│   ├── Core (with internal deps): identity, auth, ledger, trust, 
│   │   compliance, quote, settlement, workflow, bdc, geo, visitor
│   ├── Support: analytics, billing, cms, document, escrow, fraud,
│   │   notification, partner-adapter, passkeys, payment, pricing,
│   │   risk, support, transaction, wallet, whatsapp
│   └── _template           # Empty scaffold (no package.json)
├── packages/                # 12 shared packages
│   ├── Active: api-sdk, config, database, design-system, domain-core,
│   │   schemas, sdk-generator, seed-data, tokens
│   └── Stubs: event-contracts, observability-kit, security-kit
├── docs/                    # 4 documentation files
│   ├── SPEC.md (490 lines) - Technical specification
│   ├── api-reference.md (620 lines) - API documentation
│   ├── RUNBOOK.md (351 lines) - DevOps runbook
│   └── schema.sql (135 lines) - Database schema
├── infra/                   # Deployment infrastructure
│   ├── kubernetes/deployment.yaml - K8s manifests
│   └── helm/cuboid-service/ - Helm chart
├── .github/workflows/ci.yml # CI/CD pipeline
├── docker-compose.yml       # Local dev orchestration
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # Workspace definition
├── turbo.json               # Turborepo pipeline
└── tsconfig.json             # Base TypeScript config
```

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Package Manager** | pnpm | 8.15.0 |
| **Build System** | Turborepo | 1.12.4 |
| **Language** | TypeScript | 5.4.0 |
| **Frontend** | Next.js | 14.1.0 |
| **Frontend** | React | 18.2.0 |
| **Mobile** | React Native | 0.73.4 |
| **Styling** | Tailwind CSS | 3.4.1 |
| **Animation** | Framer Motion | 11.0.0 |
| **Icons** | Lucide React | 0.312.0 |
| **State (web)** | Zustand | 4.5.0 |
| **Data Fetching** | TanStack React Query | 5.24.0 |
| **ORM** | Prisma | 5.10.0 |
| **Database** | PostgreSQL | 14 (Docker) |
| **Cache** | Redis | 7 (Docker) |
| **Validation** | Zod | 3.22.4 |
| **Auth** | bcryptjs + jsonwebtoken | 2.4.3 / 9.0.3 |
| **Payments** | Stripe | (in deps) |
| **Observability** | Pino | (in services) |

## 3. Application Architecture

### 3.1 Web Applications (Next.js)

| App | Internal Deps | Scripts | State |
|-----|--------------|---------|-------|
| web-app | 4 (api-sdk, design-system, domain-core, tokens) | dev, build, start, lint, typecheck | Complete |
| web-marketing | 2 (api-sdk, domain-core) | dev, build, start, lint | No typecheck |
| admin-tower | 2 (design-system, tokens) | dev, build, start, typecheck | No lint |
| partner-portal | 1 (design-system) | dev, build, typecheck | No lint |
| regulator-portal | 1 (design-system) | dev, build, typecheck | No lint |
| internal-tools | 0 | dev, build | Minimal |
| docs-portal | 0 | dev, build | Minimal |
| mobile-android | 0 | android, ios, build:android, lint, typecheck | RN, no test |

### 3.2 Microservices (Node.js/TypeScript)

| Category | Count | Services |
|----------|-------|----------|
| Domain-heavy (3 deps) | 1 | compliance |
| Domain-heavy (2 deps) | 5 | quote, settlement, trust, ledger, workflow |
| Schema-dependent | 4 | escrow, identity, transaction, wallet |
| Standalone | 17 | analytics, auth, bdc, billing, cms, document, fraud, geo, notification, partner-adapter, passkeys, payment, pricing, risk, support, visitor, whatsapp |

## 4. Dependency Architecture

### 4.1 Package Dependency Graph

```
web-app ──────┐
              ├──→ api-sdk ──────→ domain-core ──→ database (Prisma)
              │       └──→ schemas (Zod)
              ├──→ design-system ─→ tokens (Tailwind)
              └──→ tokens

web-marketing ───→ api-sdk ──────→ domain-core
                       └──→ schemas

admin-tower ────────→ design-system ─→ tokens
                    └──→ tokens

partner-portal ──────→ design-system

regulator-portal ────→ design-system

compliance-service ──→ domain-core + event-contracts + schemas
ledger-service ──────→ domain-core + event-contracts
quote-service ───────→ domain-core + event-contracts
settlement-service ──→ domain-core + event-contracts
trust-service ───────→ domain-core + event-contracts
workflow-service ────→ domain-core + event-contracts
escrow-service ──────→ schemas
identity-service ────→ schemas
transaction-service ─→ schemas
wallet-service ──────→ schemas
```

### 4.2 External Dependencies per Layer

| Layer | Common Dependencies |
|-------|-------------------|
| **Apps** | next, react, react-dom, tailwindcss, typescript |
| **Services** | uuid (universal, 27/27), pino (9/27, logging), zod (5/27) |
| **Packages** | zod (4/12), typescript (12/12) |

## 5. Infrastructure

### 5.1 Docker Compose Services (18 containers)
- **Databases:** PostgreSQL 14, Redis 7
- **Core Services (12):** identity, auth, ledger, trust, compliance, quote, settlement, workflow, bdc, geo, visitor, whatsapp
- **Web Apps (6):** web-app, web-marketing, admin-tower, docs-portal, partner-portal, regulator-portal

### 5.2 Kubernetes
- Deployment: 3 replicas, 256Mi-512Mi, 250m-500m
- Service: ClusterIP on port 80 → 3000
- Ingress: NGINX with Let's Encrypt TLS for api.cuboid.io, app.cuboid.io

### 5.3 CI/CD Pipeline
- Triggers: push to main/develop, PRs to main
- Jobs: lint → typecheck → build (Turbo) → test → deploy-staging/production
- Note: Deploy steps are placeholder `echo` commands

## 6. Documentation Coverage

| Document | Status | Lines |
|----------|--------|-------|
| SPEC.md | Complete | 490 |
| api-reference.md | Complete | 620 |
| RUNBOOK.md | Complete | 351 |
| schema.sql | Complete | 135 |
| DEPLOYMENT.md | Complete | 108 |
| README.md | Complete | 58 |
| DESIGN.md | Complete | 54 |

## 7. Key Architecture Observations

1. **Heavily stubbed**: 3 of 12 packages are empty shells (event-contracts, observability-kit, security-kit)
2. **No test infrastructure**: No app has test scripts. Only identity-service has tests.
3. **Inconsistent tooling**: payment-service uses ts-node-dev while others use tsx
4. **Version drift**: payment-service is v1.0.0, all others are v0.0.0
5. **Missing scripts**: 6/8 apps lack lint scripts, 8/8 lack test scripts
6. **_template service**: Stub directory with no package.json
7. **package.json.bak**: Orphaned backup file at root
8. **CI deploy stubs**: Both deploy-production and deploy-staging are echo placeholders
9. **Multiple env files**: .env.example (root) + .env.local.example (Next.js), potential confusion
