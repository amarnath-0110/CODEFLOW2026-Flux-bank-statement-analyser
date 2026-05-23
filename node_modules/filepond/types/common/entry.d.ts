import type { FilePondEntry } from '../types/index.js';
import type { ExtensionState } from '../extensions/common/createExtension.js';
type MimeTypeMap = {
    [extension: string]: string;
};
interface GetFilenameOptions {
    getBasename: (entry: FilePondEntry, blob: Blob) => string;
    getExtension: (entry: FilePondEntry, blob: Blob, options: {
        mimeTypeMap: MimeTypeMap;
    }) => string | undefined;
    mimeTypeMap: MimeTypeMap;
}
export declare function getBasename(entry: FilePondEntry, blob: Blob): string;
export declare function getExtension(entry: FilePondEntry, blob: Blob, options: {
    mimeTypeMap: MimeTypeMap;
}): string | undefined;
export declare function getFilename(entry: FilePondEntry, blob: Blob, options: GetFilenameOptions): string;
export declare function getExtensionStatusItems(extensions: ExtensionState[]): (import("../types/index.js").ExtensionStatus | undefined)[];
export declare function getExtensionStateByStatusCode(extensions: ExtensionState[], codes: (null | string)[]): import("../types/index.js").ExtensionStatus | {
    progress: null;
} | null | undefined;
/** Tests if one of the extensions is in an error state */
export declare function isEntryInErrorState(entry: FilePondEntry): boolean;
export {};
