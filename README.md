ember-form-changeset-validations
==============================================================================

This addon helps creating form components logic based on [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations).




Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-form-changeset-validations
```


Features
------------------------------------------------------------------------------
- Form generation with `ember generate form <formName>`.
- Base abstract class to boilerplate form component creation
- Typescript types for ember-changeset-validation

Usage
------------------------------------------------------------------------------

If you need a component to contain a form, simply use BaseFormComponent instead of ember Component

Example of a login form :

```js
import { validatePresence } from 'ember-changeset-validations/validators';
import {
  BaseFormComponent,
  BaseValidationFormInterface,
} from 'ember-form-changeset-validations';

interface FormsLoginArgs extends BaseValidationFormInterface {}

export interface LoginDTO {
  email: string;
  password: string;
}

export default class FormsLogin extends BaseFormComponent<
  FormsLoginArgs,
  LoginDTO
> {
  constructor(owner: unknown, args: FormsLoginArgs) {
    super(
      owner,
      args,
      {
        email: '',
        password: '',
      },
      {
        email: [validatePresence({ presence: true })],
        password: [validatePresence({ presence: true })],
      }
    );
  }
}
```

```html
<form {{on "submit" this.submit}}>
  <input
    type="text"
    name="email"
    value={{changeset-get this.changeset "email"}}
    {{on "change" this.updateValue}}
  />
  <input
    type="text"
    name="password"
    value={{changeset-get this.changeset "password"}}
    {{on "change" this.updateValue}}
  />
  <button type="submit">Submit</button>
</form>
```

We bind the method submit inherited from the BaseFormComponent to the form. If the changeset is valid, it will call `this.args.saveFunction` with the changeset as first argument.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
