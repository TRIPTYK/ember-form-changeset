import { BufferedChangeset } from 'ember-changeset/types';
export interface TypedBufferedChangeset<T extends Record<string, any>> extends BufferedChangeset {
    get(key: keyof T): any;
    set(key: keyof T, value: any): void;
}
