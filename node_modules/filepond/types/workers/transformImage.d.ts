import type { Rect } from '../utils/rect.js';
/** Converts the passed file into a scaled image bitmap in a separate thread */
export declare function transformImage(file: Blob, origin: Rect | null, options: ImageBitmapOptions | null, done: (err?: string | null, content?: any, transferList?: any[]) => void): void;
export declare namespace transformImage {
    var fileName: string;
}
