import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';
import { tracked } from '@glimmer/tracking';

export interface CommentsDTO {
  id?: string;
  content?: string;
}

export interface ArticlesDTO {
  id?: string;
  comments: CommentsDTO[];
  title: string;
  description: string;
}

interface FormsArticlesArgs extends BaseFormArgs {}

export default class FormsArticles extends BaseForm<FormsArticlesArgs> {
  @tracked isAddingComment = false;

  @action
  toggleCommentModal() {
    this.isAddingComment = !this.isAddingComment;
  }

  @action
  updateValue(field: string, e: InputEvent) {
    e.preventDefault();
    this.args.changeset.set(field, (e.target as HTMLInputElement).value);
  }
}
