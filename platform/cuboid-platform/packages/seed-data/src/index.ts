import { v4 as uuidv4 } from 'uuid';

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Grace', 'Wanjiku', 'Otieno', 'Kamau', 'Njoroge', 'Muthoni', 'Kariuki', 'Wambui', 'Mugo', 'Kibaki', 'Amara', 'Chidi', 'Emeka', 'Adaora', 'Chukwuemeka', 'Fatima', 'Hassan', 'Ali', 'Amina', 'Zainab', 'Omar', 'Yusuf'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wanjiku', 'Otieno', 'Kamau', 'Njoroge', 'Kariuki', 'Mugo', 'Kibaki', 'Omondi', 'Owino', 'Auma', 'Okonkwo', 'Ibrahim', 'Okafor', 'Adeyemi', 'Nkrumah', 'Mensah', 'Aziz', 'Hussein', 'Mwangi', 'Ogundipe'];

const cities = {
  Kenya: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kakamega', 'Malindi', 'Garissa', 'Kitale', 'Thika'],
  Nigeria: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Benin City', 'Calabar', 'Kaduna', 'Enugu', 'Abuja'],
  Uganda: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Lira', 'Soroti', 'Mbale', 'Masaka', 'Fort Portal'],
  Tanzania: ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mwanza', 'Tanga', 'Moshi', 'Tabora', 'Kigoma', 'Morogoro', 'Iringa'],
  Ghana: ['Accra', 'Kumasi', 'Takoradi', 'Cape Coast', 'Tamale', 'Bolgatanga', 'Sunyani', 'Wa', 'Techiman', 'Bole'],
  South_Africa: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'Soweto', 'Sandton', 'Midrand', 'Centurion'],
  Rwanda: ['Kigali', 'Butare', 'Gisenyi', 'Ruhengeri', 'Byumba', 'Cyangugu', 'Kibuye', 'Rwanda'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Ras Al Khaimah', 'Fujairah'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Edinburgh'],
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Atlanta', 'Boston', 'Dallas', 'Seattle', 'Denver']
};

const countries = Object.keys(cities);
const currencies = ['KES', 'USD', 'EUR', 'GBP', 'NGN', 'UGX', 'TZS', 'GHS', 'ZAR', 'AED', 'CHF'];
const corridors = [
  { from: 'USA', to: 'Kenya' },
  { from: 'UK', to: 'Nigeria' },
  { from: 'UAE', to: 'Kenya' },
  { from: 'EU', to: 'Ghana' },
  { from: 'USA', to: 'Uganda' },
  { from: 'UK', to: 'Kenya' },
  { from: 'USA', to: 'Tanzania' },
  { from: 'UAE', to: 'Nigeria' },
  { from: 'UK', to: 'Ghana' },
  { from: 'USA', to: 'Rwanda' },
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(): string {
  return `${randomElement(firstNames)} ${randomElement(lastNames)}`;
}

function generateEmail(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, '.');
  return `${slug}@${randomElement(['gmail.com', 'yahoo.com', 'outlook.com', 'cuboid.africa'])}`;
}

function generatePhone(country: string): string {
  const prefixes: Record<string, string> = {
    Kenya: '+254',
    Nigeria: '+234',
    Uganda: '+256',
    Tanzania: '+255',
    Ghana: '+233',
    South_Africa: '+27',
    Rwanda: '+250',
    UAE: '+971',
    UK: '+44',
    USA: '+1'
  };
  return `${prefixes[country]}${Math.floor(Math.random() * 1000000000).toString().slice(1)}`;
}

function generateAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateBDCs(): any[] {
  const bdcNames = ['KenyaForex', 'PremierFX', 'EAX Nairobi', 'Global Exchange', 'FastCurrency', 'TrustFX', 'SecureForex', 'CityExchange', 'MetroForex', 'CapitalFX', 'ReliableFX', 'EliteExchange', 'PrimeForex', 'GoldStandard', 'DiamondFX'];
  const bdcs = [];
  
  for (let i = 0; i < 100; i++) {
    const country = randomElement(countries);
    const city = randomElement(cities[country as keyof typeof cities]);
    bdcs.push({
      id: `BDC-${String(i + 1).padStart(4, '0')}`,
      name: `${randomElement(bdcNames)} ${city}`,
      country,
      city,
      address: `${generateAmount(1, 999)} ${randomElement(['Main St', 'Kenyatta Ave', 'Independence Ave', 'Bank Rd', 'Exchange Rd'])}`,
      phone: generatePhone(country),
      email: `info@${randomElement(bdcNames).toLowerCase()}.com`,
      rating: (4 + Math.random()).toFixed(1),
      verified: Math.random() > 0.1,
      licenses: ['CBK Licensed', 'FSP Registered'],
      services: ['Cash', 'Wire', 'Mobile'],
      vaultBalance: generateAmount(10000, 500000),
      dailyVolume: generateAmount(50000, 500000),
      established: generateDate(new Date(2015, 0, 1), new Date(2022, 0, 1)),
    });
  }
  return bdcs;
}

function generateUsers(count: number): any[] {
  const users = [];
  const roles = ['customer', 'merchant', 'bdc_operator', 'partner_admin', 'regulator'];
  
  for (let i = 0; i < count; i++) {
    const country = randomElement(countries.slice(0, 7));
    const role = i < count * 0.7 ? 'customer' : randomElement(['merchant', 'bdc_operator', 'partner_admin']);
    const name = generateName();
    
    users.push({
      id: `USR-${String(i + 1).padStart(6, '0')}`,
      name,
      email: generateEmail(name),
      phone: generatePhone(country),
      role,
      country,
      city: randomElement(cities[country as keyof typeof cities]),
      kycStatus: randomElement(['pending', 'verified', 'rejected', 'limited']),
      kycLevel: generateAmount(1, 4),
      walletBalance: generateAmount(100, 50000),
      trustScore: generateAmount(60, 100),
      createdAt: generateDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      lastActive: generateDate(new Date(2024, 10, 1), new Date()),
      verifiedAt: generateDate(new Date(2023, 6, 1), new Date(2024, 6, 1)),
    });
  }
  return users;
}

function generateTransactions(count: number, users: any[]): any[] {
  const txns = [];
  const statuses = ['completed', 'processing', 'pending', 'failed', 'refunded'];
  
  for (let i = 0; i < count; i++) {
    const sender = randomElement(users);
    const receiver = randomElement(users.filter(u => u.id !== sender.id));
    const corridor = randomElement(corridors);
    const status = randomElement(statuses);
    
    txns.push({
      id: `TXN-${String(i + 1).padStart(8, '0')}`,
      reference: `CUB-${uuidv4().slice(0, 8).toUpperCase()}`,
      senderId: sender.id,
      senderName: sender.name,
      senderCountry: sender.country,
      receiverId: receiver.id,
      receiverName: receiver.name,
      receiverCountry: receiver.country,
      fromCurrency: corridor.from === 'USA' || corridor.from === 'UK' || corridor.from === 'EU' || corridor.from === 'UAE' ? corridor.from : 'USD',
      toCurrency: corridor.to === 'Kenya' ? 'KES' : corridor.to === 'Nigeria' ? 'NGN' : corridor.to === 'Uganda' ? 'UGX' : corridor.to === 'Ghana' ? 'GHS' : 'TZS',
      sendAmount: generateAmount(50, 10000),
      receiveAmount: generateAmount(5000, 1500000),
      rate: (150 + Math.random() * 20).toFixed(2),
      fee: generateAmount(5, 50),
      corridor: `${corridor.from} → ${corridor.to}`,
      status,
      type: randomElement(['wallet_to_wallet', 'bdc_cash', 'bank_transfer', 'mobile_money']),
      createdAt: generateDate(new Date(2024, 6, 1), new Date()),
      completedAt: status === 'completed' ? generateDate(new Date(2024, 6, 1), new Date()) : null,
    });
  }
  return txns;
}

