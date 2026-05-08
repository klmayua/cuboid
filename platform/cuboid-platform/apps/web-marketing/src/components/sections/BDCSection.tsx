"use client";

import { motion } from "framer-motion";
import { Shield, FileCheck, Globe, Droplets, LayoutDashboard, Building2, ArrowRight } from "lucide-react";

const steps = [
  { icon: Shield, title: "Verification stack", desc: "KYC checks, document validation, and physical desk verification." },
  { icon: FileCheck, title: "Compliance rails", desc: "Reporting workflows, operational controls, and audit readiness." },
  { icon: Globe, title: "Digital storefront", desc: "Publish live rates, operating hours, and desk profile visibility." },
  { icon: Droplets, title: "Qualified demand", desc: "Receive verified buyer, seller and broker enquiries." },
  { icon: LayoutDashboard, title: "Operations dashboard", desc: "Manage margins, settlement activity, and desk performance." },
];

export function BDCSection() {
  return (
    <section className="section-shell bg-matte-midnight section-target" id="bdc-onboarding">
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
          <span className="section-eyebrow">BDC Onboarding</span>
          <h2 className="section-title section-title-lg">
            BDC onboarding infrastructure
          </h2>
          <p className="section-body">
            Verify your desk, digitize operations, and access qualified demand across trusted exchange corridors.
          </p>
        </motion.div>

        {/* Timeline Shell */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="card-radius-lg card-border-premium overflow-hidden"
          style={{
            minHeight: 460,
            padding: 54,
            background: "rgba(8,16,28,0.6)",
          }}
        >
          {/* Connector + Steps */}
          <div className="relative">
            {/* Connector Line */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: 28,
                height: 2,
                background: "rgba(212,175,55,0.35)",
                boxShadow: "0 0 12px rgba(212,175,55,0.15)",
              }}
            />

            {/* Steps */}
            <div
              className="relative flex"
              style={{ gap: 26 }}
            >
              {steps.map((step, i) => {
                const isOdd = i % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-radius-md card-border-subtle flex flex-col"
                    style={{
                      width: 240,
                      minHeight: 220,
                      padding: 28,
                      background: "rgba(14,24,36,0.5)",
                      transform: isOdd ? "translateY(-28px)" : "translateY(28px)",
                      flexShrink: 0,
                    }}
                  >
                    {/* Step Number */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background: "#D4AF37",
                        color: "#08111F",
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="w-9 h-9 rounded-btn flex items-center justify-center mb-3"
                      style={{ background: "rgba(212,175,55,0.08)" }}
                    >
                      <step.icon size={16} className="text-gold" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[15px] font-bold text-text_primary mb-1">{step.title}</h3>
                    <p className="text-[13px] text-text_muted leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom note + CTA */}
          <div className="mt-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-btn flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.08)" }}
              >
                <Building2 size={16} className="text-gold" strokeWidth={1.8} />
              </div>
              <span className="text-[14px] text-text_muted">
                Plus network liquidity — connect with brokers, institutional desks, and corridor flow.
              </span>
            </div>
            <a
              href="#bdc"
              className="btn text-[15px]"
              style={{
                height: 52,
                paddingInline: 28,
                borderRadius: 10,
                background: "transparent",
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              Onboard Your BDC
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
