export interface ListSizeValidatorOptions {
    /** Min total file size in bytes or in natural file size. Defaults to `0` */
    minListSize?: number | string;
    /** Max total file size in bytes or in natural file size. Defaults to `Infinity` */
    maxListSize?: number | string;
    /** The natural file size format to use, defaults to `'mega'` if no natural file size supplied for `minSize` or `maxSize` */
    byteUnits?: 'mega' | 'mebi';
}
export declare const ListSizeValidator: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        ListSizeValidator: ListSizeValidatorOptions;
    }
    interface DefineFilePondOptions {
        ListSizeValidator?: ListSizeValidatorOptions;
    }
}
