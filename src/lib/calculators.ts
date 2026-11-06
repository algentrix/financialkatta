export type SipResult = {
  invested: number
  estimatedReturns: number
  maturity: number
}

export type LumpsumResult = {
  principal: number
  estimatedReturns: number
  futureValue: number
}

export type StpResult = {
  sourceRemaining: number
  destinationValue: number
  totalTransferred: number
  depleted: boolean
}

export type SwpResult = {
  remaining: number
  totalWithdrawn: number
  monthsRun: number
  depleted: boolean
}

export type EmiRow = {
  month: number
  opening: number
  payment: number
  interest: number
  principal: number
  closing: number
}

export type EmiResult = {
  emi: number
  totalInterest: number
  totalPayment: number
  schedule: EmiRow[]
}

function monthlyRate(annualPercent: number) {
  return annualPercent / 100 / 12
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100
}

function requireMonths(months: number) {
  if (!Number.isInteger(months) || months < 1) {
    throw new Error("Duration must be at least one month.")
  }
}

/** Beginning-of-month SIP. Annual rate is treated as a nominal rate compounded monthly. */
export function calculateSip(monthly: number, annualRate: number, months: number): SipResult {
  requireMonths(months)
  const invested = monthly * months
  const rate = monthlyRate(annualRate)
  const maturity =
    rate === 0 ? invested : monthly * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate)
  const roundedMaturity = roundMoney(maturity)
  return {
    invested: roundMoney(invested),
    maturity: roundedMaturity,
    estimatedReturns: roundMoney(roundedMaturity - invested),
  }
}

/** Nominal annual rate compounded monthly. */
export function calculateLumpsum(principal: number, annualRate: number, months: number): LumpsumResult {
  requireMonths(months)
  const futureValue = principal * Math.pow(1 + monthlyRate(annualRate), months)
  const rounded = roundMoney(futureValue)
  return {
    principal: roundMoney(principal),
    futureValue: rounded,
    estimatedReturns: roundMoney(rounded - principal),
  }
}

/**
 * Each month the source and destination compound, then the transfer moves
 * from source to destination, limited by the source balance.
 * After the source is exhausted, the destination keeps compounding.
 */
export function calculateStp(
  sourceStart: number,
  monthlyTransfer: number,
  sourceAnnualRate: number,
  destinationAnnualRate: number,
  months: number,
): StpResult {
  requireMonths(months)
  let source = sourceStart
  let destination = 0
  let transferred = 0
  let depleted = false
  const sourceRate = monthlyRate(sourceAnnualRate)
  const destinationRate = monthlyRate(destinationAnnualRate)

  for (let month = 0; month < months; month += 1) {
    source *= 1 + sourceRate
    destination *= 1 + destinationRate
    const move = Math.min(monthlyTransfer, Math.max(0, source))
    source -= move
    destination += move
    transferred += move
    if (move + 0.005 < monthlyTransfer) depleted = true
  }

  return {
    sourceRemaining: roundMoney(Math.max(0, source)),
    destinationValue: roundMoney(Math.max(0, destination)),
    totalTransferred: roundMoney(transferred),
    depleted,
  }
}

/** Each month the corpus compounds, then the withdrawal is deducted. */
export function calculateSwp(
  corpus: number,
  monthlyWithdrawal: number,
  annualRate: number,
  months: number,
): SwpResult {
  requireMonths(months)
  let balance = corpus
  let withdrawn = 0
  let monthsRun = 0
  let depleted = false
  const rate = monthlyRate(annualRate)

  for (let month = 0; month < months; month += 1) {
    balance *= 1 + rate
    const take = Math.min(monthlyWithdrawal, Math.max(0, balance))
    balance -= take
    withdrawn += take
    monthsRun += 1
    if (take + 0.005 < monthlyWithdrawal) {
      depleted = true
      balance = 0
      break
    }
  }

  return {
    remaining: roundMoney(Math.max(0, balance)),
    totalWithdrawn: roundMoney(withdrawn),
    monthsRun,
    depleted,
  }
}

/** Reducing-balance EMI. Nominal annual rate divided by 12. Amounts are rounded to paise. */
export function calculateEmi(principal: number, annualRate: number, months: number): EmiResult {
  requireMonths(months)
  const principalPaise = Math.round(principal * 100)
  const rate = monthlyRate(annualRate)
  const emiPaise =
    rate === 0
      ? Math.round(principalPaise / months)
      : Math.round((principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) * 100)

  let balance = principalPaise
  const schedule: EmiRow[] = []

  for (let month = 1; month <= months; month += 1) {
    const opening = balance
    const interest = rate === 0 ? 0 : Math.round(balance * rate)
    let principalPart = emiPaise - interest
    let payment = emiPaise
    if (principalPart >= balance || month === months) {
      principalPart = balance
      payment = principalPart + interest
    }
    if (principalPart < 0) principalPart = 0
    balance = Math.max(0, opening - principalPart)
    schedule.push({
      month,
      opening: opening / 100,
      payment: payment / 100,
      interest: interest / 100,
      principal: principalPart / 100,
      closing: balance / 100,
    })
    if (balance === 0) break
  }

  const totalPayment = roundMoney(schedule.reduce((sum, row) => sum + row.payment, 0))
  const totalInterest = roundMoney(schedule.reduce((sum, row) => sum + row.interest, 0))

  return {
    emi: emiPaise / 100,
    totalInterest,
    totalPayment,
    schedule,
  }
}
