import type { EntryListFunctions, TemplateNode } from '../types/index.js';
import { type NodeContext } from '../elements/common/nodeTree.js';
import { fade } from '../elements/common/transition.js';
import { quadInOut } from 'svelte/easing';
export declare function createFilePondEntryList(): TemplateNode[];
export declare function createFilePondEntry(): TemplateNode;
export declare function createEntryInfoBlock(key: string, statusCodes: string[], { main, sub }: {
    main: TemplateNode | string;
    sub: TemplateNode | string;
}): TemplateNode;
export declare function createEntryInfo(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
        part: string;
        subtag: string;
        subattrs: {
            layout: string;
        };
    };
    children: ({
        key: string;
        tag: string;
        attrs: {
            layout: string;
        };
        context: ({ entry }: NodeContext) => {
            isWaiting: boolean;
            isFrozen: boolean;
        };
        children: ({
            key: string;
            component: import("svelte/legacy").LegacyComponentType;
            props: ({ isWaiting, isFrozen }: NodeContext) => {
                class: string;
                part: string;
                isWaiting: any;
                isFrozen: any;
            };
            children: string;
            context?: undefined;
        } | {
            key: string;
            component: import("svelte/legacy").LegacyComponentType;
            props: ({ isWaiting, isFrozen }: NodeContext) => {
                class: string;
                part: string;
                isWaiting: any;
                isFrozen: any;
            };
            context: ({ entry, byteUnits }: NodeContext) => {
                size?: undefined;
                sizeUnit?: undefined;
            } | {
                size: any;
                sizeUnit: string;
            };
            children: string;
        })[];
    } | {
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: {
            subtag: string;
            subattrs: {
                layout: string;
            };
        };
        transition: {
            fn: typeof fade;
            duration: number;
            easing: typeof quadInOut;
            when: ({ entry }: NodeContext) => boolean;
        };
        children: TemplateNode[];
    })[];
};
export declare function createEntryDataTransferInfo(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
        part: string;
        subtag: string;
        subattrs: {
            layout: string;
        };
    };
    context: ({ entry }: NodeContext) => {
        processedFiles: any;
        totalFiles: any;
    };
    children: {
        key: string;
        tag: string;
        attrs: {
            class: string;
        };
        children: string;
    }[];
};
export declare function createEntryStatus(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: ({ ariaId }: NodeContext) => {
        part: string;
        class: string;
        id: string;
    };
};
export declare function createFileLoadInfo(): {
    key: string;
    tag: string;
    attrs: {
        layout: string;
    };
    context: ({ entry }: NodeContext) => {
        isWaiting: boolean;
        isFrozen: boolean;
    };
    children: ({
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: ({ isWaiting, isFrozen }: NodeContext) => {
            class: string;
            part: string;
            isWaiting: any;
            isFrozen: any;
        };
        children: string;
        context?: undefined;
    } | {
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: ({ isWaiting, isFrozen }: NodeContext) => {
            class: string;
            part: string;
            isWaiting: any;
            isFrozen: any;
        };
        context: ({ entry, byteUnits }: NodeContext) => {
            size?: undefined;
            sizeUnit?: undefined;
        } | {
            size: any;
            sizeUnit: string;
        };
        children: string;
    })[];
};
export declare function createFileStoreInfo(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        subtag: string;
        subattrs: {
            layout: string;
        };
    };
    transition: {
        fn: typeof fade;
        duration: number;
        easing: typeof quadInOut;
        when: ({ entry }: NodeContext) => boolean;
    };
    children: TemplateNode[];
};
export declare function createEntryLoadState(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: ({ id, ariaId, entry }: NodeContext, { updateEntryState, removeEntries }: EntryListFunctions) => {
        class: string;
        part: string;
        buttonPart: string;
        states: ({
            codes: string[];
            progress: boolean;
            button: TemplateNode;
        } | {
            codes: (string | null)[];
            button: TemplateNode;
            progress?: undefined;
        })[];
    };
};
export declare function createEntryStoreState(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: ({ id, ariaId, entry }: NodeContext, { updateEntryState }: EntryListFunctions) => {
        class: string;
        part: string;
        buttonPart: string;
        states: ({
            codes: string[];
            button: TemplateNode;
            progress?: undefined;
        } | {
            codes: string[];
            progress: boolean;
            button: TemplateNode;
        } | {
            codes: string[];
            progress: {
                direction: string;
            };
            button: TemplateNode;
        })[];
    };
};
interface EntryCheckboxOptions {
    /** Key of the component */
    key?: string;
    /** Key of the state on the entry that is toggled */
    stateKey?: string;
}
export declare function createEntryCheckbox(options?: EntryCheckboxOptions): TemplateNode;
export interface FileRenameInputOptions {
    /** Key of the component */
    key?: string;
    /** Extension action key, defaults to `"renameFile"` */
    extensionAction?: string;
}
export declare function createFileRenameInput(options?: FileRenameInputOptions): TemplateNode;
export declare function appendEntryCheckbox(template: TemplateNode[]): TemplateNode[];
export declare function appendEntryRenameInput(template: TemplateNode[]): TemplateNode[];
export {};
