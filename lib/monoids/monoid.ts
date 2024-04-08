// deno-lint-ignore no-explicit-any
export interface SemiGroup<T = any> {
  concat: (first: T, second: T) => T
}

// deno-lint-ignore no-explicit-any
export interface Monoid<T = any> extends SemiGroup<T> {
  empty: () => T
}

export const fold = <T>(foldable: T[], monoid: Monoid<T>): T =>
  foldable.reduce(monoid.concat, monoid.empty())

export const foldMap = <T, M>(
  mapper: (t: T) => M,
  monoid: Monoid<M>,
  foldable: T[],
): M => fold(foldable.map(mapper), monoid)
