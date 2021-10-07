// import Model from '@ember-data/model';
import Model from '@ember-data/model';
import Store from '@ember-data/store';
import ArrayProxy from '@ember/array/proxy';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports

/**
 * Pojoize an ember data record
 */
export const toPojo = <T extends Model>(
  object: T | ArrayProxy<T>,
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
    plain[name] = object.get(name);
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
