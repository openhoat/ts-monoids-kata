import { Monoid } from './monoid.ts'

export const Max: Monoid<number> = {
  empty: () => Number.MIN_VALUE,
  concat: Math.max,
}
