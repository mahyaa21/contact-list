export interface ReducerInitialState<T = any> {
    loading?: boolean;
    data: T;
    error?: boolean;
    errorCode?: string;
    errorMessage?: string;
    title?: string;
}