---
title: CUBOID API Reference
description: Complete API reference for CUBOID Platform v1.0
version: 1.0
---

# Authentication

All API requests require a Bearer token in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.cuboid.io/v1/...
```

## Endpoints

### POST /v1/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "expires_in": 3600,
  "user": {
    "id": "usr-123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /v1/auth/register
Register new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "phone": "+254700000000",
  "country": "KE"
}
```

### POST /v1/auth/refresh
Refresh access token.

**Request:**
```json
{
  "refresh_token": "eyJ..."
}
```

---

# Users

### GET /v1/users/me
Get current authenticated user.

**Response:**
```json
{
  "id": "usr-123",
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+254700000000",
  "country": "KE",
  "kyc_status": "verified",
  "kyc_level": 3,
  "trust_score": 85,
  "created_at": "2024-01-15T10:00:00Z"
}
```

### PUT /v1/users/me
Update user profile.

**Request:**
```json
{
  "name": "John Updated",
  "phone": "+254700000001"
}
```

### POST /v1/users/kyc/submit
Submit KYC documents.

**Request:**
```json
{
  "document_type": "national_id",
  "document_number": "12345678",
  "document_front": "base64...",
  "document_back": "base64...",
  "selfie": "base64...",
  "address_proof": "base64..."
}
```

### GET /v1/users/kyc/status
Get KYC verification status.

**Response:**
```json
{
  "status": "pending",
  "level": 1,
  "submitted_at": "2024-01-15T10:00:00Z",
  "expires_at": "2024-01-22T10:00:00Z",
  "requirements": ["address_proof"]
}
```

---

# Wallets

### POST /v1/wallets
Create new wallet.

**Request:**
```json
{
  "currency": "KES",
  "name": "Primary Wallet",
  "type": "personal"
}
```

**Response:**
```json
{
  "id": "wlt-123",
  "currency": "KES",
  "balance": "0.00",
  "available_balance": "0.00",
  "name": "Primary Wallet",
  "status": "active",
  "created_at": "2024-01-15T10:00:00Z"
}
```

### GET /v1/wallets
List user wallets.

**Query Params:**
- `currency` (optional): Filter by currency
- `status` (optional): Filter by status

### GET /v1/wallets/:id
Get wallet details.

### GET /v1/wallets/:id/balance
Get wallet balance.

