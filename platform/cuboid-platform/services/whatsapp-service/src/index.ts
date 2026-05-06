import { v4 as uuidv4 } from 'uuid';
import Pino from 'pino';

const logger = Pino({ name: 'whatsapp-service' });

type Intent = 
  | 'greet'
  | 'send_money'
  | 'find_bdc'
  | 'track_transfer'
  | 'onboarding'
  | 'merchant'
  | 'help'
  | 'unsupported';

type FlowStep = 
  | 'greeting'
  | 'identify'
  | 'verify'
  | 'destination'
  | 'amount'
  | 'quote'
  | 'beneficiary'
  | 'confirm'
  | 'execute'
  | 'receipt'
  | 'share_location'
  | 'locate'
  | 'compare_rates'
  | 'reserve'
  | 'qr_issue'
  | 'navigation'
  | 'redemption'
  | 'reference_lookup'
  | 'status_lookup'
  | 'timeline'
  | 'account_opening'
  | 'kyc_start'
  | 'wallet_ready'
  | 'complete';

interface WhatsAppMessage {
  from: string;
  type: 'text' | 'interactive' | 'location' | 'image';
  content: string;
  timestamp: number;
}

interface Session {
  id: string;
  phone: string;
  intent: Intent | null;
  flow: FlowStep | null;
  data: Record<string, unknown>;
  startedAt: number;
  lastActivity: number;
}

interface MessageTemplate {
  id: string;
  content: string;
  buttons?: { id: string; title: string }[];
}

const templates: Record<string, MessageTemplate[]> = {
  greet: [
    { id: 'welcome', content: '👋 Welcome to Cuboid! 🏦\n\nI help you send money, find BDCs, and track transfers.\n\nWhat would you like to do today?' },
  ],
  send_money: [
    { id: 'destination', content: '🌍 Where would you like to send money to?\n\nSelect a country:' },
    { id: 'amount', content: '💰 How much would you like to send?\n\nEnter amount in USD or your preferred currency.' },
    { id: 'beneficiary', content: '👤 Who is receiving the funds?\n\nPlease enter the recipient\'s name or phone number.' },
    { id: 'quote', content: '📊 Here\'s your quote:\n\n{quote}\n\nWould you like to proceed with this rate?' },
    { id: 'confirm', content: '✅ Please confirm your transfer:\n\n{summary}\n\nReply YES to confirm or CHANGE to modify.' },
    { id: 'receipt', content: '🎉 Transfer Complete!\n\nReference: {reference}\nAmount: {amount}\nTo: {recipient}\nStatus: {status}\n\nTrack: cuboid.africa/track/{reference}' },
  ],
  find_bdc: [
    { id: 'share_location', content: '📍 To find the nearest verified BDC, please share your location.\n\nTap "Share Location" button below.' },
    { id: 'locate_results', content: '🏦 Nearest Verified BDCs:\n\n{bdc_list}\n\nTap "Compare Rates" to see live rates from these BDCs.' },
    { id: 'reserve_qr', content: '✅ Rate Reserved!\n\nBDC: {bdc_name}\nRate: {rate}\nValid for: 30 minutes\n\nShow this QR code at the BDC to redeem your rate:\n\n{qr_code}' },
  ],
  track_transfer: [
    { id: 'reference_input', content: '🔍 To track your transfer, please enter your transaction reference (e.g., CUB-XXXXXXXX).' },
    { id: 'status_result', content: '📋 Transfer Status: {status}\n\nReference: {reference}\nAmount: {amount}\nFrom: {source}\nTo: {destination}\nDate: {date}\n\n{next_steps}' },
  ],
  onboarding: [
    { id: 'account_opening', content: '📱 Let\'s create your Cuboid account!\n\nI\'ll guide you through a few simple steps.' },
    { id: 'kyc_start', content: '🆔 To verify your identity, please provide:\n\n• Full legal name\n• Date of birth\n• National ID / Passport number\n\nOr upload your ID document.' },
    { id: 'wallet_ready', content: '🎉 Your Cuboid wallet is ready!\n\nYour account number: {account_number}\n\nYou can now:\n• Send money\n• Find BDCs\n• Convert currency\n\nType MENU to see all options.' },
  ],
  help: [
    { id: 'help_menu', content: '❓ How can I help you?\n\n• Send money - Transfer funds\n• Find BDC - Locate exchange shops\n• Track - Check transfer status\n• Rates - View live rates\n• Support - Talk to an agent' },
  ],
};

