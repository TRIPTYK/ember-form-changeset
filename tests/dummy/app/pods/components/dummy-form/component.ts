import { validatePresence } from 'ember-changeset-validations/validators';
import {
  BaseValidationFormInterface,
  BaseFormComponent,
} from 'ember-form-changeset-validations';

export interface DummyFormArgs extends BaseValidationFormInterface {}

export interface DummyFormDTO {
  text: string;
}

export default class DummyForm extends BaseFormComponent<
  DummyFormArgs,
  DummyFormDTO
> {
  constructor(owner: unknown, args: DummyFormArgs) {
    super(
      owner,
      args,
      {
        text: '',
      },
      {
        text: [validatePresence({ presence: true })],
      }
    );
  }
}
