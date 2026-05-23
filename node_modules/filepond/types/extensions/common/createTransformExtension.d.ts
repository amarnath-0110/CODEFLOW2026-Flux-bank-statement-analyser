import type { Extension, ExtensionContext, ExtensionOptions } from './createExtension.js';
import type { FilePondEntry, FilePondFileEntry, Progress } from '../../types/index.js';
type TransformExtensionResolvedOptions = TransformExtensionOptions & {
    /** Action to run to trigger this extension */
    actionTransform: string;
    /** Action to run to trigger file load */
    actionLoad: string;
    /** Determines if we should transform the entry */
    shouldTransform: ((entry: FilePondEntry) => Promise<boolean> | boolean) | undefined;
    /** How many transform operations can run in parallel */
    parallel: number;
    /** Determines if this entry is allowed to transform */
    filterEntry: (entry: FilePondEntry) => Promise<boolean> | boolean;
};
type TransformExtensionResolvedProps<Props extends object = TransformExtensionOptions> = TransformExtensionResolvedOptions & Required<Props>;
interface TransformExtensionState<Props extends object = TransformExtensionOptions> extends Omit<ExtensionOptions, 'props' | 'didSetProps'> {
    props: TransformExtensionResolvedProps<Props>;
    didSetProps: (cb: (props: TransformExtensionResolvedProps<Props>) => void) => void;
}
type TransformFactory<Props extends object = TransformExtensionOptions> = (instance: TransformExtensionState<Props>, api: ExtensionContext) => TransformExtensionFunctions;
interface TransformExtensionFunctionOptions {
    signal: AbortSignal;
    onprogress: (e: Progress) => void;
}
type TransformExtensionResult = {
    file: File;
    history?: any[];
} | File | undefined | null;
export type TransformExtensionCanTransformFunction = (entry: FilePondEntry) => Promise<boolean> | boolean;
export type TransformExtensionPrepareFunction = (entry: FilePondFileEntry & {
    file: File;
}, options: TransformExtensionFunctionOptions) => Promise<void>;
export type TransformExtensionTransformFunction = (entry: FilePondFileEntry & {
    file: File;
}, options: TransformExtensionFunctionOptions) => Promise<TransformExtensionResult> | TransformExtensionResult;
interface TransformExtensionFunctions {
    /** Determines if we even can transform this entry */
    canTransformEntry?: TransformExtensionCanTransformFunction;
    /** Runs before the transformEntry function, useful for loading dependencies */
    prepareTransformEntry?: TransformExtensionPrepareFunction;
    /** Transforms the passed FilePond entry */
    transformEntry: TransformExtensionTransformFunction;
}
export interface TransformExtensionOptions {
    /** Action to run to trigger this extension, defaults to 'transform' */
    actionTransform?: string;
    /** Action to run to trigger file load */
    actionLoad?: string;
    /**
     * Determines if we should transform the entry, if true, the `actionTransfrom` prop is set
     * automatically. When this prop is set the `actionTransform` prop cannot be set to `false` to
     * reset the transform
     */
    shouldTransform?: (entry: FilePondEntry) => Promise<boolean> | boolean;
    /** How many transform operations can run in parallel, defaults to `1` */
    parallel?: number;
    /** Determines if this entry is allowed to transform */
    filterEntry?: (entry: FilePondEntry) => Promise<boolean> | boolean;
}
export interface CreateTransformExtensionOptions<Props extends object = TransformExtensionOptions> {
    /** The name of the extension */
    name: string;
    /** The default properties available to this extension */
    props: Props & Partial<TransformExtensionOptions>;
    /** The factory function that runs when the extension is created */
    factory: TransformFactory<Props>;
}
export declare function createTransformExtension<Props extends object = TransformExtensionOptions>(options: CreateTransformExtensionOptions<Props>): Extension;
export {};
