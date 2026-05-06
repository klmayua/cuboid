'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CuboidLogo } from '@/components/CuboidLogo';
import { 
  MapPin, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Shield, 
  Clock, 
  Wallet,
  Send,
  QrCode,
  Star,
  ChevronDown,
  Menu,
  X,
  Check,
  Globe,
  Building2,
  TrendingUp,
  Users,
  Lock,
  Award,
  Globe2,
  ArrowDownLeft,
  ArrowUpRight,
  Play,
  Download,
  Mail,
  MapPinned,
  DollarSign,
  Activity
} from 'lucide-react';

const liveRates = [
  { pair: 'USD/KES', buy: '152.50', sell: '153.50', change: '+0.25%', up: true },
  { pair: 'EUR/KES', buy: '165.80', sell: '166.80', change: '+0.15%', up: true },
  { pair: 'GBP/KES', buy: '194.20', sell: '195.50', change: '-0.10%', up: false },
  { pair: 'USD/NGN', buy: '1545.00', sell: '1555.00', change: '+0.05%', up: true },
];

const nearestBDCs = [
  { name: 'KenyaForex', distance: '0.8 km', rating: 4.8, wait: '8 min' },
  { name: 'PremierFX', distance: '2.4 km', rating: 4.9, wait: '3 min' },
  { name: 'EAX Nairobi', distance: '5.2 km', rating: 4.5, wait: '15 min' },
];

const currencies = ['KES', 'USD', 'EUR', 'GBP', 'NGN', 'UGX', 'TZS', 'GHS', 'ZAR', 'AED', 'CHF', 'CAD'];

const howItWorks = [
  { step: '01', title: 'Find Nearest BDC', description: 'Locate verified currency exchange partners near you using our live map.' },
  { step: '02', title: 'Compare Rates', description: 'View real-time rates from multiple BDCs and choose the best deal.' },
  { step: '03', title: 'Reserve Your Rate', description: 'Lock in your preferred rate for up to 30 minutes with a simple tap.' },
  { step: '04', title: 'Get QR & Redeem', description: 'Receive a QR code, visit the BDC, and instantly redeem your reserved rate.' },
];

const testimonials = [
  { name: 'Grace Wanjiku', role: 'Business Owner, Nairobi', text: 'Cuboid transformed how I manage payments to suppliers across East Africa. The BDC finder is a game-changer.', avatar: 'GW', rating: 5 },
  { name: 'Michael Otieno', role: 'CEO, TechSolutions Ltd', text: 'The escrow feature gave my customers confidence. Our conversion rate increased by 40%.', avatar: 'MO', rating: 5 },
  { name: 'Amara Okonkwo', role: 'Import/Export, Lagos', text: 'Sending money to multiple countries from one dashboard. Finally, a platform that works for Africa.', avatar: 'AO', rating: 5 },
];

const faqs = [
  { q: 'How do I find the best exchange rates?', a: 'Use our Nearest BDC feature to compare live rates from verified exchange partners near you. You can reserve the best rate instantly.' },
  { q: 'Is my money safe with Cuboid?', a: 'Absolutely. We are SOC 2 Type II compliant, bank-grade security, and work only with regulated financial partners and verified BDCs.' },
  { q: 'How does the BDC reservation work?', a: 'Search for a BDC, compare rates, and tap "Reserve Rate". You\'ll get a QR code valid for 30 minutes. Visit the BDC and show your QR to redeem your rate.' },
  { q: 'Can I use Cuboid for business payments?', a: 'Yes! Cuboid offers business accounts with bulk payments, payroll, supplier settlements, and detailed analytics. Contact our sales team for custom solutions.' },
  { q: 'What countries does Cuboid support?', a: 'We currently operate in Kenya, Nigeria, Uganda, Tanzania, Rwanda, Ghana, and South Africa. More corridors coming soon.' },
];

