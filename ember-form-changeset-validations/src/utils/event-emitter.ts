import { StringKeyOf } from 'type-fest';
import { ImmerChangeset } from '..';

export type OnSetCallback<
  T extends ImmerChangeset,
  DTO extends Record<string, any>,
> = (key: StringKeyOf<DTO>, value: unknown, changeset: T) => void;

interface EventMap<T extends ImmerChangeset, DTO extends Record<string, any>> {
  set: Map<Symbol, OnSetCallback<T, DTO>>;
}

type MapValue<
  T extends ImmerChangeset,
  DTO extends Record<string, any>,
  K extends StringKeyOf<EventMap<T, DTO>>,
> = EventMap<T, DTO>[K] extends Map<Symbol, infer Callback> ? Callback : never;

export class ChangesetEventEmitter<
  T extends ImmerChangeset,
  DTO extends Record<string, any>,
> {
  private events: EventMap<T, DTO> = {
    set: new Map(),
  };

  public constructor(private changeset: T) {}

  public emitOnSet<K extends StringKeyOf<DTO>>(key: K, value: DTO[K]) {
    this.events['set'].forEach((callback) =>
      callback(key, value, this.changeset),
    );
  }

  on<K extends StringKeyOf<EventMap<T, DTO>>>(
    event: K,
    callback: MapValue<T, DTO, K>,
  ): Symbol {
    const uniqueId = Symbol();
    this.events[event].set(uniqueId, callback as never);
    return uniqueId;
  }

  off<K extends StringKeyOf<EventMap<T, DTO>>>(
    event: K,
    uniqueId: Symbol,
  ): void {
    this.events[event].delete(uniqueId);
  }
}
