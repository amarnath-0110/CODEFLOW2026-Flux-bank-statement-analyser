import { FilePondSvelteComponentElement } from '../FilePondSvelteComponent/index.svelte.js';
import type { Rect } from '../../utils/rect.js';
export declare class FilePondDropIndicatorElement extends FilePondSvelteComponentElement {
    constructor();
    /** Updates the current location of the drop indicator */
    set indicatorRect(rect: Rect | null);
}
