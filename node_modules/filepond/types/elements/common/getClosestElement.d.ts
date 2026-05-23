import type { Vector } from '../../utils/vector.js';
import type { Bounds } from '../../utils/bounds.js';
/** Search a list of elements around a position within bounds */
export declare function getClosestElement(elements: HTMLElement[], position: Vector, options: {
    cacheClientRectangles?: number;
    searchBounds?: Bounds;
}): HTMLElement | undefined;
