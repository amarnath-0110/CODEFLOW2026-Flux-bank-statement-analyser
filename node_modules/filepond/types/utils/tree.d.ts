type TreeNode = {
    [key: string]: any;
};
/** Applies a function to every item in a tree structure */
export declare function eachTree<T extends TreeNode>(items: T[], each: (item: T, index: number) => void, subTreeKey?: string): void;
/** Searches for an item in a tree structure */
export declare function findTree<T extends TreeNode>(items: T[], find: (item: T, index: number) => boolean, subTreeKey?: string): undefined;
/** Applies a map function to a tree structure */
export declare const mapTree: (items: any[], map: (item: any, index: number, items: any[]) => any, subTreeKey?: string) => any[];
/** Applies an async map function to a tree structure */
export declare const mapTreeAsync: (items: any[], map: (item: any, index: number, items: any[]) => Promise<any>, subTreeKey?: string) => Promise<any[]>;
/** Applies a filter function to a tree structure */
export declare const filterTree: <T extends TreeNode>(items: T[], filter: (item: T) => boolean, subTreeKey?: string) => T[];
/** Flattens a tree structure to a new array */
export declare const flattenTree: <T extends TreeNode>(items: T[], subTreeKey?: keyof T) => T[];
/** Sorts a tree structure in place */
export declare const sortTree: <T extends TreeNode>(items: T[], sort: (a: T, b: T) => number, subTreeKey?: string) => T[];
export {};
