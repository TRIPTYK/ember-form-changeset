import { createChangeset } from 'ember-form-changeset-validations/changeset/create-changeset';
import { module, test } from 'qunit';
import { ExtendedChangeset } from 'ember-form-changeset-validations/changeset/extended-changeset';

interface ArticleDTO {
  name: string;
}

class ArticleChangeset extends ExtendedChangeset<ArticleDTO> {}

module('Unit | Utility | create-changeset', function () {
  test('It wraps changeset into proxy and initializes with dto and validationMap', function (assert) {
    const validationMap = {
      name: [],
    };
    const dto = {
      name: '',
    };

    const changeset = createChangeset<ArticleDTO>(
      ArticleChangeset,
      dto,
      validationMap
    );

    assert.strictEqual(changeset.data, dto);
    assert.strictEqual(changeset.validationMap, validationMap);
  });
});
