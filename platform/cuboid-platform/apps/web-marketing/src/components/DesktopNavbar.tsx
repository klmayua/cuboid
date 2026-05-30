"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";
import { MessageCircle, User } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const navLinks = [
  { label: "Markets", href: "#markets" },
  { label: "Brokers", href: "#brokers" },
  { label: "BDC Onboarding", href: "#bdc-onboarding" },
  { label: "Treasury", href: "#treasury" },
  { label: "Market Network", href: "#market-network" },
  { label: "Learn", href: "#bdc-onboarding" },
];

export function DesktopNavbar() {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <>
      {/* DESKTOP FLOATING NAV */}
      <header
        className="fixed left-1/2 -translate-x-1/2 z-[950] w-full max-w-[1240px] hidden lg:block"
        style={{ top: 66 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
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
            <nav className="nav-group flex items-center justify-center gap-[36px]" style={{ lineHeight: 1 }}>
              {navLinks.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link${isActive ? " active" : ""}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-[14px]">
              <a
                href="/signin"
                className="inline-flex items-center justify-center gap-[8px] transition-all duration-220"
                style={{
                  height: 42,
                  paddingInline: 14,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#CBD5E1",
                  borderRadius: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F8FAFC";
                  e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#CBD5E1";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <User size={15} strokeWidth={1.9} />
                Sign in
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green text-[14px] font-semibold gap-[10px]"
                style={{
                  height: 44,
                  paddingInline: 22,
                  borderRadius: 10,
                  boxShadow: "0 0 24px rgba(0,168,107,0.20)",
                }}
              >
                <MessageCircle size={18} strokeWidth={1.9} />
                Start on WhatsApp
              </a>
            </div>
          </div>
        </div>
        </motion.div>
      </header>


    </>
  );
}
