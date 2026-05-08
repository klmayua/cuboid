"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, MessageCircle, ArrowRight, Shield, Zap, Lock, CheckCircle } from "lucide-react";

export function MarketCommandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-panel rounded-panel p-6 xl:p-7"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Best Bid / Best Offer */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/[0.03] rounded-card p-4 border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={14} className="text-premium_green" />
            <span className="text-[11px] font-medium text-text_muted">Best buyer</span>
          </div>
          <div className="text-[22px] font-bold text-text_primary font-mono">129.10</div>
          <div className="text-[12px] text-premium_green mt-0.5">USD/KES</div>
        </div>
        <div className="bg-white/[0.03] rounded-card p-4 border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-gold" />
            <span className="text-[11px] font-medium text-text_muted">Best seller</span>
          </div>
          <div className="text-[22px] font-bold text-text_primary font-mono">129.62</div>
          <div className="text-[12px] text-gold mt-0.5">USD/KES</div>
        </div>
      </div>

      {/* Reserve Rate Card */}
      <div className="bg-white/[0.03] rounded-card p-5 border border-white/[0.06] mb-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[13px] font-semibold text-text_primary">Reserve this rate</span>
          <span className="flex items-center gap-1.5 text-[11px] text-premium_green">
            <span className="w-1.5 h-1.5 rounded-full bg-premium_green animate-pulse" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-[11px] text-text_muted mb-1.5 block">You pay</label>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-input px-3 py-2.5 flex items-center gap-2">
              <span className="text-gold font-bold text-[13px]">USD</span>
              <input
                type="text"
                placeholder="10,000"
                className="bg-transparent text-text_primary text-[15px] font-semibold w-full outline-none placeholder:text-text_muted/40"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-text_muted mb-1.5 block">You receive</label>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-input px-3 py-2.5 flex items-center gap-2">
              <span className="text-premium_green font-bold text-[13px]">KES</span>
              <input
                type="text"
                placeholder="1,294,500"
                readOnly
                className="bg-transparent text-text_primary text-[15px] font-semibold w-full outline-none placeholder:text-text_muted/40"
              />
            </div>
          </div>
        </div>
        <a href="#whatsapp" className="btn btn-green h-[48px] w-full text-[15px]" style={{ borderRadius: 10 }}>
          <MessageCircle size={18} />
          Reserve on WhatsApp
        </a>
      </div>

      {/* Market Snapshot */}
      <div className="bg-white/[0.03] rounded-card p-4 border border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium text-text_muted">Market snapshot</span>
          <span className="flex items-center gap-1 text-[11px] text-text_muted">
            <Activity size={11} />
            Updated now
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text_muted">Spread</span>
            <span className="text-text_primary font-mono font-medium">0.52 KES</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text_muted">24h volume</span>
            <span className="text-text_primary font-mono font-medium">$4.2M</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text_muted">Desks active</span>
            <span className="text-text_primary font-mono font-medium">41</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
