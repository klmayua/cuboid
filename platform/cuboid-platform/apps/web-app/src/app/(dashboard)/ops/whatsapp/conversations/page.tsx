'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@cuboid/design-system';
import { useAuthStore, selectUser } from '@/features/auth';
import { MessageCircle, Send, UserPlus, ArrowRight, Search, Filter } from 'lucide-react';

interface Conversation {
  id: string;
  state: string;
  workflow: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  whatsappPhone: string;
  whatsappLanguage: string;
}

interface Message {
  id: string;
  direction: string;
  type: string;
  body: string;
  status: string;
  createdAt: string;
}

export default function OpsWhatsAppConversationsPage() {
  const user = useAuthStore(selectUser);
  const orgId = user?.orgId ?? '';
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => { if (!orgId) return; loadConversations(); }, [orgId]);

  async function loadConversations() {
    setLoading(true);
    try {
      const res = await fetch(`/api/ops/whatsapp?organizationId=${orgId}&action=conversations&limit=100`);
      const json = await res.json();
      if (json.success) setConversations(json.data ?? []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function loadMessages(conversationId: string) {
    try {
      const res = await fetch(`/api/ops/whatsapp?organizationId=${orgId}&action=messages&conversationId=${conversationId}`);
      const json = await res.json();
      if (json.success) setMessages(json.data ?? []);
    } catch { /* silent */ }
  }

  function handleSelect(id: string) {
    setSelectedId(id);
    loadMessages(id);
  }

  const filtered = conversations.filter((c) => 
    c.whatsappPhone.toLowerCase().includes(filter.toLowerCase()) ||
    (c.workflow && c.workflow.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-2">Conversations</h1>
          <p className="text-[#7183A6]">Active and historic WhatsApp conversations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card variant="glass" className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-[#7183A6]" />
              <input 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                placeholder="Search conversations..." 
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#7183A6] focus:outline-none"
              />
            </div>
            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="space-y-2">{[1,2,3,4,5].map((i) => <div key={i} className="h-12 rounded-lg bg-white/[0.04] animate-pulse" />)}</div>
              ) : filtered.length === 0 ? (
                <p className="text-sm text-[#7183A6] text-center py-8">No conversations</p>
              ) : (
                filtered.map((conv) => (
                  <button 
                    key={conv.id} 
                    onClick={() => handleSelect(conv.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedId === conv.id ? 'bg-brand-light-trust/20 border border-brand-light-trust/50' : 'bg-white/[0.04] hover:bg-white/[0.06]'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${conv.state === 'ACTIVE' ? 'bg-semantic-success' : conv.state === 'ASSIGNED' ? 'bg-brand-light-trust' : conv.state === 'COMPLETED' ? 'bg-[#7183A6]' : 'bg-semantic-warning'}`} />
                      <span className="text-sm text-white font-medium truncate">{conv.whatsappPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#7183A6]">
                      <span>{conv.workflow || 'No workflow'}</span>
                      <span>·</span>
                      <span>{new Date(conv.createdAt).toLocaleDateString()}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card variant="glass" className="p-4 h-[700px] flex flex-col">
            {!selectedId ? (
              <div className="flex-1 flex items-center justify-center text-[#7183A6]">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Select a conversation</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-2 overflow-y-auto mb-4 p-2">
                  {messages.length === 0 ? (
                    <p className="text-sm text-[#7183A6] text-center py-8">No messages</p>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.direction === 'OUTBOUND' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-xl ${
                            msg.direction === 'OUTBOUND' 
                              ? 'bg-brand-light-trust/20 text-white' 
                              : 'bg-white/[0.06] text-white'
                          }`}
                        >
                          <p className="text-sm">{msg.body}</p>
                          <div className="flex items-center gap-2 mt-1 opacity-60">
                            <span className="text-xs">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                            {msg.direction === 'OUTBOUND' && (
                              <span className={`text-xs ${msg.status === 'DELIVERED' ? 'text-semantic-success' : ''}`}>
                                {msg.status.toLowerCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}