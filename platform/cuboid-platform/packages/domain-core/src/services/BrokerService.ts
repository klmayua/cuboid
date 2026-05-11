import { brokerRepository } from '../repositories/BrokerRepository';
import { leadRepository } from '../repositories/LeadRepository';
import { dealRepository } from '../repositories/DealRepository';
import { commissionRepository } from '../repositories/CommissionRepository';
import { clientRepository } from '../repositories/ClientRepository';
import { ValidationError } from '../errors';
import { globalEventBus } from '../events';
import { auditLog } from './audit-service';

export class BrokerService {
  private repo = brokerRepository;
  private leadRepo = leadRepository;
  private dealRepo = dealRepository;
  private commissionRepo = commissionRepository;
  private clientRepo = clientRepository;

  async getDashboard(organizationId: string) {
    const [profile, leads, deals, commissions, clients] = await Promise.all([
      this.repo.findByOrg(organizationId),
      this.leadRepo.listByOrg(organizationId),
      this.dealRepo.listByOrg(organizationId),
      this.commissionRepo.listByOrg(organizationId),
      this.clientRepo.listByOrg(organizationId),
    ]);

    const claimableLeads = leads.filter((l: any) => (l.status === 'NEW' || l.status === 'CLAIMABLE') && new Date(l.expiresAt) > new Date()).length;
    const activeDeals = deals.filter((d: any) => !['CLOSED', 'FAILED'].includes(d.status)).length;
    const totalCommission = commissions.reduce((sum: number, c: any) => sum + Number(c.amount), 0);

    return {
      profile,
      active: profile?.active ?? false,
      leads: { total: leads.length, claimable: claimableLeads },
      deals: { total: deals.length, active: activeDeals },
      commissions: { total: totalCommission, count: commissions.length },
      clients: { total: clients.length },
    };
  }

  async getLeadQueue() {
    return this.leadRepo.listClaimable();
  }

  async claimLead(organizationId: string, actorId: string) {
    const profile = await this.repo.findByOrg(organizationId);
    if (!profile) throw new ValidationError('Broker profile not found');

    await globalEventBus.emit('BROKER_LEAD_CLAIMED', {
      actorId,
      organizationId,
      payload: { brokerId: profile.id },
    });

    await auditLog({
      organizationId,
      actorId,
      action: 'BROKER_LEAD_CLAIMED',
      entityType: 'BrokerProfile',
      entityId: profile.id,
      metadata: { brokerId: profile.id },
    });

    return profile;
  }

  async updateProfile(data: {
    organizationId: string;
    specialty?: string;
    commissionRate?: number;
    active?: boolean;
    actorId: string;
  }) {
    const profile = await this.repo.upsert({
      organizationId: data.organizationId,
      specialty: data.specialty,
      commissionRate: data.commissionRate,
      active: data.active,
    });

    await globalEventBus.emit('BROKER_PROFILE_UPDATED', {
      actorId: data.actorId,
      organizationId: data.organizationId,
      payload: { brokerId: profile.id },
    });

    await auditLog({
      organizationId: data.organizationId,
      actorId: data.actorId,
      action: 'BROKER_PROFILE_UPDATED',
      entityType: 'BrokerProfile',
      entityId: profile.id,
      metadata: { specialty: data.specialty, commissionRate: data.commissionRate },
    });

    return profile;
  }

  async getPerformanceMetrics(organizationId: string) {
    const profile = await this.repo.findByOrg(organizationId);
    const [deals, commissions] = await Promise.all([
      this.dealRepo.listByOrg(organizationId),
      this.commissionRepo.listByOrg(organizationId),
    ]);

    const closedDeals = deals.filter((d: any) => d.status === 'CLOSED');
    const totalVolume = closedDeals.reduce((sum: number, d: any) => sum + Number(d.amount), 0);
    const totalCommission = commissions.reduce((sum: number, c: any) => sum + Number(c.amount), 0);

    return {
      profile,
      commissionRate: profile?.commissionRate ?? 0,
      active: profile?.active ?? false,
      deals: { total: deals.length, closed: closedDeals.length },
      commissions: { total: totalCommission, count: commissions.length },
      volume: totalVolume,
    };
  }
}

export const brokerService = new BrokerService();
