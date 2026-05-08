"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Markets", href: "#markets" },
  { label: "Brokers", href: "#brokers" },
  { label: "BDC Onboarding", href: "#bdc-onboarding" },
  { label: "Treasury", href: "#treasury" },
  { label: "Market Network", href: "#market-network" },
  { label: "Learn", href: "#learn" },
];

export function DesktopNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* DESKTOP FLOATING NAV */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed left-1/2 -translate-x-1/2 z-[950] w-full max-w-[1240px] hidden lg:block"
        style={{ top: 66 }}
      >
        <div
          className="h-[76px] transition-all duration-300"
          style={{
            background: "linear-gradient(180deg, rgba(8,16,26,0.92), rgba(10,18,30,0.86))",
            backdropFilter: "blur(24px)",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.28), 0 18px 50px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.02) inset",
          }}
        >
          <div
            className="h-full"
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr auto",
              alignItems: "center",
              paddingLeft: 26,
              paddingRight: 18,
            }}
          >
            {/* Left: Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <CuboidLogo width={28} height={28} />
              <span className="text-text_primary font-bold text-[16px] tracking-tight">
                CUBOID
              </span>
            </a>

            {/* Center: Navigation */}
            <nav className="flex items-center justify-center gap-[36px]" style={{ lineHeight: 1 }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[14px] font-medium transition-all duration-140 whitespace-nowrap hover:text-white"
                  style={{ color: "#D7E2EE" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-[14px]">
              <a
                href="/login"
                className="btn-ghost-nav"
                style={{ height: 36, paddingInline: 12, fontSize: 13 }}
              >
                Sign in
              </a>
              <a
                href="#whatsapp"
                className="btn btn-green text-[14px] font-semibold"
                style={{
                  height: 44,
                  paddingInline: 22,
                  borderRadius: 10,
                  boxShadow: "0 0 24px rgba(0,168,107,0.20)",
                }}
              >
                Start on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE FLOATING HEADER */}
      <header
        className="fixed z-[1000] lg:hidden"
        style={{
          top: 10,
          left: 12,
          right: 12,
          height: 62,
        }}
      >
        <div
          className="h-full w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            columnGap: 12,
            paddingLeft: 14,
            paddingRight: 14,
            borderRadius: 16,
            background: "linear-gradient(180deg, rgba(10,18,30,0.94), rgba(8,16,26,0.88))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <CuboidLogo width={24} height={24} />
            <span className="text-text_primary font-bold text-[15px] tracking-tight">
              CUBOID
            </span>
          </a>

          {/* Center: empty / overflow hidden */}
          <div style={{ minWidth: 0, overflow: "hidden" }} />

          {/* Menu Button */}
          <button
            className="flex items-center justify-center text-text_muted hover:text-text_primary transition-colors"
            style={{ width: 44, height: 44, borderRadius: 10, padding: 0 }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[999] lg:hidden"
              style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 z-[1000] lg:hidden"
              style={{
                height: "100dvh",
                width: "min(88vw, 380px)",
                maxWidth: 380,
                overflowY: "auto",
                overscrollBehavior: "contain",
                background: "linear-gradient(180deg, rgba(10,18,30,0.98), rgba(8,16,26,0.94))",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.35)",
              }}
            >
              <div className="p-[18px]">
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <CuboidLogo width={24} height={24} />
                    <span className="text-text_primary font-bold text-[15px] tracking-tight">
                      CUBOID
                    </span>
                  </div>
                  <button
                    className="flex items-center justify-center text-text_muted hover:text-text_primary transition-colors"
                    style={{ width: 44, height: 44, borderRadius: 10, padding: 0 }}
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Nav Items */}
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center text-[15px] font-medium transition-colors rounded-btn"
                      style={{
                        minHeight: 52,
                        paddingLeft: 16,
                        paddingRight: 16,
                        color: "#D7E2EE",
                      }}
                      onClick={() => setDrawerOpen(false)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#D7E2EE";
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="h-px bg-white/[0.06] my-4" />

                {/* Drawer CTAs */}
                <a
                  href="/login"
                  className="btn btn-ghost-nav w-full h-[48px] text-[14px] mb-3"
                >
                  Sign in
                </a>
                <a
                  href="#whatsapp"
                  className="btn btn-green w-full h-[48px] text-[14px]"
                  style={{ borderRadius: 10, boxShadow: "0 0 24px rgba(0,168,107,0.20)" }}
                  onClick={() => setDrawerOpen(false)}
                >
                  Start on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
