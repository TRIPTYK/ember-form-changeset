import lookupValidator from 'ember-changeset-validations';
import {
  Changeset,
  ProxyWrappedChangeset,
} from 'ember-form-changeset-validations/types/typed-changeset';
import { Class, StringKeyOf } from 'type-fest';

export function createChangeset<C extends Changeset>(
  changesetClass: Class<C>,
  initialData: C['data'],
  validationMap: Record<StringKeyOf<C['data']>, unknown>
): ProxyWrappedChangeset<C> {
  const instance = new changesetClass(
    initialData,
    lookupValidator(validationMap),
    validationMap
  );

  return new Proxy(instance, {
    get(targetBuffer, key: StringKeyOf<C['data']>) {
      const res = targetBuffer.get(key);
      return res;
    },
    set(targetBuffer, key: StringKeyOf<C['data']>, value) {
      targetBuffer.set(key, value);
      return true;
    },
  }) as unknown as ProxyWrappedChangeset<C>;
}
