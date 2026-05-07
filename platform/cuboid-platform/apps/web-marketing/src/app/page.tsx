'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CuboidLogo } from '@/components/CuboidLogo';
import { 
  ArrowRight, 
  Globe, 
  Shield, 
  RefreshCw,
  CheckCircle,
  Zap,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpDown,
  Menu,
  X,
  Clock,
  MousePointerClick
} from 'lucide-react';

const liveRates = [
  { pair: 'USD/NGN', buy: '1,535.40', sell: '1,542.10', spread: '0.45%', change: '+1.2%', up: true },
  { pair: 'USD/GHS', buy: '15.42', sell: '15.58', spread: '1.02%', change: '-0.4%', up: false },
  { pair: 'USD/KES', buy: '130.50', sell: '131.25', spread: '0.57%', change: '+0.8%', up: true },
];

const steps = [
  { icon: MousePointerClick, title: '1. Quote Your Rate', desc: 'Select your currency pair and amount. See exactly what you\'ll get based on live institutional liquidity pools.' },
  { icon: Clock, title: '2. Lock It In', desc: 'Once you\'re happy, lock the rate. Your quote is guaranteed for 15 minutes, protecting you from market volatility.' },
  { icon: Wallet, title: '3. Settle Locally', desc: 'Complete the transaction via bank transfer or visit a verified local BDC partner for physical cash collection.' },
];

