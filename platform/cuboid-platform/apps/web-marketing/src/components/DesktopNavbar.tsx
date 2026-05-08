"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Exchange", href: "#exchange" },
  { label: "Find Nearby Desk", href: "#nearby" },
  { label: "Brokers", href: "#brokers" },
  { label: "BDC Network", href: "#bdc" },
  { label: "Business", href: "#business" },
  { label: "Pricing", href: "#pricing" },
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
      className="fixed left-0 right-0 z-[200]"
      style={{ top: 44 }}
    >
      <div
        className="h-navbar transition-all duration-300"
        style={{
          background: scrolled ? "rgba(2,6,23,.88)" : "rgba(2,6,23,.72)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div className="max-w-container mx-auto px-gutter md:px-gutter-mob h-full flex items-center justify-between">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            <CuboidLogo width={36} height={36} />
            <span className="text-text_primary font-bold text-xl tracking-tight hidden sm:block">CUBOID</span>
          </a>

          {/* Center: Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-text_secondary text-[14px] font-medium hover:text-text_primary transition-colors rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href="/login"
              className="btn-premium btn-ghost h-[44px] px-5 text-[14px]"
            >
              Sign In
            </a>
            <a
              href="#broker"
              className="btn-premium btn-outline-green h-[44px] px-5 text-[14px]"
            >
              Join as Broker
            </a>
            <a
              href="#bdc"
              className="btn-premium btn-outline-gold h-[44px] px-5 text-[14px]"
            >
              Register BDC
            </a>
            <a
              href="#whatsapp"
              className="btn-premium btn-blue h-[44px] px-5 text-[14px]"
            >
              Open WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden p-2 text-text_secondary hover:text-text_primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="xl:hidden overflow-hidden"
            style={{
              background: "rgba(2,6,23,.96)",
              backdropFilter: "blur(22px)",
              borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div className="px-gutter-mob py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-text_secondary text-[15px] font-medium hover:text-text_primary hover:bg-white/[0.04] rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-white/[0.08] my-3" />
              <a href="/login" className="btn-premium btn-ghost h-[48px] text-[14px]">Sign In</a>
              <a href="#broker" className="btn-premium btn-outline-green h-[48px] text-[14px]">Join as Broker</a>
              <a href="#bdc" className="btn-premium btn-outline-gold h-[48px] text-[14px]">Register BDC</a>
              <a href="#whatsapp" className="btn-premium btn-blue h-[48px] text-[14px]">Open WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
