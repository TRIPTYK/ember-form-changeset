import { validatePresence } from 'ember-changeset-validations/validators';
import { ImageDTO } from '../../pods/components/forms/articles/component';

export default {
  url: [validatePresence(true)],
  name: [validatePresence(true)],
} as Record<keyof ImageDTO, unknown[]>;