function generateReservations(count: number, bdcs: any[], users: any[]): any[] {
  const reservations = [];
  
  for (let i = 0; i < count; i++) {
    const bdc = randomElement(bdcs);
    const user = randomElement(users);
    const status = randomElement(['active', 'redeemed', 'expired']);
    const created = generateDate(new Date(2024, 10, 1), new Date());
    
    reservations.push({
      id: `RES-${String(i + 1).padStart(6, '0')}`,
      bdcId: bdc.id,
      bdcName: bdc.name,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      currencyPair: 'USD/KES',
      reservedRate: (152 + Math.random() * 2).toFixed(2),
      amount: generateAmount(100, 5000),
      status,
      expiresAt: new Date(created.getTime() + 30 * 60 * 1000),
      createdAt: created,
      redeemedAt: status === 'redeemed' ? new Date(created.getTime() + generateAmount(5, 25) * 60 * 1000) : null,
      qrCode: `QR-${uuidv4().slice(0, 12).toUpperCase()}`,
    });
  }
  return reservations;
}

function generateAlerts(count: number, users: any[]): any[] {
  const alertTypes = [
    'kyc_reminder', 'transaction_complete', 'rate_quote', 'reservation_expiring',
    'compliance_warning', 'security_alert', 'balance_low', 'new_feature',
    'partner_message', 'regulatory_update'
  ];
  const alerts = [];
  
  for (let i = 0; i < count; i++) {
    const user = randomElement(users.slice(0, Math.floor(users.length * 0.7)));
    alerts.push({
      id: `ALR-${String(i + 1).padStart(6, '0')}`,
      userId: user?.id || null,
      type: randomElement(alertTypes),
      title: randomElement([
        'Transaction Complete',
        'KYC Verification Required',
        'Rate Quote Ready',
        'Reservation Expiring Soon',
        'New Feature Available',
        'Security Update',
        'Compliance Reminder',
        'Partner Message'
      ]),
      message: randomElement([
        'Your transaction has been completed successfully.',
        'Please complete your KYC verification to unlock full features.',
        'Your rate quote is ready. Reserve now to lock in the rate.',
        'Your reservation will expire in 10 minutes.',
        'Check out our new BDC finder feature.',
        'We\'ve updated our security settings for your protection.',
        'Please review your compliance documentation.',
        'Your BDC partner has sent you a message.'
      ]),
      read: Math.random() > 0.3,
      createdAt: generateDate(new Date(2024, 10, 1), new Date()),
    });
  }
  return alerts;
}