const footerLinks = {
  products: ['Spot FX', 'Forward Contracts', 'Market Analysis', 'API Access'],
  company: ['About Us', 'Careers', 'Compliance', 'Legal Hub'],
  support: ['Help Center', 'API Documentation', 'System Status', 'Contact'],
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [convertFrom, setConvertFrom] = useState('1000');
  const [convertTo, setConvertTo] = useState('1,540,000.00');

  return (
    <div className="min-h-screen bg-[#0b1326]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b1326]/40 backdrop-blur-xl border-b border-[#3c4947]/30 shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <CuboidLogo variant="mark" width={32} height={32} />
            <span className="text-2xl font-bold tracking-tight text-[#4fdbc8]">INSTITUTIONAL FX</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#rates" className="text-[#4fdbc8] border-b-2 border-[#4fdbc8] pb-1">Market Rates</Link>
            <Link href="#bdc" className="text-[#bbcac6] hover:text-[#4fdbc8] transition-colors">BDC Locator</Link>
            <Link href="#convert" className="text-[#bbcac6] hover:text-[#4fdbc8] transition-colors">Convert</Link>
            <Link href="#business" className="text-[#bbcac6] hover:text-[#4fdbc8] transition-colors">Corporate</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="text-[12px] text-[#bbcac6] hover:text-[#e9c349] transition-colors opacity-80 hover:opacity-100">Login</Link>
            <Link href="/auth/signup" className="bg-[#14b8a6] text-[#00423b] px-6 py-2 rounded-lg text-[12px] font-bold scale-95 active:scale-90 transition-transform">Open Account</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0b1326] pt-24 px-8 md:hidden">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-8 text-[#dbe2fd]">
            <X className="w-6 h-6" />
          </button>
          <div className="space-y-4">
            <Link href="#rates" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg text-[#dbe2fd] border-b border-white/10">Market Rates</Link>
            <Link href="#bdc" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg text-[#dbe2fd] border-b border-white/10">BDC Locator</Link>
            <Link href="#convert" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg text-[#dbe2fd] border-b border-white/10">Convert</Link>
            <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg text-[#dbe2fd] border-b border-white/10">Login</Link>
          </div>
        </div>
      )}

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center px-8 py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1326] via-[#0b1326]/90 to-[#4fdbc8]/10"></div>
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#4fdbc8]/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#e9c349]/5 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-[#e9c349] text-[12px] font-semibold tracking-[0.2em] mb-4 block">TRUSTED BY INSTITUTIONS, BUILT FOR YOU</span>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Global Rates, <br/>
                <span className="text-[#4fdbc8]">Local Trust.</span>
              </h1>
              <p className="text-[#bbcac6] text-2xl max-w-xl mb-10">Access institutional-grade foreign exchange rates for travel, business, and education with the transparency you deserve.</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-[#222a3e]/50 px-4 py-3 rounded-xl border border-[#3c4947]/30">
                  <CheckCircle className="w-5 h-5 text-[#4fdbc8]" />
                  <span className="text-[12px] font-semibold">CBN Licensed</span>
                </div>
                <div className="flex items-center gap-3 bg-[#222a3e]/50 px-4 py-3 rounded-xl border border-[#3c4947]/30">
                  <Zap className="w-5 h-5 text-[#4fdbc8]" />
                  <span className="text-[12px] font-semibold">Instant Settlement</span>
                </div>
              </div>
            </div>
            
            {/* Quick Convert Widget */}
            <div id="convert" className="lg:col-span-5">
              <div className="glass-panel p-8 rounded-xl border border-white/10 active-glow">
                <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <RefreshCw className="w-6 h-6 text-[#e9c349]" />
                  Quick Convert
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-[#bbcac6]">YOU SEND</label>
                    <div className="flex items-center bg-[#060d20] border border-[#3c4947] rounded-lg p-3 focus-within:border-[#4fdbc8] transition-all">
                      <input 
                        className="bg-transparent border-none focus:ring-0 text-white text-2xl w-full" 
                        type="number" 
                        value={convertFrom}
                        onChange={(e) => setConvertFrom(e.target.value)}
                      />
                      <div className="flex items-center gap-2 border-l border-[#3c4947] pl-4 ml-4">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">USD</div>
                        <span className="text-[12px]">USD</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center -my-2 relative z-10">
                    <button className="bg-[#2d3449] border border-[#3c4947]/50 p-2 rounded-full text-[#4fdbc8] hover:rotate-180 transition-transform duration-500">
                      <ArrowUpDown className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-[#bbcac6]">YOU RECEIVE (EST.)</label>
                    <div className="flex items-center bg-[#060d20] border border-[#3c4947] rounded-lg p-3 focus-within:border-[#4fdbc8] transition-all">
                      <input 
                        className="bg-transparent border-none focus:ring-0 text-white text-2xl w-full" 
                        readOnly
                        type="text" 
                        value={convertTo}
                      />
                      <div className="flex items-center gap-2 border-l border-[#3c4947] pl-4 ml-4">
                        <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-[10px] text-white font-bold">NGN</div>
                        <span className="text-[12px]">NGN</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-[12px] text-[#bbcac6]">
                      <span>Rate</span>
                      <span className="text-[#4fdbc8]">1 USD = 1,540.00 NGN</span>
                    </div>
                    <div className="flex justify-between text-[12px] text-[#bbcac6]">
                      <span>Service Fee</span>
                      <span className="text-white">₦0.00 (Zero Fee)</span>
                    </div>
                    <button className="w-full bg-[#4fdbc8] text-[#003731] py-4 rounded-lg text-xl font-bold mt-4 shadow-lg shadow-[#4fdbc8]/20 hover:brightness-110 transition-all">
                      Book This Rate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Market Rates */}
        <section id="rates" className="py-20 px-8 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Live Market Rates</h2>
              <p className="text-[#bbcac6]">Real-time interbank and retail liquidity pools updated every 60 seconds.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#222a3e] rounded-full px-4 py-2 flex items-center gap-2 text-[#4fdbc8] text-[12px] font-semibold">
                <span className="w-2 h-2 bg-[#4fdbc8] rounded-full animate-pulse"></span>
                LIVE STREAMING
              </div>
            </div>
          </div>
          <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2d3449]/50">
                    <th className="p-5 text-[12px] font-semibold text-[#bbcac6] border-b border-[#3c4947]/30">CURRENCY PAIR</th>
                    <th className="p-5 text-[12px] font-semibold text-[#bbcac6] border-b border-[#3c4947]/30">INSTITUTIONAL BUY</th>
                    <th className="p-5 text-[12px] font-semibold text-[#bbcac6] border-b border-[#3c4947]/30">INSTITUTIONAL SELL</th>
                    <th className="p-5 text-[12px] font-semibold text-[#bbcac6] border-b border-[#3c4947]/30">RETAIL SPREAD</th>
                    <th className="p-5 text-[12px] font-semibold text-[#bbcac6] border-b border-[#3c4947]/30">24H CHANGE</th>
                    <th className="p-5 text-[12px] font-semibold text-[#bbcac6] border-b border-[#3c4947]/30">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3c4947]/20">
                  {liveRates.map((rate, i) => (
                    <tr key={i} className={`hover:bg-[#4fdbc8]/5 transition-colors ${i === 1 ? 'bg-[#4fdbc8]/2' : ''}`}>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-[#0b1326] bg-blue-600 flex items-center justify-center text-[10px] font-bold">USD</div>
                            <div className={`w-8 h-8 rounded-full border-2 border-[#0b1326] flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-green-700' : i === 1 ? 'bg-red-600' : 'bg-black'}`}>
                              {rate.pair.slice(4, 7)}
                            </div>
                          </div>
                          <span className="text-2xl font-semibold text-white">{rate.pair}</span>
                        </div>
                      </td>
                      <td className="p-5 font-mono text-white text-sm">{rate.buy}</td>
                      <td className="p-5 font-mono text-white text-sm">{rate.sell}</td>
                      <td className="p-5 font-mono text-[#e9c349] text-sm">{rate.spread}</td>
                      <td className="p-5">
                        <span className={`flex items-center gap-1 text-[12px] font-semibold ${rate.up ? 'text-[#4fdbc8]' : 'text-[#ffb4ab]'}`}>
                          {rate.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {rate.change}
                        </span>
                      </td>
                      <td className="p-5">
                        <button className="text-[#4fdbc8] text-[12px] font-semibold hover:underline">Trade Now</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* BDC Locator Section */}
        <section id="bdc" className="py-20 bg-[#060d20]">
          <div className="max-w-[1600px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Find a Verified BDC</h2>
                <p className="text-[#bbcac6] text-2xl mb-10">We've partnered with licensed Bureau De Change operators to ensure you get safe, physical cash exchange at verified CUBOID rates.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 glass-panel rounded-xl gold-accent-border">
                    <Shield className="w-6 h-6 text-[#e9c349]" />
                    <div>
                      <h4 className="text-white font-semibold mb-2">CUBOID Certified</h4>
                      <p className="text-[#bbcac6]">Every partner on our map is vetted and adheres to our fair-pricing institutional standard.</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#859490]" />
                    <input className="w-full bg-[#222a3e] border border-[#3c4947] rounded-full py-4 pl-12 pr-32 text-white focus:border-[#4fdbc8] transition-all" placeholder="Enter your city or neighborhood..." type="text"/>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4fdbc8] text-[#003731] px-6 py-2 rounded-full text-[12px] font-semibold">SEARCH</button>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-[#3c4947]/30 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold">Victoria Island, Lagos</p>
                    <p className="text-[#bbcac6] text-[12px]">12 Verified Partners Nearby</p>
                  </div>
                  <button className="bg-[#e9c349] text-[#3c2f00] px-4 py-2 rounded-lg text-[12px] font-semibold">View List</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-8 max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">How CUBOID Works</h2>
          <p className="text-[#bbcac6] max-w-2xl mx-auto mb-16">Simple, secure, and transparent FX for regular people with institutional needs.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="p-10 glass-panel rounded-2xl border border-white/5 group hover:border-[#4fdbc8]/30 transition-all">
                <div className="w-16 h-16 bg-[#222a3e] rounded-2xl flex items-center justify-center text-[#4fdbc8] mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <step.icon className="text-4xl" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-[#bbcac6]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-[1600px] mx-auto glass-panel rounded-[2rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4fdbc8]/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience Institutional FX?</h2>
              <p className="text-[#bbcac6] text-2xl max-w-2xl mx-auto mb-10">Join thousands of individuals and SMEs saving on every transaction with CUBOID's transparent ecosystem.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/auth/signup" className="bg-[#4fdbc8] text-[#003731] px-10 py-5 rounded-xl text-2xl font-bold shadow-xl shadow-[#4fdbc8]/20 hover:brightness-110 transition-all">
                  Create Free Account
                </Link>
                <button className="glass-panel border border-[#3c4947] px-10 py-5 rounded-xl text-2xl font-bold text-white hover:bg-white/5 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#060d20] border-t border-[#3c4947]/20">
        <div className="max-w-[1600px] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <CuboidLogo variant="mark" width={24} height={24} />
                <span className="text-2xl font-semibold text-[#4fdbc8]">INSTITUTIONAL FX</span>
              </div>
              <p className="text-[#bbcac6]">Regulated liquidity provider delivering elite financial services to institutional and retail markets globally.</p>
            </div>
            <div>
              <h4 className="text-white text-[12px] font-semibold mb-6 tracking-widest uppercase">Products</h4>
              <ul className="space-y-4 text-[#bbcac6] text-[12px]">
                {footerLinks.products.map((link, i) => (
                  <li key={i}><a className="hover:text-[#e9c349] transition-colors" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[12px] font-semibold mb-6 tracking-widest uppercase">Company</h4>
              <ul className="space-y-4 text-[#bbcac6] text-[12px]">
                {footerLinks.company.map((link, i) => (
                  <li key={i}><a className="hover:text-[#e9c349] transition-colors" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[12px] font-semibold mb-6 tracking-widest uppercase">Support</h4>
              <ul className="space-y-4 text-[#bbcac6] text-[12px]">
                {footerLinks.support.map((link, i) => (
                  <li key={i}><a className="hover:text-[#e9c349] transition-colors" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#3c4947]/10 gap-4">
            <p className="text-[12px] text-[#bbcac6]">© 2024 Institutional FX Global. Regulated Liquidity Provider.</p>
            <div className="flex gap-8">
              <a className="text-[12px] text-[#bbcac6] hover:text-[#e9c349] transition-colors" href="#">Privacy Policy</a>
              <a className="text-[12px] text-[#bbcac6] hover:text-[#e9c349] transition-colors" href="#">Terms of Service</a>
              <a className="text-[12px] text-[#bbcac6] hover:text-[#e9c349] transition-colors" href="#">Compliance</a>
              <a className="text-[12px] text-[#bbcac6] hover:text-[#e9c349] transition-colors" href="#">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}