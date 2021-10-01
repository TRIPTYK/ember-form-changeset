import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { getProperties } from '@ember/object';
import { BufferedChangeset } from 'ember-changeset/types';
import { TypedBufferedChangeset } from '../types/typed-changeset';

export interface BaseValidationFormInterface {
  // eslint-disable-next-line no-unused-vars
  saveFunction: ((changeset: BufferedChangeset) => Promise<any>) | null;
  mode: 'update' | 'create';
  entity: any;
}

// eslint-disable-next-line no-unused-vars
type AnyRecord<T> = { [P in keyof T]: any };
// eslint-disable-next-line no-unused-vars
type ValidatorRecord<T> = { [P in keyof T]?: Function[] };

export class BaseFormComponent<
  T extends BaseValidationFormInterface,
  K extends Record<string, any> = {}
> extends Component<T> {
  @tracked changeset: TypedBufferedChangeset<K>;
  @tracked DTO: K;

  public constructor(
    owner: unknown,
    args: T,
    originalDTO: AnyRecord<K> & { id?: number | string },
    validator: ValidatorRecord<K>
  ) {
    super(owner, args);

    if (args.mode === 'update') {
      this.DTO = {
        ...originalDTO,
        ...(args.entity.save
          ? getProperties(
              args.entity,
              Object.keys(originalDTO)
                .filter((o) => args.entity.get(o) !== undefined) // remove undefined keys
                .concat(['id'])
            )
          : args.entity),
      };
    } else {
      this.DTO = originalDTO;
    }
    this.changeset = Changeset(
      this.DTO,
      lookupValidator(validator),
      validator
    ) as TypedBufferedChangeset<K>;
  }

  @action
  async submit(e: Event) {
    e?.preventDefault();
    await this.changeset.validate();

    if (this.changeset.isValid) {
      await this.args.saveFunction?.(this.changeset);
    }
  }
}
