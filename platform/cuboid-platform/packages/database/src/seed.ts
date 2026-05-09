import { PrismaClient, MarketRegion, QuoteSide, QuoteStatus, UserRole, OrgType } from '@prisma/client';

const prisma = new PrismaClient();

const CURRENCIES = ['USD', 'NGN', 'GBP', 'EUR', 'KES', 'GHS', 'ZAR', 'AED'];

const PAIRS = [
  { base: 'USD', quote: 'NGN', symbol: 'USD_NGN' },
  { base: 'GBP', quote: 'NGN', symbol: 'GBP_NGN' },
  { base: 'EUR', quote: 'NGN', symbol: 'EUR_NGN' },
  { base: 'USD', quote: 'KES', symbol: 'USD_KES' },
  { base: 'USD', quote: 'GHS', symbol: 'USD_GHS' },
  { base: 'USD', quote: 'ZAR', symbol: 'USD_ZAR' },
];

async function seed() {
  console.log('Seeding CUBOID database...');

  // Seed currency pairs
  for (const pair of PAIRS) {
    await prisma.currencyPair.upsert({
      where: { symbol: pair.symbol },
      update: {},
      create: {
        baseCurrency: pair.base,
        quoteCurrency: pair.quote,
        symbol: pair.symbol,
        isActive: true,
      },
    });
  }
  console.log(`Seeded ${PAIRS.length} currency pairs.`);

  // Seed a root organization for system operations
  const rootOrg = await prisma.organization.upsert({
    where: { slug: 'cuboid-system' },
    update: {},
    create: {
      name: 'CUBOID System',
      slug: 'cuboid-system',
      type: OrgType.PARTNER,
      country: 'NG',
      city: 'Lagos',
      verificationStatus: 'APPROVED',
    },
  });
  console.log(`Seeded root organization: ${rootOrg.id}`);

  // Seed system rate source
  await prisma.rateSource.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      organizationId: rootOrg.id,
      type: 'PLATFORM',
      label: 'CUBOID Aggregate',
      trustWeight: 1.0,
      active: true,
    },
  });
  console.log('Seeded system rate source.');

  // Seed sample FX rates for Lagos
  const pairs = await prisma.currencyPair.findMany();
  const sampleRates = [
    { buy: 1517.50, sell: 1520.00, spread: 2.50 },
    { buy: 1923.80, sell: 1928.00, spread: 4.20 },
    { buy: 1645.25, sell: 1649.00, spread: 3.75 },
    { buy: 129.45, sell: 129.80, spread: 0.35 },
    { buy: 12.80, sell: 13.10, spread: 0.30 },
    { buy: 18.50, sell: 18.85, spread: 0.35 },
  ];

  for (let i = 0; i < pairs.length; i++) {
    const rate = sampleRates[i] ?? { buy: 1.0, sell: 1.0, spread: 0 };
    await prisma.fxRate.create({
      data: {
        organizationId: rootOrg.id,
        pairId: pairs[i].id,
        region: MarketRegion.LAGOS,
        buyRate: rate.buy,
        sellRate: rate.sell,
        spread: rate.spread,
        sourceId: '00000000-0000-0000-0000-000000000001',
      },
    });
  }
  console.log(`Seeded ${pairs.length} FX rates for Lagos.`);

  console.log('Seed complete.');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
