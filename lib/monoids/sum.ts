import { Monoid } from './monoid.ts'

export const Sum: Monoid<number> = {
  empty: () => 0,
  concat: (first, second) => first + second,
}
