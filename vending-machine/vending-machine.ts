/**
 * @file Houses the vendingMachine function and the code that properly configures its arguments, taken from the command line.
 */

import process from 'node:process'
import vendingMachine from './vending-machine-function.js'

/** Initializing global variables for consumption by following While code and to be used as arguments when vendingMachine is invoked  */
let arg = null
let cost = null
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

// /** American currency values defined here. Pennys not needed because they are a denomination of 1, which is unnecessary for the relevant math in vendingMachine */
// let q = 25
// let d = 10
// let n = 5

// /** The vendingMachine function takes a itemCost (calculated from the --item-cost arg from the command line) and a paid (calculated from the --payment arg from the command line) and returns the itemized change of American currency in named coin denominations along with the calculated total change returned after the cost is subtracted from the payment. Returns message of insufficient funds if cost is greater than payment.
//  *  @param {number} itemCost The amount of money it takes to purchase this item.
//  *  @param {number} amountPaid The amount of money the user has inserted in order to purchase this item.
//  * @returns {void} console.log of the response string that includes an assembly of relevant information about how many coins are returned and in what amounts, along with total change.
//  */
// export default function vendingMachine(itemCost: number, amountPaid: number) {
//   let response = ''
//   if (amountPaid < itemCost) {
//     response += `Insufficient funds for desired product. We have returned your $${
//       amountPaid / 100
//     }`
//     return console.log(response)
//   }
//   const totalChange = amountPaid - itemCost
//   const Quarters = Math.floor(totalChange / q)
//   if (Quarters > 0) {
//     response += `Quarters: ${Quarters} \n`
//   }
//   const Dimes = Math.floor((totalChange - Quarters * q) / d)
//   if (Dimes > 0) {
//     response += `Dimes: ${Dimes} \n`
//   }
//   const Nickels = Math.floor((totalChange - (Quarters * q + Dimes * d)) / n)
//   if (Nickels > 0) {
//     response += `Nickels: ${Nickels} \n`
//   }
//   const Pennys = Math.floor(
//     totalChange - (Quarters * q + Dimes * d + Nickels * n),
//   )
//   if (Pennys > 0) {
//     response += `Pennys: ${Pennys} \n`
//   }

//   response += `Total Change: $${totalChange / 100}`
//   return console.log(response)
// }

/** Invoking vendingMachine function for use via command line */
vendingMachine(cost, payment)
