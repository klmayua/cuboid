import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({ name: 'geo-service' });

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  type: 'airport' | 'mall' | 'hotel' | 'city' | 'bdc' | 'bank' | 'market';
  address?: string;
  city?: string;
  country: string;
  coordinates: Coordinates;
  metadata?: Record<string, unknown>;
}

export interface GeoSearchResult {
  places: Place[];
  query: string;
  filters?: {
    type?: string;
    city?: string;
    radiusKm?: number;
  };
}

export interface DistanceResult {
  from: string;
  to: string;
  distanceKm: number;
  bearing: number;
  durationMinutes: number;
  route?: string;
}

const KENYA_PLACES: Place[] = [
  { id: 'nbo', name: 'Jomo Kenyatta International Airport', type: 'airport', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.3192, lng: 36.9278 }, address: 'Airport Road, Nairobi' },
  { id: 'wil', name: 'Wilson Airport', type: 'airport', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.3167, lng: 36.8167 }, address: 'Langsata Road, Nairobi' },
  { id: 'mba', name: 'Mombasa International Airport', type: 'airport', city: 'Mombasa', country: 'KE', coordinates: { lat: -4.0348, lng: 39.7189 }, address: 'Mombasa Road, Mombasa' },
  { id: 'kdi', name: 'Kisumu International Airport', type: 'airport', city: 'Kisumu', country: 'KE', coordinates: { lat: -0.0891, lng: 34.7869 }, address: 'Kisumu-Busia Road' },
  { id: 'eld', name: 'Eldoret International Airport', type: 'airport', city: 'Eldoret', country: 'KE', coordinates: { lat: 0.4045, lng: 35.3213 }, address: 'Eldoret-Kapseret Road' },
  { id: 'nbo2', name: 'Nairobi CBD', type: 'city', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.2921, lng: 36.8219 } },
  { id: 'mom', name: 'Mombasa CBD', type: 'city', city: 'Mombasa', country: 'KE', coordinates: { lat: -4.0435, lng: 39.6686 } },
  { id: 'kis', name: 'Kisumu CBD', type: 'city', city: 'Kisumu', country: 'KE', coordinates: { lat: -0.1022, lng: 34.7617 } },
  { id: 'eld2', name: 'Eldoret CBD', type: 'city', city: 'Eldoret', country: 'KE', coordinates: { lat: 0.5143, lng: 35.2698 } },
  { id: 'nak', name: 'Nakuru CBD', type: 'city', city: 'Nakuru', country: 'KE', coordinates: { lat: -0.3031, lng: 36.0800 } },
  { id: 'twr', name: 'Two Rivers Mall', type: 'mall', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.2365, lng: 36.7842 }, address: 'Limuru Road, Nairobi' },
  { id: 'sgr', name: 'Garden City Mall', type: 'mall', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.2231, lng: 36.8942 }, address: 'Thika Road, Nairobi' },
  { id: 'svs', name: 'Sarit Centre', type: 'mall', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.2136, lng: 36.8070 }, address: 'Westlands, Nairobi' },
  { id: 'mnm', name: 'Mombasa Mall', type: 'mall', city: 'Mombasa', country: 'KE', coordinates: { lat: -4.0643, lng: 39.6687 }, address: 'Mombasa CBD' },
  { id: 'gll', name: 'Galleria Mall', type: 'mall', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.3873, lng: 36.9484 }, address: 'Karen, Nairobi' },
  { id: 'prk', name: 'Pride Inn', type: 'hotel', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.2934, lng: 36.8211 }, address: 'Lilian, Nairobi' },
  { id: 'ser', name: 'Serena Hotel', type: 'hotel', city: 'Nairobi', country: 'KE', coordinates: { lat: -1.2867, lng: 36.8056 }, address: 'Kenyatta Avenue, Nairobi' },
];

