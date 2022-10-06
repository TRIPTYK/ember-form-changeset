import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';
import UploadFile from 'ember-file-upload/upload-file';

interface DTO {
  blob: string;
  url: string;
}

interface FormsImagesArgs extends BaseFormArgs<DTO> {}

export default class FormsImages extends BaseForm<FormsImagesArgs, DTO> {
  constructor(owner: unknown, args: FormsImagesArgs) {
    super(owner, args);
  }

  @action
  async setFile(file: UploadFile) {
    this.args.changeset.set('blob', file);
    this.args.changeset.set('url', await file.readAsDataURL());
  }

  @action
  updateValue(field: string, e: InputEvent) {
    e.preventDefault();
    this.args.changeset.set<string>(
      field,
      (e.target as HTMLInputElement).value
    );
  }
}
