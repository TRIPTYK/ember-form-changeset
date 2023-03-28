# ember-form-changeset-validations

This addon helps creating form components logic based on [ember-changeset](https://github.com/poteto/ember-changeset).


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


### Typescript types

- Fully typed changesets

In tsconfig.json : 

```json
"ember-changeset-validations/*": [
    "node_modules/ember-form-changeset-validations/types/ember-changeset-validations/*"
],
"ember-changeset-validations": [
    "node_modules/ember-form-changeset-validations/types/ember-changeset-validations"
],
```

### CreateChangeset

```ts
createChangeset<C extends Changeset>(changesetClass: Class<C>, initialData: C['data'], validationMap: Record<StringKeyOf<C['data']>, unknown>): ProxyWrappedChangeset<C>
```

Creates a new `Changeset` object and returns a `Proxy` object that wraps the `Changeset` object, allowing you to get and set its properties dynamically.

### Parameters

- `changesetClass: Class<C>`: The `Changeset` class to instantiate. This should be a subclass of the `Changeset` interface defined in your codebase.
- `initialData: C['data']`: The initial data for the `Changeset` object. This should be an object that matches the shape of the `data` property in the `Changeset` interface.
- `validationMap: Record<StringKeyOf<C['data']>, unknown>`: An object that maps the keys of the `data` property in the `Changeset` interface to validation functions. The validation functions should take a single argument (the value being validated) and return `true` if the value is valid, or an error message if the value is invalid.

### Returns

A `ProxyWrappedChangeset<C>` object, which is a `Proxy` object that wraps the `Changeset` object and allows you to get and set its properties dynamically.


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

![/static/flow.png](/static/flow.png)