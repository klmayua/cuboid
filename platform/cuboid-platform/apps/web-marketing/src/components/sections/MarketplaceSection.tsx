"use client";

import { motion } from "framer-motion";
import { ShoppingCart, TrendingDown, BarChart3, ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";

export function MarketplaceSection() {
  return (
    <section
      className="section-shell section-target"
      id="markets"
      style={{
        background:
          "radial-gradient(circle at 18% 22%, rgba(0,122,255,.08) 0%, transparent 42%), linear-gradient(180deg, rgba(255,255,255,.015), rgba(255,255,255,.005)), #06111F",
      }}
    >
      <div className="section-divider" />
      <div className="section-container" style={{ paddingTop: 136, paddingBottom: 136 }}>
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: "1.15fr .85fr", gap: 72 }}
        >
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-eyebrow">Exchange marketplace</span>
            <h2 className="section-title section-title-lg">
              Compare, reserve, transact
            </h2>
            <p className="section-body">
              Compare live offers, reserve rates instantly, and transact with verified counterparties.
            </p>

            {/* Credibility Metrics */}
            <div className="flex flex-wrap items-center gap-7 mt-10">
              <span className="inline-flex items-center gap-2 text-[14px] text-[#9FB0C8]">
                <ShieldCheck size={16} strokeWidth={1.8} />
                Verified counterparties
              </span>
              <span className="inline-flex items-center gap-2 text-[14px] text-[#9FB0C8]">
                <Zap size={16} strokeWidth={1.8} />
                Instant reservation
              </span>
              <span className="inline-flex items-center gap-2 text-[14px] text-[#9FB0C8]">
                <Clock size={16} strokeWidth={1.8} />
                Settlement tracking
              </span>
            </div>

            {/* CTA Strip */}
            <div className="mt-10">
              <a
                href="#whatsapp"
                className="btn btn-green text-[15px]"
                style={{ borderRadius: 10, height: 52, paddingInline: 28 }}
              >
                Start on WhatsApp
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Composite Panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div
              className="card-radius-lg card-border-premium card-shadow-deep overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(15,27,47,.95), rgba(8,16,28,.96))",
              }}
            >
              {/* Top Band */}
              <div
                className="flex items-center px-8"
                style={{ height: 72, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-[13px] font-semibold text-[#9FB0C8] uppercase tracking-wider">
                  Live marketplace
                </span>
              </div>

              {/* Middle Panel — 3 Cards */}
              <div className="p-7" style={{ display: "grid", gap: 14 }}>
                {[
                  {
                    icon: ShoppingCart,
                    title: "Buy FX",
                    copy: "Access trusted exchange offers and reserve instantly on WhatsApp.",
                    accent: "text-premium_green",
                    border: "rgba(0,168,107,0.18)",
                  },
                  {
                    icon: TrendingDown,
                    title: "Sell FX",
                    copy: "List your offer and connect with serious verified buyers.",
                    accent: "text-trust_blue",
                    border: "rgba(29,155,240,0.18)",
                  },
                  {
                    icon: BarChart3,
                    title: "Live rates",
                    copy: "Track corridor spreads, volume, and best bid/ask in real time.",
                    accent: "text-gold",
                    border: "rgba(212,175,55,0.18)",
                  },
                ].map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="card-hover-lift"
                    style={{
                      padding: "22px 24px",
                      borderRadius: 18,
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-btn flex items-center justify-center shrink-0"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <c.icon size={18} className={c.accent} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-text_primary mb-1">{c.title}</h3>
                        <p className="text-[13px] text-text_muted leading-relaxed">{c.copy}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Metrics */}
              <div
                className="grid grid-cols-4 px-8"
                style={{
                  height: 92,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  gap: 1,
                }}
              >
                {[
                  { label: "Desks", value: "41" },
                  { label: "Corridors", value: "12" },
                  { label: "Quotes/hr", value: "238" },
                  { label: "Satisfaction", value: "98%" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col justify-center items-center">
                    <span className="text-[18px] font-bold text-text_primary">{m.value}</span>
                    <span className="text-[11px] text-text_muted uppercase tracking-wider">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
