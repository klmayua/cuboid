import { ControlTowerSidebar } from '@/components/Sidebar';
import { Card } from '@cuboid/design-system';
import { 
  Activity, Users, DollarSign, AlertTriangle, CheckCircle, XCircle, 
  TrendingUp, Clock, RefreshCw, Globe
} from 'lucide-react';

export default function OpsDashboard() {
  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <ControlTowerSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display text-white mb-2">Operations Dashboard</h1>
            <p className="text-[#7183A6]">Real-time platform monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
              <span className="w-2 h-2 rounded-full bg-semantic-success animate-pulse" />
              <span className="text-sm text-white">All Systems Operational</span>
            </div>
            <button className="p-2 rounded-xl glass text-[#7183A6]">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-5 h-5 text-brand-light-trust" />
              <span className="text-xs text-semantic-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5.2%
              </span>
            </div>
            <p className="text-2xl font-display text-white">1,247</p>
            <p className="text-sm text-[#7183A6]">Transactions/hour</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-5 h-5 text-semantic-success" />
            </div>
            <p className="text-2xl font-display text-white">$2.4M</p>
            <p className="text-sm text-[#7183A6]">Volume today</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-5 h-5 text-brand-light-trust" />
            </div>
            <p className="text-2xl font-display text-white">892</p>
            <p className="text-sm text-[#7183A6]">Active users</p>
          </Card>

          <Card variant="glass" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="w-5 h-5 text-semantic-warning" />
              <span className="text-xs text-semantic-danger">3</span>
            </div>
            <p className="text-2xl font-display text-white">0.12%</p>
            <p className="text-sm text-[#7183A6]">Failure rate</p>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card variant="glass" className="col-span-2 p-6">
            <h2 className="text-lg font-medium text-white mb-4">Live Transactions</h2>
            <div className="space-y-3">
              {[
                { id: 'TXN-001', user: 'john@acme.com', amount: '$5,000', route: 'USA → NGA', status: 'settled', time: '2s ago' },
                { id: 'TXN-002', user: 'sarah@global.com', amount: '$12,500', route: 'UK → KEN', status: 'processing', time: '15s ago' },
                { id: 'TXN-003', user: 'mike@trade.io', amount: '$8,200', route: 'USA → GHA', status: 'pending', time: '30s ago' },
              ].map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      tx.status === 'settled' ? 'bg-semantic-success' :
                      tx.status === 'processing' ? 'bg-semantic-warning animate-pulse' :
                      'bg-[#7183A6]'
                    }`} />
                    <div>
                      <p className="text-sm text-white">{tx.user}</p>
                      <p className="text-xs text-[#7183A6]">{tx.id} • {tx.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{tx.amount}</p>
                    <p className="text-xs text-[#7183A6]">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Partner Health</h2>
            <div className="space-y-3">
              {[
                { name: 'Global Bank', status: 'healthy', uptime: '99.99%', latency: '45ms' },
                { name: 'FastPay', status: 'healthy', uptime: '99.95%', latency: '120ms' },
                { name: 'Africa FX', status: 'degraded', uptime: '98.5%', latency: '340ms' },
              ].map((partner) => (
                <div key={partner.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <div className="flex items-center gap-2">
                    {partner.status === 'healthy' ? (
                      <CheckCircle className="w-4 h-4 text-semantic-success" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-semantic-warning" />
                    )}
                    <span className="text-sm text-white">{partner.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white">{partner.uptime}</p>
                    <p className="text-xs text-[#7183A6]">{partner.latency}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Corridor Activity</h2>
            <div className="space-y-2">
              {[
                { from: 'USA', to: 'Nigeria', volume: '$850K', tps: '45' },
                { from: 'UK', to: 'Kenya', volume: '$420K', tps: '22' },
                { from: 'USA', to: 'Ghana', volume: '$280K', tps: '15' },
              ].map((c) => (
                <div key={`${c.from}-${c.to}`} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#7183A6]" />
                    <span className="text-sm text-white">{c.from} → {c.to}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#7183A6]">{c.volume}</span>
                    <span className="text-xs text-[#7183A6]">{c.tps} tps</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <h2 className="text-lg font-medium text-white mb-4">Compliance Queue</h2>
            <div className="space-y-3">
              {[
                { type: 'KYC Review', count: 12, severity: 'high' },
                { type: 'AML Alert', count: 3, severity: 'critical' },
                { type: 'Dispute', count: 7, severity: 'medium' },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04]">
                  <span className="text-sm text-white">{item.type}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      item.severity === 'critical' ? 'text-semantic-danger' :
                      item.severity === 'high' ? 'text-semantic-warning' :
                      'text-white'
                    }`}>{item.count}</span>
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