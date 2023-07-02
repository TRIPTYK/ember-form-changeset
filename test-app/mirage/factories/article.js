import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Movie ${i}`;
  },
  description(i) {
    return `Lotem ipsum ${i}`;
  },
});
