import { ValidationResult } from 'ember-changeset/types';

declare module 'ember-changeset-validations/validators' {
  export function validateConfirmation(options: {
    on?: string;
    allowBlank?: boolean;
    message?: string;
  });
  export function validateLength(options: {
    min?: number;
    max?: number;
    is?: number;
    allowBlank?: boolean;
    message?: string;
  }): ValidationResult | Promise<ValidationResult>;
  export function validateNumber(options: {
    is?: number;
    allowBlank?: boolean;
    integer?: boolean;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    positive?: boolean;
    odd?: boolean;
    even?: boolean;
    multipleOf?: number;
    message?: string;
  }): ValidationResult | Promise<ValidationResult>;
  export function validatePresence(
    presence: boolean
  ): ValidationResult | Promise<ValidationResult>;
  export function validatePresence(options: {
    presence?: boolean;
    ignoreBlank?: boolean;
    on?: string[] | string;
    message?: string;
  }): ValidationResult | Promise<ValidationResult>;
  export function validateDate(options: {
    before?: Date | (() => Date);
    onOrBefore?: Date | (() => Date);
    after?: Date | (() => Date);
    onOrAfter?: Date | (() => Date);
    allowBlank?: boolean;
    precision?:
      | 'year'
      | 'month'
      | 'week'
      | 'day'
      | 'hour'
      | 'minute'
      | 'second';
    format?: string;
    message?: string;
  }): ValidationResult | Promise<ValidationResult>;
  export function validateInclusion(options: {
    list?: string[];
    range?: number[];
    allowBlank?: boolean;
    message?: string;
  }): ValidationResult | Promise<ValidationResult>;
  export function validateFormat(options: {
    allowBlank?: boolean;
    type?: 'email' | 'phone' | 'url';
    regex?: RegExp;
    inverse?: boolean;
    allowNonTld?: boolean;
    minTldLength?: number;
    message?: string;
  }): ValidationResult | Promise<ValidationResult>;
}
