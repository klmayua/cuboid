import { quoteRepository } from '../repositories/QuoteRepository';
import { walletRepository } from '../repositories/WalletRepository';
import { ValidationError, LiquidityError, NotFoundError } from '../errors';
import { globalEventBus } from '../events';

export class QuoteService {
  private repo = quoteRepository;
  private walletRepo = walletRepository;

  async create(data: {
    organizationId: string;
    pairId: string;
    side: string;
    amount: number;
    quotedRate: number;
    expiresInMinutes?: number;
    createdBy: string;
  }) {
    const expiresAt = new Date(Date.now() + (data.expiresInMinutes ?? 30) * 60 * 1000);
    const quote = await this.repo.create({
      organizationId: data.organizationId,
      pairId: data.pairId,
      side: data.side,
      amount: data.amount,
      quotedRate: data.quotedRate,
      expiresAt,
      createdBy: data.createdBy,
    });

    await this.repo.updateStatus(quote.id, 'LIVE');

    await globalEventBus.emit('QUOTE_CREATED', {
      actorId: data.createdBy,
      organizationId: data.organizationId,
      payload: { quoteId: quote.id, amount: data.amount, side: data.side },
    });

    return quote;
  }

  async reserve(quoteId: string, userId: string) {
    const quote = await this.repo.findById(quoteId);
    if (quote.status !== 'LIVE') throw new ValidationError('Quote is not live');
    if (new Date(quote.expiresAt) < new Date()) throw new ValidationError('Quote has expired');

    const reserved = await this.repo.reserve(quoteId);

    await globalEventBus.emit('QUOTE_RESERVED', {
      actorId: userId,
      organizationId: quote.organizationId,
      payload: { quoteId, status: 'RESERVED' },
    });

    return reserved;
  }

  async cancel(quoteId: string, userId: string) {
    const quote = await this.repo.findById(quoteId);
    const cancelled = await this.repo.cancel(quoteId);

    await globalEventBus.emit('QUOTE_RESERVED', {
      actorId: userId,
      organizationId: quote.organizationId,
      payload: { quoteId, status: 'CANCELLED' },
    });

    return cancelled;
  }

  async match(data: {
    buyQuoteId: string;
    sellQuoteId: string;
    matchedRate: number;
    matchedVolume: number;
    actorId: string;
  }) {
    const match = await this.repo.match(data);

    await globalEventBus.emit('QUOTE_MATCHED', {
      actorId: data.actorId,
      payload: {
        matchId: match.id,
        buyQuoteId: data.buyQuoteId,
        sellQuoteId: data.sellQuoteId,
        matchedRate: data.matchedRate,
        matchedVolume: data.matchedVolume,
      },
    });

    return match;
  }

  async listLive(organizationId?: string) {
    return this.repo.listLive(organizationId);
  }

  async listByOrg(organizationId: string) {
    return this.repo.listByOrg(organizationId);
  }
}

export const quoteService = new QuoteService();
