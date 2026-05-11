import { settlementService } from '@cuboid/domain-core';

export async function initiateSettlement(data: Parameters<typeof settlementService.initiate>[0]) {
  return settlementService.initiate(data);
}

export async function verifySettlement(id: string, actorId: string) {
  return settlementService.verify(id, actorId);
}

export async function clearSettlement(id: string, channel: string, actorId: string) {
  return settlementService.clear(id, channel, actorId);
}

export async function failSettlement(id: string, actorId: string) {
  return settlementService.fail(id, actorId);
}

export async function reverseSettlement(id: string, actorId: string) {
  return settlementService.reverse(id, actorId);
}

export async function getSettlement(id: string) {
  return settlementService.getTransaction(id);
}

export async function listMySettlements(organizationId: string) {
  return settlementService.listByOrg(organizationId);
}
