import { type EntryListFunctions } from '../types/index.js';
import { type MediaVideoOptions } from '../elements/FilePondEntryList/components/MediaVideo/index.js';
import { type NodeContext, type TemplateNode } from '../elements/common/nodeTree.js';
import { type MediaImageOptions } from '../elements/FilePondEntryList/components/MediaImage/index.js';
export type VideoViewOptions = Omit<MediaVideoOptions, 'class' | 'children'>;
export type ImageViewOptions = Omit<MediaImageOptions, 'class'>;
export declare function createEditMediaButton(options?: {
    action?: string;
}): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: ({ id, entry }: NodeContext, { updateEntryState }: EntryListFunctions) => {
        buttonPart: string;
        states: ({
            codes: string[];
            button: TemplateNode;
            progress?: undefined;
        } | {
            codes: string[];
            progress: boolean;
            button: TemplateNode;
        })[];
    };
};
export declare function createResetMediaButton(options?: {
    action?: string;
}): TemplateNode;
export declare function createImageView(options?: ImageViewOptions): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
        part: string;
    };
    children: ({
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: ({ visualRect }: NodeContext) => {
            part: string | undefined;
            class: string;
            width: any;
            height: any;
        };
    } | {
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: ImageViewOptions | undefined;
        if?: undefined;
    } | {
        if: {
            test: () => boolean;
            then: {
                key: string;
                component: import("svelte/legacy").LegacyComponentType;
                spring: ({ visualRect }: NodeContext) => {
                    opacity: {
                        value: number;
                        config: {
                            stiffness: number;
                            damping: number;
                            precision: number;
                        };
                    };
                };
                props: ({ visualRect, opacity }: NodeContext) => {
                    part: string;
                    class: string;
                    width: any;
                    height: any;
                    opacity: any;
                };
            };
        };
        key?: undefined;
        component?: undefined;
        props?: undefined;
    })[];
};
export declare function createVideoView(options?: VideoViewOptions): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
        part: string;
    };
    children: ({
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: ({ visualRect }: NodeContext) => {
            part: string | undefined;
            class: string;
            width: any;
            height: any;
        };
    } | {
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: VideoViewOptions | undefined;
        if?: undefined;
    } | {
        if: {
            test: () => boolean;
            then: {
                key: string;
                component: import("svelte/legacy").LegacyComponentType;
                spring: ({ visualRect }: NodeContext) => {
                    opacity: {
                        value: number;
                        config: {
                            stiffness: number;
                            damping: number;
                            precision: number;
                        };
                    };
                };
                props: ({ visualRect, opacity }: NodeContext) => {
                    part: string;
                    class: string;
                    width: any;
                    height: any;
                    opacity: any;
                };
            };
        };
        key?: undefined;
        component?: undefined;
        props?: undefined;
    })[];
};
export declare function createMediaControlGroup(options?: {
    key?: string;
    justifyContent?: 'stretch' | 'start' | 'end';
}): import("../elements/common/nodeTree.js").NodeTree;
export declare function createMediaControl(options?: {
    key?: string;
}): import("../elements/common/nodeTree.js").NodeTree;
export declare function createMediaControls(options?: {
    key?: string;
    justifyContent?: 'stretch' | 'start' | 'end';
}): import("../elements/common/nodeTree.js").NodeTree;
export declare function createTogglePlaybackButton(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
    };
    children: TemplateNode;
};
export declare function createToggleAudioButton(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
    };
    children: TemplateNode;
};
export declare function createToggleFullscreenButton(): {
    if: {
        test: () => boolean;
        then: {
            key: string;
            component: import("svelte/legacy").LegacyComponentType;
            props: {
                class: string;
            };
            children: TemplateNode;
        };
    };
};
export declare function createMediaScrubber(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
    };
    children: {
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: ({ video }: NodeContext) => {
            part: string;
            step: any;
            value: any;
            min: number;
            max: any;
        };
    }[];
};
export declare function createMediaScrubberTitle(): {
    key: string;
    tag: string;
    context: ({ hoverValue }: NodeContext) => {
        time: string;
    };
    attrs: ({ time }: NodeContext) => {
        datetime: any;
    };
    children: string;
};
export declare function createMediaTimeIndicator(): {
    key: string;
    component: import("svelte/legacy").LegacyComponentType;
    props: {
        class: string;
    };
    children: {
        key: string;
        component: import("svelte/legacy").LegacyComponentType;
        props: ({ video }: NodeContext) => {
            timeISO: any;
            timeLabel: any;
            durationISO: any;
            durationLabel: any;
        };
    };
};
export declare function appendEntryImageView(template: TemplateNode[], options?: ImageViewOptions & {
    enableEdit: boolean;
    enableReset: boolean;
}): TemplateNode[];
export declare function appendEntryVideoView(template: TemplateNode[], options?: VideoViewOptions & {
    enableEdit: boolean;
    enableReset: boolean;
}): TemplateNode[];
