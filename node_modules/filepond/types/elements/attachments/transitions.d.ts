interface TransitionRoute {
    [propertyName: string]: (value: string) => void;
}
interface TransitionTypeRoute {
    [propertyName: string]: {
        start?: (value: string) => void;
        end?: (value: string) => void;
    };
}
/** Define routes for transition event handlers */
export declare function transitions(transitionRoutes: TransitionRoute | TransitionTypeRoute): (element: HTMLElement) => () => void;
export {};
