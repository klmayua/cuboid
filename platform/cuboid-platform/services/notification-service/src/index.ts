import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import nodemailer from 'nodemailer';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  category: NotificationCategory;
  title: string;
  body: string;
  variables: Record<string, string>;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  scheduledAt?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export type NotificationType = 'TRANSACTIONAL' | 'PROMOTIONAL';
export type NotificationChannel = 'IN_APP' | 'PUSH' | 'EMAIL' | 'SMS' | 'WHATSAPP' | 'WEBHOOK';
export type NotificationCategory = 
  | 'ACTION_REQUIRED' | 'CONFIRMATION' | 'WARNING' | 'ALERT'
  | 'SECURITY' | 'COMPLIANCE' | 'SETTLEMENT' | 'ESCROW'
  | 'SUPPORT' | 'PARTNER' | 'REGULATORY' | 'FYI';

export interface WhatsAppMessage {
  to: string;
  template?: string;
  variables?: Record<string, string>;
  text?: string;
}

export interface SMSMessage {
  to: string;
  message: string;
}

export interface EmailMessage {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  template?: string;
}

export interface WebhookPayload {
  event: string;
  data: unknown;
  timestamp: string;
}

class WhatsAppProvider {
  private apiUrl: string;
  private apiKey: string;
  private phoneNumberId: string;

  constructor(config: { apiUrl: string; apiKey: string; phoneNumberId: string }) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
    this.phoneNumberId = config.phoneNumberId;
  }

  async sendMessage(message: WhatsAppMessage): Promise<{ messageId: string; status: string }> {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        to: message.to.replace('+', ''),
        type: message.template ? 'template' : 'text',
        ...(message.template
          ? {
              template: {
                name: message.template,
                language: { code: 'en_US' },
                components: message.variables
                  ? [{
                      type: 'body',
                      parameters: Object.entries(message.variables).map(([key, value]) => ({
                        type: 'text',
                        parameter: key,
                        text: value,
                      })),
                    }]
                  : [],
              },
            }
          : { text: { body: message.text } }),
      };

      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        messageId: response.data.messages?.[0]?.id ?? uuidv4(),
        status: 'sent',
      };
    } catch (error: any) {
      throw new Error(`WhatsApp send failed: ${error.message}`);
    }
  }

  async sendTemplate(to: string, templateName: string, variables: Record<string, string>): Promise<{ messageId: string }> {
    return this.sendMessage({ to, template: templateName, variables });
  }
}

class SMSProvider {
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor(config: { accountSid: string; authToken: string; fromNumber: string }) {
    this.accountSid = config.accountSid;
    this.authToken = config.authToken;
    this.fromNumber = config.fromNumber;
  }

  async send(message: SMSMessage): Promise<{ sid: string; status: string }> {
    try {
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`,
        new URLSearchParams({
          To: message.to,
          From: this.fromNumber,
          Body: message.message,
        }),
        {
          auth: {
            username: this.accountSid,
            password: this.authToken,
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      return {
        sid: response.data.sid,
        status: response.data.status,
      };
    } catch (error: any) {
      throw new Error(`SMS send failed: ${error.message}`);
    }
  }
}

class EmailProvider {
  private transporter: nodemailer.Transporter;

  constructor(config: { host: string; port: number; user: string; pass: string }) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });
  }

  async send(message: EmailMessage): Promise<{ messageId: string }> {
    try {
      const result = await this.transporter.sendMail({
        from: '"Cuboid" <noreply@cuboid.io>',
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      return { messageId: result.messageId };
    } catch (error: any) {
      throw new Error(`Email send failed: ${error.message}`);
    }
  }

  async sendTemplate(to: string, templateName: string, variables: Record<string, string>): Promise<{ messageId: string }> {
    const templates: Record<string, { subject: string; html: string }> = {
      'welcome': {
        subject: 'Welcome to Cuboid',
        html: `<h1>Welcome {{name}}!</h1><p>Your account is ready.</p>`,
      },
      'transaction-settled': {
        subject: 'Transaction Settled',
        html: `<h1>Transaction Complete</h1><p>Amount: {{amount}}</p>`,
      },
      'escrow-released': {
        subject: 'Escrow Released',
        html: `<h1>Funds Released</h1><p>Amount: {{amount}}</p>`,
      },
      'verification': {
        subject: 'Verify Your Email',
        html: `<h1>Verification Code</h1><p>{{code}}</p>`,
      },
    };

    const template = templates[templateName];
    if (!template) throw new Error(`Template ${templateName} not found`);

    let html = template.html;
    let text = '';
    for (const [key, value] of Object.entries(variables)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
      text += `${key}: ${value}\n`;
    }

    return this.send({ to, subject: template.subject, html, text });
  }
}

class SlackProvider {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async send(payload: WebhookPayload): Promise<{ ok: boolean }> {
    try {
      const response = await axios.post(this.webhookUrl, {
        text: `*${payload.event}*`,
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: payload.event },
          },
          {
            type: 'section',
            text: { type: 'mrkdwn', text: `\`${JSON.stringify(payload.data, null, 2)}\`` },
          },
        ],
      });

      return { ok: response.data.ok };
    } catch (error: any) {
      throw new Error(`Slack send failed: ${error.message}`);
    }
  }

  async sendAlert(title: string, message: string, severity: 'low' | 'medium' | 'high'): Promise<{ ok: boolean }> {
    const colors: Record<string, string> = { low: '#36a64f', medium: '#ff9800', high: '#f44336' };
    return this.send({
      event: title,
      data: { message, severity, timestamp: payload.timestamp },
    } as any);
  }
}

