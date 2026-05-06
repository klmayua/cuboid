import { z } from 'zod';

export const CountryCodeSchema = z
  .string()
  .length(2)
  .toUpperCase();

export type CountryCode = z.infer<typeof CountryCodeSchema>;

export const AddressSchema = z.object({
  streetLine1: z.string().min(1).max(200),
  streetLine2: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  stateProvince: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  country: CountryCodeSchema,
});

export type Address = z.infer<typeof AddressSchema>;

export class AddressValue {
  private readonly _streetLine1: string;
  private readonly _streetLine2?: string;
  private readonly _city: string;
  private readonly _stateProvince?: string;
  private readonly _postalCode?: string;
  private readonly _country: CountryCode;

  private constructor(data: Address) {
    this._streetLine1 = data.streetLine1;
    this._streetLine2 = data.streetLine2;
    this._city = data.city;
    this._stateProvince = data.stateProvince;
    this._postalCode = data.postalCode;
    this._country = data.country;
  }

  static create(data: Address): AddressValue {
    const parsed = AddressSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Invalid address: ${parsed.error.message}`);
    }
    return new AddressValue(parsed.data);
  }

  static createUnsafe(data: unknown): AddressValue | null {
    const parsed = AddressSchema.safeParse(data);
    return parsed.success ? new AddressValue(parsed.data) : null;
  }

  get streetLine1(): string { return this._streetLine1; }
  get streetLine2(): string | undefined { return this._streetLine2; }
  get city(): string { return this._city; }
  get stateProvince(): string | undefined { return this._stateProvince; }
  get postalCode(): string | undefined { return this._postalCode; }
  get country(): CountryCode { return this._country; }

  toJSON(): Address {
    return {
      streetLine1: this._streetLine1,
      streetLine2: this._streetLine2,
      city: this._city,
      stateProvince: this._stateProvince,
      postalCode: this._postalCode,
      country: this._country,
    };
  }

  format(): string {
    const parts = [
      this._streetLine1,
      this._streetLine2,
      `${this._city}${this._stateProvince ? `, ${this._stateProvince}` : ''}`,
      this._postalCode,
      this._country,
    ].filter(Boolean);
    return parts.join('\n');
  }
}