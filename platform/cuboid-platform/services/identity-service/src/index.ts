import { v4 as uuidv4 } from 'uuid';
import { UserSchema, OrganizationSchema, type Organization, type User } from '@cuboid/schemas';

export interface IdentityRepository {
  createUser(data: { email: string; displayName: string }): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User>;
  suspendUser(id: string): Promise<User>;
  
  createOrganization(data: {
    legalName: string;
    displayName: string;
    country: string;
    entityType: 'RETAIL' | 'BUSINESS' | 'INSTITUTIONAL';
  }): Promise<Organization>;
  getOrganization(id: string): Promise<Organization | null>;
  updateOrganization(id: string, data: Partial<Organization>): Promise<Organization>;
}

class InMemoryIdentityRepository implements IdentityRepository {
  private users: Map<string, User> = new Map();
  private organizations: Map<string, Organization> = new Map();

  async createUser(data: { email: string; displayName: string }): Promise<User> {
    const now = new Date().toISOString();
    const user: User = {
      id: uuidv4(),
      email: data.email,
      displayName: data.displayName,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(user.id, user);
    return user;
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error('User not found');
    const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
    this.users.set(id, updated);
    return updated;
  }

  async suspendUser(id: string): Promise<User> {
    return this.updateUser(id, {});
  }

  async createOrganization(data: {
    legalName: string;
    displayName: string;
    country: string;
    entityType: 'RETAIL' | 'BUSINESS' | 'INSTITUTIONAL';
  }): Promise<Organization> {
    const now = new Date().toISOString();
    const org: Organization = {
      id: uuidv4(),
      legalName: data.legalName,
      displayName: data.displayName,
      country: data.country.toUpperCase(),
      entityType: data.entityType,
      verificationTier: 'NONE',
      trustScore: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.organizations.set(org.id, org);
    return org;
  }

  async getOrganization(id: string): Promise<Organization | null> {
    return this.organizations.get(id) ?? null;
  }

  async updateOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
    const org = await this.getOrganization(id);
    if (!org) throw new Error('Organization not found');
    const updated = { ...org, ...data, updatedAt: new Date().toISOString() };
    this.organizations.set(id, updated);
    return updated;
  }
}

export class IdentityService {
  private repository: IdentityRepository;

  constructor(repository: IdentityRepository = new InMemoryIdentityRepository()) {
    this.repository = repository;
  }

  async registerUser(data: { email: string; displayName: string }): Promise<User> {
    const existing = await this.repository.getUserByEmail(data.email);
    if (existing) {
      throw new Error('User already exists');
    }
    return this.repository.createUser(data);
  }

  async getUser(id: string): Promise<User | null> {
    return this.repository.getUser(id);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.repository.updateUser(id, data);
  }

  async createOrganization(data: {
    legalName: string;
    displayName: string;
    country: string;
    entityType: 'RETAIL' | 'BUSINESS' | 'INSTITUTIONAL';
  }): Promise<Organization> {
    return this.repository.createOrganization(data);
  }

  async getOrganization(id: string): Promise<Organization | null> {
    return this.repository.getOrganization(id);
  }

  async updateOrganizationVerification(id: string, tier: Organization['verificationTier']): Promise<Organization> {
    return this.repository.updateOrganization(id, { verificationTier: tier });
  }

  async updateOrganizationTrustScore(id: string, score: number): Promise<Organization> {
    return this.repository.updateOrganization(id, { trustScore: Math.max(0, Math.min(100, score)) });
  }
}

export default IdentityService;