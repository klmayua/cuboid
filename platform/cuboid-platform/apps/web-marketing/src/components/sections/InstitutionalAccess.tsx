"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Briefcase, ArrowRight, CheckCircle, BarChart3, Globe, Shield } from "lucide-react";

const tiers = [
  {
    name: "Retail Converter",
    icon: Briefcase,
    description: "For individuals exchanging currency occasionally.",
    price: "Free",
    features: [
      "Browse live rates",
      "Compare 3 brokers per search",
      "Basic rate alerts (email)",
      "Nearby BDC locator",
      "Community support",
    ],
    cta: "Get Started",
    ctaStyle: "btn-ghost",
    accent: "text-text_primary",
    border: "border-white/[0.08]",
  },
  {
    name: "Active Trader",
    icon: BarChart3,
    description: "For frequent buyers and sellers needing priority.",
    price: "$29",
    period: "/month",
    features: [
      "Everything in Retail",
      "Unlimited broker comparisons",
      "WhatsApp + Telegram alerts",
      "Rate reservation (30 min hold)",
      "Priority broker matching",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    ctaStyle: "btn-blue",
    accent: "text-cuboid_blue",
    border: "border-cuboid_blue/30",
    highlight: true,
  },
  {
    name: "Institutional",
    icon: Building2,
    description: "For corporates, fintechs, and large volume desks.",
    price: "Custom",
    features: [
      "Everything in Active Trader",
      "API access",
      "Dedicated account manager",
      "Custom corridor onboarding",
      "White-label options",
      "SLA guarantees",
      "Compliance reporting",
    ],
    cta: "Contact Sales",
    ctaStyle: "btn-gold",
    accent: "text-premium_gold",
    border: "border-premium_gold/30",
  },
];

export function InstitutionalAccess() {
  return (
    <section className="relative py-[120px] bg-bg_primary border-t border-white/[0.06]" id="pricing">
      <div className="max-w-content mx-auto px-gutter md:px-gutter-mob">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kicker text-premium_gold uppercase mb-4 block">Institutional Access</span>
          <h2 className="font-section text-text_primary mb-5">
            Choose your <span className="text-premium_gold">level of access</span>
          </h2>
          <p className="text-body text-text_secondary max-w-[600px] mx-auto">
            From occasional conversions to high-frequency institutional trading, there is a tier that fits your volume.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-elevated_card border ${tier.border} rounded-xl p-6 xl:p-8 hover:border-white/[0.14] transition-all duration-300 ${
                tier.highlight ? "lg:scale-[1.02] lg:-my-2 shadow-glow_blue" : ""
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cuboid_blue text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`w-12 h-12 rounded-lg bg-white/[0.04] flex items-center justify-center mb-5`}>
                <tier.icon size={22} className={tier.accent} strokeWidth={1.8} />
              </div>
              <h3 className="text-[22px] font-bold text-text_primary mb-2">{tier.name}</h3>
              <p className="text-[15px] text-text_secondary mb-5">{tier.description}</p>
              <div className="mb-6">
                <span className={`text-[40px] font-bold ${tier.accent}`}>{tier.price}</span>
                {tier.period && <span className="text-text_muted text-[16px]">{tier.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-text_secondary">
                    <CheckCircle size={16} className="text-trust_green shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#signup" className={`btn-premium ${tier.ctaStyle} h-[52px] w-full text-[15px]`}>
                {tier.cta}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
