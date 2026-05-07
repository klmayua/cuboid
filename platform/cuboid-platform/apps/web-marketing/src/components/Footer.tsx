"use client";
import { motion } from "framer-motion";
import { CuboidLogo } from "./CuboidLogo";

const footerLinks = {
  product: [{ label: "Solutions", href: "/solutions" }, { label: "Technology", href: "/technology" }, { label: "Compliance", href: "/compliance" }, { label: "Pricing", href: "/pricing" }],
  company: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }, { label: "Press", href: "/press" }],
  resources: [{ label: "Documentation", href: "/docs" }, { label: "API Reference", href: "/api" }, { label: "Status", href: "/status" }, { label: "Blog", href: "/blog" }],
  legal: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "Security", href: "/security" }, { label: "Compliance", href: "/compliance" }],
};

export function Footer() {
  return (
    <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-[#0B1326] border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1600px] mx-auto px-[80px] py-[140px]">
        <div className="grid grid-cols-12 gap-[32px] mb-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6"><CuboidLogo width={32} height={32} /><span className="text-[rgba(255,255,255,0.96)] font-semibold text-lg">CUBOID</span></div>
            <p className="text-[rgba(255,255,255,0.62)] text-sm max-w-[24ch] mb-6">Institutional infrastructure for the movement of value across Africa.</p>
            <div className="flex items-center gap-4"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#71F8E4]" /><span className="text-[rgba(255,255,255,0.62)] text-xs">All Systems Operational</span></div></div>
          </div>
          <div className="col-span-6 lg:col-span-2"><div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">PRODUCT</div><ul className="space-y-3">{footerLinks.product.map((link) => (<li key={link.href}><a href={link.href} className="text-[rgba(255,255,255,0.82)] text-sm hover:text-[rgba(255,255,255,0.96)] transition-colors">{link.label}</a></li>))}</ul></div>
          <div className="col-span-6 lg:col-span-2"><div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">COMPANY</div><ul className="space-y-3">{footerLinks.company.map((link) => (<li key={link.href}><a href={link.href} className="text-[rgba(255,255,255,0.82)] text-sm hover:text-[rgba(255,255,255,0.96)] transition-colors">{link.label}</a></li>))}</ul></div>
          <div className="col-span-6 lg:col-span-2"><div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">RESOURCES</div><ul className="space-y-3">{footerLinks.resources.map((link) => (<li key={link.href}><a href={link.href} className="text-[rgba(255,255,255,0.82)] text-sm hover:text-[rgba(255,255,255,0.96)] transition-colors">{link.label}</a></li>))}</ul></div>
          <div className="col-span-6 lg:col-span-2"><div className="text-[12px] font-semibold tracking-[0.12em] uppercase opacity-70 text-[rgba(255,255,255,0.62)] mb-4">LEGAL</div><ul className="space-y-3">{footerLinks.legal.map((link) => (<li key={link.href}><a href={link.href} className="text-[rgba(255,255,255,0.82)] text-sm hover:text-[rgba(255,255,255,0.96)] transition-colors">{link.label}</a></li>))}</ul></div>
        </div>
        <div className="pt-8 border-t border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[rgba(255,255,255,0.62)] text-sm">© 2026 CUBOID Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6"><span className="text-[rgba(255,255,255,0.62)] text-sm">Nigeria</span><span className="text-[rgba(255,255,255,0.62)] text-sm">•</span><span className="text-[rgba(255,255,255,0.62)] text-sm">Lagos</span></div>
        </div>
      </div>
    </motion.footer>
  );
}