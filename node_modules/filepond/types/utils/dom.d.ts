import type { FilePondFileEntry } from '../types/index.js';
export declare function dispatchCustomEvent(element: HTMLElement, type: string, options?: CustomEventInit): void;
/** Adds an event listener to an element */
export declare function addListener(element: Element | Window | Document, event: string, cb: (...args: any) => void, options?: AddEventListenerOptions | boolean | undefined): () => void;
/** Removes an event listener from an element */
export declare function unlisten(element: Element | Window | Document, event: string, cb: (...args: any) => void, options?: AddEventListenerOptions | boolean | undefined): void;
/** Simple helper function to stop event propagation */
export declare function stopPropagation(event: Event): void;
export declare function isKey(event: KeyboardEvent, key: string): boolean;
export declare const Key: {
    ENTER: string;
    ESCAPE: string;
};
export declare function routeKeyboardEvent(event: KeyboardEvent, routes: {
    [type: string]: (detail: any) => void;
}): void;
export declare function getAsElement(element: Element | string | undefined): Element | undefined;
export declare function setStyles(element: HTMLElement, styles: string): void;
/** HTML element creation helper function */
export declare function h(name: string, attributes?: {
    [key: string]: ((...args: any[]) => void) | string | boolean | number;
}, children?: (HTMLElement | void | false | null | undefined)[]): HTMLElement;
/** Sets a list of files/directories to a file input element */
export declare function setFileInputFilesFromEntries(element: HTMLInputElement, entries?: FilePondFileEntry[] | undefined, options?: {
    customEventType: string;
}): void;
/** Sets a list of files/directories to a file input element */
export declare function getFileListFromEntries(entries: FilePondFileEntry[]): FileList;
/** Tests if a video element has an audio track */
export declare function videoHasAudioTrack(video: HTMLVideoElement, options?: {
    attempts?: number;
    interval?: number;
}): Promise<unknown>;
/** Sets or updates the dataset attribute on an element */
export declare function updateDataset(element: HTMLElement, dataset: {
    [key: string]: string | number | boolean | undefined;
} | undefined): void;
/** Sets or updates the style attribute on an element */
export declare function updateStyles(element: HTMLElement, styles: {
    [key: string]: string | number;
} | undefined): void;
export declare function getStyleProperty(computedStyles: CSSStyleDeclaration, propertyName: string): string | undefined;
export declare function getStylePropertyAsNumber(computedStyles: CSSStyleDeclaration, propertyName: string): number | undefined;
export declare function getStylePropertyAsInt(computedStyles: CSSStyleDeclaration, propertyName: string): number | undefined;
export declare function copyAttributes(sourceElement: HTMLElement, targetElement: HTMLElement, filter: (name: string) => boolean): void;
/** Removes array for attributes from element */
export declare function removeAttributes(element: HTMLElement, attributesToRemove: string[]): void;
/** Sets attributes, sets non string values as props */
export declare function setAttributes(element: HTMLElement, attributesToSet: {
    [key: string]: any;
}): void;
/** Sets a string attribute, removes the attribute if value is `undefined` or `null` */
export declare function setStringAttribute(element: HTMLElement, name: string, value: boolean | string | number): void;
export declare function setBooleanAttribute(element: HTMLElement, name: string, value: boolean): void;
/** Returns the attribute value, if the element doesn't have this attribute it returns `undefined` */
export declare function getAttribute(element: HTMLElement, name: string): string | true | null | undefined;
/**
 * Returns `undefined` if not found, returns boolean for singular attributes, returns string for
 * attributes with value
 */
export declare function getAttributeFromElements(attributeName: string, ...elements: HTMLElement[]): string | true | null | undefined;
export declare function attributeValueToBool(value: string | null): boolean;
export declare function attributeValueToDefined(value: string | null): string | undefined;
export declare function boolToAttributeValue(value: boolean | undefined): string | undefined;
/** Returns either the size in bytes or the size in natural file size */
export declare function getFileSizeAttributeValue(element: HTMLElement, name: string): string | number | undefined;
/** Injects styles in document head */
export declare function adoptStyles(target?: Document | ShadowRoot, styles?: string): void;
export declare function createStyleSheet(styles: string): CSSStyleSheet;
/** Tests if the element with the given name has already been defined */
export declare function hasDefinedTag(name: string): boolean;
/** Defines the custom element if it's not already been defined */
export declare function defineCustomElement(tag: string, CustomElement: CustomElementConstructor): void;
/** Defines multiple custom elements in one go */
export declare function defineCustomElements(customElements?: {
    [tag: string]: CustomElementConstructor;
}): void;
