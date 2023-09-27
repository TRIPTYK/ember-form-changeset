# Ember-immer-changeset

[![CI](https://github.com/TRIPTYK/ember-immer-changeset/actions/workflows/ci.yml/badge.svg)](https://github.com/TRIPTYK/ember-immer-changeset/actions/workflows/ci.yml)
[![Ember Observer Score](https://emberobserver.com/badges/ember-immer-changeset.svg)](https://emberobserver.com/addons/ember-immer-changeset)
[![npm version](https://badge.fury.io/js/ember-immer-changeset.svg)](https://badge.fury.io/js/ember-immer-changeset)

## Minimum Requirements

- Ember.js v4.4 or above
- Ember CLI v4.4 or above
- Node.js v16 or above

## Installation

```bash
ember install ember-immer-changeset
```

## Documentation

https://triptyk.github.io/ember-immer-changeset/

## Example

```ts
const userData = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 30,
};

const userChangeset = new ImmerChangeset(userData);

// Display the initial user data
console.log('Initial User Data:', userChangeset.data);

// Make changes to the user data using the set method
userChangeset.set('name', 'Jane Doe');
userChangeset.set('age', 31);

// Check if there are changes
console.log('Is Dirty:', userChangeset.isDirty);

// Get the changes made
console.log('Changes:', userChangeset.changes);

await userChangeset.validate((draftData) => {
  userChangeset.removeErrors();
  console.log('Validating:', draftData);
  if (draftData.age < 18) {
    userChangeset.addError({
      originalValue: draftData.age,
      value: 18,
      key: 'age',
    });
  }
});

if (userChangeset.isValid) {
// Apply the changes to the original data
userChangeset.execute();

// Display the updated user data
console.log('Updated User Data:', userChangeset.data);

// Save the changes
userChangeset.save();

console.log('Is Dirty:', userChangeset.isDirty);

// Display the final user data after saving
console.log('User Data after Saving:', userChangeset.data);
}
```