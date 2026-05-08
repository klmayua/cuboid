"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setOpen(!open)}
        className="fixed z-[700] flex items-center justify-center"
        style={{
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: 18,
          background: "rgba(14,24,36,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 24px rgba(0,168,107,0.15), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {open ? (
          <X size={22} className="text-text_primary" />
        ) : (
          <MessageCircle size={22} className="text-premium_green" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[700] p-5"
            style={{
              bottom: 96,
              right: 28,
              width: 320,
              borderRadius: 20,
              background: "rgba(14,24,36,0.96)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <p className="text-[15px] text-text_primary font-medium mb-1">
              CUBOID Concierge
            </p>
            <p className="text-[14px] text-text_muted leading-relaxed mb-4">
              Need rates, broker access, or BDC onboarding?
            </p>
            <a
              href="#whatsapp"
              className="btn btn-green h-[44px] w-full text-[14px]"
              style={{ borderRadius: 10 }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
