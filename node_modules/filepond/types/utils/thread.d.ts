interface ThreadOptions {
    signal?: AbortSignal;
    transferList?: Transferable[];
    onprogress?: (e: ProgressEvent) => void;
}
/** Helper function to build thread worker */
export declare function createThreadWorker(url: URL | null | undefined, worker: Function & {
    fileName: string;
}): string | (Function & {
    fileName: string;
});
/** Run this function in a thread */
export declare function thread(fn: Function | string, args: any[], options?: ThreadOptions): Promise<unknown>;
export {};
