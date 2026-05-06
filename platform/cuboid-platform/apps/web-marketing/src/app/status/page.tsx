'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Clock, RefreshCw, Activity } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#05070D]">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <CuboidLogo variant="mark" width={32} height={32} />
              <span className="text-xl font-semibold text-white">CUBOID</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="text-sm text-[#7183A6] hover:text-white">Sign in</Link>
              <Link href="/auth/signup" className="text-sm bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white px-4 py-2 rounded-xl font-medium">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-8 h-8 text-[#5E8DFF]" />
            <h1 className="text-4xl font-bold text-white">System Status</h1>
          </div>

          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl mb-8 ${operational === total ? 'bg-green-500/20 border border-green-500/30' : 'bg-yellow-500/20 border border-yellow-500/30'}`}>
            {operational === total ? <CheckCircle className="w-6 h-6 text-green-500" /> : <AlertTriangle className="w-6 h-6 text-yellow-500" />}
            <div>
              <p className="text-white font-medium">{operational === total ? 'All Systems Operational' : 'Some Systems Degraded'}</p>
              <p className="text-sm text-[#7183A6]">Last updated: Just now</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-2xl font-bold text-white">{operational}</p>
              <p className="text-sm text-green-500">Operational</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-2xl font-bold text-yellow-500">1</p>
              <p className="text-sm text-yellow-500">Degraded</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-[#7183A6]">Outage</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Services</h2>
            <div className="space-y-3">
              {services.map((service, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    {service.status === 'operational' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : service.status === 'degraded' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-white font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#7183A6]">{service.uptime}</span>
                    <span className="text-[#7183A6]">{service.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Subscribe to Updates</h2>
            <p className="text-[#7183A6] mb-4">Get notified when there are any changes to our system status.</p>
            <form className="flex gap-3">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none" />
              <button className="px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium">Subscribe</button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B1020] border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#7183A6]">© 2024 Cuboid Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}