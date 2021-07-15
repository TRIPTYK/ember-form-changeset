import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';
export interface BaseValidationFormInterface {
    saveFunction: ((changeset: BufferedChangeset) => Promise<any>) | null;
    mode: 'update' | 'create';
    entity: any;
}
export default class BaseFormComponent<T extends Record<string, any>> extends Component<BaseValidationFormInterface & T> {
    changeset: BufferedChangeset;
    DTO: T;
    constructor(owner: unknown, args: BaseValidationFormInterface & T, originalDTO: Record<string, any> & T, validator: Record<string, any>);
    submit(e: Event): Promise<void>;
}
