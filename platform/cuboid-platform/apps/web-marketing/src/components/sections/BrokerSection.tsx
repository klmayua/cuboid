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
    <section
      className="section-shell section-target"
      id="brokers"
      style={{
        background:
          "radial-gradient(circle at 82% 28%, rgba(0,220,130,.07) 0%, transparent 40%), linear-gradient(180deg, rgba(255,255,255,.012), rgba(255,255,255,.004)), #071626",
      }}
    >
      <div className="section-divider" />
      <div className="section-container" style={{ paddingTop: 136, paddingBottom: 136 }}>
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "1fr 1.25fr", gap: 64 }}
        >
          {/* LEFT — Feature Block */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="card-radius-lg card-border-active card-shadow-glow-green"
            style={{
              minHeight: 620,
              padding: 52,
              background: "radial-gradient(circle at top left, rgba(0,220,130,.08), rgba(10,20,34,.96))",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span className="section-eyebrow">Brokers</span>
            <h2 className="section-title section-title-lg">
              Built for serious brokers
            </h2>
            <p className="section-body">
              More deal flow. Better tools. Institutional credibility.
            </p>

            <div className="mt-auto">
              <a
                href="#brokers"
                className="btn btn-green text-[15px]"
                style={{ borderRadius: 10, height: 52, paddingInline: 28 }}
              >
                Join Broker Network
                <ArrowRight size={16} />
              </a>

              {/* Stat Band */}
              <div
                className="grid grid-cols-3 mt-10"
                style={{
                  height: 90,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: 24,
                }}
              >
                {[
                  { label: "Volume", value: "₦2.4B" },
                  { label: "Response", value: "< 3min" },
                  { label: "Satisfaction", value: "97%" },
                ].map((m, i) => (
                  <div
                    key={m.label}
                    className="flex flex-col justify-center"
                    style={{
                      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      paddingLeft: i > 0 ? 20 : 0,
                    }}
                  >
                    <span className="text-[22px] font-bold text-text_primary">{m.value}</span>
                    <span className="text-[11px] text-text_muted uppercase tracking-wider">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Staggered Tiles */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: 22,
            }}
          >
            {modules.map((m, i) => {
              const heights = [180, 180, 230, 180, 150];
              const spans = i === 4 ? "span 2" : "span 1";
              const isEven = i % 2 === 1;
              const styles = [
                { background: "rgba(14,24,36,0.6)", border: "1px solid rgba(255,255,255,0.06)" },
                { background: "rgba(14,24,36,0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(22px)" },
                { background: "rgba(14,24,36,0.5)", border: "1px solid rgba(212,175,55,0.18)" },
                { background: "rgba(14,24,36,0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(22px)" },
                { background: "rgba(14,24,36,0.6)", border: "1px solid rgba(255,255,255,0.06)" },
              ];
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-hover-lift card-radius-md"
                  style={{
                    height: heights[i],
                    gridColumn: spans,
                    padding: 28,
                    transform: isEven ? "translateY(36px)" : "translateY(0)",
                    ...styles[i],
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-btn flex items-center justify-center mb-3"
                    style={{ background: "rgba(0,168,107,0.08)" }}
                  >
                    <m.icon size={16} className="text-premium_green" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[15px] font-bold text-text_primary mb-1">{m.title}</h3>
                  <p className="text-[13px] text-text_muted leading-relaxed">{m.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
