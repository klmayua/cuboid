'use client';

import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
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
            <span className="text-caption text-[#5E8DFF] mb-4 block">GET IN TOUCH</span>
            <h1 className="text-h1 text-[#F5F7FF] mb-4">Contact Us</h1>
            <p className="text-body-lg text-[#A7B3D0] max-w-[600px] mx-auto opacity-85">
              Have questions about our infrastructure? Our team is ready to help institutions and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1200px] mx-auto">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h3 className="text-h4 text-[#F5F7FF] mb-6">Send us a message</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">First name</label>
                    <input type="text" className="input" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Last name</label>
                    <input type="text" className="input" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Email address</label>
                  <input type="email" className="input" placeholder="institution@company.com" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Subject</label>
                  <select className="input">
                    <option>General Inquiry</option>
                    <option>Institutional Access</option>
                    <option>Partnership</option>
                    <option>Technical Support</option>
                    <option>Compliance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#A7B3D0] uppercase tracking-wider mb-3">Message</label>
                  <textarea rows={5} className="input resize-none" placeholder="Tell us about your inquiry..." />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-h4 text-[#F5F7FF] mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#5E8DFF] mt-1" />
                    <div>
                      <p className="text-[15px] font-medium text-[#F5F7FF]">Headquarters</p>
                      <p className="text-[14px] text-[#A7B3D0] mt-1">Victoria Island, Lagos, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#5E8DFF] mt-1" />
                    <div>
                      <p className="text-[15px] font-medium text-[#F5F7FF]">Email</p>
                      <p className="text-[14px] text-[#A7B3D0] mt-1">institutional@cuboid.africa</p>
                      <p className="text-[14px] text-[#A7B3D0]">support@cuboid.africa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#5E8DFF] mt-1" />
                    <div>
                      <p className="text-[15px] font-medium text-[#F5F7FF]">Phone</p>
                      <p className="text-[14px] text-[#A7B3D0] mt-1">+234 800 CUBOID</p>
                      <p className="text-[14px] text-[#A7B3D0]">Mon-Fri, 9am-6pm WAT</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-h4 text-[#F5F7FF] mb-4">Support Hours</h3>
                <div className="space-y-3 text-[14px] text-[#A7B3D0]">
                  <div className="flex justify-between">
                    <span>Technical Support</span>
                    <span className="text-[#F5F7FF]">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Institutional Sales</span>
                    <span className="text-[#F5F7FF]">Mon-Fri, 9am-6pm WAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance</span>
                    <span className="text-[#F5F7FF]">Mon-Fri, 9am-5pm WAT</span>
                  </div>
                </div>
              </div>
            </div>
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