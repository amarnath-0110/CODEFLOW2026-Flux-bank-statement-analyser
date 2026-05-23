export interface ListCountValidatorOptions {
    /** Min total files. Defaults to `0` */
    minFiles?: number | string;
    /** Max total file. Defaults to `Infinity` */
    maxFiles?: number | string;
}
export declare const ListCountValidator: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        ListCountValidator: ListCountValidatorOptions;
    }
    interface DefineFilePondOptions {
        ListCountValidator?: ListCountValidatorOptions;
    }
}
