// @ts-ignore
import { EmberChangeset } from 'ember-changeset';
import { ValidatorAction, ValidatorMap } from 'ember-changeset/types';

export type Config = {
  skipValidate?: boolean;
  changesetKeys?: string[];
};

export class CustomChangeset extends EmberChangeset {
  constructor(
    obj: object,
    validateFn?: ValidatorAction,
    validationMap?: ValidatorMap | null | undefined,
    options?: Config
  ) {
    super(obj, validateFn, validationMap, options);
  }
}
