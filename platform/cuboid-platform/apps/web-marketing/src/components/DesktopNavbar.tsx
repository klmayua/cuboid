"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Markets", href: "#markets" },
  { label: "Brokers", href: "#brokers" },
  { label: "BDC Onboarding", href: "#bdc" },
  { label: "Treasury", href: "#treasury" },
  { label: "Market Network", href: "#network" },
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
      className="fixed left-0 right-0 z-[800]"
      style={{ top: 76, paddingLeft: 48, paddingRight: 48 }}
    >
      <div
        className="h-[84px] transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,18,30,0.88)" : "rgba(10,18,30,0.72)",
          backdropFilter: "blur(28px)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div className="h-full flex items-center justify-between px-6 xl:px-8">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <CuboidLogo width={30} height={30} />
            <span className="text-text_primary font-bold text-lg tracking-tight hidden sm:block">CUBOID</span>
          </a>

          {/* Center: Navigation — single row, no wrap */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-text_muted text-[14px] font-medium hover:text-text_primary transition-colors rounded-btn hover:bg-white/[0.03] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions — single row, no wrap, no duplicate */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <a href="/login" className="btn-ghost-nav">
              Sign in
            </a>
            <a
              href="#whatsapp"
              className="btn btn-green h-[40px] px-6 text-[14px]"
              style={{ borderRadius: 10 }}
            >
              Start on WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden p-2 text-text_muted hover:text-text_primary"
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
              background: "rgba(10,18,30,0.96)",
              backdropFilter: "blur(28px)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-text_muted text-[15px] font-medium hover:text-text_primary hover:bg-white/[0.03] rounded-btn transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-white/[0.06] my-3" />
              <a href="/login" className="btn btn-ghost-nav h-[44px] text-[14px]">Sign in</a>
              <a href="#whatsapp" className="btn btn-green h-[44px] text-[14px]" style={{ borderRadius: 10 }}>Start on WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
