"use client";

import { Home, ArrowLeftRight, MapPin, Bell, User, MessageCircle } from "lucide-react";

const mobileNavItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Exchange", icon: ArrowLeftRight, href: "#exchange" },
  { label: "Nearby", icon: MapPin, href: "#nearby" },
  { label: "Alerts", icon: Bell, href: "#alerts" },
  { label: "Account", icon: User, href: "#account" },
];

export function MobileBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[300] h-mob-nav safe-area-pb xl:hidden"
      style={{
        background: "rgba(2,6,23,.94)",
        backdropFilter: "blur(22px)",
        borderTop: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div className="h-full flex items-center justify-around px-2">
        {mobileNavItems.slice(0, 2).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <item.icon size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}

        {/* Center Elevated WhatsApp Button */}
        <a
          href="#whatsapp"
          className="flex flex-col items-center justify-center -mt-5"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00C389, #009F70)",
              boxShadow: "0 4px 20px rgba(0,195,137,.45), 0 0 0 4px rgba(2,6,23,.94)",
            }}
          >
            <MessageCircle size={24} className="text-bg_primary" strokeWidth={2.2} />
          </div>
          <span className="text-[10px] font-medium text-trust_green mt-1">WhatsApp</span>
        </a>

        {mobileNavItems.slice(2).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <item.icon size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
