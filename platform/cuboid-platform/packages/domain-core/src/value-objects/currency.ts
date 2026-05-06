import { z } from 'zod';

export const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'SEK', 'NOK',
  'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN', 'ILS', 'AED', 'SAR', 'EGP',
  'NGN', 'KES', 'ZAR', 'GHS', 'TZS', 'UGX', 'XOF', 'XAF', 'MAD', 'DZD',
] as const;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

export const CurrencySchema = z.enum(SUPPORTED_CURRENCIES);

export class Currency {
  private readonly _value: SupportedCurrency;

  private constructor(value: SupportedCurrency) {
    this._value = value;
  }

  static create(value: string): Currency {
    const parsed = CurrencySchema.safeParse(value.toUpperCase());
    if (!parsed.success) {
      throw new Error(`Invalid currency: ${value}`);
    }
    return new Currency(parsed.data);
  }

  static createUnsafe(value: string): Currency | null {
    const parsed = CurrencySchema.safeParse(value.toUpperCase());
    return parsed.success ? new Currency(parsed.data) : null;
  }

  get value(): SupportedCurrency {
    return this._value;
  }

  equals(other: Currency): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  toJSON(): string {
    return this._value;
  }
}

export type CurrencyLike = Currency | string | SupportedCurrency;