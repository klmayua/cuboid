import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'bdc-service' });

export interface BDC {
  id: string;
  businessName: string;
  tradingName: string;
  verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'SUSPENDED';
  city: string;
  address: string;
  lat: number;
  lng: number;
  openingHours: { day: string; open: string; close: string; closed?: boolean }[];
  supportedCurrencies: string[];
  buyRates: Record<string, string>;
  sellRates: Record<string, string>;
  liquidityAvailable: boolean;
  queueEstimate: number;
  waitTimeMinutes: number;
  accessibility: 'FULL' | 'PARTIAL' | 'NONE';
  travelerFriendly: boolean;
  trustScore: number;
  rating: number;
  reviewCount: number;
  contactPhone: string;
  contactEmail: string;
  photoUrl?: string;
  services: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BDCRate {
  bdcId: string;
  currency: string;
  buyRate: string;
  sellRate: string;
  updatedAt: string;
  expiresAt: string;
}

export interface RateReservation {
  id: string;
  bdcId: string;
  currency: string;
  amount: string;
  rate: string;
  side: 'BUY' | 'SELL';
  expiresAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'EXPIRED' | 'REDEEMED' | 'CANCELLED';
  qrCode?: string;
  redemptionCode?: string;
  createdAt: string;
}

export interface BDCSearchFilter {
  city?: string;
  currency?: string;
  minTrustScore?: number;
  maxQueue?: number;
  travelerFriendly?: boolean;
  verifiedOnly?: boolean;
}

const NAIROBI_BDCS: BDC[] = [
  {
    id: 'bdc_001', businessName: 'Kenya Foreign Exchange Bureau', tradingName: 'KenyaForex', verificationStatus: 'VERIFIED',
    city: 'Nairobi', address: 'Kenyatta Avenue, CBD', lat: -1.2921, lng: 36.8219,
    openingHours: [{ day: 'Mon-Fri', open: '08:00', close: '18:00' }, { day: 'Sat', open: '09:00', close: '15:00' }],
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES', 'UGX', 'TZS', 'GHS', 'ZAR'],
    buyRates: { USD: '152.50', EUR: '165.80', GBP: '194.20', KES: '1.00' },
    sellRates: { USD: '153.50', EUR: '166.80', GBP: '195.50', KES: '1.00' },
    liquidityAvailable: true, queueEstimate: 3, waitTimeMinutes: 8,
    accessibility: 'FULL', travelerFriendly: true, trustScore: 95, rating: 4.8, reviewCount: 342,
    contactPhone: '+254720000001', contactEmail: 'info@kenyaforex.co.ke', services: ['Cash', 'Wire Transfer', 'Mobile Money'],
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'bdc_002', businessName: 'Premier Currency Services', tradingName: 'PremierFX', verificationStatus: 'VERIFIED',
    city: 'Nairobi', address: 'Westlands, Sarit Centre', lat: -1.2136, lng: 36.8070,
    openingHours: [{ day: 'Mon-Sat', open: '07:00', close: '20:00' }, { day: 'Sun', open: '10:00', close: '16:00' }],
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES', 'AED', 'CHF'],
    buyRates: { USD: '152.80', EUR: '166.10', GBP: '194.50', KES: '1.00' },
    sellRates: { USD: '154.00', EUR: '167.20', GBP: '195.80', KES: '1.00' },
    liquidityAvailable: true, queueEstimate: 1, waitTimeMinutes: 3,
    accessibility: 'FULL', travelerFriendly: true, trustScore: 98, rating: 4.9, reviewCount: 567,
    contactPhone: '+254720000002', contactEmail: 'trading@premierfx.co.ke', photoUrl: '/bdc/premier.jpg',
    services: ['Cash', 'Wire Transfer', 'Travelers Cheque', 'Currency Exchange App'],
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'bdc_003', businessName: 'East African Exchange', tradingName: 'EAX Nairobi', verificationStatus: 'VERIFIED',
    city: 'Nairobi', address: 'Airport Road, Embakasi', lat: -1.3192, lng: 36.9278,
    openingHours: [{ day: 'Daily', open: '06:00', close: '22:00' }],
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES', 'UGX', 'TZS', 'RWF', 'ETB'],
    buyRates: { USD: '152.00', EUR: '165.50', GBP: '193.80', KES: '1.00' },
    sellRates: { USD: '153.20', EUR: '166.50', GBP: '195.00', KES: '1.00' },
    liquidityAvailable: true, queueEstimate: 5, waitTimeMinutes: 15,
    accessibility: 'FULL', travelerFriendly: true, trustScore: 92, rating: 4.5, reviewCount: 289,
    contactPhone: '+254720000003', contactEmail: 'ops@eafx.co.ke',
    services: ['Cash', 'Airtime', 'Remittance', 'Government Securities'],
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'bdc_004', businessName: 'Savannah Bureau de Change', tradingName: 'Savannah FX', verificationStatus: 'VERIFIED',
    city: 'Nairobi', address: 'Mombasa Road, Galleria Mall', lat: -1.3873, lng: 36.9484,
    openingHours: [{ day: 'Mon-Sat', open: '09:00', close: '21:00' }],
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES', 'ZAR'],
    buyRates: { USD: '151.80', EUR: '165.00', GBP: '193.00', KES: '1.00' },
    sellRates: { USD: '153.80', EUR: '166.80', GBP: '195.20', KES: '1.00' },
    liquidityAvailable: true, queueEstimate: 2, waitTimeMinutes: 6,
    accessibility: 'FULL', travelerFriendly: true, trustScore: 90, rating: 4.6, reviewCount: 178,
    contactPhone: '+254720000004', contactEmail: 'info@savannahfx.co.ke',
    services: ['Cash', 'Mobile Money', 'Bill Payments'],
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'bdc_005', businessName: 'Central Forex Bureau', tradingName: 'Central Forex', verificationStatus: 'PENDING',
    city: 'Nairobi', address: 'City Hall Way', lat: -1.2918, lng: 36.8234,
    openingHours: [{ day: 'Mon-Fri', open: '08:30', close: '17:30' }],
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES'],
    buyRates: { USD: '152.00', EUR: '165.20', GBP: '193.50', KES: '1.00' },
    sellRates: { USD: '153.50', EUR: '166.50', GBP: '195.00', KES: '1.00' },
    liquidityAvailable: true, queueEstimate: 4, waitTimeMinutes: 10,
    accessibility: 'PARTIAL', travelerFriendly: false, trustScore: 75, rating: 4.2, reviewCount: 89,
    contactPhone: '+254720000005', contactEmail: 'central@email.co.ke',
    services: ['Cash'],
    createdAt: '2024-01-10T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z'
  },
];

const MOMBSA_BDCS: BDC[] = [
  {
    id: 'bdc_101', businessName: 'Coast Currency Exchange', tradingName: 'CoastFX', verificationStatus: 'VERIFIED',
    city: 'Mombasa', address: 'Mombasa CBD, Nkrumah Road', lat: -4.0435, lng: 39.6686,
    openingHours: [{ day: 'Mon-Sat', open: '08:00', close: '18:00' }],
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES', 'TZS', 'AED'],
    buyRates: { USD: '151.20', EUR: '164.50', GBP: '192.50', KES: '1.00' },
    sellRates: { USD: '152.50', EUR: '165.80', GBP: '194.00', KES: '1.00' },
    liquidityAvailable: true, queueEstimate: 2, waitTimeMinutes: 5,
    accessibility: 'FULL', travelerFriendly: true, trustScore: 93, rating: 4.7, reviewCount: 234,
    contactPhone: '+254720100001', contactEmail: 'info@coastfx.co.ke',
    services: ['Cash', 'Wire Transfer', 'Hotel Exchange'],
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'bdc_102', businessName: 'Mombasa Foreign Exchange', tradingName: 'MombasaFX', verificationStatus: 'VERIFIED',
    city: 'Mombasa', address: 'Fort Jesus Area', lat: -4.0563, lng: 39.6702,
    openingHours: [{ day: 'Daily', open: '07:00', close: '19:00' }],
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES', 'UGX'],
    buyRates: { USD: '151.50', EUR: '165.00', GBP: '193.00', KES: '1.00' },
    sellRates: { USD: '152.80', EUR: '166.20', GBP: '194.30', KES: '1.00' },
    liquidityAvailable: true, queueEstimate: 1, waitTimeMinutes: 3,
    accessibility: 'FULL', travelerFriendly: true, trustScore: 96, rating: 4.8, reviewCount: 312,
    contactPhone: '+254720100002', contactEmail: 'trading@momsafxfx.co.ke',
    services: ['Cash', 'Remittance', 'Tourist Services'],
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z'
  },
];

class BDCService {
  private bdcs: Map<string, BDC> = new Map();
  private reservations: Map<string, RateReservation> = new Map();

