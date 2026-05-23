/** File encoding function that can run in a separate thread */
export declare function readFile(file: File, cb: (error: ProgressEvent | null, res?: {
    dataURL: string;
}) => void, { onprogress }: {
    onprogress: (e: ProgressEvent) => void;
}): void;
export declare namespace readFile {
    var fileName: string;
}
