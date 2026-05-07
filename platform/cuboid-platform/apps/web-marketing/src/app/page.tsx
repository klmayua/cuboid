'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  BarChart3,
  Wallet,
  Network,
  Lock,
  CheckCircle,
  Server,
  Database,
  Clock,
  Bell,
  Search,
  Users,
  Building2,
  FileText,
  Link2,
  MapPin
} from 'lucide-react';

const FX_RATES = [
  { pair: 'USD/NGN', buy: '1,535.40', sell: '1,542.10', change: '+1.2%', up: true, flag: '🇳🇬' },
  { pair: 'USD/GHS', buy: '15.42', sell: '15.58', change: '-0.4%', up: false, flag: '🇬🇭' },
  { pair: 'USD/KES', buy: '130.50', sell: '131.25', change: '+0.8%', up: true, flag: '🇰🇪' },
  { pair: 'EUR/USD', buy: '1.0842', sell: '1.0856', change: '+0.15%', up: true, flag: '🇪🇺' },
  { pair: 'GBP/USD', buy: '1.2650', sell: '1.2670', change: '-0.22%', up: false, flag: '🇬🇧' },
  { pair: 'USD/ZAR', buy: '18.42', sell: '18.58', change: '+0.6%', up: true, flag: '🇿🇦' },
];

const METRICS = [
  { label: 'Daily Volume', value: '$847M', change: '+8.2%', icon: Wallet },
  { label: 'Active Nodes', value: '1,204', change: '+12.4%', icon: Network },
  { label: 'Settlement Time', value: '<2s', change: 'REAL-TIME', icon: Zap },
  { label: 'Uptime', value: '99.999%', change: 'SLA', icon: Server },
];

const ACTIVITY = [
  { type: 'settlement', from: 'London', to: 'Lagos', amount: '$2.4M', time: '2s ago', status: 'complete' },
  { type: 'compliance', action: 'KYC Approved', id: 'TX-8847', time: '5s ago', status: 'approved' },
  { type: 'rate', pair: 'USD/KES', rate: '130.50', time: '8s ago', status: 'updated' },
  { type: 'settlement', from: 'Dubai', to: 'Nairobi', amount: '$1.1M', time: '12s ago', status: 'complete' },
  { type: 'compliance', action: 'AML Clear', id: 'TX-8848', time: '18s ago', status: 'approved' },
  { type: 'rate', pair: 'EUR/USD', rate: '1.0842', time: '24s ago', status: 'updated' },
];

