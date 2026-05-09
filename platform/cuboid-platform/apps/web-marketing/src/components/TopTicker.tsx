"use client";

interface TickerPart {
  text: string;
  type: "pair" | "value" | "delta_positive" | "delta_negative" | "market_label" | "label";
}

interface TickerItem {
  parts: TickerPart[];
}

const allItems: TickerItem[] = [
  {
    parts: [
      { text: "USD/NGN", type: "pair" },
      { text: "1,517.50", type: "value" },
      { text: "↑ 0.12%", type: "delta_positive" },
    ],
  },
  {
    parts: [
      { text: "GBP/NGN", type: "pair" },
      { text: "1,923.80", type: "value" },
      { text: "↑ 0.08%", type: "delta_positive" },
    ],
  },
  {
    parts: [
      { text: "EUR/NGN", type: "pair" },
      { text: "1,645.25", type: "value" },
      { text: "↓ 0.04%", type: "delta_negative" },
    ],
  },
  {
    parts: [{ text: "Lagos desks active", type: "market_label" }],
  },
  {
    parts: [
      { text: "98%", type: "value" },
      { text: "settlement satisfaction", type: "label" },
    ],
  },
  {
    parts: [
      { text: "Spread", type: "label" },
      { text: "0.38", type: "value" },
    ],
  },
];

const mobileItems = allItems.slice(0, 5);

function PartSpan({ part }: { part: TickerPart }) {
  const styles: Record<string, React.CSSProperties> = {
    pair: { color: "#C9D4E5", fontWeight: 500 },
    value: { color: "#F7FAFC", fontWeight: 600 },
    delta_positive: { color: "#00DC82", fontWeight: 600 },
    delta_negative: { color: "#FF5A6B", fontWeight: 600 },
    market_label: { color: "#D4AF37", fontWeight: 500 },
    label: { color: "#8EA0B8", fontWeight: 500 },
  };
  return (
    <span style={styles[part.type]} className="whitespace-nowrap text-xs lg:text-[13px]">
      {part.text}
    </span>
  );
}

export function TopTicker() {
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
