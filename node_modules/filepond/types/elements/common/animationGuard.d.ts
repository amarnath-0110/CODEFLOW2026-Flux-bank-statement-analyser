export declare function createAnimationGuard(): {
    on: (event: string, callback: (detail?: any) => void) => () => void;
    register(key: string): {
        prevent(): void;
    };
};
