import { Promisable, StringKeyOf } from 'type-fest';

export type ValidateOneFunction<T extends Record<string, unknown>> = (
  value: unknown,
  field: StringKeyOf<T>,
  data: T
) => Promisable<ValidationError | undefined>;

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
  validateOne(
    key: string,
    fn: ValidateOneFunction<Record<string, unknown>>
  ): Promisable<void>;
}

/**
 * A changeset wrapped into a proxy
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */
export type ProxyWrappedChangeset<T> = T extends Changeset<any>
  ?
      | T & {
          [K in StringKeyOf<T['data']>]: T['data'][K];
        }
  : never;
// note : T extends Changeset does not seems to be compatible. Instead we do the 'if changeset else never'
