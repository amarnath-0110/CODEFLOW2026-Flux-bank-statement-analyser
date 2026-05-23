import type { DragEventDetail } from './dragarea.js';
export interface DropEventDetail extends DragEventDetail {
    dataTransfer: DataTransfer;
}
interface DropAreaOptions {
    disabled?: boolean;
    ondragitem?: (obj: DropEventDetail) => void;
    ondragitemin?: (obj: DropEventDetail) => void;
    ondragitemout?: (obj: DropEventDetail) => void;
    ondropitem?: (obj: DropEventDetail) => void;
}
/** Target element can handle dropping of items */
export declare function droparea(options?: DropAreaOptions): (element: HTMLElement) => () => void;
export {};
