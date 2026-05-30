export const PARTNERS = [
  { name: "Zenith FX Partners", location: "Lagos", volume: "₦1.2B", trust: 98, specialty: "USD/NGN" },
  { name: "Atlantic Forex", location: "Abuja", volume: "₦890M", trust: 94, specialty: "GBP/NGN" },
  { name: "Prime Currency Desk", location: "Port Harcourt", volume: "₦670M", trust: 91, specialty: "EUR/NGN" },
  { name: "EastGate FX", location: "Kano", volume: "₦450M", trust: 88, specialty: "AED/NGN" },
  { name: "Capital Bridge FX", location: "Lagos", volume: "₦1.5B", trust: 96, specialty: "USD/NGN" },
];

export const CUSTOMERS = [
  { name: "Adebayo Logistics", type: "Corporate", volume: "₦340M", location: "Lagos", requests: 24 },
  { name: "Kijani Imports", type: "SME", volume: "₦120M", location: "Nairobi", requests: 18 },
  { name: "Mansa Trading", type: "Enterprise", volume: "₦890M", location: "Accra", requests: 42 },
  { name: "Savannah Holdings", type: "Corporate", volume: "₦560M", location: "Abuja", requests: 31 },
  { name: "Coastal Freight Ltd", type: "SME", volume: "₦85M", location: "Lagos", requests: 9 },
  { name: "Northern Agri Exports", type: "Enterprise", volume: "₦230M", location: "Kano", requests: 15 },
];

export const PARTNER_FX_REQUESTS = [
  { id: "REQ-2847", currency: "USD", amount: "₦125M", customer: "Adebayo Logistics", location: "Lagos", time: "2m ago", urgency: "High" },
  { id: "REQ-2846", currency: "EUR", amount: "₦89M", customer: "Mansa Trading", location: "Accra", time: "8m ago", urgency: "Critical" },
  { id: "REQ-2845", currency: "GBP", amount: "₦210M", customer: "Savannah Holdings", location: "Abuja", time: "14m ago", urgency: "Medium" },
  { id: "REQ-2844", currency: "USD", amount: "₦45M", customer: "Kijani Imports", location: "Nairobi", time: "23m ago", urgency: "Low" },
  { id: "REQ-2843", currency: "AED", amount: "₦67M", customer: "Coastal Freight Ltd", location: "Lagos", time: "31m ago", urgency: "High" },
  { id: "REQ-2842", currency: "CAD", amount: "₦198M", customer: "Northern Agri Exports", location: "Kano", time: "45m ago", urgency: "Medium" },
  { id: "REQ-2841", currency: "USD", amount: "₦312M", customer: "Adebayo Logistics", location: "Lagos", time: "1h ago", urgency: "Critical" },
  { id: "REQ-2840", currency: "EUR", amount: "₦76M", customer: "Mansa Trading", location: "Accra", time: "1h ago", urgency: "Low" },
];

export const PARTNER_ESCROWS = [
  { id: "ESC-1023", buyer: "Adebayo Logistics", seller: "Zenith FX Partners", amount: "₦125M", currency: "USD", status: "Active", progress: 65 },
  { id: "ESC-1022", buyer: "Mansa Trading", seller: "Atlantic Forex", amount: "₦89M", currency: "EUR", status: "Funding", progress: 40 },
  { id: "ESC-1021", buyer: "Savannah Holdings", seller: "Capital Bridge FX", amount: "₦210M", currency: "GBP", status: "Active", progress: 80 },
  { id: "ESC-1020", buyer: "Kijani Imports", seller: "Prime Currency Desk", amount: "₦45M", currency: "USD", status: "Dispute", progress: 25 },
  { id: "ESC-1019", buyer: "Coastal Freight", seller: "EastGate FX", amount: "₦67M", currency: "AED", status: "Settled", progress: 100 },
];

export const PARTNER_PIPELINE = [
  { stage: "Lead", count: 34, color: "#3B82F6" },
  { stage: "Qualified", count: 22, color: "#8B5CF6" },
  { stage: "Quote Sent", count: 42, color: "#D4AF37" },
  { stage: "Negotiating", count: 15, color: "#F59E0B" },
  { stage: "Completed", count: 28, color: "#10B981" },
];

export const LIVE_RATES = [
  { pair: "USD/NGN", buy: 1582, sell: 1598, spread: 16, trend: "up", change: "+0.4%" },
  { pair: "EUR/NGN", buy: 1721, sell: 1742, spread: 21, trend: "down", change: "-0.2%" },
  { pair: "GBP/NGN", buy: 2035, sell: 2058, spread: 23, trend: "up", change: "+0.7%" },
  { pair: "CAD/NGN", buy: 1170, sell: 1188, spread: 18, trend: "stable", change: "0.0%" },
  { pair: "AED/NGN", buy: 431, sell: 438, spread: 7, trend: "up", change: "+0.1%" },
  { pair: "KES/NGN", buy: 12.4, sell: 12.9, spread: 0.5, trend: "down", change: "-0.3%" },
];

