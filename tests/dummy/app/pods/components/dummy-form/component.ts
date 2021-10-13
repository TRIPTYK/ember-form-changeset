import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

interface DummyFormArgs extends BaseFormArgs {}

export default class DummyForm extends BaseForm<DummyFormArgs> {
  constructor(owner: unknown, args: DummyFormArgs) {
    super(owner, args);
  }

  @action
  updateValue(field: string, e: InputEvent) {
    e.preventDefault();
    this.args.changeset.set(field, (e.target as HTMLInputElement).value);
  }
}
