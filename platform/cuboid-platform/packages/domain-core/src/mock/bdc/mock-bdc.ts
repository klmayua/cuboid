export function getMockBdcDesks() {
  return [
    { id: 'desk_1', name: 'Wuse Zone 4 Desk', location: 'ABUJA', status: 'OPEN', staffCount: 4, inventoryCount: 3 },
    { id: 'desk_2', name: 'Allen Avenue Desk', location: 'LAGOS', status: 'OPEN', staffCount: 6, inventoryCount: 5 },
    { id: 'desk_3', name: 'Trans Amadi Desk', location: 'PORT_HARCOURT', status: 'CLOSED', staffCount: 2, inventoryCount: 2 },
    { id: 'desk_4', name: 'Sabon Gari Desk', location: 'KANO', status: 'OPEN', staffCount: 3, inventoryCount: 3 },
  ];
}

export function getMockBdcInventory() {
  return [
    { id: 'inv_1', currency: 'USD', available: 2500000, reserved: 500000, rate: 1592, deskId: 'desk_1' },
    { id: 'inv_2', currency: 'GBP', available: 1200000, reserved: 200000, rate: 2050, deskId: 'desk_1' },
    { id: 'inv_3', currency: 'EUR', available: 1800000, reserved: 300000, rate: 1731, deskId: 'desk_2' },
    { id: 'inv_4', currency: 'USD', available: 3500000, reserved: 700000, rate: 1594, deskId: 'desk_2' },
    { id: 'inv_5', currency: 'NGN', available: 150000000, reserved: 25000000, rate: 1, deskId: 'desk_2' },
    { id: 'inv_6', currency: 'AED', available: 800000, reserved: 100000, rate: 435, deskId: 'desk_4' },
  ];
}

export function getMockBdcSettlements() {
  return [
    { id: 'set_1', amount: '500000', currency: 'USD', status: 'PENDING', deskId: 'desk_1', createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'set_2', amount: '1200000', currency: 'GBP', status: 'PROCESSING', deskId: 'desk_1', createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: 'set_3', amount: '800000', currency: 'EUR', status: 'COMPLETED', deskId: 'desk_2', createdAt: new Date(Date.now() - 14400000).toISOString() },
    { id: 'set_4', amount: '2000000', currency: 'USD', status: 'PENDING', deskId: 'desk_2', createdAt: new Date(Date.now() - 18000000).toISOString() },
    { id: 'set_5', amount: '350000', currency: 'AED', status: 'FAILED', deskId: 'desk_4', createdAt: new Date(Date.now() - 25200000).toISOString() },
  ];
}

export function getMockBdcMetrics() {
  return {
    activeDesks: 3,
    totalInventory: '₦8.2B',
    settlementQueue: 4,
    activeWalkIns: 12,
    publishedRates: 5,
    complianceFlags: 0,
    dailyVolume: '₦450M',
  };
}