const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class GeoService {
  private placeCache: Map<string, CacheEntry<Place[]>> = new Map();
  private distanceCache: Map<string, CacheEntry<DistanceResult>> = new Map();

  async initialize(): Promise<void> {
    logger.info('Geo service initialized');
  }

  haversineDistance(from: Coordinates, to: Coordinates): number {
    const R = 6371;
    const dLat = this.toRad(to.lat - from.lat);
    const dLng = this.toRad(to.lng - from.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(from.lat)) * Math.cos(this.toRad(to.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  calculateBearing(from: Coordinates, to: Coordinates): number {
    const dLng = this.toRad(to.lng - from.lng);
    const lat1 = this.toRad(from.lat);
    const lat2 = this.toRad(to.lat);
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    return (bearing + 360) % 360;
  }

  estimateTravelTime(distanceKm: number, mode: 'walk' | 'drive' | 'transit' = 'drive'): number {
    const speeds = { walk: 5, drive: 40, transit: 25 };
    return Math.ceil((distanceKm / speeds[mode]) * 60);
  }

  async searchPlaces(query: string, filters?: {
    type?: Place['type'];
    city?: string;
    country?: string;
    radiusKm?: number;
    near?: Coordinates;
  }): Promise<GeoSearchResult> {
    const cacheKey = `search:${query}:${JSON.stringify(filters)}`;
    const cached = this.placeCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return { places: cached.data, query, filters };
    }

    let results = KENYA_PLACES.filter(place => {
      const searchStr = `${place.name} ${place.city} ${place.address || ''}`.toLowerCase();
      return searchStr.includes(query.toLowerCase());
    });

    if (filters?.type) {
      results = results.filter(p => p.type === filters.type);
    }
    if (filters?.city) {
      results = results.filter(p => p.city?.toLowerCase() === filters.city!.toLowerCase());
    }
    if (filters?.country) {
      results = results.filter(p => p.country === filters.country);
    }
    if (filters?.near && filters?.radiusKm) {
      results = results
        .map(place => ({
          ...place,
          _distance: this.haversineDistance(filters.near!, place.coordinates)
        }))
        .filter(p => p._distance <= filters.radiusKm!)
        .sort((a, b) => a._distance - b._distance)
        .map(({ _distance, ...rest }) => rest as Place);
    }

    this.placeCache.set(cacheKey, { data: results, expiresAt: Date.now() + CACHE_TTL_MS });

    return { places: results, query, filters };
  }

  async getNearby(location: Coordinates, radiusKm: number = 10, type?: Place['type']): Promise<Place[]> {
    const allPlaces = KENYA_PLACES.map(place => ({
      place,
      distance: this.haversineDistance(location, place.coordinates)
    }))
    .filter(p => p.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);

    let filtered = allPlaces;
    if (type) {
      filtered = allPlaces.filter(p => p.place.type === type);
    }

    return filtered.map(p => ({
      ...p.place,
      metadata: { ...p.place.metadata, distanceKm: Math.round(p.distance * 10) / 10 }
    }));
  }

  async calculateDistance(from: Coordinates | string, to: Coordinates | string): Promise<DistanceResult> {
    const fromCoords = typeof from === 'string' ? this.getCoordinatesById(from) : from;
    const toCoords = typeof to === 'string' ? this.getCoordinatesById(to) : to;

    if (!fromCoords || !toCoords) {
      throw new Error('Invalid coordinates or place ID');
    }

    const cacheKey = `${fromCoords.lat},${fromCoords.lng}:${toCoords.lat},${toCoords.lng}`;
    const cached = this.distanceCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const distance = this.haversineDistance(fromCoords, toCoords);
    const bearing = this.calculateBearing(fromCoords, toCoords);
    const duration = this.estimateTravelTime(distance);

    const result: DistanceResult = {
      from: typeof from === 'string' ? from : `${fromCoords.lat},${fromCoords.lng}`,
      to: typeof to === 'string' ? to : `${toCoords.lat},${toCoords.lng}`,
      distanceKm: Math.round(distance * 10) / 10,
      bearing: Math.round(bearing),
      durationMinutes: duration,
    };

    this.distanceCache.set(cacheKey, { data: result, expiresAt: Date.now() + CACHE_TTL_MS });

    return result;
  }

  private getCoordinatesById(placeId: string): Coordinates | null {
    const place = KENYA_PLACES.find(p => p.id === placeId);
    return place ? place.coordinates : null;
  }

  async getAirports(city?: string): Promise<Place[]> {
    const airports = KENYA_PLACES.filter(p => p.type === 'airport');
    if (city) {
      return airports.filter(p => p.city?.toLowerCase() === city.toLowerCase());
    }
    return airports;
  }

  async getMalls(city?: string): Promise<Place[]> {
    const malls = KENYA_PLACES.filter(p => p.type === 'mall');
    if (city) {
      return malls.filter(p => p.city?.toLowerCase() === city.toLowerCase());
    }
    return malls;
  }

  async getCities(country?: string): Promise<Place[]> {
    const cities = KENYA_PLACES.filter(p => p.type === 'city');
    if (country) {
      return cities.filter(p => p.country === country);
    }
    return cities;
  }

  getCompassDirection(bearing: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(bearing / 22.5) % 16;
    return directions[index];
  }
}

export const geoService = new GeoService();

if (require.main === module) {
  (async () => {
    await geoService.initialize();
    const airports = await geoService.getAirports();
    logger.info({ airports }, 'Available airports');
  })();
}