'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical,
  Phone,
  Mail,
  Bank,
  Globe,
  Star,
  Clock,
  Edit,
  Trash2,
  Building2
} from 'lucide-react';

const mockBeneficiaries = [
  {
    id: 'ben_001',
    name: 'Sarah Wanjiku',
    type: 'INDIVIDUAL',
    country: 'KE',
    bankAccount: { bankName: 'Equity Bank', accountNumber: '***4521', accountName: 'Sarah Wanjiku' },
    mobileMoney: { provider: 'M-Pesa', phoneNumber: '***1234' },
    trustScore: 92,
    totalReceived: 'KES 450,000',
    transactionCount: 28,
    isFavorite: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'ben_002',
    name: 'Tech Solutions Ltd',
    type: 'BUSINESS',
    country: 'KE',
    bankAccount: { bankName: 'Stanbic Bank', accountNumber: '***8892', accountName: 'Tech Solutions Ltd' },
    trustScore: 98,
    totalReceived: 'KES 2,450,000',
    transactionCount: 156,
    isFavorite: false,
    createdAt: '2023-08-22',
  },
  {
    id: 'ben_003',
    name: 'James Okonkwo',
    type: 'INDIVIDUAL',
    country: 'NG',
    bankAccount: { bankName: 'GTBank', accountNumber: '***7733', accountName: 'James Okonkwo' },
    trustScore: 85,
    totalReceived: 'NGN 850,000',
    transactionCount: 12,
    isFavorite: true,
    createdAt: '2024-03-10',
  },
  {
    id: 'ben_004',
    name: 'Mama Rangi General Shop',
    type: 'BUSINESS',
    country: 'KE',
    mobileMoney: { provider: 'M-Pesa', phoneNumber: '***9876' },
    trustScore: 78,
    totalReceived: 'KES 125,000',
    transactionCount: 45,
    isFavorite: false,
    createdAt: '2024-02-01',
  },
];

export default function BeneficiariesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'INDIVIDUAL' | 'BUSINESS'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockBeneficiaries.filter(b => {
    if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType !== 'ALL' && b.type !== filterType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B1020] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Beneficiaries</h1>
            <p className="text-[#7183A6]">Manage your trusted recipients for money transfers</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Beneficiary
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
            <input
              type="text"
              placeholder="Search beneficiaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50"
            />
          </div>
          <div className="flex gap-2">
            {(['ALL', 'INDIVIDUAL', 'BUSINESS'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === type ? 'bg-[#5E8DFF] text-white' : 'bg-white/10 text-[#7183A6] hover:bg-white/20'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Beneficiary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ben => (
            <div
              key={ben.id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    ben.type === 'BUSINESS' ? 'bg-[#5E8DFF]/20 text-[#5E8DFF]' : 'bg-green-500/20 text-green-500'
                  }`}>
                    {ben.type === 'BUSINESS' ? <Building2 className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      {ben.name}
                      {ben.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    </h3>
                    <p className="text-[#7183A6] text-sm">{ben.type} • {ben.country}</p>
                  </div>
                </div>
                <button className="text-[#7183A6] hover:text-white p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {ben.bankAccount && (
                  <div className="flex items-center gap-2 text-sm">
                    <Bank className="w-4 h-4 text-[#7183A6]" />
                    <span className="text-[#7183A6]">{ben.bankAccount.bankName}</span>
                    <span className="text-white ml-auto">{ben.bankAccount.accountNumber}</span>
                  </div>
                )}
                {ben.mobileMoney && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#7183A6]" />
                    <span className="text-[#7183A6]">{ben.mobileMoney.provider}</span>
                    <span className="text-white ml-auto">{ben.mobileMoney.phoneNumber}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div>
                  <p className="text-[#7183A6] text-xs">Trust Score</p>
                  <p className="text-[#5E8DFF] font-medium">{ben.trustScore}%</p>
                </div>
                <div className="text-right">
                  <p className="text-[#7183A6] text-xs">Total Received</p>
                  <p className="text-white font-medium">{ben.totalReceived}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-[#7183A6] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No beneficiaries found</h3>
            <p className="text-[#7183A6] mb-6">Add your first beneficiary to start sending money</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8]"
            >
              Add Beneficiary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}