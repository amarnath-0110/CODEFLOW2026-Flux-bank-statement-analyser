export interface ClipboardSourceOptions {
    /** Receives ClipboardEvent can then determine if it should be handled. Defaults to `() => true` */
    shouldHandlePaste: (e: ClipboardEvent) => boolean;
}
export declare const ClipboardSource: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        ClipboardSource: ClipboardSourceOptions;
    }
    interface DefineFilePondOptions {
        ClipboardSource?: ClipboardSourceOptions;
    }
}
