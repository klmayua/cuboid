"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, TrendingUp, BarChart3, Users, FileText,
  Shield, Wallet, DollarSign, Activity, MessageCircle,
  Bell, Settings, Search, Menu, X, ChevronDown,
  UserPlus, Receipt, ArrowLeftRight, Network, Building2,
  Clock, Star, AlertCircle, Calendar, CheckCircle2,
  Send, Globe, Target, Briefcase, Inbox, Star as StarIcon,
  ChevronRight, LogOut, PlusCircle
} from "lucide-react";

const SIDEBAR_SECTIONS = [
  {
    label: "DASHBOARD",
    items: [{ icon: LayoutDashboard, label: "Overview", href: "/dashboard/partner" }],
  },
  {
    label: "TRADING",
    items: [
      { icon: Inbox, label: "Request Feed", href: "/dashboard/partner/requests" },
      { icon: TrendingUp, label: "Live Market", href: "/dashboard/partner/market" },
      { icon: FileText, label: "Quote Center", href: "/dashboard/partner/quotes" },
      { icon: Network, label: "Counterparty Market", href: "/dashboard/partner/counterparties" },
    ],
  },
  {
    label: "CUSTOMERS",
    items: [
      { icon: Users, label: "Customer Directory", href: "/dashboard/partner/customers" },
      { icon: Target, label: "CRM Pipeline", href: "/dashboard/partner/pipeline" },
      { icon: Shield, label: "KYC Center", href: "/dashboard/partner/kyc" },
    ],
  },
  {
    label: "TRANSACTIONS",
    items: [
      { icon: Shield, label: "Escrow Center", href: "/dashboard/partner/escrows" },
      { icon: Activity, label: "Settlement Center", href: "/dashboard/partner/settlements" },
      { icon: Clock, label: "Trade History", href: "/dashboard/partner/history" },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { icon: Wallet, label: "Wallets", href: "/dashboard/partner/wallets" },
      { icon: DollarSign, label: "Liquidity", href: "/dashboard/partner/liquidity" },
      { icon: TrendingUp, label: "Revenue", href: "/dashboard/partner/revenue" },
    ],
  },
  {
    label: "INTELLIGENCE",
    items: [
      { icon: BarChart3, label: "Analytics", href: "/dashboard/partner/analytics" },
      { icon: Globe, label: "Corridor Intel", href: "/dashboard/partner/corridors" },
    ],
  },
  {
    label: "COMMUNICATION",
    items: [
      { icon: MessageCircle, label: "Messages", href: "/dashboard/partner/messages" },
      { icon: Bell, label: "Notifications", href: "/dashboard/partner/notifications" },
    ],
  },
  {
    label: "ADMIN",
    items: [
      { icon: Users, label: "Team", href: "/dashboard/partner/team" },
      { icon: Settings, label: "Settings", href: "/dashboard/partner/settings" },
    ],
  },
];

const NOTIFICATIONS = [
  { id: 1, text: "Quote accepted - Adebayo Logistics", time: "2m ago", type: "quote" },
  { id: 2, text: "New FX request from Mansa Trading", time: "8m ago", type: "request" },
  { id: 3, text: "Escrow ESC-1023 funded", time: "15m ago", type: "escrow" },
  { id: 4, text: "Settlement completed - Kijani Imports", time: "1h ago", type: "settlement" },
  { id: 5, text: "Wallet funded: ₦25M (USD)", time: "2h ago", type: "wallet" },
];

const TASKS = [
  { id: 1, text: "Follow up: Coastal Freight Ltd", priority: "high", due: "Today" },
  { id: 2, text: "Complete KYC for Savannah Holdings", priority: "high", due: "Today" },
  { id: 3, text: "Review Escrow ESC-1020 dispute", priority: "critical", due: "Jun 2" },
  { id: 4, text: "Verify settlement proof - REQ-2841", priority: "medium", due: "Jun 3" },
];

