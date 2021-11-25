import { action } from '@ember/object';
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

export interface TestableDTO {

}

interface TestableArgs extends BaseFormArgs<TestableDTO> {} 

export default class Testable extends BaseForm<TestableArgs> {
  constructor(owner: unknown, args: TestableArgs) {
    super(
      owner,
      args
    );
  }

  @action
  updateValue(field: keyof TestableDTO, e: InputEvent) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    this.args.changeset.set(field,  target.type === "checkbox" ? target.checked : target.value);
  }
}

