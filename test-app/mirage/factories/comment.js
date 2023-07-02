import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  content(i) {
    return `Content ${i}`;
  },
});
