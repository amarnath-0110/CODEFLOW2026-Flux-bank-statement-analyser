/** Returns the root entry */
export declare function getDataTransferRoot(dataTransfer: DataTransfer): void | null | FileSystemEntry;
/** Reads a DataTransfer item and returns a tree of entries */
export declare function readEntriesFromDataTransfer(dataTransfer: DataTransfer, options: {
    onprogress: (progress: {
        loaded: number;
        total: number;
    }) => void;
    signal?: AbortSignal;
}): Promise<any>;
/** Converts DataTransferEntries to FileSystemEntries */
export declare function dataTransferItemsToEntries(items: DataTransferItemList): (FileSystemEntry | null)[];
/** Converts DataTransferEntries to File[] */
export declare function dataTransferItemsToFiles(items: DataTransferItemList): (File | null)[];
/** Abstract away _webkit_ from main code */
export declare function getAsEntry(item: DataTransferItem): FileSystemEntry | null;
export declare function getAsFile(item: DataTransferItem): File | null;
export declare function readDirectory(entry: FileSystemDirectoryEntry): Promise<FileSystemEntry[]>;
export declare function shouldLoadWithIdleCallback(dataTransfer: DataTransfer): boolean;
export declare function dataTransferToFiles(dataTransfer: DataTransfer): Promise<(File | null)[]>;
