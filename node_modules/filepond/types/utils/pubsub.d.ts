export declare function pubsub(): {
    /** Subscribe to an event */
    on(event: string, callback: (detail?: any) => void): () => void;
    /** Publish an event */
    pub(event: string, value?: any): void;
};
