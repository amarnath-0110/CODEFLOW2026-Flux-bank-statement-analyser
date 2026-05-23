import { type ValidatorExtensionOptions } from './common/createValidatorExtension.js';
export interface FileExtensionValidatorOptions extends ValidatorExtensionOptions {
    /** An array or string of case-insensitive filename extensions, starting with a period character, for example `.png, .jpg`, or `['.png', '.jpg']` */
    accept?: string | string[];
    /** Formats the extensions for presentation in a validation message */
    format?: (mimeTypes: string[]) => string;
}
export declare const FileExtensionValidator: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        FileExtensionValidator: FileExtensionValidatorOptions;
    }
    interface DefineFilePondOptions {
        FileExtensionValidator?: FileExtensionValidatorOptions;
    }
}
