'use client';

import { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Search,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const faqs = [
  { q: 'How do I verify my account?', a: 'Go to Settings > Verification and complete the KYC process with your ID and selfie.' },
  { q: 'What are the transfer limits?', a: 'Verified accounts have daily limits of KES 100,000 and monthly limits of KES 500,000.' },
  { q: 'How do I add a beneficiary?', a: 'Navigate to Beneficiaries and click "Add Beneficiary" to add a new recipient.' },
  { q: 'Can I cancel a pending transfer?', a: 'Yes, go to Activity, find the pending transfer, and select "Cancel Transfer".' },
  { q: 'How do I enable 2FA?', a: 'Go to Settings > Security and enable Two-Factor Authentication.' },
];

const recentTickets = [
  { id: 'T-1234', subject: 'Transfer issue', status: 'OPEN', created: '2 hours ago', priority: 'HIGH' },
  { id: 'T-1233', subject: 'Rate inquiry', status: 'RESOLVED', created: 'Yesterday', priority: 'LOW' },
  { id: 'T-1232', subject: 'Account verification', status: 'RESOLVED', created: '3 days ago', priority: 'MEDIUM' },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1020] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Support</h1>
          <p className="text-[#7183A6]">Get help with your Cuboid account</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Help */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#5E8DFF]/20 to-[#0A2A66]/20 border border-[#5E8DFF]/30">
              <h2 className="text-xl font-bold text-white mb-4">How can we help?</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7183A6]" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[#7183A6] focus:outline-none focus:border-[#5E8DFF]/50"
                />
              </div>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => setShowChat(true)}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
              >
                <MessageCircle className="w-8 h-8 text-[#5E8DFF] mx-auto mb-3" />
                <p className="text-white font-medium">Live Chat</p>
                <p className="text-[#7183A6] text-sm">Instant help</p>
              </button>
              <button className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <Phone className="w-8 h-8 text-[#5E8DFF] mx-auto mb-3" />
                <p className="text-white font-medium">Call Us</p>
                <p className="text-[#7183A6] text-sm">+254 700 000 000</p>
              </button>
              <button className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <Mail className="w-8 h-8 text-[#5E8DFF] mx-auto mb-3" />
                <p className="text-white font-medium">Email</p>
                <p className="text-[#7183A6] text-sm">24h response</p>
              </button>
            </div>

            {/* FAQs */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#5E8DFF]" />
                <h3 className="text-white font-semibold">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="group">
                    <summary className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <span className="text-white">{faq.q}</span>
                      <ChevronRight className="w-5 h-5 text-[#7183A6] group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-2 p-4 text-[#7183A6]">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Recent Tickets */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Recent Tickets</h3>
              <div className="space-y-3">
                {recentTickets.map(ticket => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <p className="text-white font-medium">{ticket.subject}</p>
                      <p className="text-[#7183A6] text-sm">{ticket.id} • {ticket.created}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        ticket.status === 'OPEN' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'
                      }`}>
                        {ticket.status}
                      </span>
                      <ChevronRight className="w-5 h-5 text-[#7183A6]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Submit New Ticket</h3>
              <button className="w-full py-3 bg-[#5E8DFF] text-white rounded-xl font-medium hover:bg-[#4A7AE8] transition-colors">
                Create Ticket
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[#7183A6]">
                  <Phone className="w-4 h-4" />
                  <span>+254 700 000 000</span>
                </div>
                <div className="flex items-center gap-2 text-[#7183A6]">
                  <Mail className="w-4 h-4" />
                  <span>support@cuboid.africa</span>
                </div>
                <div className="flex items-center gap-2 text-[#7183A6]">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri 8AM-6PM EAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}