"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const topPairs = [
  { pair: "USD / NGN", subtitle: "Market midpoint", value: "₦1,392", delta: "+0.6%", up: true },
  { pair: "GBP / NGN", subtitle: "Market midpoint", value: "₦1,885", delta: "+0.3%", up: true },
  { pair: "EUR / NGN", subtitle: "Market midpoint", value: "₦1,620", delta: "-0.2%", up: false },
];

const deskRates = [
  { source: "Lagos market", buy: "₦1,388", sell: "₦1,398" },
  { source: "Abuja market", buy: "₦1,392", sell: "₦1,405" },
  { source: "Bank inflow", buy: "₦1,360", sell: "₦1,372" },
  { source: "Verified BDC desk", buy: "₦1,390", sell: "₦1,400" },
  { source: "Broker reserve quote", buy: "₦1,394", sell: "₦1,407" },
];

export function MarketCommandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-panel rounded-panel p-6 xl:p-7"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-text_primary">Today&apos;s market rates</h3>
          <p className="text-[12px] text-text_muted">Aggregated live from verified desks</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-premium_green">
          <span className="w-1.5 h-1.5 rounded-full bg-premium_green animate-pulse" />
          Live
        </span>
      </div>

      {/* Top Pair Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {topPairs.map((p) => (
          <div key={p.pair} className="bg-white/[0.03] rounded-card p-4 border border-white/[0.06]">
            <div className="text-[11px] font-medium text-text_muted mb-1">{p.pair}</div>
            <div className="text-[20px] font-bold text-text_primary font-mono">{p.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-[11px] font-semibold ${p.up ? "text-premium_green" : "text-danger_red"}`}>
                {p.up ? <TrendingUp size={10} className="inline" /> : <TrendingDown size={10} className="inline" />}
                {p.delta}
              </span>
              <span className="text-[10px] text-text_muted">{p.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Desk Rates Board */}
      <div className="bg-white/[0.03] rounded-card border border-white/[0.06] mb-5 overflow-hidden">
        <div className="px-4 py-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-[12px] font-semibold text-text_primary">Daily desk rates</span>
          <span className="flex items-center gap-1 text-[11px] text-text_muted">
            <Activity size={11} />
            Updated now
          </span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {/* Header row */}
          <div className="grid grid-cols-3 gap-4 px-4 py-2.5 text-[11px] font-semibold text-text_muted uppercase tracking-wider">
            <span>Source</span>
            <span className="text-right">Buy</span>
            <span className="text-right">Sell</span>
          </div>
          {deskRates.map((row) => (
            <div key={row.source} className="grid grid-cols-3 gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors">
              <span className="text-[13px] text-text_primary font-medium">{row.source}</span>
              <span className="text-[13px] text-premium_green font-mono text-right">{row.buy}</span>
              <span className="text-[13px] text-gold font-mono text-right">{row.sell}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white/[0.03] rounded-btn px-3 py-2.5 border border-white/[0.06]">
          <div className="text-[10px] text-text_muted mb-0.5">Spread</div>
          <div className="text-[14px] font-bold text-text_primary font-mono">₦12</div>
        </div>
        <div className="bg-white/[0.03] rounded-btn px-3 py-2.5 border border-white/[0.06]">
          <div className="text-[10px] text-text_muted mb-0.5">Desks</div>
          <div className="text-[14px] font-bold text-text_primary font-mono">247</div>
        </div>
        <div className="bg-white/[0.03] rounded-btn px-3 py-2.5 border border-white/[0.06]">
          <div className="text-[10px] text-text_muted mb-0.5">Corridors</div>
          <div className="text-[14px] font-bold text-text_primary font-mono">43</div>
        </div>
        <div className="bg-white/[0.03] rounded-btn px-3 py-2.5 border border-white/[0.06]">
          <div className="text-[10px] text-text_muted mb-0.5">Refresh</div>
          <div className="text-[14px] font-bold text-premium_green font-mono">Live</div>
        </div>
      </div>
    </motion.div>
  );
}
