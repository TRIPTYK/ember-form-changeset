import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

interface <%= classifiedModuleName %>Args extends BaseFormArgs {} 

export default class <%= classifiedModuleName %> extends BaseForm<<%= classifiedModuleName %>Args> {
    constructor(owner: unknown, args: <%= classifiedModuleName %>Args) {
      super(
        owner,
        args
      );
    }
}

