import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';
import { NotFoundError, ConflictError } from '../errors';

export class QuoteRepository extends BaseRepository {
  async create(data: {
    organizationId: string;
    pairId: string;
    side: string;
    amount: number;
    quotedRate: number;
    expiresAt: Date;
    createdBy: string;
  }) {
    return this.db.quote.create({
      data: {
        ...data,
        side: data.side as any,
        status: 'DRAFT',
      },
    });
  }

  async findById(id: string) {
    const quote = await this.db.quote.findUnique({
      where: { id, deletedAt: null },
      include: { pair: true, creator: true },
    });
    if (!quote) throw new NotFoundError('Quote');
    return quote;
  }

  async listLive(organizationId?: string) {
    return this.db.quote.findMany({
      where: {
        status: 'LIVE',
        deletedAt: null,
        ...(organizationId && { organizationId }),
        expiresAt: { gt: new Date() },
      },
      include: { pair: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listByOrg(organizationId: string) {
    return this.db.quote.findMany({
      where: { organizationId, deletedAt: null },
      include: { pair: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async reserve(id: string) {
    return this.db.quote.update({
      where: { id },
      data: { status: 'RESERVED' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.db.quote.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async cancel(id: string) {
    return this.db.quote.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async match(data: {
    buyQuoteId: string;
    sellQuoteId: string;
    matchedRate: number;
    matchedVolume: number;
  }) {
    const [buyQuote, sellQuote] = await Promise.all([
      this.db.quote.findUnique({ where: { id: data.buyQuoteId } }),
      this.db.quote.findUnique({ where: { id: data.sellQuoteId } }),
    ]);

    if (!buyQuote || !sellQuote) throw new NotFoundError('Quote');
    if (buyQuote.status !== 'LIVE' || sellQuote.status !== 'LIVE') {
      throw new ConflictError('One or both quotes are not live');
    }

    const match = await this.db.quoteMatch.create({ data });

    await this.db.quote.updateMany({
      where: { id: { in: [data.buyQuoteId, data.sellQuoteId] } },
      data: { status: 'MATCHED' },
    });

    return match;
  }
}

export const quoteRepository = new QuoteRepository();
