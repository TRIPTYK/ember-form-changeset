import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

interface SubformsCommentsArgs extends BaseFormArgs {} 

export default class SubformsComments extends BaseForm<SubformsCommentsArgs> {
  constructor(owner: unknown, args: SubformsCommentsArgs) {
    super(
      owner,
      args
    );
  }

  @action
  updateValue(field: string, e: InputEvent) {
    e.preventDefault();
    this.args.changeset.set(field, (e.target as HTMLInputElement).value);
  }
}

