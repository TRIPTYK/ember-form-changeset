import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

export interface <%= classifiedModuleName %>DTO {
<%= dtoFields %>
}

interface <%= classifiedModuleName %>Args extends BaseFormArgs<<%= classifiedModuleName %>DTO> {} 

export default class <%= classifiedModuleName %> extends BaseForm<<%= classifiedModuleName %>Args> {
  constructor(owner: unknown, args: <%= classifiedModuleName %>Args) {
    super(
      owner,
      args
    );
  }

  @action
  updateValue(field: keyof <%= classifiedModuleName %>DTO, e: InputEvent) {
    e.preventDefault();
    this.args.changeset.set(field, (e.target as HTMLInputElement).value);
  }
}

