"use client";
import { motion } from "framer-motion";
import { Activity, Shield, Globe, Clock } from "lucide-react";

function KPICard({ label, value, change, positive = true }: { label: string; value: string; change: string; positive?: boolean }) {
  return (
    <div className="glass-panel p-5">
      <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-2">{label}</div>
      <div className="text-[48px] font-bold text-[rgba(255,255,255,0.96)]">{value}</div>
      <div className={`text-sm font-medium mt-2 ${positive ? 'text-[#71F8E4]' : 'text-[#FFB4AB]'}`}>{change}</div>
    </div>
  );
}

function FXRateRow({ pair, rate, change }: { pair: string; rate: string; change: string }) {
  const isPositive = change.startsWith("+");
  return (
    <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.08)] last:border-0">
      <span className="text-[rgba(255,255,255,0.96)] font-mono font-medium">{pair}</span>
      <div className="flex items-center gap-4">
        <span className="text-[rgba(255,255,255,0.82)] font-mono">{rate}</span>
        <span className={`text-sm font-mono ${isPositive ? 'text-[#71F8E4]' : 'text-[#FFB4AB]'}`}>{change}</span>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="glass-panel p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)]">SETTLEMENT VOLUME</span>
        <span className="text-[#71F8E4] text-sm flex items-center gap-1"><Activity size={14} /> Live</span>
      </div>
      <div className="h-24 flex items-end gap-1">
        {[42, 38, 55, 48, 62, 58, 45, 51, 67, 72, 65, 58].map((h, i) => (
          <div key={i} className="flex-1 bg-[#6B8CFF] rounded-sm" style={{ height: `${h}%`, opacity: 0.6 + (i / 20) }} />
        ))}
      </div>
    </div>
  );
}

function CompliancePanel() {
  const alerts = [
    { type: "warning", message: "KYC review pending", time: "2m ago" },
    { type: "success", message: "AML check passed", time: "5m ago" },
    { type: "info", message: "New beneficiary added", time: "12m ago" },
  ];
  return (
    <div className="glass-panel p-5">
      <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">COMPLIANCE ACTIVITY</div>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${alert.type === 'warning' ? 'bg-[#E9C349]' : alert.type === 'success' ? 'bg-[#71F8E4]' : 'bg-[#6B8CFF]'}`} />
            <span className="text-[rgba(255,255,255,0.82)] text-sm flex-1">{alert.message}</span>
            <span className="text-[rgba(255,255,255,0.62)] text-xs">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="min-h-screen pt-[96px] bg-[#060D20]">
      <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
        <div className="grid grid-cols-12 gap-[32px]">
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[#6B8CFF] mb-6">AFRICAN INSTITUTIONAL FX INFRASTRUCTURE</div>
              <h1 className="text-[clamp(72px,9vw,140px)] font-extrabold text-[rgba(255,255,255,0.96)] leading-[0.9] tracking-[-0.05em] max-w-[7ch] mb-8">The operating system for <span className="text-[#6B8CFF]">African finance</span></h1>
              <p className="text-[18px] leading-[1.7] text-[rgba(255,255,255,0.82)] max-w-[28ch] mb-10">Orchestrate, settle, and comply across 40+ African currencies. Bank-grade infrastructure for institutions that move serious money.</p>
              <div className="flex flex-wrap gap-4 mb-16">
                <button className="h-[60px] px-10 text-base bg-[#6B8CFF] text-white rounded-[18px] font-semibold hover:bg-[#5A7AE8] transition-all">Request Access</button>
                <button className="h-[60px] px-10 text-base bg-transparent border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.82)] rounded-[18px] font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all">View Documentation</button>
              </div>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2"><Shield className="text-[#71F8E4]" size={18} /><span className="text-[rgba(255,255,255,0.62)] text-sm">SOC 2 Type II</span></div>
                <div className="flex items-center gap-2"><Globe className="text-[#71F8E4]" size={18} /><span className="text-[rgba(255,255,255,0.62)] text-sm">40+ Currencies</span></div>
                <div className="flex items-center gap-2"><Activity className="text-[#71F8E4]" size={18} /><span className="text-[rgba(255,255,255,0.62)] text-sm">99.99% Uptime</span></div>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-2 gap-5 h-full">
              <KPICard label="Daily Volume" value="$2.4B" change="+12.4%" />
              <KPICard label="Active Corridors" value="847" change="+24" />
              <KPICard label="Settled Today" value="18.2K" change="+8.2%" />
              <KPICard label="Pending Review" value="12" change="-3" positive={false} />
              <div className="glass-panel p-5 col-span-2">
                <div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">FX RATES</div>
                <FXRateRow pair="USD/NGN" rate="1,517.50" change="+0.12%" />
                <FXRateRow pair="GBP/NGN" rate="1,923.80" change="+0.08%" />
                <FXRateRow pair="EUR/NGN" rate="1,645.25" change="-0.04%" />
                <FXRateRow pair="USD/GHS" rate="15.42" change="+0.21%" />
              </div>
              <AnalyticsPanel />
              <CompliancePanel />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}