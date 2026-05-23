import type { Rect } from '../../../utils/rect.js';
import type { Size } from '../../../utils/size.js';
import type { Vector } from '../../../utils/vector.js';
export interface SpringElementContext {
    /** If the element is ready to be positioned, this is true if it has a parent rect */
    isReady: boolean;
    targetSize: Size | undefined;
    currentSize: Size | null;
    /** The client rectangle of the element */
    currentRect: Rect | null;
    currentRectCenter: Vector | null;
    currentScale: number;
    /** The total number of child springs */
    childSpringCount: number;
    /** The total number of child springs that are ready */
    childSpringReadyCount: number;
    /** A reference to the parent spring element */
    parent: SpringElementContext | null;
}
export declare function setSpringElementTreeContext(value: SpringElementContext): void;
export declare function getSpringElementTreeContext(): SpringElementContext;
export declare function hasSpringElementTreeContext(): boolean;
