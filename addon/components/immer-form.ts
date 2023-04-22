import Owner from '@ember/owner';
import Component from '@glimmer/component';
import { Promisable } from 'type-fest';
import { assert } from '@ember/debug';
import { isChangeset } from 'ember-form-changeset-validations/utils/is-changeset';
import { dropTask, task } from 'ember-concurrency';
import { waitFor } from '@ember/test-waiters';
import { taskFor } from 'ember-concurrency-ts';
import { ImmerChangeset } from 'ember-form-changeset-validations/changeset/immer-changeset';

export interface ChangesetFormComponentArgs<T extends ImmerChangeset> {
  changeset: T;
  onSubmit: (changeset: T) => Promisable<unknown>;
  validationFunction: Parameters<ImmerChangeset['validate']>[0];
}

export default class ChangesetFormComponent extends Component<
  ChangesetFormComponentArgs<ImmerChangeset>
> {
  public constructor(
    owner: Owner,
    args: ChangesetFormComponentArgs<ImmerChangeset>
  ) {
    super(owner, args);
    assert(
      '@changeset is required and must be an ImmerChangeset',
      isChangeset(args.changeset) && args.changeset instanceof ImmerChangeset
    );
    assert('@onSubmit is required', typeof args.onSubmit === 'function');
    assert(
      '@validationFunction is required',
      typeof args.validationFunction === 'function'
    );
  }

  @dropTask
  *validateAndSubmit() {
    yield this.args.changeset.validate(this.args.validationFunction);

    if (this.args.changeset.isValid) {
      yield this.args.onSubmit(this.args.changeset);
    }
  }

  @task
  @waitFor
  *submit(e: Event) {
    e.preventDefault();
    const task = taskFor(this.validateAndSubmit);
    yield task.perform();
  }
}
