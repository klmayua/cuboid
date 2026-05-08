"use client";

import { motion } from "framer-motion";
import { MarketCommandPanel } from "../MarketCommandPanel";
import { MessageCircle, TrendingUp, Users, Building2, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[860px] pt-[170px] pb-[120px] xl:pt-[170px] xl:pb-[120px] pt-[120px] overflow-hidden hero-bg grid-overlay"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(91,124,255,.15), transparent 70%)" }}
        />
        <div
          className="absolute top-[5%] right-[15%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(245,185,65,.10), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(0,195,137,.10), transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-content mx-auto px-gutter md:px-gutter-mob">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Kicker */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-kicker text-premium_gold uppercase">
                <span className="w-2 h-2 rounded-full bg-premium_gold animate-pulse" />
                Verified African Exchange Network
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-hero text-text_primary mb-6">
              Compare rates.
              <br />
              Find brokers.
              <br />
              <span className="text-cuboid_blue">Reserve</span> confidently.
            </h1>

            {/* Subtitle */}
            <p className="text-hero-sub text-text_secondary max-w-[720px] mb-10">
              Buyers, sellers, brokers and verified BDCs—one trusted exchange marketplace on WhatsApp, Telegram, web and mobile.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href="#whatsapp"
                className="btn-premium btn-green h-[56px] px-7 text-[15px]"
              >
                <MessageCircle size={18} />
                Start on WhatsApp
              </a>
              <a
                href="#post-rate"
                className="btn-premium btn-gold h-[56px] px-7 text-[15px]"
              >
                <TrendingUp size={18} />
                Post Your Rate
              </a>
              <a
                href="#broker"
                className="btn-premium btn-blue h-[56px] px-7 text-[15px]"
              >
                <Users size={18} />
                Join as Broker
              </a>
              <a
                href="#bdc"
                className="btn-premium btn-ghost h-[56px] px-7 text-[15px]"
              >
                <Building2 size={18} />
                Register BDC
              </a>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap items-center gap-6 text-[13px] text-text_muted">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-trust_green" />
                CBN Licensed Partners
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cuboid_blue" />
                End-to-End Encryption
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-premium_gold" />
                99.9% Uptime SLA
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Market Command Panel */}
          <div className="xl:sticky xl:top-[160px]">
            <MarketCommandPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
