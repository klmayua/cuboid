"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, Server, Globe, ArrowRight } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Verified participants",
    description: "Every broker and desk is KYC-verified before joining the network.",
  },
  {
    icon: Lock,
    title: "End-to-end encryption",
    description: "AES-256 for all communications, rate data, and settlement instructions.",
  },
  {
    icon: FileCheck,
    title: "Compliance rails",
    description: "Reporting workflows, operational controls, and audit readiness.",
  },
  {
    icon: Server,
    title: "SOC 2 Type II audited",
    description: "Independently verified security, availability, and integrity controls.",
  },
  {
    icon: Globe,
    title: "Connected corridors",
    description: "43 active African currency corridors with live liquidity access.",
  },
  {
    icon: FileCheck,
    title: "Transparent operations",
    description: "Public desk ratings, settlement history, and dispute resolution.",
  },
];

export function NetworkSection() {
  return (
    <section className="relative py-[100px] bg-bg border-t border-white/[0.06]" id="network">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[13px] font-medium text-gold mb-4 block">Network</span>
          <h2 className="font-section text-text_primary mb-4">
            Trusted exchange infrastructure
          </h2>
          <p className="text-body text-text_muted max-w-[540px]">
            Verified participants, compliance rails, and connected liquidity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-panel border border-white/[0.06] rounded-card p-6 hover:border-white/[0.1] transition-colors"
            >
              <div className="w-10 h-10 rounded-btn bg-premium_green/8 flex items-center justify-center mb-4">
                <item.icon size={18} className="text-premium_green" strokeWidth={1.8} />
              </div>
              <h3 className="text-[16px] font-bold text-text_primary mb-1.5">{item.title}</h3>
              <p className="text-[14px] text-text_muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <a
            href="#network"
            className="btn btn-outline h-[52px] px-8 text-[15px]"
            style={{ borderRadius: 10 }}
          >
            Explore Network
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
