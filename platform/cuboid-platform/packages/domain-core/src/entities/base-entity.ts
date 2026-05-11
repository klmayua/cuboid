import { EntityId, EntityIdLike, generateEntityId } from '../value-objects/entity-id';
import { Timestamp, TimestampLike } from '../value-objects/timestamp';

export interface DomainEvent {
  type: string;
  aggregateId: string;
  payload: Record<string, unknown>;
  timestamp: string;
  version: number;
}

export abstract class Entity<T> {
  protected readonly _id: EntityId;
  protected _createdAt: Timestamp;
  protected _updatedAt: Timestamp;
  protected _version: number;

  constructor(
    id: EntityId,
    createdAt?: TimestampLike,
    updatedAt?: TimestampLike,
    version: number = 1
  ) {
    this._id = id;
    this._createdAt = createdAt instanceof Timestamp
      ? createdAt
      : Timestamp.fromISO(String(createdAt ?? new Date().toISOString()));
    this._updatedAt = updatedAt instanceof Timestamp
      ? updatedAt
      : Timestamp.fromISO(String(updatedAt ?? new Date().toISOString()));
    this._version = version;
  }

  protected abstract get entityType(): string;

  get id(): EntityId {
    return this._id;
  }

  get createdAt(): Timestamp {
    return this._createdAt;
  }

  get updatedAt(): Timestamp {
    return this._updatedAt;
  }

  get version(): number {
    return this._version;
  }

  protected markUpdated(): void {
    this._updatedAt = Timestamp.now();
    this._version += 1;
  }

  equals(other: Entity<T>): boolean {
    return this._id.equals(other._id);
  }

  abstract toJSON(): T;
}