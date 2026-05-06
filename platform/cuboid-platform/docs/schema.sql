-- Database Schema for CUBOID Platform
-- PostgreSQL + event_store

-- Core Tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  password_hash VARCHAR(255),
  mfa_secret VARCHAR(255),
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(100),
  country CHAR(2),
  entity_type VARCHAR(20),
  verification_tier VARCHAR(20) DEFAULT 'NONE',
  trust_score INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  currency CHAR(3),
  balance DECIMAL(20, 2) DEFAULT 0,
  available_balance DECIMAL(20, 2) DEFAULT 0,
  reserved_balance DECIMAL(20, 2) DEFAULT 0,
  ledger_type VARCHAR(20) DEFAULT 'OPERATIONAL',
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_wallet_id UUID REFERENCES wallets(id),
  destination_wallet_id UUID REFERENCES wallets(id),
  amount DECIMAL(20, 2),
  currency CHAR(3),
  corridor VARCHAR(50),
  status VARCHAR(20) DEFAULT 'PENDING',
  partner_id UUID,
  quote_id UUID,
  fees DECIMAL(20, 2),
  exchange_rate DECIMAL(20, 8),
  estimated_settlement TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_currency CHAR(3),
  target_currency CHAR(3),
  source_amount DECIMAL(20, 2),
  target_amount DECIMAL(20, 2),
  rate DECIMAL(20, 8),
  spread DECIMAL(10, 4),
  fees DECIMAL(20, 2),
  lock_duration INTEGER,
  expires_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE escrow (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id),
  amount DECIMAL(20, 2),
  currency CHAR(3),
  status VARCHAR(20) DEFAULT 'ACTIVE',
  release_conditions JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES wallets(id),
  transaction_id UUID REFERENCES transactions(id),
  type VARCHAR(20),
  amount DECIMAL(20, 2),
  balance_after DECIMAL(20, 2),
  reference VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE partner_institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name VARCHAR(255) NOT NULL,
  type VARCHAR(20),
  trust_score INTEGER DEFAULT 50,
  status VARCHAR(20) DEFAULT 'APPLIED',
  capabilities JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE compliance_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20),
  status VARCHAR(20) DEFAULT 'OPEN',
  severity VARCHAR(20),
  subject_id UUID,
  assigned_to UUID,
  resolution TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Event Store
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aggregate_type VARCHAR(100),
  aggregate_id UUID,
  event_type VARCHAR(100),
  payload JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_wallet ON transactions(source_wallet_id);
CREATE INDEX idx_wallets_org ON wallets(organization_id);
CREATE INDEX idx_events_aggregate ON events(aggregate_type, aggregate_id);
CREATE INDEX idx_ledger_wallet ON ledger_entries(wallet_id);