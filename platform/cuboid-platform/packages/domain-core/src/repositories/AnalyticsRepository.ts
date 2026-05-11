import { prisma } from '@cuboid/database';
import { BaseRepository } from './BaseRepository';

export class AnalyticsRepository extends BaseRepository {
  async overview(organizationId?: string) {
    const where = organizationId ? { organizationId } : {};
    const [transactionCount, walletCount, quoteCount, escrowCount] = await Promise.all([
      this.db.transaction.count({ where }),
      this.db.wallet.count({ where: { ...where, deletedAt: null } }),
      this.db.quote.count({ where: { ...where, deletedAt: null } }),
      this.db.escrow.count({ where }),
    ]);
    return { transactionCount, walletCount, quoteCount, escrowCount };
  }

  async volumeMetrics(organizationId?: string, from?: Date, to?: Date) {
    const where: any = { status: 'CLEARED' };
    if (organizationId) where.organizationId = organizationId;
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = from;
      if (to) where.createdAt.lte = to;
    }

    const txs = await this.db.transaction.findMany({ where });
    const totalVolume = txs.reduce(
      (sum: number, t: any) => sum + Number(t.amount),
      0
    );
    const byCurrency: Record<string, number> = {};
    for (const t of txs) {
      byCurrency[t.currency] = (byCurrency[t.currency] || 0) + Number(t.amount);
    }
    return { totalVolume, count: txs.length, byCurrency };
  }

  async corridorMetrics(organizationId?: string) {
    const where: any = {};
    if (organizationId) where.organizationId = organizationId;
    const quotes = await this.db.quote.findMany({
      where: { ...where, deletedAt: null },
      include: { pair: true },
    });
    const byPair: Record<string, number> = {};
    for (const q of quotes) {
      byPair[q.pair.symbol] = (byPair[q.pair.symbol] || 0) + 1;
    }
    return { totalQuotes: quotes.length, byPair };
  }

  async liquidityMetrics() {
    const wallets = await this.db.wallet.findMany({
      where: { deletedAt: null },
    });
    const byCurrency: Record<string, { balance: number; available: number; reserved: number }> = {};
    for (const w of wallets) {
      if (!byCurrency[w.currency]) {
        byCurrency[w.currency] = { balance: 0, available: 0, reserved: 0 };
      }
      byCurrency[w.currency].balance += Number(w.balance);
      byCurrency[w.currency].available += Number(w.availableBalance);
      byCurrency[w.currency].reserved += Number(w.reservedBalance);
    }
    return { byCurrency, deskCount: await this.db.bdcDesk.count({ where: { active: true, deletedAt: null } }) };
  }

  async deskPerformance(organizationId?: string) {
    const where: any = { active: true, deletedAt: null };
    if (organizationId) where.organizationId = organizationId;
    const desks = await this.db.bdcDesk.findMany({ where });
    return desks.map((d: any) => ({
      id: d.id,
      location: d.location,
      city: d.city,
      active: d.active,
      createdAt: d.createdAt,
    }));
  }

  async brokerMetrics(organizationId: string) {
    const [deals, leads, commissions, clients] = await Promise.all([
      this.db.brokerDeal.findMany({ where: { organizationId, deletedAt: null } }),
      this.db.brokerLead.findMany({ where: { organizationId, deletedAt: null } }),
      this.db.commissionEntry.findMany({ where: { organizationId } }),
      this.db.brokerClient.findMany({ where: { organizationId, deletedAt: null } }),
    ]);

    const closedDeals = deals.filter((d: any) => d.status === 'CLOSED');
    const failedDeals = deals.filter((d: any) => d.status === 'FAILED');
    const totalDeals = deals.length;

    const closeRate = totalDeals > 0 ? closedDeals.length / totalDeals : 0;
    const avgTicket = closedDeals.length > 0
      ? closedDeals.reduce((sum: number, d: any) => sum + Number(d.amount), 0) / closedDeals.length
      : 0;
    const avgMargin = closedDeals.length > 0
      ? closedDeals.reduce((sum: number, d: any) => sum + Number(d.margin), 0) / closedDeals.length
      : 0;

    const settledTxs = await this.db.transaction.findMany({
      where: { organizationId, status: 'CLEARED', deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    const avgSettlementSpeed = settledTxs.length > 1
      ? settledTxs.reduce((diff: number, tx: any, i: number, arr: any[]) => {
          if (i === 0) return 0;
          return diff + (new Date(tx.createdAt).getTime() - new Date(arr[i - 1].createdAt).getTime());
        }, 0) / (settledTxs.length - 1) / (1000 * 60 * 60)
      : 0;

    const repeatClients = clients.filter((c: any) => c.repeatFrequency > 1).length;
    const repeatClientRatio = clients.length > 0 ? repeatClients / clients.length : 0;

    const commissionVelocity = commissions.length > 0
      ? commissions.reduce((sum: number, c: any) => sum + Number(c.amount), 0) / commissions.length
      : 0;

    const totalVolume = closedDeals.reduce((sum: number, d: any) => sum + Number(d.amount), 0);

    return {
      closeRate,
      avgTicket,
      avgMargin,
      avgSettlementSpeed,
      repeatClientRatio,
      commissionVelocity,
      totalDeals,
      closedDeals: closedDeals.length,
      failedDeals: failedDeals.length,
      totalVolume,
      totalLeads: leads.length,
      convertedLeads: leads.filter((l: any) => l.status === 'CONVERTED').length,
      totalClients: clients.length,
      totalCommissions: commissions.reduce((sum: number, c: any) => sum + Number(c.amount), 0),
    };
  }

  async brokerRanking(organizationId: string) {
    const allScores = await this.db.trustScore.findMany({
      orderBy: { score: 'desc' },
      include: { organization: true },
    });
    const index = allScores.findIndex((s: any) => s.organizationId === organizationId);
    const rank = index >= 0 ? index + 1 : allScores.length;
    const percentile = allScores.length > 0 ? ((allScores.length - rank) / allScores.length) * 100 : 0;
    return { rank, total: allScores.length, percentile };
  }
}

export const analyticsRepository = new AnalyticsRepository();
