import { pglite } from '@cuboid/database';

export interface IdempotencyRecord {
  id: string;
  key: string;
  entityType: string;
  entityId?: string;
  payload: Record<string, any>;
  response?: Record<string, any>;
  expiresAt: Date;
  createdAt: Date;
}

const IDEMPOTENCY_TTL_HOURS = 24;

export class IdempotencyRepository {
  async get(key: string): Promise<IdempotencyRecord | null> {
    const result = await pglite.query(
      `SELECT * FROM idempotency_keys WHERE key = $1 AND expires_at > NOW() LIMIT 1`,
      [key]
    );
    return result.rows[0] || null;
  }

  async create(
    key: string,
    entityType: string,
    payload: Record<string, any>
  ): Promise<IdempotencyRecord> {
    const result = await pglite.query(
      `INSERT INTO idempotency_keys (key, entity_type, payload, expires_at)
       VALUES ($1, $2, $3, NOW() + INTERVAL '${IDEMPOTENCY_TTL_HOURS} hours')
       RETURNING *`,
      [key, entityType, JSON.stringify(payload)]
    );
    return result.rows[0];
  }

  async updateResponse(key: string, entityId: string, response: Record<string, any>): Promise<void> {
    await pglite.query(
      `UPDATE idempotency_keys SET entity_id = $1, response = $2 WHERE key = $3`,
      [entityId, JSON.stringify(response), key]
    );
  }

  async exists(key: string): Promise<boolean> {
    const result = await pglite.query(
      `SELECT 1 FROM idempotency_keys WHERE key = $1 AND expires_at > NOW() LIMIT 1`,
      [key]
    );
    return result.rows.length > 0;
  }

  async getResponse(key: string): Promise<Record<string, any> | null> {
    const record = await this.get(key);
    return record?.response || null;
  }
}

export const idempotencyRepository = new IdempotencyRepository();