const quickReplies = {
  main: [
    { id: 'send', title: '💸 Send Money' },
    { id: 'find_bdc', title: '📍 Find BDC' },
    { id: 'track', title: '🔍 Track Transfer' },
    { id: 'rates', title: '📊 Live Rates' },
    { id: 'help', title: '❓ Help' },
  ],
  send_money: [
    { id: 'confirm', title: '✅ Confirm' },
    { id: 'change', title: '✏️ Change' },
    { id: 'cancel', title: '❌ Cancel' },
  ],
  find_bdc: [
    { id: 'share_loc', title: '📍 Share Location' },
    { id: 'manual', title: '⌨️ Enter Location' },
  ],
};

const intentKeywords: Record<Intent, string[]> = {
  greet: ['hi', 'hello', 'hey', 'start', 'menu'],
  send_money: ['send', 'transfer', 'pay', 'money', 'send money', 'transfer money'],
  find_bdc: ['bdc', 'exchange', 'rate', 'nearest', 'find', 'location', 'where'],
  track_transfer: ['track', 'status', 'check', 'reference', 'where is', 'arrived'],
  onboarding: ['signup', 'register', 'account', 'create', 'new', 'join'],
  merchant: ['business', 'merchant', 'invoice', 'payment link', 'receive'],
  help: ['help', 'support', 'assist', 'how', 'what', 'faq'],
  unsupported: [],
};

function detectIntent(message: string): Intent {
  const lower = message.toLowerCase();
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some(k => lower.includes(k))) {
      return intent as Intent;
    }
  }
  return 'unsupported';
}

function getFlowSteps(intent: Intent): FlowStep[] {
  const flows: Record<Intent, FlowStep[]> = {
    greet: ['greeting'],
    send_money: ['greeting', 'identify', 'destination', 'amount', 'quote', 'beneficiary', 'confirm', 'execute', 'receipt'],
    find_bdc: ['greeting', 'share_location', 'locate', 'compare_rates', 'reserve', 'qr_issue', 'navigation', 'redemption'],
    track_transfer: ['greeting', 'reference_lookup', 'status_lookup', 'timeline'],
    onboarding: ['greeting', 'account_opening', 'kyc_start', 'wallet_ready'],
    merchant: ['greeting', 'account_opening'],
    help: ['greeting'],
    unsupported: ['greeting'],
  };
  return flows[intent];
}

function advanceFlow(session: Session): FlowStep | null {
  if (!session.flow) return null;
  const steps = getFlowSteps(session.intent!);
  const currentIndex = steps.indexOf(session.flow);
  if (currentIndex < steps.length - 1) {
    return steps[currentIndex + 1];
  }
  return 'complete';
}

function buildResponse(session: Session, templateId: string, vars: Record<string, string> = {}): { text: string; interactive?: { type: string; buttons: { id: string; title: string }[] } } {
  const flowTemplates = templates[session.intent || 'help'];
  const template = flowTemplates?.find(t => t.id === templateId) || { id: templateId, content: templateId };
  
  let text = template.content;
  for (const [key, value] of Object.entries(vars)) {
    text = text.replace(new RegExp(`{${key}}`, 'g'), value);
  }

  let interactive;
  const buttons = quickReplies[templateId as keyof typeof quickReplies] || quickReplies.main;
  if (buttons) {
    interactive = { type: 'button', buttons };
  }

  return { text, ...(interactive && { interactive }) };
}

export class WhatsAppService {
  private sessions: Map<string, Session> = new Map();

  createSession(phone: string): Session {
    const session: Session = {
      id: uuidv4(),
      phone,
      intent: null,
      flow: null,
      data: {},
      startedAt: Date.now(),
      lastActivity: Date.now(),
    };
    this.sessions.set(phone, session);
    logger.info({ sessionId: session.id, phone }, 'Session created');
    return session;
  }

  getSession(phone: string): Session | null {
    const session = this.sessions.get(phone);
    if (session) {
      session.lastActivity = Date.now();
    }
    return session || null;
  }

