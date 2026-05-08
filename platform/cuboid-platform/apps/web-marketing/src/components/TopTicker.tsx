"use client";

const tickerItems = [
  { text: "USD/KES 129.45 ↑ 0.8%", sentiment: "positive" },
  { text: "Best buyer 129.10", sentiment: "neutral" },
  { text: "Best seller 129.62", sentiment: "neutral" },
  { text: "GBP/KES 163.20 ↑ 0.3%", sentiment: "positive" },
  { text: "EUR/KES 141.80 ↓ 0.1%", sentiment: "negative" },
  { text: "41 verified desks active", sentiment: "accent" },
  { text: "USD/NGN 1,517.50 ↑ 0.12%", sentiment: "positive" },
  { text: "238 WhatsApp quotes this hour", sentiment: "accent" },
  { text: "GBP/NGN 1,923.80 ↑ 0.08%", sentiment: "positive" },
  { text: "23 verified desks active in Lagos", sentiment: "accent" },
  { text: "EUR/NGN 1,645.25 ↓ 0.04%", sentiment: "negative" },
  { text: "98% settlement satisfaction", sentiment: "positive" },
];

export function TopTicker() {
  const renderItems = () =>
    tickerItems.map((item, i) => {
      let colorClass = "text-text_primary";
      if (item.sentiment === "positive") colorClass = "text-premium_green";
      if (item.sentiment === "negative") colorClass = "text-danger_red";
      if (item.sentiment === "accent") colorClass = "text-gold";
      return (
        <div key={i} className="flex items-center gap-3 shrink-0">
          <span className={`text-[14px] font-medium whitespace-nowrap ${colorClass}`}>
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
      }}
    >
      <div className="h-full flex items-center ticker-track">
        <div className="flex items-center gap-6 pr-6">
          {renderItems()}
        </div>
        <div className="flex items-center gap-6 pr-6">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
