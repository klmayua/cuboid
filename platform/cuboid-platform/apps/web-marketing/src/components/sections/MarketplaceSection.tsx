"use client";

import { motion } from "framer-motion";
import { ShoppingCart, TrendingDown, BarChart3, ArrowRight, MessageCircle } from "lucide-react";

export function MarketplaceSection() {
  return (
    <section className="relative py-[100px] bg-panel border-t border-white/[0.06]" id="markets">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[13px] font-medium text-gold mb-4 block">Exchange marketplace</span>
          <h2 className="font-section text-text_primary mb-4">
            Compare, reserve, transact
          </h2>
          <p className="text-body text-text_muted max-w-[540px]">
            Compare live offers, reserve rates instantly, and transact with verified counterparties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: ShoppingCart,
              title: "Buy FX",
              copy: "Access trusted exchange offers and reserve instantly on WhatsApp.",
              accent: "text-premium_green",
              border: "hover:border-premium_green/25",
            },
            {
              icon: TrendingDown,
              title: "Sell FX",
              copy: "List your offer and connect with serious verified buyers.",
              accent: "text-trust_blue",
              border: "hover:border-trust_blue/25",
            },
            {
              icon: BarChart3,
              title: "Live rates",
              copy: "Track corridor spreads, volume, and best bid/ask in real time.",
              accent: "text-gold",
              border: "hover:border-gold/25",
            },
          ].map((c, i) => (
            <motion.a
              key={c.title}
              href="#whatsapp"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className={`group bg-bg border border-white/[0.06] rounded-card p-7 transition-all duration-300 ${c.border} hover:bg-panel_soft`}
            >
              <div className="w-11 h-11 rounded-btn bg-white/[0.04] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <c.icon size={20} className={c.accent} strokeWidth={1.8} />
              </div>
              <h3 className="text-[18px] font-bold text-text_primary mb-2">{c.title}</h3>
              <p className="text-[14px] text-text_muted leading-relaxed mb-5">{c.copy}</p>
              <span className={`inline-flex items-center gap-1.5 text-[14px] font-semibold ${c.accent}`}>
                Start on WhatsApp
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
