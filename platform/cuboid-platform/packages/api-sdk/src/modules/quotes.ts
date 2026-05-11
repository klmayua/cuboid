import { quoteService } from '@cuboid/domain-core';

export async function createQuote(data: Parameters<typeof quoteService.create>[0]) {
  return quoteService.create(data);
}

export async function reserveQuote(quoteId: string, userId: string) {
  return quoteService.reserve(quoteId, userId);
}

export async function cancelQuote(quoteId: string, userId: string) {
  return quoteService.cancel(quoteId, userId);
}

export async function matchQuotes(data: Parameters<typeof quoteService.match>[0]) {
  return quoteService.match(data);
}

export async function listLiveQuotes(organizationId?: string) {
  return quoteService.listLive(organizationId);
}

export async function listMyQuotes(organizationId: string) {
  return quoteService.listByOrg(organizationId);
}
