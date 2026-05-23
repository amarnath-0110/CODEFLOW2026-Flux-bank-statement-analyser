import type { EntryAnimation, FilePondEntry, Locale, SpringOptions } from '../../../types/index.js';
import type { Rect } from '../../../utils/rect.js';
import type { AnimatedEntry, AppCallbacks } from '../types.js';
export interface AppContext extends AppCallbacks {
    readonly enableAnimations: boolean;
    readonly enableDrag: boolean;
    readonly locale: Locale;
    readonly assets: {
        [key: string]: string;
    };
    readonly resources: {
        locale: Locale;
        assets: {
            [key: string]: string;
        };
    };
    readonly springDefaults: SpringOptions | undefined;
    readonly propResourceMap: {
        [componentProperty: string]: string;
    };
    readonly retainedEntries: {
        index: number;
        entry: FilePondEntry;
    }[];
    readonly animatedEntries: {
        [id: string]: AnimatedEntry;
    };
    readonly entryAnimationProps: {
        [animation: string]: EntryAnimation;
    };
    updateEntryPlaceholderRect: (rect?: Rect) => void;
}
export declare function setAppContext(value: AppContext): void;
export declare function getAppContext(): AppContext;
