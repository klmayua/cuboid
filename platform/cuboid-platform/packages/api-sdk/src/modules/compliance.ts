import { complianceOpsService } from '@cuboid/domain-core';

export async function submitKyc(data: Parameters<typeof complianceOpsService.submitKyc>[0]) {
  return complianceOpsService.submitKyc(data);
}

export async function submitKyb(data: Parameters<typeof complianceOpsService.submitKyb>[0]) {
  return complianceOpsService.submitKyb(data);
}

export async function getComplianceCases(organizationId: string) {
  return complianceOpsService.getCases(organizationId);
}

export async function getComplianceCase(id: string, type: 'KYC' | 'KYB') {
  return complianceOpsService.getCase(id, type);
}

export async function reviewComplianceCase(id: string, reviewerId: string, type: 'KYC' | 'KYB', status: string) {
  return complianceOpsService.reviewCase(id, reviewerId, type, status);
}
