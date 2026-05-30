export function getMockBrokerLeads() {
  return [
    { id: 'lead_1', customerName: 'Adebayo Johnson', corridor: 'USD/NGN', amount: 2500000, currency: 'NGN', status: 'NEW', urgency: 'HIGH', trustFlag: false, phone: '+2348012345678', email: 'adebayo@example.com', source: 'WHATSAPP', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'lead_2', customerName: 'Chioma Okafor', corridor: 'GBP/NGN', amount: 5000000, currency: 'NGN', status: 'CONTACTED', urgency: 'MEDIUM', trustFlag: true, phone: '+2348023456789', email: 'chioma@example.com', source: 'REFERRAL', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'lead_3', customerName: 'Emeka Ibrahim', corridor: 'EUR/NGN', amount: 12000000, currency: 'NGN', status: 'QUALIFIED', urgency: 'CRITICAL', trustFlag: false, phone: '+2348034567890', email: 'emeka@example.com', source: 'WEBSITE', createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: 'lead_4', customerName: 'Fatima Bello', corridor: 'USD/NGN', amount: 8000000, currency: 'NGN', status: 'CONVERTED', urgency: 'MEDIUM', trustFlag: true, phone: '+2348045678901', email: 'fatima@example.com', source: 'WHATSAPP', createdAt: new Date(Date.now() - 345600000).toISOString() },
    { id: 'lead_5', customerName: 'Olumide Adeyemi', corridor: 'AED/NGN', amount: 3500000, currency: 'NGN', status: 'NEW', urgency: 'LOW', trustFlag: false, phone: '+2348056789012', email: 'olumide@example.com', source: 'REFERRAL', createdAt: new Date(Date.now() - 432000000).toISOString() },
    { id: 'lead_6', customerName: 'Ngozi Eze', corridor: 'USD/NGN', amount: 6000000, currency: 'NGN', status: 'CONTACTED', urgency: 'HIGH', trustFlag: true, phone: '+2348067890123', email: 'ngozi@example.com', source: 'WEBSITE', createdAt: new Date(Date.now() - 518400000).toISOString() },
    { id: 'lead_7', customerName: 'Tunde Bakare', corridor: 'GBP/NGN', amount: 4500000, currency: 'NGN', status: 'QUALIFIED', urgency: 'MEDIUM', trustFlag: false, phone: '+2348078901234', email: 'tunde@example.com', source: 'WHATSAPP', createdAt: new Date(Date.now() - 604800000).toISOString() },
    { id: 'lead_8', customerName: 'Amina Yusuf', corridor: 'EUR/NGN', amount: 15000000, currency: 'NGN', status: 'CONVERTED', urgency: 'CRITICAL', trustFlag: true, phone: '+2348089012345', email: 'amina@example.com', source: 'REFERRAL', createdAt: new Date(Date.now() - 691200000).toISOString() },
    { id: 'lead_9', customerName: 'Chidi Okonkwo', corridor: 'USD/NGN', amount: 2800000, currency: 'NGN', status: 'NEW', urgency: 'LOW', trustFlag: false, phone: '+2348090123456', email: 'chidi@example.com', source: 'WEBSITE', createdAt: new Date(Date.now() - 777600000).toISOString() },
    { id: 'lead_10', customerName: 'Halima Abdullahi', corridor: 'AED/NGN', amount: 9000000, currency: 'NGN', status: 'CONTACTED', urgency: 'HIGH', trustFlag: true, phone: '+2348101234567', email: 'halima@example.com', source: 'WHATSAPP', createdAt: new Date(Date.now() - 864000000).toISOString() },
    { id: 'lead_11', customerName: 'Obi Nnamdi', corridor: 'USD/NGN', amount: 5500000, currency: 'NGN', status: 'QUALIFIED', urgency: 'MEDIUM', trustFlag: false, phone: '+2348112345678', email: 'obi@example.com', source: 'REFERRAL', createdAt: new Date(Date.now() - 950400000).toISOString() },
    { id: 'lead_12', customerName: 'Zainab Mohammed', corridor: 'GBP/NGN', amount: 11000000, currency: 'NGN', status: 'CONVERTED', urgency: 'CRITICAL', trustFlag: true, phone: '+2348123456789', email: 'zainab@example.com', source: 'WEBSITE', createdAt: new Date(Date.now() - 1036800000).toISOString() },
  ];
}

export function getMockBrokerDeals() {
  return [
    { id: 'deal_1', clientName: 'Adebayo Johnson', amount: 2500000, currency: 'NGN', corridor: 'USD/NGN', status: 'ACTIVE', progress: 45, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'deal_2', clientName: 'Chioma Okafor', amount: 5000000, currency: 'NGN', corridor: 'GBP/NGN', status: 'ESCROWED', progress: 70, createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'deal_3', clientName: 'Emeka Ibrahim', amount: 12000000, currency: 'NGN', corridor: 'EUR/NGN', status: 'SETTLEMENT_PENDING', progress: 85, createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: 'deal_4', clientName: 'Fatima Bello', amount: 8000000, currency: 'NGN', corridor: 'USD/NGN', status: 'ACTIVE', progress: 30, createdAt: new Date(Date.now() - 345600000).toISOString() },
    { id: 'deal_5', clientName: 'Olumide Adeyemi', amount: 3500000, currency: 'NGN', corridor: 'AED/NGN', status: 'ACTIVE', progress: 55, createdAt: new Date(Date.now() - 432000000).toISOString() },
    { id: 'deal_6', clientName: 'Ngozi Eze', amount: 6000000, currency: 'NGN', corridor: 'USD/NGN', status: 'ESCROWED', progress: 60, createdAt: new Date(Date.now() - 518400000).toISOString() },
    { id: 'deal_7', clientName: 'Tunde Bakare', amount: 4500000, currency: 'NGN', corridor: 'GBP/NGN', status: 'SETTLEMENT_PENDING', progress: 90, createdAt: new Date(Date.now() - 604800000).toISOString() },
    { id: 'deal_8', clientName: 'Amina Yusuf', amount: 15000000, currency: 'NGN', corridor: 'EUR/NGN', status: 'ACTIVE', progress: 25, createdAt: new Date(Date.now() - 691200000).toISOString() },
  ];
}

export function getMockBrokerMetrics() {
  return {
    profile: { specialty: 'Cross-border FX', commissionRate: 0.85, active: true },
    active: true,
    leads: { total: 47, claimable: 12 },
    deals: { total: 23, active: 8 },
    commissions: { total: 12450000, count: 17 },
    clients: { total: 47 },
  };
}
