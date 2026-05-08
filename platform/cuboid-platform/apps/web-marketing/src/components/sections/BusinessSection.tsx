"use client";

import { motion } from "framer-motion";
import { Building2, Wallet, Repeat, Shield, ArrowRight } from "lucide-react";

export function BusinessSection() {
  return (
    <section className="relative py-[100px] bg-panel border-t border-white/[0.06] section-target" id="treasury">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[13px] font-medium text-gold mb-4 block">Business</span>
            <h2 className="font-section text-text_primary mb-5">
              Treasury tools for business
            </h2>
            <p className="text-body text-text_muted max-w-[480px] mb-8">
              Reliable exchange access and settlement support for growing companies.
            </p>
            <a
              href="#business"
              className="btn btn-outline h-[52px] px-7 text-[15px]"
              style={{ borderRadius: 10 }}
            >
              Talk to Sales
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right: Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Wallet, title: "Settlement rails", desc: "Fast, tracked settlement for business volumes." },
              { icon: Repeat, title: "Recurring FX", desc: "Automated corridor coverage for regular needs." },
              { icon: Shield, title: "Treasury solutions", desc: "Hedging, scheduling, and margin controls." },
              { icon: Building2, title: "Business onboarding", desc: "KYB, approval, and dedicated account management." },
            ].map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-bg border border-white/[0.06] rounded-card p-5 hover:border-white/[0.1] transition-colors"
              >
                <div className="w-9 h-9 rounded-btn bg-gold/8 flex items-center justify-center mb-3">
                  <m.icon size={16} className="text-gold" strokeWidth={1.8} />
                </div>
                <h3 className="text-[15px] font-bold text-text_primary mb-1">{m.title}</h3>
                <p className="text-[13px] text-text_muted leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
