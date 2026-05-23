import type { FilePondFileEntry, FilePondDirectoryEntry, DynamicLocale } from '../types/index.js';
/** Stores test results locally */
export declare function createTest(test: () => boolean, requireBrowser?: boolean): () => boolean;
/** Tests if value is null */
export declare function isNull(value: unknown): value is null;
/** Tests if value is undefined */
export declare function isUndefined(value: unknown): value is undefined;
/** Tests if value is null or undefined */
export declare function isNullOrUndefined(value: unknown): value is null | undefined;
/** Tests if value is a string */
export declare function isString(value: unknown): value is string;
/** Tests if value is a number */
export declare function isNumber(value: unknown): value is number;
/** Tests if value is boolean */
export declare function isBoolean(value: unknown): value is boolean;
/** Tests if value is function */
export declare function isFunction(value: unknown): value is Function;
/** Tests if value is HTML element */
export declare function isElement(value: unknown): value is HTMLElement;
export declare function isURL(value: string | URL): value is URL;
export declare function isRegExp(value: unknown): value is RegExp;
export declare function isPromise(value: unknown): value is Promise<unknown>;
export declare function isObjectLiteral(value: unknown): value is {
    [key: string]: any;
};
/** Tests if value an object and not an array, string, or number */
export declare function isObject(value: unknown): value is object;
/** Tests if value is an object or an array */
export declare function isObjectOrArray(value: unknown): value is object;
export declare function isArray<T>(value: unknown): value is T[];
export declare function isDataURL(value: unknown): value is string;
export declare function isCanvas(value: unknown): value is HTMLCanvasElement;
export declare function isBlobOrFile(value: unknown): value is Blob;
export declare function isBlob(value: unknown): value is Blob;
export declare function isFile(value: unknown): value is File;
export declare function isDataTransfer(value: unknown): value is DataTransfer;
/** Tests if mimetype includes /video/ */
export declare function isVideoFile(value: unknown): value is File;
/** Tests if mimetype includes /image/ */
export declare function isImageFile(value: unknown): value is File;
/** Tests if mimetype includes /audio/ */
export declare function isAudioFile(value: unknown): value is File;
export declare function isDataTransferEntry(value: any): value is FilePondFileEntry;
export declare function isLocaleUnitKey(value: any): value is string;
export declare function isLocaleTemplate(value: any): value is DynamicLocale;
export declare function isFileEntry(value: unknown): value is FilePondFileEntry;
export declare function isDirectoryEntry(value: unknown): value is FilePondDirectoryEntry;
export declare function isFileSystemDirectoryEntry(value: any): value is FileSystemDirectoryEntry;
export declare function isFileSystemFileEntry(value: any): value is FileSystemFileEntry;
export declare function isGroupEntry(value: any): value is FilePondDirectoryEntry;
/** Tests if current environment is a browser */
export declare function isBrowser(): boolean;
/** Tests if current environment is Safari browser */
export declare const isSafari: () => boolean;
/** Tests if current environment is Firefox browser */
export declare const isFirefox: () => boolean;
/** Tests if current environment is iOS */
export declare const isIOS: () => boolean;
/** Tests if current environment is Mac */
export declare const isMac: () => boolean;
