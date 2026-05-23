import type { FilePondEntry } from '../types/index.js';
import type { StoreExtensionOptions } from './common/createStoreExtension.ts';
export interface SimulatedStoreOptions extends StoreExtensionOptions {
    /** Maximum simulated load speed. Defaults to `1024000` */
    bitrate?: number;
    /** Delay in milliseconds between load ticks. Defaults to `250` */
    tickrate?: number;
    /** Delay in milliseconds before starting load. Defaults to `250` */
    connectionDelay?: number;
    /** Total parallel load operations. Defaults to `4` */
    parallel?: number;
    /** Store hooks so we can throw errors */
    onstore?: (progress: number) => void;
    /** Restore hook so we can throw errors */
    onrestore?: () => void;
    /** Release hook so we can throw errors */
    onrelease?: () => void;
    /** Fetches an actual stored file to use for demo purposes. */
    fetchStoredFile?: (storageId: string, entry: FilePondEntry, options: {
        signal: AbortSignal;
        onprogress: (e: ProgressEvent) => void;
    }) => Promise<File>;
    /** Logs stored files to the developer console. Defaults to `true` */
    log?: boolean;
}
export declare const SimulatedStore: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        SimulatedStore: SimulatedStoreOptions;
    }
    interface DefineFilePondOptions {
        SimulatedStore?: SimulatedStoreOptions;
    }
}
