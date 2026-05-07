'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { Activity, Server, Database, Network, Zap, Shield, Clock, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

const services = [
  { name: 'API Gateway', status: 'operational', uptime: '99.99%', latency: '45ms', region: 'Global' },
  { name: 'User Authentication', status: 'operational', uptime: '99.99%', latency: '12ms', region: 'Global' },
  { name: 'BDC Finder', status: 'operational', uptime: '99.95%', latency: '89ms', region: 'Africa' },
  { name: 'FX Rates Feed', status: 'operational', uptime: '100%', latency: '23ms', region: 'Global' },
  { name: 'Settlement Engine', status: 'operational', uptime: '99.98%', latency: '156ms', region: 'Africa' },
  { name: 'WhatsApp Bot', status: 'operational', uptime: '99.90%', latency: '234ms', region: 'Africa' },
  { name: 'Push Notifications', status: 'degraded', uptime: '98.5%', latency: '890ms', region: 'Global' },
  { name: 'Email Service', status: 'operational', uptime: '99.99%', latency: '67ms', region: 'Global' },
];

const incidents = [
  { id: 'INC-2024-001', title: 'Elevated latency in notification service', status: 'investigating', time: '2 hours ago', severity: 'warning' },
  { id: 'INC-2024-000', title: 'Scheduled maintenance completed', status: 'resolved', time: '1 day ago', severity: 'success' },
];

export default function StatusPage() {
  const operational = services.filter(s => s.status === 'operational').length;
  const total = services.length;
  const degraded = services.filter(s => s.status === 'degraded').length;

  return (
    <div className="min-h-screen bg-[#050816]">
      {/* Navigation */}
      <nav className="h-[88px] glass border-b border-white/[0.06]">
        <div className="h-full container-main flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#5E8DFF] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#050816"/>
                <path d="M2 17L12 22L22 17" stroke="#5E8DFF" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="#5E8DFF" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#F5F7FF]">CUBOID</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/auth/signin" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] hidden lg:block">Sign in</Link>
            <Link href="/auth/signup" className="btn btn-primary h-[44px] px-5 text-[14px]">Get Access</Link>
          </div>
        </div>
      </nav>

      <main className="pt-[88px] pb-[140px]">
        <div className="container-main">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#A7B3D0] hover:text-[#F5F7FF] mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <Activity className="w-8 h-8 text-[#5E8DFF]" />
            <h1 className="text-h1 text-[#F5F7FF]">Network Status</h1>
          </div>

          {/* Overall Status */}
          <div className={`flex items-center gap-4 p-6 rounded-[20px] mb-10 ${degraded > 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
            {degraded > 0 ? (
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            ) : (
              <CheckCircle className="w-6 h-6 text-green-400" />
            )}
            <div>
              <p className="text-[18px] font-semibold text-[#F5F7FF]">
                {degraded > 0 ? 'Some Systems Degraded' : 'All Systems Operational'}
              </p>
              <p className="text-[14px] text-[#A7B3D0]">Last updated: just now</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <p className="text-[36px] font-bold text-green-400">{operational}</p>
              <p className="text-[13px] font-medium text-[#A7B3D0] uppercase tracking-wide">Operational</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-[36px] font-bold text-yellow-400">{degraded}</p>
              <p className="text-[13px] font-medium text-[#A7B3D0] uppercase tracking-wide">Degraded</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-[36px] font-bold text-[#F5F7FF]">0</p>
              <p className="text-[13px] font-medium text-[#A7B3D0] uppercase tracking-wide">Outage</p>
            </div>
          </div>

          {/* Services */}
          <section className="mb-12">
            <h2 className="text-h3 text-[#F5F7FF] mb-6">Services</h2>
            <div className="space-y-3">
              {services.map((service, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-[16px] bg-[#0D1326]/60 border border-white/[0.06]">
                  <div className="flex items-center gap-4">
                    {service.status === 'operational' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                    <div>
                      <p className="text-[16px] font-semibold text-[#F5F7FF]">{service.name}</p>
                      <p className="text-[12px] text-[#A7B3D0]">{service.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-[14px]">
                    <span className="font-mono text-[#A7B3D0]">{service.uptime}</span>
                    <span className="font-mono text-[#A7B3D0]">{service.latency}</span>
                    <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${service.status === 'operational' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Incidents */}
          <section className="mb-12">
            <h2 className="text-h3 text-[#F5F7FF] mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident, i) => (
                <div key={i} className="p-6 rounded-[16px] bg-[#0D1326]/60 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-mono text-[#A7B3D0]">{incident.id}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${incident.severity === 'warning' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                        {incident.status}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#A7B3D0]">{incident.time}</span>
                  </div>
                  <p className="text-[15px] font-medium text-[#F5F7FF]">{incident.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Subscribe */}
          <div className="glass-card p-8">
            <h3 className="text-h4 text-[#F5F7FF] mb-2">Subscribe to updates</h3>
            <p className="text-[14px] text-[#A7B3D0] mb-5">Get notified when there are changes to our network status.</p>
            <div className="flex gap-4">
              <input type="email" placeholder="your@email.com" className="input flex-1" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/[0.06]">
        <div className="container-main">
          <p className="text-[13px] text-[#A7B3D0] text-center">© 2024 CUBOID. Institutional Financial Infrastructure.</p>
        </div>
      </footer>
    </div>
  );
}