"use client";

import { motion } from "framer-motion";
import { Users, BarChart3, FileText, Wallet, TrendingUp, ArrowRight } from "lucide-react";

const modules = [
  { icon: BarChart3, title: "Lead pipeline", desc: "Track inbound quote requests and convert them into deals." },
  { icon: FileText, title: "Client dashboard", desc: "Manage your book, view history, and build relationships." },
  { icon: TrendingUp, title: "Rate publishing", desc: "Publish live buy/sell rates to the marketplace instantly." },
  { icon: Wallet, title: "Settlement workflow", desc: "Escrow-backed settlement with confirmation tracking." },
  { icon: Users, title: "Performance analytics", desc: "Volume, margins, response times, and client satisfaction." },
];

export function BrokerSection() {
  return (
    <section className="relative py-[100px] bg-panel border-t border-white/[0.06]" id="brokers">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[13px] font-medium text-gold mb-4 block">Broker enablement</span>
            <h2 className="font-section text-text_primary mb-5">
              Infrastructure for modern brokers
            </h2>
            <p className="text-body text-text_muted max-w-[480px] mb-8">
              Win clients, execute deals, manage relationships, and earn through verified market access — all from one platform.
            </p>
            <a
              href="#broker"
              className="btn btn-green h-[52px] px-7 text-[15px]"
              style={{ borderRadius: 10 }}
            >
              Become a Broker Partner
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right: Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-bg border border-white/[0.06] rounded-card p-5 hover:border-white/[0.1] transition-colors"
              >
                <div className="w-9 h-9 rounded-btn bg-premium_green/8 flex items-center justify-center mb-3">
                  <m.icon size={16} className="text-premium_green" strokeWidth={1.8} />
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