const CORRIDORS = [
  { from: 'USA', to: 'Nigeria', volume: '$2.4B', partners: '24', latency: '1.2s' },
  { from: 'UK', to: 'Kenya', volume: '$1.8B', partners: '18', latency: '0.8s' },
  { from: 'UAE', to: 'Ghana', volume: '$890M', partners: '12', latency: '1.5s' },
  { from: 'EU', to: 'South Africa', volume: '$650M', partners: '15', latency: '1.1s' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-[#F5F7FF] font-['Inter'] overflow-x-hidden">
      
      {/* ========== NAVIGATION ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[88px] glass border-b border-white/[0.06]">
        <div className="h-full container-main flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#5E8DFF] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#050816"/>
                <path d="M2 17L12 22L22 17" stroke="#5E8DFF" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="#5E8DFF" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">CUBOID</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            <Link href="#ecosystem" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] transition-colors">Ecosystem</Link>
            <Link href="#network" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] transition-colors">Network</Link>
            <Link href="#solutions" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] transition-colors">Solutions</Link>
            <Link href="#compliance" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] transition-colors">Compliance</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <Link href="/auth/signin" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] hidden lg:block transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="btn btn-primary">
              Get Access
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen pt-[88px] pb-[140px] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#050816]" />
        <div className="absolute top-0 right-[10%] w-[1000px] h-[1000px] bg-[#5E8DFF]/8 rounded-full blur-[300px]" />
        <div className="absolute bottom-0 left-[5%] w-[600px] h-[600px] bg-[#5E8DFF]/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[80px] items-center">
            
            {/* LEFT COLUMN - Content */}
            <div className="max-w-[700px]">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#5E8DFF] animate-pulse-slow" />
                <span className="text-[13px] font-semibold tracking-[0.2em] text-[#A7B3D0] opacity-80 uppercase">African Financial Infrastructure</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-display mb-8 text-[#F5F7FF]">
                Continental<br />
                <span className="text-[#5E8DFF]">Liquidity</span><br />
                Network
              </h1>

              {/* Subheading */}
              <p className="text-body-lg text-[#A7B3D0] mb-10 max-w-[600px] opacity-85">
                Institutional-grade foreign exchange infrastructure for Africa. 
                Real-time settlement, regulatory compliance, and treasury intelligence 
                for banks, BDCs, and enterprise operations.
              </p>

              {/* Metrics Row */}
              <div className="flex flex-wrap gap-x-12 gap-y-6 mb-12">
                {METRICS.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <m.icon className="w-4 h-4 text-[#5E8DFF]" />
                      <span className="text-[12px] font-medium text-[#A7B3D0] uppercase tracking-wide">{m.label}</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[32px] font-bold text-[#F5F7FF]">{m.value}</span>
                      <span className="text-[12px] font-semibold text-[#5E8DFF]">{m.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/auth/signup" className="btn btn-primary">
                  Request Institutional Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="btn btn-secondary">
                  Explore Network
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/[0.06]">
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

            {/* RIGHT COLUMN - Dashboard Preview */}
            <div className="relative">
              {/* Main Dashboard */}
              <div className="glass-card p-8 relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[13px] font-medium text-[#A7B3D0]">TREASURY COMMAND CENTER</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5E8DFF]/10 border border-[#5E8DFF]/20">
                    <span className="w-2 h-2 rounded-full bg-[#5E8DFF] animate-pulse" />
                    <span className="text-[11px] font-bold text-[#5E8DFF]">LIVE</span>
                  </div>
                </div>

                {/* FX Rates */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-4 h-4 text-[#5E8DFF]" />
                    <span className="text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider">Live Rates</span>
                  </div>
                  <div className="space-y-2">
                    {FX_RATES.map((rate, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-[12px] bg-[#0D1326]/80 border border-white/[0.04] hover:border-[#5E8DFF]/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="text-xl">{rate.flag}</span>
                          <div>
                            <span className="text-[15px] font-semibold text-[#F5F7FF]">{rate.pair}</span>
                            <span className="text-[11px] text-[#A7B3D0] ml-2">Institutional</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className="text-[14px] font-mono text-[#A7B3D0]">{rate.buy}</span>
                          </div>
                          <span className={`text-[12px] font-semibold flex items-center gap-1 ${rate.up ? 'text-green-400' : 'text-red-400'}`}>
                            {rate.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {rate.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity & Status Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Recent Activity */}
                  <div className="p-5 rounded-[16px] bg-[#0D1326]/80 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-4 h-4 text-[#5E8DFF]" />
                      <span className="text-[12px] font-semibold text-[#A7B3D0] uppercase">Recent Activity</span>
                    </div>
                    <div className="space-y-3">
                      {ACTIVITY.slice(0, 4).map((a, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                          <span className="text-[#A7B3D0]">{a.type === 'settlement' ? `${a.from} → ${a.to}` : a.type === 'compliance' ? a.action : a.pair}</span>
                          <span className="text-[#5E8DFF]">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compliance */}
                  <div className="p-5 rounded-[16px] bg-[#0D1326]/80 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-4 h-4 text-[#5E8DFF]" />
                      <span className="text-[12px] font-semibold text-[#A7B3D0] uppercase">Compliance</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#A7B3D0]">KYC Verification</span>
                        <span className="text-[10px] font-bold text-green-400">COMPLETE</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#A7B3D0]">AML Screening</span>
                        <span className="text-[10px] font-bold text-green-400">CLEARED</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#A7B3D0]">Regulatory Reports</span>
                        <span className="text-[10px] font-bold text-[#5E8DFF]">CURRENT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Status */}
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Network className="w-3 h-3 text-[#5E8DFF]" />
                        <span className="text-[11px] text-[#A7B3D0]">1,204 Nodes Online</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-green-400" />
                        <span className="text-[11px] text-[#A7B3D0]">12ms Latency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-[#5E8DFF]" />
                        <span className="text-[11px] text-[#A7B3D0]">AES-256 Encrypted</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#A7B3D0]">Updated: just now</span>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -right-6 top-[15%] p-5 rounded-[16px] glass-card">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-[#5E8DFF]" />
                  <span className="text-[11px] font-semibold text-[#A7B3D0]">Daily Volume</span>
                </div>
                <p className="text-[24px] font-bold text-[#F5F7FF]">$847M</p>
                <p className="text-[10px] text-green-400">+8.2% vs yesterday</p>
              </div>

              <div className="absolute -left-6 bottom-[25%] p-5 rounded-[16px] glass-card">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-[#5E8DFF]" />
                  <span className="text-[11px] font-semibold text-[#A7B3D0]">Active Corridors</span>
                </div>
                <p className="text-[24px] font-bold text-[#F5F7FF]">47</p>
                <p className="text-[10px] text-[#A7B3D0]">Routes operational</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CORRIDORS SECTION ========== */}
      <section id="network" className="py-[140px] bg-[#0D1326]">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-caption text-[#5E8DFF] mb-4 block">ACTIVE CORRIDORS</span>
            <h2 className="text-h1 text-[#F5F7FF] mb-4">Liquidity Routes</h2>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-80">High-volume remittance corridors powered by institutional infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORRIDORS.map((c, i) => (
              <div key={i} className="glass-card p-6 hover:border-[#5E8DFF]/30 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#5E8DFF]" />
                  <span className="text-[16px] font-semibold text-[#F5F7FF]">{c.from} → {c.to}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#A7B3D0]">Volume (Monthly)</span>
                    <span className="text-[14px] font-bold text-[#F5F7FF]">{c.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#A7B3D0]">Partners</span>
                    <span className="text-[14px] font-semibold text-[#F5F7FF]">{c.partners}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-[#A7B3D0]">Latency</span>
                    <span className="text-[14px] font-semibold text-green-400">{c.latency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOLUTIONS SECTION ========== */}
      <section id="solutions" className="py-[140px]">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-caption text-[#5E8DFF] mb-4 block">PLATFORM CAPABILITIES</span>
            <h2 className="text-h1 text-[#F5F7FF] mb-4">Institutional Infrastructure</h2>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-80">Built for the demands of modern financial operations across Africa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Real-time Settlement', desc: 'Instant finality across borders with atomic swap technology. Sub-2 second settlement on all corridors.' },
              { icon: Shield, title: 'Regulatory Compliance', desc: 'Built-in KYC/AML frameworks that adapt dynamically to evolving global mandates and reporting standards.' },
              { icon: Network, title: 'Verified Network', desc: 'Only licensed BDCs, banks, and IMTOs on our infrastructure. Every partner verified and monitored.' },
              { icon: Database, title: 'Treasury Intelligence', desc: 'Real-time analytics, forecasting, and liquidity management for enterprise treasury operations.' },
              { icon: Link2, title: 'Partner Settlement', desc: 'Automated partner settlements with full audit trails and compliance documentation.' },
              { icon: Bell, title: 'Alert Systems', desc: 'Real-time alerts for rate movements, compliance events, and operational anomalies.' },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 hover:border-[#5E8DFF]/30 transition-all hover:translate-y-[-4px]">
                <feature.icon className="w-10 h-10 text-[#5E8DFF] mb-5" />
                <h3 className="text-h4 text-[#F5F7FF] mb-3">{feature.title}</h3>
                <p className="text-[15px] text-[#A7B3D0] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-[140px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#5E8DFF]/5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5E8DFF]/10 rounded-full blur-[150px]" />
        
        <div className="container-main relative z-10">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-h1 text-[#F5F7FF] mb-6">Ready for Institutional Grade?</h2>
            <p className="text-body-lg text-[#A7B3D0] mb-10 opacity-80">
              Join banks, BDCs, and treasury operations across Africa using our infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn btn-primary">
                Request Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="btn btn-secondary">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-16 border-t border-white/[0.06] bg-[#050816]">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[10px] bg-[#5E8DFF] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#050816"/>
                  <path d="M2 17L12 22L22 17" stroke="#5E8DFF" strokeWidth="1.5"/>
                  <path d="M2 12L12 17L22 12" stroke="#5E8DFF" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-[#F5F7FF]">CUBOID</span>
            </div>
            
            <div className="flex items-center gap-8 text-[14px] text-[#A7B3D0]">
              <a href="#" className="hover:text-[#F5F7FF] transition-colors">Network Status</a>
              <a href="#" className="hover:text-[#F5F7FF] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#F5F7FF] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#F5F7FF] transition-colors">API Docs</a>
            </div>
            
            <p className="text-[13px] text-[#A7B3D0]">© 2024 CUBOID. Institutional Financial Infrastructure.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}