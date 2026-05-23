import { type NodeTree, type NodeContext, type TemplateNode } from '../elements/common/nodeTree.js';
import type { FilePondEntry } from '../types/index.js';
import type { ExtensionState, ExtensionStatus, ExtensionStatusType } from '../extensions/common/createExtension.js';
import { Entry } from '../elements/FilePondEntryList/components/Entry/index.js';
export declare function getEntryExtensionsAsArray(entry: FilePondEntry): ExtensionState[];
export declare function getExtensionByProp(entry: FilePondEntry, prop: string): ExtensionState | void;
export declare function getExtensionByAction(entry: FilePondEntry, action: string): ExtensionState | void;
export declare function hasExtensionWithProp(entry: FilePondEntry, prop: string): boolean;
export declare function hasExtensionWithAction(entry: FilePondEntry, action: string): boolean;
export declare function hasExtensionWithStatusType(entry: FilePondEntry, types: ExtensionStatusType[]): boolean;
export declare function hasExtensionWithStatusCode(entry: FilePondEntry, codes: string[]): boolean;
export declare function getExtensionStatusWithCode(entry: FilePondEntry, status: string): ExtensionStatus | void;
export declare function createElementStack(options: {
    layout?: 'row' | 'stack' | 'pile';
    class?: string;
}): NodeTree;
export declare function createSpringPane(options: {
    key: string;
    class: string;
    part?: string;
}): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: ({ visualRect }: NodeContext) => {
        part: string | undefined;
        class: string;
        width: any;
        height: any;
    };
};
export declare function createButton(key: string, options: any): TemplateNode;
export declare function getAsButtonProps(props: {
    icon: string;
    label: string;
    title: string;
}): {
    label: string;
    title: string;
    icon: string;
};
export declare function createEntryMatcher(matches: string | string[] | RegExp): (entry: Entry) => boolean;
export declare function whenEntryIs(matches: string | string[] | RegExp | ((entry: Entry) => boolean)): NodeTree;
export declare function whenEntryHasExtensionProp(props: string | string[]): NodeTree;
export declare function whenEntryHasAction(actions: string | string[]): NodeTree;
export declare function whenEntryHasStatus(...status: ExtensionStatusType[]): NodeTree;
export declare function whenEntryNotHasStatus(...status: ExtensionStatusType[]): NodeTree;
