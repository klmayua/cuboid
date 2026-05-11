import { prisma } from '@cuboid/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ValidationError, PermissionError, NotFoundError } from '../errors';
import { globalEventBus } from '../events';

const JWT_SECRET = process.env.JWT_SECRET ?? 'cuboid-dev-secret';
const ACCESS_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private db = prisma;

  async signup(input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: any; tokens: AuthTokens }> {
    const existing = await this.db.user.findUnique({ where: { email: input.email } });
    if (existing) throw new ValidationError('Email already registered');

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await this.db.user.create({
      data: {
        email: input.email,
        passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        role: 'USER',
        status: 'ACTIVE',
      },
    });

    const tokens = this.generateTokens(user.id);

    await globalEventBus.emit('USER_CREATED', {
      actorId: user.id,
      payload: { email: user.email, role: user.role },
    });

    return { user, tokens };
  }

  async signin(email: string, password: string): Promise<{ user: any; tokens: AuthTokens }> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) throw new ValidationError('Invalid credentials');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new ValidationError('Invalid credentials');

    const tokens = this.generateTokens(user.id);

    await this.db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return { user, tokens };
  }

  async verify(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET, { clockTolerance: 60 }) as { sub: string };
    } catch {
      throw new PermissionError('Invalid or expired token');
    }
  }

  async refresh(refreshToken: string) {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as { sub: string; type: string };
    if (decoded.type !== 'refresh') throw new PermissionError('Invalid token type');
    return this.generateTokens(decoded.sub);
  }

  async getUser(id: string) {
    const user = await this.db.user.findUnique({
      where: { id, deletedAt: null },
      include: { memberships: { include: { organization: true } } },
    });
    if (!user) throw new NotFoundError('User');
    return user;
  }

  private generateTokens(userId: string): AuthTokens {
    const accessToken = jwt.sign({ sub: userId, type: 'access' }, JWT_SECRET, { expiresIn: ACCESS_EXPIRY });
    const refreshToken = jwt.sign({ sub: userId, type: 'refresh' }, JWT_SECRET, { expiresIn: REFRESH_EXPIRY });
    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
