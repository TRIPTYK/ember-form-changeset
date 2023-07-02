import { Get, Promisable, StringKeyOf } from 'type-fest';
import { produce, Draft, Patch, applyPatches, enablePatches } from 'immer';
import { get, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  Changeset,
  ValidateOneFunction,
  ValidationError,
  ValidationFunction,
} from '../types/changeset';
import { aggregatedLastChanges } from '../utils/get-last-versions';

enablePatches();

export class ImmerChangeset<T extends Record<string, any> = Record<string, any>>
  implements Changeset<T>
{
  @tracked
  data: T;

  @tracked
  private draftData: T;

  @tracked
  private innerErrors: Record<string, ValidationError> = {};

  private patches: Patch[] = [];
  private inversePatches: Patch[] = [];

  get changes() {
    return aggregatedLastChanges(this.normalizedPatches());
  }

  get errors() {
    return Object.values(this.innerErrors);
  }

  get isValid() {
    return this.errors.length === 0;
  }

  get isPristine() {
    return this.patches.length + this.inversePatches.length === 0;
  }

  get isInvalid() {
    return !this.isValid;
  }

  get isDirty() {
    return !this.isPristine;
  }

  public constructor(data: T) {
    this.data = produce(data, () => {});
    this.draftData = produce(data, () => {});
  }

  execute(): void {
    this.data = applyPatches(this.data, this.patches);
  }

  unexecute(): void {
    this.data = applyPatches(this.data, this.inversePatches);
  }

  save(): Promisable<void> {
    this.data = applyPatches(this.data, this.patches);
    this.resetPatches();
  }

  rollback(): void {
    this.draftData = applyPatches(this.draftData, this.inversePatches);
  }

  rollbackProperty(property: string): void {
    this.set(property, get(this.data, property) as never);
  }

  addError(key: string, error: ValidationError): void {
    this.innerErrors = { ...this.innerErrors, [key]: error };
  }

  removeError(key: string): void {
    delete this.innerErrors[key];
    this.innerErrors = { ...this.innerErrors };
  }

  get<K extends string>(key: K): Get<T, K> {
    return get(this.draftData, key) as Get<T, K>;
  }

  set<K extends string>(key: K, value: Get<T, K>): void {
    this.draftData = produce(
      this.draftData,
      (d: Draft<T>) => {
        set(d, key, value as never);
      },
      (patches, inversePatches) => {
        this.patches.push(...patches);
        this.inversePatches.push(...inversePatches);
      }
    );
  }

  async validate(validation: ValidationFunction<T>) {
    const errors = await validation(this.draftData);
    this.innerErrors = errors.reduce((p, c) => {
      p[c.key] = c;
      return p;
    }, {} as Record<string, ValidationError>);
  }

  async validateOne<K extends StringKeyOf<T>>(
    key: K,
    validation: ValidateOneFunction<T>
  ) {
    // eslint-disable-next-line ember/classic-decorator-no-classic-methods
    const error = await validation(this.get(key), key, this.draftData);
    if (error) {
      return this.addError(key, error);
    }
    this.removeError(key);
  }

  private normalizedPatches() {
    return this.patches.map((patch) => ({
      value: patch.value,
      key: patch.path.join('.'),
    }));
  }

  private resetPatches() {
    this.patches = [];
    this.inversePatches = [];
  }
}
