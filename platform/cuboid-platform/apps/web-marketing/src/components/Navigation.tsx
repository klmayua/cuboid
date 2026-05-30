"use client";

import { motion } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";
import { Search } from "lucide-react";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Technology", href: "/technology" },
  { label: "Compliance", href: "/compliance-page" },
  { label: "About", href: "/about" },
];

export function Navigation() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="obsidian_glass h-navbar">
        <div className="max-w-container mx-auto px-gutter h-full flex items-center justify-between">
          {/* Left: Logo + Wordmark */}
          <div className="flex items-center gap-3">
            <CuboidLogo />
            <span className="text-pure_white font-semibold text-xl tracking-tight">CUBOID</span>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-silver_blue font-medium text-sm hover:text-pure_white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-md">
            <button className="p-3 text-silver_blue hover:text-pure_white transition-colors">
              <Search size={20} />
            </button>
            <a
              href="/login"
              className="text-silver_blue font-medium text-sm hover:text-pure_white transition-colors hidden lg:block"
            >
              Sign in
            </a>
            <button className="btn-primary h-button px-lg text-sm">
              Request Access
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}