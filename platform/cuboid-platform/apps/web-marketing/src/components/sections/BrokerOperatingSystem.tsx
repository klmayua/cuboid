"use client";

import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, Globe, Lock, Clock, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Identity Layer",
    description: "Every broker and BDC desk is KYC-verified with document attestation. No anonymous counterparties.",
    accent: "text-cuboid_blue",
    bg: "bg-cuboid_blue/8",
  },
  {
    icon: Zap,
    title: "Instant Rate Matching",
    description: "Post your buy or sell rate and get matched with verified counterparties in under 90 seconds.",
    accent: "text-premium_gold",
    bg: "bg-premium_gold/8",
  },
  {
    icon: BarChart3,
    title: "Portfolio Dashboard",
    description: "Track your open orders, settlement history, credit lines, and performance metrics in one view.",
    accent: "text-trust_green",
    bg: "bg-trust_green/8",
  },
  {
    icon: Globe,
    title: "Multi-Corridor Management",
    description: "Operate across 43 active African currency corridors from a single unified interface.",
    accent: "text-cuboid_blue",
    bg: "bg-cuboid_blue/8",
  },
  {
    icon: Lock,
    title: "Escrow Settlement",
    description: "Funds held in regulated escrow until both parties confirm delivery. Dispute resolution included.",
    accent: "text-premium_gold",
    bg: "bg-premium_gold/8",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "Markets never sleep. Our broker network operates round-the-clock with live handoff protocols.",
    accent: "text-trust_green",
    bg: "bg-trust_green/8",
  },
];

export function BrokerOperatingSystem() {
  return (
    <section className="relative py-[120px] bg-bg_secondary border-t border-white/[0.06]" id="brokers">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-kicker text-premium_gold uppercase mb-4 block">Broker Operating System</span>
          <h2 className="font-section text-text_primary mb-5">
            Everything a broker needs to <span className="text-cuboid_blue">scale</span>
          </h2>
          <p className="text-body text-text_secondary max-w-[640px]">
            From rate posting to settlement confirmation, Cuboid gives independent brokers the same tools used by institutional desks.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-elevated_card border border-white/[0.08] rounded-xl p-6 xl:p-8 hover:border-white/[0.14] hover:bg-elevated_card_soft transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${feat.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                <feat.icon size={22} className={feat.accent} strokeWidth={1.8} />
              </div>
              <h3 className="text-[20px] font-bold text-text_primary mb-3">{feat.title}</h3>
              <p className="text-[15px] text-text_secondary leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 bg-elevated_card border border-white/[0.08] rounded-xl p-6 xl:p-8"
        >
          <div className="flex-1">
            <h3 className="text-[20px] font-bold text-text_primary mb-1">Join 847 verified brokers on the network</h3>
            <p className="text-[15px] text-text_secondary">Complete KYC in under 10 minutes. Start posting rates today.</p>
          </div>
          <a href="#broker" className="btn-premium btn-green h-[52px] px-7 text-[15px] shrink-0">
            Apply as Broker
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
