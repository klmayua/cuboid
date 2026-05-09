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
    <section
      className="section-shell section-target"
      id="market-network"
      style={{
        background:
          "radial-gradient(circle at 12% 78%, rgba(0,220,130,.05), transparent 35%), radial-gradient(circle at 88% 24%, rgba(0,122,255,.05), transparent 35%), #07131F",
      }}
    >
      <div className="section-divider" />
      <div className="section-container" style={{ paddingTop: 136, paddingBottom: 136 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="section-eyebrow">Network</span>
          <h2 className="section-title section-title-lg">
            Trusted exchange infrastructure
          </h2>
          <p className="section-body">
            Verified participants, compliance rails, and connected liquidity.
          </p>
        </motion.div>

        {/* Luxury Mosaic */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(2, auto)",
            gap: 22,
          }}
        >
          {/* Block 1 — 5x2 Large Feature */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="card-hover-lift card-radius-lg"
            style={{
              gridColumn: "span 5",
              gridRow: "span 2",
              padding: 42,
              background: "linear-gradient(180deg, rgba(14,24,36,0.8), rgba(8,16,28,0.9))",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                className="w-12 h-12 rounded-btn flex items-center justify-center mb-5"
                style={{ background: "rgba(0,168,107,0.08)" }}
              >
                <Shield size={22} className="text-premium_green" strokeWidth={1.8} />
              </div>
              <h3 className="text-[22px] font-bold text-text_primary mb-3">{items[0].title}</h3>
              <p className="text-[15px] text-text_muted leading-relaxed">{items[0].description}</p>
            </div>
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <Lock size={16} className="text-text_muted" strokeWidth={1.8} />
                <span className="text-[14px] text-text_muted">{items[1].title}</span>
              </div>
              <p className="text-[13px] text-text_muted mt-1 ml-7">{items[1].description}</p>
            </div>
          </motion.div>

          {/* Block 2 — 3x1 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="card-hover-lift card-radius-md"
            style={{
              gridColumn: "span 3",
              gridRow: "span 1",
              padding: 28,
              background: "rgba(14,24,36,0.5)",
              border: "1px solid rgba(212,175,55,0.15)",
              backdropFilter: "blur(22px)",
            }}
          >
            <div
              className="w-9 h-9 rounded-btn flex items-center justify-center mb-3"
              style={{ background: "rgba(212,175,55,0.08)" }}
            >
              <FileCheck size={16} className="text-gold" strokeWidth={1.8} />
            </div>
            <h3 className="text-[15px] font-bold text-text_primary mb-1">{items[2].title}</h3>
            <p className="text-[13px] text-text_muted leading-relaxed">{items[2].description}</p>
          </motion.div>

          {/* Block 3 — 4x1 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="card-hover-lift card-radius-md"
            style={{
              gridColumn: "span 4",
              gridRow: "span 1",
              padding: 28,
              background: "rgba(14,24,36,0.4)",
              border: "1px solid rgba(0,168,107,0.15)",
            }}
          >
            <div
              className="w-9 h-9 rounded-btn flex items-center justify-center mb-3"
              style={{ background: "rgba(0,168,107,0.08)" }}
            >
              <Server size={16} className="text-premium_green" strokeWidth={1.8} />
            </div>
            <h3 className="text-[15px] font-bold text-text_primary mb-1">{items[3].title}</h3>
            <p className="text-[13px] text-text_muted leading-relaxed">{items[3].description}</p>
          </motion.div>

          {/* Block 4 — 3x1 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="card-hover-lift card-radius-md"
            style={{
              gridColumn: "span 3",
              gridRow: "span 1",
              padding: 28,
              background: "rgba(14,24,36,0.6)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-9 h-9 rounded-btn flex items-center justify-center mb-3"
              style={{ background: "rgba(29,155,240,0.08)" }}
            >
              <Globe size={16} className="text-trust_blue" strokeWidth={1.8} />
            </div>
            <h3 className="text-[15px] font-bold text-text_primary mb-1">{items[4].title}</h3>
            <p className="text-[13px] text-text_muted leading-relaxed">{items[4].description}</p>
          </motion.div>

          {/* Block 5 — 4x1 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="card-hover-lift card-radius-md"
            style={{
              gridColumn: "span 4",
              gridRow: "span 1",
              padding: 28,
              background: "rgba(14,24,36,0.5)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 0 1px rgba(212,175,55,0.04), 0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="w-9 h-9 rounded-btn flex items-center justify-center mb-3"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <FileCheck size={16} className="text-text_muted" strokeWidth={1.8} />
            </div>
            <h3 className="text-[15px] font-bold text-text_primary mb-1">{items[5].title}</h3>
            <p className="text-[13px] text-text_muted leading-relaxed">{items[5].description}</p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="#network"
            className="btn btn-outline text-[15px]"
            style={{ borderRadius: 10, height: 52, paddingInline: 32 }}
          >
            Explore Network
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
