import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

export interface FormsPotatoDTO {
ccc: unknown,\nbbb: unknown,\nddd: unknown,
}

interface FormsPotatoArgs extends BaseFormArgs<FormsPotatoDTO> {} 

export default class FormsPotato extends BaseForm<FormsPotatoArgs> {
  constructor(owner: unknown, args: FormsPotatoArgs) {
    super(
      owner,
      args
    );
  }

  @action
  updateValue(field: keyof FormsPotatoDTO, e: InputEvent) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    this.args.changeset.set(field,  target.type === "checkbox" ? target.checked : target.value);
  }
}

