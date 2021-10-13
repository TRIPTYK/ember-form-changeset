import Model from '@ember-data/model';
import Store from '@ember-data/store';
import ArrayProxy from '@ember/array/proxy';

/**
 * Pojoize an ember data record
 * Relations will be loaded if they are available in the store
 */
export const toPojo = <T extends Model>(
  object: T | ArrayProxy<T> | null,
  store: Store
): Record<string, unknown> | Record<string, unknown>[] => {
  if (object instanceof ArrayProxy) {
    return object.toArray().map((r) => toPojo(r, store)) as Record<
      string,
      unknown
    >[];
  }

  if (!(object instanceof Model)) {
    throw new Error('Please provide an ember record');
  }

  const model = store.modelFor(
    (object.constructor as any).modelName
  ) as typeof Model;

  const attributes = model.attributes as any;
  const relationships = model.relationshipsByName as any;
  const plain: Record<string, unknown> = {};

  attributes.forEach((_meta: unknown, name: keyof Model) => {
    const value = object.get(name);
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
        const relationRef = object.belongsTo(key);
        const value = relationRef.value();
        if (value !== null) {
          plain[name] = value.id;
        }
      } else {
        const relationRef = object.hasMany(key);
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
