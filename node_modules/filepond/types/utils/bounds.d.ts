import type { Rect } from './rect.js';
/** Element bounds */
export interface Bounds {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
/** Creates a new bounds object */
export declare function boundsCreate(top?: number, right?: number, bottom?: number, left?: number): Bounds;
/** Creates a new bounds object from a rect */
export declare function boundsFromRect(rect: Rect): Bounds;
export declare function boundsFromRects(...rects: Rect[]): Bounds;
/** Updates target bounds with values */
export declare function boundsUpdate(target: Bounds, top: number, right: number, bottom: number, left: number): Bounds;
/** Updates target bounds with property values of source bounds */
export declare function boundsUpdateWithBounds(target: Bounds, source: Bounds): Bounds;
/** Tests if a is equal to b */
export declare function boundsEqual(a: Bounds, b: Bounds): boolean;
/** Tests if a is outside of b */
export declare function boundsOutsideBounds(a: Bounds, b: Bounds): boolean;
