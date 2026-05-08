"use client";

import { Home, BarChart3, MessageCircle, MapPin, User } from "lucide-react";

const mobileNavItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Rates", icon: BarChart3, href: "#exchange" },
  { label: "Nearby", icon: MapPin, href: "#nearby" },
  { label: "Account", icon: User, href: "#account" },
];

export function MobileBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[600] h-mob-nav safe-area-pb xl:hidden"
      style={{
        background: "rgba(7,17,26,0.96)",
        backdropFilter: "blur(22px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="h-full flex items-center justify-around px-2">
        {mobileNavItems.slice(0, 2).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <item.icon size={20} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}

        {/* Center Elevated WhatsApp Button */}
        <a href="#whatsapp" className="flex flex-col items-center justify-center -mt-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00A86B, #008f5a)",
              boxShadow: "0 4px 24px rgba(0,168,107,0.35), 0 0 0 4px rgba(7,17,26,0.96)",
            }}
          >
            <MessageCircle size={24} className="text-bg" strokeWidth={2.2} />
          </div>
          <span className="text-[10px] font-medium text-premium_green mt-1">WhatsApp</span>
        </a>

        {mobileNavItems.slice(2).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 py-2 px-3 text-text_muted hover:text-text_primary transition-colors"
          >
            <item.icon size={20} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
