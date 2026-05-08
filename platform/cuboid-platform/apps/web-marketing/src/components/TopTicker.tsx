"use client";

import { useEffect, useRef } from "react";

const tickerItems = [
  { text: "LIVE MARKET", color: "text-text_primary" },
  { text: "847 VERIFIED BROKERS", color: "text-premium_gold" },
  { text: "2,200 VERIFIED BDC DESKS", color: "text-trust_green" },
  { text: "124,892 ALERTS DELIVERED", color: "text-cuboid_blue" },
  { text: "43 ACTIVE CORRIDORS", color: "text-text_primary" },
  { text: "KES/USD ▲", color: "text-trust_green" },
  { text: "NGN/USD ▼", color: "text-danger_red" },
  { text: "GBP/KES ▲", color: "text-trust_green" },
  { text: "INSTANT RATE RESERVATION", color: "text-premium_gold" },
  { text: "WHATSAPP LIVE", color: "text-trust_green" },
  { text: "TELEGRAM LIVE", color: "text-cuboid_blue" },
];

export function TopTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Duplicate content for seamless loop handled by rendering twice
  }, []);

  const renderItems = () =>
    tickerItems.map((item, i) => (
      <div key={i} className="flex items-center gap-3 shrink-0">
        <span className={`text-[13px] font-bold tracking-[0.08em] uppercase whitespace-nowrap ${item.color}`}>
          {item.text}
        </span>
        <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
      </div>
    ));

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[300] h-ticker overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #06101f, #0b1324, #06101f)",
        borderBottom: "1px solid rgba(245,185,65,.12)",
        boxShadow: "0 0 40px rgba(245,185,65,.08)",
      }}
    >
      <div className="h-full flex items-center ticker-track" ref={trackRef}>
        <div className="flex items-center gap-[48px] pr-[48px]">
          {renderItems()}
        </div>
        <div className="flex items-center gap-[48px] pr-[48px]">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
