'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'For small BDCs and startups',
    price: 'Custom',
    features: ['Up to 50 transactions/month', 'Basic analytics', 'Email support', 'Single currency pair'],
  },
  {
    name: 'Professional',
    description: 'For growing financial institutions',
    price: 'Custom',
    features: ['Unlimited transactions', 'Advanced analytics', 'Priority support', 'Multi-currency access', 'API access', 'Dedicated account manager'],
  },
  {
    name: 'Enterprise',
    description: 'For banks and large institutions',
    price: 'Custom',
    features: ['Everything in Professional', 'Custom integrations', 'SLA guarantees', '24/7 phone support', 'On-premise deployment', 'Audit-ready reporting'],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050816]">
      <nav className="h-[88px] glass border-b border-white/[0.06] sticky top-0 z-50">
        <div className="h-full container-main flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#5E8DFF] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#050816"/>
                <path d="M2 17L12 22L22 17" stroke="#5E8DFF" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="#5E8DFF" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#F5F7FF]">CUBOID</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/auth/signin" className="text-[15px] font-medium text-[#A7B3D0] hover:text-[#F5F7FF] hidden lg:block">Sign in</Link>
            <Link href="/auth/signup" className="btn btn-primary h-[44px] px-5 text-[14px]">Get Access</Link>
          </div>
        </div>
      </nav>

      <main className="pt-[88px] pb-[140px]">
        <div className="container-main">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#A7B3D0] hover:text-[#F5F7FF] mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="text-center mb-16">
            <span className="text-caption text-[#5E8DFF] mb-4 block">PRICING</span>
            <h1 className="text-h1 text-[#F5F7FF] mb-4">Plans for Every Scale</h1>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-85">
              Transparent pricing for institutions of all sizes. Contact us for custom enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`glass-card p-8 ${i === 1 ? 'border-[#5E8DFF]/30' : ''}`}>
                <span className="text-[12px] font-semibold text-[#5E8DFF] mb-2 block">{plan.name}</span>
                <h3 className="text-[28px] font-bold text-[#F5F7FF] mb-2">{plan.price}</h3>
                <p className="text-[14px] text-[#A7B3D0] mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-[14px] text-[#A7B3D0]">
                      <Check className="w-4 h-4 text-[#5E8DFF]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`btn w-full ${i === 1 ? 'btn-primary' : 'btn-secondary'}`}>
                  Contact Sales
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-10 border-t border-white/[0.06]">
        <div className="container-main">
          <p className="text-[13px] text-[#A7B3D0] text-center">© 2024 CUBOID. Institutional Financial Infrastructure.</p>
        </div>
      </footer>
    </div>
  );
}