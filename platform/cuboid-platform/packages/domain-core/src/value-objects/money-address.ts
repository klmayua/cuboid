import { z } from 'zod';
import { CountryCodeSchema, CountryCode } from './address';

export const MoneyAddressTypeSchema = z.enum([
  'BANK_ACCOUNT',
  'MOBILE_MONEY',
  'WALLET',
  'CARD',
  'CRYPTO_WALLET',
]);

export type MoneyAddressType = z.infer<typeof MoneyAddressTypeSchema>;

export const BankAccountAddressSchema = z.object({
  type: z.literal('BANK_ACCOUNT'),
  bankCode: z.string().min(1).max(20),
  accountNumber: z.string().min(1).max(50),
  accountName: z.string().min(1).max(100),
  bankName: z.string().min(1).max(200),
  branchCode: z.string().max(20).optional(),
  routingCode: z.string().max(20).optional(),
  swiftCode: z.string().length(8).or(z.string().length(11)).optional(),
  iban: z.string().max(42).optional(),
  country: CountryCodeSchema,
});

export const MobileMoneyAddressSchema = z.object({
  type: z.literal('MOBILE_MONEY'),
  provider: z.string().min(1).max(50),
  phoneNumber: z.string().min(1).max(20),
  country: CountryCodeSchema,
});

export const WalletAddressSchema = z.object({
  type: z.literal('WALLET'),
  walletId: z.string().min(1).max(100),
  provider: z.string().min(1).max(50).optional(),
  country: CountryCodeSchema.optional(),
});

export const CardAddressSchema = z.object({
  type: z.literal('CARD'),
  last4: z.string().length(4),
  cardBrand: z.string().max(20),
  country: CountryCodeSchema.optional(),
});

export const CryptoWalletAddressSchema = z.object({
  type: z.literal('CRYPTO_WALLET'),
  blockchain: z.string().min(1).max(30),
  address: z.string().min(1).max(100),
  network: z.string().max(30).optional(),
});

export const MoneyAddressSchema = z.discriminatedUnion('type', [
  BankAccountAddressSchema,
  MobileMoneyAddressSchema,
  WalletAddressSchema,
  CardAddressSchema,
  CryptoWalletAddressSchema,
]);

export type MoneyAddress = z.infer<typeof MoneyAddressSchema>;

export type BankAccountAddress = z.infer<typeof BankAccountAddressSchema>;
export type MobileMoneyAddress = z.infer<typeof MobileMoneyAddressSchema>;
export type WalletAddress = z.infer<typeof WalletAddressSchema>;
export type CardAddress = z.infer<typeof CardAddressSchema>;
export type CryptoWalletAddress = z.infer<typeof CryptoWalletAddressSchema>;

export class MoneyAddressValue {
  private readonly _data: MoneyAddress;

  private constructor(data: MoneyAddress) {
    this._data = data;
  }

  static create(data: MoneyAddress): MoneyAddressValue {
    const parsed = MoneyAddressSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Invalid money address: ${parsed.error.message}`);
    }
    return new MoneyAddressValue(parsed.data);
  }

  static createBankAccount(data: Omit<BankAccountAddress, 'type'>): MoneyAddressValue {
    return MoneyAddressValue.create({ ...data, type: 'BANK_ACCOUNT' });
  }

  static createMobileMoney(data: Omit<MobileMoneyAddress, 'type'>): MoneyAddressValue {
    return MoneyAddressValue.create({ ...data, type: 'MOBILE_MONEY' });
  }

  get type(): MoneyAddressType {
    return this._data.type;
  }

  get country(): CountryCode | undefined {
    if (this._data.type === 'BANK_ACCOUNT') {
      return this._data.country;
    }
    if (this._data.type === 'MOBILE_MONEY') {
      return this._data.country;
    }
    if (this._data.type === 'WALLET') {
      return this._data.country;
    }
    if (this._data.type === 'CARD') {
      return this._data.country;
    }
    return undefined;
  }

  getMaskedDisplay(): string {
    switch (this._data.type) {
      case 'BANK_ACCOUNT':
        const accNum = this._data.accountNumber;
        return `****${accNum.slice(-4)}`;
      case 'MOBILE_MONEY':
        const phone = this._data.phoneNumber;
        return `***${phone.slice(-3)}`;
      case 'CARD':
        return `****${this._data.last4}`;
      case 'WALLET':
        const wid = this._data.walletId;
        return `${wid.slice(0, 6)}...${wid.slice(-4)}`;
      case 'CRYPTO_WALLET':
        const addr = this._data.address;
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    }
  }

  toJSON(): MoneyAddress {
    return this._data;
  }
}

export type MoneyAddressLike = MoneyAddress | MoneyAddressValue;