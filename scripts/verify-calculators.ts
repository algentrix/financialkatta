import { calculateEmi, calculateLumpsum, calculateSip, calculateStp, calculateSwp } from "../src/lib/calculators.ts"

function near(actual: number, expected: number, tolerance: number, label: string) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`)
  }
}

const sip = calculateSip(10000, 12, 120)
near(sip.invested, 1200000, 0.01, "SIP invested")
near(sip.maturity, 2323390.76, 0.05, "SIP maturity")
near(sip.estimatedReturns, sip.maturity - sip.invested, 0.02, "SIP gain")

const idleSip = calculateSip(5000, 0, 24)
near(idleSip.maturity, 120000, 0.01, "SIP at zero rate")

const lump = calculateLumpsum(100000, 12, 120)
near(lump.futureValue, 330038.69, 0.05, "Lumpsum future value")
near(calculateLumpsum(250000, 0, 36).futureValue, 250000, 0.01, "Lumpsum at zero rate")

const stp = calculateStp(30000, 10000, 0, 0, 2)
near(stp.sourceRemaining, 10000, 0.01, "STP source")
near(stp.destinationValue, 20000, 0.01, "STP destination")
near(stp.totalTransferred, 20000, 0.01, "STP transferred")

const depleted = calculateStp(15000, 10000, 0, 0, 3)
if (!depleted.depleted) throw new Error("STP should flag a shortfall")
near(depleted.sourceRemaining, 0, 0.05, "Depleted STP source")

const swp = calculateSwp(120000, 10000, 0, 12)
near(swp.remaining, 0, 0.01, "SWP remaining")
near(swp.totalWithdrawn, 120000, 0.01, "SWP withdrawn")
if (swp.depleted) throw new Error("A corpus that exactly covers the withdrawals is not a shortfall")

const shortSwp = calculateSwp(25000, 10000, 0, 6)
if (!shortSwp.depleted || shortSwp.monthsRun !== 3) {
  throw new Error(`SWP depletion timing failed: ${shortSwp.monthsRun}`)
}

const emi = calculateEmi(1000000, 9, 240)
near(emi.emi, 8997.26, 0.01, "EMI")
const principalPaid = emi.schedule.reduce((sum, row) => sum + row.principal, 0)
near(principalPaid, 1000000, 1, "EMI principal")
if (emi.schedule.at(-1)?.closing !== 0) throw new Error("EMI schedule should close at zero")
near(emi.totalPayment, emi.totalInterest + principalPaid, 1, "EMI totals")

const zeroEmi = calculateEmi(120000, 0, 12)
near(zeroEmi.emi, 10000, 0.01, "Zero-interest EMI")
near(zeroEmi.totalInterest, 0, 0.01, "Zero-interest total")

const higher = calculateSip(10000, 10, 120)
if (higher.maturity >= sip.maturity) throw new Error("A higher rate should mature higher")

console.log("Calculator checks passed.")
