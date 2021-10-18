import Model from '@ember-data/model';
import Store from '@ember-data/store';
import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';

/**
 * Pojoize an ember data record
 * Relations will be loaded if they are available in the store
 */
export const toPojo = <T extends Model>(
  object: T | T[] | ArrayProxy<T> | ObjectProxy<T> | null | undefined,
  store: Store
):
  | Record<string, unknown>
  | (Record<string, unknown> | null | undefined)[]
  | null
  | undefined => {
  // null | undefined return themselves
  if (object === undefined || object === null) {
    return object;
  }

  // handle array proxys
  if (object instanceof ArrayProxy) {
    return object.toArray().map((r) => toPojo(r, store)) as (
      | Record<string, unknown>
      | null
      | undefined
    )[];
  }

  // handle native arrays
  if (Array.isArray(object)) {
    return object.map((e) => toPojo(e, store)) as
      | Record<string, unknown>[]
      | undefined[]
      | null[];
  }

  const isValid = object instanceof Model || object instanceof ObjectProxy;

  if (!isValid) {
    throw new Error('Please provide an ember record or record proxy');
  }

  if (object instanceof ObjectProxy) {
    if (!object.content) {
      throw new Error('Ember proxy is empty');
    }
    object = object.content;
  }

  // enforce type
  let modelObject: T = object;

  const model = store.modelFor(
    (modelObject.constructor as any).modelName
  ) as typeof Model;

  const attributes = model.attributes as any;
  const relationships = model.relationshipsByName as any;
  const plain: Record<string, unknown> = {};

  attributes.forEach((_meta: unknown, name: keyof Model) => {
    const value = modelObject.get(name);
    if (value !== undefined) {
      plain[name] = value;
    }
  });
  relationships.forEach(
    (
      {
        key,
        kind,
      }: {
        key: Exclude<keyof T, keyof Model>;
        kind: 'belongsTo' | 'hasMany';
        type: string;
      },
      name: string
    ) => {
      if (kind === 'belongsTo') {
        const relationRef = modelObject.belongsTo(key);
        const value = relationRef.value();
        if (value !== null) {
          plain[name] = value.id;
        }
      } else {
        const relationRef = modelObject.hasMany(key);
        const value = relationRef.value();
        if (value !== null) {
          plain[name] = relationRef.ids();
        }
      }
    }
  );
  plain['id'] = object.id;
  return plain;
};
