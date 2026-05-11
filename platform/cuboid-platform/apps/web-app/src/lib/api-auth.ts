import { NextRequest } from 'next/server';
import { authService } from '@cuboid/domain-core';

export interface AuthContext {
  userId: string;
  email: string;
  organizationId?: string;
}

export async function requireAuth(req: NextRequest): Promise<AuthContext> {
  const token = req.cookies.get('cuboid-access-token')?.value
    ?? req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  try {
    const decoded = await authService.verify(token);
    const user = await authService.getUser(decoded.sub);
    const orgId = user.memberships?.[0]?.organizationId;

    return {
      userId: user.id,
      email: user.email,
      organizationId: orgId,
    };
  } catch {
    throw new Error('UNAUTHORIZED');
  }
}

export function requireOrg(ctx: AuthContext): string {
  if (!ctx.organizationId) {
    throw new Error('ORG_REQUIRED');
  }
  return ctx.organizationId;
}
