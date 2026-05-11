import { z } from 'zod';
import { Currency, CurrencyLike, CurrencySchema } from './currency';

export const DECIMAL_PLACES: Record<string, number> = {
  USD: 2, EUR: 2, GBP: 2, JPY: 0, CHF: 2,
  CAD: 2, AUD: 2, NZD: 2, NGN: 2, KES: 2,
  ZAR: 2, GHS: 2, TZS: 2, UGX: 0, XOF: 0,
  XAF: 0, AED: 2, SAR: 2, EGP: 2, MAD: 2,
};

export function getDecimalPlaces(currency: string): number {
  return DECIMAL_PLACES[currency] ?? 2;
}

export function normalizeAmount(amount: string | number, currency: string): bigint {
  const decimals = getDecimalPlaces(currency);
  const amountStr = typeof amount === 'number' ? amount.toString() : amount;
  
  const parts = amountStr.split('.');
  const integerPart = parts[0] || '0';
  const fractionalPart = parts[1] || '';
  
  const paddedFraction = fractionalPart.padEnd(decimals, '0').slice(0, decimals);
  
  return BigInt(integerPart + paddedFraction);
}

export function formatAmount(amount: bigint, currency: string): string {
  const decimals = getDecimalPlaces(currency);
  const amountStr = amount.toString().padStart(decimals, '0');
  
  const integerPart = amountStr.slice(0, -decimals) || '0';
  const fractionalPart = amountStr.slice(-decimals);
  
  if (decimals === 0) {
    return integerPart;
  }
  
  return `${integerPart}.${fractionalPart}`;
}

export const AmountSchema = z.object({
  amount: z.string(),
  currency: CurrencySchema,
});

export class Amount {
  private readonly _amount: bigint;
  private readonly _currency: Currency;

  private constructor(amount: bigint, currency: Currency) {
    this._amount = amount;
    this._currency = currency;
  }

  static create(amount: string | number, currency: CurrencyLike): Amount {
    const curr = currency instanceof Currency 
      ? currency 
      : Currency.create(currency);
    
    const normalized = normalizeAmount(amount, curr.value);
    
    if (normalized < 0n) {
      throw new Error('Amount cannot be negative');
    }
    
    return new Amount(normalized, curr);
  }

  static createZero(currency: CurrencyLike): Amount {
    const curr = currency instanceof Currency 
      ? currency 
      : Currency.create(currency);
    
    return new Amount(0n, curr);
  }

  static fromRaw(amount: bigint, currency: CurrencyLike): Amount {
    const curr = currency instanceof Currency 
      ? currency 
      : Currency.create(currency);
    
    return new Amount(amount, curr);
  }

  get amount(): bigint {
    return this._amount;
  }

  get currency(): Currency {
    return this._currency;
  }

  get formatted(): string {
    return formatAmount(this._amount, this._currency.value);
  }

  add(other: Amount): Amount {
    this.ensureSameCurrency(other, 'add');
    return new Amount(this._amount + other._amount, this._currency);
  }

  subtract(other: Amount): Amount {
    this.ensureSameCurrency(other, 'subtract');
    const result = this._amount - other._amount;
    if (result < 0n) {
      throw new Error('Subtraction would result in negative amount');
    }
    return new Amount(result, this._currency);
  }

  multiply(factor: number): Amount {
    const result = this._amount * BigInt(Math.round(factor * 100)) / 100n;
    return new Amount(result, this._currency);
  }

  isZero(): boolean {
    return this._amount === 0n;
  }

  isGreaterThan(other: Amount): boolean {
    this.ensureSameCurrency(other, 'compare');
    return this._amount > other._amount;
  }

  isLessThan(other: Amount): boolean {
    this.ensureSameCurrency(other, 'compare');
    return this._amount < other._amount;
  }

  equals(other: Amount): boolean {
    return this._currency.equals(other._currency) && this._amount === other._amount;
  }

  private ensureSameCurrency(other: Amount, operation: string): void {
    if (!this._currency.equals(other._currency)) {
      throw new Error(
        `Cannot ${operation} amounts with different currencies: ` +
        `${this._currency.value} vs ${other._currency.value}`
      );
    }
  }

  toString(): string {
    return `${this.formatted} ${this._currency.value}`;
  }

  toJSON(): { amount: string; currency: string } {
    return {
      amount: this._amount.toString(),
      currency: this._currency.value,
    };
  }
}

export type AmountLike = Amount | { amount: string; currency: string } | string;