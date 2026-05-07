'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CuboidLogo } from '@/components/CuboidLogo';
import { 
  MapPin, 
  ArrowRight, 
  MessageCircle, 
  Shield, 
  Wallet,
  Send,
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
  Mail,
  Activity,
  Network,
  Banknote,
  Zap
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
    <div className="min-h-screen bg-[#0b1326]">
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-[1440px] mx-auto mt-5 h-16 px-6 rounded-lg bg-[#171f33]/40 backdrop-blur-xl border border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <CuboidLogo variant="mark" width={32} height={32} />
            <span className="text-xl font-semibold text-[#dae2fd] tracking-tight">CUBOID FX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-[#bec8d2] hover:text-[#89ceff] transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="hidden sm:block text-sm text-[#bec8d2] hover:text-[#dae2fd] transition-colors">
              Sign in
            </Link>
            <Link href="/auth/signup" className="h-11 px-6 rounded-lg bg-[#0ea5e9] text-[#00344d] font-semibold transition-all hover:brightness-110">
              Get Started
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#dae2fd]">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0b1326] pt-24 px-6 lg:hidden"
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-lg text-[#dae2fd] border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg text-[#dae2fd] border-b border-white/10">
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pb-32 overflow-hidden grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171f33]/80 to-[#171f33]"></div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card gold-accent-border mb-6">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]" />
                <span className="text-xs font-semibold text-[#4edea3] uppercase tracking-widest">Network Status: Operational</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl xl:text-[72px] font-bold leading-[1.1] mb-8 text-[#dae2fd] tracking-tight">
                The Future of <span className="text-[#89ceff]">Institutional Trust.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-[#bec8d2] max-w-2xl mb-10 leading-relaxed">
                Access verified currency exchange partners across Africa. 
                Compare live rates, reserve your rate, and transact securely— 
                all from your phone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/nearest-bdc" className="flex items-center justify-center gap-2 px-8 py-5 rounded-lg font-bold text-lg transition-all bg-[#0ea5e9] text-[#00344d] hover:brightness-110 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]">
                  <MapPin className="w-5 h-5" />
                  Find Nearest BDC
                </Link>
                <Link href="/auth/signup" className="flex items-center justify-center gap-2 px-8 py-5 rounded-lg font-bold text-lg transition-all glass-card border border-white/20 text-[#dae2fd] hover:bg-[#222a3d]/30">
                  <MessageCircle className="w-5 h-5" />
                  Explore Ecosystem
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-[#bec8d2]">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#89ceff]" /> SOC 2 Type II</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#89ceff]" /> Regulated Partners</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[#89ceff]" /> 24/7 Support</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl border border-white/10 bg-[#171f33] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#dae2fd] font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#89ceff]" />
                    Live Rates
                  </h3>
                  <div className="flex gap-1.5">
                    <button onClick={() => setRateTab('buy')} className={`px-2.5 py-1 rounded text-xs ${rateTab === 'buy' ? 'bg-[#0ea5e9] text-[#00344d]' : 'text-[#bec8d2]'}`}>Buy</button>
                    <button onClick={() => setRateTab('sell')} className={`px-2.5 py-1 rounded text-xs ${rateTab === 'sell' ? 'bg-[#0ea5e9] text-[#00344d]' : 'text-[#bec8d2]'}`}>Sell</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {liveRates.map((rate, i) => (
                    <div key={i} className="h-14 px-4 rounded-lg border border-white/5 bg-white/[0.03] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#89ceff]/15 flex items-center justify-center text-[#89ceff] font-bold text-sm">{rate.pair.slice(0,3)}</div>
                        <span className="text-[#dae2fd] font-semibold">{rate.pair}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[#89ceff] font-bold">KES {rateTab === 'buy' ? rate.buy : rate.sell}</p>
                        <span className={`text-xs ${rate.up ? 'text-green-500' : 'text-red-500'}`}>{rate.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/10 bg-[#171f33] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#dae2fd] font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#89ceff]" />
                    Nearest Verified BDCs
                  </h3>
                  <Link href="/nearest-bdc" className="text-xs text-[#89ceff] hover:underline">View all</Link>
                </div>
                <div className="space-y-3">
                  {nearestBDCs.map((bdc, i) => (
                    <div key={i} className="h-14 px-4 rounded-lg border border-white/5 bg-white/[0.03] flex items-center justify-between">
                      <div>
                        <p className="text-[#dae2fd] font-semibold">{bdc.name}</p>
                        <p className="text-xs text-[#bec8d2]">{bdc.distance} • {bdc.wait} wait</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-[#dae2fd] text-sm">{bdc.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/nearest-bdc" className="w-full mt-4 py-3 bg-[#0ea5e9] text-[#00344d] rounded-lg font-semibold text-center block hover:brightness-110 transition-all">
                  Reserve Best Rate
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#89ceff]/5 blur-[120px] rounded-full -z-10"></div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 px-6 bg-[#131b2e]/50 border-y border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Nodes', value: '1,204', icon: Network },
              { label: 'Verified Assets', value: '$14.2B', icon: Banknote },
              { label: 'Uptime', value: '99.999%', icon: Zap },
              { label: 'Countries', value: '10+', icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-lg flex flex-col justify-between group hover:bg-[#222a3d]/30 transition-all duration-500">
                <div>
                  <stat.icon className="w-8 h-8 text-[#89ceff] mb-3" />
                  <span className="text-xs font-semibold text-[#bec8d2] uppercase mb-2 block">{stat.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-[#89ceff]">{stat.value}</span>
                  {i === 1 && <span className="text-xs text-[#4edea3] font-mono">AUDITED</span>}
                  {i === 2 && <span className="text-xs text-[#bec8d2] font-mono">SLA GUARANTEED</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Currencies */}
      <section className="py-8 px-6 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-center text-xs font-semibold text-[#bec8d2] uppercase tracking-widest mb-4">Supported Currencies</p>
          <div className="flex flex-wrap justify-center gap-3">
            {currencies.map((curr, i) => (
              <span key={i} className="px-4 py-2 rounded-lg bg-[#171f33] text-[#dae2fd] text-sm border border-white/10">
                {curr}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#dae2fd] mb-4">Foundation of the Hegemony</h2>
            <p className="text-lg text-[#bec8d2] max-w-2xl mx-auto">Advanced cryptographic architecture designed for the world's most demanding financial institutions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-xl hover:border-[#89ceff]/40 transition-all hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-full bg-[#89ceff]/15 flex items-center justify-center text-[#89ceff] font-bold mb-3">
                  {step.step}
                </div>
                <h3 className="text-base font-semibold text-[#dae2fd] mb-2">{step.title}</h3>
                <p className="text-sm text-[#bec8d2]">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/nearest-bdc" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0ea5e9] text-[#00344d] rounded-lg font-semibold hover:brightness-110 transition-all">
              Try It Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Active Corridors */}
      <section id="rates" className="py-16 px-6 bg-[#131b2e]/50">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#dae2fd] mb-4">Active Corridors</h2>
            <p className="text-lg text-[#bec8d2]">High-volume remittance routes we power daily</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {corridors.map((corridor, i) => (
              <div key={i} className="glass-card p-8 rounded-xl hover:border-[#89ceff]/40 transition-all hover:bg-[#222a3d]/30 hover:scale-[1.02]">
                <div className="flex items-center gap-2 mb-3">
                  <Globe2 className="w-4 h-4 text-[#89ceff]" />
                  <span className="text-[#dae2fd] font-medium">{corridor.from} → {corridor.to}</span>
                </div>
                <p className="text-xl font-bold text-[#dae2fd] mb-1">{corridor.volume}</p>
                <span className="text-green-500 text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {corridor.growth} YoY
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[24px] font-semibold text-[#dae2fd] mb-5">Built for Business</h2>
              <div className="space-y-4">
                {[
                  { icon: Send, title: 'Bulk Payments', desc: 'Pay thousands of beneficiaries in one batch' },
                  { icon: Wallet, title: 'Smart Escrow', desc: 'Hold funds until delivery is confirmed' },
                  { icon: Shield, title: 'Compliance Ready', desc: 'Built-in KYC, AML, and regulatory reporting' },
                  { icon: Building2, title: 'Partner Network', desc: 'Access verified BDCs, banks, and IMTOs' },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#89ceff]/15 flex items-center justify-center text-[#89ceff] shrink-0">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[#dae2fd] font-semibold">{feature.title}</h3>
                      <p className="text-sm text-[#bec8d2]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-8 rounded-xl gold-accent-border">
              <h3 className="text-lg font-semibold text-[#dae2fd] mb-5">Business Account Benefits</h3>
              <ul className="space-y-3">
                {['Multi-user access with roles', 'Detailed analytics dashboard', 'API for seamless integration', 'Dedicated account manager', 'Priority support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#dae2fd]">
                    <Check className="w-5 h-5 text-[#4edea3] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 h-11 bg-[#4edea3] text-[#003824] rounded-lg font-bold hover:brightness-110 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-[#131b2e]/50">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#dae2fd] text-center mb-16">Trusted by Thousands</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="glass-card p-8 rounded-xl hover:border-[#89ceff]/40 transition-all hover:scale-[1.02]">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-[#bec8d2] mb-5">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#89ceff]/15 flex items-center justify-center text-[#89ceff] text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-[#dae2fd] font-medium">{testimonial.name}</p>
                    <p className="text-xs text-[#bec8d2]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#dae2fd] mb-4">Bank-Grade Security</h2>
            <p className="text-lg text-[#bec8d2] max-w-2xl mx-auto">Your money is protected by institutional-level security infrastructure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lock, title: 'SOC 2 Type II', desc: 'Independently audited security controls' },
              { icon: Shield, title: 'Regulated Partners', desc: 'Only work with licensed financial institutions' },
              { icon: Award, title: 'Insurance Coverage', desc: 'Funds protected up to required limits' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-xl text-center hover:border-[#89ceff]/40 transition-all hover:bg-[#222a3d]/30 hover:scale-[1.02]">
                <item.icon className="w-10 h-10 text-[#89ceff] mx-auto mb-3" />
                <h3 className="text-base font-semibold text-[#dae2fd] mb-2">{item.title}</h3>
                <p className="text-sm text-[#bec8d2]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-[#131b2e]/50">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-[24px] font-semibold text-[#dae2fd] text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-[#171f33] px-5 py-4">
                <button 
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-[#dae2fd] font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#bec8d2] transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-[#bec8d2]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#89ceff]/5 opacity-30"></div>
        <div className="max-w-[960px] mx-auto text-center relative z-10">
          <h2 className="text-[24px] font-semibold text-[#dae2fd] mb-5">Enter the Vanguard of Liquidity.</h2>
          <div className="glass-card p-10 rounded-xl gold-accent-border">
            <p className="text-[#bec8d2] mb-8">Limited institutional slots are available for the Q4 expansion. Secure your position in the future of the global ledger.</p>
            <Link href="/auth/signup" className="inline-block px-10 py-4 bg-[#4edea3] text-[#003824] rounded-lg font-bold text-base shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-105">
              Inquire for Onboarding
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#060e20] border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <CuboidLogo variant="mark" mode="light" width={28} height={28} />
                <span className="text-lg font-bold text-[#89ceff] tracking-tight">CUBOID FX</span>
              </Link>
              <p className="text-sm text-[#bec8d2] max-w-xs">
                Institutional economic infrastructure for Africa and beyond. Trusted, regulated, secure.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#dae2fd] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#bec8d2]">
                <li><Link href="/nearest-bdc" className="hover:text-[#4edea3]">Find BDC</Link></li>
                <li><Link href="/escrow" className="hover:text-[#4edea3]">Escrow</Link></li>
                <li><Link href="/business" className="hover:text-[#4edea3]">Business</Link></li>
                <li><Link href="/api" className="hover:text-[#4edea3]">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#dae2fd] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#bec8d2]">
                <li><Link href="/about" className="hover:text-[#4edea3]">About</Link></li>
                <li><Link href="/careers" className="hover:text-[#4edea3]">Careers</Link></li>
                <li><Link href="/press" className="hover:text-[#4edea3]">Press</Link></li>
                <li><Link href="/contact" className="hover:text-[#4edea3]">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#dae2fd] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#bec8d2]">
                <li><Link href="/privacy" className="hover:text-[#4edea3]">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#4edea3]">Terms</Link></li>
                <li><Link href="/security" className="hover:text-[#4edea3]">Security</Link></li>
                <li><Link href="/status" className="hover:text-[#4edea3]">Status</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#bec8d2]">© 2024 CUBOID FX NETWORK. INSTITUTIONAL GRADE LIQUIDITY.</p>
            <div className="flex items-center gap-4">
              <Link href="/status" className="p-2 rounded-lg bg-white/5 text-[#bec8d2] hover:text-[#89ceff]">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <a href="mailto:support@cuboid.africa" className="p-2 rounded-lg bg-white/5 text-[#bec8d2] hover:text-[#89ceff]">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}