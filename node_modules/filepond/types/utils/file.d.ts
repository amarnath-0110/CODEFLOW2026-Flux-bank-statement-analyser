/** Copies file base properties to an object */
export declare function copyFilePropsToObject(file: File, object: any): void;
export declare function updateFileType(fileOrBlob: File | Blob, newType: string): File | Blob;
export declare function updateFilename(file: File, newName: string): File;
export declare function sanitizeFilename(filename: string): string;
/** Returns extension + preceding dot, `test.txt` returns `.txt` */
export declare function getExtensionFromFilename(filename: unknown): string | undefined;
export declare function getFilenameWithoutExtension(filename: string): string | undefined;
export declare function getExtensionFromMimeType(mimeType: string, typeMap?: {
    [key: string]: string;
}): string | undefined;
export declare function cloneBlob(blob: Blob): Blob;
export declare function cloneFile(file: File): File;
export declare function cloneBlobOrFile(blobOrFile: File | Blob): File | Blob | undefined;
export declare function cloneFileWithOptions(file: File, options: FilePropertyBag): File;
export declare function blobToFile(blob: Blob, name: string, options?: {
    type?: string | undefined;
    lastModified?: number;
}): File;
export declare function blobReadAsArrayBuffer(blob: Blob, options?: {
    slice: number[];
}): Promise<unknown>;
export declare function naturalFileSizeToBytes(str: string | number, options?: {
    locale?: string | string[] | undefined;
}): number;
/** Returns a string representing a natural file size, for example 24 KB */
export declare function bytesToNaturalFileSize(size: number, options?: Intl.NumberFormatOptions & {
    byteUnits?: 'mega' | 'mebi';
    locale?: string | string[] | undefined;
}): string;
export declare function getFormatFromFileSize(size: string | number | undefined): "mega" | "mebi" | undefined;
export declare function getCommonMimeTypeFromFileHeader(bytes: Uint8Array, additionalTypeTests?: ((bytes: Uint8Array) => string | false | undefined)[]): string | undefined;
/** A quick way to get a hash from a file, the hash is calculated from the center of the file */
export declare function getApproximateBlobHash(blobOrFile: Blob | File, hashSize?: number): Promise<string>;
/** Supply accuracy, total bytes in middle of file to compare, with third argument */
export declare function filesAreProbablyEqual(a: Blob | File | undefined, b: Blob | File | undefined, hashSize?: number): Promise<boolean>;
