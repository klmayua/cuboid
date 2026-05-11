export function getMockTrustScores() {
  return [
    { userId: 'usr_1', score: 92, level: 'PLATINUM', signals: 45, lastUpdated: new Date(Date.now() - 86400000).toISOString() },
    { userId: 'usr_2', score: 87, level: 'GOLD', signals: 38, lastUpdated: new Date(Date.now() - 172800000).toISOString() },
    { userId: 'usr_3', score: 74, level: 'SILVER', signals: 28, lastUpdated: new Date(Date.now() - 259200000).toISOString() },
    { userId: 'usr_4', score: 63, level: 'BRONZE', signals: 19, lastUpdated: new Date(Date.now() - 345600000).toISOString() },
    { userId: 'usr_5', score: 45, level: 'NEW', signals: 8, lastUpdated: new Date(Date.now() - 432000000).toISOString() },
  ];
}