  constructor() {
    [...NAIROBI_BDCS, ...MOMBSA_BDCS].forEach(bdc => this.bdcs.set(bdc.id, bdc));
  }

  async initialize(): Promise<void> {
    logger.info({ bdcCount: this.bdcs.size }, 'BDC service initialized');
  }

  getAll(filter?: BDCSearchFilter): BDC[] {
    let results = Array.from(this.bdcs.values());

    if (filter?.city) {
      results = results.filter(b => b.city.toLowerCase() === filter.city!.toLowerCase());
    }
    if (filter?.currency) {
      results = results.filter(b => b.supportedCurrencies.includes(filter.currency!));
    }
    if (filter?.minTrustScore) {
      results = results.filter(b => b.trustScore >= filter.minTrustScore!);
    }
    if (filter?.maxQueue) {
      results = results.filter(b => b.queueEstimate <= filter.maxQueue!);
    }
    if (filter?.travelerFriendly) {
      results = results.filter(b => b.travelerFriendly);
    }
    if (filter?.verifiedOnly) {
      results = results.filter(b => b.verificationStatus === 'VERIFIED');
    }

    return results.sort((a, b) => b.trustScore - a.trustScore);
  }

  getById(bdcId: string): BDC | undefined {
    return this.bdcs.get(bdcId);
  }

