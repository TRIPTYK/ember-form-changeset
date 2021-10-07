import { action } from '@ember/object';
import Component from '@glimmer/component';
import { BufferedChangeset } from 'validated-changeset';

export interface BaseFormArgs {
  changeset: BufferedChangeset;
  saveFunction: (
    changeset: BufferedChangeset,
    ...otherArgs: unknown[]
  ) => Promise<void>;
}

export default abstract class BaseForm<
  T extends BaseFormArgs
> extends Component<T> {
  @action
  async submit(e: Event, ...otherArgs: unknown[]) {
    e?.preventDefault();
    await this.args.changeset.validate();

    if (this.args.changeset.isValid) {
      await this.args.saveFunction?.(this.args.changeset, ...otherArgs);
    }
  }
}
