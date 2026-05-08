"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, Server } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "CBN licensed partners",
    description: "Every desk operates under valid Central Bank licenses.",
  },
  {
    icon: Lock,
    title: "End-to-end encryption",
    description: "AES-256 for all communications and settlement data.",
  },
  {
    icon: FileCheck,
    title: "Verified identities",
    description: "Multi-factor KYC with government ID matching.",
  },
  {
    icon: Server,
    title: "SOC 2 Type II audited",
    description: "Independently verified security and integrity controls.",
  },
];

export function TrustAndCompliance() {
  return (
    <section className="relative py-[100px] bg-panel border-t border-white/[0.06]" id="enterprise">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-section text-text_primary mb-3">
            Built on regulatory-grade infrastructure
          </h2>
          <p className="text-body text-text_muted max-w-[520px] mx-auto">
            Every transaction is backed by licensed compliance, bank-grade security, and transparent audit trails.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-bg border border-white/[0.06] rounded-card p-6 hover:border-white/[0.1] transition-colors"
            >
              <div className="w-10 h-10 rounded-btn bg-premium_green/8 flex items-center justify-center mb-4">
                <item.icon size={18} className="text-premium_green" strokeWidth={1.8} />
              </div>
              <h3 className="text-[16px] font-bold text-text_primary mb-1.5">{item.title}</h3>
              <p className="text-[14px] text-text_muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
