import { fold, foldMap, Monoid } from '../lib/monoids/monoid.ts'
import { describe, expect, it, run } from '../deps/test/x/tincan.ts'
import { Sum } from '../lib/monoids/sum.ts'
import { Any } from '../lib/monoids/any.ts'
import { Product } from '../lib/monoids/product.ts'
import { Max } from '../lib/monoids/max.ts'
import { Min } from '../lib/monoids/min.ts'

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
          { description: 'Any', monoid: Any, value: true },
          { description: 'Product', monoid: Product, value: 7 },
          { description: 'Max', monoid: Max, value: 6 },
          { description: 'Min', monoid: Min, value: 5 },
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
          { description: 'Any', monoid: Any, values: [true, false, true] },
          { description: 'Product', monoid: Product, values: [7, 8, 9] },
          { description: 'Max', monoid: Max, values: [6, 7, 8] },
          { description: 'Min', monoid: Min, values: [5, 6, 7] },
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
  describe('fold', () => {
    type TestCase<T> = {
      monoid: Monoid<T>
      foldable: T[]
      expectedResult: T
    }
    const doTestCase = <T>(
      { monoid, foldable, expectedResult }: TestCase<T>,
    ) => {
      it(`should return ${expectedResult} given ${JSON.stringify(foldable, null, 0)}`, () => {
        // When
        const resut = fold(foldable, monoid)
        // Then
        expect(resut).toEqual(expectedResult)
      })
    }
    describe('Sum', () => {
      const testCases: TestCase<number>[] = [{
        monoid: Sum,
        foldable: [Sum.empty()],
        expectedResult: Sum.empty(),
      }, {
        monoid: Sum,
        foldable: [2, Sum.empty()],
        expectedResult: 2,
      }, {
        monoid: Sum,
        foldable: [0, Sum.empty()],
        expectedResult: 0,
      }, {
        monoid: Sum,
        foldable: [1, 12, 3],
        expectedResult: 16,
      }]
      testCases.forEach(doTestCase)
    })
    describe('Any', () => {
      const testCases: TestCase<boolean>[] = [{
        monoid: Any,
        foldable: [Any.empty()],
        expectedResult: Any.empty(),
      }, {
        monoid: Any,
        foldable: [true, Any.empty()],
        expectedResult: true,
      }, {
        monoid: Any,
        foldable: [false, Any.empty()],
        expectedResult: false,
      }, {
        monoid: Any,
        foldable: [true, false, true],
        expectedResult: true,
      }]
      testCases.forEach(doTestCase)
    })
  })
  describe('foldMap', () => {
    describe('isWinnerTicket', () => {
      type TicketDigit = 1 | 2 | 3 | 4 | 5
      type Ticket = TicketDigit[]
      const getTicketSum = (ticket: Ticket): number => fold(ticket, Sum)
      const isWinnerTicket = (ticket: Ticket): boolean =>
        getTicketSum(ticket) === 39
      const isWinner = (tickets: Ticket[]): boolean =>
        foldMap(isWinnerTicket, Any, tickets)
      type TestCase = {
        tickets: Ticket[]
        expectedResult: boolean
      }
      const testCases: TestCase[] = [{
        tickets: [
          [1, 2, 5, 3, 4, 2, 2, 2],
          [5, 5, 5, 5, 5, 5, 5, 1],
          [5, 5, 5, 5, 5, 5, 5, 3],
        ],
        expectedResult: false,
      }, {
        tickets: [
          [5, 5, 5, 5, 5, 5, 5, 4],
          [1, 3, 2, 4, 3, 4, 2, 5],
        ],
        expectedResult: true,
      }]
      const doTestCase = (
        { tickets, expectedResult }: TestCase,
      ) => {
        it(`should return ${expectedResult} given ${JSON.stringify(tickets, null, 0)}`, () => {
          // When
          const resut = isWinner(tickets)
          // Then
          expect(resut).toEqual(expectedResult)
        })
      }
      testCases.forEach(doTestCase)
    })
  })
})

run()
