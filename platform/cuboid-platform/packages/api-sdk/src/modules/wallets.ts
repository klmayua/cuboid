import { walletService } from '@cuboid/domain-core';

export async function getBalances(organizationId: string) {
  return walletService.getBalances(organizationId);
}

export async function reserveFunds(walletId: string, amount: number, actorId: string) {
  return walletService.reserveFunds(walletId, amount, actorId);
}

export async function releaseFunds(walletId: string, amount: number, actorId: string) {
  return walletService.releaseFunds(walletId, amount, actorId);
}

export async function transfer(
  fromWalletId: string,
  toWalletId: string,
  amount: number,
  reference: string,
  actorId: string
) {
  return walletService.transfer(fromWalletId, toWalletId, amount, reference, actorId);
}
