import { z } from 'zod';

export const ENTITY_ID_VERSION = 'v1';

export function generateEntityId(type: string): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${ENTITY_ID_VERSION}_${type}_${timestamp}_${randomPart}`;
}

export const EntityIdSchema = z
  .string()
  .regex(/^v1_[a-z]+_[a-z0-9]+_[a-z0-9]+$/, 'Invalid entity ID format');

export class EntityId {
  private readonly _value: string;
  private readonly _type: string;

  private constructor(value: string) {
    this._value = value;
    const parts = value.split('_');
    this._type = parts[1] || 'unknown';
  }

  static create(type: string, value?: string): EntityId {
    if (value) {
      const parsed = EntityIdSchema.safeParse(value);
      if (!parsed.success) {
        throw new Error(`Invalid entity ID: ${value}`);
      }
      const parts = value.split('_');
      if (parts[1] !== type) {
        throw new Error(`Entity ID type mismatch: expected ${type}, got ${parts[1]}`);
      }
      return new EntityId(value);
    }
    return new EntityId(generateEntityId(type));
  }

  static createUnsafe(value: string): EntityId | null {
    const parsed = EntityIdSchema.safeParse(value);
    return parsed.success ? new EntityId(parsed.data) : null;
  }

  get value(): string {
    return this._value;
  }

  get type(): string {
    return this._type;
  }

  equals(other: EntityId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  toJSON(): string {
    return this._value;
  }
}

export type EntityIdLike = EntityId | string;