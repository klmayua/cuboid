import { prisma, type PrismaClient } from '@cuboid/database';
import { DomainError, NotFoundError } from '../errors';

export abstract class BaseRepository {
  protected readonly db: PrismaClient;

  constructor(db: PrismaClient = prisma) {
    this.db = db;
  }

  protected handleError(err: unknown): never {
    if (err instanceof DomainError) throw err;
    if (err instanceof Error) {
      throw new DomainError(err.message, 'DATABASE_ERROR', 500);
    }
    throw new DomainError('Unknown database error', 'DATABASE_ERROR', 500);
  }
}
