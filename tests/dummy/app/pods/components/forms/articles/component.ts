import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';
import { tracked } from '@glimmer/tracking';

import { BufferedChangeset } from 'validated-changeset';
import CommentsValidation from '../../../../validator/forms/comments';
import ImagesValidation from '../../../../validator/forms/images';

export interface CommentsDTO {
  id?: string;
  content?: string;
}

export interface ImageDTO {
  url: string;
  name: string;
  blob?: Blob;
  id?: string;
}

export interface ArticlesDTO {
  image: ImageDTO;
  id?: string;
  comments: CommentsDTO[];
  title: string;
  description: string;
}

interface FormsArticlesArgs extends BaseFormArgs {
  createComment: (
    changeset: BufferedChangeset,
    parentChangeset: BufferedChangeset
  ) => Promise<void> | void;
  editComment: (
    changeset: BufferedChangeset,
    parentChangeset: BufferedChangeset
  ) => Promise<void> | void;
}

export default class FormsArticles extends BaseForm<FormsArticlesArgs> {
  CommentsValidation = CommentsValidation;
  ImagesValidation = ImagesValidation;

  @tracked isAddingComment = false;

  @action
  toggleCommentModal() {
    this.isAddingComment = !this.isAddingComment;
  }

  @action saveImage(changeset: BufferedChangeset) {
    this.args.changeset.set('image', {
      url: changeset.get('url'),
      name: changeset.get('name'),
      id: changeset.get('id'),
    });
  }

  @action createComment(
    changeset: BufferedChangeset,
    parentChangeset: BufferedChangeset
  ) {
    this.isAddingComment = false;
    return this.args.createComment(changeset, parentChangeset);
  }

  @action
  updateValue(field: string, e: InputEvent) {
    e.preventDefault();
    this.args.changeset.set(field, (e.target as HTMLInputElement).value);
  }
}
