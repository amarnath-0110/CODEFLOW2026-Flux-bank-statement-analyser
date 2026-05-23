import { type TaskOptions } from './taskScheduler.js';
import type { ExtensionState, ExtensionStatus, Extension } from '../extensions/common/createExtension.js';
import type { FilePondEntry } from '../types/index.js';
import type { EntryTreeInstance, EntryTreeOn, Needle } from './entryTree.js';
export type ExtensionFactory = Extension | [Extension, {
    [key: string]: unknown;
}];
export type ExtensionFactoryInsertInstructions = Extension | [Extension, {
    [key: string]: unknown;
}] | ExtensionInsertInstructions;
export type ExtensionInsertInstructions = {
    insert: Extension;
    options: {
        [key: string]: unknown;
    };
    before: string;
    after?: undefined;
} | {
    insert: Extension;
    options: {
        [key: string]: unknown;
    };
    before?: undefined;
    after: string;
};
export interface ExtensionManagerState {
    extension: {
        [name: string]: ExtensionState;
    };
}
export interface ExtensionManagerContext {
    /** Subscribe to events */
    on: EntryTreeOn;
    /** Sets the current entries */
    setEntries: (entries: FilePondEntry[]) => void;
    /** Returns the current entries */
    getEntries: () => FilePondEntry[];
    /** Insert new entries */
    insertEntries: (entry: FilePondEntry | FilePondEntry[], index?: number | number[]) => void;
    /** Remove existing entries */
    removeEntries: (...needles: Needle[]) => ({
        entry: FilePondEntry;
        index: number[];
    } | void)[] | {
        entry: FilePondEntry;
        index: number[];
    } | void;
    /** Update a specific entry */
    updateEntry: (needle: Needle, ...props: any[]) => void;
    /** Replace an entry with one ore more entries */
    replaceEntry: (needle: Needle, ...entries: FilePondEntry[]) => void;
    /** Push a new task */
    pushTask: <T>(entryId: string, fn: (entry: T, options: {
        signal: AbortSignal;
    }) => Promise<void | boolean> | void | boolean, options?: TaskOptions) => void;
    /** Abort an existing task */
    abortTask: <T>(entryId: string, fn: (entry: T, options: {
        signal: AbortSignal;
    }) => Promise<void | boolean> | void | boolean) => void;
    /** Abort tasks */
    abortTasks: (group?: string) => void;
    setExtensionState: (state: any) => void;
    getExtensionState: () => any;
    setExtensionStatus: (status: ExtensionStatus) => void;
    getExtensionStatus: () => ExtensionStatus;
}
interface ExtensionManagerEvents {
    updateExtensionState: ExtensionManagerState['extension'];
    setExtensions: {
        extensionNames: string[];
    };
}
type ExtensionManagerOn = <EventName extends keyof ExtensionManagerEvents>(event: EventName, callback: (detail: ExtensionManagerEvents[EventName]) => void) => () => void;
export interface ExtensionManagerInstance {
    /** Subscribe to extension manager event */
    on: ExtensionManagerOn;
    /** Gets current extensions */
    get extensions(): Extension[];
    /** Update current extensions */
    set extensions(newExtensionFactories: ExtensionFactory[]);
    /** Propagate an extension proprty name with a value to managed extensions  */
    propagateExtensionProperty: (propertyName: string, value: any) => void;
    /** Set properties on a specific extension */
    setExtensionProperties: (extensionName: string, props: {
        [key: string]: any;
    }) => void;
    /** Get properties from a specific extension */
    getExtensionProperties: (extensionName: string) => {
        [key: string]: any;
    } | undefined;
    /** Get current extension states */
    getState(): {
        [name: string]: ExtensionState;
    };
    /** Clean up */
    destroy(): void;
}
export interface CreateExtensionManagerOptions {
    entryTree: EntryTreeInstance;
}
export declare function createExtensionManager(options: CreateExtensionManagerOptions): ExtensionManagerInstance;
export {};
