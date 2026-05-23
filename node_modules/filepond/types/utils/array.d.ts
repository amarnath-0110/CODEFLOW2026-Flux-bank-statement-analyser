export declare enum SortOrder {
    ASCENDING = 0,
    DESCENDING = 1
}
/** Wraps value in array if is not an array */
export declare function arrayWrap<T>(v: T | T[]): T[];
/** Add unique value to array */
export declare function arrayAddUnique<T>(arr: T[], value: T, compare?: (item: T) => boolean): T[];
/** Sorts an array by a `numericProp` value in `SortOrder` direction */
export declare function arraySortByItemProp(arr: any[], numericProp: string, direction?: SortOrder): void;
/** Remove item from array and return copy */
export declare function arrayRemove<T>(arr: T[], compare: (item: T) => boolean): T[];
/** Remove item(s) from array in-place, returns removed items */
export declare function arrayRemoveInPlace<T>(arr: T[], predicate: (value: T, index: number, obj: any[]) => boolean): T[];
export declare function arrayRemoveFalsy<T>(arr: T[]): Exclude<T, null | undefined | void>[];
/** Add item(s) to array at index */
export declare function arrayInsertAtIndex<T>(arr: T[], index: number, ...itemsToInsert: T[]): T[];
export declare function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): T[];
export declare function arraySwap<T>(arr: T[], indexA: number, indexB: number): T[];
/** Tests if array lengths are the same and if items in array are the same instances */
export declare function arrayItemsEqual(a: any[], b: any[]): boolean;
export declare function arrayGetSurroundingItems<T>(arr: T[], index: number, total: number): T[];
