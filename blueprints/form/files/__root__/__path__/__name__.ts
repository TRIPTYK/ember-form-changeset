import { BaseValidationFormInterface, BaseFormComponent } from 'ember-form-changeset-validations';

interface <%= classifiedModuleName %>Args extends BaseValidationFormInterface {} 
export interface <%= classifiedModuleName %>DTO {}

export default class <%= classifiedModuleName %> extends BaseFormComponent<<%= classifiedModuleName %>Args> {
    constructor(owner: unknown, args: <%= classifiedModuleName %>Args) {
        super(
          owner,
          args,
          {
            
          },
          {
            
          }
        );
      }
}

