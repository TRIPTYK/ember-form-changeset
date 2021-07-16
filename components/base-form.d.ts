import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';
import { TypedBufferedChangeset } from '../types/typed-changeset';
export interface BaseValidationFormInterface {
    saveFunction: ((changeset: BufferedChangeset) => Promise<any>) | null;
    mode: 'update' | 'create';
    entity: any;
}
declare type AnyRecord<T> = {
    [P in keyof T]: any;
};
declare type ValidatorRecord<T> = {
    [P in keyof T]?: Function[];
};
export declare class BaseFormComponent<T extends BaseValidationFormInterface, K extends Record<string, any> = {}> extends Component<T> {
    changeset: TypedBufferedChangeset<K>;
    DTO: K;
    constructor(owner: unknown, args: T, originalDTO: AnyRecord<K>, validator: ValidatorRecord<K>);
    updateValue(e: any): Promise<void>;
    submit(e: Event): Promise<void>;
}
export {};
