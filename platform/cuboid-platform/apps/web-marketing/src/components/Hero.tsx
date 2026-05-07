"use client";

import { motion } from "framer-motion";
import { Navigation } from "./Navigation";
import { CuboidLogo } from "./CuboidLogo";
import { TrendingUp, Shield, Activity, Globe, Clock, CheckCircle, AlertTriangle, Search, ArrowRight, BarChart3, Users, Banknote, Lock } from "lucide-react";

/* Live Rate Badge */
function LiveRate({ pair, rate, change }: { pair: string; rate: string; change: string }) {
  const isPositive = change.startsWith("+");
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.08] last:border-0">
      <span className="text-pure_white font-mono font-medium">{pair}</span>
      <div className="flex items-center gap-4">
        <span className="text-silver_blue font-mono">{rate}</span>
        <span className={`text-sm font-mono ${isPositive ? "text-emerald" : "text-executive_red"}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

/* Network Activity Item */
function NetworkItem({ icon: Icon, title, subtitle, time, type }: { icon: any; title: string; subtitle: string; time: string; type: string }) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div className={`w-10 h-10 rounded-medium flex items-center justify-center ${
        type === "success" ? "bg-emerald/10" : type === "warning" ? "bg-amber/10" : "bg-cuboid_blue/10"
      }`}>
        <Icon size={18} className={
          type === "success" ? "text-emerald" : type === "warning" ? "text-amber" : "text-cuboid_blue"
        } />
      </div>
      <div className="flex-1">
        <div className="text-pure_white font-medium">{title}</div>
        <div className="text-muted_slate text-sm">{subtitle}</div>
      </div>
      <div className="text-low_emphasis text-xs">{time}</div>
    </div>
  );
}

/* Metric Card */
function MetricCard({ label, value, change, badge }: { label: string; value: string; change?: string; badge?: string }) {
  return (
    <div className="premium_panel rounded-card p-lg">
      <div className="font-label text-low_emphasis mb-3">{label}</div>
      <div className="font-metric text-pure_white mb-2">{value}</div>
      {change && (
        <div className="text-emerald text-sm font-medium">{change}</div>
      )}
      {badge && (
        <span className="badge-premium mt-2">{badge}</span>
      )}
    </div>
  );
}

/* Featured Stat */
function FeaturedStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-2">
        <span className="font-section text-pure_white">{value}</span>
        {sub && <span className="text-gold_soft text-xl">{sub}</span>}
      </div>
      <div className="text-muted_slate text-sm mt-1">{label}</div>
    </div>
  );
}

export function Hero() {
  return (
    <main className="min-h-screen bg-obsidian">
      <Navigation />
      
      {/* TOP PULSE BAR */}
      <div className="fixed top-[88px] left-0 right-0 z-40 bg-midnight/90 border-b border-white/[0.08]">
        <div className="max-w-container mx-auto px-gutter h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-emerald text-xs font-semibold uppercase tracking-wider">CUBOID LIVE NETWORK</span>
            </span>
          </div>
          <div className="flex items-center gap-lg text-xs text-muted_slate font-mono">
            <span>USD/NGN 1,517.50 <span className="text-emerald">+0.12%</span></span>
            <span>GBP/NGN 1,923.80 <span className="text-emerald">+0.08%</span></span>
            <span>EUR/NGN 1,645.25 <span className="text-executive_red">-0.04%</span></span>
            <span>USD/GHS 15.42 <span className="text-emerald">+0.21%</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Search size={14} className="text-muted_slate" />
            <span className="text-low_emphasis text-xs">Search corridor, rate, partner...</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-[88px]">
        <div className="max-w-container mx-auto px-gutter pt-hero_vertical pb-premium_section">
          <div className="grid grid-cols-12 gap-grid">
            {/* LEFT - Value */}
            <div className="col-span-12 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Premium Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="badge-premium">INSTITUTIONAL ACCESS</span>
                  <span className="badge-verified">VERIFIED NETWORK</span>
                </div>

                {/* Hero Text */}
                <h1 className="font-hero text-pure_white max-w-[7ch] mb-lg">
                  The operating system for{' '}
                  <span className="text-cuboid_blue">African finance</span>
                </h1>

                <p className="font-body text-silver_blue max-w-[28ch] mb-lg">
                  Orchestrate, settle, and comply across 40+ African currencies with institutional-grade infrastructure.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mb-xxl">
                  <button className="btn-primary h-button px-xl text-base flex items-center gap-3">
                    Request Access
                    <ArrowRight size={18} />
                  </button>
                  <button className="btn-secondary h-button px-xl text-base">
                    View Documentation
                  </button>
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-2 gap-lg">
                  <FeaturedStat label="Daily Volume" value="$2.4B" sub="+" />
                  <FeaturedStat label="Active Corridors" value="847" />
                </div>
              </motion.div>
            </div>

            {/* RIGHT - Live Dashboard */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-5"
              >
                {/* Metrics */}
                <MetricCard label="Daily Volume" value="$2.4B" change="+12.4%" />
                <MetricCard label="Active Corridors" value="847" badge="LIVE" />
                <MetricCard label="Settled Today" value="18.2K" change="+8.2%" />
                <MetricCard label="Pending Review" value="12" badge="ATTENTION" />

                {/* FX Rates Panel */}
                <div className="col-span-2 premium_panel rounded-card p-lg">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-label text-low_emphasis">FX RATES</span>
                    <span className="flex items-center gap-2 text-xs text-emerald">
                      <Activity size={12} /> Live
                    </span>
                  </div>
                  <LiveRate pair="USD/NGN" rate="1,517.50" change="+0.12%" />
                  <LiveRate pair="GBP/NGN" rate="1,923.80" change="+0.08%" />
                  <LiveRate pair="EUR/NGN" rate="1,645.25" change="-0.04%" />
                  <LiveRate pair="USD/GHS" rate="15.42" change="+0.21%" />
                </div>

                {/* Network Activity */}
                <div className="col-span-2 premium_panel rounded-card p-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label text-low_emphasis">NETWORK ACTIVITY</span>
                    <span className="text-xs text-muted_slate">Real-time</span>
                  </div>
                  <NetworkItem
                    icon={CheckCircle}
                    title="Settlement Completed"
                    subtitle="USD/NGN • $500,000"
                    time="2m"
                    type="success"
                  />
                  <NetworkItem
                    icon={Shield}
                    title="KYC Verified"
                    subtitle="Acme Corporation"
                    time="5m"
                    type="success"
                  />
                  <NetworkItem
                    icon={AlertTriangle}
                    title="Rate Alert"
                    subtitle="GBP/NGN hit threshold"
                    time="12m"
                    type="warning"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="border-t border-white/[0.08]">
        <div className="max-w-container mx-auto px-gutter py-premium_section">
          <div className="grid grid-cols-12 gap-grid">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-card text-pure_white mb-4">Ready for institutional access?</h2>
              <p className="text-muted_slate mb-lg">Join the network powering African institutional finance.</p>
              <button className="btn-primary h-button px-xl">Request Access</button>
            </div>
            <div className="col-span-12 lg:col-span-8 grid grid-cols-4 gap-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-medium bg-emerald/10 flex items-center justify-center">
                  <Shield className="text-emerald" size={24} />
                </div>
                <div>
                  <div className="text-pure_white font-semibold">SOC 2 Type II</div>
                  <div className="text-muted_slate text-xs">Certified</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-medium bg-gold_primary/10 flex items-center justify-center">
                  <Banknote className="text-gold_soft" size={24} />
                </div>
                <div>
                  <div className="text-pure_white font-semibold">40+ Currencies</div>
                  <div className="text-muted_slate text-xs">Supported</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-medium bg-emerald/10 flex items-center justify-center">
                  <Activity className="text-emerald" size={24} />
                </div>
                <div>
                  <div className="text-pure_white font-semibold">99.99%</div>
                  <div className="text-muted_slate text-xs">Uptime SLA</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-medium bg-cuboid_blue/10 flex items-center justify-center">
                  <Globe className="text-cuboid_blue" size={24} />
                </div>
                <div>
                  <div className="text-pure_white font-semibold">CBN Licensed</div>
                  <div className="text-muted_slate text-xs">Regulated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-midnight">
        <div className="max-w-container mx-auto px-gutter py-xxl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CuboidLogo width={32} height={32} />
              <span className="text-pure_white font-semibold text-lg">CUBOID</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted_slate">
              <span>© 2026 CUBOID Technologies Ltd.</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald" />
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}