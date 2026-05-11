import { NextResponse } from 'next/server';

export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
  requestId: string;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  errorCode: string;
  message: string;
  details?: unknown;
  requestId: string;
  timestamp: string;
}

export function success<T>(data: T, meta?: Record<string, unknown>, requestId?: string): NextResponse<SuccessResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    meta,
    requestId: requestId ?? `req_${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
}

export function error(code: string, message: string, status: number = 500, details?: unknown, requestId?: string): NextResponse<ErrorResponse> {
  return NextResponse.json({
    success: false,
    errorCode: code,
    message,
    details,
    requestId: requestId ?? `req_${Date.now()}`,
    timestamp: new Date().toISOString(),
  }, { status });
}
