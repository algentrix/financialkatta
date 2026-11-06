export const calculatorTools = [
  {
    slug: "sip",
    title: "SIP calculator",
    description:
      "Estimate the maturity value of a monthly SIP from the amount, expected annual return and duration you enter. Illustrative only.",
    summary: "Monthly investment, expected return and a maturity illustration.",
  },
  {
    slug: "lumpsum",
    title: "Lumpsum calculator",
    description:
      "Estimate a future value for a one-time investment using the annual return and duration you enter. Illustrative only.",
    summary: "One-time investment compounded monthly at the rate you enter.",
  },
  {
    slug: "stp",
    title: "STP calculator",
    description:
      "Illustrate a monthly transfer from a source amount to a destination, with separate expected returns for each.",
    summary: "Source balance, monthly transfer and two expected returns.",
  },
  {
    slug: "swp",
    title: "SWP calculator",
    description:
      "Illustrate a monthly withdrawal from a corpus and the estimated balance that remains.",
    summary: "Corpus, monthly withdrawal and an expected return.",
  },
  {
    slug: "emi",
    title: "Loan EMI calculator",
    description:
      "Calculate an illustrative monthly EMI, total interest and a reducing-balance schedule from the loan figures you enter.",
    summary: "Loan amount, interest rate, EMI and an amortization schedule.",
  },
] as const

export type CalculatorSlug = (typeof calculatorTools)[number]["slug"]

export function getCalculator(slug: string) {
  return calculatorTools.find((tool) => tool.slug === slug)
}
