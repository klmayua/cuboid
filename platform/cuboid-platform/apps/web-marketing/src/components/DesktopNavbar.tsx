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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed left-1/2 -translate-x-1/2 z-[1000] w-full max-w-[1240px]"
      style={{ top: 58, paddingLeft: 20, paddingRight: 20 }}
    >
      <div
        className="h-[74px] transition-all duration-300"
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(10,18,30,0.96), rgba(8,16,26,0.90))"
            : "linear-gradient(180deg, rgba(10,18,30,0.94), rgba(8,16,26,0.88))",
          backdropFilter: "blur(26px)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.30), 0 18px 50px rgba(0,0,0,0.22), 0 0 40px rgba(0,168,107,0.04)",
        }}
      >
        <div className="h-full flex items-center pl-[26px] pr-[18px]">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0" style={{ minWidth: 150 }}>
            <CuboidLogo width={28} height={28} />
            <span className="text-text_primary font-bold text-[16px] tracking-tight hidden sm:block">
              CUBOID
            </span>
          </a>

          {/* Center: Navigation */}
          <nav className="hidden 2xl:flex items-center gap-[28px] mx-auto">
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
          <div className="hidden xl:flex items-center gap-[16px] shrink-0">
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

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden p-2 text-text_muted hover:text-text_primary ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden mt-3"
            style={{
              background: "linear-gradient(180deg, rgba(10,18,30,0.96), rgba(8,16,26,0.92))",
              backdropFilter: "blur(28px)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
            }}
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-[15px] font-medium hover:text-text_primary hover:bg-white/[0.03] rounded-btn transition-colors"
                  style={{ color: "#D7E2EE" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-white/[0.06] my-3" />
              <a href="/login" className="btn btn-ghost-nav h-[44px] text-[14px]">Sign in</a>
              <a
                href="#whatsapp"
                className="btn btn-green h-[44px] text-[14px]"
                style={{ borderRadius: 10, boxShadow: "0 0 24px rgba(0,168,107,0.20)" }}
              >
                Start on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