  async getNearby(lat: number, lng: number, radiusKm: number = 10, filter?: BDCSearchFilter): Promise<(BDC & { distanceKm: number })[]> {
    const all = this.getAll(filter);

    return all.map(bdc => ({
      ...bdc,
      distanceKm: this.calculateDistance(lat, lng, bdc.lat, bdc.lng)
    }))
    .filter(b => b.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10;
  }

  search(query: string, filter?: BDCSearchFilter): BDC[] {
    const all = this.getAll(filter);
    const q = query.toLowerCase();

    return all.filter(b =>
      b.businessName.toLowerCase().includes(q) ||
      b.tradingName.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q)
    );
  }

  compareRates(currency: string): { bdc: BDC; buyRate: string; sellRate: string }[] {
    const all = this.getAll({ verifiedOnly: true });

    return all
      .filter(b => b.supportedCurrencies.includes(currency))
      .map(bdc => ({
        bdc,
        buyRate: bdc.buyRates[currency] || 'N/A',
        sellRate: bdc.sellRates[currency] || 'N/A'
      }))
      .sort((a, b) => {
        const aNum = parseFloat(a.sellRate) || 999;
        const bNum = parseFloat(b.sellRate) || 999;
        return aNum - bNum;
      });
  }

  async reserveRate(bdcId: string, currency: string, amount: string, side: 'BUY' | 'SELL'): Promise<RateReservation> {
    const bdc = this.bdcs.get(bdcId);
    if (!bdc) throw new Error('BDC not found');

    if (!bdc.supportedCurrencies.includes(currency)) throw new Error('Currency not supported');
    if (!bdc.liquidityAvailable) throw new Error('No liquidity available');

    const rate = side === 'BUY' ? bdc.buyRates[currency] : bdc.sellRates[currency];
    if (!rate) throw new Error('Rate not available');

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000).toISOString();

    const reservation: RateReservation = {
      id: `res_${uuidv4()}`,
      bdcId,
      currency,
      amount,
      rate,
      side,
      expiresAt,
      status: 'PENDING',
      qrCode: `QR:${uuidv4().slice(0, 8)}`,
      redemptionCode: `RC${uuidv4().slice(0, 6).toUpperCase()}`,
      createdAt: now.toISOString(),
    };

    this.reservations.set(reservation.id, reservation);
    logger.info({ reservationId: reservation.id, bdcId, currency, amount }, 'Rate reserved');

    return reservation;
  }

  confirmReservation(reservationId: string): RateReservation | null {
    const reservation = this.reservations.get(reservationId);
    if (!reservation) return null;

    if (new Date(reservation.expiresAt) < new Date()) {
      reservation.status = 'EXPIRED';
      return reservation;
    }

    reservation.status = 'CONFIRMED';
    return reservation;
  }

  redeemReservation(reservationId: string): RateReservation | null {
    const reservation = this.reservations.get(reservationId);
    if (!reservation) return null;

    if (reservation.status !== 'CONFIRMED') {
      throw new Error(`Cannot redeem reservation in status: ${reservation.status}`);
    }

    reservation.status = 'REDEEMED';
    return reservation;
  }

  cancelReservation(reservationId: string): RateReservation | null {
    const reservation = this.reservations.get(reservationId);
    if (!reservation) return null;

    if (['REDEEMED', 'EXPIRED'].includes(reservation.status)) {
      throw new Error(`Cannot cancel reservation in status: ${reservation.status}`);
    }

    reservation.status = 'CANCELLED';
    return reservation;
  }

  getReservation(reservationId: string): RateReservation | undefined {
    return this.reservations.get(reservationId);
  }

  updateRates(bdcId: string, buyRates: Record<string, string>, sellRates: Record<string, string>): BDC | null {
    const bdc = this.bdcs.get(bdcId);
    if (!bdc) return null;

    bdc.buyRates = { ...bdc.buyRates, ...buyRates };
    bdc.sellRates = { ...bdc.sellRates, ...sellRates };
    bdc.updatedAt = new Date().toISOString();

    return bdc;
  }

  getCities(): string[] {
    const cities = new Set<string>();
    this.bdcs.forEach(b => cities.add(b.city));
    return Array.from(cities).sort();
  }

  getSupportedCurrencies(): string[] {
    const currencies = new Set<string>();
    this.bdcs.forEach(b => b.supportedCurrencies.forEach(c => currencies.add(c)));
    return Array.from(currencies).sort();
  }

  getStats(): { totalBDCs: number; verified: number; cities: number; currencies: number } {
    const all = this.getAll();
    return {
      totalBDCs: all.length,
      verified: all.filter(b => b.verificationStatus === 'VERIFIED').length,
      cities: this.getCities().length,
      currencies: this.getSupportedCurrencies().length,
    };
  }
}

export const bdcService = new BDCService();

if (require.main === module) {
  (async () => {
    await bdcService.initialize();
    const nearby = await bdcService.getNearby(-1.2921, 36.8219, 20);
    logger.info({ nearbyCount: nearby.length }, 'Nearby BDCs');
  })();
}