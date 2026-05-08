"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, ArrowRight, TrendingUp, Shield, Globe, Clock } from "lucide-react";

export function FooterConversionStrip() {
  return (
    <section className="relative py-[100px] bg-bg_secondary border-t border-white/[0.06]">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-elevated_card border border-white/[0.08] rounded-xl p-8 xl:p-12 text-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20" style={{
              background: "radial-gradient(ellipse, rgba(91,124,255,.20), transparent 70%)"
            }} />
          </div>

          <div className="relative">
            <span className="text-kicker text-premium_gold uppercase mb-4 block">Start Trading Now</span>
            <h2 className="font-section text-text_primary mb-5 max-w-[700px] mx-auto">
              Join the network. <span className="text-trust_green">Trade with confidence.</span>
            </h2>
            <p className="text-body text-text_secondary max-w-[560px] mx-auto mb-10">
              Thousands of buyers, sellers, brokers, and BDCs are already exchanging on Cuboid. Start in under 60 seconds.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="#whatsapp" className="btn-premium btn-green h-[60px] px-8 text-[16px]">
                <MessageCircle size={20} />
                Start on WhatsApp
              </a>
              <a href="#telegram" className="btn-premium btn-blue h-[60px] px-8 text-[16px]">
                <Send size={20} />
                Join on Telegram
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-[13px] text-text_muted">
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-trust_green" />
                CBN Licensed
              </span>
              <span className="flex items-center gap-2">
                <Globe size={14} className="text-cuboid_blue" />
                43 Corridors
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-premium_gold" />
                24/7 Live
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp size={14} className="text-trust_green" />
                847 Brokers
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
