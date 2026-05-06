import Link from 'next/link';
import { Card } from '@cuboid/design-system';
import { ArrowRight, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function TransferPage() {
  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <div className="fixed left-0 top-0 w-64 bg-[#0B1020] border-r border-white/7 p-4">
        <div className="mb-8 px-2"><span className="text-lg font-semibold text-white">CUBOID</span></div>
        <nav className="space-y-1">
          {[{ label: 'Dashboard', href: '/dashboard', icon: '📊' }, { label: 'Wallets', href: '/wallets', icon: '💳' }, { label: 'Transfer', href: '/transfer', icon: '📤', active: true }, { label: 'Activity', href: '/activity', icon: '📋' }, { label: 'Escrow', href: '/escrow', icon: '🛡️' }].map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${item.active ? 'bg-white/[0.08] text-white' : 'text-[#7183A6]'}`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8"><h1 className="text-2xl text-white">Send Money</h1><p className="text-sm text-[#7183A6]">Transfer funds globally</p></div>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <Card variant="glass" className="p-6">
              <h2 className="text-lg text-white mb-6">Transfer Details</h2>
              <div className="space-y-4">
                <div><label className="text-sm text-[#7183A6]">From Wallet</label>
                  <select className="w-full mt-1 p-3 rounded-xl bg-white/[0.08] border border-white/12 text-white">
                    <option>USD Wallet — $85,000.00</option>
                    <option>GBP Wallet — $42,500.00</option>
                  </select>
                </div>
                <div><label className="text-sm text-[#7183A6]">Amount</label>
                  <input type="text" placeholder="0.00" className="w-full mt-1 p-3 rounded-xl bg-white/[0.08] border border-white/12 text-white" />
                </div>
                <div><label className="text-sm text-[#7183A6]">Recipient Country</label>
                  <select className="w-full mt-1 p-3 rounded-xl bg-white/[0.08] border border-white/12 text-white">
                    <option>Nigeria</option>
                    <option>Kenya</option>
                    <option>Ghana</option>
                    <option>UK</option>
                  </select>
                </div>
                <div><label className="text-sm text-[#7183A6]">Bank Name</label>
                  <input type="text" placeholder="Enter bank name" className="w-full mt-1 p-3 rounded-xl bg-white/[0.08] border border-white/12 text-white" />
                </div>
                <div><label className="text-sm text-[#7183A6]">Account Number</label>
                  <input type="text" placeholder="0000000000" className="w-full mt-1 p-3 rounded-xl bg-white/[0.08] border border-white/12 text-white" />
                </div>
                <div><label className="text-sm text-[#7183A6]">Account Name</label>
                  <input type="text" placeholder="Recipient name" className="w-full mt-1 p-3 rounded-xl bg-white/[0.08] border border-white/12 text-white" />
                </div>
                <button className="w-full py-4 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl font-medium">
                  Continue
                </button>
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card variant="glass" className="p-5">
              <h3 className="text-sm text-[#7183A6] mb-3">Quick Send</h3>
              <div className="space-y-2">
                {[{ name: 'Acme Corp', amount: '$5,000' }, { name: 'Global Ltd', amount: '$12,500' }, { name: 'Trade Co', amount: '$8,200' }].map((r, i) => (
                  <div key={i} className="flex justify-between p-2 rounded-lg bg-white/[0.04] cursor-pointer hover:bg-white/[0.06]">
                    <span className="text-sm text-white">{r.name}</span>
                    <span className="text-sm text-[#7183A6]">{r.amount}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card variant="glass" className="p-5">
              <h3 className="text-sm text-[#7183A6] mb-3">Estimated Fees</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white">Transfer Fee</span><span className="text-white">$25.00</span></div>
                <div className="flex justify-between"><span className="text-white">Exchange Fee</span><span className="text-white">$12.50</span></div>
                <div className="border-t border-white/7 pt-2 flex justify-between font-medium">
                  <span className="text-white">Total</span><span className="text-white">$37.50</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}