**Response:**
```json
{
  "wallet_id": "wlt-123",
  "currency": "KES",
  "balance": "50000.00",
  "available_balance": "48000.00",
  "pending_debits": "2000.00",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### POST /v1/wallets/:id/deposit
Deposit funds via bank or mobile.

**Request:**
```json
{
  "amount": "10000",
  "method": "bank_transfer",
  "reference": "BT-123456"
}
```

### POST /v1/wallets/:id/withdraw
Withdraw funds.

**Request:**
```json
{
  "amount": "5000",
  "method": "bank_transfer",
  "account": {
    "bank_code": "01",
    "account_number": "1234567890",
    "account_name": "John Doe"
  }
}
```

---

# Quotes

### POST /v1/quotes
Generate a quote for currency conversion.

**Request:**
```json
{
  "source_currency": "USD",
  "target_currency": "KES",
  "source_amount": "1000",
  "corridor": "USA-KEN"
}
```

**Response:**
```json
{
  "id": "quote-123",
  "source_currency": "USD",
  "target_currency": "KES",
  "source_amount": "1000.00",
  "target_amount": "152500.00",
  "rate": "152.50",
  "fee": "250.00",
  "expires_at": "2024-01-15T10:30:00Z",
  "locked": false
}
```

### POST /v1/quotes/:id/lock
Lock a quote to reserve rate.

**Response:**
```json
{
  "id": "quote-123",
  "locked": true,
  "expires_at": "2024-01-15T11:00:00Z",
  "lock_id": "lock-abc123"
}
```

### GET /v1/quotes/:id
Get quote details.

### POST /v1/quotes/:id/accept
Accept and execute quote.

**Request:**
```json
{
  "source_wallet_id": "wlt-123",
  "beneficiary_id": "bnf-456"
}
```

---

# Transactions

### POST /v1/transactions
Create a new transaction.

**Request:**
```json
{
  "quote_id": "quote-123",
  "source_wallet_id": "wlt-123",
  "destination": {
    "type": "bank",
    "corridor": "USA-KEN",
    "bank_name": "Equity Bank",
    "account_number": "1234567890",
    "account_name": "Jane Doe",
    "phone": "+254700000000"
  }
}
```

**Response:**
```json
{
  "id": "txn-123",
  "reference": "CUB-ABC123",
  "status": "processing",
  "amount": {
    "source": "1000.00 USD",
    "target": "152500.00 KES"
  },
  "created_at": "2024-01-15T10:00:00Z",
  "timeline": [
    {
      "status": "created",
      "timestamp": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### GET /v1/transactions
List transactions.

**Query Params:**
- `status` (optional): pending, processing, settled, failed
- `corridor` (optional): Filter by corridor
- `from_date` (optional): Filter start date
- `to_date` (optional): Filter end date
- `limit` (default: 20)
- `offset` (default: 0)

### GET /v1/transactions/:id
Get transaction details.

### GET /v1/transactions/:id/timeline
Get transaction timeline.

**Response:**
```json
{
  "transaction_id": "txn-123",
  "timeline": [
    {"status": "created", "timestamp": "2024-01-15T10:00:00Z"},
    {"status": "processing", "timestamp": "2024-01-15T10:01:00Z"},
    {"status": "settled", "timestamp": "2024-01-15T10:15:00Z"}
  ]
}
```

### POST /v1/transactions/:id/cancel
Cancel pending transaction.

---

# BDC (Bureau de Change)

### GET /v1/bdc
List verified BDCs.

**Query Params:**
- `country` (optional): Filter by country
- `city` (optional): Filter by city
- `lat` / `lng` (optional): Coordinates for nearby search
- `radius` (optional): Search radius in km

**Response:**
```json
{
  "data": [
    {
      "id": "bdc-123",
      "name": "KenyaForex Ltd",
      "country": "KE",
      "city": "Nairobi",
      "address": "123 Main St, Westlands",
      "rating": 4.8,
      "verified": true,
      "distance": 0.8,
      "services": ["cash", "wire", "mobile"]
    }
  ],
  "total": 45,
  "page": 1
}
```

### GET /v1/bdc/:id
Get BDC details.

### GET /v1/bdc/nearest
Find nearest BDCs to location.

**Query Params:**
- `lat`: Latitude
- `lng`: Longitude
- `radius`: Search radius (default: 10km)
- `currency_pair`: Filter by currency pair

### GET /v1/bdc/:id/rates
Get BDC's current rates.

**Response:**
```json
{
  "bdc_id": "bdc-123",
  "rates": [
    {"pair": "USD/KES", "buy": "152.50", "sell": "153.50"},
    {"pair": "EUR/KES", "buy": "165.80", "sell": "166.80"},
    {"pair": "GBP/KES", "buy": "194.20", "sell": "195.50"}
  ],
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### POST /v1/bdc/:id/reserve
Reserve a rate at BDC.

**Request:**
```json
{
  "currency_pair": "USD/KES",
  "amount": "500",
  "side": "buy"
}
```

**Response:**
```json
{
  "id": "res-123",
  "bdc": "KenyaForex Ltd",
  "rate": "152.50",
  "amount": "500 USD",
  "expires_at": "2024-01-15T10:30:00Z",
  "qr_code": "QR-ABC123"
}
```

### GET /v1/bdc/reservations
Get user's rate reservations.

---

# Escrow

### POST /v1/escrow
Create escrow.

**Request:**
```json
{
  "amount": "10000",
  "currency": "KES",
  "description": "Payment for goods",
  "release_conditions": {
    "type": "milestone",
    "milestones": [
      {"name": "Delivery", "amount": "5000"},
      {"name": "Installation", "amount": "5000"}
    ]
  },
  "beneficiaries": [
    {"id": "usr-456", "phone": "+254700000000"}
  ]
}
```

**Response:**
```json
{
  "id": "esc-123",
  "status": "created",
  "amount": "10000 KES",
  "created_at": "2024-01-15T10:00:00Z"
}
```

### GET /v1/escrow
List user's escrows.

### GET /v1/escrow/:id
Get escrow details.

### POST /v1/escrow/:id/fund
Fund escrow.

**Request:**
```json
{
  "source_wallet_id": "wlt-123"
}
```

### POST /v1/escrow/:id/release
Release escrow funds.

**Request:**
```json
{
  "milestone_id": "ms-123"
}
```

### POST /v1/escrow/:id/dispute
Open dispute on escrow.

**Request:**
```json
{
  "reason": "Goods not as described",
  "description": "Detailed description..."
}
```

---

# Beneficiaries

### POST /v1/beneficiaries
Add beneficiary.

**Request:**
```json
{
  "name": "Jane Doe",
  "phone": "+254700000000",
  "bank_code": "01",
  "account_number": "1234567890",
  "account_name": "Jane Doe",
  "relationship": "supplier"
}
```

### GET /v1/beneficiaries
List beneficiaries.

### DELETE /v1/beneficiaries/:id
Remove beneficiary.

---

# Webhooks

## Register Webhook

### POST /v1/webhooks
Register webhook endpoint.

**Request:**
```json
{
  "url": "https://yourapp.com/webhooks/cuboid",
  "events": ["transaction.settled", "escrow.released"],
  "secret": "your-secret-key"
}
```

## Event Types

| Event | Description |
|-------|-------------|
| `transaction.created` | New transaction created |
| `transaction.pending` | Transaction pending review |
| `transaction.processing` | Transaction being processed |
| `transaction.settled` | Transaction completed |
| `transaction.failed` | Transaction failed |
| `transaction.cancelled` | Transaction cancelled |
| `quote.created` | New quote generated |
| `quote.expired` | Quote expired |
| `quote.accepted` | Quote accepted |
| `escrow.created` | Escrow created |
| `escrow.funded` | Escrow funded |
| `escrow.released` | Escrow released |
| `escrow.disputed` | Escrow disputed |
| `user.kyc.approved` | KYC approved |
| `user.kyc.rejected` | KYC rejected |
| `wallet.debited` | Wallet debited |
| `wallet.credited` | Wallet credited |

## Webhook Payload

```json
{
  "event": "transaction.settled",
  "timestamp": "2024-01-15T10:15:00Z",
  "data": {
    "id": "txn-123",
    "reference": "CUB-ABC123",
    "status": "settled"
  },
  "signature": "sha256=..."
}
```

---

# Error Codes

| Code | Description | HTTP Status |
|------|-------------|--------------|
| INSUFFICIENT_FUNDS | Wallet balance too low | 400 |
| QUOTE_EXPIRED | Quote lock period expired | 400 |
| PARTNER_UNAVAILABLE | Partner cannot fulfill request | 503 |
| COMPLIANCE_HOLD | Transaction held for review | 403 |
| KYC_PENDING | Identity verification pending | 403 |
| KYC_REJECTED | Identity verification rejected | 403 |
| INVALID_AMOUNT | Amount below minimum | 400 |
| INVALID_CURRENCY | Currency not supported | 400 |
| RATE_LIMIT_EXCEEDED | Too many requests | 429 |
| UNAUTHORIZED | Invalid or missing token | 401 |
| FORBIDDEN | Insufficient permissions | 403 |
| NOT_FOUND | Resource not found | 404 |
| VALIDATION_ERROR | Invalid request body | 422 |
| INTERNAL_ERROR | Server error | 500 |

---

# Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| Standard | 100 req/min |
| Quotes | 50 req/min |
| Transactions | 20 req/min |

---

**Version**: 1.0  
**Last Updated**: 2024-12-15