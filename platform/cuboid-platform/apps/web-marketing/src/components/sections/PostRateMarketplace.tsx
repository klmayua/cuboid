"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, Shield, Star, ArrowRight, Filter } from "lucide-react";

const sampleRates = [
  { type: "buy", pair: "USD/NGN", rate: "1,517.50", broker: "Apex FX Desk", rating: 4.9, time: "2 min ago", verified: true, volume: "$2.4M" },
  { type: "sell", pair: "USD/NGN", rate: "1,516.00", broker: "Lagos Prime BDC", rating: 4.8, time: "5 min ago", verified: true, volume: "$1.1M" },
  { type: "buy", pair: "GBP/NGN", rate: "1,923.80", broker: "Canary Brokers", rating: 4.7, time: "8 min ago", verified: true, volume: "$890K" },
  { type: "sell", pair: "EUR/NGN", rate: "1,644.00", broker: "EuroLink Africa", rating: 4.9, time: "12 min ago", verified: true, volume: "$3.2M" },
  { type: "buy", pair: "USD/KES", rate: "129.45", broker: "Nairobi FX Hub", rating: 4.6, time: "15 min ago", verified: true, volume: "$650K" },
  { type: "sell", pair: "GBP/KES", rate: "163.20", broker: "Mombasa Prime", rating: 4.8, time: "18 min ago", verified: true, volume: "$1.5M" },
];

export function PostRateMarketplace() {
  return (
    <section className="relative py-[120px] bg-bg_primary border-t border-white/[0.06]" id="exchange">
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
            <span className="text-kicker text-premium_gold uppercase mb-4 block">Live Marketplace</span>
            <h2 className="font-section text-text_primary mb-4">
              Post your rate. <span className="text-trust_green">Get matched.</span>
            </h2>
            <p className="text-body text-text_secondary max-w-[560px]">
              Real-time rate board from verified brokers and BDCs. Filter by corridor, volume, and broker rating.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="btn-premium btn-ghost h-[48px] px-5 text-[14px]">
              <Filter size={16} />
              Filter
            </button>
            <a href="#post-rate" className="btn-premium btn-gold h-[48px] px-6 text-[14px]">
              Post Your Rate
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Rate Board */}
        <div className="bg-elevated_card border border-white/[0.08] rounded-xl overflow-hidden">
          {/* Board Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/[0.02] border-b border-white/[0.06] text-[11px] font-semibold uppercase tracking-wider text-text_muted">
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Pair</div>
            <div className="col-span-2">Rate</div>
            <div className="col-span-3">Broker</div>
            <div className="col-span-2">Volume</div>
            <div className="col-span-1 text-right">Time</div>
          </div>

          {/* Rows */}
          {sampleRates.map((rate, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors items-center cursor-pointer"
            >
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-bold ${
                  rate.type === "buy" ? "bg-trust_green/10 text-trust_green" : "bg-premium_gold/10 text-premium_gold"
                }`}>
                  {rate.type === "buy" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {rate.type.toUpperCase()}
                </span>
              </div>
              <div className="col-span-2 text-text_primary font-mono font-semibold text-[14px]">{rate.pair}</div>
              <div className="col-span-2 text-text_primary font-mono font-bold text-[16px]">{rate.rate}</div>
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <span className="text-text_primary font-medium text-[14px]">{rate.broker}</span>
                  {rate.verified && <Shield size={13} className="text-cuboid_blue" />}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={11} className="text-premium_gold fill-premium_gold" />
                  <span className="text-[12px] text-text_muted">{rate.rating}</span>
                </div>
              </div>
              <div className="col-span-2 text-text_secondary font-mono text-[13px]">{rate.volume}</div>
              <div className="col-span-1 text-right text-text_muted text-[12px] flex items-center justify-end gap-1">
                <Clock size={11} />
                {rate.time}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-text_muted text-[14px] mb-4">Showing 6 of 2,847 active rate posts</p>
          <a href="#all-rates" className="btn-premium btn-blue h-[52px] px-8 text-[15px]">
            View Full Rate Board
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
