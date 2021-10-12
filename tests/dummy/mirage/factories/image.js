import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `${i}.png`;
  },
  url() {
    return `/grumpy.jpg`;
  },
});
