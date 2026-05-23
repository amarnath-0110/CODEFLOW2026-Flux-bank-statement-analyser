import type { RequestOptions } from '../types/index.js';
interface XHROptions extends RequestOptions {
    signal?: AbortSignal;
    responseType?: XMLHttpRequestResponseType;
    onprogress?: (e: ProgressEvent) => void;
    useWebWorkers?: boolean;
    workersURL?: URL;
}
export interface XHRResponse {
    response: string | Blob;
    getAllResponseHeaders: () => string;
}
export declare function xhr(url: string, options?: XHROptions): Promise<XHRResponse>;
/** Creates a ProgressEvent */
export declare function createProgressEvent(lengthComputable?: boolean | undefined, loaded?: number | undefined, total?: number | undefined): ProgressEvent<EventTarget>;
export declare function getResponseHeaders(xhr: XHRResponse): {
    [key: string]: string;
};
/** Finds ContentDisposition header and extracts filename */
export declare function getFilenameFromResponseHeaders(headers: {
    [key: string]: string;
}): string | null;
export declare function getFilenameFromContentDispositionHeader(header: string): string | null;
export declare function getResponseHeaderValue(name: string, headers: string): undefined | string;
export {};
