import { Changeset } from 'ember-form-changeset-validations';
import { module, test } from 'qunit';
import { expectTypeOf } from 'expect-type';

interface ArticleDTO {
  name: string;
  age: 14;
}

module('Unit | Types', function () {
  test('TypedBufferedChangeset key access', (assert) => {
    assert.expect(0);
    expectTypeOf<Changeset<ArticleDTO>['get']>().parameters.toEqualTypeOf<
      ['name' | 'age']
    >();
  });
  test('ProxyWrappedBufferedChangeset set & get & data', (assert) => {
    assert.expect(0);

    expectTypeOf<Changeset<ArticleDTO>['get']>().parameters.toEqualTypeOf<
      ['name' | 'age']
    >();
    expectTypeOf<Changeset<ArticleDTO>['get']>().not.parameters.toEqualTypeOf<
      ['nothing']
    >();

    expectTypeOf<Changeset<ArticleDTO>['set']>()
      .parameter(0)
      .toEqualTypeOf<'name' | 'age'>();
    expectTypeOf<Changeset<ArticleDTO>['set']>()
      .parameter(1)
      .toEqualTypeOf<string | 14>();
    expectTypeOf<Changeset<ArticleDTO>['set']>()
      .not.parameter(0)
      .toEqualTypeOf<'nothing'>();

    expectTypeOf<Changeset<ArticleDTO>['data']>().toEqualTypeOf<ArticleDTO>();
  });
});
