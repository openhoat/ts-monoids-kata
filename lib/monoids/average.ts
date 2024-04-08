import { Monoid } from './monoid.ts'
import { Sum } from './sum.ts'

export interface AverageValue {
  sum: number
  length: number
}

export const toAverageValue = (value: number): AverageValue => ({
  sum: value,
  length: 1,
})

export const Average: Monoid<AverageValue> = {
  empty: () => ({
    length: 0,
    sum: 0,
  }),
  concat: (first, second) => ({
    length: Sum.concat(first.length, second.length),
    sum: Sum.concat(first.sum, second.sum),
  }),
}
