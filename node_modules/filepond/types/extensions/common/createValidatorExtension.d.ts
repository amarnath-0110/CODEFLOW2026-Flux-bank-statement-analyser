import type { Extension, ExtensionContext, ExtensionOptions } from './createExtension.js';
import type { FilePondEntry } from '../../types/index.js';
type ValidatorExtensionResolvedProps<Props extends object = ValidatorExtensionOptions> = ValidatorExtensionOptions & Required<Props>;
interface ValidatorExtensionState<Props extends object = ValidatorExtensionOptions> extends Omit<ExtensionOptions, 'props' | 'didSetProps'> {
    props: ValidatorExtensionResolvedProps<Props>;
    didSetProps: (cb: (props: ValidatorExtensionResolvedProps<Props>) => void) => void;
}
type ValidatorFactory<Props extends object = ValidatorExtensionOptions> = (instance: ValidatorExtensionState<Props>, api: ExtensionContext) => ValidatorExtensionFunctions;
interface ValidationResultInvalid {
    code: string;
    values?: {
        [key: string]: any;
    } | null;
}
export interface ValidatorExtensionOptions {
    /**
     * Determines if we should validate the entry, if returns `false`, the entry is skipped
     */
    shouldValidate?: (entry: FilePondEntry) => Promise<boolean>;
}
interface ValidatorExtensionFunctions {
    /** Returns `true` when can run validation logic on this entry */
    canValidateEntry?: ValidatorExtensionCanValidateFunction;
    /** Returns `string` when error state, returns `null` when all is fine */
    validateEntry: ValidatorExtensionValidateFunction;
}
export type ValidatorExtensionCanValidateFunction = (entry: FilePondEntry) => Promise<boolean> | boolean;
export type ValidatorExtensionValidateFunction = (entry: FilePondEntry) => Promise<null | ValidationResultInvalid> | (null | ValidationResultInvalid);
export interface CreateValidatorExtensionOptions<Props extends object = ValidatorExtensionOptions> {
    /** The name of the extension */
    name: string;
    /** The default properties available to this extension */
    props: Props & Partial<ValidatorExtensionOptions>;
    /** The factory function that runs when the extension is created */
    factory: ValidatorFactory<Props>;
}
export declare function createValidatorExtension<Props extends object = ValidatorExtensionOptions>(options: CreateValidatorExtensionOptions<Props>): Extension;
export {};
