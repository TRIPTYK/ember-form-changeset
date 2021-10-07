import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  username(i) {
    return `User ${i}`;
  },
});
