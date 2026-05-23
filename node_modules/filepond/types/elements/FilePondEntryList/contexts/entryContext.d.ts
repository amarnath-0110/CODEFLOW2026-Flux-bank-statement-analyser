import type { FilePondEntry } from '../../../types/index.js';
interface EntryContext {
    readonly current: FilePondEntry;
    readonly ariaId: string;
}
export declare function setEntryContext(value: EntryContext): void;
export declare function getEntryContext(): EntryContext;
export {};
