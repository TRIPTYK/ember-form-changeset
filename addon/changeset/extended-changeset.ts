/* eslint-disable ember/classic-decorator-no-classic-methods */
import { EmberChangeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { ConditionalPick, IterableElement, StringKeyOf } from 'type-fest';

export type ArrayKeys<DTO> = StringKeyOf<ConditionalPick<DTO, any[]>>;

export class ExtendedChangeset<T extends Record<string, any>>
  implements Changeset<T>
{
  private changeset: EmberChangeset;

  public constructor(
    obj: T,
    map?: Record<StringKeyOf<T>, unknown>,
    options?: object
  ) {
    this.changeset = new EmberChangeset(
      obj,
      map ? lookupValidator(map) : undefined,
      map,
      options
    );
  }

  get validationMap() {
    return this.changeset.validationMap!;
  }

  get changes(): Record<string, any>[] {
    return this.changeset.changes;
  }

  get errors(): Record<string, unknown>[] {
    return this.changeset.errors;
  }

  get isValid(): boolean {
    return this.changeset.isValid;
  }

  get isPristine() {
    return this.changeset.isPristine;
  }

  get isInvalid() {
    return this.changeset.isInvalid;
  }

  get isDirty() {
    return this.changeset.isDirty;
  }

  execute() {
    this.changeset.execute();
  }

  unexecute() {
    this.changeset.unexecute();
  }

  async save() {
    await this.changeset.save();
  }

  rollback() {
    this.changeset.rollback();
  }

  rollbackInvalid(key: string | void) {
    this.changeset.rollbackInvalid(key);
  }

  rollbackProperty(key: string) {
    this.changeset.rollbackProperty(key);
  }

  validate(
    ...validationKeys: `${Extract<keyof T, string | number>}`[]
  ): Promise<unknown> {
    return this.changeset.validate(...validationKeys);
  }

  addError(key: string, error: unknown) {
    this.changeset.addError(key, error as never);
  }

  pushErrors(key: string, ...newErrors: unknown[]) {
    this.changeset.pushErrors(key, ...(newErrors as never));
  }

  isValidating(key?: string): boolean {
    return this.changeset.isValidating(key);
  }

  public get data(): T {
    return this.changeset.data as T;
  }

  get<K extends StringKeyOf<T>>(key: K): T[K] {
    return this.changeset.get(key);
  }

  set<K extends StringKeyOf<T>>(key: K, value: T[K]): void {
    return this.changeset.set(key, value);
  }

  pushInArray<K extends ArrayKeys<T>, V extends IterableElement<T[K]>>(
    key: K,
    value: V
  ) {
    this.set<K>(key, [...this.get(key), value] as never);
    return value;
  }

  removeFromArray<K extends ArrayKeys<T>, V extends IterableElement<T[K]>>(
    key: K,
    value: V
  ) {
    this.set(
      key,
      this.get(key).filter((v: unknown[]) => v !== value)
    );
  }

  removeFromArrayIndex<K extends ArrayKeys<T>>(key: K, index: number) {
    this.set(
      key,
      this.get(key).filter((_: unknown, i: number) => i !== index)
    );
  }
}
