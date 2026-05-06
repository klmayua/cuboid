import { v4 as uuidv4 } from 'uuid';

export interface PasskeyCredential {
  id: string;
  userId: string;
  credentialId: string;
  publicKey: string;
  counter: number;
  deviceType: 'singleDevice' | 'multiDevice';
  transports: ('hybrid' | 'internal' | 'cross-platform' | 'usb' | 'nfc' | 'ble')[];
  createdAt: string;
  lastUsedAt?: string;
}

export interface PasskeyRegistration {
  challenge: string;
  userId: string;
  userName: string;
  userDisplayName: string;
}

export interface PasskeyAuthentication {
  challenge: string;
  timeout: number;
  userVerification: 'preferred' | 'required' | 'discouraged';
}

class PasskeyStore {
  private credentials: Map<string, PasskeyCredential[]> = new Map();
  private challenges: Map<string, { userId: string; expiresAt: string }> = new Map();

  async saveCredential(userId: string, credential: Omit<PasskeyCredential, 'id' | 'createdAt'>): Promise<PasskeyCredential> {
    const cred: PasskeyCredential = { ...credential, id: uuidv4(), createdAt: new Date().toISOString() };
    const existing = this.credentials.get(userId) ?? [];
    existing.push(cred);
    this.credentials.set(userId, existing);
    return cred;
  }

  async getCredentials(userId: string): Promise<PasskeyCredential[]> {
    return this.credentials.get(userId) ?? [];
  }

  async deleteCredential(userId: string, credentialId: string): Promise<void> {
    const existing = this.credentials.get(userId) ?? [];
    const filtered = existing.filter(c => c.id !== credentialId);
    this.credentials.set(userId, filtered);
  }

  async createChallenge(userId: string): Promise<string> {
    const challenge = uuidv4().replace(/-/g, '');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    this.challenges.set(challenge, { userId, expiresAt });
    return challenge;
  }

  async verifyChallenge(challenge: string): Promise<string | null> {
    const data = this.challenges.get(challenge);
    if (!data) return null;
    if (new Date(data.expiresAt) < new Date()) {
      this.challenges.delete(challenge);
      return null;
    }
    this.challenges.delete(challenge);
    return data.userId;
  }
}

export class PasskeyService {
  private store: PasskeyStore;
  private rpId: string;
  private rpName: string;

  constructor(rpId: string = 'cuboid.io', rpName: string = 'Cuboid') {
    this.store = PasskeyStore;
    this.rpId = rpId;
    this.rpName = rpName;
  }

  async generateRegistrationOptions(userId: string, userName: string, userDisplayName: string): Promise<{
    options: PublicKeyCredentialCreationOptions;
    challenge: string;
  }> {
    const challenge = await this.store.createChallenge(userId);

    const options: PublicKeyCredentialCreationOptions = {
      challenge: new TextEncoder().encode(challenge),
      rp: { id: this.rpId, name: this.rpName },
      user: {
        id: new TextEncoder().encode(userId),
        name: userName,
        displayName: userDisplayName,
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 },
      ],
      timeout: 60000,
      excludeCredentials: [],
      authenticatorSelection: {
        userVerification: 'preferred',
        residentKey: 'preferred',
      },
    };

    return { options, challenge };
  }

  async verifyRegistration(
    userId: string,
    credential: {
      id: string;
      rawId: string;
      type: string;
      response: {
        clientDataJSON: string;
        attestationObject: string;
      };
    }
  ): Promise<{ success: boolean; credentialId: string }> {
    const newCredId = credential.id;

    await this.store.saveCredential(userId, {
      userId,
      credentialId: newCredId,
      publicKey: credential.response attestationObject,
      counter: 0,
      deviceType: 'singleDevice',
      transports: ['internal'],
    });

    return { success: true, credentialId: newCredId };
  }

  async generateAuthenticationOptions(userId: string): Promise<{
    options: PublicKeyCredentialRequestOptions;
    challenge: string;
  }> {
    const credentials = await this.store.getCredentials(userId);
    const challenge = await this.store.createChallenge(userId);

    const options: PublicKeyCredentialRequestOptions = {
      challenge: new TextEncoder().encode(challenge),
      rpId: this.rpId,
      timeout: 60000,
      userVerification: 'preferred',
      allowCredentials: credentials.map(c => ({
        id: new TextEncoder().encode(c.credentialId),
        type: 'public-key',
      })),
    };

    return { options, challenge };
  }

  async verifyAuthentication(
    userId: string,
    credential: {
      id: string;
      rawId: string;
      type: string;
      response: {
        clientDataJSON: string;
        authenticatorData: string;
        signature: string;
        userHandle: string;
      };
    }
  ): Promise<{ success: boolean }> {
    return { success: true };
  }

  async getUserPasskeys(userId: string): Promise<{
    id: string;
    deviceType: string;
    createdAt: string;
    lastUsedAt?: string;
  }[]> {
    const credentials = await this.store.getCredentials(userId);
    return credentials.map(c => ({
      id: c.id,
      deviceType: c.deviceType,
      createdAt: c.createdAt,
      lastUsedAt: c.lastUsedAt,
    }));
  }

  async deletePasskey(userId: string, credentialId: string): Promise<void> {
    await this.store.deleteCredential(userId, credentialId);
  }

  async hasPasskeys(userId: string): Promise<boolean> {
    const credentials = await this.store.getCredentials(userId);
    return credentials.length > 0;
  }
}

export default PasskeyService;