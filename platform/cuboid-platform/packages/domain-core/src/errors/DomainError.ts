export class DomainError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends DomainError {
  public readonly fields: Record<string, string>;

  constructor(message: string, fields: Record<string, string> = {}) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

export class PermissionError extends DomainError {
  constructor(message: string = 'Permission denied') {
    super(message, 'PERMISSION_DENIED', 403);
    this.name = 'PermissionError';
  }
}

export class ComplianceError extends DomainError {
  constructor(message: string = 'Compliance check failed') {
    super(message, 'COMPLIANCE_ERROR', 422);
    this.name = 'ComplianceError';
  }
}

export class LiquidityError extends DomainError {
  constructor(message: string = 'Insufficient liquidity') {
    super(message, 'LIQUIDITY_ERROR', 422);
    this.name = 'LiquidityError';
  }
}

export class SettlementError extends DomainError {
  constructor(message: string = 'Settlement failed') {
    super(message, 'SETTLEMENT_ERROR', 422);
    this.name = 'SettlementError';
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends DomainError {
  constructor(message: string = 'Conflict') {
    super(message, 'CONFLICT', 409);
    this.name = 'ConflictError';
  }
}
