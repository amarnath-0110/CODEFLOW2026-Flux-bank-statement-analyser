export declare function fade(node: HTMLElement, options?: {
    duration?: number;
    easing?: (t: number) => number;
}): {
    duration: number;
    easing: (t: number) => number;
    tick: (t: number) => string;
};
