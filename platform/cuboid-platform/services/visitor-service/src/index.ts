import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'visitor-service' });

export interface VisitorSession {
  id: string;
  visitorId: string;
  status: 'SEARCHING' | 'COMPARING' | 'RESERVING' | 'COMPLETED' | 'ABANDONED';
  originCountry?: string;
  originCity?: string;
  destinationCountry: string;
  destinationCity: string;
  travelDate?: string;
  currenciesNeeded: string[];
  estimatedAmount?: string;
  searchHistory: { query: string; timestamp: string; resultsCount: number }[];
  selectedBdcIds: string[];
  reservations: string[];
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface VisitorProfile {
  id: string;
  deviceId?: string;
  ipCountry?: string;
  language: string;
  originCountry?: string;
  isReturning: boolean;
  lastVisit?: string;
  createdAt: string;
}

const SESSION_TTL_HOURS = 24;

class VisitorService {
  private sessions: Map<string, VisitorSession> = new Map();
  private profiles: Map<string, VisitorProfile> = new Map();

  async initialize(): Promise<void> {
    logger.info('Visitor service initialized');
  }

  createSession(data: {
    originCountry?: string;
    originCity?: string;
    destinationCountry: string;
    destinationCity: string;
    currenciesNeeded: string[];
  }): VisitorSession {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_TTL_HOURS * 60 * 60 * 1000).toISOString();

    const session: VisitorSession = {
      id: `vs_${uuidv4()}`,
      visitorId: `v_${uuidv4()}`,
      status: 'SEARCHING',
      originCountry: data.originCountry,
      originCity: data.originCity,
      destinationCountry: data.destinationCountry,
      destinationCity: data.destinationCity,
      currenciesNeeded: data.currenciesNeeded,
      searchHistory: [],
      selectedBdcIds: [],
      reservations: [],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expiresAt,
    };

    this.sessions.set(session.id, session);
    logger.info({ sessionId: session.id, destination: data.destinationCity }, 'Visitor session created');

    return session;
  }

  getSession(sessionId: string): VisitorSession | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    if (new Date(session.expiresAt) < new Date()) {
      session.status = 'ABANDONED';
      return session;
    }

    return session;
  }

  updateSession(sessionId: string, updates: Partial<VisitorSession>): VisitorSession | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    Object.assign(session, updates, { updatedAt: new Date().toISOString() });
    return session;
  }

  recordSearch(sessionId: string, query: string, resultsCount: number): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.searchHistory.push({
      query,
      timestamp: new Date().toISOString(),
      resultsCount,
    });
    session.updatedAt = new Date().toISOString();
  }

  selectBdc(sessionId: string, bdcId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    if (!session.selectedBdcIds.includes(bdcId)) {
      session.selectedBdcIds.push(bdcId);
    }
    session.status = 'COMPARING';
    session.updatedAt = new Date().toISOString();
  }

  addReservation(sessionId: string, reservationId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.reservations.push(reservationId);
    session.status = 'RESERVING';
    session.updatedAt = new Date().toISOString();
  }

  completeSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.status = 'COMPLETED';
    session.updatedAt = new Date().toISOString();
    logger.info({ sessionId }, 'Visitor session completed');
  }

  abandonSession(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.status = 'ABANDONED';
    session.updatedAt = new Date().toISOString();
    logger.info({ sessionId }, 'Visitor session abandoned');
  }

  createOrUpdateProfile(data: {
    deviceId?: string;
    ipCountry?: string;
    language?: string;
  }): VisitorProfile {
    if (data.deviceId && this.profiles.has(data.deviceId)) {
      const profile = this.profiles.get(data.deviceId)!;
      profile.isReturning = true;
      profile.lastVisit = new Date().toISOString();
      if (data.ipCountry) profile.ipCountry = data.ipCountry;
      return profile;
    }

    const profileId = data.deviceId || `vp_${uuidv4()}`;
    const profile: VisitorProfile = {
      id: profileId,
      deviceId: data.deviceId,
      ipCountry: data.ipCountry,
      language: data.language || 'en',
      isReturning: false,
      createdAt: new Date().toISOString(),
    };

    this.profiles.set(profileId, profile);
    return profile;
  }

  getProfile(profileId: string): VisitorProfile | null {
    return this.profiles.get(profileId) || null;
  }

  getActiveSessions(): VisitorSession[] {
    const now = new Date();
    return Array.from(this.sessions.values())
      .filter(s => s.status !== 'COMPLETED' && s.status !== 'ABANDONED' && new Date(s.expiresAt) > now)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  getSessionStats(): {
    active: number;
    completed: number;
    abandoned: number;
    totalReservations: number;
  } {
    const sessions = Array.from(this.sessions.values());
    return {
      active: sessions.filter(s => s.status === 'SEARCHING' || s.status === 'COMPARING' || s.status === 'RESERVING').length,
      completed: sessions.filter(s => s.status === 'COMPLETED').length,
      abandoned: sessions.filter(s => s.status === 'ABANDONED').length,
      totalReservations: sessions.reduce((sum, s) => sum + s.reservations.length, 0),
    };
  }

  cleanupExpired(): number {
    const now = new Date();
    let cleaned = 0;

    for (const [id, session] of this.sessions.entries()) {
      if (new Date(session.expiresAt) < now) {
        if (session.status !== 'COMPLETED' && session.status !== 'ABANDONED') {
          session.status = 'ABANDONED';
          cleaned++;
        }
      }
    }

    return cleaned;
  }
}

export const visitorService = new VisitorService();

if (require.main === module) {
  (async () => {
    await visitorService.initialize();
    const session = visitorService.createSession({
      destinationCountry: 'KE',
      destinationCity: 'Nairobi',
      currenciesNeeded: ['USD', 'EUR'],
    });
    logger.info({ sessionId: session.id }, 'Test session created');
  })();
}