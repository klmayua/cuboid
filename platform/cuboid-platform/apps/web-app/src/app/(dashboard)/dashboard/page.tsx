import { motion } from 'framer-motion';
import { CuboidLogo } from '@cuboid/design-system';
import { Card } from '@cuboid/design-system';
import { 
  Wallet, 
  TrendingUp, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Clock, 
  Shield,
  Bell,
  Search
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Dashboard</h1>
          <p className="text-[#7183A6]">Welcome back. Here's your financial overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-xl glass text-[#7183A6] hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl glass text-[#7183A6] hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-semantic-danger" />
          </button>
          <div className="flex items-center gap-3 px-4 py-2 glass rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2A66] to-[#123E91] flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div className="text-left">
              <p className="text-sm text-white">John Doe</p>
              <p className="text-xs text-[#7183A6]">Business Account</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-5 h-5 text-brand-light-trust" />
            <span className="text-xs text-semantic-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <p className="text-sm text-[#7183A6] mb-1">Total Balance</p>
          <p className="text-2xl font-display text-white">$124,500.00</p>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <ArrowDownLeft className="w-5 h-5 text-semantic-success" />
            <span className="text-xs text-semantic-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8.2%
            </span>
          </div>
          <p className="text-sm text-[#7183A6] mb-1">Received (30d)</p>
          <p className="text-2xl font-display text-white">$89,200.00</p>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <ArrowUpRight className="w-5 h-5 text-semantic-danger" />
            <span className="text-xs text-semantic-danger flex items-center gap-1">
              <TrendingUp className="w-3 h-3 rotate-180" /> -3.1%
            </span>
          </div>
          <p className="text-sm text-[#7183A6] mb-1">Sent (30d)</p>
          <p className="text-2xl font-display text-white">$45,800.00</p>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-5 h-5 text-semantic-escrow" />
          </div>
          <p className="text-sm text-[#7183A6] mb-1">Trust Score</p>
          <p className="text-2xl font-display text-white">92/100</p>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card variant="glass" className="col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Recent Activity</h2>
            <button className="text-sm text-brand-light-trust hover:text-white transition-colors">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[
              { type: 'received', from: 'Acme Corp', amount: '$5,000.00', time: '2 minutes ago', status: 'settled' },
              { type: 'sent', to: 'Global Suppliers Ltd', amount: '$12,500.00', time: '1 hour ago', status: 'processing' },
              { type: 'exchange', from: 'USD', to: 'GBP', amount: '$8,000.00', time: '3 hours ago', status: 'settled' },
              { type: 'escrow', to: 'Trade Escrow', amount: '$25,000.00', time: '1 day ago', status: 'active' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'received' ? 'bg-semantic-success/10' :
                    activity.type === 'sent' ? 'bg-semantic-danger/10' :
                    activity.type === 'exchange' ? 'bg-brand-light-trust/10' :
                    'bg-semantic-escrow/10'
                  }`}>
                    {activity.type === 'received' && <ArrowDownLeft className="w-5 h-5 text-semantic-success" />}
                    {activity.type === 'sent' && <ArrowUpRight className="w-5 h-5 text-semantic-danger" />}
                    {activity.type === 'exchange' && <ArrowDownLeft className="w-5 h-5 text-brand-light-trust" />}
                    {activity.type === 'escrow' && <Shield className="w-5 h-5 text-semantic-escrow" />}
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      {activity.type === 'received' && `Received from ${activity.from}`}
                      {activity.type === 'sent' && `Sent to ${activity.to}`}
                      {activity.type === 'exchange' && `Exchanged ${activity.from} to ${activity.to}`}
                      {activity.type === 'escrow' && `Escrow hold for ${activity.to}`}
                    </p>
                    <p className="text-xs text-[#7183A6]">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {activity.type === 'received' ? '+' : '-'}{activity.amount}
                  </p>
                  <p className={`text-xs capitalize ${
                    activity.status === 'settled' ? 'text-semantic-success' :
                    activity.status === 'processing' ? 'text-semantic-warning' :
                    activity.status === 'active' ? 'text-semantic-escrow' :
                    'text-[#7183A6]'
                  }`}>
                    {activity.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white font-medium hover:shadow-lg transition-shadow flex items-center justify-between">
              <span>Send Money</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button className="w-full p-4 rounded-xl glass text-white font-medium hover:bg-white/[0.08] transition-colors flex items-center justify-between">
              <span>Request Payment</span>
              <ArrowDownLeft className="w-4 h-4" />
            </button>
            <button className="w-full p-4 rounded-xl glass text-white font-medium hover:bg-white/[0.08] transition-colors flex items-center justify-between">
              <span>Create Escrow</span>
              <Shield className="w-4 h-4" />
            </button>
            <button className="w-full p-4 rounded-xl glass text-white font-medium hover:bg-white/[0.08] transition-colors flex items-center justify-between">
              <span>Convert Currency</span>
              <Clock className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}