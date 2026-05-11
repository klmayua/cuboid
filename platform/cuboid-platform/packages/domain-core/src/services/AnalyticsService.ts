import { analyticsRepository } from '../repositories/AnalyticsRepository';

export class AnalyticsService {
  private repo = analyticsRepository;

  async overview(organizationId?: string) {
    return this.repo.overview(organizationId);
  }

  async volumeMetrics(organizationId?: string, from?: string, to?: string) {
    return this.repo.volumeMetrics(
      organizationId,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined
    );
  }

  async corridorMetrics(organizationId?: string) {
    return this.repo.corridorMetrics(organizationId);
  }

  async liquidityMetrics() {
    return this.repo.liquidityMetrics();
  }

  async deskPerformance(organizationId?: string) {
    return this.repo.deskPerformance(organizationId);
  }

  async brokerMetrics(organizationId: string) {
    return this.repo.brokerMetrics(organizationId);
  }

  async brokerRanking(organizationId: string) {
    return this.repo.brokerRanking(organizationId);
  }
}

export const analyticsService = new AnalyticsService();
