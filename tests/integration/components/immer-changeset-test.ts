import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ImmerChangeset } from 'ember-form-changeset-validations/changeset/immer-changeset';
import hugeChangeset from './huge-changeset-data';

const changes = [
  { key: 'name', value: 'Amaury Cardon' },
  { key: 'address.state.full', value: 'California, USA' },
  { key: 'address.zip.plus4.digits', value: '4321' },
  { key: 'address.location.timezone.offset', value: '-08:00' },
  { key: 'contacts.0.phone.home.number.areaCode', value: '123' },
  { key: 'contacts.1.social.twitter.followerCount', value: 7500 },
];

module('Integration | Component | immer-changeset', function (hooks) {
  setupRenderingTest(hooks);

  test('data tracking on huge changeset', async function (assert) {
    const changeset = new ImmerChangeset(hugeChangeset);
    this.set('changeset', changeset);
    this.set('changesetGet', (ch: typeof changeset, key: string) => {
      return ch.get(key);
    });

    this.set('changes', changes);

    await render(hbs`
        {{#each this.changes  as |change|}}
          {{this.changesetGet this.changeset change.key}}
        {{/each}}
    `);

    const elapsed = Date.now();

    for (const { key, value } of changes) {
      changeset.set(key, value);
    }

    await settled();
    assert
      .dom()
      .matchesText('Amaury Cardon California, USA 4321 -08:00 123 7500');

    // speed can vary depending  of  the processor, OS, context,  ... this is just an indicator   of performance
    assert.true(
      Date.now() - elapsed < 50,
      'Changing tracking is not too computational heavy < 50ms'
    );
  });
});
