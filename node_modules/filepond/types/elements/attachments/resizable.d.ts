import { type Size } from '../../utils/size.js';
/** Measure the size of an html element. */
export declare function resizable(options?: {
    onresize?: (size: Size) => void;
}): {
    (element: HTMLElement): () => void;
};
