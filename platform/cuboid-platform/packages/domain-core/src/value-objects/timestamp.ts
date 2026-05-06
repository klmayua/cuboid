import { z } from 'zod';

export const TimestampSchema = z.string().datetime();

export class Timestamp {
  private readonly _value: Date;

  private constructor(value: Date) {
    this._value = value;
  }

  static now(): Timestamp {
    return new Timestamp(new Date());
  }

  static fromISO(iso: string): Timestamp {
    const parsed = TimestampSchema.safeParse(iso);
    if (!parsed.success) {
      throw new Error(`Invalid ISO timestamp: ${iso}`);
    }
    return new Timestamp(new Date(parsed.data));
  }

  static fromMillis(millis: number): Timestamp {
    return new Timestamp(new Date(millis));
  }

  static fromSeconds(seconds: number): Timestamp {
    return new Timestamp(new Date(seconds * 1000));
  }

  get value(): Date {
    return this._value;
  }

  toISO(): string {
    return this._value.toISOString();
  }

  toMillis(): number {
    return this._value.getTime();
  }

  toSeconds(): number {
    return Math.floor(this._value.getTime() / 1000);
  }

  isAfter(other: Timestamp): boolean {
    return this._value.getTime() > other._value.getTime();
  }

  isBefore(other: Timestamp): boolean {
    return this._value.getTime() < other._value.getTime();
  }

  addMillis(millis: number): Timestamp {
    return new Timestamp(new Date(this._value.getTime() + millis));
  }

  addSeconds(seconds: number): Timestamp {
    return new Timestamp(new Date(this._value.getTime() + seconds * 1000));
  }

  diffMillis(other: Timestamp): number {
    return Math.abs(this._value.getTime() - other._value.getTime());
  }

  equals(other: Timestamp): boolean {
    return this._value.getTime() === other._value.getTime();
  }

  toString(): string {
    return this.toISO();
  }

  toJSON(): string {
    return this.toISO();
  }
}

export type TimestampLike = Timestamp | Date | string | number;