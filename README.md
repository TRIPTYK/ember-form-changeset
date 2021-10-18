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

### Form generation
Form generation with `ember generate form <formName>`.
- You can add --ask parameter to prompt fields to add to the template

### Base Form Component

```ts
import { BaseForm } from "ember-changeset-validations";

export MyChangesetDTO {
    name: string;
}

class MyFormComponent extends BaseForm<MyChangesetDTO> {}
```

### Typescript types
- Basic Typescript types for ember-changeset-validations
```json
"ember-changeset-validations": [
    "node_modules/ember-form-changeset-validations/types/ember-changeset-validations"
],
```
- Typed changeset interface
```ts
import { TypedBufferedChangeset } from "ember-changeset-validations";
// ...
const changeset = Changeset({}) as TypedBufferedChangeset<{
    name : string;
}>;

changeset.get("name"); // check prop name

// if unknown key, you can just specify the return type to keep type checking
changeset.get<string>("unknown.key"):
```


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
