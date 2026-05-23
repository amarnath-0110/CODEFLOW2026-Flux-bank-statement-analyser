export interface DragDropSourceOptions {
    /** Determines if a drag event is handled. Defaults to `() => true` */
    shouldHandleDrop?: (e: DragEvent) => boolean;
}
export declare const DragDropSource: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        DragDropSource: DragDropSourceOptions;
    }
    interface DefineFilePondOptions {
        DragDropSource?: DragDropSourceOptions;
    }
}
