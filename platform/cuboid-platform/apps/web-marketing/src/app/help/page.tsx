'use client';

import Link from 'next/link';
import { CuboidLogo } from '@cuboid/design-system';
import { ArrowLeft, MessageCircle, Mail, Phone, FileText, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

const topics = [
  { title: 'Getting Started', articles: ['How to create an account', 'How to verify your identity', 'How to add funds'] },
  { title: 'Sending Money', articles: ['How to send money', 'Understanding fees', 'Transfer limits'] },
  { title: 'Receiving Money', articles: ['How to receive money', 'Bank vs BDC pickup', 'Currency conversion'] },
  { title: 'Account & Security', articles: ['Reset password', 'Two-factor authentication', 'Managing sessions'] },
];

export default function HelpPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#05070D]">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto">
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
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-xl text-[#7183A6] mb-8">How can we help you today?</p>

          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#7183A6] focus:border-[#5E8DFF] outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {topics.map((topic, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">{topic.title}</h3>
                <ul className="space-y-2">
                  {topic.articles.map((article, j) => (
                    <li key={j}>
                      <a href="#" className="flex items-center gap-2 text-sm text-[#7183A6] hover:text-white">
                        <FileText className="w-4 h-4" /> {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://wa.me/254700000000" className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#5E8DFF] transition-colors">
              <MessageCircle className="w-8 h-8 text-[#5E8DFF] mx-auto mb-3" />
              <h3 className="text-white font-medium">WhatsApp</h3>
              <p className="text-sm text-[#7183A6]">Chat with us</p>
            </a>
            <a href="mailto:support@cuboid.africa" className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#5E8DFF] transition-colors">
              <Mail className="w-8 h-8 text-[#5E8DFF] mx-auto mb-3" />
              <h3 className="text-white font-medium">Email</h3>
              <p className="text-sm text-[#7183A6]">support@cuboid.africa</p>
            </a>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Phone className="w-8 h-8 text-[#5E8DFF] mx-auto mb-3" />
              <h3 className="text-white font-medium">Phone</h3>
              <p className="text-sm text-[#7183A6]">+254 700 000 000</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#0B1020] border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#7183A6]">© 2024 Cuboid Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}