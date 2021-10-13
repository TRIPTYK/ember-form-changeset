import { action } from '@ember/object';
import Component from '@glimmer/component';
import { TypedBufferedChangeset } from 'ember-form-changeset-validations';
import { isChangeset } from 'validated-changeset';

export interface BaseFormArgs<
  T extends Record<string, any> = Record<string, any>
> {
  changeset: TypedBufferedChangeset<T>;
  saveFunction: (
    changeset: TypedBufferedChangeset<T>,
    ...otherArgs: unknown[]
  ) => Promise<void>;
}

export default abstract class BaseForm<
  T extends BaseFormArgs
> extends Component<T> {
  constructor(owner: unknown, args: T) {
    super(owner, args);
    if (!args.changeset || !isChangeset(args.changeset)) {
      throw new Error('You must pass a valid @changeset as argument');
    }
  }

  @action
  rollback(e?: Event) {
    e?.preventDefault();
    this.args.changeset.rollback();
  }

  @action
  async submit(e?: Event, ...otherArgs: unknown[]) {
    e?.preventDefault();
    await this.args.changeset.validate();

    if (this.args.changeset.isValid) {
      await this.args.saveFunction?.(this.args.changeset, ...otherArgs);
    }
  }
}
