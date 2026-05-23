import type { Size } from './size.js';
/**
 * Returns size in width/height of media file or `null` if is not a media file the browser can
 * handle
 */
export declare function getMediaSize(file: File): Promise<Size | null>;
/** Returns size in width/height of an image file */
export declare function getImageSize(file: Blob, options?: {
    bytesToRead?: number;
}): Promise<Size | null>;
export declare function getImageSizeWithElement(file: Blob): Promise<Size>;
/** Returns size in width/height of a video file */
export declare function getVideoSize(file: Blob, options?: {
    bytesToRead?: number;
}): Promise<Size | null>;
/** Returns size in width/height of video file */
export declare function getVideoSizeWithElement(file: Blob): Promise<Size>;
