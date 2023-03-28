import { action } from '@ember/object';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';
import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isValid } from 'ember-form-changeset-validations/utils/nested-changeset/is-valid';
import { validate } from 'ember-form-changeset-validations/utils/nested-changeset/validate';
import { Promisable } from 'type-fest';
import { assert } from '@ember/debug';
import { isChangeset } from 'ember-form-changeset-validations/utils/is-changeset';

export interface ChangesetFormComponentArgs<T extends Changeset> {
  changeset: T;
  onSubmit: (changeset: T) => Promisable<unknown>;
}

export default class ChangesetFormComponent extends Component<
  ChangesetFormComponentArgs<Changeset>
> {
  public constructor(
    owner: Owner,
    args: ChangesetFormComponentArgs<Changeset>
  ) {
    super(owner, args);
    assert(
      '@changeset is required and must be a changeset',
      args.changeset !== undefined && isChangeset(args.changeset)
    );
    assert('@onSubmit is required', typeof args.onSubmit === 'function');
  }

  @action
  async submit(e: Event) {
    e.preventDefault();
    await validate(this.args.changeset);
    if (isValid(this.args.changeset)) {
      await this.args.onSubmit(this.args.changeset);
    }
  }
}
