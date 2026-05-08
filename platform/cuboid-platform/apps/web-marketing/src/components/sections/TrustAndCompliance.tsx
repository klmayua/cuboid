"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, Eye, Server, Fingerprint, BadgeCheck, ArrowRight } from "lucide-react";

const complianceItems = [
  {
    icon: Shield,
    title: "CBN Licensed",
    description: "All BDC partners operate under valid Central Bank of Nigeria licenses with regular audits.",
  },
  {
    icon: FileCheck,
    title: "NFIU Compliant",
    description: "Full adherence to Nigeria Financial Intelligence Unit reporting standards and thresholds.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "AES-256 encryption for all communications, rate data, and settlement instructions.",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description: "AI-powered transaction monitoring flags anomalies before they become risks.",
  },
  {
    icon: Server,
    title: "SOC 2 Type II",
    description: "Independently audited controls for security, availability, and data integrity.",
  },
  {
    icon: Fingerprint,
    title: "Biometric KYC",
    description: "Multi-factor identity verification with government ID matching and liveness detection.",
  },
];

export function TrustAndCompliance() {
  return (
    <section className="relative py-[120px] bg-bg_secondary border-t border-white/[0.06]" id="business">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kicker text-premium_gold uppercase mb-4 block">Trust & Compliance</span>
          <h2 className="font-section text-text_primary mb-5">
            Built on <span className="text-trust_green">regulatory-grade</span> infrastructure
          </h2>
          <p className="text-body text-text_secondary max-w-[640px] mx-auto">
            Every transaction is backed by licensed compliance, bank-grade security, and transparent audit trails.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {complianceItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-elevated_card border border-white/[0.08] rounded-xl p-6 xl:p-8 hover:border-white/[0.14] hover:bg-elevated_card_soft transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-trust_green/8 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <item.icon size={22} className="text-trust_green" strokeWidth={1.8} />
              </div>
              <h3 className="text-[18px] font-bold text-text_primary mb-2">{item.title}</h3>
              <p className="text-[15px] text-text_secondary leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-elevated_card border border-white/[0.08] rounded-xl p-8 xl:p-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-[40px] xl:text-[52px] font-bold text-trust_green font-metric">100%</div>
              <p className="text-[14px] text-text_muted mt-1">KYC Compliance</p>
            </div>
            <div className="text-center">
              <div className="text-[40px] xl:text-[52px] font-bold text-cuboid_blue font-metric">0</div>
              <p className="text-[14px] text-text_muted mt-1">Security Breaches</p>
            </div>
            <div className="text-center">
              <div className="text-[40px] xl:text-[52px] font-bold text-premium_gold font-metric">99.9%</div>
              <p className="text-[14px] text-text_muted mt-1">Uptime SLA</p>
            </div>
            <div className="text-center">
              <div className="text-[40px] xl:text-[52px] font-bold text-text_primary font-metric">&lt;2s</div>
              <p className="text-[14px] text-text_muted mt-1">Alert Latency</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
