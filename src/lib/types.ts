export type PartialBy<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
