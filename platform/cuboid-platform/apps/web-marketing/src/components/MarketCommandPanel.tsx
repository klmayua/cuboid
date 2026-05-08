"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  TrendingDown,
  Users,
  MapPin,
  Bell,
  TrendingUp,
  Activity,
  Shield,
  Clock,
} from "lucide-react";

const tabs = [
  { id: "buy", label: "Buy Currency", icon: ShoppingCart },
  { id: "sell", label: "Sell Currency", icon: TrendingDown },
  { id: "broker", label: "Find Broker", icon: Users },
  { id: "nearby", label: "Nearby Desk", icon: MapPin },
  { id: "alerts", label: "Rate Alerts", icon: Bell },
];

const metrics = [
  { label: "Live Buyers", value: "18,422", accent: "text-cuboid_blue", icon: Users },
  { label: "Live Sellers", value: "6,819", accent: "text-premium_gold", icon: TrendingDown },
  { label: "Brokers Online", value: "847", accent: "text-trust_green", icon: Shield },
  { label: "Nearby Desks", value: "2,200", accent: "text-text_primary", icon: MapPin },
];

const liveRates = [
  { pair: "USD/NGN", rate: "1,517.50", change: "+0.12%", up: true },
  { pair: "GBP/NGN", rate: "1,923.80", change: "+0.08%", up: true },
  { pair: "EUR/NGN", rate: "1,645.25", change: "-0.04%", up: false },
  { pair: "USD/KES", rate: "129.45", change: "+0.21%", up: true },
];

export function MarketCommandPanel() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="glass_terminal rounded-xl xl:rounded-[28px] p-5 xl:p-7 shadow-glow_blue"
      style={{ border: "1px solid rgba(255,255,255,.14)" }}
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-cuboid_blue text-white shadow-lg"
                : "bg-white/[0.04] text-text_muted hover:text-text_secondary hover:bg-white/[0.08]"
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === "buy" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text_muted mb-2 block">You Pay</label>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className="text-premium_gold font-bold text-sm">USD</span>
                  <input type="text" placeholder="10,000" className="bg-transparent text-text_primary text-lg font-semibold w-full outline-none placeholder:text-text_muted/50" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text_muted mb-2 block">You Get</label>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className="text-trust_green font-bold text-sm">NGN</span>
                  <input type="text" placeholder="15,175,000" className="bg-transparent text-text_primary text-lg font-semibold w-full outline-none placeholder:text-text_muted/50" readOnly />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[12px] text-text_muted px-1">
              <span className="flex items-center gap-1.5">
                <Activity size={12} className="text-trust_green" />
                Rate: 1,517.50 NGN/USD
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                Updated 2s ago
              </span>
            </div>
            <button className="w-full btn-premium btn-green h-[52px] text-[15px]">
              Reserve This Rate
            </button>
          </div>
        )}
        {activeTab === "sell" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text_muted mb-2 block">You Sell</label>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className="text-trust_green font-bold text-sm">NGN</span>
                  <input type="text" placeholder="1,000,000" className="bg-transparent text-text_primary text-lg font-semibold w-full outline-none placeholder:text-text_muted/50" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text_muted mb-2 block">You Get</label>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className="text-premium_gold font-bold text-sm">USD</span>
                  <input type="text" placeholder="658.50" className="bg-transparent text-text_primary text-lg font-semibold w-full outline-none placeholder:text-text_muted/50" readOnly />
                </div>
              </div>
            </div>
            <button className="w-full btn-premium btn-gold h-[52px] text-[15px]">
              Find Best Buyer
            </button>
          </div>
        )}
        {activeTab === "broker" && (
          <div className="text-center py-8">
            <Users size={40} className="text-cuboid_blue mx-auto mb-3" />
            <p className="text-text_secondary text-[15px]">Find verified brokers by corridor, rating, and response time.</p>
            <button className="mt-4 btn-premium btn-blue h-[48px] px-6 text-[14px]">Browse Brokers</button>
          </div>
        )}
        {activeTab === "nearby" && (
          <div className="text-center py-8">
            <MapPin size={40} className="text-trust_green mx-auto mb-3" />
            <p className="text-text_secondary text-[15px]">Locate verified BDC desks near you with live rate boards.</p>
            <button className="mt-4 btn-premium btn-green h-[48px] px-6 text-[14px]">Find Nearby</button>
          </div>
        )}
        {activeTab === "alerts" && (
          <div className="text-center py-8">
            <Bell size={40} className="text-premium_gold mx-auto mb-3" />
            <p className="text-text_secondary text-[15px]">Get WhatsApp/Telegram alerts when rates hit your target.</p>
            <button className="mt-4 btn-premium btn-gold h-[48px] px-6 text-[14px]">Set Alert</button>
          </div>
        )}
      </div>

      {/* Live Rates Strip */}
      <div className="border-t border-white/[0.08] pt-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text_muted">Live Rates</span>
          <span className="flex items-center gap-1.5 text-[11px] text-trust_green">
            <span className="w-1.5 h-1.5 rounded-full bg-trust_green animate-pulse" />
            Live
          </span>
        </div>
        <div className="space-y-2">
          {liveRates.map((r) => (
            <div key={r.pair} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <span className="text-text_primary font-mono font-medium text-[13px]">{r.pair}</span>
              <div className="flex items-center gap-4">
                <span className="text-text_secondary font-mono text-[13px]">{r.rate}</span>
                <span className={`text-[12px] font-mono font-semibold flex items-center gap-0.5 ${r.up ? "text-trust_green" : "text-danger_red"}`}>
                  {r.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {r.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 xl:p-4 hover:border-white/[0.12] transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <m.icon size={14} className={m.accent} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text_muted">{m.label}</span>
            </div>
            <span className={`font-metric text-[28px] xl:text-[36px] ${m.accent}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
