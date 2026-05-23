import type { Vector } from './vector.js';
import type { Bounds } from './bounds.js';
import type { Size } from './size.js';
/** A rectangle */
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/** Creates a new rectangle */
export declare function rectCreate(x?: number, y?: number, width?: number, height?: number): Rect;
export declare function rectFromBounds(bounds: Bounds): Rect;
/** Updates rectangle A with values */
export declare function rectUpdate(target: Rect, x: number, y: number, width: number, height: number): Rect;
/** Updates target rectangle with property values of source rectangle */
export declare function rectUpdateWithRect(target: Rect, source: Rect): Rect;
/** Updates rectangle A with properties of rectangle B */
export declare function rectEqual(a: Rect, b: Rect): boolean;
export declare function rectCenter(rect: Rect): Vector;
/** Tests if rectangles a and b overlap */
export declare function rectIntersectWithRect(a: Rect, b: Rect): boolean;
export declare function rectGetCorners(rect: Rect): Vector[];
/** Tests if rect contains point */
export declare function rectContainsPoint(r: Rect, v: Vector): boolean;
/** Returns a new scaled rectangle */
export declare function rectScale(rect: Rect, scalar: number, pivot?: Vector): Rect;
/** Returns a new translated rectangle */
export declare function rectTranslate(rect: Rect, translation: Vector): Rect;
/** Returns a new padded rectangle */
export declare function rectPad(rect: Rect, padding: number): Rect;
/** Creates a rectangle inside a given size optionally based on an aspect ratio */
export declare function rectFromSize(size: Size, aspectRatio?: number): Rect;
/** Applies a function to each Rect property and returns a new Rect */
export declare function rectApply(rect: Rect, fn: (value: number) => number): Rect;
