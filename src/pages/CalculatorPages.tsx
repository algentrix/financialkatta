import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { calculatorTools, getCalculator, type CalculatorSlug } from "../content/calculators"
import {
  calculateEmi,
  calculateLumpsum,
  calculateSip,
  calculateStp,
  calculateSwp,
} from "../lib/calculators"
import { formatInr, inrScale, parseAmount } from "../lib/format"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { TextField } from "../components/Fields"
import { PageHero } from "../components/PageChrome"
import { Seo } from "../components/Seo"
import { WhatsAppLink } from "../components/WhatsAppLink"
import { NotFoundPage } from "./NotFoundPage"

const assumptions: Record<CalculatorSlug, string> = {
  sip: "Monthly investments are treated as made at the beginning of each month. The annual rate is a nominal rate, divided by 12 and compounded monthly. Costs, taxes and exit loads are not included.",
  lumpsum:
    "The amount compounds monthly. The annual rate is treated as a nominal rate divided by 12. Costs, taxes and exit loads are not included.",
  stp: "Each month, the source and destination balances compound at their own monthly rates. The transfer is then moved from source to destination, limited by the source balance. If the source runs out, the destination keeps compounding for the remaining months.",
  swp: "Each month, the corpus compounds and then the withdrawal is deducted. If the balance cannot fund a full withdrawal, the illustration stops.",
  emi: "This is a reducing-balance schedule. The annual rate is nominal and is divided by 12. Amounts are rounded to paise. A lender may add fees or round differently. This is not a sanction.",
}