const corridors = [
  { from: 'USA', to: 'Kenya', volume: '$2.4B', growth: '+18%' },
  { from: 'UK', to: 'Nigeria', volume: '$1.8B', growth: '+12%' },
  { from: 'UAE', to: 'Kenya', volume: '$890M', growth: '+25%' },
  { from: 'EU', to: 'Ghana', volume: '$650M', growth: '+15%' },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [rateTab, setRateTab] = useState<'buy' | 'sell'>('buy');

  const navItems = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Find BDC', href: '/nearest-bdc' },
    { label: 'Business', href: '#business' },
    { label: 'Security', href: '#security' },
    { label: 'Rates', href: '#rates' },
  ];

  return (
    <div className="min-h-screen bg-[#05070D]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <CuboidLogo variant="mark" width={32} height={32} />
              <span className="text-xl font-semibold text-white">CUBOID</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-[#7183A6] hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="hidden sm:block text-sm text-[#7183A6] hover:text-white transition-colors">
                Sign in
              </Link>
              <Link href="/auth/signup" className="text-sm bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-shadow">
                Get Started
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#05070D] pt-20 px-6 md:hidden"
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-lg text-white border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg text-white border-b border-white/10">
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5E8DFF]/20 border border-[#5E8DFF]/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-[#5E8DFF]">Trusted by 25,000+ users</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Move Money<br />
                <span className="text-[#5E8DFF]">With Confidence</span>
              </h1>
              
              <p className="text-lg text-[#7183A6] mb-8 max-w-xl">
                Access verified currency exchange partners across Africa. 
                Compare live rates, reserve your rate, and transact securely— 
                all from your phone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/nearest-bdc" className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl font-medium hover:shadow-xl transition-shadow">
                  <MapPin className="w-5 h-5" />
                  Find Nearest BDC
                </Link>
                <a href="https://wa.me/254700000000" className="flex items-center justify-center gap-2 px-6 py-4 glass rounded-xl font-medium text-white hover:bg-white/10 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-[#7183A6]">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> SOC 2 Type II</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Regulated Partners</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 24/7 Support</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4">
              {/* Live Rates Widget */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#5E8DFF]" />
                    Live Rates
                  </h3>
                  <div className="flex gap-2">
                    <button onClick={() => setRateTab('buy')} className={`px-3 py-1 rounded-lg text-xs ${rateTab === 'buy' ? 'bg-[#5E8DFF] text-white' : 'text-[#7183A6]'}`}>Buy</button>
                    <button onClick={() => setRateTab('sell')} className={`px-3 py-1 rounded-lg text-xs ${rateTab === 'sell' ? 'bg-[#5E8DFF] text-white' : 'text-[#7183A6]'}`}>Sell</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {liveRates.map((rate, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#5E8DFF]/20 flex items-center justify-center text-[#5E8DFF] font-bold text-sm">{rate.pair.slice(0,3)}</div>
                        <span className="text-white font-medium">{rate.pair}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">KES {rateTab === 'buy' ? rate.buy : rate.sell}</p>
                        <span className={`text-xs ${rate.up ? 'text-green-500' : 'text-red-500'}`}>{rate.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearest BDC Quick Widget */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#5E8DFF]" />
                    Nearest Verified BDCs
                  </h3>
                  <Link href="/nearest-bdc" className="text-xs text-[#5E8DFF] hover:underline">View all</Link>
                </div>
                <div className="space-y-3">
                  {nearestBDCs.map((bdc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div>
                        <p className="text-white font-medium">{bdc.name}</p>
                        <p className="text-xs text-[#7183A6]">{bdc.distance} • {bdc.wait} wait</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-white text-sm">{bdc.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/nearest-bdc" className="w-full mt-4 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium text-center block hover:bg-[#4A7AE8] transition-colors">
                  Reserve Best Rate
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-12 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Users', value: '25,000+', icon: Users },
              { label: 'BDC Partners', value: '2,200+', icon: Building2 },
              { label: 'Transactions', value: '$850M+', icon: TrendingUp },
              { label: 'Countries', value: '10+', icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-[#5E8DFF] mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-[#7183A6] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Currencies Strip */}
      <section className="py-8 px-6 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#7183A6] text-sm mb-4">SUPPORTED CURRENCIES</p>
          <div className="flex flex-wrap justify-center gap-3">
            {currencies.map((curr, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-white/5 text-white text-sm border border-white/10">
                {curr}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-[#7183A6] max-w-2xl mx-auto">Get the best exchange rates in four simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2A66] to-[#123E91] flex items-center justify-center text-white font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[#7183A6]">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/nearest-bdc" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8] transition-colors">
              Try It Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Corridor Map / Volume */}
      <section id="rates" className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Active Corridors</h2>
            <p className="text-[#7183A6]">High-volume remittance routes we power daily</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corridors.map((corridor, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0B1020] border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Globe2 className="w-5 h-5 text-[#5E8DFF]" />
                  <span className="text-white font-medium">{corridor.from} → {corridor.to}</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{corridor.volume}</p>
                <span className="text-green-500 text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {corridor.growth} YoY
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built for Business</h2>
              <div className="space-y-6">
                {[
                  { icon: Send, title: 'Bulk Payments', desc: 'Pay thousands of beneficiaries in one batch' },
                  { icon: Wallet, title: 'Smart Escrow', desc: 'Hold funds until delivery is confirmed' },
                  { icon: Shield, title: 'Compliance Ready', desc: 'Built-in KYC, AML, and regulatory reporting' },
                  { icon: Building2, title: 'Partner Network', desc: 'Access verified BDCs, banks, and IMTOs' },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-3 rounded-xl bg-[#5E8DFF]/20 text-[#5E8DFF]">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{feature.title}</h3>
                      <p className="text-[#7183A6] text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30">
              <h3 className="text-xl font-bold text-white mb-6">Business Account Benefits</h3>
              <ul className="space-y-4">
                {['Multi-user access with roles', 'Detailed analytics dashboard', 'API for seamless integration', 'Dedicated account manager', 'Priority support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 py-4 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8] transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Trusted by Thousands</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0B1020] border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-[#7183A6] mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2A66] to-[#123E91] flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-xs text-[#7183A6]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bank-Grade Security</h2>
            <p className="text-[#7183A6] max-w-2xl mx-auto">Your money is protected by institutional-level security infrastructure</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'SOC 2 Type II', desc: 'Independently audited security controls' },
              { icon: Shield, title: 'Regulated Partners', desc: 'Only work with licensed financial institutions' },
              { icon: Award, title: 'Insurance Coverage', desc: 'Funds protected up to required limits' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <item.icon className="w-12 h-12 text-[#5E8DFF] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#7183A6] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#7183A6] transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-[#7183A6]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Move Money Better?</h2>
          <p className="text-[#7183A6] mb-8">Join thousands of users who trust Cuboid for their cross-border payments</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="px-8 py-4 bg-gradient-to-br from-[#0A2A66] to-[#123E91] text-white rounded-xl font-medium hover:shadow-xl transition-shadow">
              Create Free Account
            </Link>
            <a href="https://wa.me/254700000000" className="px-8 py-4 glass rounded-xl font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1020] border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <CuboidLogo variant="mark" mode="light" width={28} height={28} />
                <span className="text-lg font-semibold text-white">CUBOID</span>
              </Link>
              <p className="text-sm text-[#7183A6] max-w-xs">
                Institutional economic infrastructure for Africa and beyond. Trusted, regulated, secure.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#7183A6]">
                <li><Link href="/nearest-bdc" className="hover:text-white">Find BDC</Link></li>
                <li><Link href="/escrow" className="hover:text-white">Escrow</Link></li>
                <li><Link href="/business" className="hover:text-white">Business</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#7183A6]">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white">Press</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#7183A6]">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#7183A6]">© 2024 Cuboid Technologies. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/254700000000" className="p-2 rounded-lg bg-white/5 text-[#7183A6] hover:text-white">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:support@cuboid.africa" className="p-2 rounded-lg bg-white/5 text-[#7183A6] hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}