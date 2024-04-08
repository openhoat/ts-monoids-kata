// deno-lint-ignore no-explicit-any
export interface SemiGroup<T = any> {
  concat: (first: T, second: T) => T
}

// deno-lint-ignore no-explicit-any
export interface Monoid<T = any> extends SemiGroup<T> {
  empty: () => T
}