export function CalculatorsPage() {
  const meta = pageMeta("/calculators")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Calculators"
        title="Financial calculators"
        lede="Five illustrations you can change. The output uses your figures. It is not a forecast, a guaranteed maturity or a loan offer."
        crumbs={[{ label: "Home", to: "/" }, { label: "Calculators" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-14 sm:grid-cols-2">
        {calculatorTools.map((tool) => (
          <Link key={tool.slug} to={`/calculators/${tool.slug}`} className="flex h-full flex-col border border-line bg-white p-7 transition hover:border-leaf hover:bg-mint">
            <h2 className="font-serif text-3xl text-ink">{tool.title}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{tool.summary}</p>
            <span className="mt-6 text-base font-bold text-leaf">Open calculator</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export function CalculatorPage() {
  const { tool = "" } = useParams()
  const calculator = getCalculator(tool)
  if (!calculator) return <NotFoundPage />
  return <CalculatorForm key={calculator.slug} slug={calculator.slug} />
}

function CalculatorForm({ slug }: { slug: CalculatorSlug }) {
  const calculator = calculatorTools.find((item) => item.slug === slug)!
  const meta = pageMeta(`/calculators/${slug}`)
  const [values, setValues] = useState(() => initialValues(slug))

  function update(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const outcome = useMemo(() => compute(slug, values), [slug, values])

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Calculators"
        title={calculator.title}
        lede={calculator.description}
        crumbs={[{ label: "Home", to: "/" }, { label: "Calculators", to: "/calculators" }, { label: calculator.title }]}
      />
      <div className="mx-auto grid min-w-0 max-w-6xl gap-8 px-5 py-14 lg:grid-cols-12">
        <form className="min-w-0 space-y-5 border border-line bg-white p-6 sm:p-8 lg:col-span-5" onSubmit={(event) => event.preventDefault()}>
          <h2 className="font-serif text-2xl text-ink">Enter your figures</h2>
          <p className="text-sm text-muted">The boxes below are filled with an example. Click a box and type your own numbers. Nothing is saved.</p>
          {fieldsFor(slug).map((field) => (
            <TextField
              key={field.key}
              id={field.key}
              label={field.label}
              value={values[field.key] ?? ""}
              onChange={(value) => update(field.key, value)}
              suffix={field.suffix}
              hint={field.hint}
              inputMode="decimal"
              error={outcome.errors[field.key]}
            />
          ))}
          <p className="text-sm leading-relaxed text-muted">{assumptions[slug]}</p>
        </form>
        <section className="min-w-0 lg:col-span-7" aria-live="polite">
          <div className="border-t border-line bg-white p-6 sm:p-8">
            <h2 className="font-serif text-3xl text-navy">Illustrative estimate</h2>
            {slug === "emi" ? (
              <p className="mt-3 text-sm leading-relaxed text-ink">
                This schedule is a mathematical illustration, not a lender’s offer and not a confirmation of eligibility.
              </p>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-ink">
                All investment calculator outputs are illustrative estimates and not guaranteed returns. Changing the rate
                changes the picture. A scheme can do worse than the rate you typed.
              </p>
            )}
            {outcome.result ? <ResultView slug={slug} result={outcome.result} /> : (
              <p className="mt-6 text-sm text-muted">Correct the highlighted fields to see an illustration.</p>
            )}
            <WhatsAppLink
              intent="calculator"
              className="mt-8 inline-flex items-center gap-2 bg-emerald px-5 py-3 text-sm font-semibold text-white"
            >
              Discuss this on WhatsApp
            </WhatsAppLink>
          </div>
          <p className="mt-4 text-sm text-muted">
            Read the <Link to="/disclaimer" className="font-semibold text-emerald">financial disclaimer</Link> before acting on a number.
          </p>
        </section>
      </div>
    </>
  )
}

type Values = Record<string, string>
type Field = { key: string; label: string; suffix?: string; hint?: string }
type Result =
  | { kind: "sip"; invested: number; estimatedReturns: number; maturity: number }
  | { kind: "lumpsum"; principal: number; estimatedReturns: number; futureValue: number }
  | { kind: "stp"; sourceRemaining: number; destinationValue: number; totalTransferred: number; depleted: boolean }
  | { kind: "swp"; remaining: number; totalWithdrawn: number; monthsRun: number; requested: number; depleted: boolean }
  | { kind: "emi"; emi: number; totalInterest: number; totalPayment: number; schedule: ReturnType<typeof calculateEmi>["schedule"] }

function initialValues(slug: CalculatorSlug): Values {
  if (slug === "sip") return { monthly: "10000", rate: "12", years: "10", months: "0" }
  if (slug === "lumpsum") return { amount: "100000", rate: "12", years: "10", months: "0" }
  if (slug === "stp") return { source: "500000", transfer: "10000", sourceRate: "7", destinationRate: "12", years: "3", months: "0" }
  if (slug === "swp") return { corpus: "1000000", withdrawal: "10000", rate: "8", years: "10", months: "0" }
  return { amount: "2500000", rate: "8.5", years: "20", months: "0" }
}

function fieldsFor(slug: CalculatorSlug): Field[] {
  const duration: Field[] = [
    { key: "years", label: "Years", hint: "Whole number from 0 to 40." },
    { key: "months", label: "Additional months", hint: "Whole number from 0 to 11." },
  ]
  if (slug === "sip") {
    return [
      { key: "monthly", label: "Monthly investment", suffix: "INR", hint: "Between ₹500 and ₹1 crore." },
      { key: "rate", label: "Expected annual return", suffix: "%", hint: "An assumption from 0 to 30. Not a forecast." },
      ...duration,
    ]
  }
  if (slug === "lumpsum") {
    return [
      { key: "amount", label: "Initial investment", suffix: "INR", hint: "Between ₹500 and ₹100 crore." },
      { key: "rate", label: "Expected annual return", suffix: "%", hint: "An assumption from 0 to 30. Not a forecast." },
      ...duration,
    ]
  }
  if (slug === "stp") {
    return [
      { key: "source", label: "Initial source investment", suffix: "INR" },
      { key: "transfer", label: "Monthly transfer", suffix: "INR" },
      { key: "sourceRate", label: "Expected source return", suffix: "%", hint: "0 to 30 percent, nominal annual." },
      { key: "destinationRate", label: "Expected destination return", suffix: "%", hint: "0 to 30 percent, nominal annual." },
      ...duration,
    ]
  }
  if (slug === "swp") {
    return [
      { key: "corpus", label: "Initial corpus", suffix: "INR" },
      { key: "withdrawal", label: "Monthly withdrawal", suffix: "INR" },
      { key: "rate", label: "Expected annual return", suffix: "%", hint: "An assumption from 0 to 30. Not a forecast." },
      ...duration,
    ]
  }
  return [
    { key: "amount", label: "Loan amount", suffix: "INR", hint: "Between ₹10,000 and ₹100 crore." },
    { key: "rate", label: "Annual interest rate", suffix: "%", hint: "Nominal annual rate from 0 to 36." },
    ...duration,
  ]
}

function compute(slug: CalculatorSlug, values: Values): { errors: Record<string, string>; result: Result | null } {
  const errors: Record<string, string> = {}
  const duration = readDuration(values, errors)
  if (slug === "sip") {
    const monthly = readMoney(values.monthly, 500, 1_00_00_000, "Monthly investment", errors, "monthly")
    const rate = readRate(values.rate, 30, "Expected annual return", errors, "rate")
    if (monthly === null || rate === null || duration === null) return { errors, result: null }
    const result = calculateSip(monthly, rate, duration)
    return { errors, result: { kind: "sip", ...result } }
  }
  if (slug === "lumpsum") {
    const amount = readMoney(values.amount, 500, 100_00_00_000, "Initial investment", errors, "amount")
    const rate = readRate(values.rate, 30, "Expected annual return", errors, "rate")
    if (amount === null || rate === null || duration === null) return { errors, result: null }
    const result = calculateLumpsum(amount, rate, duration)
    return { errors, result: { kind: "lumpsum", ...result } }
  }
  if (slug === "stp") {
    const source = readMoney(values.source, 500, 100_00_00_000, "Source investment", errors, "source")
    const transfer = readMoney(values.transfer, 100, 1_00_00_000, "Monthly transfer", errors, "transfer")
    const sourceRate = readRate(values.sourceRate, 30, "Source return", errors, "sourceRate")
    const destinationRate = readRate(values.destinationRate, 30, "Destination return", errors, "destinationRate")
    if (source === null || transfer === null || sourceRate === null || destinationRate === null || duration === null) {
      return { errors, result: null }
    }
    const result = calculateStp(source, transfer, sourceRate, destinationRate, duration)
    return { errors, result: { kind: "stp", ...result } }
  }
  if (slug === "swp") {
    const corpus = readMoney(values.corpus, 500, 100_00_00_000, "Corpus", errors, "corpus")
    const withdrawal = readMoney(values.withdrawal, 100, 1_00_00_000, "Monthly withdrawal", errors, "withdrawal")
    const rate = readRate(values.rate, 30, "Expected annual return", errors, "rate")
    if (corpus === null || withdrawal === null || rate === null || duration === null) return { errors, result: null }
    const result = calculateSwp(corpus, withdrawal, rate, duration)
    return { errors, result: { kind: "swp", ...result, requested: duration } }
  }
  const amount = readMoney(values.amount, 10_000, 100_00_00_000, "Loan amount", errors, "amount")
  const rate = readRate(values.rate, 36, "Interest rate", errors, "rate")
  if (amount === null || rate === null || duration === null) return { errors, result: null }
  const result = calculateEmi(amount, rate, duration)
  return { errors, result: { kind: "emi", ...result } }
}

function readDuration(values: Values, errors: Record<string, string>) {
  const years = readWhole(values.years, 0, 40, "Years", errors, "years")
  const months = readWhole(values.months, 0, 11, "Months", errors, "months")
  if (years === null || months === null) return null
  const total = years * 12 + months
  if (total < 1) {
    errors.years = "Choose at least 1 month in total."
    return null
  }
  return total
}

function readWhole(raw: string | undefined, min: number, max: number, label: string, errors: Record<string, string>, key: string) {
  const text = (raw ?? "").trim()
  if (!/^\d+$/.test(text)) {
    errors[key] = `${label} must be a whole number.`
    return null
  }
  const value = Number(text)
  if (value < min || value > max) {
    errors[key] = `${label} must be between ${min} and ${max}.`
    return null
  }
  return value
}

function readMoney(raw: string | undefined, min: number, max: number, label: string, errors: Record<string, string>, key: string) {
  const value = parseAmount(raw ?? "")
  if (value === null || value <= 0) {
    errors[key] = `Enter ${label.toLowerCase()} in rupees.`
    return null
  }
  if (value < min || value > max) {
    errors[key] = `${label} must be between ${formatInr(min)} and ${formatInr(max)}.`
    return null
  }
  return value
}

function readRate(raw: string | undefined, max: number, label: string, errors: Record<string, string>, key: string) {
  const value = parseAmount(raw ?? "")
  if (value === null) {
    errors[key] = `Enter ${label.toLowerCase()}.`
    return null
  }
  if (value < 0 || value > max) {
    errors[key] = `${label} must be between 0 and ${max} percent.`
    return null
  }
  return value
}

function ResultView({ slug, result }: { slug: CalculatorSlug; result: Result }) {
  if (result.kind === "sip") {
    return (
      <div className="mt-6 space-y-6">
        <Stat label="Total invested" value={result.invested} />
        <Stat label="Estimated returns" value={result.estimatedReturns} />
        <Stat label="Estimated maturity value" value={result.maturity} emphasis />
        <SplitBar leftLabel="Invested" left={result.invested} rightLabel="Estimated returns" right={Math.max(0, result.estimatedReturns)} />
      </div>
    )
  }
  if (result.kind === "lumpsum") {
    return (
      <div className="mt-6 space-y-6">
        <Stat label="Initial investment" value={result.principal} />
        <Stat label="Estimated returns" value={result.estimatedReturns} />
        <Stat label="Estimated future value" value={result.futureValue} emphasis />
        <SplitBar leftLabel="Invested" left={result.principal} rightLabel="Estimated returns" right={Math.max(0, result.estimatedReturns)} />
      </div>
    )
  }
  if (result.kind === "stp") {
    return (
      <div className="mt-6 space-y-6">
        <Stat label="Estimated source remaining" value={result.sourceRemaining} />
        <Stat label="Estimated destination value" value={result.destinationValue} emphasis />
        <Stat label="Amount transferred" value={result.totalTransferred} />
        {result.depleted ? (
          <p className="text-sm leading-relaxed text-ink">
            The source could not fund every transfer. Later months compound only the destination at the rate you entered.
          </p>
        ) : null}
      </div>
    )
  }
  if (result.kind === "swp") {
    return (
      <div className="mt-6 space-y-6">
        <Stat label="Estimated remaining balance" value={result.remaining} emphasis />
        <Stat label="Total withdrawn" value={result.totalWithdrawn} />
        <p className="text-sm text-ink">
          Withdrawals illustrated for {result.monthsRun} of {result.requested} months.
        </p>
        {result.depleted ? (
          <p className="text-sm leading-relaxed text-ink">The corpus was used up before the duration you selected.</p>
        ) : null}
      </div>
    )
  }
  if (slug === "emi" && result.kind === "emi") {
    return (
      <div className="mt-6 space-y-6">
        <Stat label="Monthly EMI" value={result.emi} digits={2} emphasis />
        <Stat label="Total interest" value={result.totalInterest} digits={2} />
        <Stat label="Total repayment" value={result.totalPayment} digits={2} />
        <SplitBar leftLabel="Principal" left={result.totalPayment - result.totalInterest} rightLabel="Interest" right={result.totalInterest} />
        <div className="max-h-96 max-w-full overflow-auto border border-line bg-white">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">Illustrative amortization schedule</caption>
            <thead className="sticky top-0 bg-navy text-white">
              <tr>
                {["Month", "Opening", "Interest", "Principal", "Payment", "Closing"].map((heading) => (
                  <th key={heading} scope="col" className="px-3 py-2 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((row) => (
                <tr key={row.month} className="border-t border-line">
                  <th scope="row" className="px-3 py-2 font-medium text-navy">
                    {row.month}
                  </th>
                  <td className="px-3 py-2">{formatInr(row.opening, 2)}</td>
                  <td className="px-3 py-2">{formatInr(row.interest, 2)}</td>
                  <td className="px-3 py-2">{formatInr(row.principal, 2)}</td>
                  <td className="px-3 py-2">{formatInr(row.payment, 2)}</td>
                  <td className="px-3 py-2">{formatInr(row.closing, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  return null
}

function Stat({ label, value, digits = 0, emphasis = false }: { label: string; value: number; digits?: number; emphasis?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald">{label}</p>
      <p className={`mt-1 font-serif text-navy ${emphasis ? "text-4xl" : "text-3xl"}`}>{formatInr(value, digits)}</p>
      <p className="text-sm text-muted">{inrScale(value)}</p>
    </div>
  )
}

function SplitBar({ leftLabel, left, rightLabel, right }: { leftLabel: string; left: number; rightLabel: string; right: number }) {
  const total = left + right
  const leftPct = total <= 0 ? 0 : Math.min(100, (left / total) * 100)
  return (
    <div>
      <div className="flex h-3 overflow-hidden bg-gold/40" role="img" aria-label={`${leftLabel} ${Math.round(leftPct)} percent, ${rightLabel} ${Math.round(100 - leftPct)} percent`}>
        <div className="bg-navy" style={{ width: `${leftPct}%` }} />
      </div>
      <div className="mt-2 flex justify-between gap-4 text-xs text-muted">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}
