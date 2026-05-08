"use client";

import { useState } from "react";
import { Home, BarChart3, MessageCircle, Users, LayoutGrid, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const moreMenuItems = [
  { label: "Marketplace", href: "#markets" },
  { label: "BDC Onboarding", href: "#bdc-onboarding" },
  { label: "Treasury", href: "#treasury" },
  { label: "Market Network", href: "#market-network" },
  { label: "Learn", href: "#learn" },
  { label: "Sign In", href: "/login" },
];

export function MobileBottomNav() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-[600] safe-area-pb xl:hidden"
        style={{
          height: 76,
          background: "rgba(7,17,26,0.96)",
          backdropFilter: "blur(22px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="h-full flex items-center justify-around px-2">
          <a
            href="/"
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <Home size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">Home</span>
          </a>
          <a
            href="#exchange"
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <BarChart3 size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">Rates</span>
          </a>
          <a href="#whatsapp" className="flex flex-col items-center justify-center -mt-4">
            <div
              className="w-14 h-14 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00A86B, #008f5a)",
                borderRadius: 14,
                boxShadow: "0 4px 24px rgba(0,168,107,0.35), 0 0 0 4px rgba(7,17,26,0.96)",
              }}
            >
              <MessageCircle size={26} className="text-bg" strokeWidth={2.2} />
            </div>
            <span className="text-[10px] font-medium text-premium_green mt-1">WhatsApp</span>
          </a>
          <a
            href="#brokers"
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <Users size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">Brokers</span>
          </a>
          <button
            onClick={() => setSheetOpen(true)}
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <LayoutGrid size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* More Bottom Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[599] xl:hidden"
              style={{ background: "rgba(0,0,0,0.48)" }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[601] xl:hidden"
              style={{
                borderRadius: "26px 26px 0 0",
                background: "#0E1824",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
              }}
            >
              <div className="px-6 pt-5 pb-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text_primary font-semibold text-[16px]">Menu</span>
                  <button
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center justify-center text-text_muted"
                    style={{ width: 36, height: 36 }}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col" style={{ gap: 4 }}>
                  {moreMenuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center text-[15px] font-medium text-text_muted hover:text-text_primary transition-colors rounded-btn"
                      style={{ minHeight: 48, paddingLeft: 12, paddingRight: 12 }}
                      onClick={() => setSheetOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
