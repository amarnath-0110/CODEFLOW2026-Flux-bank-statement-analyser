/** So we can use requestIdleCallback on Safari even if it isn't support yet (2024/11) */
export declare const requestIdleCallback: (((callback: IdleRequestCallback, options?: IdleRequestOptions) => number) & typeof globalThis.requestIdleCallback) | (() => void);
