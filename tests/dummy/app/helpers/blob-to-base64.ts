import { helper } from '@ember/component/helper';

// @ts-expect-error
function isProxy(o: unknown) {
  return typeof o === 'object'
    ? Object.keys(o as Record<string, unknown>).length === 0
    : false;
}

export function blobToBase64([blob]: [Blob] /*, hash*/) {
  return URL.createObjectURL(blob);
}

export default helper(blobToBase64);
