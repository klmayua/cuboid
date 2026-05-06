'use client';

import { useState } from 'react';
import { 
  Store, 
  Plus, 
  Search,
  CreditCard,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  MoreVertical,
  QrCode
} from 'lucide-react';

const mockMerchants = [
  { id: 'm1', name: 'Nairobi Mall Supermarket', category: 'Retail', city: 'Nairobi', sales: 'KES 1.2M', transactions: 450, status: 'ACTIVE', rating: 4.8 },
  { id: 'm2', name: 'TechHub Electronics', category: 'Electronics', city: 'Nairobi', sales: 'KES 2.8M', transactions: 890, status: 'ACTIVE', rating: 4.9 },
  { id: 'm3', name: 'Mombasa Beach Hotel', category: 'Hospitality', city: 'Mombasa', sales: 'KES 4.5M', transactions: 1200, status: 'ACTIVE', rating: 4.7 },
  { id: 'm4', name: 'Kisumu Auto Parts', category: 'Automotive', city: 'Kisumu', sales: 'KES 850K', transactions: 320, status: 'ACTIVE', rating: 4.5 },
  { id: 'm5', name: 'Eldoret Medical Clinic', category: 'Healthcare', city: 'Eldoret', sales: 'KES 620K', transactions: 180, status: 'PENDING', rating: 4.6 },
];

export default function MerchantsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#0B1020] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Merchants</h1>
            <p className="text-[#7183A6]">Manage your business accepting Cuboid payments</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8]">
            <Plus className="w-5 h-5" /> Add Merchant
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#5E8DFF]/20 rounded-lg"><Store className="w-5 h-5 text-[#5E8DFF]" /></div>
              <span className="text-[#7183A6] text-sm">Total Merchants</span>
            </div>
            <p className="text-3xl font-bold text-white">5</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg"><DollarSign className="w-5 h-5 text-green-500" /></div>
              <span className="text-[#7183A6] text-sm">Total Sales</span>
            </div>
            <p className="text-3xl font-bold text-white">KES 10M</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg"><CreditCard className="w-5 h-5 text-yellow-500" /></div>
              <span className="text-[#7183A6] text-sm">Transactions</span>
            </div>
            <p className="text-3xl font-bold text-white">3,040</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg"><TrendingUp className="w-5 h-5 text-purple-500" /></div>
              <span className="text-[#7183A6] text-sm">Avg Rating</span>
            </div>
            <p className="text-3xl font-bold text-white">4.7</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
          <input
            type="text"
            placeholder="Search merchants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-[#7183A6] font-medium">Merchant</th>
                <th className="text-left py-4 px-4 text-[#7183A6] font-medium">Category</th>
                <th className="text-left py-4 px-4 text-[#7183A6] font-medium">Location</th>
                <th className="text-right py-4 px-4 text-[#7183A6] font-medium">Sales</th>
                <th className="text-right py-4 px-4 text-[#7183A6] font-medium">Transactions</th>
                <th className="text-right py-4 px-4 text-[#7183A6] font-medium">Rating</th>
                <th className="text-center py-4 px-4 text-[#7183A6] font-medium">Status</th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {mockMerchants.map(m => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#5E8DFF]/20 rounded-lg flex items-center justify-center">
                        <Store className="w-5 h-5 text-[#5E8DFF]" />
                      </div>
                      <span className="text-white font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#7183A6]">{m.category}</td>
                  <td className="py-4 px-4 text-[#7183A6]">{m.city}</td>
                  <td className="py-4 px-4 text-right text-white font-medium">{m.sales}</td>
                  <td className="py-4 px-4 text-right text-white">{m.transactions}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-yellow-500">★</span> {m.rating}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      m.status === 'ACTIVE' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 text-[#7183A6] hover:text-white"><MoreVertical className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}