export interface TextInputStoreOptions {
    /** An HTMLInputElement or a QueryString selector */
    element?: HTMLInputElement | string;
}
export declare const TextInputStore: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        TextInputStore: TextInputStoreOptions;
    }
    interface DefineFilePondOptions {
        TextInputStore?: TextInputStoreOptions;
    }
}
