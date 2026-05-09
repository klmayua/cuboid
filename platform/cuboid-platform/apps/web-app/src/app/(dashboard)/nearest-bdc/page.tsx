'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Star, 
  Shield, 
  Phone, 
  Mail,
  Building2,
  ArrowUpDown,
  Filter,
  QrCode,
  CheckCircle,
  X,
  MapPinned,
  DollarSign,
  Users
} from 'lucide-react';

const mockBDCs = [
  {
    id: 'bdc_001',
    businessName: 'Kenya Foreign Exchange Bureau',
    tradingName: 'KenyaForex',
    verificationStatus: 'VERIFIED',
    city: 'Nairobi',
    address: 'Kenyatta Avenue, CBD',
    lat: -1.2921,
    lng: 36.8219,
    distanceKm: 0.8,
    buyRates: { USD: '152.50', EUR: '165.80', GBP: '194.20', KES: '1.00' },
    sellRates: { USD: '153.50', EUR: '166.80', GBP: '195.50', KES: '1.00' },
    queueEstimate: 3,
    waitTimeMinutes: 8,
    travelerFriendly: true,
    trustScore: 95,
    rating: 4.8,
    reviewCount: 342,
    openingHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM',
    services: ['Cash', 'Wire Transfer', 'Mobile Money'],
  },
  {
    id: 'bdc_002',
    businessName: 'Premier Currency Services',
    tradingName: 'PremierFX',
    verificationStatus: 'VERIFIED',
    city: 'Nairobi',
    address: 'Westlands, Sarit Centre',
    lat: -1.2136,
    lng: 36.8070,
    distanceKm: 2.4,
    buyRates: { USD: '152.80', EUR: '166.10', GBP: '194.50', KES: '1.00' },
    sellRates: { USD: '154.00', EUR: '167.20', GBP: '195.80', KES: '1.00' },
    queueEstimate: 1,
    waitTimeMinutes: 3,
    travelerFriendly: true,
    trustScore: 98,
    rating: 4.9,
    reviewCount: 567,
    openingHours: 'Mon-Sat: 7AM-8PM, Sun: 10AM-4PM',
    services: ['Cash', 'Wire Transfer', 'Travelers Cheque'],
  },
  {
    id: 'bdc_003',
    businessName: 'East African Exchange',
    tradingName: 'EAX Nairobi',
    verificationStatus: 'VERIFIED',
    city: 'Nairobi',
    address: 'Airport Road, Embakasi',
    lat: -1.3192,
    lng: 36.9278,
    distanceKm: 5.2,
    buyRates: { USD: '152.00', EUR: '165.50', GBP: '193.80', KES: '1.00' },
    sellRates: { USD: '153.20', EUR: '166.50', GBP: '195.00', KES: '1.00' },
    queueEstimate: 5,
    waitTimeMinutes: 15,
    travelerFriendly: true,
    trustScore: 92,
    rating: 4.5,
    reviewCount: 289,
    openingHours: 'Daily: 6AM-10PM',
    services: ['Cash', 'Airtime', 'Remittance'],
  },
  {
    id: 'bdc_004',
    businessName: 'Savannah Bureau de Change',
    tradingName: 'Savannah FX',
    verificationStatus: 'VERIFIED',
    city: 'Nairobi',
    address: 'Mombasa Road, Galleria Mall',
    lat: -1.3873,
    lng: 36.9484,
    distanceKm: 8.1,
    buyRates: { USD: '151.80', EUR: '165.00', GBP: '193.00', KES: '1.00' },
    sellRates: { USD: '153.80', EUR: '166.80', GBP: '195.20', KES: '1.00' },
    queueEstimate: 2,
    waitTimeMinutes: 6,
    travelerFriendly: true,
    trustScore: 90,
    rating: 4.6,
    reviewCount: 178,
    openingHours: 'Mon-Sat: 9AM-9PM',
    services: ['Cash', 'Mobile Money', 'Bill Payments'],
  },
  {
    id: 'bdc_101',
    businessName: 'Coast Currency Exchange',
    tradingName: 'CoastFX',
    verificationStatus: 'VERIFIED',
    city: 'Mombasa',
    address: 'Mombasa CBD, Nkrumah Road',
    lat: -4.0435,
    lng: 39.6686,
    distanceKm: 12.5,
    buyRates: { USD: '151.20', EUR: '164.50', GBP: '192.50', KES: '1.00' },
    sellRates: { USD: '152.50', EUR: '165.80', GBP: '194.00', KES: '1.00' },
    queueEstimate: 2,
    waitTimeMinutes: 5,
    travelerFriendly: true,
    trustScore: 93,
    rating: 4.7,
    reviewCount: 234,
    openingHours: 'Mon-Sat: 8AM-6PM',
    services: ['Cash', 'Wire Transfer', 'Hotel Exchange'],
  },
];

