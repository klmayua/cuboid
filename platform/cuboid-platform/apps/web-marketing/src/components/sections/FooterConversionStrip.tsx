"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export function FooterConversionStrip() {
  return (
    <section className="relative py-[80px] bg-bg border-t border-white/[0.06]">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-panel border border-white/[0.08] rounded-panel p-8 xl:p-12 text-center relative overflow-hidden"
        >
          <div className="relative">
            <h2 className="font-section text-text_primary mb-4 max-w-[600px] mx-auto">
              Start exchanging in under 60 seconds
            </h2>
            <p className="text-body text-text_muted max-w-[480px] mx-auto mb-8">
              Join thousands of buyers, sellers, and brokers already trading on WhatsApp.
            </p>
            <a href="#whatsapp" className="btn btn-whatsapp h-[56px] px-8 text-[16px]">
              <MessageCircle size={20} />
              Start on WhatsApp
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
