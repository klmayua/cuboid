import { z } from 'zod';

export const RateLimitSchema = z.object({
  points: z.number().min(1),
  duration: z.number().min(1),
  keyPrefix: z.string().optional(),
});

export const IPIntelligenceSchema = z.object({
  ip: z.string(),
  country: z.string().optional(),
  isProxy: z.boolean().optional(),
  isVPN: z.boolean().optional(),
  isTor: z.boolean().optional(),
  provider: z.string().optional(),
});

export const RequestValidationSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  path: z.string(),
  headers: z.record(z.string()).optional(),
  body: z.unknown().optional(),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  timestamp: z.number(),
  nonce: z.string().optional(),
  signature: z.string().optional(),
});

export const WebhookSignatureSchema = z.object({
  event: z.string(),
  timestamp: z.number(),
  signature: z.string(),
  payload: z.unknown(),
});

export const IdempotencyKeySchema = z.object({
  key: z.string(),
  entityType: z.string(),
  entityId: z.string(),
  result: z.unknown().optional(),
  expiresAt: z.string(),
});

export type RateLimit = z.infer<typeof RateLimitSchema>;
export type IPIntelligence = z.infer<typeof IPIntelligenceSchema>;
export type RequestValidation = z.infer<typeof RequestValidationSchema>;
export type WebhookSignature = z.infer<typeof WebhookSignatureSchema>;
export type IdempotencyKey = z.infer<typeof IdempotencyKeySchema>;

export class SecurityKit {
  static rateLimitKey(userId: string, endpoint: string): string {
    return `ratelimit:${userId}:${endpoint}`;
  }

  static validateSignature(payload: string, signature: string, secret: string): boolean {
    const crypto = require('crypto');
    const expected = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return signature === expected;
  }

  static generateNonce(): string {
    const crypto = require('crypto');
    return crypto.randomBytes(16).toString('hex');
  }

  static hashPassword(password: string, salt?: string): { hash: string; salt: string } {
    const crypto = require('crypto');
    const actualSalt = salt ?? crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, actualSalt, 100000, 64, 'sha512')
      .toString('hex');
    return { hash, salt: actualSalt };
  }

  static maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (data.length <= visibleChars) return '*'.repeat(data.length);
    return '*'.repeat(data.length - visibleChars) + data.slice(-visibleChars);
  }

  static generateAPIKey(): string {
    const crypto = require('crypto');
    return `cuboid_${crypto.randomBytes(32).toString('hex')}`;
  }

  static validateAPIKey(key: string): boolean {
    return key.startsWith('cuboid_') && key.length === 66;
  }

  static sessionKey(userId: string, deviceFingerprint: string): string {
    const crypto = require('crypto');
    return crypto
      .createHash('sha256')
      .update(`${userId}:${deviceFingerprint}`)
      .digest('hex');
  }
}

export default SecurityKit;