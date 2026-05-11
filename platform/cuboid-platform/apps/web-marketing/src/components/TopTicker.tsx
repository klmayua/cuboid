"use client";

import { useRealtimeMarket, type PublishedRate } from "@cuboid/api-sdk/hooks";

interface TickerPart {
  text: string;
  type: "pair" | "value" | "delta_positive" | "delta_negative" | "market_label" | "label" | "loading";
}

interface TickerItem {
  parts: TickerPart[];
}

function formatRate(n: number): string {
  return n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPercent(n: number): string {
  const sign = n >= 0 ? "↑" : "↓";
  return `${sign} ${Math.abs(n).toFixed(2)}%`;
}

function buildItems(rates: PublishedRate[]): TickerItem[] {
  const items: TickerItem[] = [];

  for (const rate of rates.slice(0, 4)) {
    const deltaType = rate.trend === "UP" ? "delta_positive" : rate.trend === "DOWN" ? "delta_negative" : "delta_positive";
    items.push({
      parts: [
        { text: rate.symbol.replace("_", "/"), type: "pair" },
        { text: formatRate(rate.cuboidMidpoint), type: "value" },
        { text: formatPercent(rate.changePercent), type: deltaType },
      ],
    });
  }

  // Market health indicators
  const avgConfidence = rates.length > 0
    ? rates.reduce((s, r) => s + r.confidence, 0) / rates.length
    : 0;

  const avgSpread = rates.length > 0
    ? rates.reduce((s, r) => s + r.spread, 0) / rates.length
    : 0;

  const totalSources = rates.reduce((s, r) => s + r.sourceCount, 0);

  items.push({
    parts: [
      { text: `${totalSources} active sources`, type: "market_label" },
    ],
  });

  items.push({
    parts: [
      { text: `${Math.round(avgConfidence)}%`, type: "value" },
      { text: "market confidence", type: "label" },
    ],
  });

  items.push({
    parts: [
      { text: "Spread", type: "label" },
      { text: avgSpread.toFixed(2), type: "value" },
    ],
  });

  return items;
}

function buildLoadingItems(): TickerItem[] {
  return [
    { parts: [{ text: "Loading market data...", type: "loading" }] },
    { parts: [{ text: "Loading market data...", type: "loading" }] },
    { parts: [{ text: "Loading market data...", type: "loading" }] },
  ];
}

function PartSpan({ part }: { part: TickerPart }) {
  const styles: Record<string, React.CSSProperties> = {
    pair: { color: "#C9D4E5", fontWeight: 500 },
    value: { color: "#F7FAFC", fontWeight: 600 },
    delta_positive: { color: "#00DC82", fontWeight: 600 },
    delta_negative: { color: "#FF5A6B", fontWeight: 600 },
    market_label: { color: "#D4AF37", fontWeight: 500 },
    label: { color: "#8EA0B8", fontWeight: 500 },
    loading: { color: "#8EA0B8", fontWeight: 400, fontStyle: "italic" },
  };
  return (
    <span style={styles[part.type]} className="whitespace-nowrap text-xs lg:text-[13px]">
      {part.text}
    </span>
  );
}

export function TopTicker() {
  const { rates, loading } = useRealtimeMarket("/api/market/ticker");

  const allItems = loading && rates.length === 0 ? buildLoadingItems() : buildItems(rates);
  const mobileItems = allItems.slice(0, Math.min(5, allItems.length));

  const renderItems = (items: typeof allItems) =>
    items.map((item, i) => (
      <div key={i} className="flex items-center shrink-0" style={{ gap: 8 }}>
        {item.parts.map((part, pi) => (
          <PartSpan key={pi} part={part} />
        ))}
        <span
          className="w-[3px] h-[3px] rounded-full shrink-0"
          style={{ background: "rgba(255,255,255,0.18)", marginLeft: 10 }}
        />
      </div>
    ));

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[900] overflow-hidden h-[34px] lg:h-ticker"
      style={{
        background: "rgba(7,17,26,0.96)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Mobile track */}
      <div className="h-full flex items-center lg:hidden ticker-track-mobile px-4">
        <div className="flex items-center pr-6" style={{ gap: 42 }}>
          {renderItems(mobileItems)}
        </div>
        <div className="flex items-center pr-6" style={{ gap: 42 }}>
          {renderItems(mobileItems)}
        </div>
      </div>
      {/* Desktop track */}
      <div className="h-full hidden lg:flex items-center ticker-track px-7">
        <div className="flex items-center pr-6" style={{ gap: 42 }}>
          {renderItems(allItems)}
        </div>
        <div className="flex items-center pr-6" style={{ gap: 42 }}>
          {renderItems(allItems)}
        </div>
      </div>
    </div>
  );
}
