import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  keyForModel(modelName) {
    return modelName;
  },
});
