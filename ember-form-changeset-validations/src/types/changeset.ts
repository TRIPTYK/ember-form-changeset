import { Promisable, StringKeyOf } from 'type-fest';

export type ValidationError = {
  message?: string;
  params?: Record<string, unknown>;
  key: string;
  value: unknown;
  originalValue: unknown;
};

export type ValidationFunction<T extends Record<string, unknown>> = (
  data: T
) => Promisable<ValidationError[]>;

export interface Change {
  key: string;
  value: unknown;
}

/**
 * This interface is for the old changeset compatibility
 */
export interface Changeset<
  T extends Record<string, any> = Record<string, any>
> {
  data: T;
  changes: Change[];
  errors: Record<string, unknown>[];
  isValid: boolean;
  isPristine: boolean;
  isInvalid: boolean;
  isDirty: boolean;
  execute(): void;
  unexecute(): void;
  save(options?: object): Promisable<void>;
  rollback(): void;
  rollbackProperty(key: string): void;
  addError(key: string, error: unknown): void;
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  validate(fn: ValidationFunction<Record<string, unknown>>): Promisable<void>;
}
