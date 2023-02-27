# ember-form-changeset-validations

This addon helps creating form components logic based on [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations).


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```
ember install ember-form-changeset-validations
```


Features
------------------------------------------------------------------------------

### Form generation
Form generation with `ember generate form <formName>`.
- It will generate integration tests for the form with 2 scenarios : 
    - Create : creation of the entity
    - Edit : edition of an existing entity
- You can add --ask parameter to prompt fields to add to the template

3 base types are available : 
    - text
    - select
    - textarea

#### Custom fields types & overrides

You can create your own types for the generator by using a .formconfig.js with the same structure specified in [this file](https://github.com/TRIPTYK/ember-form-changeset-validations/blob/develop/blueprints/form/default-config.js).   

### Base Form Component

```ts
import BaseForm, {
  BaseFormArgs,
} from 'ember-form-changeset-validations/components/form';

export interface MyChangesetDTO {
    name: string;
}

interface MyComponentArgs extends BaseFormArgs<MyChangesetDTO> {}

export default class MyFormComponent extends BaseForm<MyComponentArgs,MyChangesetDTO> {
}

```
#### Methods
- rollback
    - Rollback the changeset
- submit
    - Validates the changeset and triggers @saveFunction

### Typescript types
- Basic Typescript types for ember-changeset-validations

In tsconfig.json : 

```json
"ember-changeset-validations/*": [
    "node_modules/ember-form-changeset-validations/types/ember-changeset-validations/*"
],
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
changeset.set("name","blah"); // check prop name

// if unknown key, you can just specify the return type to keep type checking
changeset.get<string>("unknown.key");
changeset.set<string>("name","blah"); // check set prop type is string
changeset.set<string>("name", 0); // Error
```

### Nested changeset utilities

Sometimes, you may want to nest changesets into a big changeset. You can manipulate all these changesets like if they were only one changeset.

This library exports the following functions:

* validate(changeset)
* execute(changeset)
* isDirty(changeset)
* isValid(changeset)
* data(changeset)
* errors(changeset)

#### Functions

##### validate(changeset)

This function validates a changeset and all of its nested changesets. It returns a promise that resolves when validation is complete. It accepts one argument:

`changeset` - a changeset or a nested changeset to validate

##### execute(changeset)

This function executes a changeset and all of its nested changesets. It returns a promise that resolves when execution is complete. It accepts one argument:

`changeset` - a changeset or a nested changeset to execute

##### isDirty(changeset)

This function checks whether a changeset or any of its nested changesets have any pending changes. It returns a boolean value. It accepts one argument:

`changeset` - a changeset or a nested changeset to check

##### isValid(changeset)

This function checks whether a changeset or any of its nested changesets are valid. It returns a boolean value. It accepts one argument:

`changeset` - a changeset or a nested changeset to check

##### data(changeset)

This function returns the data for a changeset or any of its nested changesets. It returns an object containing the changeset data. It accepts one argument:

`changeset` - a changeset or a nested changeset to get the data from

##### errors(changeset)

This function returns the errors for a changeset or any of its nested changesets. It returns an object containing the changeset errors. It accepts one argument:

`changeset` - a changeset or a nested changeset to get the errors from