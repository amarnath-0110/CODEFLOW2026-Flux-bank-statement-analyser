import type { DropState } from '../types.js';
export interface DropContext {
    readonly current: DropState | undefined;
}
export declare function setDropContext(value: DropContext): void;
export declare function getDropContext(): DropContext;
