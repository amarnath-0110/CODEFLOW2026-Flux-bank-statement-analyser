export declare function debounce(fn: (...args: any[]) => void, options?: {
    timeout?: number;
    beforeDebounce?: (...args: any[]) => unknown;
    runLast?: boolean;
}): (...args: unknown[]) => void;
