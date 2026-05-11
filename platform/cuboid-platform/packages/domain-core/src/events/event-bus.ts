import { DomainEvent, DomainEventProps, DomainEventType } from './base-event';

export type EventHandler<T = unknown> = (event: DomainEvent<T>) => void | Promise<void>;

export interface EventSubscription {
  unsubscribe(): void;
}

export interface EventBus {
  subscribe<T>(
    eventType: DomainEventType | DomainEventType[],
    handler: EventHandler<T>
  ): EventSubscription;
  
  publish<T>(event: DomainEvent<T> | DomainEventProps<T>): Promise<void>;
  
  publishBatch<T>(events: (DomainEvent<T> | DomainEventProps<T>)[]): Promise<void>;
}

export class InMemoryEventBus implements EventBus {
  private handlers: Map<DomainEventType, Set<EventHandler>> = new Map();
  private middlewares: ((event: DomainEvent) => DomainEvent | Promise<DomainEvent>)[] = [];

  subscribe<T>(
    eventType: DomainEventType | DomainEventType[],
    handler: EventHandler<T>
  ): EventSubscription {
    const types = Array.isArray(eventType) ? eventType : [eventType];
    
    for (const type of types) {
      const handlers = this.handlers.get(type) ?? new Set();
      handlers.add(handler as EventHandler);
      this.handlers.set(type, handlers);
    }

    return {
      unsubscribe: () => {
        for (const type of types) {
          const handlers = this.handlers.get(type);
          if (handlers) {
            handlers.delete(handler as EventHandler);
          }
        }
      },
    };
  }

  async publish<T>(event: DomainEvent<T> | DomainEventProps<T>): Promise<void> {
    let domainEvent: DomainEvent<T>;
    
    if (event instanceof DomainEvent) {
      domainEvent = event;
    } else {
      domainEvent = new (class extends DomainEvent<T> {
        constructor() {
          super(event as DomainEventProps<T>);
        }
      })();
    }

    for (const middleware of this.middlewares) {
      domainEvent = await middleware(domainEvent) as DomainEvent<T>;
    }

    const handlers = this.handlers.get(domainEvent.type) ?? new Set();
    
    await Promise.all(
      Array.from(handlers).map(handler => handler(domainEvent))
    );
  }

  async publishBatch<T>(events: (DomainEvent<T> | DomainEventProps<T>)[]): Promise<void> {
    await Promise.all(events.map(event => this.publish(event)));
  }

  useMiddleware(middleware: (event: DomainEvent) => DomainEvent | Promise<DomainEvent>): void {
    this.middlewares.push(middleware);
  }
}

export const globalEventBus = new InMemoryEventBus();