export function getMockTreasuryCorridors() {
  return [
    { id: 'cor_1', name: 'Lagos → London', sourceRegion: 'LAGOS', targetRegion: 'LONDON', volume: '₦2.5B', spread: 8, pressure: 'NORMAL' },
    { id: 'cor_2', name: 'Abuja → Dubai', sourceRegion: 'ABUJA', targetRegion: 'DUBAI', volume: '₦1.8B', spread: 12, pressure: 'ELEVATED' },
    { id: 'cor_3', name: 'PH → New York', sourceRegion: 'PORT_HARCOURT', targetRegion: 'NEW_YORK', volume: '₦950M', spread: 6, pressure: 'NORMAL' },
    { id: 'cor_4', name: 'Kano → Paris', sourceRegion: 'KANO', targetRegion: 'PARIS', volume: '₦620M', spread: 15, pressure: 'HIGH' },
    { id: 'cor_5', name: 'Lagos → Accra', sourceRegion: 'LAGOS', targetRegion: 'ACCRA', volume: '₦3.1B', spread: 4, pressure: 'LOW' },
  ];
}

export function getMockTreasuryLiquidity() {
  return [
    { currency: 'USD', position: 8500000, available: 7200000, committed: 1300000, health: 'STRONG' },
    { currency: 'GBP', position: 3200000, available: 2800000, committed: 400000, health: 'STRONG' },
    { currency: 'EUR', position: 4100000, available: 3500000, committed: 600000, health: 'ADEQUATE' },
    { currency: 'AED', position: 1800000, available: 1500000, committed: 300000, health: 'ADEQUATE' },
    { currency: 'NGN', position: 450000000, available: 380000000, committed: 70000000, health: 'STRONG' },
  ];
}

export function getMockTreasuryExposure() {
  return {
    totalExposure: '₦12.4B',
    hedged: '₦8.7B',
    unhedged: '₦3.7B',
    dailyVar: '₦124M',
    largestConcentration: 'USD/NGN (68%)',
    stressTest: 'PASS',
  };
}

export function getMockTreasuryMetrics() {
  return {
    activeInterventions: 2,
    spreadCompression: '2.4 bps',
    marketPressure: 'ELEVATED',
    sourceHealth: 94,
    avgSettlementTime: '4.2 min',
  };
}
