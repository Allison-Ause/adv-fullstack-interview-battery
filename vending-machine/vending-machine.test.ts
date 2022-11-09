import vendingMachine from './vending-machine-function'
import { expect, test } from '@jest/globals'
// const vendingMachine = require('./vending-machine')
// const { expect, test } = require('@jest/globals')

test('cost of $1 and payment of $2 returns $1 total change and 4 Quarters', () => {
  expect(vendingMachine(100, 200)).toBe(`Quarters: 4 \nTotal Change: $1`)
})

test('cost of $2 and payment of $1 returns message of insufficient funds', () => {
  expect(vendingMachine(200, 100)).toBe(
    `Insufficient funds for desired product. We have returned your $1`,
  )
})

// test catch of input
// test catch of payment
// test insufficient payment
