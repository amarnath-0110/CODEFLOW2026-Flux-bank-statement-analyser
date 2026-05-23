export declare function getGlobalPreventAnimations(): {
    current: boolean | null;
};
export declare function getShouldReduceMotion(): {
    current: boolean;
};
export declare function computeAnimationPreference(preference: "auto" | "always" | "never" | undefined, preventGlobal: boolean | null, reduceMotion: boolean): boolean;
