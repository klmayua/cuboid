"use client";

import { motion } from "framer-motion";
import { Wallet, Repeat, Shield, Building2, ArrowRight, Headphones, FileSignature, Code } from "lucide-react";

const centerpieceItems = [
  { icon: Wallet, title: "Settlement rails", desc: "Fast, tracked settlement for business volumes." },
  { icon: Repeat, title: "Recurring FX", desc: "Automated corridor coverage for regular needs." },
  { icon: Shield, title: "Treasury solutions", desc: "Hedging, scheduling, and margin controls." },
  { icon: Building2, title: "Business onboarding", desc: "KYB, approval, and dedicated account management." },
];

const supportItems = [
  { icon: Headphones, title: "Dedicated support", desc: "Priority response for business clients." },
  { icon: FileSignature, title: "Custom terms", desc: "Volume-based pricing and flexible settlement." },
  { icon: Code, title: "API access", desc: "Integrate rates and settlement into your stack." },
];

export function BusinessSection() {
  return (
    <section
      className="section-shell section-target"
      id="treasury"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(0,90,180,.08), transparent 46%), linear-gradient(180deg, rgba(255,255,255,.01), rgba(255,255,255,.003)), #04101D",
      }}
    >
      <div className="section-divider" />
      <div className="section-container" style={{ paddingTop: 136, paddingBottom: 136 }}>
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <span className="section-eyebrow">Business</span>
          <h2 className="section-title section-title-lg mx-auto" style={{ maxWidth: 720 }}>
            Treasury tools for business
          </h2>
          <p className="section-body mx-auto">
            Reliable exchange access and settlement support for growing companies.
          </p>
        </motion.div>

        {/* Centerpiece Panel */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="card-radius-lg card-border-subtle card-shadow-soft card-blur-glass"
          style={{
            width: "100%",
            minHeight: 460,
            marginTop: 56,
            padding: "48px 56px",
            background: "rgba(14,24,36,0.4)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {centerpieceItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-hover-lift card-radius-md"
                style={{
                  padding: 32,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-btn flex items-center justify-center mb-4"
                  style={{ background: "rgba(212,175,55,0.08)" }}
                >
                  <item.icon size={18} className="text-gold" strokeWidth={1.8} />
                </div>
                <h3 className="text-[17px] font-bold text-text_primary mb-2">{item.title}</h3>
                <p className="text-[14px] text-text_muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#business"
              className="btn btn-outline text-[15px]"
              style={{ borderRadius: 10, height: 52, paddingInline: 28 }}
            >
              Talk to Sales
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Lower Support Panels */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 24, marginTop: 26 }}
        >
          {supportItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-hover-lift card-radius-md"
              style={{
                padding: 28,
                background: "rgba(14,24,36,0.5)",
                border: i === 1 ? "1px solid rgba(212,175,55,0.22)" : "1px solid rgba(255,255,255,0.06)",
                transform: i === 1 ? "scale(1.08)" : "scale(1)",
                zIndex: i === 1 ? 1 : 0,
              }}
            >
              <div
                className="w-9 h-9 rounded-btn flex items-center justify-center mb-3"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <item.icon size={16} className="text-text_muted" strokeWidth={1.8} />
              </div>
              <h3 className="text-[15px] font-bold text-text_primary mb-1">{item.title}</h3>
              <p className="text-[13px] text-text_muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
