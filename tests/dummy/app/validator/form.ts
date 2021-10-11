import { validatePresence } from "ember-changeset-validations/validators";

export default {
  text: [validatePresence(true)];
  blblb: [validatePresence(true)];
  lmgrer: [validatePresence(true)]
}