export interface ConsoleViewOptions {
    /** Clear console before logging, defaults to `false` */
    clearBeforeLog?: boolean;
    /** Debounce the log call from the 'updateEntries' event, defaults to `true` */
    debounce?: boolean;
}
export declare const ConsoleView: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        ConsoleView: ConsoleViewOptions;
    }
    interface DefineFilePondOptions {
        ConsoleView?: ConsoleViewOptions;
    }
}
