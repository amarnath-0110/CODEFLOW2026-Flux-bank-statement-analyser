/** We fade with tick instead of css so svelte doesn't generate a style tag */
export declare function prop(node: HTMLElement, options: {
    prop?: string;
    duration?: number;
    easing?: (t: number) => number;
}): {
    duration: number;
    easing: (t: number) => number;
    tick: (t: number) => void;
};
