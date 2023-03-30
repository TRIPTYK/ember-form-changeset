import {
  ArrayKeys,
  Changeset,
  ExtendedChangeset,
  ProxyWrappedChangeset,
} from 'ember-form-changeset-validations';
import { module, test } from 'qunit';
import { expectTypeOf } from 'expect-type';

interface ArticleDTO {
  name: string;
  age: 14;
}

interface FormsLoginDTO {
  email: string;
  array: string[];
}

class LoginChangeset extends ExtendedChangeset<FormsLoginDTO> {}

module('Unit | Types', function () {
  test('TypedBufferedChangeset key access', (assert) => {
    assert.expect(0);
    expectTypeOf<
      ExtendedChangeset<ArticleDTO>['get']
    >().parameters.toEqualTypeOf<['name' | 'age']>();
  });
  test('ProxyWrappedBufferedChangeset set & get & data', (assert) => {
    assert.expect(0);

    expectTypeOf<
      ExtendedChangeset<ArticleDTO>['get']
    >().parameters.toEqualTypeOf<['name' | 'age']>();
    expectTypeOf<Changeset<ArticleDTO>['get']>().not.parameters.toEqualTypeOf<
      ['nothing']
    >();

    expectTypeOf<ExtendedChangeset<ArticleDTO>['set']>()
      .parameter(0)
      .toEqualTypeOf<'name' | 'age'>();
    expectTypeOf<ExtendedChangeset<ArticleDTO>['set']>()
      .parameter(1)
      .toEqualTypeOf<string | 14>();
    expectTypeOf<ExtendedChangeset<ArticleDTO>['set']>()
      .not.parameter(0)
      .toEqualTypeOf<'nothing'>();

    expectTypeOf<
      ExtendedChangeset<ArticleDTO>['data']
    >().toEqualTypeOf<ArticleDTO>();
  });

  test('ExtendedChangeset should be compatible with base interface Changeset', (assert) => {
    assert.expect(0);
    type Extends<T> = T extends Changeset ? true : never;
    interface A {
      array: string[];
      other: unknown;
    }
    expectTypeOf<Extends<ExtendedChangeset<A>>>().not.toBeNever();
  });

  test('ProxyWrappedChangeset', (assert) => {
    assert.expect(0);
    interface A {
      array: string[];
      other: unknown;
    }

    expectTypeOf<ProxyWrappedChangeset<ExtendedChangeset<A>>>().toHaveProperty(
      'array'
    );
    expectTypeOf<ProxyWrappedChangeset<ExtendedChangeset<A>>>().toHaveProperty(
      'other'
    );
  });

  test('ArrayKeys extracts array keys from object', (assert) => {
    assert.expect(0);
    interface A {
      array: string[];
      other: unknown;
    }
    expectTypeOf<ArrayKeys<A>>().toEqualTypeOf<'array'>();
  });

  test('ExtendedChangeset does not loose type checking', (assert) => {
    assert.expect(0);
    expectTypeOf<InstanceType<typeof LoginChangeset>['get']>()
      .parameter(0)
      .toEqualTypeOf<'email' | 'array'>();
    expectTypeOf<InstanceType<typeof LoginChangeset>['set']>()
      .parameter(0)
      .toEqualTypeOf<'email' | 'array'>();
    expectTypeOf<
      InstanceType<typeof LoginChangeset>['data']
    >().toEqualTypeOf<FormsLoginDTO>();
    expectTypeOf<InstanceType<typeof LoginChangeset>['pushInArray']>()
      .parameter(0)
      .toEqualTypeOf<'array'>();
    expectTypeOf<InstanceType<typeof LoginChangeset>['removeFromArray']>()
      .parameter(0)
      .toEqualTypeOf<'array'>();
    expectTypeOf<InstanceType<typeof LoginChangeset>['removeFromArrayIndex']>()
      .parameter(0)
      .toEqualTypeOf<'array'>();
  });
});
