import type { PerceivedPerformanceOptions } from './common/createStoreExtension.ts';
export interface DataTransferLoaderOptions {
    /** Should we show the progress indicator for a minimum amount of time, configure with `PerceivedPerformanceOptions`. By default isn't set, when set to `true` the following settings are used:
    
    ```js
    {
        minDuration: 500,
        maxDuration: 750,
        minStep: 50,
        maxStep: 150
    }
    ```
    */
    perceivedPerformance?: boolean | PerceivedPerformanceOptions;
    /** Action to run to trigger the load operation, defaults to `'load'` */
    actionLoad?: string;
    /** Action to run to trigger the abort operation, defaults to `'abort'` */
    actionAbort?: string;
    /**
     * How we deal with directory structures, defaults to `'flatten'`. Currently doesn't support other values.
     */
    mode: 'flatten';
}
export declare const DataTransferLoader: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        DataTransferLoader: DataTransferLoaderOptions;
    }
    interface DefineFilePondOptions {
        DataTransferLoader?: DataTransferLoaderOptions;
    }
}
