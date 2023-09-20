import Owner from '@ember/owner';
import Component from '@glimmer/component';
import { Promisable } from 'type-fest';
import { assert } from '@ember/debug';
import { task } from 'ember-concurrency';
import { ImmerChangeset } from '../changeset/immer-changeset';
import { isChangeset } from '../utils/is-changeset';

export interface ChangesetFormComponentArgs<T extends ImmerChangeset> {
  changeset: T;
  onSubmit: (changeset: T) => Promisable<unknown>;
  validationFunction: Parameters<ImmerChangeset['validate']>[0];
  validateOneFunction: (
    key: string,
    value: unknown,
  ) => Parameters<ImmerChangeset['validate']>[0];
  removeErrorsOnSubmit?: boolean;
  executeOnValid?: boolean;
}

export default class ChangesetFormComponent extends Component<
  ChangesetFormComponentArgs<ImmerChangeset>
> {
  public constructor(
    owner: Owner,
    args: ChangesetFormComponentArgs<ImmerChangeset>,
  ) {
    super(owner, args);
    assert(
      '@changeset is required and must be an ImmerChangeset',
      isChangeset(args.changeset) && args.changeset instanceof ImmerChangeset,
    );
    assert('@onSubmit is required', typeof args.onSubmit === 'function');
    assert(
      '@validationFunction is required',
      typeof args.validationFunction === 'function',
    );
  }

  validateAndSubmit = task(this, { drop: true }, async () => {
    if (this.args.removeErrorsOnSubmit ?? true) {
      this.args.changeset.removeErrors();
    }

    await this.args.changeset.validate(this.args.validationFunction);

    if (!this.args.changeset.isValid) {
      return;
    }

    if (this.args.executeOnValid ?? true) {
      this.args.changeset.execute();
    }

    await this.args.onSubmit(this.args.changeset);
  });

  submit = task(this, async (e: Event) => {
    e.preventDefault();
    await this.validateAndSubmit.perform();
  });
}
