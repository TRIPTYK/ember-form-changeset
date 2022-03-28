import {
  validateLength,
  validatePresence,
} from 'ember-changeset-validations/validators';
import { ArticlesDTO } from '../../pods/components/forms/articles/component';

export default {
  title: [
    validateLength({
      min: 5,
    }),
  ],
  description: [
    validatePresence(true),
    validateLength({
      min: 10,
    }),
  ],
  comments: [
    validateLength({
      min: 1,
    }),
  ],
  image: [validatePresence(true)],
} as Record<keyof ArticlesDTO, unknown[]>;
