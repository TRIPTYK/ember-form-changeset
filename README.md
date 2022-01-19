ember-form-changeset-validations
==============================================================================

This addon helps creating form components logic based on [ember-changeset-validations](https://github.com/poteto/ember-changeset-validations).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
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
- It will generate integration tests for the form with 2 scenarios : 
    - Create : creation of the entity
    - Edit : edition of an existing entity
- You can add --ask parameter to prompt fields to add to the template

3 base types are available : 
    - text
    - select
    - textarea

#### Custom fields types & overrides

You can override or generate your own type like in the example below.

```js
// .formconfig.js
module.exports = {
  custom: ['checkbox'],
  overrides: {
    text: (type, name) => `<Custom @type="${type}" @name={{${name}}} />`,
    checkbox: (type, name) => `<Checkbox@type="${type}" @name={{${name}}}  />`,
  },
};
```

### Base Form Component

```ts
import { BaseForm } from "ember-changeset-validations";

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

### Utils
Utilitaries functions to work with POJO changesets.

#### toPojo 
Transforms an ember record or an ember record array to plain changeset.

```ts 
toPojo()<T extends Model>(
  object: T | T[] | ArrayProxy<T> | ObjectProxy<T> | null | undefined,
  store: Store
):
  | Record<string, unknown>
  | (Record<string, unknown> | null | undefined)[]
  | null
  | undefined
```

##### Example

```ts
const article = await this.store.findRecord('article', id, {
      include: 'image',
});
const pojo = toPojo(article, this.store) as ArticleDTO;

// pojoize image relationship
pojo.image = (pojo.image
    ? toPojo(this.store.peekRecord('image', pojo.image as string), this.store)
    : null) as ImageDTO | null;
```

Also works : 

```ts
const article = await this.store.findRecord('article', id, {
      include: 'image',
});
const pojo = toPojo(article, this.store) as ArticleDTO;

// pojoize image relationship
pojo.image = toPojo(article.image, this.store) as ImageDTO;
```

## More examples

See [Dummy App](https://github.com/TRIPTYK/ember-form-changeset-validations/tree/main/tests/dummy)

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
