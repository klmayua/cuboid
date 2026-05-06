'use client';

import Link from 'next/link';
import { CuboidLogo } from '../../components/CuboidLogo';
import { ArrowLeft, MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
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
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7183A6] hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-[#7183A6] mb-12">
            We're here to help. Reach out through any of these channels.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="https://wa.me/254700000000" className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#5E8DFF] transition-colors">
              <MessageCircle className="w-10 h-10 text-[#5E8DFF] mx-auto mb-3" />
              <h3 className="text-white font-medium mb-1">WhatsApp</h3>
              <p className="text-sm text-[#7183A6]">Chat with us instantly</p>
            </a>
            <a href="mailto:support@cuboid.africa" className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-[#5E8DFF] transition-colors">
              <Mail className="w-10 h-10 text-[#5E8DFF] mx-auto mb-3" />
              <h3 className="text-white font-medium mb-1">Email</h3>
              <p className="text-sm text-[#7183A6]">support@cuboid.africa</p>
            </a>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Phone className="w-10 h-10 text-[#5E8DFF] mx-auto mb-3" />
              <h3 className="text-white font-medium mb-1">Phone</h3>
              <p className="text-sm text-[#7183A6]">+254 700 000 000</p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#7183A6] mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#5E8DFF] outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm text-[#7183A6] mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#5E8DFF] outline-none" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#7183A6] mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#5E8DFF] outline-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Business Account</option>
                  <option>Partnership</option>
                  <option>Compliance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#7183A6] mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#5E8DFF] outline-none resize-none" placeholder="How can we help you?" />
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl font-medium hover:shadow-xl transition-shadow">
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
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