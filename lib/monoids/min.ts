import { Monoid } from './monoid.ts'

export const Min: Monoid<number> = {
  empty: () => Number.MAX_VALUE,
  concat: Math.min,
}
