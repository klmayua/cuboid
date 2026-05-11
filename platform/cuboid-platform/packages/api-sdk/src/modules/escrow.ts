import { escrowService } from '@cuboid/domain-core';

export async function createEscrow(data: Parameters<typeof escrowService.create>[0]) {
  return escrowService.create(data);
}

export async function fundEscrow(id: string, actorId: string) {
  return escrowService.fund(id, actorId);
}

export async function lockEscrow(id: string, actorId: string) {
  return escrowService.lock(id, actorId);
}

export async function releaseEscrow(id: string, walletId: string, actorId: string) {
  return escrowService.release(id, walletId, actorId);
}

export async function disputeEscrow(id: string, actorId: string) {
  return escrowService.dispute(id, actorId);
}

export async function cancelEscrow(id: string, actorId: string) {
  return escrowService.cancel(id, actorId);
}

export async function getEscrow(id: string) {
  return escrowService.getById(id);
}

export async function listMyEscrows(organizationId: string) {
  return escrowService.listByOrg(organizationId);
}
