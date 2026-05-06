# CUBOID Platform — Runbook

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- Docker 24+
- PostgreSQL 14+
- Redis 7+

### Local Development

```bash
# Install dependencies
cd platform/cuboid-platform
pnpm install

# Build all packages
pnpm build

# Run development
pnpm dev
```

### Environment Variables

Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Authentication secret
- `REDIS_URL` - Redis connection

---

## Services

### Starting Services

```bash
# All services via turborepo
pnpm dev

# Individual service
cd services/identity-service && pnpm dev
```

### Service Ports

| Service | Port | Protocol | Description |
|---------|------|----------|-------------|
| **identity-service** | 3001 | REST | User & org identity |
| **auth-service** | 3002 | REST+gRPC | Authentication |
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

### Web Applications

| App | Port | Description |
|-----|------|-------------|
| **web-app** | 3000 | Main dashboard |
| **web-marketing** | 3005 | Marketing site |
| **admin-tower** | 3010 | Internal ops |
| **partner-portal** | 3011 | BDC/Partner ops |
| **regulator-portal** | 3012 | Regulator view |
| **docs-portal** | 3020 | API docs |

### Health Checks

| Service | Endpoint | Port |
|---------|----------|------|
| identity-service | /health | 3001 |
| auth-service | /health | 3002 |
| wallet-service | /health | 3003 |
| transaction-service | /health | 3004 |
| ledger-service | /health | 3010 |
| trust-service | /health | 3011 |
| compliance-service | /health | 3012 |
| quote-service | /health | 3013 |
| settlement-service | /health | 3014 |
| bdc-service | /health | 3016 |
| geo-service | /health | 3017 |
| visitor-service | /health | 3018 |
| whatsapp-service | /health | 3019 |
| escrow-service | /health | 3020 |
| notification-service | /health | 3021 |
| support-service | /health | 3022 |

---

## Database

### Migrations

```bash
# Run migrations
pnpm db:migrate

# Create migration
pnpm db:migrate:create <name>
```

### Schema

Database schema is in `docs/schema.sql`:

```bash
psql -U postgres -d cuboid -f docs/schema.sql
```

---

## Docker Deployment

### Development

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d postgres redis
```

### Production Build

```bash
# Build images
docker-compose -f docker-compose.yml build

# Run production
docker-compose -f docker-compose.yml up -d

# Scale specific service
docker-compose up -d --scale web-app=3
```

### Docker Services

| Service | Image | Ports |
|---------|-------|-------|
| postgres | postgres:14 | 5432:5432 |
| redis | redis:7 | 6379:6379 |
| web-app | cuboid/web-app | 3000:3000 |
| web-marketing | cuboid/web-marketing | 3005:3005 |
| admin-tower | cuboid/admin-tower | 3010:3010 |

---

## Kubernetes Deployment

### Basic Deployment

```bash
# Deploy all resources
kubectl apply -f infra/kubernetes/

# Verify deployment
kubectl get pods -n cuboid

# Check service status
kubectl get svc -n cuboid
```

### Scaling

```bash
# Scale application
kubectl scale deployment cuboid-platform --replicas=5 -n cuboid

# Scale specific service
kubectl scale deployment identity-service --replicas=3 -n cuboid
```

### Rolling Updates

```bash
# Update image
kubectl set image deployment/web-app web-app=cuboid/web-app:v1.1.0

# Check rollout status
kubectl rollout status deployment/web-app
```

---

## Monitoring

### Logs

```bash
# View all logs
kubectl logs -f deployment/cuboid-platform -n cuboid

# Tail specific service
kubectl logs -f deployment/cuboid-platform -c identity-service -n cuboid

# View previous pod logs
kubectl logs - previous - deployment/web-app -n cuboid
```

### Metrics

- **Prometheus**: http://prometheus.cuboid.africa
- **Grafana**: http://grafana.cuboid.africa
- **Metrics endpoint**: `/metrics` on each service

### Health Monitoring

```bash
# Check all service health
curl http://localhost:3001/health
curl http://localhost:3002/health

# Check web-app status
curl http://localhost:3000/api/health
```

---

## Troubleshooting

### Common Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| **Database Connection** | Service fails to start | Verify DATABASE_URL format |
| **Redis Connection** | Session errors | Check REDIS_URL connectivity |
| **JWT Validation** | 401 errors | Regenerate JWT_SECRET |
| **Slow Queries** | High latency | Check database indexes |
| **Memory Issues** | OOM crashes | Increase pod memory limit |
| **Port Conflicts** | EADDRINUSE | Check for port conflicts |
| **Docker Issues** | Container failures | Check docker logs |

### Debug Commands

```bash
# Describe problematic pod
kubectl describe pod <pod-name> -n cuboid

# Check pod events
kubectl get events -n cuboid --sort-by='.lastTimestamp'

# Port forward to service
kubectl port-forward svc/identity-service 3001:3001 -n cuboid

# Exec into container
kubectl exec -it <pod-name> -n cuboid -- /bin/sh

# Check environment variables
kubectl exec <pod-name> -n cuboid -- env | grep -i database

# View resource usage
kubectl top pods -n cuboid
```

### Network Debugging

```bash
# Test service connectivity
kubectl exec -it <pod-name> -n cuboid -- curl http://identity-service:3001/health

# Check DNS resolution
kubectl exec -it <pod-name> -n cuboid -- nslookup identity-service

# Check network policies
kubectl get networkpolicies -n cuboid
```

---

## Emergency Procedures

### Database Recovery

```bash
# Restore from backup
pg_restore -U postgres -d cuboid -h postgres -c backup.dump

# Point-in-time recovery
kubectl exec -it postgres-0 -n cuboid -- pg_restore ...
```

### Service Recovery

```bash
# Restart service
kubectl rollout restart deployment/<service-name> -n cuboid

# Rollback deployment
kubectl rollout undo deployment/web-app -n cuboid

# Force restart pods
kubectl delete pods -n cuboid -l app=web-app
```

### Contact Information

| Role | Contact | Response Time |
|------|---------|---------------|
| Platform Team | platform@cuboid.io | 1 hour |
| On-call Engineer | oncall@cuboid.io | 15 min |
| Security Issues | security@cuboid.io | 5 min |
| Critical Outage | +254 700 000 999 | Immediate |

---

## Maintenance

### Scheduled Maintenance

- **Database**: Weekly Sunday 2AM EAT
- **Security Patches**: Bi-weekly Wednesday 3AM EAT
- **Platform Updates**: Monthly first Saturday 12AM EAT

### Before Maintenance

```bash
# Scale down
kubectl scale deployment web-app --replicas=1 -n cuboid

# Drain connections
kubectl exec -it postgres-0 -n cuboid -- psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='cuboid'"
```

### After Maintenance

```bash
# Scale up
kubectl scale deployment web-app --replicas=3 -n cuboid

# Verify health
curl http://localhost:3000/api/health
```

---

**Last Updated**: 2024-12-15  
**Version**: 1.0