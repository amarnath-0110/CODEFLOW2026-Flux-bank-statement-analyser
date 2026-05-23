export interface GenerateFileOptions {
    name?: string;
    type?: string;
    content?: string;
    lastModified?: number;
}
export interface GenerateImageOptions extends GenerateFileOptions {
    width?: number;
    height?: number;
    quality?: number;
    fillStyle?: string | CanvasGradient | CanvasPattern;
}
export interface GenerateVideoOptions extends GenerateFileOptions {
    width?: number;
    height?: number;
    fps?: number;
    frames?: number;
    fillStyle?: string | CanvasGradient | CanvasPattern;
}
export interface TimeInfo {
    ms: number;
    step: number;
}
/**
 * Generates a mock file for testing and development purposes.
 *
 * Creates either a document or image file based on the name and type. Useful for testing FilePond
 * functionality without needing real files.
 */
export declare function generateFile(options?: GenerateFileOptions): Promise<File | null>;
/**
 * Generates a mock image file with a colorful gradient and type information overlay.
 */
export declare function generateImage(options?: GenerateImageOptions): Promise<File>;
/**
 * Generates a mock video file with silver frames and type information overlay.
 */
export declare function generateVideo(options?: GenerateVideoOptions): Promise<File | null>;
/**
 * Generates a mock text document for testing purposes.
 *
 * Creates a simple text file with customizable content. Useful for testing document handling and
 * processing functionality.
 */
export declare function generateDocument(options?: GenerateFileOptions): Promise<File | undefined>;
/**
 * Returns timing information for performance measurement and debugging.
 *
 * Tracks elapsed time since first call and step time between calls. Useful for measuring
 * performance of operations during development.
 */
export declare function now(): TimeInfo;
