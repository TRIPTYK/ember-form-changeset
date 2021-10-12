/* eslint-disable no-unused-vars */
declare module 'ember-changeset-validations' {
  export default function lookupValidator(validator: Record<string, any>): any;
}

declare module 'ember-changeset-validations/validators' {
  export function validateLength(obj: Record<string, unknown>): void;
  export function validateNumber(obj: Record<string, unknown>): void;
  export function validatePresence(
    obj: Record<string, unknown> | boolean
  ): void;
  export function validateInclusion(obj: Record<string, unknown>): void;
  export function validateFormat(obj: Record<string, unknown>): void;
}
