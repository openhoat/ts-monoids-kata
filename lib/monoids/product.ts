import { Monoid } from './monoid.ts'

export const Product: Monoid<number> = {
  empty: () => 1,
  concat: (first, second) => first * second,
}
