import { type ValidatorExtensionOptions } from './common/createValidatorExtension.js';
export interface FileMimeTypeValidatorOptions extends ValidatorExtensionOptions {
    /** An array of accepted file mime types, also accepts the wildcard character for example `['image/*']` */
    accept?: string | (string | RegExp)[];
    /** Formats the mime types for presentation in a validation message. By default will use the uppercased last part of the mime types joined with ',' */
    format?: (mimeTypes: string[]) => string;
}
export declare const FileMimeTypeValidator: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        FileMimeTypeValidator: FileMimeTypeValidatorOptions;
    }
    interface DefineFilePondOptions {
        FileMimeTypeValidator?: FileMimeTypeValidatorOptions;
    }
}
