import { EmberChangeset } from "ember-changeset";


export interface TypedBufferedChangeset<
  T extends Record<string, any> = Record<string, any>
> extends EmberChangeset {
  data: T;
  pendingData: Partial<T>;
  /**
   * In case it's an unknown key, just specify the expected return type
   */
  get<Key extends keyof T>(key: Key): T[Key];
  get<K>(key: string): K;
  set(key: keyof T, value: unknown): void;
  set<K>(key: string, value: K): void;
  validate(...validationKeys: (keyof T)[]): Promise<unknown>;
  rollbackInvalid(key: keyof T | void): this;
}
