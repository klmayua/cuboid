"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Exchange", href: "#exchange" },
  { label: "Brokers", href: "#brokers" },
  { label: "Nearby desks", href: "#nearby" },
  { label: "Business", href: "#business" },
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
      className="fixed left-0 right-0 z-[500]"
      style={{ top: 60 }}
    >
      <div
        className="h-navbar transition-all duration-300"
        style={{
          background: scrolled ? "rgba(7,17,26,0.92)" : "rgba(7,17,26,0.78)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-content mx-auto px-gutter md:px-gutter-mob h-full flex items-center justify-between">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <CuboidLogo width={32} height={32} />
            <span className="text-text_primary font-bold text-lg tracking-tight hidden sm:block">CUBOID</span>
          </a>

          {/* Center: Navigation — single row, no wrap */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-text_muted text-[14px] font-medium hover:text-text_primary transition-colors rounded-lg hover:bg-white/[0.03] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions — single row, no wrap */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <a href="/login" className="btn-ghost-nav">
              Sign in
            </a>
            <a href="#broker" className="btn-outline-green-nav">
              Join as Broker
            </a>
            <a
              href="#whatsapp"
              className="btn btn-whatsapp h-[40px] px-5 text-[14px]"
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
            className="xl:hidden overflow-hidden"
            style={{
              background: "rgba(7,17,26,0.98)",
              backdropFilter: "blur(22px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-gutter-mob py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-text_muted text-[15px] font-medium hover:text-text_primary hover:bg-white/[0.03] rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-white/[0.06] my-3" />
              <a href="/login" className="btn btn-ghost-nav h-[48px] text-[14px]">Sign in</a>
              <a href="#broker" className="btn btn-outline-green-nav h-[48px] text-[14px]">Join as Broker</a>
              <a href="#whatsapp" className="btn btn-whatsapp h-[48px] text-[14px]">Start on WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
