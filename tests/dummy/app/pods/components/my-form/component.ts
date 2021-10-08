import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

interface MyFormArgs extends BaseFormArgs {} 

export default class MyForm extends BaseForm<MyFormArgs> {
    constructor(owner: unknown, args: MyFormArgs) {
      super(
        owner,
        args
      );
    }
}

