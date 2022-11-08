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

// Error handling about
if (cost == null) {
  console.error('--item-cost is required but not provided. Exiting')
  process.exit(1) //error exit code should ALWAYS BE 1
}
if (payment == null) {
  console.error('--payment is required but not provided. Exiting')
}

console.log(process.argv)

// First concern is getting American currency working. Can refactor for future currency additions.
// define currency:
let q = 25
let d = 10
let n = 5
let p = 1

function vendingMachine(
  costInput: number,
  paymentInput: number,
): string | void {
  let response = ''
  if (paymentInput < costInput) {
    // why does this count as void for typescript?
    return console.log(
      `Insufficient funds for desired product. We have returned your $${
        paymentInput / 100
      }`,
    )
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
    totalChange - (Quarters * q + Dimes * d + Nickels * n) / p,
  )
  if (Pennys > 0) {
    response += `Pennys: ${Pennys} \n`
  }

  response += `Total Change: $${totalChange}`
  return console.log(response)
}

vendingMachine(525, 220)

// Answer:
// totalChange: 305c
// Quarters: 12
// Dimes: 0
// Nickels: 1
// Pennys: 0
