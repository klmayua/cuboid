import { z } from 'zod';

export const CorridorTypeSchema = z.enum([
  'LOCAL',
  'CROSS_BORDER',
  'REMITTANCE',
]);

export type CorridorType = z.infer<typeof CorridorTypeSchema>;

export const CorridorSchema = z.object({
  id: z.string().min(1).max(50),
  sourceCountry: z.string().length(2).toUpperCase(),
  sourceCurrency: z.string().length(3).toUpperCase(),
  destinationCountry: z.string().length(2).toUpperCase(),
  destinationCurrency: z.string().length(3).toUpperCase(),
  type: CorridorTypeSchema,
  displayName: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  isActive: z.boolean(),
  isAvailableForRoute: z.boolean().default(true),
});

export type Corridor = z.infer<typeof CorridorSchema>;

export class CorridorValue {
  private readonly _data: Corridor;

  private constructor(data: Corridor) {
    this._data = data;
  }

  static create(data: Corridor): CorridorValue {
    const parsed = CorridorSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Invalid corridor: ${parsed.error.message}`);
    }
    return new CorridorValue(parsed.data);
  }

  static createLocal(country: string, currency: string): CorridorValue {
    return CorridorValue.create({
      id: `local_${country}_${currency}`,
      sourceCountry: country.toUpperCase(),
      sourceCurrency: currency.toUpperCase(),
      destinationCountry: country.toUpperCase(),
      destinationCurrency: currency.toUpperCase(),
      type: 'LOCAL',
      displayName: `${currency} Local`,
      isActive: true,
      isAvailableForRoute: true,
    });
  }

  static createRemittance(
    sourceCountry: string,
    sourceCurrency: string,
    destinationCountry: string,
    destinationCurrency: string
  ): CorridorValue {
    const isLocal = sourceCountry === destinationCountry;
    
    return CorridorValue.create({
      id: `remit_${sourceCountry}_${sourceCurrency}_${destinationCountry}_${destinationCurrency}`,
      sourceCountry: sourceCountry.toUpperCase(),
      sourceCurrency: sourceCurrency.toUpperCase(),
      destinationCountry: destinationCountry.toUpperCase(),
      destinationCurrency: destinationCurrency.toUpperCase(),
      type: isLocal ? 'LOCAL' : 'REMITTANCE',
      displayName: `${sourceCurrency} → ${destinationCurrency}`,
      isActive: true,
      isAvailableForRoute: true,
    });
  }

  get id(): string { return this._data.id; }
  get sourceCountry(): string { return this._data.sourceCountry; }
  get sourceCurrency(): string { return this._data.sourceCurrency; }
  get destinationCountry(): string { return this._data.destinationCountry; }
  get destinationCurrency(): string { return this._data.destinationCurrency; }
  get type(): CorridorType { return this._data.type; }
  get displayName(): string { return this._data.displayName; }
  get isActive(): boolean { return this._data.isActive; }
  get isAvailableForRoute(): boolean { return this._data.isAvailableForRoute; }

  isCrossBorder(): boolean {
    return this._data.sourceCountry !== this._data.destinationCountry;
  }

  isSameCorridor(other: CorridorValue): boolean {
    return this._data.id === other._data.id;
  }

  toJSON(): Corridor {
    return this._data;
  }
}

export type CorridorLike = Corridor | CorridorValue;