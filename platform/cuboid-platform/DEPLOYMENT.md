# CUBOID Platform - Production Deployment Guide

## Quick Start (Development)

```bash
# Navigate to platform
cd platform/cuboid-platform

# Install dependencies
pnpm install

# Start all services with Docker
docker-compose up -d

# Or start web-app locally
cd apps/web-app
pnpm dev
```

## Services Overview

### Core Business Services
- **identity-service** (3001) - User & organization identity management
- **auth-service** (3002) - Authentication & authorization
- **ledger-service** (3010) - Double-entry accounting
- **trust-service** (3011) - Trust scoring & risk assessment
- **compliance-service** (3012) - AML, KYC, rules engine
- **quote-service** (3013) - FX pricing & rate locking
- **settlement-service** (3014) - Payment settlement state machine
- **workflow-service** (3015) - Business process orchestration
- **bdc-service** (3016) - Bureau de Change directory & rates
- **geo-service** (3017) - Geographic coordinates & distance calculation
- **visitor-service** (3018) - Tourist/visitor session management

### Web Applications
- **web-app** (3000) - Main dashboard & banking features
- **web-marketing** (3005) - Marketing landing page
- **admin-tower** (3010) - Admin control panel
- **docs-portal** (3020) - API documentation

## Environment Variables

Create `.env` from `.env.example`:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/cuboid

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here

# API Keys (add your own)
STRIPE_API_KEY=
TWILIO_ACCOUNT_SID=
SENDGRID_API_KEY=

# Feature Flags
ENABLE_KYC=true
ENABLE_ESCROW=true
ENABLE_BDC_FINDER=true
```

## Docker Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
# Build all images
docker-compose -f docker-compose.yml build

# Run specific services
docker-compose up -d postgres redis web-app
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, TypeScript
- **Database**: PostgreSQL 14
- **Cache**: Redis 7
- **Container**: Docker, Kubernetes

## Key Features

- ✅ Multi-currency wallet management
- ✅ Real-time FX rate comparison (Nearest BDC)
- ✅ Escrow with milestone-based releases
- ✅ Business workflow orchestration
- ✅ Compliance & AML screening
- ✅ Trust scoring system
- ✅ Partner BDC network management
- ✅ Visitor/tourist currency exchange flow

## API Endpoints

See `docs/api-reference.md` for full API documentation.

## Support

- Email: support@cuboid.africa
- Phone: +254 700 000 000 (Mon-Fri 8AM-6PM EAT)