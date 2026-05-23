import { type CreateEntryTreeOptions } from '../../core/entryTree.js';
export type CreateFilePondEntryTreeOptions = Omit<CreateEntryTreeOptions, 'beforeOnboardEntry' | 'beforeUpdateEntryWithProps'>;
export declare function createFilePondEntryTree(options?: CreateFilePondEntryTreeOptions): import("../../core/entryTree.js").EntryTreeInstance;
