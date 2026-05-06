'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, Check, Globe, Zap, Shield, Headphones, CreditCard, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Personal',
    price: 'Free',
    period: '',
    desc: 'For individuals sending money occasionally',
    features: [
      'Up to $5,000/month',
      'Find nearest BDC',
      'Rate comparison',
      'Rate reservation',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    desc: 'For frequent users who need more',
    features: [
      'Up to $25,000/month',
      'Everything in Personal',
      'Priority support',
      'Historical rate charts',
      'Multi-currency wallet',
      'API access',
    ],
    cta: 'Upgrade Now',
    popular: true,
  },
  {
    name: 'Business',
    price: 'Custom',
    period: '',
    desc: 'For businesses with high volume needs',
    features: [
      'Unlimited transactions',
      'Everything in Premium',
      'Dedicated account manager',
      'Bulk payments',
      'Custom integrations',
      'SLA guarantee',
      '24/7 phone support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const fees = [
  { corridor: 'USA → Kenya', fee: '1.5%', minFee: '$5', avgTime: '15 min' },
  { corridor: 'UK → Nigeria', fee: '1.8%', minFee: '$8', avgTime: '30 min' },
  { corridor: 'UAE → Kenya', fee: '1.5%', minFee: '$5', avgTime: '20 min' },
  { corridor: 'EU → Ghana', fee: '1.7%', minFee: '$6', avgTime: '25 min' },
  { corridor: 'USA → Uganda', fee: '1.6%', minFee: '$5', avgTime: '30 min' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#05070D]">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <CuboidLogo variant="mark" width={32} height={32} />
              <span className="text-xl font-semibold text-white">CUBOID</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="text-sm text-[#7183A6] hover:text-white">Sign in</Link>
              <Link href="/auth/signup" className="text-sm bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white px-4 py-2 rounded-xl font-medium">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-[#7183A6] max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan) => (
              <div key={plan.name} className={`p-8 rounded-2xl border ${plan.popular ? 'bg-[#5E8DFF]/10 border-[#5E8DFF]' : 'bg-white/5 border-white/10'}`}>
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#5E8DFF] text-white text-xs mb-4">Most Popular</span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-[#7183A6]">{plan.period}</span>
                </div>
                <p className="text-[#7183A6] text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white">
                      <Check className="w-4 h-4 text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  plan.popular 
                    ? 'bg-[#5E8DFF] text-white hover:bg-[#4A7AE8]' 
                    : 'glass text-white hover:bg-white/10'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Transfer Fees by Corridor</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-[#7183A6] border-b border-white/10">
                    <th className="pb-4">Corridor</th>
                    <th className="pb-4">Fee</th>
                    <th className="pb-4">Minimum</th>
                    <th className="pb-4">Avg. Time</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee) => (
                    <tr key={fee.corridor} className="border-b border-white/5">
                      <td className="py-4 text-white flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#7183A6]" /> {fee.corridor}
                      </td>
                      <td className="py-4 text-white">{fee.fee}</td>
                      <td className="py-4 text-[#7183A6]">{fee.minFee}</td>
                      <td className="py-4 text-[#7183A6]">{fee.avgTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="p-8 rounded-2xl bg-gradient-to-br from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-[#7183A6] mb-6">We offer tailored pricing for high-volume users and enterprise clients.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium">
              Talk to Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <footer className="bg-[#0B1020] border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-[#7183A6]">© 2024 Cuboid Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}