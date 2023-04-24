import { Changeset } from 'ember-form-changeset-validations';
import { Promisable } from 'type-fest';
export type ValidationError = {
    path: string;
    value: unknown;
    originalValue: unknown;
};
export type ValidationFunction<T extends Record<string, unknown>> = (data: T) => Promisable<ValidationError[]>;
interface Change {
    key: string;
    value: unknown;
}
export declare class ImmerChangeset<T extends Record<string, any> = Record<string, any>> implements Changeset<T> {
    data: T;
    private draftData;
    private innerErrors;
    private patches;
    private inversePatches;
    get changes(): Change[];
    get errors(): ValidationError[];
    get isValid(): boolean;
    get isPristine(): boolean;
    get isInvalid(): boolean;
    get isDirty(): boolean;
    private normalizedPatches;
    constructor(data: T);
    execute(): void;
    unexecute(): void;
    save(): Promisable<void>;
    rollback(): void;
    private resetPatches;
    rollbackProperty(property: string): void;
    addError(key: string, error: ValidationError): void;
    removeError(key: string): void;
    isValidating(): boolean;
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    validate(validation: ValidationFunction<T>): Promise<void>;
}
export {};
//# sourceMappingURL=immer-changeset.d.ts.map