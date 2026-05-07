'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Wallet,
  Network,
  Lock
} from 'lucide-react';

const FXRates = [
  { pair: 'USD/NGN', buy: '1,535.40', sell: '1,542.10', change: '+1.2%', up: true },
  { pair: 'USD/GHS', buy: '15.42', sell: '15.58', change: '-0.4%', up: false },
  { pair: 'USD/KES', buy: '130.50', sell: '131.25', change: '+0.8%', up: true },
  { pair: 'EUR/USD', buy: '1.0842', sell: '1.0856', change: '+0.15%', up: true },
  { pair: 'GBP/USD', buy: '1.2650', sell: '1.2670', change: '-0.22%', up: false },
];

const metrics = [
  { label: 'Active Nodes', value: '1,204', change: '+12.4%' },
  { label: 'Verified Assets', value: '$14.2B', change: 'AUDITED' },
  { label: 'Uptime', value: '99.999%', change: 'SLA' },
  { label: 'Daily Volume', value: '$847M', change: '+8.2%' },
];

const activity = [
  { type: 'settlement', from: 'London', to: 'Lagos', amount: '$2.4M', time: '2s ago' },
  { type: 'compliance', status: 'approved', id: 'TX-8847', time: '5s ago' },
  { type: 'rate', pair: 'USD/KES', rate: '130.50', update: '8s ago' },
  { type: 'settlement', from: 'Dubai', to: 'Nairobi', amount: '$1.1M', time: '12s ago' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-[#F5F7FF] font-['Inter'] antialiased overflow-x-hidden">
      {/* Navigation - institutional, no hamburger on desktop */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[88px] bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="h-full max-w-[1600px] mx-auto px-8 lg:px-[80px] flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <CuboidLogo variant="mark" width={36} height={36} />
            <span className="text-xl font-bold tracking-tight text-[#5E8DFF]">CUBOID</span>
          </div>

          {/* Center: Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <Link href="#ecosystem" className="text-[14px] font-medium text-[#A7B3D0] hover:text-[#5E8DFF] transition-colors">Ecosystem</Link>
            <Link href="#network" className="text-[14px] font-medium text-[#A7B3D0] hover:text-[#5E8DFF] transition-colors">Network</Link>
            <Link href="#transparency" className="text-[14px] font-medium text-[#A7B3D0] hover:text-[#5E8DFF] transition-colors">Transparency</Link>
            <Link href="#compliance" className="text-[14px] font-medium text-[#A7B3D0] hover:text-[#5E8DFF] transition-colors">Compliance</Link>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="text-[14px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="h-[48px] px-6 rounded-[14px] bg-[#5E8DFF] text-[#050816] text-[14px] font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(94,141,255,0.3)]">
              Get Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - 100vh, 2-column cinematic */}
      <section className="relative min-h-screen flex items-center pt-[88px] px-8 lg:px-[80px] pb-[140px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#050816]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#5E8DFF]/3 rounded-full blur-[200px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5E8DFF]/2 rounded-full blur-[150px] translate-y-1/4" />

        <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
          {/* LEFT: Content */}
          <div className="lg:w-[45%]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#5E8DFF] animate-pulse" />
              <span className="text-[14px] font-semibold tracking-[0.18em] opacity-72 uppercase">Institutional FX Infrastructure</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[clamp(64px,8vw,110px)] font-extrabold leading-[0.92] tracking-tight text-[#F5F7FF] mb-8 max-w-[9ch]">
              African<br/>
              <span className="text-[#5E8DFF]">Liquidity</span><br/>
              Network
            </h1>

            {/* Supporting Text */}
            <p className="text-[20px] leading-[1.7] text-[#A7B3D0] opacity-82 max-w-[620px] mb-10">
              Institutional-grade foreign exchange infrastructure for Africa. 
              Real-time settlement, regulatory compliance, and treasury intelligence 
              for banks, BDCs, and enterprise treasury operations.
            </p>

            {/* Trust Metrics Row */}
            <div className="flex flex-wrap gap-8 mb-10">
              {metrics.map((m, i) => (
                <div key={i}>
                  <p className="text-[14px] font-medium text-[#A7B3D0] opacity-72 mb-1">{m.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-bold text-[#F5F7FF]">{m.value}</span>
                    <span className="text-[12px] font-medium text-[#5E8DFF]">{m.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="inline-flex items-center justify-center h-[60px] px-[32px] rounded-[18px] bg-[#5E8DFF] text-[#050816] text-[16px] font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(94,141,255,0.4)]">
                Request Institutional Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="inline-flex items-center justify-center h-[60px] px-[32px] rounded-[18px] border border-white/[0.12] bg-white/[0.04] backdrop-blur-md text-[#F5F7FF] text-[16px] font-semibold transition-all hover:bg-white/[0.08]">
                Explore Network
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-white/[0.08]">
              <span className="flex items-center gap-2 text-[13px] text-[#A7B3D0]">
                <CheckCircle className="w-4 h-4 text-[#5E8DFF]" /> SOC 2 Type II
              </span>
              <span className="flex items-center gap-2 text-[13px] text-[#A7B3D0]">
                <CheckCircle className="w-4 h-4 text-[#5E8DFF]" /> CBN Licensed
              </span>
              <span className="flex items-center gap-2 text-[13px] text-[#A7B3D0]">
                <CheckCircle className="w-4 h-4 text-[#5E8DFF]" /> 24/7 Operations
              </span>
            </div>
          </div>

          {/* RIGHT: Dashboard Preview - institutional command center */}
          <div className="lg:w-[55%] relative">
            <div className="relative bg-[#0D1326]/60 backdrop-blur-xl rounded-[24px] border border-white/[0.08] p-6 overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-[12px] font-medium text-[#A7B3D0] ml-2">TREASURY COMMAND CENTER</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E8DFF]/10 border border-[#5E8DFF]/20">
                  <span className="w-2 h-2 rounded-full bg-[#5E8DFF] animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#5E8DFF]">LIVE</span>
                </div>
              </div>

              {/* FX Rates Panel */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-[#5E8DFF]" />
                  <span className="text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider">Live Rates</span>
                </div>
                <div className="space-y-2">
                  {FXRates.map((rate, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-[12px] bg-[#121A33]/50 border border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[8px] bg-[#5E8DFF]/10 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[#5E8DFF]">{rate.pair.slice(0,3)}</span>
                        </div>
                        <span className="text-[14px] font-semibold text-[#F5F7FF]">{rate.pair}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[14px] font-mono text-[#A7B3D0]">{rate.buy}</span>
                        <span className={`text-[12px] font-medium flex items-center gap-1 ${rate.up ? 'text-green-400' : 'text-red-400'}`}>
                          {rate.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {rate.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity & Compliance Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Recent Activity */}
                <div className="p-4 rounded-[16px] bg-[#121A33]/50 border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-[#5E8DFF]" />
                    <span className="text-[12px] font-semibold text-[#A7B3D0] uppercase">Recent Activity</span>
                  </div>
                  <div className="space-y-3">
                    {activity.slice(0,3).map((a, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <span className="text-[#A7B3D0]">{a.type === 'settlement' ? a.from + ' → ' + a.to : a.type}</span>
                        <span className="text-[#5E8DFF]">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Status */}
                <div className="p-4 rounded-[16px] bg-[#121A33]/50 border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-[#5E8DFF]" />
                    <span className="text-[12px] font-semibold text-[#A7B3D0] uppercase">Compliance</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#A7B3D0]">KYC Verification</span>
                      <span className="text-[10px] font-semibold text-green-400">COMPLETE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#A7B3D0]">AML Screening</span>
                      <span className="text-[10px] font-semibold text-green-400">CLEARED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#A7B3D0]">Regulatory Reports</span>
                      <span className="text-[10px] font-semibold text-[#5E8DFF]">CURRENT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Status Strip */}
              <div className="mt-4 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Network className="w-3 h-3 text-[#5E8DFF]" />
                      <span className="text-[11px] text-[#A7B3D0]">Nodes Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-green-400" />
                      <span className="text-[11px] text-[#A7B3D0]">Latency: 12ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-[#5E8DFF]" />
                      <span className="text-[11px] text-[#A7B3D0]">Encrypted</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#A7B3D0]">Last update: just now</span>
                </div>
              </div>
            </div>

            {/* Floating operational cards */}
            <div className="absolute -right-4 top-1/4 p-4 rounded-[16px] bg-[#121A33]/80 backdrop-blur-xl border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 text-[#5E8DFF]" />
                <span className="text-[11px] font-semibold text-[#A7B3D0]">Settlement</span>
              </div>
              <p className="text-[18px] font-bold text-[#F5F7FF]">$847M</p>
              <p className="text-[10px] text-[#A7B3D0]">Daily volume</p>
            </div>

            <div className="absolute -left-6 bottom-1/3 p-4 rounded-[16px] bg-[#121A33]/80 backdrop-blur-xl border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-[#5E8DFF]" />
                <span className="text-[11px] font-semibold text-[#A7B3D0]">Corridors</span>
              </div>
              <p className="text-[18px] font-bold text-[#F5F7FF]">47</p>
              <p className="text-[10px] text-[#A7B3D0]">Active routes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-[140px] px-8 lg:px-[80px] bg-[#0D1326]">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-bold text-[#F5F7FF] mb-4">Institutional Infrastructure</h2>
            <p className="text-[18px] text-[#A7B3D0] max-w-[600px] mx-auto">Built for the demands of modern financial operations across Africa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Real-time Settlement', desc: 'Instant finality across borders with atomic swap technology.' },
              { icon: Shield, title: 'Regulatory Compliance', desc: 'Built-in KYC/AML frameworks that adapt to evolving mandates.' },
              { icon: Network, title: 'Verified Network', desc: 'Only licensed BDCs, banks, and IMTOs on our infrastructure.' },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[24px] bg-[#121A33]/50 border border-white/[0.08] hover:border-[#5E8DFF]/30 transition-all hover:bg-[#121A33]/80">
                <feature.icon className="w-10 h-10 text-[#5E8DFF] mb-4" />
                <h3 className="text-[20px] font-semibold text-[#F5F7FF] mb-3">{feature.title}</h3>
                <p className="text-[15px] text-[#A7B3D0] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[140px] px-8 lg:px-[80px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#5E8DFF]/5" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h2 className="text-[48px] font-bold text-[#F5F7FF] mb-6">Ready for Institutional Grade?</h2>
          <p className="text-[18px] text-[#A7B3D0] mb-10 max-w-[600px] mx-auto">
            Join banks, BDCs, and treasury operations across Africa using our infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center justify-center h-[60px] px-[32px] rounded-[18px] bg-[#5E8DFF] text-[#050816] text-[16px] font-semibold transition-all hover:brightness-110">
              Request Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <button className="inline-flex items-center justify-center h-[60px] px-[32px] rounded-[18px] border border-white/[0.12] bg-white/[0.04] text-[#F5F7FF] text-[16px] font-semibold transition-all hover:bg-white/[0.08]">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 lg:px-[80px] border-t border-white/[0.08] bg-[#050816]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <CuboidLogo variant="mark" width={28} height={28} />
              <span className="text-lg font-bold text-[#5E8DFF]">CUBOID</span>
            </div>
            <div className="flex items-center gap-8 text-[13px] text-[#A7B3D0]">
              <a href="#" className="hover:text-[#F5F7FF]">Network Status</a>
              <a href="#" className="hover:text-[#F5F7FF]">Terms</a>
              <a href="#" className="hover:text-[#F5F7FF]">Privacy</a>
              <a href="#" className="hover:text-[#F5F7FF]">API Docs</a>
            </div>
            <p className="text-[12px] text-[#A7B3D0]">© 2024 CUBOID. Institutional Financial Infrastructure.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}