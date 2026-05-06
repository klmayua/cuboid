# CUBOID Platform

Institutional economic infrastructure platform built according to the CUBOID Master Build Instruction.

## Architecture

```
cuboid-platform/
├── apps/           # Deployable applications
│   ├── web-marketing/    # Public marketing platform
│   ├── web-app/         # Main operating web application
│   ├── admin-tower/     # Internal control tower
│   ├── partner-portal/  # Partner operations portal
│   ├── regulator-portal/ # Regulator visibility portal
│   ├── mobile-android/ # React Native mobile app
│   └── docs-portal/     # Developer documentation
├── services/      # Microservices (Phase 1: connect, fx, treasury)
├── packages/      # Shared packages
│   ├── design-system/   # UI components & tokens
│   ├── tokens/         # Design tokens
│   ├── schemas/        # Zod validation schemas
│   ├── api-sdk/        # Public API client
│   └── event-contracts/ # Event definitions
└── infra/          # Kubernetes, Terraform, Helm
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Mobile**: React Native (Android-first)
- **Backend**: Event-driven microservices architecture

## Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development
pnpm dev
```

## Design System

Brand colors follow the CUBOID visual doctrine:
- Deep Trust Blue: `#0A2A66`
- Royal Trust Blue: `#123E91`
- Light Trust Accent: `#5E8DFF`

Uses restrained premium glassmorphism with 20px backdrop blur.

## Documentation

See `CUBOID — MASTER BUILD INSTRUCTION FOR OPENCODE.md` for full specifications.