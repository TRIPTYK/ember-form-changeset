// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isChangeset(obj?: InstanceType<any>) {
  if (!obj) {
    return false;
  }
  return obj.constructor.name === 'EmberChangeset';
}
