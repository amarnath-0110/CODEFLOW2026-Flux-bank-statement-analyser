import type { Rect } from './rect.js';
import type { Bounds } from './bounds.js';
/** A size */
export interface Size {
    width: number;
    height: number;
}
/** Creates a new size */
export declare function sizeCreate(width?: number, height?: number): Size;
/** Turns a rectangle into a size */
export declare function sizeFromRect(rect: Rect): Size;
/** Turns a bounds into a size */
export declare function sizeFromBounds(bounds: Bounds): Size;
/** Multiplies passed size by factor */
export declare function sizeMultiply(target: Size, factor: number): Size;
export declare function sizeEqual(a: Size, b: Size): boolean;
/** Updates size with values */
export declare function sizeUpdate(target: Size, width: number, height: number): Size;
/** Updates target size with property values of source size */
export declare function sizeUpdateWithSize(target: Size, source: Size): Size;
/** Returns false if size defines zero pixels, either width or height is 0 */
export declare function sizeIsEmpty(size: Size): boolean;