class PushProvider {
  private fcmKey: string;

  constructor(fcmKey: string) {
    this.fcmKey = fcmKey;
  }

  async send(to: string, title: string, body: string, data?: Record<string, unknown>): Promise<{ success: boolean }> {
    console.log(`[Push] to=${to} title=${title} body=${body}`);
    return { success: true };
  }
}

export class CommunicationService {
  private whatsapp?: WhatsAppProvider;
  private sms?: SMSProvider;
  private email?: EmailProvider;
  private slack?: SlackProvider;
  private push?: PushProvider;
  private notifications: Map<string, Notification> = new Map();

  configureWhatsApp(config: { apiUrl: string; apiKey: string; phoneNumberId: string }) {
    this.whatsapp = new WhatsAppProvider(config);
  }

  configureSMS(config: { accountSid: string; authToken: string; fromNumber: string }) {
    this.sms = new SMSProvider(config);
  }

  configureEmail(config: { host: string; port: number; user: string; pass: string }) {
    this.email = new EmailProvider(config);
  }

  configureSlack(webhookUrl: string) {
    this.slack = new SlackProvider(webhookUrl);
  }

  configurePush(fcmKey: string) {
    this.push = new PushProvider(fcmKey);
  }

  async sendNotification(params: {
    userId: string;
    channel: NotificationChannel;
    category: NotificationCategory;
    title: string;
    body: string;
    variables?: Record<string, string>;
    to?: string;
  }): Promise<Notification> {
    const notification: Notification = {
      id: uuidv4(),
      userId: params.userId,
      type: 'TRANSACTIONAL',
      channel: params.channel,
      category: params.category,
      title: params.title,
      body: params.body,
      variables: params.variables ?? {},
      status: 'PENDING',
      priority: 'MEDIUM',
      createdAt: new Date().toISOString(),
    };

    try {
      switch (params.channel) {
        case 'WHATSAPP':
          if (this.whatsapp && params.to) {
            await this.whatsapp.sendMessage({
              to: params.to,
              text: `${params.title}: ${params.body}`,
            });
          }
          break;
        case 'SMS':
          if (this.sms && params.to) {
            await this.sms.send({ to: params.to, message: params.body });
          }
          break;
        case 'EMAIL':
          if (this.email) {
            await this.email.send({ to: params.to!, subject: params.title, text: params.body });
          }
          break;
        case 'PUSH':
          if (this.push && params.to) {
            await this.push.send(params.to, params.title, params.body);
          }
          break;
        case 'WEBHOOK':
          if (this.slack) {
            await this.slack.send({
              event: params.title,
              data: { body: params.body, ...params.variables },
              timestamp: new Date().toISOString(),
            });
          }
          break;
        default:
          break;
      }

      notification.status = 'SENT';
      notification.sentAt = new Date().toISOString();
    } catch (error: any) {
      notification.status = 'FAILED';
      notification.metadata = { error: error.message };
    }

    this.notifications.set(notification.id, notification);
    return notification;
  }

  async sendBatch(params: {
    userIds: string[];
    channel: NotificationChannel;
    category: NotificationCategory;
    title: string;
    body: string;
  }): Promise<Notification[]> {
    const results: Notification[] = [];
    for (const userId of params.userIds) {
      const notification = await this.sendNotification({
        ...params,
        userId,
      });
      results.push(notification);
    }
    return results;
  }

  async sendOTP(method: 'WHATSAPP' | 'SMS', to: string, code: string): Promise<void> {
    await this.sendNotification({
      userId: 'system',
      channel: method,
      category: 'SECURITY',
      title: 'Your verification code',
      body: `Your verification code is: ${code}`,
      to,
    });
  }

  async notifyTransaction(userId: string, type: 'settled' | 'failed', amount: string, to?: string): Promise<void> {
    const category = type === 'settled' ? 'SETTLEMENT' : 'ALERT';
    const title = type === 'settled' ? 'Transaction Settled' : 'Transaction Failed';
    const body = type === 'settled' 
      ? `Your transaction of ${amount} has been settled.`
      : `Your transaction of ${amount} failed. Please contact support.`;

    await this.sendNotification({ userId, channel: 'IN_APP', category, title, body });
    if (to) {
      await this.sendNotification({ userId, channel: 'EMAIL', category, title, body, to });
    }
  }
}

export default CommunicationService;