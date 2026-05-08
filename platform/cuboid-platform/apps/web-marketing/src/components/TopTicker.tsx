"use client";

const allItems = [
  { text: "USD/NGN 1,517.50 ↑ 0.12%", sentiment: "positive" },
  { text: "GBP/NGN 1,923.80 ↑ 0.08%", sentiment: "positive" },
  { text: "EUR/NGN 1,645.25 ↓ 0.04%", sentiment: "negative" },
  { text: "Lagos desks active", sentiment: "accent" },
  { text: "98% settlement satisfaction", sentiment: "positive" },
  { text: "Spread 0.38", sentiment: "neutral" },
];

const mobileItems = allItems.slice(0, 5);

export function TopTicker() {
  const renderItems = (items: typeof allItems) =>
    items.map((item, i) => {
      let colorClass = "text-text_primary";
      if (item.sentiment === "positive") colorClass = "text-premium_green";
      if (item.sentiment === "negative") colorClass = "text-danger_red";
      if (item.sentiment === "accent") colorClass = "text-gold";
      return (
        <div key={i} className="flex items-center gap-[24px] shrink-0">
          <span className={`whitespace-nowrap ${colorClass} text-xs font-semibold lg:text-[13px] lg:font-medium`}>
            {item.text}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-white/15 shrink-0" />
        </div>
      );
    });

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
        <div className="flex items-center gap-7 pr-6">
          {renderItems(mobileItems)}
        </div>
        <div className="flex items-center gap-7 pr-6">
          {renderItems(mobileItems)}
        </div>
      </div>
      {/* Desktop track */}
      <div className="h-full hidden lg:flex items-center ticker-track px-7">
        <div className="flex items-center gap-14 pr-6">
          {renderItems(allItems)}
        </div>
        <div className="flex items-center gap-14 pr-6">
          {renderItems(allItems)}
        </div>
      </div>
    </div>
  );
}
