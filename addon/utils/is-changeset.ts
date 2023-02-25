export function isChangeset(obj?: InstanceType<any>) {
  if (!obj) {
    return false;
  }

  return obj['__changeset__'] !== undefined;
}
