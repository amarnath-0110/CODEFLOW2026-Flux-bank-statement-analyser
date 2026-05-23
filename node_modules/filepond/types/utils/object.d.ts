/**
 * Test if object "a" property values are equal to object "b" property values, doesn't deep compare,
 * and only compares props on object "a" with "b", "b" may have more props
 */
export declare function isObjectValuesEqual(a: any, b: any): boolean;
/** Merges source into target */
export declare function deepAssign(target: {
    [key: string]: any;
}, ...sources: {
    [key: string]: any;
}[]): {
    [key: string]: any;
};
/** Tests if properties and values described in obj are same in target */
export declare function deepOverlap(props: {
    [key: string]: any;
}, target: {
    [key: string]: any;
}): boolean;
/**
 * Tests if array items in a overlap with items in b, will also return true if b has items but a has
 * no items
 */
export declare function arrayItemsOverlap(a: any, b: any): boolean;
export declare function hasOwnProp(obj: {
    [key: string]: any;
} | undefined, prop: string): boolean;
export declare function hasOwnProps(obj?: {
    [key: string]: any;
}, props?: string[]): boolean;
export declare function hasProps(obj?: {
    [key: string]: any;
}): boolean;
export declare function copyDescriptors(source: any, target: any): any;
export declare function nullToUndefined(value: null): undefined;
