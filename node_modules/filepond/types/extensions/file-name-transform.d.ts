import type { FilePondEntry } from '../types/index.js';
import { type CreateTransformExtensionOptions } from './common/createTransformExtension.js';
export interface FileNameTransformOptions extends CreateTransformExtensionOptions {
    /** Action name to use for rename. Defaults to `'renameFile'` */
    actionTransform?: string;
    /** Function to use for sanitizing the user input. */
    sanitizeName?: (fileName: string) => string;
    /** Allows requesting a new filename. */
    renameEntry?: (entry: FilePondEntry, options: {
        basename: string;
        extension: string;
        history: string[];
    }) => Promise<string>;
}
export declare const FileNameTransform: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        FileNameTransform: FileNameTransformOptions;
    }
    interface DefineFilePondOptions {
        FileNameTransform?: FileNameTransformOptions;
    }
}
