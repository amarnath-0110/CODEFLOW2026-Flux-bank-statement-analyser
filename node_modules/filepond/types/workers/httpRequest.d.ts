export interface HttpRequestParams {
    url: string;
    method: string | undefined;
    responseType: XMLHttpRequestResponseType | undefined;
    formData?: any;
    data?: any;
    headers: string[][];
    timeout?: number;
    withCredentials: boolean | undefined;
}
export interface HttpRequestResponse {
    response: string;
    responseHeaders: string;
}
export interface HttpRequestOptions {
    signal?: AbortSignal;
    onprogress: (e: ProgressEvent) => void;
}
export declare function httpRequest({ url, method, formData, data, headers, timeout, withCredentials, responseType, }: HttpRequestParams, cb: (error: unknown | null, response?: HttpRequestResponse, transferList?: Transferable[]) => void, { onprogress, signal }: HttpRequestOptions): void;
export declare namespace httpRequest {
    var fileName: string;
}
