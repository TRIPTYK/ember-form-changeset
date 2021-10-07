import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

interface FormsCommentArgs extends BaseFormArgs {}

export default class FormsComment extends BaseForm<FormsCommentArgs> {
  @action updateContent(e: Event) {
    this.args.changeset.set('content', (e.target as HTMLInputElement).value);
  }
}
