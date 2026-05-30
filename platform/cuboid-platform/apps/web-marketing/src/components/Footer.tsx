"use client";

import { CuboidLogo } from "./CuboidLogo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <CuboidLogo width={28} height={28} />
              <span className="text-text_primary font-bold text-lg tracking-tight">CUBOID</span>
            </div>
            <p className="text-[14px] text-text_muted leading-relaxed max-w-[280px]">
              Africa&apos;s verified exchange network. Built for trust. Powered by WhatsApp.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[12px] font-semibold text-text_muted mb-3">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#markets" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">Exchange</a></li>
              <li><a href="#brokers" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">Brokers</a></li>
              <li><a href="#bdc-onboarding" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">BDC Infrastructure</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold text-text_muted mb-3">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="/about" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">About</a></li>
              <li><a href="/careers" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold text-text_muted mb-3">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#bdc-onboarding" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">Learn</a></li>
              <li><a href="#" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold text-text_muted mb-3">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[14px] text-text_muted hover:text-text_primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-text_muted">
            &copy; 2026 CUBOID Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-text_muted">
            <span className="w-1.5 h-1.5 rounded-full bg-premium_green" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
