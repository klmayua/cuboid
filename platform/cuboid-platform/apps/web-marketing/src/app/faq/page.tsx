'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How do I find the best exchange rates?', a: 'Use our Nearest BDC feature to compare live rates from verified exchange partners near you. You can reserve the best rate instantly.' },
  { q: 'Is my money safe with CUBOID?', a: 'Absolutely. We are SOC 2 Type II compliant, bank-grade security, and work only with regulated financial partners and verified BDCs.' },
  { q: 'How does the BDC reservation work?', a: 'Search for a BDC, compare rates, and tap "Reserve Rate". You\'ll get a QR code valid for 30 minutes. Visit the BDC and show your QR to redeem your rate.' },
  { q: 'Can I use CUBOID for business payments?', a: 'Yes! CUBOID offers business accounts with bulk payments, payroll, supplier settlements, and detailed analytics. Contact our sales team for custom solutions.' },
  { q: 'What countries does CUBOID support?', a: 'We currently operate in Kenya, Nigeria, Uganda, Tanzania, Rwanda, Ghana, and South Africa. More corridors coming soon.' },
  { q: 'What are the fees?', a: 'CUBOID charges zero fees for most transactions. Some premium features may have associated costs. See our pricing page for details.' },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

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
            <span className="text-caption text-[#5E8DFF] mb-4 block">SUPPORT</span>
            <h1 className="text-h1 text-[#F5F7FF] mb-4">Frequently Asked Questions</h1>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-85">
              Find answers to common questions about CUBOID's infrastructure and services.
            </p>
          </div>

          <div className="max-w-[800px] mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button 
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-[16px] font-semibold text-[#F5F7FF]">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#A7B3D0] transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-6">
                    <p className="text-[15px] text-[#A7B3D0] leading-relaxed">{faq.a}</p>
                  </div>
                )}
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