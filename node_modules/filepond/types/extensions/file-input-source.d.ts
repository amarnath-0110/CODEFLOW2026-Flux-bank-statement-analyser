export interface FileInputSourceOptions {
    /** An HTMLInputElement or a QueryString selector */
    element?: HTMLInputElement | string;
    /** Should we reset the input every time a `FileList` is added */
    resetFilesOnAdd?: boolean;
    /** Where to add new files, defaults to index `0` */
    insertIndex?: number;
}
export declare const FileInputSource: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        FileInputSource: FileInputSourceOptions;
    }
    interface DefineFilePondOptions {
        FileInputSource?: FileInputSourceOptions;
    }
}
