# ember-form-changeset-validations

This repository provides :  

- Full typescript typings.
  - Lighweight and correclty typed changeset interface.
  - Interface for proxied changeset.
- Utils to interact with nested changesets (changesets in changesets).
- 2 types of changesets implementation :
  - ExtendedChangeset: a class encapsulating an [EmberChangeset](https://github.com/poteto/ember-changeset).
  - ImmerChangeset: an implementation using [ImmerJS](https://immerjs.github.io).

## Why not using directly ember changeset library ?

We moved away from direct use of the library for some reasons :

- Bugs using nested data structures (reactivity problems, incorrect behaviors).
- Easier reactivity for bug fixing (obviously).
- Use different validation methods/library.
- Experimentations (ex: ImmerJS changeset).

## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above

## Installation

```
ember install ember-form-changeset-validations
```

## Features

### Typescript types

- Add to tsconfig.json

```json 
"ember-changeset-validations/*": [
    "node_modules/ember-form-changeset-validations/types/ember-changeset-validations/*"
],
"ember-changeset-validations": [
    "node_modules/ember-form-changeset-validations/types/ember-changeset-validations"
],
```

### ExtendedChangeset

A changeset using EmberChangeset internally.

### ImmerChangeset

A changeset using ImmerJS internally.

There are some differences with the ExtendedChangeset :

- Can only be modified by get/set method.
- .data is readonly (frozen)
- Only works with classic JS data types (no ember model or complex classes atm).
- validate() takes a callback that validates and returns errors.

Pseudocode with yup :

```ts
const validationSchema = yup.object();
const changeset = new ImmerChangeset();
changeset.validate(async (draft) => {
    const errors = await validationSchema.validate(draft);
    return errors.map((e) => {
        value: e.value,
        originalValue: e.originalValue,
        path: e.path
    })
});
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

## Notes

![/static/flow.png](/static/flow.png)