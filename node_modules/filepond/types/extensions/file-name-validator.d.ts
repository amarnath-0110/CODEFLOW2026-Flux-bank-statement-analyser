import { type CreateValidatorExtensionOptions } from './common/createValidatorExtension.js';
export interface FileNameValidatorOptions extends CreateValidatorExtensionOptions {
    /** A function that tests if the name is valid */
    test: (name: string) => boolean;
}
export declare const FileNameValidator: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        FileNameValidator: FileNameValidatorOptions;
    }
    interface DefineFilePondOptions {
        FileNameValidator?: FileNameValidatorOptions;
    }
}
