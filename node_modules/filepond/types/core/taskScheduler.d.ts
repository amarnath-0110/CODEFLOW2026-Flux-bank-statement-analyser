export interface CreateTaskSchedulerOptions {
    log?: (tasks: TaskSchedulerTask[]) => void;
}
export interface TaskFnOptions {
    signal: AbortSignal;
}
export type TaskFn = (...args: any[]) => Promise<void | boolean> | void | boolean;
export type TaskArgs = unknown[] | (() => unknown[]);
export interface TaskSchedulerTask {
    /** A function reference */
    fn: TaskFn;
    /** Parameters to pass to task function */
    params: TaskArgs;
    /** So we can abort tasks, or halt tasks belonging to the same group */
    group: string;
    /** How many of the `fn` can run in parallel */
    parallel: number;
    /** Order is used to sort this task in the queue */
    order: number;
    /** State of this task */
    state: number;
    /** Used to abort the task */
    abortController: AbortController;
    /** Run this task even when an earlier task has a soft failure (for example file failed to validate) */
    ignoreSoftFailure: boolean;
}
export interface TaskOptions {
    /** How many of these tasks can run in parallel */
    parallel?: number;
    /** Order is used to sort this task in the queue */
    order?: number;
    /** Parameters to pass to task function */
    params?: TaskArgs;
    /** Can this task ignore soft failures */
    ignoreSoftFailure?: boolean;
}
export declare function createTaskScheduler(options: CreateTaskSchedulerOptions): {
    on: (event: string, callback: (detail?: any) => void) => () => void;
    pushTask: (group: string, fn: TaskFn, options?: TaskOptions) => void;
    abortTask: (group: string, fn: TaskFn) => void;
    abortTasks: (group?: string) => void;
};
