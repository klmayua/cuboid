import { type DomainEventType } from './base-event';
export type { DomainEventType };

export interface DomainEventPayload {
  eventId: string;
  type: DomainEventType;
  actorId?: string;
  organizationId?: string;
  timestamp: string;
  payload: Record<string, unknown>;
  flowId?: string;
}

export type EventHandler = (event: DomainEventPayload) => void | Promise<void>;

const DEFAULT_TIMEOUT_MS = 5000;
const DEAD_LETTER_QUEUE: DomainEventPayload[] = [];

export class EventBus {
  private handlers: Map<DomainEventType, Set<EventHandler>> = new Map();

  on(type: DomainEventType, handler: EventHandler): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);
    return () => this.handlers.get(type)?.delete(handler);
  }

  subscribe(type: DomainEventType, handler: EventHandler): () => void {
    return this.on(type, handler);
  }

  async emit(type: DomainEventType, payload: Omit<DomainEventPayload, 'eventId' | 'type' | 'timestamp'>): Promise<void> {
    const event: DomainEventPayload = {
      eventId: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type,
      timestamp: new Date().toISOString(),
      ...payload,
    };

    const handlers = this.handlers.get(type);
    if (!handlers) return;

    const promises = Array.from(handlers).map(async (handler) => {
      try {
        await Promise.race([
          handler(event),
          new Promise((_, reject) => setTimeout(() => reject(new Error(`Event handler timed out after ${DEFAULT_TIMEOUT_MS}ms`)), DEFAULT_TIMEOUT_MS))
        ]);
      } catch (err) {
        console.error(`Event handler failed for ${type}:`, err);
        DEAD_LETTER_QUEUE.push(event);
        console.error(`[EventBus] Dead letter queued. Queue size:`, DEAD_LETTER_QUEUE.length);
        console.error(`[EventBus] Failed event:`, { eventId: event.eventId, type: event.type, payload: event.payload });
      }
    });

    await Promise.all(promises);
  }

  getDeadLetterQueue(): DomainEventPayload[] {
    return [...DEAD_LETTER_QUEUE];
  }

  clearDeadLetterQueue(): number {
    const count = DEAD_LETTER_QUEUE.length;
    DEAD_LETTER_QUEUE.length = 0;
    return count;
  }
}

export const globalEventBus = new EventBus();
