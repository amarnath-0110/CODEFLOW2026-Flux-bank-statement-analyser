/** Clamps value between min and max */
export declare function clamp(value: number, min?: number, max?: number): number;
export declare function roundPrecision(number: number, precision: number): number;
/** Random number between min and max */
export declare function randomNumberBetween(min?: number, max?: number, random?: () => number): number;
/** Generates random-ish numbers with a seed, useful for generating test data in sequence */
export declare function createRandomish(seed?: number): () => number;
export declare function elastify(translation: number, dist: number): number;
