"use client";

import { motion } from "framer-motion";
import { MarketCommandPanel } from "../MarketCommandPanel";
import { MessageCircle, ArrowRight, Shield, Zap, Lock, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-148px)] pt-[48px] pb-[72px] overflow-hidden hero-bg"
      style={{ marginTop: 148 }}
    >
      <div className="relative max-w-content mx-auto px-gutter md:px-gutter-mob">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Trusted exchange infrastructure
              </span>
            </div>

            {/* Headline — sentence case, no all-caps */}
            <h1 className="font-hero text-text_primary mb-6">
              Africa&apos;s verified exchange network. Built for trust. Powered by WhatsApp.
            </h1>

            {/* Subheadline */}
            <p className="text-subhead text-text_muted max-w-[580px] mb-8">
              Compare live rates, connect with verified brokers, reserve exchange deals instantly, and settle confidently — all from WhatsApp.
            </p>

            {/* CTAs — max 2 */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#whatsapp" className="btn btn-whatsapp h-[56px] px-7 text-[15px]">
                <MessageCircle size={18} />
                Start on WhatsApp
              </a>
              <a href="#exchange" className="btn btn-outline-light h-[56px] px-7 text-[15px]">
                View live rates
              </a>
            </div>

            {/* Quiet links for secondary intents */}
            <div className="flex flex-wrap gap-6 mb-10 text-[14px]">
              <a href="#brokers" className="text-text_muted hover:text-gold transition-colors flex items-center gap-1">
                For brokers <ArrowRight size={14} />
              </a>
              <a href="#bdc" className="text-text_muted hover:text-gold transition-colors flex items-center gap-1">
                List your desk <ArrowRight size={14} />
              </a>
            </div>

            {/* Trust row — inline, sentence case */}
            <div className="flex flex-wrap items-center gap-6 text-[13px] text-text_muted">
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-premium_green" />
                Verified desks
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
                Compliance-first
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — clean stack, reduced complexity */}
          <div className="xl:pt-4">
            <MarketCommandPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
