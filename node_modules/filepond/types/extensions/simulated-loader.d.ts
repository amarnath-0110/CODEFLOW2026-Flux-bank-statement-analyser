import type { FilePondEntry } from '../types/index.js';
export interface SimulatedLoaderOptions {
    /** Action to run to trigger the load operation. Defaults to 'load' */
    actionLoad?: string;
    /** Action to run to abort the load operation. Defaults to 'abort' */
    actionAbort?: string;
    /** Maximum simulated load speed. Defaults to `1024000` */
    bitrate?: number;
    /** Delay in milliseconds between load ticks. Defaults to `250` */
    tickrate?: number;
    /** Delay before starting load. Defaults to `250` */
    connectionDelay?: number;
    /** Total parallel load operations. Defaults to `4` */
    parallel?: number;
    /** Delay until fake error thrown. Defaults to `undefined` */
    errorDelay?: number;
    /** Logs loading state to the developer console. Defaults to `true` */
    log?: boolean;
    /** File to fetch. Defaults to `undefined` */
    fetchFile?: (entry: FilePondEntry, options: {
        signal: AbortSignal;
        onprogress: (e: ProgressEvent) => void;
    }) => Promise<File>;
}
export declare const SimulatedLoader: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        SimulatedLoader: SimulatedLoaderOptions;
    }
    interface DefineFilePondOptions {
        SimulatedLoader?: SimulatedLoaderOptions;
    }
}
