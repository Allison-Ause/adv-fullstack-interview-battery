/**
 * @file Houses the vendingMachine function and the code that properly configures its arguments, taken from the command line.
 */

import process from 'node:process'
import vendingMachine from './vending-machine-function.js'

/** Initializing global variables for consumption by following While code and to be used as arguments when vendingMachine is invoked  */
/** arg variable that represents the arguments pulled directly from the command line  */
let arg = null
/** cost variable that represents the numeric conversion of --item-cost into cents  */
let cost = null
/** payment variable that represents the numeric conversion of --payment into cents  */
let payment = null

/** Converts command line inputs of --item-cost and --payment from dollars into cents, ready for consumption by vendingMachine */
while ((arg = process.argv.shift()) != null) {
  if (arg == '--item-cost') {
    const costInput = process.argv.shift()
    cost = Math.floor(Number(costInput || '0') * 100)
  } else if (arg == '--payment') {
    const paymentInput = process.argv.shift()
    payment = Math.floor(Number(paymentInput || '0') * 100)
  } else if (arg === '--help') {
    // show user what arguments are required and their format
    console.error(`Options:
    --item-cost <value> value is a number for cost of desired item in dollar decimal format
    --payment <value>   value is a number for the payment provided in dollar decimal format
    `)
    process.exit(0)
  }
}

/** Error handling in place for scenario wherein arguments (either --item-cost or --payment or both) are not entered into the command line, prompting an error code and exit. */
if (cost == null) {
  console.error('--item-cost is required but not provided. Exiting')
  process.exit(1)
}
if (payment == null) {
  console.error('--payment is required but not provided. Exiting')
  process.exit(1)
}

/** Invoking vendingMachine function for use via command line */
vendingMachine(cost, payment)
