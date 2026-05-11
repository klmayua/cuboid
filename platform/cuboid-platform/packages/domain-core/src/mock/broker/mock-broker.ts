export function getMockBrokerLeads() {
  return [
    { id: 'lead_1', name: 'Adebayo Johnson', phone: '+2348012345678', email: 'adebayo@example.com', status: 'NEW', source: 'WHATSAPP', createdAt: new Date(Date.now() - 86400000).toISOString(), amount: '2500000', currency: 'USD' },
    { id: 'lead_2', name: 'Chioma Okafor', phone: '+2348023456789', email: 'chioma@example.com', status: 'CONTACTED', source: 'REFERRAL', createdAt: new Date(Date.now() - 172800000).toISOString(), amount: '5000000', currency: 'GBP' },
    { id: 'lead_3', name: 'Emeka Ibrahim', phone: '+2348034567890', email: 'emeka@example.com', status: 'QUALIFIED', source: 'WEBSITE', createdAt: new Date(Date.now() - 259200000).toISOString(), amount: '12000000', currency: 'EUR' },
    { id: 'lead_4', name: 'Fatima Bello', phone: '+2348045678901', email: 'fatima@example.com', status: 'CONVERTED', source: 'WHATSAPP', createdAt: new Date(Date.now() - 345600000).toISOString(), amount: '8000000', currency: 'USD' },
    { id: 'lead_5', name: 'Olumide Adeyemi', phone: '+2348056789012', email: 'olumide@example.com', status: 'NEW', source: 'REFERRAL', createdAt: new Date(Date.now() - 432000000).toISOString(), amount: '3500000', currency: 'AED' },
    { id: 'lead_6', name: 'Ngozi Eze', phone: '+2348067890123', email: 'ngozi@example.com', status: 'CONTACTED', source: 'WEBSITE', createdAt: new Date(Date.now() - 518400000).toISOString(), amount: '6000000', currency: 'USD' },
    { id: 'lead_7', name: 'Tunde Bakare', phone: '+2348078901234', email: 'tunde@example.com', status: 'QUALIFIED', source: 'WHATSAPP', createdAt: new Date(Date.now() - 604800000).toISOString(), amount: '4500000', currency: 'GBP' },
    { id: 'lead_8', name: 'Amina Yusuf', phone: '+2348089012345', email: 'amina@example.com', status: 'CONVERTED', source: 'REFERRAL', createdAt: new Date(Date.now() - 691200000).toISOString(), amount: '15000000', currency: 'EUR' },
    { id: 'lead_9', name: 'Chidi Okonkwo', phone: '+2348090123456', email: 'chidi@example.com', status: 'NEW', source: 'WEBSITE', createdAt: new Date(Date.now() - 777600000).toISOString(), amount: '2800000', currency: 'USD' },
    { id: 'lead_10', name: 'Halima Abdullahi', phone: '+2348101234567', email: 'halima@example.com', status: 'CONTACTED', source: 'WHATSAPP', createdAt: new Date(Date.now() - 864000000).toISOString(), amount: '9000000', currency: 'AED' },
    { id: 'lead_11', name: 'Obi Nnamdi', phone: '+2348112345678', email: 'obi@example.com', status: 'QUALIFIED', source: 'REFERRAL', createdAt: new Date(Date.now() - 950400000).toISOString(), amount: '5500000', currency: 'USD' },
    { id: 'lead_12', name: 'Zainab Mohammed', phone: '+2348123456789', email: 'zainab@example.com', status: 'CONVERTED', source: 'WEBSITE', createdAt: new Date(Date.now() - 1036800000).toISOString(), amount: '11000000', currency: 'GBP' },
  ];
}

export function getMockBrokerDeals() {
  return [
    { id: 'deal_1', clientName: 'Adebayo Johnson', amount: '2500000', currency: 'USD', status: 'ACTIVE', progress: 45, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'deal_2', clientName: 'Chioma Okafor', amount: '5000000', currency: 'GBP', status: 'ESCROWED', progress: 70, createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'deal_3', clientName: 'Emeka Ibrahim', amount: '12000000', currency: 'EUR', status: 'SETTLEMENT_PENDING', progress: 85, createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: 'deal_4', clientName: 'Fatima Bello', amount: '8000000', currency: 'USD', status: 'ACTIVE', progress: 30, createdAt: new Date(Date.now() - 345600000).toISOString() },
    { id: 'deal_5', clientName: 'Olumide Adeyemi', amount: '3500000', currency: 'AED', status: 'ACTIVE', progress: 55, createdAt: new Date(Date.now() - 432000000).toISOString() },
    { id: 'deal_6', clientName: 'Ngozi Eze', amount: '6000000', currency: 'USD', status: 'ESCROWED', progress: 60, createdAt: new Date(Date.now() - 518400000).toISOString() },
    { id: 'deal_7', clientName: 'Tunde Bakare', amount: '4500000', currency: 'GBP', status: 'SETTLEMENT_PENDING', progress: 90, createdAt: new Date(Date.now() - 604800000).toISOString() },
    { id: 'deal_8', clientName: 'Amina Yusuf', amount: '15000000', currency: 'EUR', status: 'ACTIVE', progress: 25, createdAt: new Date(Date.now() - 691200000).toISOString() },
  ];
}

export function getMockBrokerMetrics() {
  return {
    activeDeals: 8,
    accruedCommissions: '₦12,450,000',
    claimableLeads: 12,
    clientCount: 47,
    livePipeline: '₦125,000,000',
    conversionRate: 34,
    avgDealSize: '₦6,250,000',
  };
}
