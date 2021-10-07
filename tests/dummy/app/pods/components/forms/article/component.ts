import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

interface FormsArticleArgs extends BaseFormArgs {}

export default class FormsArticle extends BaseForm<FormsArticleArgs> {
  @action updateText(e: Event) {
    this.args.changeset.set('title', (e.target as HTMLInputElement).value);
  }

  @action updateAuthor(e: Event) {
    this.args.changeset.set(
      `author.username`,
      (e.target as HTMLInputElement).value
    );
  }
}
