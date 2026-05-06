'use client';

import { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  X,
  Settings,
  Trash2,
  Mail,
  MessageSquare,
  Smartphone
} from 'lucide-react';

const mockNotifications = [
  { id: 'n1', type: 'SUCCESS', title: 'Transfer Completed', message: 'KES 50,000 sent to Sarah Wanjiku', time: '2 min ago', read: false },
  { id: 'n2', type: 'INFO', title: 'Rate Alert', message: 'USD/KES rate improved to 153.50', time: '15 min ago', read: false },
  { id: 'n3', type: 'WARNING', title: 'Pending Verification', message: 'Complete your KYC to unlock full features', time: '1 hour ago', read: true },
  { id: 'n4', type: 'SUCCESS', title: 'Escrow Released', message: 'Funds for Order #12345 have been released', time: '3 hours ago', read: true },
  { id: 'n5', type: 'INFO', title: 'New Beneficiary', message: 'Tech Solutions Ltd added to beneficiaries', time: 'Yesterday', read: true },
  { id: 'n6', type: 'WARNING', title: 'Rate Expiring', message: 'Your reserved rate expires in 15 minutes', time: 'Yesterday', read: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

  const filtered = filter === 'ALL' ? mockNotifications : mockNotifications.filter(n => !n.read);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'INFO': return <Info className="w-5 h-5 text-[#5E8DFF]" />;
      default: return <Bell className="w-5 h-5 text-[#7183A6]" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'SUCCESS': return 'bg-green-500/10';
      case 'WARNING': return 'bg-yellow-500/10';
      case 'INFO': return 'bg-[#5E8DFF]/10';
      default: return 'bg-white/5';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-[#7183A6]">Stay updated with your transactions and account activity</p>
          </div>
          <button className="p-2 bg-white/10 rounded-lg text-[#7183A6] hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'ALL' ? 'bg-[#5E8DFF] text-white' : 'bg-white/10 text-[#7183A6] hover:bg-white/20'
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setFilter('UNREAD')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              filter === 'UNREAD' ? 'bg-[#5E8DFF] text-white' : 'bg-white/10 text-[#7183A6] hover:bg-white/20'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </button>
        </div>

        <div className="space-y-3">
          {filtered.map(notif => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all ${
                notif.read ? 'bg-white/5 border-white/10' : 'bg-white/10 border-[#5E8DFF]/30'
              }`}
            >
              <div className="flex gap-4">
                <div className={`p-2 rounded-xl ${getBg(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-semibold">{notif.title}</h3>
                    <span className="text-[#7183A6] text-sm">{notif.time}</span>
                  </div>
                  <p className="text-[#7183A6]">{notif.message}</p>
                </div>
                <button className="text-[#7183A6] hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-[#7183A6] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
            <p className="text-[#7183A6]">You're all caught up!</p>
          </div>
        )}

        <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold mb-4">Notification Channels</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <Mail className="w-5 h-5 text-[#5E8DFF]" />
              <div>
                <p className="text-white text-sm font-medium">Email</p>
                <p className="text-[#7183A6] text-xs">Enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <Smartphone className="w-5 h-5 text-[#5E8DFF]" />
              <div>
                <p className="text-white text-sm font-medium">Push</p>
                <p className="text-[#7183A6] text-xs">Enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <MessageSquare className="w-5 h-5 text-[#5E8DFF]" />
              <div>
                <p className="text-white text-sm font-medium">SMS</p>
                <p className="text-[#7183A6] text-xs">Disabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}