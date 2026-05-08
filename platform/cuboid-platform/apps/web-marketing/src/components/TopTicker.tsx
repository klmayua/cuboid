"use client";

const tickerItems = [
  { text: "USD/NGN 1,517.50 ↑ 0.12%", sentiment: "positive" },
  { text: "GBP/NGN 1,923.80 ↑ 0.08%", sentiment: "positive" },
  { text: "EUR/NGN 1,645.25 ↓ 0.04%", sentiment: "negative" },
  { text: "Lagos desks active", sentiment: "accent" },
  { text: "98% settlement satisfaction", sentiment: "positive" },
  { text: "Spread 0.38", sentiment: "neutral" },
];

export function TopTicker() {
  const renderItems = () =>
    tickerItems.map((item, i) => {
      let colorClass = "text-text_primary";
      if (item.sentiment === "positive") colorClass = "text-premium_green";
      if (item.sentiment === "negative") colorClass = "text-danger_red";
      if (item.sentiment === "accent") colorClass = "text-gold";
      return (
        <div key={i} className="flex items-center gap-[24px] shrink-0">
          <span className={`text-[13px] font-medium whitespace-nowrap ${colorClass}`}>
            {item.text}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-white/15 shrink-0" />
        </div>
      );
    });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[900] h-ticker overflow-hidden"
      style={{
        background: "rgba(7,17,26,0.96)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        paddingLeft: 28,
        paddingRight: 28,
      }}
    >
      <div className="h-full flex items-center ticker-track">
        <div className="flex items-center gap-[56px] pr-6">
          {renderItems()}
        </div>
        <div className="flex items-center gap-[56px] pr-6">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
