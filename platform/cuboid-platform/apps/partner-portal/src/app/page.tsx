'use client';

import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';
import { Card } from '@cuboid/design-system';
import { 
  Settings, FileText, CreditCard, Activity, AlertTriangle, CheckCircle, 
  Key, Globe, TrendingUp, DollarSign, Users, Clock, MapPin, Star,
  QrCode, Calendar, Download, ArrowUpRight, ArrowDownLeft, Shield
} from 'lucide-react';

const navItems = [
  { icon: Activity, label: 'Dashboard', href: '/', active: true },
  { icon: MapPin, label: 'Branch Profile', href: '/branch' },
  { icon: DollarSign, label: 'Live Rates', href: '/rates' },
  { icon: Clock, label: 'Queue', href: '/queue' },
  { icon: QrCode, label: 'Reservations', href: '/reservations' },
  { icon: CreditCard, label: 'Redemptions', href: '/redemptions' },
  { icon: TrendingUp, label: 'Liquidity', href: '/liquidity' },
  { icon: FileText, label: 'Reconciliation', href: '/reconciliation' },
  { icon: Users, label: 'Feedback', href: '/feedback' },
  { icon: Shield, label: 'Trust Score', href: '/trust' },
  { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
];

const todayRates = [
  { pair: 'USD/KES', buy: '152.50', sell: '153.50', change: '+0.25%', up: true },
  { pair: 'EUR/KES', buy: '165.80', sell: '166.80', change: '+0.15%', up: true },
  { pair: 'GBP/KES', buy: '194.20', sell: '195.50', change: '-0.10%', up: false },
];

const reservations = [
  { id: 'RES-001', customer: 'John D.', amount: '$500', rate: '152.50', expires: '28 min', status: 'active' },
  { id: 'RES-002', customer: 'Sarah M.', amount: '$1,200', rate: '152.75', expires: '12 min', status: 'active' },
  { id: 'RES-003', customer: 'Mike K.', amount: '$350', rate: '152.50', expires: 'Expired', status: 'expired' },
];

const recentRedemptions = [
  { id: 'RED-001', customer: 'Grace W.', amount: '$500', rate: '152.50', time: '10 min ago' },
  { id: 'RED-002', customer: 'Peter O.', amount: '$1,000', rate: '153.00', time: '25 min ago' },
  { id: 'RED-003', customer: 'Anna M.', amount: '$750', rate: '152.75', time: '1 hour ago' },
];

const queue = [
  { ticket: 'Q-001', name: 'James K.', service: 'FX Exchange', wait: '2 min', status: 'waiting' },
  { ticket: 'Q-002', name: 'Mary W.', service: 'Rate Inquiry', wait: '5 min', status: 'waiting' },
  { ticket: 'Q-003', name: 'Robert M.', service: 'Redemption', wait: '8 min', status: 'waiting' },
];

export default function BDCPartnerDashboard() {
  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <aside className="w-60 bg-[#0B1020] border-r border-white/7 p-4">
        <Link href="/" className="flex items-center gap-2 mb-6 px-2">
          <CuboidLogo variant="mark" mode="light" width={28} height={28} />
          <div>
            <span className="text-lg font-semibold text-white">BDC Partner</span>
            <p className="text-xs text-[#7183A6]">KenyaForex - Nairobi</p>
          </div>
        </Link>
        
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-white font-medium">4.8 Rating</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#7183A6]">
            <Shield className="w-3 h-3 text-green-500" />
            Verified BDC
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              item.active ? 'bg-white/[0.08] text-white' : 'text-[#7183A6]'
            }`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl text-white">Branch Dashboard</h1>
            <p className="text-sm text-[#7183A6]">KenyaForex - Westlands Branch</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
              <span className="w-2 h-2 rounded-full bg-semantic-success animate-pulse" />
              <span className="text-sm text-white">Open</span>
            </div>
            <button className="p-2 rounded-xl glass text-[#7183A6]">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-5 h-5 text-semantic-success" />
              <span className="text-xs text-semantic-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <p className="text-2xl font-display text-white">$45,200</p>
            <p className="text-sm text-[#7183A6]">Today's Volume</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-5 h-5 text-[#5E8DFF]" />
            </div>
            <p className="text-2xl font-display text-white">28</p>
            <p className="text-sm text-[#7183A6]">Transactions</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-5 h-5 text-brand-light-trust" />
              <span className="text-xs text-yellow-500">3</span>
            </div>
            <p className="text-2xl font-display text-white">12</p>
            <p className="text-sm text-[#7183A6]">Active Reservations</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <QrCode className="w-5 h-5 text-[#5E8DFF]" />
            </div>
            <p className="text-2xl font-display text-white">8</p>
            <p className="text-sm text-[#7183A6]">Redemptions Today</p>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card variant="glass" className="col-span-2 p-6">
            <h2 className="text-lg font-medium text-white mb-4">Live Rates</h2>
            <div className="grid grid-cols-3 gap-4">
              {todayRates.map((rate, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{rate.pair}</span>
                    <span className={`text-xs ${rate.up ? 'text-green-500' : 'text-red-500'}`}>{rate.change}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7183A6]">Buy</span>
                      <span className="text-white">{rate.buy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7183A6]">Sell</span>
                      <span className="text-white">{rate.sell}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Queue</h2>
            <div className="space-y-2">
              {queue.map((q) => (
                <div key={q.ticket} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div>
                    <p className="text-sm text-white font-medium">{q.ticket}</p>
                    <p className="text-xs text-[#7183A6]">{q.name} • {q.service}</p>
                  </div>
                  <span className="text-xs text-[#7183A6]">{q.wait}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Active Reservations</h2>
              <button className="text-xs text-[#5E8DFF]">View all</button>
            </div>
            <div className="space-y-3">
              {reservations.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div>
                    <p className="text-sm text-white">{r.customer}</p>
                    <p className="text-xs text-[#7183A6]">{r.amount} @ {r.rate}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      r.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                    }`}>{r.expires}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Recent Redemptions</h2>
              <button className="text-xs text-[#5E8DFF]">View all</button>
            </div>
            <div className="space-y-3">
              {recentRedemptions.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div>
                    <p className="text-sm text-white">{r.customer}</p>
                    <p className="text-xs text-[#7183A6]">{r.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{r.amount}</p>
                    <p className="text-xs text-green-500">@ {r.rate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}