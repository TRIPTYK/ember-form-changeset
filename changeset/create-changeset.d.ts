import { Changeset, ProxyWrappedChangeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { ConstructorParams } from 'expect-type';
import { Class } from 'type-fest';
/**
 * Creates a changeset and wrap it into a proxy
 * If a proxy is not required, just use new changeset(...)
 */
export declare function createChangeset<C extends Changeset>(changesetClass: Class<C>, ...args: ConstructorParams<Class<C>>): ProxyWrappedChangeset<C>;
//# sourceMappingURL=create-changeset.d.ts.map