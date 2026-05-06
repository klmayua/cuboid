'use client';

import { useState } from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Search
} from 'lucide-react';

const mockTransactions = [
  { id: 'TX-001', type: 'PAYOUT', direction: 'DEBIT', amount: 'KES 50,000', status: 'SETTLED', recipient: 'Sarah Wanjiku', date: '2024-01-20 14:30', fee: 'KES 250' },
  { id: 'TX-002', type: 'COLLECTION', direction: 'CREDIT', amount: 'USD 500', status: 'SETTLED', sender: 'John Smith', date: '2024-01-20 10:15', fee: 'USD 2.50' },
  { id: 'TX-003', type: 'EXCHANGE', direction: 'CREDIT', amount: 'KES 153,500', status: 'PROCESSING', from: 'USD 1,000', date: '2024-01-19 16:45', fee: 'KES 500' },
  { id: 'TX-004', type: 'PAYOUT', direction: 'DEBIT', amount: 'KES 25,000', status: 'FAILED', recipient: 'Tech Solutions Ltd', date: '2024-01-19 09:20', fee: 'KES 125', failureReason: 'Insufficient funds' },
  { id: 'TX-005', type: 'REFUND', direction: 'CREDIT', amount: 'KES 10,000', status: 'SETTLED', reason: 'Escrow release', date: '2024-01-18 11:00', fee: 'KES 0' },
  { id: 'TX-006', type: 'PAYOUT', direction: 'DEBIT', amount: 'KES 100,000', status: 'PENDING', recipient: 'James Okonkwo', date: '2024-01-18 08:30', fee: 'KES 500' },
  { id: 'TX-007', type: 'COLLECTION', direction: 'CREDIT', amount: 'EUR 250', status: 'SETTLED', sender: 'Maria Garcia', date: '2024-01-17 15:00', fee: 'EUR 1.25' },
  { id: 'TX-008', type: 'EXCHANGE', direction: 'DEBIT', amount: 'KES 200,000', status: 'SETTLED', to: 'USD 1,300', date: '2024-01-16 12:00', fee: 'KES 750' },
];

export default function ActivityPage() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockTransactions.filter(tx => {
    if (filterStatus !== 'ALL' && tx.status !== filterStatus) return false;
    if (filterType !== 'ALL' && tx.type !== filterType) return false;
    if (searchQuery && !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tx.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tx.sender?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SETTLED': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'FAILED': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'PENDING': 
      case 'PROCESSING': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-[#7183A6]" />;
    }
  };

  const getTypeIcon = (type: string, direction: string) => {
    if (type === 'EXCHANGE') return <RefreshCw className="w-4 h-4 text-[#5E8DFF]" />;
    return direction === 'DEBIT' ? 
      <ArrowUpRight className="w-4 h-4 text-red-500" /> : 
      <ArrowDownLeft className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-[#0B1020] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Activity</h1>
            <p className="text-[#7183A6]">View all your transaction history</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="SETTLED">Settled</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="FAILED">Failed</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="PAYOUT">Payout</option>
            <option value="COLLECTION">Collection</option>
            <option value="EXCHANGE">Exchange</option>
            <option value="REFUND">Refund</option>
          </select>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filtered.map(tx => (
            <div key={tx.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${tx.direction === 'DEBIT' ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                    {getTypeIcon(tx.type, tx.direction)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{tx.type}</span>
                      {getStatusIcon(tx.status)}
                    </div>
                    <p className="text-[#7183A6] text-sm">
                      {tx.recipient || tx.sender || tx.from || tx.to || tx.reason}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${tx.direction === 'DEBIT' ? 'text-red-400' : 'text-green-400'}`}>
                    {tx.direction === 'DEBIT' ? '-' : '+'}{tx.amount}
                  </p>
                  <p className="text-[#7183A6] text-sm">{tx.date}</p>
                </div>
              </div>
              {tx.failureReason && (
                <div className="mt-3 pt-3 border-t border-red-500/20">
                  <p className="text-red-400 text-sm">Failed: {tx.failureReason}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Activity className="w-16 h-16 text-[#7183A6] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No transactions found</h3>
            <p className="text-[#7183A6]">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}