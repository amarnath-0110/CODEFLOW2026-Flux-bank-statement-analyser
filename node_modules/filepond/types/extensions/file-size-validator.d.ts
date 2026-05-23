import { type CreateValidatorExtensionOptions } from './common/createValidatorExtension.js';
export interface FileSizeValidatorOptions extends CreateValidatorExtensionOptions {
    /** Min file size in bytes or a natural file size. Defaults to `0` */
    minSize?: number | string;
    /** Max file size in bytes or a natural file size. Defaults to `Infinity` */
    maxSize?: number | string;
    /** The natural file size format to use, defaults to `'mega'` if no natural file size supplied for `minSize` or `maxSize` */
    byteUnits?: 'mega' | 'mebi';
}
export declare const FileSizeValidator: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        FileSizeValidator: FileSizeValidatorOptions;
    }
    interface DefineFilePondOptions {
        FileSizeValidator?: FileSizeValidatorOptions;
    }
}
