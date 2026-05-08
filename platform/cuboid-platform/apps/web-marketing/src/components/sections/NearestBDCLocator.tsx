"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Clock, Star, Shield, ArrowRight } from "lucide-react";

const nearbyDesks = [
  { name: "Lagos Island Prime BDC", address: "15 Broad Street, Lagos Island", distance: "0.8 km", rating: 4.9, open: true, corridors: ["USD/NGN", "GBP/NGN", "EUR/NGN"] },
  { name: "Victoria Garden City FX", address: "42 Adeola Odeku, V.I.", distance: "2.3 km", rating: 4.7, open: true, corridors: ["USD/NGN", "USD/GHS"] },
  { name: "Ikeja Central Exchange", address: "108 Awolowo Way, Ikeja", distance: "5.1 km", rating: 4.8, open: true, corridors: ["USD/NGN", "GBP/NGN"] },
  { name: "Lekki Phase 1 Desk", address: "23 Admiralty Way, Lekki", distance: "8.4 km", rating: 4.6, open: false, corridors: ["USD/NGN", "EUR/NGN"] },
];

export function NearestBDCLocator() {
  return (
    <section className="relative py-[120px] bg-bg_secondary border-t border-white/[0.06]" id="nearby">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-kicker text-premium_gold uppercase mb-4 block">Verified BDC Locator</span>
          <h2 className="font-section text-text_primary mb-5">
            Find a <span className="text-trust_green">verified desk</span> near you
          </h2>
          <p className="text-body text-text_secondary max-w-[600px]">
            Every listed BDC desk is licensed, inspected, and rated by the community. Walk in or book ahead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-elevated_card border border-white/[0.08] rounded-xl overflow-hidden relative min-h-[420px] flex items-center justify-center"
          >
            <div className="absolute inset-0 grid-overlay opacity-50" />
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at 40% 50%, rgba(0,195,137,.08), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(91,124,255,.06), transparent 50%)"
            }} />
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-trust_green/10 border border-trust_green/30 flex items-center justify-center mx-auto mb-4">
                <Navigation size={28} className="text-trust_green" />
              </div>
              <p className="text-text_primary font-semibold text-[18px] mb-1">Interactive Map</p>
              <p className="text-text_muted text-[14px]">2,200 verified desks across 12 cities</p>
            </div>
            {/* Map Pins */}
            <div className="absolute top-[25%] left-[35%] w-3 h-3 rounded-full bg-cuboid_blue shadow-glow_blue animate-pulse" />
            <div className="absolute top-[40%] left-[55%] w-3 h-3 rounded-full bg-trust_green shadow-glow_green animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-[55%] left-[45%] w-3 h-3 rounded-full bg-premium_gold shadow-glow_gold animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-[30%] left-[65%] w-3 h-3 rounded-full bg-cuboid_blue shadow-glow_blue animate-pulse" style={{ animationDelay: "1.5s" }} />
          </motion.div>

          {/* Desk List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {nearbyDesks.map((desk, i) => (
              <motion.div
                key={desk.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-elevated_card border border-white/[0.08] rounded-xl p-5 hover:border-white/[0.14] hover:bg-elevated_card_soft transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[16px] font-bold text-text_primary group-hover:text-cuboid_blue transition-colors">{desk.name}</h3>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${desk.open ? "bg-trust_green/10 text-trust_green" : "bg-white/[0.06] text-text_muted"}`}>
                    {desk.open ? "OPEN" : "CLOSED"}
                  </span>
                </div>
                <p className="text-[13px] text-text_muted mb-3">{desk.address}</p>
                <div className="flex items-center gap-4 text-[12px] text-text_muted mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-cuboid_blue" />
                    {desk.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-premium_gold fill-premium_gold" />
                    {desk.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={12} className="text-trust_green" />
                    Verified
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {desk.corridors.map((c) => (
                    <span key={c} className="text-[11px] font-semibold px-2 py-1 rounded-md bg-white/[0.04] text-text_secondary border border-white/[0.06]">
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            <a href="#all-desks" className="btn-premium btn-ghost h-[48px] text-[14px] mt-2">
              View All 2,200 Desks
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
