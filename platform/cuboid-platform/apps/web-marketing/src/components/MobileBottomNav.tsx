"use client";

import { useState } from "react";
import { Home, LayoutGrid, LayoutDashboard, MessageCircle, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/constants";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Features", href: "#markets" },
  { icon: LayoutDashboard, label: "Demo", href: "/signin" },
  { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP_URL, external: true, accent: true },
  { icon: User, label: "Contact", href: "/contact" },
];

const moreMenuItems = [
  { label: "Markets", href: "#markets" },
  { label: "Brokers", href: "#brokers" },
  { label: "BDC Onboarding", href: "#bdc-onboarding" },
  { label: "Treasury", href: "#treasury" },
  { label: "Market Network", href: "#market-network" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export function MobileBottomNav() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      {/* Top Action Bar - Sticky */}
      <header
        className="fixed top-0 left-0 right-0 z-[950] xl:hidden"
        style={{
          height: 52,
          background: "rgba(7,17,26,0.94)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="h-full flex items-center justify-between px-5" style={{ minHeight: 44 }}>
          <a href="/" className="flex items-center gap-2">
            <div
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #00A86B, #008f5a)",
              }}
            >
              <span className="text-[13px] font-bold text-[#07111A]">C</span>
            </div>
            <span className="text-[15px] font-bold text-text_primary tracking-tight">
              CUBOID
            </span>
          </a>
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center justify-center text-text_muted hover:text-text_primary transition-colors"
            style={{ width: 44, height: 44, minWidth: 44, minHeight: 44 }}
            aria-label="Open menu"
          >
            <LayoutGrid size={22} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[600] xl:hidden"
        style={{
          height: "calc(64px + env(safe-area-inset-bottom))",
          paddingBottom: "env(safe-area-inset-bottom)",
          background: "rgba(7,17,26,0.96)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="h-[64px] flex items-center justify-around px-1">
          {navItems.map((item) => {
            const isCenter = item.accent;
            if (isCenter) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center justify-center -mt-5"
                  style={{ minWidth: 56, minHeight: 44 }}
                >
                  <motion.div
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center justify-center"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #00A86B, #008f5a)",
                      boxShadow: "0 4px 28px rgba(0,168,107,0.40), 0 0 0 6px rgba(7,17,26,0.96)",
                    }}
                  >
                    <MessageCircle size={24} className="text-[#07111A]" strokeWidth={2.2} />
                  </motion.div>
                  <span
                    className="text-[10px] font-semibold mt-0.5"
                    style={{ color: "#00A86B" }}
                  >
                    {item.label}
                  </span>
                </a>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-0.5 transition-colors"
                style={{ minWidth: 56, minHeight: 44, paddingTop: 6, paddingBottom: 6, color: "#94A3B8" }}
              >
                <item.icon size={22} strokeWidth={1.8} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Full Screen Menu Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[598] xl:hidden"
              style={{ background: "rgba(0,0,0,0.55)" }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[601] xl:hidden"
              style={{
                borderRadius: "24px 24px 0 0",
                background: "#0E1824",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              </div>

              <div className="px-6 pt-4 pb-2">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-text_primary font-semibold text-[17px]">More</span>
                  <button
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center justify-center text-text_muted hover:text-text_primary transition-colors"
                    style={{ width: 44, height: 44 }}
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl"
                    style={{
                      background: "rgba(0,168,107,0.10)",
                      border: "1px solid rgba(0,168,107,0.20)",
                      minHeight: 56,
                    }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "#00A86B",
                      }}
                    >
                      <MessageCircle size={20} className="text-[#07111A]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-text_primary">WhatsApp</p>
                      <p className="text-[11px] text-text_muted">Chat instantly</p>
                    </div>
                  </a>
                  <a
                    href="/signin"
                    className="flex items-center gap-3 p-4 rounded-2xl"
                    style={{
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.18)",
                      minHeight: 56,
                    }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "#D4AF37",
                      }}
                    >
                      <LayoutDashboard size={20} className="text-[#07111A]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-text_primary">Demo</p>
                      <p className="text-[11px] text-text_muted">Try dashboard</p>
                    </div>
                  </a>
                </div>

                {/* Menu Links */}
                <div className="flex flex-col" style={{ gap: 2 }}>
                  {moreMenuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center text-[15px] font-medium text-text_muted hover:text-text_primary transition-colors"
                      style={{
                        minHeight: 48,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: 10,
                        background: "transparent",
                      }}
                      onClick={() => setSheetOpen(false)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
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
