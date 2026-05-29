# CUBOID Platform — Dependency Map
## Phase 01: Complete Dependency Analysis
### Generated: 2026-05-30

---

## 1. Internal Dependency Matrix

### Apps → Packages

| App | api-sdk | design-system | domain-core | tokens |
|-----|---------|---------------|-------------|--------|
| web-app | ✓ | ✓ | ✓ | ✓ |
| web-marketing | ✓ | - | ✓ | - |
| admin-tower | - | ✓ | - | ✓ |
| partner-portal | - | ✓ | - | - |
| regulator-portal | - | ✓ | - | - |
| internal-tools | - | - | - | - |
| docs-portal | - | - | - | - |
| mobile-android | - | - | - | - |

### Services → Packages

| Service | domain-core | event-contracts | schemas |
|---------|-------------|-----------------|---------|
| compliance-service | ✓ | ✓ | ✓ |
| ledger-service | ✓ | ✓ | - |
| quote-service | ✓ | ✓ | - |
| settlement-service | ✓ | ✓ | - |
| trust-service | ✓ | ✓ | - |
| workflow-service | ✓ | ✓ | - |
| escrow-service | - | - | ✓ |
| identity-service | - | - | ✓ |
| transaction-service | - | - | ✓ |
| wallet-service | - | - | ✓ |
| analytics-service | - | - | - |
| auth-service | - | - | - |
| bdc-service | - | - | - |
| billing-service | - | - | - |
| cms-service | - | - | - |
| document-service | - | - | - |
| fraud-service | - | - | - |
| geo-service | - | - | - |
| notification-service | - | - | - |
| partner-adapter-service | - | - | - |
| passkeys-service | - | - | - |
| payment-service | - | - | - |
| pricing-service | - | - | - |
| risk-service | - | - | - |
| support-service | - | - | - |
| visitor-service | - | - | - |
| whatsapp-service | - | - | - |

### Packages → Packages

| Package | api-sdk | database | domain-core | schemas | tokens |
|---------|---------|----------|-------------|---------|--------|
| design-system | - | - | - | - | ✓ |
| domain-core | - | ✓ | - | - | - |
| api-sdk | - | - | ✓ | ✓ | - |

---

## 2. Full Dependency Tree (Depth 3)

```
Root (cuboid-platform)
├── web-app
│   ├── @cuboid/api-sdk (workspace:*)
│   │   ├── @cuboid/domain-core (workspace:*)
│   │   │   └── @cuboid/database (workspace:*)
│   │   └── @cuboid/schemas (workspace:*)
│   │       └── zod (^3.22.4)
│   ├── @cuboid/design-system (workspace:*)
│   │   └── @cuboid/tokens (workspace:*)
│   │       └── tailwindcss (^3.4.1)
│   ├── @cuboid/domain-core (workspace:*)
│   │   └── @cuboid/database (workspace:*)
│   └── @cuboid/tokens (workspace:*)
├── web-marketing
│   ├── @cuboid/api-sdk → domain-core → database
│   └── @cuboid/domain-core → database
├── admin-tower
│   ├── @cuboid/design-system → tokens
│   └── @cuboid/tokens
├── partner-portal
│   └── @cuboid/design-system → tokens
├── regulator-portal
│   └── @cuboid/design-system → tokens
├── internal-tools (no internal deps)
├── docs-portal (no internal deps)
├── mobile-android (no internal deps)
└── Services (27 total)
    ├── compliance-service (3 deps: domain-core, event-contracts, schemas)
    ├── ledger-service (2 deps: domain-core, event-contracts)
    ├── quote-service (2 deps: domain-core, event-contracts)
    ├── settlement-service (2 deps: domain-core, event-contracts)
    ├── trust-service (2 deps: domain-core, event-contracts)
    ├── workflow-service (2 deps: domain-core, event-contracts)
    ├── escrow-service (1 dep: schemas)
    ├── identity-service (1 dep: schemas)
    ├── transaction-service (1 dep: schemas)
    ├── wallet-service (1 dep: schemas)
    └── 17 standalone services (no internal deps)
```

---

## 3. External Dependency Inventory

### Universal Dependencies (used in ≥50% of workspaces)

| Dependency | Workspaces | Usage |
|-----------|------------|-------|
| uuid | 27/27 services | ID generation |
| typescript | 48/48 workspaces | Language |
| zod | 6/12 packages + 5/27 services | Schema validation |
| tailwindcss | 5/8 apps + 1/12 packages | Styling |
| next | 7/8 apps | Framework |
| react | 7/8 apps | UI |
| react-dom | 7/8 apps | UI |
| lucide-react | 5/8 apps + 1/12 packages | Icons |

