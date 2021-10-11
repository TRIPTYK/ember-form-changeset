import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

interface FormsImagesArgs extends BaseFormArgs {}

export default class FormsImages extends BaseForm<FormsImagesArgs> {
  constructor(owner: unknown, args: FormsImagesArgs) {
    super(owner, args);
  }

  @action
  updateValue(field: string, e: InputEvent) {
    e.preventDefault();
    this.args.changeset.set(field, (e.target as HTMLInputElement).value);
  }
}
