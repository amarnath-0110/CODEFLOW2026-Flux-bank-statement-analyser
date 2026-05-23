import type { Rect } from './rect.js';
export declare const ORIGIN: Vector;
/** A vector */
export interface Vector {
    x: number;
    y: number;
}
/** Creates a new vector */
export declare function vectorCreate(x?: number, y?: number): Vector;
/** Turns a rectangle into a vector */
export declare function vectorFromRect(rect: Rect): Vector;
/** Returns squared distanced between vectors */
export declare function vectorDistanceSquared(a: Vector, b: Vector): number;
/** Returns squared distanced between vectors */
export declare function vectorLengthSquared(v: Vector): number;
/** Returns square root of distance between vectors */
export declare function vectorDistance(a: Vector, b: Vector): number;
/** Adds vector `b` to vector `a` and returns a new vector */
export declare function vectorAdd(a: Vector, b: Vector): Vector;
/** Subtract vector `b` from vector `a` and returns a new vector */
export declare function vectorSubtract(a: Vector, b: Vector): Vector;
/** Tests if vector `a` and `b` are equal */
export declare function vectorEqual(a: Vector, b: Vector): boolean;
/** Clones vector */
export declare function vectorClone(v: Vector): Vector;
/** Vector dot product */
export declare function vectorDotProduct(a: Vector, b: Vector): number;
/** Is vector `v` pointing from `origin` to `target` */
export declare function isVectorPointingTowardsPoint(v: Vector, origin: Vector, target: Vector): boolean;
/** Returns new normalized vector, or 0,0 if length is 0 */
export declare function vectorNormalize(v: Vector): Vector;
/** Returns vector angle in radians */
export declare function vectorAngle(v: Vector): number;
/** Returns inverted copy of vector */
export declare function vectorInvert(v: Vector): Vector;
/** Returns new elastified vector between `a` and `b` */
export declare function vectorElastify(a: Vector, b: Vector, dist: number): Vector;
