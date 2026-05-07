"use client";
import { motion } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Technology", href: "/technology" },
  { label: "Compliance", href: "/compliance" },
  { label: "About", href: "/about" },
  { label: "Developers", href: "/developers" },
];

export function Navigation() {
  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 h-[96px] navbar-glass">
      <div className="max-w-[1600px] mx-auto px-[80px] h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CuboidLogo />
          <span className="text-[rgba(255,255,255,0.96)] font-['Inter'] font-semibold text-xl tracking-tight">CUBOID</span>
        </div>
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-[rgba(255,255,255,0.82)] font-['Inter'] text-sm font-medium hover:text-[rgba(255,255,255,0.96)] transition-colors">{link.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-[rgba(255,255,255,0.82)] font-['Inter'] text-sm font-medium hover:text-[rgba(255,255,255,0.96)] transition-colors">Sign In</a>
          <button className="h-[60px] px-8 text-sm bg-[#6B8CFF] text-white rounded-[18px] font-semibold hover:bg-[#5A7AE8] transition-all">Request Access</button>
        </div>
      </div>
    </motion.header>
  );
}