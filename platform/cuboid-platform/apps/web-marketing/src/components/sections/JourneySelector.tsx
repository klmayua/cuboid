"use client";

import { motion } from "framer-motion";
import { ShoppingCart, TrendingDown, MapPin, ArrowRight } from "lucide-react";

const journeys = [
  {
    icon: ShoppingCart,
    title: "Buy FX",
    description: "Get the best buyer rate from verified brokers and reserve instantly.",
    cta: "Buy now",
    accent: "text-premium_green",
    borderHover: "hover:border-premium_green/30",
  },
  {
    icon: TrendingDown,
    title: "Sell FX",
    description: "Post your rate and get matched with verified buyers in minutes.",
    cta: "Sell now",
    accent: "text-gold",
    borderHover: "hover:border-gold/30",
  },
  {
    icon: MapPin,
    title: "Find nearby desk",
    description: "Locate a verified BDC desk near you with live rate boards.",
    cta: "Find desks",
    accent: "text-trust_blue",
    borderHover: "hover:border-trust_blue/30",
  },
];

export function JourneySelector() {
  return (
    <section className="relative py-[100px] bg-bg border-t border-white/[0.06]" id="exchange">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-section text-text_primary mb-3">
            What do you need to do?
          </h2>
          <p className="text-body text-text_muted max-w-[480px] mx-auto">
            Choose your path. Every option leads to a verified broker or desk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {journeys.map((j, i) => (
            <motion.a
              key={j.title}
              href="#whatsapp"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group bg-panel border border-white/[0.08] rounded-card p-7 xl:p-8 transition-all duration-300 ${j.borderHover} hover:bg-panel_soft`}
            >
              <div className={`w-11 h-11 rounded-btn bg-white/[0.04] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                <j.icon size={20} className={j.accent} strokeWidth={1.8} />
              </div>
              <h3 className="text-[20px] font-bold text-text_primary mb-2">{j.title}</h3>
              <p className="text-[15px] text-text_muted leading-relaxed mb-5">{j.description}</p>
              <span className={`inline-flex items-center gap-1.5 text-[14px] font-semibold ${j.accent}`}>
                {j.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
