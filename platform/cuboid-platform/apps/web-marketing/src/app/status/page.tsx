'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Activity } from 'lucide-react';

const services = [
  { name: 'API Gateway', status: 'operational', uptime: '99.99%', latency: '45ms' },
  { name: 'User Authentication', status: 'operational', uptime: '99.99%', latency: '12ms' },
  { name: 'BDC Finder', status: 'operational', uptime: '99.95%', latency: '89ms' },
  { name: 'FX Rates', status: 'operational', uptime: '100%', latency: '23ms' },
  { name: 'Settlement Engine', status: 'operational', uptime: '99.98%', latency: '156ms' },
  { name: 'WhatsApp Bot', status: 'operational', uptime: '99.90%', latency: '234ms' },
  { name: 'Push Notifications', status: 'degraded', uptime: '98.5%', latency: '890ms' },
  { name: 'Email Service', status: 'operational', uptime: '99.99%', latency: '67ms' },
];

export default function StatusPage() {
  const operational = services.filter(s => s.status === 'operational').length;
  const total = services.length;
  const degraded = services.filter(s => s.status === 'degraded').length;

  return (
    <div className="min-h-screen bg-[#0b1326]">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-lg px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <CuboidLogo variant="mark" width={32} height={32} />
              <span className="text-xl font-semibold text-[#dae2fd]">CUBOID FX</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="text-sm text-[#bec8d2] hover:text-[#dae2fd]">Sign in</Link>
              <Link href="/auth/signup" className="text-sm bg-[#0ea5e9] text-[#00344d] px-4 py-2 rounded-lg font-semibold">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#bec8d2] hover:text-[#dae2fd] mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-8 h-8 text-[#89ceff]" />
            <h1 className="text-4xl font-bold text-[#dae2fd]">Network Health Status</h1>
          </div>

          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl mb-8 ${operational === total ? 'bg-[#89ceff]/10 border border-[#89ceff]/30' : 'bg-[#4edea3]/10 border border-[#4edea3]/30'}`}>
            {operational === total ? <CheckCircle className="w-6 h-6 text-[#89ceff]" /> : <AlertTriangle className="w-6 h-6 text-[#4edea3]" />}
            <div>
              <p className="text-[#dae2fd] font-semibold">{operational === total ? 'All Systems Operational' : 'Some Systems Degraded'}</p>
              <p className="text-sm text-[#bec8d2]">Last updated: Just now</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-[#89ceff]">{operational}</p>
              <p className="text-sm text-[#89ceff]">Operational</p>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-[#4edea3]">{degraded}</p>
              <p className="text-sm text-[#4edea3]">Degraded</p>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-[#dae2fd]">0</p>
              <p className="text-sm text-[#bec8d2]">Outage</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-[#dae2fd] mb-4">Services</h2>
            <div className="space-y-3">
              {services.map((service, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[#171f33] border border-white/10">
                  <div className="flex items-center gap-3">
                    {service.status === 'operational' ? (
                      <CheckCircle className="w-5 h-5 text-[#89ceff]" />
                    ) : service.status === 'degraded' ? (
                      <AlertTriangle className="w-5 h-5 text-[#4edea3]" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-[#dae2fd] font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#bec8d2] font-mono">{service.uptime}</span>
                    <span className="text-[#bec8d2] font-mono">{service.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 p-6 rounded-lg bg-[#171f33] border border-white/10">
            <h2 className="text-lg font-bold text-[#dae2fd] mb-4">Subscribe to Updates</h2>
            <p className="text-[#bec8d2] mb-4">Get notified when there are any changes to our network status.</p>
            <form className="flex gap-3">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-lg bg-[#131b2e] border border-white/10 text-[#dae2fd] placeholder-[#bec8d2] focus:border-[#89ceff] outline-none" />
              <button className="px-6 py-3 bg-[#0ea5e9] text-[#00344d] rounded-lg font-semibold hover:brightness-110 transition-all">Subscribe</button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-[#060e20] border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#bec8d2]">© 2024 CUBOID FX NETWORK. INSTITUTIONAL GRADE LIQUIDITY.</p>
        </div>
      </footer>
    </div>
  );
}