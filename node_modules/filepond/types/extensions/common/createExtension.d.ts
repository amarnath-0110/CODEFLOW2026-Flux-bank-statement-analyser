import type { ExtensionManagerContext } from '../../core/extensionManager.js';
import type { FilePondEntry, Progress } from '../../types/index.js';
type EmptyObject = Record<PropertyKey, never>;
export interface ExtensionState {
    /** Current extension status */
    status?: ExtensionStatus;
    /** The actions that are available on this extension, used for toggling UI features */
    actions?: string[];
    /** Free to set other props */
    [key: string]: unknown;
}
export type ExtensionStatusType = 'error' | 'warning' | 'success' | 'info' | 'system';
export interface ExtensionStatus {
    /** Type of status */
    type: ExtensionStatusType;
    /** The current status code */
    code: string;
    /** An optional subscode (used in validation extensions) */
    subcode?: string;
    /** Optional progress between `0` and `1` */
    progress?: number | null;
    /** Optional values to pass to use in locale label */
    values?: {
        [key: string]: any;
    } | null;
    /** Metadata not for use in locale labels */
    meta?: {
        [key: string]: any;
    } | null;
}
export interface ExtensionOptions {
    props: any;
    didSetProps: (cb: (props: any) => void) => void;
    extensionName: string;
    extensionType: ExtensionType;
}
export interface ExtensionContext extends ExtensionManagerContext {
    getEntryExtensionState: (entry: FilePondEntry) => {
        [key: string]: any;
    };
    setEntryExtensionState: (entry: FilePondEntry, state: {
        [key: string]: any;
    }) => void;
    getEntryExtensionStatus: (entry: FilePondEntry) => ExtensionStatus | EmptyObject;
    setEntryExtensionStatus: (entry: FilePondEntry, status: ExtensionStatus) => void;
    createProgressHandler: (entry: FilePondEntry) => (e: Progress) => void;
}
export type ExtensionFactoryFunction = (instance: ExtensionOptions, context: ExtensionContext) => {
    destroy: () => void;
};
export interface ExtensionInstance {
    /** Extension name */
    get name(): string;
    /** Returns the current props */
    getProps: () => {
        [key: string]: any;
    };
    /** Sets new props */
    setProps: (newProps: {
        [key: string]: any;
    }) => void;
    /** Cleans up the extension */
    destroy: () => void;
}
export type ExtensionType = 'source' | 'loader' | 'validator' | 'transform' | 'resource' | 'view' | 'store';
export type Extension = ((pond: ExtensionManagerContext) => ExtensionInstance) & {
    readonly name: string;
    readonly type: ExtensionType;
};
export interface CreateExtensionOptions {
    /** The name of the extension */
    name: string;
    /** The type of the extension */
    type: ExtensionType;
    /** The default properties available to this extension */
    props: any;
    /** The factory function that runs when the extension is created */
    factory: ExtensionFactoryFunction;
}
export declare function createExtension(options: CreateExtensionOptions): Extension;
export {};
