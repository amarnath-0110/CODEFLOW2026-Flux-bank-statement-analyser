import type { FilePondEntry } from '../types/index.js';
export interface BlobLoaderOptions {
    /** Hook that runs when determining the basename for a file. Defaults to `() => 'Untitled'` */
    getBasename?: (entry: FilePondEntry, blob: Blob) => string;
    /** Hook that runs when determining the extension of a file. The default behavior derives the extension from the file mime type. Override this function or use `mimeTypeMap` if an extension isn't computed correctly. */
    getExtension?: (entry: FilePondEntry, blob: Blob) => string;
    /** Hook that runs when determining the name of a file. By default combines the result of `getBasename()` and `getExtension()` */
    getFilename?: (entry: FilePondEntry, blob: Blob) => string;
    /**
     * An object with key value pairs describing mime type relation to extension. Defaults to
     * `undefined`, example `{ 'application/ld+json': 'jsonld' }`
     */
    mimeTypeMap?: {
        [key: string]: string;
    };
}
export declare const BlobLoader: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        BlobLoader: BlobLoaderOptions;
    }
    interface DefineFilePondOptions {
        BlobLoader?: BlobLoaderOptions;
    }
}
