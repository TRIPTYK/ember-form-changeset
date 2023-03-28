import lookupValidator from 'ember-changeset-validations';
import { ProxyWrappedChangeset as ProxyWrappedExtendedChangeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { Class, StringKeyOf } from 'type-fest';
import { ExtendedChangeset } from './extended-changeset';

export function createChangeset<
  DTO extends object,
  C extends ExtendedChangeset<DTO> = ExtendedChangeset<DTO>
>(
  changesetClass: Class<C>,
  initialData: DTO,
  validationMap: Record<StringKeyOf<DTO>, unknown>
): ProxyWrappedExtendedChangeset<DTO> {
  const instance = new changesetClass(
    initialData,
    lookupValidator(validationMap),
    validationMap
  );

  return new Proxy(instance, {
    get(targetBuffer, key) {
      const res = targetBuffer.get(key.toString());
      return res;
    },
    set(targetBuffer, key, value) {
      targetBuffer.set(key.toString(), value);
      return true;
    },
  }) as unknown as ProxyWrappedExtendedChangeset<DTO>;
}
