import Link from 'next/link';
import { Card } from '@cuboid/design-system';
import { Wallet, Plus, Send, ArrowDownLeft, Search, Filter } from 'lucide-react';

export default function WalletsPage() {
  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <div className="fixed left-0 top-0 w-64 bg-[#0B1020] border-r border-white/7 p-4">
        <div className="mb-8 px-2"><span className="text-lg font-semibold text-white">CUBOID</span></div>
        <nav className="space-y-1">
          {[{ label: 'Dashboard', href: '/dashboard', icon: '📊' }, { label: 'Wallets', href: '/wallets', icon: '💳', active: true }, { label: 'Transfer', href: '/transfer', icon: '📤' }, { label: 'Activity', href: '/activity', icon: '📋' }, { label: 'Trust', href: '/trust', icon: '🛡️' }].map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${item.active ? 'bg-white/[0.08] text-white' : 'text-[#7183A6]'}`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl text-white">Wallets</h1><p className="text-sm text-[#7183A6]">Manage your wallets and balances</p></div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl"><Plus className="w-4 h-4" />Create Wallet</button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl flex-1"><Search className="w-4 h-4 text-[#7183A6]" /><input placeholder="Search wallets..." className="bg-transparent border-none text-white placeholder-[#7183A6] outline-none flex-1" /></div>
          <button className="p-2 glass rounded-xl text-[#7183A6]"><Filter className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{ currency: 'USD', balance: '85,000.00', available: '85,000.00', type: 'Operational' }, { currency: 'GBP', balance: '42,500.00', available: '42,500.00', type: 'Operational' }, { currency: 'NGN', balance: '12,750,000', available: '12,500,000', type: 'Escrow' }].map((w, i) => (
            <Card key={i} variant="glass" className="p-5">
              <div className="flex items-center justify-between mb-4"><span className="text-lg font-medium text-white">{w.currency}</span><span className="text-xs px-2 py-1 rounded-full bg-white/[0.08] text-[#7183A6]">{w.type}</span></div>
              <p className="text-2xl text-white mb-2">${w.balance}</p>
              <p className="text-sm text-[#7183A6]">Available: ${w.available}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}