import { type Bounds } from '../../utils/bounds.js';
import { type Vector } from '../../utils/vector.js';
/** Gets the target index for a Drag interaction */
export declare function getDragTargetIndex(element: HTMLElement, viewPosition: Vector, vector: Vector, options: {
    cacheClientRectangles?: number;
    searchBounds?: Bounds;
}): number;
export declare function getDropTargetIndex(root: HTMLElement, viewPosition: Vector, vector: Vector, options: {
    cacheClientRectangles?: number;
    searchBounds?: Bounds;
}): number;
