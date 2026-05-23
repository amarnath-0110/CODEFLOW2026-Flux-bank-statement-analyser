import type { Size } from '../../../../../utils/size.js';
export declare function setBitmapCacheItem(file: Blob, data: {
    size: Size;
    canvas: HTMLCanvasElement | null;
}): void;
export declare function getBitmapCacheItem(file: Blob): {
    size: Size;
    canvas: HTMLCanvasElement | null;
} | undefined;
