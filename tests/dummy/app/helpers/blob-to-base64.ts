import { helper } from '@ember/component/helper';

export function blobToBase64([blob]: [Blob] /*, hash*/) {
  return URL.createObjectURL(blob);
}

export default helper(blobToBase64);
