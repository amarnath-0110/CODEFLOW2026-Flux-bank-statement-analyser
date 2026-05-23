export declare function transformFirstLetter(str: string, fn: (char: string) => string): string;
export declare function upperCaseFirstLetter(str: string): string;
/** Returns a unique id of length, `length` should be between 1 and 11 */
export declare function getUniqueId(length?: number): string;
export declare function lowerCaseFirstLetter(str: string): string;
export declare function toCamelCase(str: string, separator?: string): string;
export declare function toPascalCase(str: string, separator?: string): string;
export declare function toCamelParts(str: string): string[];
/** Turns a camelCase string into a kebab-case string, already kebab case strings aren't modified */
export declare function toKebabCase(str: string): string;
export declare function getRuntimeDefaultLocale(): string;
