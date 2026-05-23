import type { StoreExtensionOptions } from './common/createStoreExtension.js';
export interface DataURLStoreOptions extends StoreExtensionOptions {
    /** Where the extension can find the WebWorker to use. Optional and usually automatically set by FilePond. */
    workersURL?: URL;
}
export declare const DataURLStore: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        DataURLStore: DataURLStoreOptions;
    }
    interface DefineFilePondOptions {
        DataURLStore?: DataURLStoreOptions;
    }
}
