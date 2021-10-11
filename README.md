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

ember g form articles --dummy --pods


We bind the method submit inherited from the BaseFormComponent to the form. If the changeset is valid, it will call `this.args.saveFunction` with the changeset as first argument.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
