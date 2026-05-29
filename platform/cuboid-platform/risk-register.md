# CUBOID Platform — Risk Register
## Phase 01: Initial Risk Assessment
### Generated: 2026-05-30

---

## Risk Classification

| Severity | Definition |
|----------|------------|
| **CRITICAL** | Blocks deployment, production unsafe, data loss risk |
| **HIGH** | Breaks functionality, security vulnerability, build failure |
| **MEDIUM** | Code quality, maintainability, developer experience |
| **LOW** | Cosmetic, documentation, future risk |

---

## CRITICAL Risks

| ID | Risk | Evidence | Affected |
|----|------|----------|----------|
| C-01 | **No test coverage in any app** | 0/8 apps define `test` script; only identity-service has tests | All apps |
| C-02 | **No typecheck in 6/8 apps** | Only web-app, admin-tower have typecheck; others will fail CI | docs-portal, internal-tools, partner-portal, regulator-portal, web-marketing, mobile-android |
| C-03 | **Empty stub packages imported as dependencies** | event-contracts has zero source code but is imported by 5 services | compliance, ledger, quote, settlement, trust, workflow |
| C-04 | **CI/CD deploy jobs are no-ops** | Deploy steps are `echo` placeholders, not actual deploys | Production deployment |
| C-05 | **Environment variable fragmentation** | Two env files (.env.example, .env.local.example) with different variables | All workspaces |

## HIGH Risks

| ID | Risk | Evidence | Affected |
|----|------|----------|----------|
| H-01 | **No linting in majority of apps** | 5/8 apps lack `lint` script | admin-tower, partner-portal, regulator-portal, internal-tools, docs-portal |
| H-02 | **No linting in any service except identity** | 26/27 services lack lint scripts | All services except identity |
| H-03 | **Inconsistent Node.js runtime** | payment-service uses `ts-node-dev`, others use `tsx` | payment-service |
| H-04 | **Version inconsistency** | payment-service is v1.0.0, all other services are v0.0.0 | payment-service |
| H-05 | **Redundant dependencies in root package.json** | Root has @supabase/supabase-js, bcryptjs, jsonwebtoken but these should be in workspace packages | Root |
| H-06 | **No lockfile verification in CI** | CI uses `--frozen-lockfile` but there's no step to regenerate/verify lockfile integrity | CI/CD |
| H-07 | **Missing database connection pooling config** | DATABASE_POOL_SIZE in .env.example but no evidence it's read in code | Services |
| H-08 | **Potential circular dependency risk** | domain-core → database; if database imports domain-core, circular | domain-core, database |

## MEDIUM Risks

| ID | Risk | Evidence | Affected |
|----|------|----------|----------|
| M-01 | **Orphaned backup file** | package.json.bak at root has version 1.0.0 (actual is 0.0.0) | Root |
| M-02 | **Empty _template service directory** | No package.json, no code, no purpose documented | services/_template |
| M-03 | **Stub packages with no scripts** | 5/12 packages have zero scripts (config, domain-core, event-contracts, observability-kit, security-kit, schemas, tokens) | 7 packages |
| M-04 | **No .gitignore review** | .gitignore exists but contents unverified | Root |
| M-05 | **Docker Compose port conflicts** | admin-tower (3010) vs docker-compose admin-tower (3010) but also ledger-service (3010) | Port allocation |
| M-06 | **Multiple design system specifications** | DESIGN.md (Stitch) vs README.md mentions different colors | Design system |
| M-07 | **Missing build scripts in packages** | Only design-system and sdk-generator have build scripts; others are source-only | 10 packages |
| M-08 | **pnpm-lock.yaml not verified** | No dedup/audit step in any script | Root |
| M-09 | **Missing seed script documentation** | seed-data package has seed script but no docs/migration guide references it | seed-data |
| M-10 | **Mobile app no build script in turbo** | mobile-android has android/ios scripts not build/dev; turbo can't orchestrate | mobile-android |

## LOW Risks

| ID | Risk | Evidence | Affected |
|----|------|----------|----------|
| L-01 | **Stitch directory not in .gitignore** | .stitch/metadata.json present, may contain local tooling config | Root |
| L-02 | **.dockerignore present but unverified** | Exists but content not reviewed | Docker |
| L-03 | **Docs portal uses Next.js but has no deps** | Could be resolved at build time but unusual | docs-portal |
| L-04 | **README references non-existent docs** | README references "CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE.md" at parent level | Root |
| L-05 | **Registry references Bitnami charts** | Helm depends on `https://charts.bitnami.com/bitnami` - external availability risk | Helm |

---

## Risk Heat Map by Workspace

| Workspace | Critical | High | Medium | Low | Score |
|-----------|----------|------|--------|-----|-------|
| web-app | 1 | 1 | 0 | 0 | 2 |
| web-marketing | 2 | 1 | 0 | 0 | 3 |
| admin-tower | 1 | 2 | 0 | 0 | 3 |
| partner-portal | 2 | 2 | 0 | 0 | 4 |
| regulator-portal | 2 | 2 | 0 | 0 | 4 |
| internal-tools | 2 | 2 | 0 | 0 | 4 |
| docs-portal | 2 | 2 | 0 | 1 | 5 |
| mobile-android | 1 | 2 | 1 | 0 | 4 |
| compliance-service | 1 | 1 | 1 | 0 | 3 |
| ledger-service | 1 | 1 | 1 | 0 | 3 |
| quote-service | 1 | 1 | 1 | 0 | 3 |
| settlement-service | 1 | 1 | 1 | 0 | 3 |
| trust-service | 1 | 1 | 1 | 0 | 3 |
| workflow-service | 1 | 1 | 1 | 0 | 3 |
| identity-service | 0 | 0 | 1 | 0 | 1 |
| Other 16 services | 0 | 1 | 1 | 0 | 2 |
| design-system | 0 | 0 | 1 | 0 | 1 |
| domain-core | 0 | 1 | 1 | 0 | 2 |
| database | 0 | 0 | 1 | 0 | 1 |
| Root / CI | 2 | 2 | 4 | 1 | 9 |

## Top 5 Immediate Actions

1. **Fix CI/CD deploy stubs** — Replace echo placeholders with actual Vercel deploy steps
2. **Add test infrastructure** — Add vitest/jest to at least web-app, auth-service, identity-service
3. **Resolve empty stub packages** — Either implement or remove event-contracts, observability-kit, security-kit
4. **Add typecheck to all workspaces** — Enable turbo typecheck across all apps and services
5. **Normalize environment configuration** — Merge .env.example and .env.local.example, document mock mode

---

*Risk tolerance: ZERO failures permitted. All CRITICAL and HIGH risks must be resolved before deployment.*
