export function getMockEscrows() {
  return [
    { id: 'esc_1', organizationId: 'org_1', quoteMatchId: 'qm_1', amount: '1200000', currency: 'NGN', status: 'LOCKED', condition: 'DOCUMENT_VERIFICATION', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'esc_2', organizationId: 'org_1', quoteMatchId: 'qm_2', amount: '500000', currency: 'USD', status: 'FUNDED', condition: 'DELIVERY_CONFIRMATION', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'esc_3', organizationId: 'org_2', quoteMatchId: 'qm_3', amount: '800000', currency: 'GBP', status: 'RELEASED', condition: 'SERVICE_COMPLETION', createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: 'esc_4', organizationId: 'org_2', quoteMatchId: 'qm_4', amount: '2500000', currency: 'NGN', status: 'DISPUTED', condition: 'DOCUMENT_VERIFICATION', createdAt: new Date(Date.now() - 345600000).toISOString() },
  ];
}
