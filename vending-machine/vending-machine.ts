import process from 'node:process'

let arg = null
let cost = null
let payment = null

// Preliminary setup for parsing args from command line:
while ((arg = process.argv.shift()) != null) {
  if (arg == '--item-cost') {
    const costInput = process.argv.shift()
    cost = Math.floor(Number(costInput || '0') * 100)
  } else if (arg == '--payment') {
    const paymentInput = process.argv.shift()
    payment = Math.floor(Number(paymentInput || '0') * 100) // this means we're talking about cents instead of dollars.
  }
}

/** Error handling in place for a lack of arguments (either --item-cost or ) entered into the command line. */
if (cost == null) {
  console.error('--item-cost is required but not provided. Exiting')
  process.exit(1)
}
if (payment == null) {
  console.error('--payment is required but not provided. Exiting')
  process.exit(1)
}

/** American currency values defined here. Pennys not needed because they are a denomination of 1, which is unnecessary for the relevant math in vendingMachine */
let q = 25
let d = 10
let n = 5

/** The vendingMachine function takes a costInput (calculated from the --item-cost arg from the command line) and a paymentInput (calculated from the --payment arg from the command line) and returns the itemized change of American currency in named coin denominations along with the calculated total change returned after the cost is subtracted from the payment. Returns message of insufficient funds if cost is greater than payment. */
function vendingMachine(costInput: number, paymentInput: number): void {
  let response = ''
  if (paymentInput < costInput) {
    response += `Insufficient funds for desired product. We have returned your $${
      paymentInput / 100
    }`
    return console.log(response)
  }
  const totalChange = paymentInput - costInput
  const Quarters = Math.floor(totalChange / q)
  if (Quarters > 0) {
    response += `Quarters: ${Quarters} \n`
  }
  const Dimes = Math.floor((totalChange - Quarters * q) / d)
  if (Dimes > 0) {
    response += `Dimes: ${Dimes} \n`
  }
  const Nickels = Math.floor((totalChange - (Quarters * q + Dimes * d)) / n)
  if (Nickels > 0) {
    response += `Nickels: ${Nickels} \n`
  }
  const Pennys = Math.floor(
    totalChange - (Quarters * q + Dimes * d + Nickels * n),
  )
  if (Pennys > 0) {
    response += `Pennys: ${Pennys} \n`
  }

  response += `Total Change: $${totalChange / 100}`
  return console.log(response)
}

vendingMachine(cost, payment)

// Answer:
// totalChange: 305c
// Quarters: 12
// Dimes: 0
// Nickels: 1
// Pennys: 0
