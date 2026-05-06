'use client';

import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';
import { Card } from '@cuboid/design-system';
import { 
  Globe, TrendingUp, AlertTriangle, Shield, Eye, FileText, 
  Download, BarChart3, MapPin, Activity, DollarSign, Users,
  CheckCircle, XCircle, Clock, Filter, Search, Calendar
} from 'lucide-react';

const navItems = [
  { icon: Activity, label: 'Dashboard', href: '/', active: true },
  { icon: Globe, label: 'Corridors', href: '/corridors' },
  { icon: BarChart3, label: 'Volume', href: '/volume' },
  { icon: Eye, label: 'Watchlist', href: '/watchlist' },
  { icon: Shield, label: 'Compliance', href: '/compliance' },
  { icon: FileText, label: 'Reports', href: '/reports' },
];

const corridors = [
  { from: 'USA', to: 'Kenya', volume: '$850M', growth: '+18%', txns: 125000, avgSize: '$6,800', risk: 'low' },
  { from: 'UK', to: 'Nigeria', volume: '$720M', growth: '+12%', txns: 98000, avgSize: '$7,300', risk: 'low' },
  { from: 'UAE', to: 'Kenya', volume: '$420M', growth: '+25%', txns: 45000, avgSize: '$9,300', risk: 'medium' },
  { from: 'EU', to: 'Ghana', volume: '$280M', growth: '+15%', txns: 38000, avgSize: '$7,400', risk: 'low' },
  { from: 'USA', to: 'Uganda', volume: '$180M', growth: '+8%', txns: 22000, avgSize: '$8,200', risk: 'low' },
];

const suspiciousPatterns = [
  { id: 'SP-001', pattern: 'Structuring', count: 12, volume: '$45,000', severity: 'high', date: '2024-01-15' },
  { id: 'SP-002', pattern: 'Rapid movement', count: 8, volume: '$120,000', severity: 'critical', date: '2024-01-14' },
  { id: 'SP-003', pattern: 'Circle detection', count: 5, volume: '$85,000', severity: 'medium', date: '2024-01-13' },
];

const alerts = [
  { type: 'Volume spike', corridor: 'USA→Kenya', severity: 'warning', time: '2h ago' },
  { type: 'New BDC registered', location: 'Nairobi', severity: 'info', time: '4h ago' },
  { type: 'Compliance threshold', partner: 'FastPay', severity: 'critical', time: '6h ago' },
];

export default function RegulatorDashboard() {
  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <aside className="w-56 bg-[#0B1020] border-r border-white/7 p-4">
        <Link href="/" className="flex items-center gap-2 mb-8 px-2">
          <CuboidLogo variant="mark" mode="light" width={28} height={28} />
          <span className="text-lg font-semibold text-white">Regulator</span>
        </Link>
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
            <h1 className="text-2xl text-white">Regulatory Dashboard</h1>
            <p className="text-sm text-[#7183A6]">Financial Intelligence Unit View</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-white">
              <Calendar className="w-4 h-4" /> Last 30 days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#5E8DFF] rounded-xl text-sm text-white">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-5 h-5 text-semantic-success" />
              <span className="text-xs text-semantic-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +15%
              </span>
            </div>
            <p className="text-2xl font-display text-white">$2.45B</p>
            <p className="text-sm text-[#7183A6]">Total Volume</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-5 h-5 text-[#5E8DFF]" />
            </div>
            <p className="text-2xl font-display text-white">328K</p>
            <p className="text-sm text-[#7183A6]">Transactions</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-5 h-5 text-brand-light-trust" />
            </div>
            <p className="text-2xl font-display text-white">2,847</p>
            <p className="text-sm text-[#7183A6]">Active BDCs</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="w-5 h-5 text-semantic-warning" />
              <span className="text-xs text-semantic-danger">3</span>
            </div>
            <p className="text-2xl font-display text-white">0.08%</p>
            <p className="text-sm text-[#7183A6]">Suspicious Rate</p>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card variant="glass" className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Corridor Activity</h2>
              <button className="text-xs text-[#5E8DFF]">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-[#7183A6] border-b border-white/10">
                    <th className="pb-3">Corridor</th>
                    <th className="pb-3">Volume</th>
                    <th className="pb-3">Growth</th>
                    <th className="pb-3">Txns</th>
                    <th className="pb-3">Avg Size</th>
                    <th className="pb-3">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {corridors.map((c) => (
                    <tr key={`${c.from}-${c.to}`} className="border-b border-white/5">
                      <td className="py-3 text-sm text-white flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#7183A6]" /> {c.from} → {c.to}
                      </td>
                      <td className="py-3 text-sm text-white">{c.volume}</td>
                      <td className="py-3 text-sm text-semantic-success">{c.growth}</td>
                      <td className="py-3 text-sm text-[#7183A6]">{c.txns.toLocaleString()}</td>
                      <td className="py-3 text-sm text-[#7183A6]">{c.avgSize}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          c.risk === 'low' ? 'bg-green-500/20 text-green-500' :
                          c.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>{c.risk}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04]">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                    alert.severity === 'critical' ? 'text-red-500' :
                    alert.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm text-white">{alert.type}</p>
                    <p className="text-xs text-[#7183A6]">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Suspicious Patterns</h2>
            <div className="space-y-3">
              {suspiciousPatterns.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div>
                    <p className="text-sm text-white">{p.pattern}</p>
                    <p className="text-xs text-[#7183A6]">{p.id} • {p.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{p.volume}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      p.severity === 'critical' ? 'bg-red-500/20 text-red-500' :
                      p.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>{p.severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Liquidity Heatmap</h2>
            <div className="grid grid-cols-3 gap-2">
              {['Nairobi', 'Mombasa', 'Kisumu', 'Lagos', 'Abuja', 'Accra', 'Kampala', 'Dar es Salaam', 'Johannesburg'].map((city) => (
                <div key={city} className="p-3 rounded-lg bg-white/[0.04] text-center">
                  <p className="text-xs text-white">{city}</p>
                  <p className="text-sm font-medium text-[#5E8DFF]">{Math.floor(Math.random() * 100)}%</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}