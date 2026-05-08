"use client";

import { motion } from "framer-motion";
import { ShoppingCart, TrendingDown, Users, Building2, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: ShoppingCart,
    title: "For Buyers",
    copy: "Access trusted exchange offers and reserve instantly.",
    cta: "Buy FX",
    accent: "text-premium_green",
    borderHover: "hover:border-premium_green/25",
    weight: "normal",
  },
  {
    icon: TrendingDown,
    title: "For Sellers",
    copy: "List your offer and connect with serious counterparties.",
    cta: "Sell FX",
    accent: "text-trust_blue",
    borderHover: "hover:border-trust_blue/25",
    weight: "normal",
  },
  {
    icon: Users,
    title: "For Brokers",
    copy: "Win clients, execute deals, manage relationships, and earn through verified market access.",
    cta: "Join as Broker",
    accent: "text-gold",
    borderHover: "hover:border-gold/25",
    weight: "high",
  },
  {
    icon: Building2,
    title: "For BDC Operators",
    copy: "Onboard your desk on CUBOID, become verified, digitize operations, and access qualified flow.",
    cta: "Onboard Your BDC",
    accent: "text-gold",
    borderHover: "hover:border-gold/30",
    weight: "highest",
  },
];

export function BusinessSplitBand() {
  return (
    <section className="relative py-10 bg-bg border-t border-white/[0.06]">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[14px] font-medium text-text_muted tracking-wide mb-8"
        >
          Built for every exchange participant
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => {
            const isHigh = c.weight === "high";
            const isHighest = c.weight === "highest";
            return (
              <motion.a
                key={c.title}
                href="#whatsapp"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className={`group bg-panel border border-white/[0.08] rounded-card p-6 transition-all duration-300 ${c.borderHover} hover:bg-panel_soft ${
                  isHighest ? "lg:col-span-1 ring-1 ring-gold/10" : ""
                } ${isHigh ? "ring-1 ring-white/[0.04]" : ""}`}
              >
                <div className={`w-10 h-10 rounded-btn bg-white/[0.04] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <c.icon size={18} className={c.accent} strokeWidth={1.8} />
                </div>
                <h3 className={`text-[17px] font-bold text-text_primary mb-2 ${isHighest ? "text-gold" : ""}`}>
                  {c.title}
                </h3>
                <p className="text-[14px] text-text_muted leading-relaxed mb-4">{c.copy}</p>
                <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${c.accent}`}>
                  {c.cta}
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
