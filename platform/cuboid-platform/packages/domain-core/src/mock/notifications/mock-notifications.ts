export function getMockNotifications() {
  return [
    { id: 'notif_1', userId: 'usr_1', type: 'QUOTE_UPDATE', title: 'Rate Alert', message: 'USD/NGN rate changed to 1594.00', read: false, createdAt: new Date(Date.now() - 300000).toISOString() },
    { id: 'notif_2', userId: 'usr_1', type: 'SETTLEMENT_UPDATE', title: 'Settlement Complete', message: 'Your NGN 5M settlement has been processed', read: false, createdAt: new Date(Date.now() - 900000).toISOString() },
    { id: 'notif_3', userId: 'usr_1', type: 'ESCROW_UPDATE', title: 'Escrow Funded', message: 'Escrow #ESC-002 has been funded', read: true, createdAt: new Date(Date.now() - 1800000).toISOString() },
    { id: 'notif_4', userId: 'usr_1', type: 'TRUST_UPDATE', title: 'Trust Score Improved', message: 'Your trust score increased to 92', read: true, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'notif_5', userId: 'usr_1', type: 'QUOTE_UPDATE', title: 'Market Volatility', message: 'GBP/NGN volatility increased to 1.2%', read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: 'notif_6', userId: 'usr_1', type: 'SETTLEMENT_UPDATE', title: 'Settlement Failed', message: 'EUR settlement failed - retrying', read: false, createdAt: new Date(Date.now() - 10800000).toISOString() },
    { id: 'notif_7', userId: 'usr_1', type: 'ESCROW_UPDATE', title: 'Escrow Released', message: 'Escrow #ESC-003 has been released', read: true, createdAt: new Date(Date.now() - 14400000).toISOString() },
    { id: 'notif_8', userId: 'usr_1', type: 'QUOTE_UPDATE', title: 'New Rate Published', message: 'AED/NGN rate published: 435.00', read: true, createdAt: new Date(Date.now() - 18000000).toISOString() },
  ];
}
