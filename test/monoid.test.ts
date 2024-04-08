import { Monoid } from '../lib/monoids/monoid.ts'
import { describe, expect, it, run } from '../deps/test/x/tincan.ts'
import { Sum } from '../lib/monoids/sum.ts'

describe('Monoid tests', () => {
  describe('Monoid', () => {
    describe('concat', () => {
      describe('Identity element', () => {
        // deno-lint-ignore no-explicit-any
        type TestCase<T = any> = {
          description: string
          monoid: Monoid<T>
          value: T
        }
        const testCases: TestCase[] = [
          { description: 'Sum', monoid: Sum, value: 3 },
        ]
        testCases.forEach(({ description, monoid, value }) => {
          describe(description, () => {
            it(`should return ${value} given ${value} and identity`, () => {
              // When
              const result = monoid.concat(value, monoid.empty())
              // Then
              expect(result).toEqual(value)
            })
          })
        })
      })
      describe('Associativity', () => {
        // deno-lint-ignore no-explicit-any
        type TestCase<T = any> = {
          description: string
          monoid: Monoid<T>
          values: [T, T, T]
        }
        const testCases: TestCase[] = [
          { description: 'Sum', monoid: Sum, values: [3, 4, 5] },
        ]
        testCases.forEach(({ description, monoid, values }) => {
          describe(description, () => {
            it(`should return the same result given (${values[0]},${values[1]}),${values[2]} and ${values[0]},(${values[1]},${values[2]})`, () => {
              // When
              const results = [
                monoid.concat(monoid.concat(values[0], values[1]), values[2]),
                monoid.concat(values[0], monoid.concat(values[1], values[2])),
              ]
              // Then
              expect(results[0]).toEqual(results[1])
            })
          })
        })
      })
    })
  })
})

run()
