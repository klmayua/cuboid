"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const metrics = [
  { value: 1000000, suffix: "+", label: "quote requests", prefix: "" },
  { value: 500, suffix: "+", label: "brokers", prefix: "" },
  { value: 120, suffix: "+", label: "verified desks", prefix: "" },
  { value: 24, suffix: "/7", label: "WhatsApp access", prefix: "" },
  { value: 98, suffix: "%", label: "settlement satisfaction", prefix: "" },
];

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / (target / Math.max(target / 50, 1))), 16);
    const step = Math.max(Math.floor(target / (duration / stepTime)), 1);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  const format = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(0) + "M";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return n.toString();
  };

  return (
    <span ref={ref} className="font-mono">
      {prefix}{format(count)}{suffix}
    </span>
  );
}

export function MetricsStrip() {
  return (
    <section className="relative bg-panel border-y border-white/[0.06]">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 divide-x divide-white/[0.06]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-8 md:py-10"
            >
              <div className="text-[28px] md:text-[34px] font-bold text-text_primary tracking-tight">
                <AnimatedCounter target={m.value} suffix={m.suffix} prefix={m.prefix} />
              </div>
              <div className="text-[12px] text-text_muted mt-1 text-center">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
