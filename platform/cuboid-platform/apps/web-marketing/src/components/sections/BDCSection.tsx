"use client";

import { motion } from "framer-motion";
import { Building2, Shield, FileCheck, Globe, Droplets, LayoutDashboard, ArrowRight } from "lucide-react";

const modules = [
  { icon: Shield, title: "Verification stack", desc: "KYC, licensing checks, and physical desk validation." },
  { icon: FileCheck, title: "Compliance rails", desc: "CBN-aligned reporting, threshold monitoring, and audit trails." },
  { icon: Globe, title: "Digital storefront", desc: "Your verified profile with live rates, hours, and corridor focus." },
  { icon: Droplets, title: "Customer acquisition", desc: "Qualified buyers and sellers routed to your desk." },
  { icon: LayoutDashboard, title: "Operational dashboard", desc: "Daily volume, margins, settlements, and team performance." },
  { icon: Building2, title: "Liquidity access", desc: "Connect to broker networks and institutional corridors." },
];

export function BDCSection() {
  return (
    <section className="relative py-[100px] bg-bg border-t border-white/[0.06]" id="bdc">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {modules.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-panel border border-white/[0.06] rounded-card p-5 hover:border-gold/20 transition-colors"
              >
                <div className="w-9 h-9 rounded-btn bg-gold/8 flex items-center justify-center mb-3">
                  <m.icon size={16} className="text-gold" strokeWidth={1.8} />
                </div>
                <h3 className="text-[15px] font-bold text-text_primary mb-1">{m.title}</h3>
                <p className="text-[13px] text-text_muted leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[13px] font-medium text-gold mb-4 block">BDC licensing</span>
            <h2 className="font-section text-text_primary mb-5">
              Licensed infrastructure for exchange desks
            </h2>
            <p className="text-body text-text_muted max-w-[480px] mb-8">
              License your desk on CUBOID, become verified, digitize operations, and access qualified flow from buyers and brokers.
            </p>
            <a
              href="#bdc"
              className="btn h-[52px] px-7 text-[15px]"
              style={{
                borderRadius: 10,
                background: "transparent",
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              Apply for BDC Licensing
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