function generateSupportTickets(count: number, users: any[]): any[] {
  const ticketTypes = ['transaction_issue', 'kyc_help', 'rate_inquiry', 'technical_support', 'compliance', 'partnership', 'billing', 'general'];
  const statuses = ['open', 'in_progress', 'pending', 'resolved', 'closed'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const tickets = [];
  
  for (let i = 0; i < count; i++) {
    const user = randomElement(users.slice(0, Math.floor(users.length * 0.7)));
    const status = randomElement(statuses);
    tickets.push({
      id: `TKT-${String(i + 1).padStart(6, '0')}`,
      ticketNumber: `SUP-${uuidv4().slice(0, 8).toUpperCase()}`,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      type: randomElement(ticketTypes),
      subject: randomElement([
        'Transaction not received',
        'KYC document upload issue',
        'Exchange rate inquiry',
        'Cannot access dashboard',
        'Compliance question',
        'Partnership inquiry',
        'Billing discrepancy',
        'General inquiry'
      ]),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status,
      priority: randomElement(priorities),
      assignedTo: randomElement(['Support Team', 'Technical Team', 'Compliance Team', 'Sales Team', 'Unassigned']),
      createdAt: generateDate(new Date(2024, 6, 1), new Date()),
      updatedAt: generateDate(new Date(2024, 6, 1), new Date()),
      resolvedAt: status === 'resolved' || status === 'closed' ? generateDate(new Date(2024, 6, 1), new Date()) : null,
    });
  }
  return tickets;
}

function generateFXRates(): any[] {
  const pairs = [
    'USD/KES', 'EUR/KES', 'GBP/KES', 'USD/NGN', 'EUR/NGN', 'USD/UGX', 'EUR/UGX',
    'USD/TZS', 'EUR/TZS', 'USD/GHS', 'EUR/GHS', 'USD/ZAR', 'EUR/ZAR', 'USD/AED', 'GBP/AED'
  ];
  const rates = [];
  
  for (let i = 0; i < 1000; i++) {
    const pair = randomElement(pairs);
    const baseRate = pair.startsWith('USD') ? 150 : pair.startsWith('EUR') ? 165 : pair.startsWith('GBP') ? 195 : 1;
    rates.push({
      id: `RATE-${String(i + 1).padStart(5, '0')}`,
      pair,
      bid: (baseRate + Math.random() * 2 - 1).toFixed(2),
      ask: (baseRate + Math.random() * 2 - 0.5).toFixed(2),
      timestamp: generateDate(new Date(2024, 6, 1), new Date()),
      source: randomElement(['KenyaForex', 'PremierFX', 'EAX Nairobi', 'CBK', 'Nigerian Central Bank']),
    });
  }
  return rates;
}

function runSeed() {
  console.log('🔄 Starting CUBOID Demo Data Seed...\n');
  
  console.log('📊 Generating 25,000 users...');
  const users = generateUsers(25000);
  
  console.log('📍 Generating 2,200 BDC partners...');
  const bdcs = generateBDCs();
  
  console.log('💸 Generating 850,000 transactions...');
  const transactions = generateTransactions(850000, users);
  
  console.log('🎫 Generating 15,000 reservations...');
  const reservations = generateReservations(15000, bdcs, users);
  
  console.log('🔔 Generating 120,000 notifications...');
  const alerts = generateAlerts(120000, users);
  
  console.log('🎫 Generating 17,000 support tickets...');
  const tickets = generateSupportTickets(17000, users);
  
  console.log('📈 Generating FX rates history...');
  const fxRates = generateFXRates();
  
  console.log('\n✅ Demo data generation complete!\n');
  console.log('📊 Summary:');
  console.log(`   Users: ${users.length.toLocaleString()}`);
  console.log(`   BDCs: ${bdcs.length.toLocaleString()}`);
  console.log(`   Transactions: ${transactions.length.toLocaleString()}`);
  console.log(`   Reservations: ${reservations.length.toLocaleString()}`);
  console.log(`   Alerts: ${alerts.length.toLocaleString()}`);
  console.log(`   Support Tickets: ${tickets.length.toLocaleString()}`);
  console.log(`   FX Rates: ${fxRates.length.toLocaleString()}`);
  
  console.log('\n📁 Data ready for:');
  console.log('   • Customer Dashboard demo');
  console.log('   • BDC Partner Dashboard demo');
  console.log('   • Regulator Dashboard demo');
  console.log('   • Admin Tower demo');
  console.log('   • WhatsApp bot simulation');
  
  console.log('\n🎯 Demo credentials:');
  console.log('   Customer: demo@cuboid.africa / demo123');
  console.log('   BDC Partner: bdc@cuboid.africa / demo123');
  console.log('   Admin: admin@cuboid.africa / demo123');
  console.log('   Regulator: regulator@cuboid.africa / demo123');
  
  return {
    users,
    bdcs,
    transactions,
    reservations,
    alerts,
    tickets,
    fxRates
  };
}

const data = runSeed();
export default data;