export const BDC_INVENTORY = [
  { currency: "USD", available: 1200000, reserved: 350000, rate: 1592, value: "₦1.91B" },
  { currency: "EUR", available: 320000, reserved: 85000, rate: 1731, value: "₦554M" },
  { currency: "GBP", available: 170000, reserved: 42000, rate: 2050, value: "₦349M" },
  { currency: "NGN", available: 850000000, reserved: 120000000, rate: 1, value: "₦850M" },
  { currency: "AED", available: 520000, reserved: 110000, rate: 435, value: "₦226M" },
];

export const BROKER_REQUESTS = [
  { broker: "Zenith FX Partners", currency: "USD", amount: "₦85M", requiredBy: "2:30 PM", trust: 98, location: "Lagos" },
  { broker: "Atlantic Forex", currency: "EUR", amount: "₦42M", requiredBy: "3:00 PM", trust: 94, location: "Abuja" },
  { broker: "Capital Bridge FX", currency: "GBP", amount: "₦120M", requiredBy: "4:00 PM", trust: 96, location: "Lagos" },
  { broker: "Prime Currency Desk", currency: "USD", amount: "₦65M", requiredBy: "2:00 PM", trust: 91, location: "PH" },
  { broker: "EastGate FX", currency: "AED", amount: "₦28M", requiredBy: "5:00 PM", trust: 88, location: "Kano" },
  { broker: "Zenith FX Partners", currency: "CAD", amount: "₦55M", requiredBy: "3:30 PM", trust: 98, location: "Lagos" },
];

export const COMPLIANCE_TASKS = [
  { id: "CMP-001", task: "KYC Review - Atlantic Forex", deadline: "Today", priority: "High", status: "Pending" },
  { id: "CMP-002", task: "Monthly AML Report Submission", deadline: "Jun 2", priority: "Critical", status: "In Progress" },
  { id: "CMP-003", task: "Transaction Audit - ESC-1020", deadline: "Jun 4", priority: "Medium", status: "Pending" },
  { id: "CMP-004", task: "CBN Regulatory Filing Q2", deadline: "Jun 15", priority: "High", status: "Not Started" },
  { id: "CMP-005", task: "License Renewal - EastGate FX", deadline: "Jun 20", priority: "Medium", status: "Pending" },
];

export const TREASURY_LIQUIDITY = {
  usd: { allocated: "₦1.8B", available: "₦1.2B", committed: "₦600M" },
  eur: { allocated: "₦890M", available: "₦520M", committed: "₦370M" },
  gbp: { allocated: "₦670M", available: "₦410M", committed: "₦260M" },
  ngn: { allocated: "₦2.4B", available: "₦1.9B", committed: "₦500M" },
};

export const PLATFORM_METRICS = {
  volume: { today: "₦8.7B", week: "₦42.3B", month: "₦187B" },
  revenue: { today: "₦34.8M", week: "₦168M", month: "₦748M" },
  organizations: { active: 247, total: 312 },
  users: { active: 1842, total: 2850 },
};

export const CORRIDOR_PERFORMANCE = [
  { corridor: "NGN-USD", volume: "₦3.2B", avgSpread: "0.8%", transactions: 1240, trend: "up" },
  { corridor: "NGN-EUR", volume: "₦1.8B", avgSpread: "1.1%", transactions: 890, trend: "up" },
  { corridor: "NGN-GBP", volume: "₦1.5B", avgSpread: "1.0%", transactions: 720, trend: "stable" },
  { corridor: "NGN-AED", volume: "₦890M", avgSpread: "1.3%", transactions: 560, trend: "up" },
  { corridor: "NGN-KES", volume: "₦340M", avgSpread: "1.8%", transactions: 310, trend: "down" },
  { corridor: "NGN-CAD", volume: "₦520M", avgSpread: "1.2%", transactions: 445, trend: "up" },
];

export const BROKER_RANKINGS = [
  { name: "Zenith FX Partners", volume: "₦1.2B", deals: 87, satisfaction: 98, responseTime: "2.1m" },
  { name: "Capital Bridge FX", volume: "₦1.5B", deals: 112, satisfaction: 96, responseTime: "1.8m" },
  { name: "Atlantic Forex", volume: "₦890M", deals: 64, satisfaction: 94, responseTime: "2.5m" },
  { name: "Prime Currency Desk", volume: "₦670M", deals: 48, satisfaction: 91, responseTime: "3.2m" },
  { name: "EastGate FX", volume: "₦450M", deals: 35, satisfaction: 88, responseTime: "4.1m" },
];

export const BDC_RANKINGS = [
  { name: "Wuse Zone 4 Desk", location: "Abuja", volume: "₦580M", hours: "8AM-6PM", rating: 4.8 },
  { name: "Allen Avenue Desk", location: "Lagos", volume: "₦820M", hours: "7AM-7PM", rating: 4.9 },
  { name: "Sabon Gari Desk", location: "Kano", volume: "₦285M", hours: "9AM-5PM", rating: 4.5 },
  { name: "Trans Amadi Desk", location: "PH", volume: "₦180M", hours: "8AM-6PM", rating: 4.3 },
  { name: "Ikeja Business Hub", location: "Lagos", volume: "₦410M", hours: "7AM-8PM", rating: 4.7 },
];
