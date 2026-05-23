import type { Extension, ExtensionContext, ExtensionOptions } from './createExtension.js';
import type { FilePondEntry } from '../../types/index.js';
import type { TaskFnOptions } from '../../core/taskScheduler.js';
type StoreExtensionResolvedOptions = StoreExtensionOptions & {
    /** If an upload is really fast, will show simulated progress to instill confidence in upload */
    perceivedPerformance: boolean | PerceivedPerformanceOptions | null;
    /** How many of these store operations can run in parallel */
    parallel: number;
    /** The key to use when setting the storage id */
    valueKey: string;
    /** Action to run to trigger the store operation */
    actionStore: string;
    /** Action to run to trigger the load operation */
    actionLoad: string;
    /** Action to run to trigger the abort operation */
    actionAbort: string;
};
type StoreExtensionResolvedProps<Props extends object = StoreExtensionOptions> = StoreExtensionResolvedOptions & Required<Props>;
interface StoreExtensionState<Props extends object = StoreExtensionOptions> extends Omit<ExtensionOptions, 'props' | 'didSetProps'> {
    props: StoreExtensionResolvedProps<Props>;
    didSetProps: (cb: (props: StoreExtensionResolvedProps<Props>) => void) => void;
}
type StoreFactory<Props extends object = StoreExtensionOptions> = (instance: StoreExtensionState<Props>, api: ExtensionContext) => StoreExtensionFunctions;
export interface StoreExtensionFunctionOptions extends TaskFnOptions {
    onprogress: (e: ProgressEvent) => void;
}
interface StoreExtensionFunctions {
    storeEntry: StoreExtensionStoreFunction;
    restoreEntry?: StoreExtensionRestoreFunction;
    releaseEntry?: StoreExtensionReleaseFunction;
}
export interface StoreExtensionOptions {
    /** If an upload is really fast, will show simulated progress to instill confidence in upload, configure with `PerceivedPerformanceOptions`. By default isn't set, when set to `true` the following settings are used:
    
    ```js
    {
        minDuration: 500,
        maxDuration: 750,
        minStep: 50,
        maxStep: 150
    }
    ```
    */
    perceivedPerformance?: boolean | PerceivedPerformanceOptions | null;
    /** How many of these store operations can run in parallel */
    parallel?: number;
    /** The key to use when setting the storage id */
    valueKey?: string;
    /** Action to run to trigger the store operation, defaults to 'store' */
    actionStore?: string;
    /** Action to run to trigger the load operation, defaults to 'load' */
    actionLoad?: string;
    /** Action to run to trigger the abort operation, defaults to 'abort' */
    actionAbort?: string;
    /**
     * Determines if we should store the entry, if returns true, the `actionStore` prop is set
     * automatically. When this prop is set the `actionStore` prop cannot be set to `false` to
     * reset the store operation
     */
    shouldStore?: (entry: FilePondEntry) => Promise<boolean> | boolean;
}
export type StoreExtensionStoreFunction = (entry: FilePondEntry, options: StoreExtensionFunctionOptions) => Promise<string | boolean | void>;
export type StoreExtensionRestoreFunction = (storageId: string, entry: FilePondEntry, options: StoreExtensionFunctionOptions) => Promise<File | void>;
export type StoreExtensionReleaseFunction = (storageId: string, entry: FilePondEntry, options?: TaskFnOptions) => Promise<boolean | void>;
/** Used to simulate load or store progress, the progress duration will be random between `minDuration` and `maxDuration` the progress step length will be random between `minStep` and `maxStep` */
export interface PerceivedPerformanceOptions {
    /** The minimum duration of the operation in milliseconds */
    minDuration: number;
    /** The maximum duration of the operation in milliseconds  */
    maxDuration: number;
    /** The minimum duration till next step in milliseconds  */
    minStep: number;
    /** The maximum duration till next step in milliseconds  */
    maxStep: number;
}
export interface CreateStoreExtensionOptions<Props extends object = StoreExtensionOptions> {
    /** The name of the extension */
    name: string;
    /** The default properties available to this extension */
    props: Props & Partial<StoreExtensionOptions>;
    /** The factory function that runs when the extension is created */
    factory: StoreFactory<Props>;
}
export declare function createStoreExtension<Props extends object = StoreExtensionOptions>(options: CreateStoreExtensionOptions<Props>): Extension;
export {};
