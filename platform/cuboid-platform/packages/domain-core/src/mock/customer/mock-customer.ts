export function getMockCustomerWallets() {
  return [
    { id: 'wal_1', currency: 'NGN', balance: 45000000, availableBalance: 42000000, reservedBalance: 3000000, type: 'Operational' },
    { id: 'wal_2', currency: 'USD', balance: 850000, availableBalance: 720000, reservedBalance: 130000, type: 'Trading' },
    { id: 'wal_3', currency: 'GBP', balance: 320000, availableBalance: 280000, reservedBalance: 40000, type: 'Trading' },
    { id: 'wal_4', currency: 'EUR', balance: 410000, availableBalance: 350000, reservedBalance: 60000, type: 'Trading' },
    { id: 'wal_5', currency: 'AED', balance: 180000, availableBalance: 150000, reservedBalance: 30000, type: 'Trading' },
  ];
}

export function getMockCustomerTransactions() {
  return [
    { id: 'txn_1', type: 'DEPOSIT', amount: 5000000, currency: 'NGN', status: 'COMPLETED', description: 'Bank Transfer - GTBank', createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'txn_2', type: 'WITHDRAWAL', amount: 250000, currency: 'USD', status: 'COMPLETED', description: 'FX Conversion to NGN', createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: 'txn_3', type: 'TRANSFER', amount: 1200000, currency: 'NGN', status: 'PENDING', description: 'Transfer to Escrow #ESC-001', createdAt: new Date(Date.now() - 10800000).toISOString() },
    { id: 'txn_4', type: 'DEPOSIT', amount: 800000, currency: 'GBP', status: 'COMPLETED', description: 'Inbound Wire - Barclays', createdAt: new Date(Date.now() - 14400000).toISOString() },
    { id: 'txn_5', type: 'WITHDRAWAL', amount: 450000, currency: 'EUR', status: 'PROCESSING', description: 'FX Conversion to USD', createdAt: new Date(Date.now() - 18000000).toISOString() },
    { id: 'txn_6', type: 'TRANSFER', amount: 2000000, currency: 'NGN', status: 'COMPLETED', description: 'P2P Transfer to Chioma O.', createdAt: new Date(Date.now() - 21600000).toISOString() },
    { id: 'txn_7', type: 'DEPOSIT', amount: 350000, currency: 'AED', status: 'COMPLETED', description: 'Emirates NBD Deposit', createdAt: new Date(Date.now() - 25200000).toISOString() },
    { id: 'txn_8', type: 'WITHDRAWAL', amount: 1500000, currency: 'NGN', status: 'FAILED', description: 'Insufficient Liquidity', createdAt: new Date(Date.now() - 28800000).toISOString() },
    { id: 'txn_9', type: 'TRANSFER', amount: 600000, currency: 'USD', status: 'COMPLETED', description: 'Escrow Release #ESC-002', createdAt: new Date(Date.now() - 32400000).toISOString() },
    { id: 'txn_10', type: 'DEPOSIT', amount: 2500000, currency: 'NGN', status: 'COMPLETED', description: 'Cash Deposit - Allen Branch', createdAt: new Date(Date.now() - 36000000).toISOString() },
    { id: 'txn_11', type: 'WITHDRAWAL', amount: 180000, currency: 'GBP', status: 'PENDING', description: 'FX Conversion to NGN', createdAt: new Date(Date.now() - 39600000).toISOString() },
    { id: 'txn_12', type: 'TRANSFER', amount: 900000, currency: 'EUR', status: 'COMPLETED', description: 'Settlement to BDC Desk #2', createdAt: new Date(Date.now() - 43200000).toISOString() },
    { id: 'txn_13', type: 'DEPOSIT', amount: 750000, currency: 'USD', status: 'PROCESSING', description: 'Chase Bank Wire', createdAt: new Date(Date.now() - 46800000).toISOString() },
    { id: 'txn_14', type: 'WITHDRAWAL', amount: 3200000, currency: 'NGN', status: 'COMPLETED', description: 'Bank Transfer to First Bank', createdAt: new Date(Date.now() - 50400000).toISOString() },
    { id: 'txn_15', type: 'TRANSFER', amount: 420000, currency: 'AED', status: 'COMPLETED', description: 'Transfer to Dubai Corridor', createdAt: new Date(Date.now() - 54000000).toISOString() },
  ];
}

export function getMockCustomerBeneficiaries() {
  return [
    { id: 'ben_1', name: 'Chioma Okafor', accountNumber: '0123456789', bank: 'GTBank', country: 'NG', currency: 'NGN' },
    { id: 'ben_2', name: 'Emeka Ibrahim', accountNumber: '9876543210', bank: 'First Bank', country: 'NG', currency: 'NGN' },
    { id: 'ben_3', name: 'Amina Yusuf', accountNumber: 'GB29NWBK60161331926819', bank: 'Barclays', country: 'GB', currency: 'GBP' },
    { id: 'ben_4', name: 'Tunde Bakare', accountNumber: 'DE89370400440532013000', bank: 'Deutsche Bank', country: 'DE', currency: 'EUR' },
    { id: 'ben_5', name: 'Olumide Adeyemi', accountNumber: 'AE070331234567890123456', bank: 'Emirates NBD', country: 'AE', currency: 'AED' },
  ];
}

export function getMockCustomerEscrows() {
  return [
    { id: 'esc_1', amount: '1200000', currency: 'NGN', status: 'LOCKED', description: 'Property Purchase - Lekki', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'esc_2', amount: '500000', currency: 'USD', status: 'FUNDED', description: 'Equipment Import', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: 'esc_3', amount: '800000', currency: 'GBP', status: 'RELEASED', description: 'Consulting Agreement', createdAt: new Date(Date.now() - 259200000).toISOString() },
  ];
}

export function getMockCustomerTrustScore() {
  return {
    score: 87,
    level: 'HIGH',
    factors: [
      { name: 'Transaction History', weight: 0.3, score: 92 },
      { name: 'Volume Consistency', weight: 0.25, score: 85 },
      { name: 'Settlement Punctuality', weight: 0.25, score: 88 },
      { name: 'KYC Completeness', weight: 0.2, score: 95 },
    ],
  };
}
