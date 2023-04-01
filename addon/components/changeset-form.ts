import Owner from '@ember/owner';
import Component from '@glimmer/component';
import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { isValid } from 'ember-form-changeset-validations/utils/nested-changeset/is-valid';
import { validate } from 'ember-form-changeset-validations/utils/nested-changeset/validate';
import { Promisable } from 'type-fest';
import { assert } from '@ember/debug';
import { isChangeset } from 'ember-form-changeset-validations/utils/is-changeset';
import { dropTask, task } from 'ember-concurrency';
import { waitFor } from '@ember/test-waiters';
import { taskFor } from 'ember-concurrency-ts';

export interface ChangesetFormComponentArgs<T extends Changeset> {
  changeset: T;
  onSubmit: (changeset: T) => Promisable<unknown>;
  handleSubmitError: (changeset: T, error: Error) => Promisable<unknown>;
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

  @dropTask
  *validateAndSubmit() {
    yield validate(this.args.changeset);
    if (isValid(this.args.changeset)) {
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
