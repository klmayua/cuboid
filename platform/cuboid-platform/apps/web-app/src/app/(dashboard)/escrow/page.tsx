import Link from 'next/link';
import { Card } from '@cuboid/design-system';
import { Shield, Plus, Clock, CheckCircle, AlertTriangle, MoreHorizontal } from 'lucide-react';

export default function EscrowPage() {
  const escrows = [
    { id: 'ESC-001', to: 'Trade Payment', amount: '$25,000.00', conditions: 3, fulfilled: 1, status: 'active', created: '2024-01-14' },
    { id: 'ESC-002', to: 'Invoice #1234', amount: '$10,000.00', conditions: 2, fulfilled: 2, status: 'releasable', created: '2024-01-10' },
    { id: 'ESC-003', to: 'Product Shipment', amount: '$5,000.00', conditions: 4, fulfilled: 0, status: 'active', created: '2024-01-08' },
  ];

  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <div className="fixed left-0 top-0 w-64 bg-[#0B1020] border-r border-white/7 p-4">
        <div className="mb-8 px-2"><span className="text-lg font-semibold text-white">CUBOID</span></div>
        <nav className="space-y-1">
          {[{ label: 'Dashboard', href: '/dashboard', icon: '📊' }, { label: 'Wallets', href: '/wallets', icon: '💳' }, { label: 'Transfer', href: '/transfer', icon: '📤' }, { label: 'Activity', href: '/activity', icon: '📋' }, { label: 'Escrow', href: '/escrow', icon: '🛡️', active: true }].map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${item.active ? 'bg-white/[0.08] text-white' : 'text-[#7183A6]'}`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl text-white">Escrow</h1><p className="text-sm text-[#7183A6]">Secure conditional payments</p></div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl text-sm">
            <Plus className="w-4 h-4" />Create Escrow
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card variant="glass" className="p-4">
            <Shield className="w-5 h-5 text-semantic-escrow mb-2" />
            <p className="text-2xl text-white">$40,000</p>
            <p className="text-xs text-[#7183A6]">Total in Escrow</p>
          </Card>
          <Card variant="glass" className="p-4">
            <Clock className="w-5 h-5 text-semantic-warning mb-2" />
            <p className="text-2xl text-white">2</p>
            <p className="text-xs text-[#7183A6]">Pending Release</p>
          </Card>
          <Card variant="glass" className="p-4">
            <CheckCircle className="w-5 h-5 text-semantic-success mb-2" />
            <p className="text-2xl text-white">15</p>
            <p className="text-xs text-[#7183A6]">Completed</p>
          </Card>
        </div>

        <Card variant="glass" className="p-0">
          <div className="p-4 border-b border-white/7"><h2 className="text-lg text-white">Active Escrows</h2></div>
          {escrows.map((escrow, i) => (
            <div key={escrow.id} className="p-4 border-b border-white/4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  escrow.status === 'releasable' ? 'bg-semantic-success/10' : 'bg-semantic-escrow/10'
                }`}>
                  <Shield className={`w-5 h-5 ${escrow.status === 'releasable' ? 'text-semantic-success' : 'text-semantic-escrow'}`} />
                </div>
                <div>
                  <p className="text-sm text-white">{escrow.to}</p>
                  <p className="text-xs text-[#7183A6]">{escrow.id} • Created {escrow.created}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-white">{escrow.amount}</p>
                  <p className="text-xs text-[#7183A6]">{escrow.fulfilled}/{escrow.conditions} conditions</p>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  escrow.status === 'active' ? 'bg-semantic-escrow/10 text-semantic-escrow' :
                  escrow.status === 'releasable' ? 'bg-semantic-success/10 text-semantic-success' :
                  'bg-semantic-warning/10 text-semantic-warning'
                }`}>
                  {escrow.status}
                </div>
                <button className="p-2 rounded-lg hover:bg-white/[0.04]">
                  <MoreHorizontal className="w-4 h-4 text-[#7183A6]" />
                </button>
              </div>
            </div>
          ))}
        </Card>
      </main>
    </div>
  );
}