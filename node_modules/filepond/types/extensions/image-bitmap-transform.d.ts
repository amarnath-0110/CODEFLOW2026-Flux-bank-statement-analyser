import { type TransformExtensionOptions } from './common/createTransformExtension.js';
export interface ImageBitmapTransformOptions extends TransformExtensionOptions {
    /** Image target width, defaults to `undefined` */
    width?: number;
    /** Image target height, defaults to `undefined` */
    height?: number;
    /** How to fit image in target size bounds, defaults to `'contain'` */
    fit?: 'cover' | 'contain' | 'force';
    /** Should we upscale images, defaults to `false` */
    upscale?: boolean;
    /** Output aspect ratio, defaults to input image aspect ratio */
    aspectRatio?: number;
    /** Output format type, defaults to input image type, some example types are `'image/jpeg'`, `'image/webp'`, and `'image/png'`, limited to what the canvas `toBlob` method can output for the current browser */
    type?: string;
    /** Resize quality. Defaults to `'medium'` */
    quality?: 'pixelated' | 'low' | 'medium' | 'high';
    /** Compression quality. Value between `0` and `1`, defaults to `.98`, only applies to JPEG and WEBP output */
    compression?: number;
    /** Where the extension can find the WebWorker to use */
    workersURL?: URL;
    /** Action name to use for rename. Defaults to `'transformImage'` */
    actionTransform?: string;
}
export declare const ImageBitmapTransform: import("./common/createExtension.js").Extension;
declare module '../index.js' {
    interface FilePondElement {
        ImageBitmapTransform: ImageBitmapTransformOptions;
    }
    interface DefineFilePondOptions {
        ImageBitmapTransform?: ImageBitmapTransformOptions;
    }
}
