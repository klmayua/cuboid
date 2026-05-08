"use client";

import { CuboidLogo } from "./CuboidLogo";
import { Shield, Banknote, Activity, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-bg_primary">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <CuboidLogo width={36} height={36} />
              <span className="text-text_primary font-bold text-xl tracking-tight">CUBOID</span>
            </div>
            <p className="text-[15px] text-text_secondary leading-relaxed mb-6 max-w-[320px]">
              The verified African exchange network. Institutional-grade infrastructure for everyone.
            </p>
            <div className="flex items-center gap-2 text-[13px] text-trust_green">
              <span className="w-2 h-2 rounded-full bg-trust_green animate-pulse" />
              All Systems Operational
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-text_muted mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#exchange" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Exchange</a></li>
              <li><a href="#brokers" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Brokers</a></li>
              <li><a href="#bdc" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">BDC Network</a></li>
              <li><a href="#alerts" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Rate Alerts</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-text_muted mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">About</a></li>
              <li><a href="/careers" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Contact</a></li>
              <li><a href="/compliance-page" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Compliance</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-text_muted mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#learn" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Learn</a></li>
              <li><a href="/technology" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Technology</a></li>
              <li><a href="/solutions" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Solutions</a></li>
              <li><a href="#" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-text_muted mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[14px] text-text_secondary hover:text-text_primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[14px] text-text_secondary hover:text-text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="text-[14px] text-text_secondary hover:text-text-primary transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-text_muted">
            © 2026 CUBOID Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[12px] text-text_muted">
              <Shield size={14} className="text-trust_green" /> SOC 2 Type II
            </span>
            <span className="flex items-center gap-2 text-[12px] text-text_muted">
              <Banknote size={14} className="text-premium_gold" /> CBN Licensed
            </span>
            <span className="flex items-center gap-2 text-[12px] text-text_muted">
              <Activity size={14} className="text-cuboid_blue" /> 99.9% Uptime
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
