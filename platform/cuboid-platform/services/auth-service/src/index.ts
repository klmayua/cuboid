import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface DeviceInfo {
  fingerprint: string;
  ipAddress: string;
  userAgent: string;
  lastSeen: string;
}

export interface Session {
  id: string;
  userId: string;
  deviceFingerprint: string;
  createdAt: string;
  expiresAt: string;
  lastActivityAt: string;
  isRevoked: boolean;
}

export interface AuthConfig {
  jwtSecret: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  sessionExpiryDays: number;
}

const defaultConfig: AuthConfig = {
  jwtSecret: process.env.JWT_SECRET ?? 'cuboid-dev-secret-change-in-production',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  sessionExpiryDays: 30,
};

export class AuthService {
  private sessions: Map<string, Session> = new Map();
  private config: AuthConfig;

  constructor(config: Partial<AuthConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateAccessToken(userId: string, sessionId: string, metadata?: Record<string, unknown>): string {
    return jwt.sign(
      {
        sub: userId,
        sid: sessionId,
        type: 'access',
        ...metadata,
      },
      this.config.jwtSecret,
      { expiresIn: this.config.accessTokenExpiry }
    );
  }

  generateRefreshToken(userId: string, sessionId: string): string {
    return jwt.sign(
      { sub: userId, sid: sessionId, type: 'refresh' },
      this.config.jwtSecret,
      { expiresIn: this.config.refreshTokenExpiry }
    );
  }

  verifyToken(token: string): { sub: string; sid: string; type: 'access' | 'refresh' } | null {
    try {
      const decoded = jwt.verify(token, this.config.jwtSecret) as { sub: string; sid: string; type: 'access' | 'refresh' };
      return decoded;
    } catch {
      return null;
    }
  }

  createSession(userId: string, deviceFingerprint: string): Session {
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + this.config.sessionExpiryDays * 24 * 60 * 60 * 1000).toISOString();
    
    const session: Session = {
      id: uuidv4(),
      userId,
      deviceFingerprint,
      createdAt: now,
      expiresAt,
      lastActivityAt: now,
      isRevoked: false,
    };
    
    this.sessions.set(session.id, session);
    return session;
  }

  async validateSession(sessionId: string): Promise<Session | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    
    if (session.isRevoked || new Date(session.expiresAt) < new Date()) {
      return null;
    }
    
    return session;
  }

  async revokeSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isRevoked = true;
    }
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    for (const session of this.sessions.values()) {
      if (session.userId === userId) {
        session.isRevoked = true;
      }
    }
  }

  getUserSessions(userId: string): Session[] {
    return Array.from(this.sessions.values()).filter(s => s.userId === userId && !s.isRevoked);
  }

  generateMFAsecret(): string {
    return uuidv4().replace(/-/g, '').slice(0, 32);
  }

  verifyMFACode(code: string, secret: string): boolean {
    return code.length === 6 && /^\d+$/.test(code);
  }
}

export default AuthService;