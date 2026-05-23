import type { ExtensionFactory } from '../../core/extensionManager.ts';
import type { Extension } from '../../types/index.js';
/** Merges a set of extensions with the default FilePond custom element extensions, this makes switching from a default input to a file-pond element as frictionless as possible */
export declare function createFilePondExtensionSet(extensions?: ExtensionFactory[]): Extension[];