const currencies = ['USD', 'EUR', 'GBP', 'KES', 'UGX', 'TZS', 'GHS', 'ZAR'];

export default function NearestBDCPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [sortBy, setSortBy] = useState<'distance' | 'rate' | 'rating'>('distance');
  const [filterVerified, setFilterVerified] = useState(true);
  const [filterTravelerFriendly, setFilterTravelerFriendly] = useState(false);
  const [selectedBDC, setSelectedBDC] = useState<string | null>(null);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [reserveAmount, setReserveAmount] = useState('');
  const [reserveSide, setReserveSide] = useState<'BUY' | 'SELL'>('BUY');
  const [reservationSuccess, setReservationSuccess] = useState<string | null>(null);

  const filteredBDCs = mockBDCs
    .filter(bdc => {
      if (searchQuery && !bdc.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !bdc.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !bdc.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filterVerified && bdc.verificationStatus !== 'VERIFIED') return false;
      if (filterTravelerFriendly && !bdc.travelerFriendly) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      const aRate = parseFloat((a.sellRates as Record<string, string>)[selectedCurrency] || '0');
      const bRate = parseFloat((b.sellRates as Record<string, string>)[selectedCurrency] || '0');
      return aRate - bRate;
    });

  const handleReserve = () => {
    if (!selectedBDC || !reserveAmount) return;
    const code = `RC${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setReservationSuccess(code);
  };

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#0A2A66] to-[#0B1020] border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#5E8DFF]/20 rounded-xl">
              <MapPin className="w-6 h-6 text-[#5E8DFF]" />
            </div>
            <span className="text-[#5E8DFF] text-sm font-medium">Visitor Mode Active</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Find Nearest BDC</h1>
          <p className="text-[#7183A6] text-lg max-w-2xl">
            Locate the best currency exchange rates near you. Compare rates, 
            check wait times, and reserve your rate instantly.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-0 z-20 bg-[#0B1020]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
              <input
                type="text"
                placeholder="Search by city, area, or BDC name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#5E8DFF]/50"
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button
                onClick={() => setSortBy(s => s === 'distance' ? 'rate' : s === 'rate' ? 'rating' : 'distance')}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span className="text-sm">{sortBy === 'distance' ? 'Distance' : sortBy === 'rate' ? 'Best Rate' : 'Rating'}</span>
              </button>
              <button
                onClick={() => setFilterVerified(v => !v)}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm transition-colors ${
                  filterVerified ? 'bg-[#5E8DFF]/20 border-[#5E8DFF]/50 text-[#5E8DFF]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Shield className="w-4 h-4" />
                Verified
              </button>
              <button
                onClick={() => setFilterTravelerFriendly(v => !v)}
                className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm transition-colors ${
                  filterTravelerFriendly ? 'bg-[#5E8DFF]/20 border-[#5E8DFF]/50 text-[#5E8DFF]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                🌍 Traveler Friendly
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BDC List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#7183A6]">{filteredBDCs.length} BDCs found</span>
            </div>
            {filteredBDCs.map((bdc) => (
              <div
                key={bdc.id}
                onClick={() => setSelectedBDC(bdc.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedBDC === bdc.id
                    ? 'bg-[#5E8DFF]/10 border-[#5E8DFF]/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{bdc.tradingName}</h3>
                      {bdc.verificationStatus === 'VERIFIED' && (
                        <Shield className="w-4 h-4 text-[#5E8DFF]" />
                      )}
                    </div>
                    <p className="text-[#7183A6] text-sm">{bdc.address}</p>
                    <p className="text-[#5E8DFF] text-sm mt-1">{bdc.distanceKm} km away</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white font-medium">{bdc.rating}</span>
                    </div>
                    <span className="text-[#7183A6] text-xs">{bdc.reviewCount} reviews</span>
                  </div>
                </div>

                {/* Rate Comparison */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {currencies.slice(0, 4).map(curr => (
                    <div key={curr} className="text-center p-2 rounded-lg bg-white/5">
                      <div className="text-[#7183A6] text-xs mb-1">{curr}</div>
                      <div className="text-white text-sm font-medium">{(bdc.sellRates as Record<string, string>)[curr] || '-'}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-[#7183A6]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {bdc.waitTimeMinutes} min wait
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {bdc.queueEstimate} in queue
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBDC(bdc.id);
                      setShowReserveModal(true);
                    }}
                    className="px-4 py-2 bg-[#5E8DFF] text-white rounded-lg text-sm font-medium hover:bg-[#4A7AE8] transition-colors"
                  >
                    Reserve Rate
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Map / Details Panel */}
          <div className="space-y-4">
            {/* Selected BDC Details */}
            {selectedBDC ? (
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Selected BDC</h3>
                {filteredBDCs.find(b => b.id === selectedBDC) && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#5E8DFF]/10 border border-[#5E8DFF]/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-[#5E8DFF]" />
                        <span className="text-white font-medium">Full Rate Card</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {currencies.slice(0, 6).map(curr => {
                          const bdc = filteredBDCs.find(b => b.id === selectedBDC)!;
                          return (
                            <div key={curr} className="flex justify-between">
                              <span className="text-[#7183A6]">{curr}</span>
                              <span className="text-white">Buy: {(bdc.buyRates as Record<string, string>)[curr] || '-'} | Sell: {(bdc.sellRates as Record<string, string>)[curr] || '-'}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#7183A6]">
                        <Clock className="w-4 h-4" />
                        <span>{filteredBDCs.find(b => b.id === selectedBDC)!.openingHours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#7183A6]">
                        <Phone className="w-4 h-4" />
                        <span>+254 720 000 001</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#7183A6]">
                        <MapPin className="w-4 h-4" />
                        <span>Get Directions</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {filteredBDCs.find(b => b.id === selectedBDC)!.services.map(s => (
                        <span key={s} className="px-2 py-1 bg-white/10 rounded-full text-xs text-[#7183A6]">
                          {s}
                        </span>
                      ))}
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8] transition-colors">
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                <MapPin className="w-12 h-12 text-[#7183A6] mx-auto mb-4" />
                <p className="text-[#7183A6]">Select a BDC to view details</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Market Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7183A6]">Best USD Sell Rate</span>
                  <span className="text-[#5E8DFF] font-medium">KES 152.80</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#7183A6]">Best EUR Sell Rate</span>
                  <span className="text-[#5E8DFF] font-medium">KES 166.10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#7183A6]">Average Wait Time</span>
                  <span className="text-white font-medium">8 min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#7183A6]">Verified BDCs</span>
                  <span className="text-white font-medium">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reserve Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0B1020] border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4">
            {reservationSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rate Reserved!</h3>
                <p className="text-[#7183A6] mb-4">Show this code at the BDC to redeem your rate</p>
                <div className="p-4 bg-white/10 rounded-xl mb-4">
                  <p className="text-3xl font-mono text-[#5E8DFF] tracking-wider">{reservationSuccess}</p>
                </div>
                <p className="text-sm text-[#7183A6] mb-6">Reservation expires in 30 minutes</p>
                <button
                  onClick={() => { setShowReserveModal(false); setReservationSuccess(null); }}
                  className="w-full py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8]"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Reserve Rate</h3>
                  <button onClick={() => setShowReserveModal(false)} className="text-[#7183A6] hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReserveSide('BUY')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        reserveSide === 'BUY' ? 'bg-[#5E8DFF] text-white' : 'bg-white/10 text-[#7183A6]'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setReserveSide('SELL')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        reserveSide === 'SELL' ? 'bg-[#5E8DFF] text-white' : 'bg-white/10 text-[#7183A6]'
                      }`}
                    >
                      Sell
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm text-[#7183A6] mb-2">Amount ({selectedCurrency})</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                      <input
                        type="number"
                        value={reserveAmount}
                        onChange={(e) => setReserveAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50"
                      />
                    </div>
                  </div>

                  {selectedBDC && (
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-sm text-[#7183A6] mb-1">Rate at {filteredBDCs.find(b => b.id === selectedBDC)?.tradingName}</p>
                      <p className="text-2xl font-bold text-[#5E8DFF]">
                        {reserveSide === 'BUY' 
                          ? (filteredBDCs.find(b => b.id === selectedBDC)?.buyRates as Record<string, string>)?.[selectedCurrency]
                          : (filteredBDCs.find(b => b.id === selectedBDC)?.sellRates as Record<string, string>)?.[selectedCurrency]
                        } KES
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleReserve}
                    disabled={!reserveAmount}
                    className="w-full py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}