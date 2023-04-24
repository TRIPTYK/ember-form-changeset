import { Changeset } from 'ember-form-changeset-validations/types/typed-changeset';
import { ConditionalPick, IterableElement, StringKeyOf } from 'type-fest';
export type ArrayKeys<DTO> = StringKeyOf<ConditionalPick<DTO, any[]>>;
export declare class ExtendedChangeset<T extends Record<string, any>> implements Changeset<T> {
    private changeset;
    constructor(obj: T, map?: Record<StringKeyOf<T>, unknown>, options?: object);
    get validationMap(): {
        [s: string]: any;
    };
    get changes(): Record<string, any>[];
    get errors(): Record<string, unknown>[];
    get isValid(): boolean;
    get isPristine(): boolean;
    get isInvalid(): boolean;
    get isDirty(): boolean;
    execute(): void;
    unexecute(): void;
    save(): Promise<void>;
    rollback(): void;
    rollbackInvalid(key: string | void): void;
    rollbackProperty(key: string): void;
    validate(...validationKeys: `${Extract<keyof T, string | number>}`[]): Promise<unknown>;
    addError(key: string, error: unknown): void;
    pushErrors(key: string, ...newErrors: unknown[]): void;
    isValidating(key?: string): boolean;
    get data(): T;
    get<K extends StringKeyOf<T>>(key: K): T[K];
    set<K extends StringKeyOf<T>>(key: K, value: T[K]): void;
    pushInArray<K extends ArrayKeys<T>, V extends IterableElement<T[K]>>(key: K, value: V): V;
    removeFromArray<K extends ArrayKeys<T>, V extends IterableElement<T[K]>>(key: K, value: V): void;
    removeFromArrayIndex<K extends ArrayKeys<T>>(key: K, index: number): void;
}
//# sourceMappingURL=extended-changeset.d.ts.map