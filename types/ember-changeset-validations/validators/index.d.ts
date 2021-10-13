import { ValidationResult } from 'ember-changeset/types';

declare module 'ember-changeset-validations/validators' {
  export function validateLength(
    obj: Record<string, unknown>
  ): ValidationResult | Promise<ValidationResult>;
  export function validateNumber(
    obj: Record<string, unknown>
  ): ValidationResult | Promise<ValidationResult>;
  export function validatePresence(
    obj: Record<string, unknown> | boolean
  ): ValidationResult | Promise<ValidationResult>;
  export function validateInclusion(
    obj: Record<string, unknown>
  ): ValidationResult | Promise<ValidationResult>;
  export function validateFormat(
    obj: Record<string, unknown>
  ): ValidationResult | Promise<ValidationResult>;
}
