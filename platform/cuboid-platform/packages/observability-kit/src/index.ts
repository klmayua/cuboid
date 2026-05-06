import { z } from 'zod';

export const LogEntrySchema = z.object({
  timestamp: z.string(),
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),
  message: z.string(),
  service: z.string(),
  traceId: z.string().optional(),
  spanId: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const MetricSchema = z.object({
  name: z.string(),
  value: z.number(),
  type: z.enum(['counter', 'gauge', 'histogram', 'summary']),
  labels: z.record(z.string()).optional(),
  timestamp: z.string(),
});

export const SpanSchema = z.object({
  traceId: z.string(),
  spanId: z.string(),
  parentSpanId: z.string().optional(),
  serviceName: z.string(),
  operationName: z.string(),
  startTime: z.number(),
  endTime: z.number().optional(),
  tags: z.record(z.unknown()).optional(),
  logs: z.array(z.object({
    timestamp: z.number(),
    fields: z.record(z.unknown()),
  })).optional(),
});

export const HealthCheckSchema = z.object({
  service: z.string(),
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  latency: z.number().optional(),
  checks: z.record(z.object({
    status: z.enum(['pass', 'fail', 'warn']),
    message: z.string().optional(),
  })).optional(),
});

export type LogEntry = z.infer<typeof LogEntrySchema>;
export type Metric = z.infer<typeof MetricSchema>;
export type Span = z.infer<typeof SpanSchema>;
export type HealthCheck = z.infer<typeof HealthCheckSchema>;

export class ObservabilityKit {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  log(level: LogEntry['level'], message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.serviceName,
      metadata,
    };
    
    const logLevel = level === 'error' || level === 'fatal' ? console.error : console.log;
    logLevel(JSON.stringify(entry));
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.log('info', message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    this.log('error', message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.log('warn', message, metadata);
  }

  metric(name: string, value: number, type: Metric['type'], labels?: Record<string, string>): void {
    const metric: Metric = {
      name: `${this.serviceName}.${name}`,
      value,
      type,
      labels,
      timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify({ type: 'metric', data: metric }));
  }

  incrementCounter(name: string, labels?: Record<string, string>): void {
    this.metric(name, 1, 'counter', labels);
  }

  recordGauge(name: string, value: number, labels?: Record<string, string>): void {
    this.metric(name, value, 'gauge', labels);
  }

  recordHistogram(name: string, value: number, labels?: Record<string, string>): void {
    this.metric(name, value, 'histogram', labels);
  }

  startSpan(operationName: string, traceId?: string): { spanId: string; traceId: string } {
    const crypto = require('crypto');
    const spanId = crypto.randomBytes(8).toString('hex');
    const actualTraceId = traceId ?? crypto.randomBytes(16).toString('hex');
    return { spanId, traceId: actualTraceId };
  }

  endSpan(span: { spanId: string; traceId: string }, endTime?: number): void {
    this.metric('span.duration', endTime ?? Date.now(), 'histogram', {
      spanId: span.spanId,
      traceId: span.traceId,
    });
  }

  healthCheck(status: HealthCheck['status'], checks?: HealthCheck['checks']): HealthCheck {
    return {
      service: this.serviceName,
      status,
      latency: Date.now(),
      checks,
    };
  }

  traceMiddleware<T>(operationName: string, fn: () => T): T {
    const start = Date.now();
    try {
      const result = fn();
      this.recordHistogram(`${operationName}.duration`, Date.now() - start);
      return result;
    } catch (error) {
      this.recordHistogram(`${operationName}.duration`, Date.now() - start);
      this.error(`${operationName} failed`, { error: String(error) });
      throw error;
    }
  }

  async traceAsync<T>(operationName: string, fn: () => Promise<T>): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      this.recordHistogram(`${operationName}.duration`, Date.now() - start);
      return result;
    } catch (error) {
      this.recordHistogram(`${operationName}.duration`, Date.now() - start);
      this.error(`${operationName} failed`, { error: String(error) });
      throw error;
    }
  }
}

export default ObservabilityKit;