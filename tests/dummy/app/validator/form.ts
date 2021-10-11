import { validatePresence } from 'ember-changeset-validations/validators';

export default {
  yum: validatePresence(true),
};
