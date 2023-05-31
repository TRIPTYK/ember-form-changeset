import {
  Changeset,
  ProxyWrappedChangeset,
} from 'ember-form-changeset-validations/types/typed-changeset';
import { ConstructorParams } from 'expect-type';
import { Class, StringKeyOf } from 'type-fest';

export function createChangeset<C extends Changeset>(
  changesetClass: Class<C>,
  ...args: ConstructorParams<Class<C>>
): ProxyWrappedChangeset<C> {
  const instance = new changesetClass(...args);

  return new Proxy(instance, {
    get(targetBuffer, key: string) {
      const res = targetBuffer.get(key.toString());
      return res;
    },
    set(targetBuffer, key: StringKeyOf<C['data']>, value) {
      targetBuffer.set(key.toString(), value);
      return true;
    },
  }) as ProxyWrappedChangeset<C>;
}
