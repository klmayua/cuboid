import { globalEventBus, type DomainEventType } from '@cuboid/domain-core';
import { supabase, isSupabaseConfigured } from './supabase';

const CHANNEL_NAME = 'market:ticker';

export class RealtimeBridge {
  private static instance: RealtimeBridge;
  private unsubscribers: Map<string, () => void> = new Map();

  static getInstance(): RealtimeBridge {
    if (!RealtimeBridge.instance) {
      RealtimeBridge.instance = new RealtimeBridge();
    }
    return RealtimeBridge.instance;
  }

  start() {
    this.subscribeToEvent('RATE_PUBLISHED');
    this.subscribeToEvent('MARKET_SNAPSHOT_CREATED');
    this.subscribeToEvent('QUOTE_MATCHED');
    this.subscribeToEvent('LIQUIDITY_UPDATED');
  }

  private subscribeToEvent(eventType: DomainEventType) {
    const unsub = globalEventBus.on(eventType, (payload) => {
      this.broadcast(eventType, payload);
    });
    this.unsubscribers.set(eventType, unsub);
  }

  private broadcast(type: string, payload: unknown) {
    if (isSupabaseConfigured() && supabase) {
      supabase
        .channel(CHANNEL_NAME)
        .send({
          type: 'broadcast',
          event: type,
          payload,
        })
        .catch((err: unknown) => {
          console.error('Supabase broadcast failed:', err);
        });
    }
  }

  stop() {
    for (const [, unsub] of this.unsubscribers) {
      unsub();
    }
    this.unsubscribers.clear();
  }
}

export const realtimeBridge = RealtimeBridge.getInstance();
