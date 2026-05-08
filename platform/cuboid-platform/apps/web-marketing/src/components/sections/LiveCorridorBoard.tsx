"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, ArrowRight, Globe, Clock } from "lucide-react";

const corridors = [
  { pair: "USD/NGN", buy: "1,517.50", sell: "1,516.00", spread: "0.10%", volume: "$42.3M", trend: "up", change: "+0.12%", status: "active" },
  { pair: "GBP/NGN", buy: "1,923.80", sell: "1,921.50", spread: "0.12%", volume: "$18.7M", trend: "up", change: "+0.08%", status: "active" },
  { pair: "EUR/NGN", buy: "1,645.25", sell: "1,643.00", spread: "0.14%", volume: "$12.1M", trend: "down", change: "-0.04%", status: "active" },
  { pair: "USD/GHS", buy: "15.42", sell: "15.38", spread: "0.26%", volume: "$8.4M", trend: "up", change: "+0.21%", status: "active" },
  { pair: "USD/KES", buy: "129.45", sell: "129.20", spread: "0.19%", volume: "$6.2M", trend: "up", change: "+0.15%", status: "active" },
  { pair: "GBP/KES", buy: "163.20", sell: "162.80", spread: "0.25%", volume: "$3.9M", trend: "up", change: "+0.09%", status: "moderate" },
  { pair: "EUR/GHS", buy: "17.85", sell: "17.78", spread: "0.39%", volume: "$2.1M", trend: "down", change: "-0.03%", status: "moderate" },
  { pair: "USD/ZAR", buy: "18.72", sell: "18.65", spread: "0.37%", volume: "$4.5M", trend: "up", change: "+0.07%", status: "active" },
];

export function LiveCorridorBoard() {
  return (
    <section className="relative py-[120px] bg-bg_primary border-t border-white/[0.06]" id="bdc">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-kicker text-premium_gold uppercase mb-4 block">Live Corridor Board</span>
            <h2 className="font-section text-text_primary mb-4">
              43 active <span className="text-cuboid_blue">corridors</span>, live now
            </h2>
            <p className="text-body text-text_secondary max-w-[560px]">
              Real-time buy/sell spreads, volumes, and trend indicators across all major African currency pairs.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-2 text-[13px] text-text_muted">
              <span className="w-2 h-2 rounded-full bg-trust_green animate-pulse" />
              8 corridors trending up
            </span>
          </div>
        </motion.div>

        {/* Board */}
        <div className="bg-elevated_card border border-white/[0.08] rounded-xl overflow-hidden">
          {/* Header Row */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] text-[11px] font-semibold uppercase tracking-wider text-text_muted">
            <div className="col-span-2">Corridor</div>
            <div className="col-span-2">Best Buy</div>
            <div className="col-span-2">Best Sell</div>
            <div className="col-span-1">Spread</div>
            <div className="col-span-2">24h Volume</div>
            <div className="col-span-2">Trend</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          {/* Data Rows */}
          {corridors.map((c, i) => (
            <motion.div
              key={c.pair}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors items-center cursor-pointer"
            >
              <div className="lg:col-span-2 flex items-center gap-2">
                <Globe size={14} className="text-cuboid_blue" />
                <span className="text-text_primary font-mono font-bold text-[14px]">{c.pair}</span>
              </div>
              <div className="lg:col-span-2 flex items-center justify-between lg:justify-start">
                <span className="lg:hidden text-text_muted text-[11px] uppercase">Buy</span>
                <span className="text-trust_green font-mono font-semibold text-[14px]">{c.buy}</span>
              </div>
              <div className="lg:col-span-2 flex items-center justify-between lg:justify-start">
                <span className="lg:hidden text-text_muted text-[11px] uppercase">Sell</span>
                <span className="text-premium_gold font-mono font-semibold text-[14px]">{c.sell}</span>
              </div>
              <div className="lg:col-span-1 flex items-center justify-between lg:justify-start">
                <span className="lg:hidden text-text_muted text-[11px] uppercase">Spread</span>
                <span className="text-text_secondary font-mono text-[13px]">{c.spread}</span>
              </div>
              <div className="lg:col-span-2 flex items-center justify-between lg:justify-start">
                <span className="lg:hidden text-text_muted text-[11px] uppercase">Volume</span>
                <span className="text-text_primary font-mono text-[13px]">{c.volume}</span>
              </div>
              <div className="lg:col-span-2 flex items-center justify-between lg:justify-start gap-2">
                <span className="lg:hidden text-text_muted text-[11px] uppercase">Trend</span>
                <span className={`flex items-center gap-1 text-[13px] font-semibold ${c.trend === "up" ? "text-trust_green" : "text-danger_red"}`}>
                  {c.trend === "up" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {c.change}
                </span>
              </div>
              <div className="lg:col-span-1 flex items-center justify-between lg:justify-end">
                <span className="lg:hidden text-text_muted text-[11px] uppercase">Status</span>
                <span className={`flex items-center gap-1.5 text-[11px] font-bold ${c.status === "active" ? "text-trust_green" : "text-premium_gold"}`}>
                  <Activity size={11} />
                  {c.status.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[13px] text-text_muted">
            <span className="flex items-center gap-2">
              <Clock size={13} />
              Last updated: 2s ago
            </span>
            <span className="flex items-center gap-2">
              <Activity size={13} className="text-trust_green" />
              124,892 alerts delivered today
            </span>
          </div>
          <a href="#all-corridors" className="btn-premium btn-blue h-[48px] px-6 text-[14px]">
            Explore All 43 Corridors
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
