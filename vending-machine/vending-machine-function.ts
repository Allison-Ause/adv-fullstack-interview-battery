export default function vendingMachine(itemCost: number, amountPaid: number) {
  let response = ''
  let q = 25
  let d = 10
  let n = 5

  if (amountPaid < itemCost) {
    response += `Insufficient funds for desired product. We have returned your $${
      amountPaid / 100
    }`
    return console.log(response)
  }
  const totalChange = amountPaid - itemCost
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
