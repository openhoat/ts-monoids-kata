import { Monoid } from './monoid.ts'

export const Any: Monoid<boolean> = {
  empty: () => false,
  concat: (first, second) => first || second,
}