const CALENDAR_ITEMS = [
  { id: 1, text: "Escrow ESC-1025 expiry", date: "Jun 4", type: "deadline" },
  { id: 2, text: "Settlement deadline: Savannah Holdings", date: "Jun 5", type: "deadline" },
  { id: 3, text: "CBN Compliance Review", date: "Jun 12", type: "event" },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#050D16] text-white flex">
      {/* LEFT SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-200 ${
          sidebarOpen ? "w-[280px]" : "w-0 overflow-hidden"
        }`}
        style={{
          background: "linear-gradient(180deg, rgba(8,16,26,0.98) 0%, rgba(10,18,30,0.96) 100%)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Sidebar header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F2D27B] flex items-center justify-center">
              <span className="text-[10px] font-extrabold text-[#07111A]">C</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">Partner Trading Floor</p>
              <p className="text-[9px] text-[#64748B]">Zenith FX Partners</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-[#64748B] hover:text-white lg:hidden">
            <X size={16} />
          </button>
        </div>

        {/* Sidebar nav */}
        <div className="h-[calc(100%-56px)] overflow-y-auto px-3 py-3 space-y-4">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="text-[9px] font-semibold text-[#64748B] tracking-[0.12em] mb-1.5 px-2">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium transition-colors ${
                        isActive
                          ? "bg-white/[0.06] text-[#D4AF37]"
                          : "text-[#94A3B8] hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <Icon size={14} strokeWidth={1.8} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Sidebar toggle button (when closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-3 left-3 z-50 w-8 h-8 rounded-lg bg-[#0E1824] border border-white/[0.08] flex items-center justify-center text-[#94A3B8] hover:text-white lg:hidden"
        >
          <Menu size={16} />
        </button>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex" style={{ marginLeft: sidebarOpen ? 280 : 0 }}>
        <div className="flex-1 min-w-0">
          {/* TOP BAR */}
          <header
            className="sticky top-0 z-40 h-14 border-b border-white/[0.06] flex items-center px-5 gap-4"
            style={{
              background: "rgba(5,13,22,0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#64748B] hover:text-white hidden lg:block"
            >
              <Menu size={18} />
            </button>
            <h2 className="text-sm font-semibold text-white hidden sm:block">Partner Trading Floor</h2>

            <div className="flex-1 max-w-xl mx-auto relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                placeholder="Search customer, quote, escrow or transaction..."
                className="w-full h-9 pl-9 pr-4 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[12px] text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37]/30"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative text-[#94A3B8] hover:text-white">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#EF4444] text-[8px] font-bold flex items-center justify-center">5</span>
              </button>
              <button className="text-[#94A3B8] hover:text-white">
                <MessageCircle size={18} />
              </button>
              <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#D4AF37]">ZF</span>
                </div>
                <span className="text-[11px] text-[#94A3B8] hidden sm:inline">Zenith FX</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          {children}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside
          className={`hidden xl:block border-l border-white/[0.06] transition-all duration-200 ${
            rightOpen ? "w-[320px]" : "w-0 overflow-hidden"
          }`}
          style={{ background: "rgba(7,17,26,0.5)" }}
        >
          <div className="h-full overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#64748B] tracking-wider uppercase">Right Panel</span>
              <button onClick={() => setRightOpen(false)} className="text-[#64748B] hover:text-white">
                <X size={14} />
              </button>
            </div>

            {/* Notifications */}
            <div>
              <h4 className="text-[11px] font-semibold text-white mb-2">Notifications</h4>
              <div className="space-y-1.5">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-[#0E1824] border border-white/[0.04] text-[11px]">
                    <p className="text-white leading-tight">{n.text}</p>
                    <p className="text-[#64748B] text-[10px] mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div>
              <h4 className="text-[11px] font-semibold text-white mb-2">Tasks</h4>
              <div className="space-y-1.5">
                {TASKS.map((t) => (
                  <div key={t.id} className="flex items-start gap-2 p-2 rounded-lg bg-[#0E1824] border border-white/[0.04]">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      t.priority === "critical" ? "bg-[#EF4444]" : t.priority === "high" ? "bg-[#D4AF37]" : "bg-[#3B82F6]"
                    }`} />
                    <div className="text-[11px]">
                      <p className="text-white leading-tight">{t.text}</p>
                      <p className="text-[#64748B] text-[10px] mt-0.5">{t.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div>
              <h4 className="text-[11px] font-semibold text-white mb-2">Calendar</h4>
              <div className="space-y-1.5">
                {CALENDAR_ITEMS.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 p-2 rounded-lg bg-[#0E1824] border border-white/[0.04] text-[11px]">
                    <Calendar size={12} className="text-[#64748B]" />
                    <div>
                      <p className="text-white leading-tight">{c.text}</p>
                      <p className="text-[#64748B] text-[10px]">{c.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
