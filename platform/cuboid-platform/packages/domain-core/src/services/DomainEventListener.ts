import { globalEventBus, type DomainEventType } from '../events';
import { auditLog } from './audit-service';

export class DomainEventListener {
  private subscriptions: (() => void)[] = [];

  async initialize(): Promise<void> {
    await this.listenToQuotes();
    await this.listenToBroker();
    await this.listenToBDC();
    await this.listenToWallet();
    await this.listenToEscrow();
    await this.listenToSettlement();
    await this.listenToTrust();
    await this.listenToNotifications();
    console.log('[EventListener] All domain listeners initialized');
  }

  destroy(): void {
    this.subscriptions.forEach(unsub => unsub());
    this.subscriptions = [];
  }

  private async listenToQuotes(): Promise<void> {
    const unsub = globalEventBus.subscribe('QUOTE_ACCEPTED', async (event) => {
      const { userId, amount, corridor, currency } = event.payload as any;
      await auditLog({
        actorId: userId,
        action: 'QUOTE_ACCEPTED',
        entityType: 'QUOTE',
        metadata: { amount, corridor, currency },
      });
    });
    this.subscriptions.push(unsub);
  }

  private async listenToBroker(): Promise<void> {
    const unsub1 = globalEventBus.subscribe('BROKER_LEAD_CREATED', async (event) => {
      const { organizationId, leadId, corridor } = event.payload as any;
      await auditLog({
        actorId: 'system',
        action: 'BROKER_LEAD_ROUTED',
        organizationId,
        metadata: { leadId, corridor },
      });
    });

    const unsub2 = globalEventBus.subscribe('BROKER_DEAL_CLOSED', async (event) => {
      const { organizationId, dealId, amount } = event.payload as any;
      await globalEventBus.emit('TRUST_SCORE_UPDATED', { actorId: 'system', payload: { dealId, delta: 10 } });
    });

    this.subscriptions.push(unsub1, unsub2);
  }

  private async listenToBDC(): Promise<void> {
    const unsub1 = globalEventBus.subscribe('BDC_RATE_PUBLISHED', async (event) => {
      const { corridor, buyRate, sellRate } = event.payload as any;
      await auditLog({ actorId: 'system', action: 'RATE_PUBLISHED', metadata: { corridor, buyRate, sellRate } });
    });

    const unsub2 = globalEventBus.subscribe('BDC_DEAL_CLOSED', async (event) => {
      const { organizationId, dealId, amount, currency } = event.payload as any;
      await globalEventBus.emit('SETTLEMENT_INITIATED', { payload: { dealId, amount, currency } });
    });

    this.subscriptions.push(unsub1, unsub2);
  }

  private async listenToWallet(): Promise<void> {
    const unsub1 = globalEventBus.subscribe('WALLET_RESERVED', async (event) => {
      const { walletId, amount } = event.payload as any;
      await auditLog({ actorId: 'system', action: 'WALLET_RESERVED', metadata: { walletId, amount } });
    });

    const unsub2 = globalEventBus.subscribe('WALLET_CREDITED', async (event) => {
      await globalEventBus.emit('TRUST_SCORE_UPDATED', { payload: { delta: 5 } });
    });

    this.subscriptions.push(unsub1, unsub2);
  }

  private async listenToEscrow(): Promise<void> {
    const unsub = globalEventBus.subscribe('ESCROW_RELEASED', async (event) => {
      const { escrowId, dealId } = event.payload as any;
      
      await globalEventBus.emit('WALLET_DEBITED', { payload: { escrowId, amount: 0 } });
      await globalEventBus.emit('TRUST_SCORE_UPDATED', { payload: { delta: 15 } });
      await globalEventBus.emit('NOTIFICATION_SENT', { payload: { type: 'ESCROW_RELEASED', escrowId } });
    });
    this.subscriptions.push(unsub);
  }

  private async listenToSettlement(): Promise<void> {
    const unsub = globalEventBus.subscribe('SETTLEMENT_CLEARED', async (event) => {
      const { settlementId, amount, organizationId } = event.payload as any;
      
      await auditLog({ actorId: 'system', action: 'SETTLEMENT_COMPLETED', organizationId, metadata: { settlementId, amount } });
      await globalEventBus.emit('ESCROW_RELEASED', { payload: { settlementId } });
    });
    this.subscriptions.push(unsub);
  }

  private async listenToTrust(): Promise<void> {
    const unsub = globalEventBus.subscribe('TRUST_SCORE_UPDATED', async (event) => {
      const { userId, delta, score } = event.payload as any;
      await auditLog({ actorId: 'system', action: 'TRUST_UPDATED', metadata: { userId, delta, score } });
    });
    this.subscriptions.push(unsub);
  }

  private async listenToNotifications(): Promise<void> {
    const types: Record<string, string> = {
      QUOTE_ACCEPTED: 'QUOTE_UPDATE',
      ESCROW_RELEASED: 'ESCROW_UPDATE',
      SETTLEMENT_CLEARED: 'SETTLEMENT_UPDATE',
      TRUST_SCORE_UPDATED: 'TRUST_UPDATE',
    };
    const unsubs = Object.keys(types).map((eventType) =>
      globalEventBus.subscribe(eventType as DomainEventType, async (event) => {
        const type = types[event.type];
        if (type) {
          await globalEventBus.emit('NOTIFICATION_SENT', { payload: { type, title: event.type } });
        }
      })
    );
    this.subscriptions.push(...unsubs);
  }
}

export const domainEventListener = new DomainEventListener();