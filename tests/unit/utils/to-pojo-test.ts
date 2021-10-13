import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { toPojo } from 'ember-form-changeset-validations/utils/to-pojo';
import Store from '@ember-data/store';

module('To-pojo', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {});

  test('Transforms should throw if not an Ember model', async function (assert) {
    const store = this.owner.lookup('service:store') as Store;
    assert.throws(
      // @ts-expect-error
      () => toPojo([], store),
      /Please provide an ember record/i,
      'should throw if not an ember record'
    );
    assert.throws(
      // @ts-expect-error
      () => toPojo({}, store),
      /Please provide an ember record/i,
      'should throw if not an ember record'
    );
  });

  test('Transforms ember record to POJO', async function (assert) {
    const store = this.owner.lookup('service:store') as Store;

    const user = store.createRecord('user', {
      id: 2,
      username: 'Amaury Deflorenne',
    });

    store.createRecord('comment', {
      id: 1,
      content: 'Contenu du commentaire',
      author: user,
    });

    const record = store.createRecord('article', {
      id: 3,
      title: 'A nice article',
      description: 'Consectetur ad dolore ea commodo nostrud esse.',
      comments: store.peekAll('comment'),
      author: user,
    });

    const result = toPojo(record, store);

    assert.propEqual(result, {
      title: 'A nice article',
      description: 'Consectetur ad dolore ea commodo nostrud esse.',
      comments: ['1'],
      author: '2',
      id: '3',
    });
  });

  test('Transforms ember record skip undefined keys', async function (assert) {
    const store = this.owner.lookup('service:store') as Store;

    const user = store.createRecord('user', {
      id: 2,
      username: undefined,
    });

    const result = toPojo(user, store);

    assert.propEqual(
      result,
      {
        id: '2',
      },
      'undefined keys are skipped'
    );
  });

  test('Transforms ember record array to POJO', async function (assert) {
    const store = this.owner.lookup('service:store') as Store;

    const user = store.createRecord('user', {
      id: 2,
      username: 'Amaury Deflorenne',
    });

    store.createRecord('comment', {
      id: 1,
      content: 'Contenu du commentaire',
      author: user,
    });

    store.createRecord('article', {
      id: 3,
      description: 'Consectetur ad dolore ea commodo nostrud esse.',
      title: 'A nice article',
      comments: store.peekAll('comment'),
      author: user,
    });

    const result = toPojo(store.peekAll('article'), store);

    assert.propEqual(result, [
      {
        title: 'A nice article',
        description: 'Consectetur ad dolore ea commodo nostrud esse.',
        comments: ['1'],
        author: '2',
        id: '3',
      },
    ]);
  });
});
