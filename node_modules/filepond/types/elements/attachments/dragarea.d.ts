import type { Vector } from '../../utils/vector.js';
export interface DragEventDetail {
    id: string;
    element: HTMLElement;
    translation: Vector;
    offset: Vector;
    startPosition: Vector;
    viewPosition: Vector;
    vector: Vector;
}
interface DragAreaOptions {
    disabled?: boolean;
    grabTimeout?: number;
    grabIgnoreMoveDistance?: number;
    itemSelector?: string;
    ongrabitemattempt?: (obj: DragEventDetail) => void;
    ongrabitemcancel?: (obj: DragEventDetail) => void;
    ongrabitem?: (obj: DragEventDetail) => void;
    ondragitemcancel?: (obj: DragEventDetail) => void;
    ondragitem?: (obj: DragEventDetail) => void;
    ondropitem?: (obj: DragEventDetail) => void;
}
export declare function dragarea(options?: DragAreaOptions): (element: HTMLElement) => void;
export {};
