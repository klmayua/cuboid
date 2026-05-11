export function createRequestId(prefix = 'req'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getRequestIdFromHeader(request: Request): string | null {
  return request.headers.get('x-request-id');
}

export function parseCorrelationParams(request: Request): {
  requestId: string;
  timestamp: string;
  correlationId?: string;
} {
  const requestId = request.headers.get('x-request-id') || createRequestId();
  const timestamp = new Date().toISOString();
  const correlationId = request.headers.get('x-correlation-id') || undefined;
  
  return { requestId, timestamp, correlationId };
}

export interface CorrelationContext {
  requestId: string;
  timestamp: string;
  correlationId?: string;
  actorId?: string;
  organizationId?: string;
}

export function createCorrelationContext(request: Request, extras?: Partial<CorrelationContext>): CorrelationContext {
  const base = parseCorrelationParams(request);
  return {
    ...base,
    ...extras,
  };
}

export const CORRELATION_HEADERS = {
  REQUEST_ID: 'x-request-id',
  CORRELATION_ID: 'x-correlation-id',
  ACTOR_ID: 'x-actor-id',
  ORGANIZATION_ID: 'x-organization-id',
} as const;