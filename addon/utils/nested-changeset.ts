import type { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import { isChangeset } from './is-changeset';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export type PojoChangeset<DTO> = {
  [TKey in keyof DTO]: DTO[TKey] extends infer T
    ? T extends TypedBufferedChangeset[]
      ? PojoChangeset<ElementType<T>['data']>[]
      : T extends TypedBufferedChangeset
      ? T['data']
      : T
    : never;
};

function doIfChangeset(
  possibleChangeset: unknown,
  action: (changeset: TypedBufferedChangeset) => Promise<unknown> | unknown
) {
  if (isChangeset(possibleChangeset)) {
    return action(possibleChangeset as TypedBufferedChangeset);
  }
}

async function recurseKey(
  changeset: TypedBufferedChangeset,
  key: string,
  action: (changeset: TypedBufferedChangeset) => Promise<unknown> | unknown
) {
  const keyValue = changeset.get(key);
  if (isChangesetArray(keyValue)) {
    await Promise.all(
      (keyValue as TypedBufferedChangeset[]).map((o) => action(o))
    );
  }
  return doIfChangeset(keyValue, action);
}

function isChangesetArray(keyValue: unknown) {
  return (
    Array.isArray(keyValue) &&
    keyValue.every((e) => {
      return isChangeset(e);
    })
  );
}

export async function execute(changeset: TypedBufferedChangeset) {
  for (const key in changeset.data) {
    await recurseKey(changeset, key, execute);
  }
  changeset.execute();
}

export async function validate(changeset: TypedBufferedChangeset) {
  for (const key in changeset.data) {
    await recurseKey(changeset, key, validate);
  }
  await changeset.validate();
}

export function isValid(changeset: TypedBufferedChangeset) {
  for (const key in changeset.data) {
    const keyValue = changeset.get(key);
    if (
      isChangesetArray(keyValue) &&
      (keyValue as TypedBufferedChangeset[]).some((c) => !isValid(c))
    ) {
      return false;
    }
    if (isChangeset(keyValue) && !isValid(keyValue as TypedBufferedChangeset)) {
      return false;
    }
  }
  return changeset.isValid;
}

export function data<T extends TypedBufferedChangeset>(
  changeset: T
): PojoChangeset<T['data']> {
  const out: Record<string, unknown> = {};
  for (const key in changeset.data) {
    const keyValue = changeset.data[key];
    if (isChangeset(keyValue)) {
      out[key] = data(keyValue as TypedBufferedChangeset);
    } else if (isChangesetArray(keyValue)) {
      out[key] = (keyValue as TypedBufferedChangeset[]).map((kv) => data(kv));
    } else {
      out[key] = keyValue;
    }
  }
  return out as PojoChangeset<T>;
}
