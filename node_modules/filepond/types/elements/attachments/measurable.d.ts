import type { Bounds } from '../../utils/bounds.js';
export declare const VIEWPORT_MARGIN = 100;
/** Measure the position and size of an html element. */
export declare function measurable(options?: {
    disabled?: boolean;
    onmeasure?: (bounds: Bounds) => void;
}): {
    (element: HTMLElement): () => void;
};
