"use client";

import { motion } from "framer-motion";
import { MarketCommandPanel } from "../MarketCommandPanel";
import { MessageCircle, Users, Shield, Zap, Lock, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[86vh] mt-[140px] lg:mt-[198px] pt-[32px] pb-[56px] lg:pt-[170px] lg:pb-[72px] overflow-hidden hero-bg"
    >
      <div className="relative max-w-content mx-auto px-gutter md:px-gutter-mob">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="mb-4 lg:mb-5">
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Nigeria&apos;s verified FX network
              </span>
            </div>

            {/* Headline — mobile-first sizing */}
            <h1
              className="text-[38px] sm:text-[42px] md:text-[46px] lg:font-hero text-text_primary mb-5 lg:mb-6"
              style={{ lineHeight: 0.96, letterSpacing: "-0.03em", fontWeight: 800 }}
            >
              Better FX rates.<br />Smarter market access.
            </h1>

            {/* Subheadline */}
            <p className="text-[17px] leading-[1.5] text-text_muted max-w-[620px] mb-6 lg:mb-8">
              Daily market rates across Lagos, Abuja, broker desks, bank inflows and verified BDC channels—aggregated into one trusted exchange network.
            </p>

            {/* CTAs — mobile grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mb-8 lg:mb-10">
              <a
                href="#whatsapp"
                className="btn btn-green h-[54px] text-[15px] w-full"
                style={{ borderRadius: 10 }}
              >
                <MessageCircle size={18} />
                Start on WhatsApp
              </a>
              <a
                href="#brokers"
                className="btn h-[54px] text-[15px] w-full"
                style={{
                  borderRadius: 10,
                  background: "transparent",
                  color: "#D4AF37",
                  border: "1px solid rgba(212,175,55,0.35)",
                }}
              >
                <Users size={18} />
                Join Broker Network
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[13px] text-text_muted">
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-premium_green" />
                Verified network
              </span>
              <span className="flex items-center gap-2">
                <Zap size={14} className="text-premium_green" />
                Instant matching
              </span>
              <span className="flex items-center gap-2">
                <Lock size={14} className="text-premium_green" />
                Secure settlement
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-premium_green" />
                Compliance first
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="xl:pt-4">
            <MarketCommandPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
