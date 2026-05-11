export function getMockOpsWorkflows() {
  return [
    { id: 'wf_1', workflow: 'FX_SETTLEMENT', subjectType: 'QUOTE', subjectId: 'qt_001', state: 'RUNNING', attempts: 1, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'wf_2', workflow: 'ESCROW_RELEASE', subjectType: 'ESCROW', subjectId: 'esc_001', state: 'COMPLETED', attempts: 1, createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: 'wf_3', workflow: 'BDC_INVENTORY_SYNC', subjectType: 'DESK', subjectId: 'desk_1', state: 'FAILED', attempts: 3, createdAt: new Date(Date.now() - 10800000).toISOString() },
    { id: 'wf_4', workflow: 'COMPLIANCE_CHECK', subjectType: 'KYC', subjectId: 'kyc_001', state: 'RUNNING', attempts: 1, createdAt: new Date(Date.now() - 14400000).toISOString() },
    { id: 'wf_5', workflow: 'TRUST_UPDATE', subjectType: 'USER', subjectId: 'usr_001', state: 'PENDING', attempts: 0, createdAt: new Date(Date.now() - 18000000).toISOString() },
  ];
}

export function getMockOpsConversations() {
  return [
    { id: 'conv_1', whatsappPhone: '+2348012345678', status: 'ACTIVE', workflow: 'LEAD_INTAKE', lastMessage: 'Hello, I want to buy $50,000', updatedAt: new Date(Date.now() - 300000).toISOString() },
    { id: 'conv_2', whatsappPhone: '+2348023456789', status: 'ACTIVE', workflow: 'QUOTE_FOLLOWUP', lastMessage: 'Is the rate still 1592?', updatedAt: new Date(Date.now() - 600000).toISOString() },
    { id: 'conv_3', whatsappPhone: '+2348034567890', status: 'PENDING', workflow: 'SETTLEMENT_CONFIRM', lastMessage: 'Please confirm receipt', updatedAt: new Date(Date.now() - 900000).toISOString() },
    { id: 'conv_4', whatsappPhone: '+2348045678901', status: 'CLOSED', workflow: null, lastMessage: 'Thank you for your business', updatedAt: new Date(Date.now() - 1200000).toISOString() },
    { id: 'conv_5', whatsappPhone: '+2348056789012', status: 'ACTIVE', workflow: 'LEAD_INTAKE', lastMessage: 'Do you handle GBP?', updatedAt: new Date(Date.now() - 1500000).toISOString() },
    { id: 'conv_6', whatsappPhone: '+2348067890123', status: 'PENDING', workflow: 'QUOTE_FOLLOWUP', lastMessage: 'I will send the proof shortly', updatedAt: new Date(Date.now() - 1800000).toISOString() },
    { id: 'conv_7', whatsappPhone: '+2348078901234', status: 'ACTIVE', workflow: 'SETTLEMENT_CONFIRM', lastMessage: 'Payment sent via GTBank', updatedAt: new Date(Date.now() - 2100000).toISOString() },
    { id: 'conv_8', whatsappPhone: '+2348089012345', status: 'CLOSED', workflow: null, lastMessage: 'Rate locked at 1594', updatedAt: new Date(Date.now() - 2400000).toISOString() },
    { id: 'conv_9', whatsappPhone: '+2348090123456', status: 'ACTIVE', workflow: 'LEAD_INTAKE', lastMessage: 'What is the minimum amount?', updatedAt: new Date(Date.now() - 2700000).toISOString() },
    { id: 'conv_10', whatsappPhone: '+2348101234567', status: 'PENDING', workflow: 'QUOTE_FOLLOWUP', lastMessage: 'I need EUR, not USD', updatedAt: new Date(Date.now() - 3000000).toISOString() },
  ];
}

export function getMockOpsFailedJobs() {
  return [
    { id: 'job_1', type: 'BDC_SYNC', error: 'Connection timeout to desk API', failedAt: new Date(Date.now() - 3600000).toISOString(), retryCount: 2 },
    { id: 'job_2', type: 'RATE_PUBLISH', error: 'Redis connection lost', failedAt: new Date(Date.now() - 7200000).toISOString(), retryCount: 1 },
    { id: 'job_3', type: 'SETTLEMENT_NOTIFY', error: 'Webhook endpoint 502', failedAt: new Date(Date.now() - 10800000).toISOString(), retryCount: 3 },
  ];
}