### Service-Only Dependencies

| Dependency | Count | Services |
|-----------|-------|----------|
| pino | 9 | bdc, compliance, geo, ledger, quote, settlement, trust, visitor, whatsapp |
| bcryptjs | 2 | auth, domain-core |
| jsonwebtoken | 2 | auth, domain-core |
| stripe | 1 | payment |
| axios | 2 | notification, mobile-android |
| nodemailer | 1 | notification |
| pg | 2 | database, identity |

### Framework Dependencies (Apps)

| Dependency | Count | Apps |
|-----------|-------|------|
| framer-motion | 4 | web-app, web-marketing, admin-tower, design-system |
| clsx | 4 | web-app, web-marketing, design-system, mobile-android |
| tailwind-merge | 3 | web-app, web-marketing, design-system |
| @tanstack/react-query | 2 | web-app, mobile-android |
| zustand | 2 | web-app, mobile-android |

---

## 4. Script Coverage Matrix

| Workspace | build | dev | lint | test | typecheck | start |
|-----------|-------|-----|------|------|-----------|-------|
| web-app | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| web-marketing | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ |
| admin-tower | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ |
| partner-portal | ✓ | ✓ | ✗ | ✗ | ✓ | - |
| regulator-portal | ✓ | ✓ | ✗ | ✗ | ✓ | - |
| internal-tools | ✓ | ✓ | ✗ | ✗ | ✗ | - |
| docs-portal | ✓ | ✓ | ✗ | ✗ | ✗ | - |
| mobile-android | ✗ | ✗ | ✓ | ✗ | ✓ | - |
| identity-service | ✓ | ✓ | ✓ | ✓ | - | ✓ |
| 17 core services | ✓ | ✓ | ✗ | ✗ | varies | varies |
| api-sdk | - | - | ✗ | ✗ | ✓ | - |
| config | - | - | ✗ | ✗ | ✗ | - |
| database | - | - | ✗ | ✗ | ✓ | - |
| design-system | ✓ | ✓ | ✗ | ✗ | ✓ | - |
| domain-core | - | - | ✗ | ✗ | ✗ | - |
| event-contracts | - | - | ✗ | ✗ | ✗ | - |
| observability-kit | - | - | ✗ | ✗ | ✗ | - |
| schemas | - | - | ✗ | ✗ | ✗ | - |
| sdk-generator | ✓ | - | ✗ | ✗ | ✗ | - |
| security-kit | - | - | ✗ | ✗ | ✗ | - |
| seed-data | - | - | ✗ | ✗ | ✗ | - |
| tokens | - | - | ✗ | ✗ | ✗ | - |

## 5. Build Order (Dependency-Resolved)

```
Layer 0 (Leaf packages - no deps):
  config, database, event-contracts, observability-kit, schemas,
  security-kit, seed-data, tokens

Layer 1 (One layer of deps):
  api-sdk (→ schemas, domain-core)
  design-system (→ tokens)
  domain-core (→ database)

Layer 2 (Consumers):
  All services
  All apps

Effective build order:
  1. packages/* (build internal library packages first)
  2. services/* (build services)
  3. apps/* (build frontend apps last)
```

---

## 6. Orphaned / Dead Code

| Item | Status | Action |
|------|--------|--------|
| `_template/` (services) | Empty stub directory, no package.json | Remove or document |
| `package.json.bak` (root) | Orphaned backup, version 1.0.0 mismatch | Remove |
| `event-contracts` (package) | Empty shell, no code, no deps | Implement or remove from dependency chains |
| `observability-kit` (package) | Empty shell, no code, no deps | Implement or remove |
| `security-kit` (package) | Empty shell, only zod dep | Implement or remove |
| `tokens` (package) | Has tailwindcss dep but no scripts | Verify intent |
| `schemas` (package) | Has zod dep but no scripts | Verify intent |

## 7. Duplicate Implementations

| Pattern | Files | Risk |
|---------|-------|------|
| uuid import | 27 services independently | Consistent (same pkg) |
| zod schemas | 6 packages + 5 services | Schemas pkg should centralize |
| JWT handling | auth-service + domain-core (both import bcryptjs/jsonwebtoken) | Potential dual implementation |

## 8. Missing Dependencies (Detected)

| Workspace | Missing | Evidence |
|-----------|---------|----------|
| services using pg without @types/pg | Several services | Only identity-service has @types/pg |
| apps without @types/react | Some apps | 3 apps lack @types/react |
| apps without eslint | Most apps | Only web-app, web-marketing, mobile-android have eslint |

---

*Report generated by automated reconnaissance of 48 workspace package.json files.*
