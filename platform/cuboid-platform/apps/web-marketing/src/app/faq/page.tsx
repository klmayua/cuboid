'use client';

import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  { q: 'What is Cuboid?', a: 'Cuboid is a trusted financial infrastructure platform that connects individuals, businesses, and financial institutions through a network of verified BDCs, banks, and money transfer operators across Africa.' },
  { q: 'How do I find the best exchange rates?', a: 'Use our Nearest BDC feature to locate verified currency exchange partners near you. Compare live rates in real-time and reserve your preferred rate instantly.' },
  { q: 'Is my money safe with Cuboid?', a: 'Absolutely. We are SOC 2 Type II compliant, work only with regulated financial partners, and employ bank-grade security measures including AI-powered fraud detection.' },
  { q: 'How does rate reservation work?', a: 'Search for a BDC, compare their rates, and tap "Reserve Rate". You\'ll receive a QR code valid for 30 minutes. Visit the BDC and show your QR to redeem your reserved rate.' },
  { q: 'What countries does Cuboid support?', a: 'We currently operate in Kenya, Nigeria, Uganda, Tanzania, Rwanda, Ghana, and South Africa. More corridors coming soon.' },
  { q: 'What are the fees for sending money?', a: 'Our fees vary by corridor and payment method. View our pricing page for detailed fee information. We believe in transparent pricing with no hidden charges.' },
  { q: 'How long do transfers take?', a: 'Transfer times vary by corridor. Most transfers are completed within minutes to hours. BDC cash pickups can be instant once the recipient visits a pickup location.' },
  { q: 'Can I use Cuboid for business payments?', a: 'Yes! Cuboid offers business accounts with bulk payments, payroll, supplier settlements, and detailed analytics. Contact our sales team for custom solutions.' },
  { q: 'How do I become a BDC partner?', a: 'Visit our Partners page to learn about becoming a verified BDC partner. We have a rigorous verification process to ensure trust and compliance.' },
  { q: 'How do I contact customer support?', a: 'You can reach us via WhatsApp (+254 700 000 000), email (support@cuboid.africa), or phone. Our team is available 24/7.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#05070D]">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <CuboidLogo variant="mark" mode="light" width={32} height={32} />
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
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-[#7183A6] mb-12">Find answers to common questions about Cuboid.</p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#7183A6] transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="px-4 pb-4 text-[#7183A6]">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-white mb-4">Can't find what you're looking for?</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium">
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B1020] border-t border-white/10 py-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-[#7183A6]">© 2024 Cuboid Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}