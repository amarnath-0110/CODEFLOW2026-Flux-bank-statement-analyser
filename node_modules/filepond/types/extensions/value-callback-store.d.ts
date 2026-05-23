import type { FilePondEntry } from '../types/index.js';
export interface ValueCallbackStoreOptions {
    /** If the value is required or not. Defaults to `false` */
    required: boolean;
    /** Need to know the value key. Defaults to `'value'` */
    valueKey: string;
    /**
     * Custom function to map an entry object to a value for use in FormData. By default will use `valueKey` to get a storage id from the `entry.state`, else will return `entry.file` if set.
     */
    entryToValue?: (entry: FilePondEntry) => File | string | void;
    /** Called when formdata object changed. Defaults to `undefined` */
    onChange: (currentValues: unknown[]) => void;
}
export declare const ValueCallbackStore: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        ValueCallbackStore: ValueCallbackStoreOptions;
    }
    interface DefineFilePondOptions {
        ValueCallbackStore?: ValueCallbackStoreOptions;
    }
}
