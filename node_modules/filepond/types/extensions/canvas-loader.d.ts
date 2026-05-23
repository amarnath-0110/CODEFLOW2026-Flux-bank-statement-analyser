import type { FilePondEntry } from '../types/index.js';
export interface CanvasLoaderOptions {
    /** The file mime type. Defaults to `'image/png'` */
    type?: string;
    /**
     * The compression quality when turning the canvas into a file. A value between `0` and `1`, where `1`
     * means maximum quality, but also yields very big files. Not applicable for PNGs. Defaults to
     * `undefined` at which point the default browser value is used.
     */
    quality?: number;
    /** How many of these operations can run in parallel. */
    parallel?: 1;
    /** Hook that runs when determining the basename for a file. Defaults to `() => 'Untitled'` */
    getBasename?: (entry: FilePondEntry, blob: Blob) => string;
    /** Hook that runs when determining the extension of a file. The default behavior derives the extension from the file mime type. Override this function or use `mimeTypeMap` if an extension isn't computed correctly. */
    getExtension?: (entry: FilePondEntry, blob: Blob) => string;
    /** Hook that runs when determining the name of a file. By default combines the result of `getBasename()` and `getExtension()` */
    getFilename?: (entry: FilePondEntry, blob: Blob) => string;
    /**
     * An object with key value pairs describing mime type relation to extension. Defaults to
     * `undefined`, example `{ 'image/vnd.microsoft.icon': 'ico' }`
     */
    mimeTypeMap?: {
        [key: string]: string;
    };
}
export declare const CanvasLoader: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        CanvasLoader: CanvasLoaderOptions;
    }
    interface DefineFilePondOptions {
        CanvasLoader?: CanvasLoaderOptions;
    }
}