  processMessage(message: WhatsAppMessage): { response: string; session: Session } {
    let session = this.getSession(message.from);
    
    if (!session) {
      session = this.createSession(message.from);
      session.intent = detectIntent(message.content);
      session.flow = getFlowSteps(session.intent)[0];
      
      const response = this.buildInitialResponse(session);
      return { response: response.text, session };
    }

    const response = this.handleFlowStep(session, message);
    return { response: response.text, session };
  }

  private buildInitialResponse(session: Session): { text: string } {
    switch (session.intent) {
      case 'send_money':
        return buildResponse(session, 'destination');
      case 'find_bdc':
        return buildResponse(session, 'share_location');
      case 'track_transfer':
        return buildResponse(session, 'reference_input');
      case 'onboarding':
        return buildResponse(session, 'account_opening');
      case 'merchant':
        return buildResponse(session, 'account_opening');
      case 'help':
        return buildResponse(session, 'help_menu');
      default:
        return buildResponse(session, 'welcome');
    }
  }

  private handleFlowStep(session: Session, message: WhatsAppMessage): { text: string } {
    const step = session.flow;
    
    switch (step) {
      case 'destination':
        session.data.destination = message.content;
        session.flow = 'amount';
        return buildResponse(session, 'amount');
      
      case 'amount':
        const amount = parseFloat(message.content);
        if (isNaN(amount) || amount <= 0) {
          return buildResponse(session, 'amount', { error: 'Please enter a valid amount' });
        }
        session.data.amount = amount;
        session.flow = 'beneficiary';
        return buildResponse(session, 'beneficiary');
      
      case 'beneficiary':
        session.data.beneficiary = message.content;
        session.flow = 'quote';
        const quote = this.generateQuote(session.data);
        session.data.quote = quote;
        return buildResponse(session, 'quote', { quote });
      
      case 'confirm':
        if (message.content.toLowerCase() === 'yes') {
          session.flow = 'execute';
          return { text: '⏳ Processing your transfer...' };
        }
        return buildResponse(session, 'destination');
      
      case 'reference_lookup':
        session.data.reference = message.content;
        session.flow = 'status_lookup';
        return buildResponse(session, 'status_lookup', { 
          status: 'Processing',
          reference: message.content,
          amount: '$500.00',
          source: 'USA',
          destination: 'Kenya',
          date: new Date().toLocaleDateString(),
          next_steps: 'Your transfer is being processed. You will receive an SMS when it\'s complete.'
        });
      
      case 'share_location':
        if (message.type === 'location') {
          session.data.lat = message.content.split(',')[0];
          session.data.lng = message.content.split(',')[1];
          session.flow = 'locate';
          return this.handleBDCLocation(session);
        }
        return buildResponse(session, 'share_location');
      
      default:
        const nextFlow = advanceFlow(session);
        if (nextFlow) {
          session.flow = nextFlow;
        }
        return this.buildInitialResponse(session);
    }
  }

  private handleBDCLocation(session: Session): { text: string } {
    const bdcList = '1. KenyaForex - 0.8km - ⭐4.8\n2. PremierFX - 2.4km - ⭐4.9\n3. EAX Nairobi - 5.2km - ⭐4.5';
    return buildResponse(session, 'locate_results', { bdc_list: bdcList });
  }

  private generateQuote(data: Record<string, unknown>): string {
    const amount = data.amount as number;
    const rate = 152.50;
    const converted = (amount * rate).toFixed(2);
    return `USD ${amount} → KES ${converted}\nRate: 1 USD = KES ${rate}\nFee: KES 250\nTotal: KES ${(parseFloat(converted) + 250).toFixed(2)}`;
  }

  getQuickReplyButtons(context: string): { id: string; title: string }[] {
    return quickReplies[context as keyof typeof quickReplies] || quickReplies.main;
  }

  escalateToAgent(sessionId: string): void {
    logger.info({ sessionId }, 'Escalating to agent');
  }

  clearSession(phone: string): void {
    this.sessions.delete(phone);
    logger.info({ phone }, 'Session cleared');
  }

  getSessionStats(): { active: number; intents: Record<string, number> } {
    const intents: Record<string, number> = {};
    for (const session of this.sessions.values()) {
      const intent = session.intent || 'none';
      intents[intent] = (intents[intent] || 0) + 1;
    }
    return { active: this.sessions.size, intents };
  }
}

export const whatsappService = new WhatsAppService();
export default whatsappService;