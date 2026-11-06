import { existsSync, readFileSync } from "node:fs"
import { calculateEmi, calculateLumpsum, calculateSip, calculateStp, calculateSwp } from "../src/lib/calculators.ts"

const failures: string[] = []
function check(name: string, condition: boolean, detail = "") {
  if (!condition) failures.push(`${name}${detail ? `: ${detail}` : ""}`)
}

function sipIndependent(monthly: number, annual: number, months: number) {
  const rate = annual / 100 / 12
  const invested = monthly * months
  const future = rate === 0 ? invested : monthly * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate)
  return { invested, future }
}

function lumpsumIndependent(principal: number, annual: number, months: number) {
  return principal * Math.pow(1 + annual / 100 / 12, months)
}

function stpIndependent(source: number, transfer: number, sourceAnnual: number, destinationAnnual: number, months: number) {
  let balance = source
  let destination = 0
  let moved = 0
  const sourceRate = sourceAnnual / 100 / 12
  const destinationRate = destinationAnnual / 100 / 12
  for (let month = 0; month < months; month += 1) {
    balance *= 1 + sourceRate
    destination *= 1 + destinationRate
    const move = Math.min(transfer, Math.max(0, balance))
    balance -= move
    destination += move
    moved += move
  }
  return { balance, destination, moved }
}

function swpIndependent(corpus: number, withdrawal: number, annual: number, months: number) {
  let balance = corpus
  let taken = 0
  const rate = annual / 100 / 12
  for (let month = 0; month < months; month += 1) {
    balance *= 1 + rate
    const take = Math.min(withdrawal, Math.max(0, balance))
    balance -= take
    taken += take
    if (take + 1e-6 < withdrawal) {
      balance = 0
      break
    }
  }
  return { balance, taken }
}

function emiIndependent(principal: number, annual: number, months: number) {
  const rate = annual / 100 / 12
  if (rate === 0) return principal / months
  const growth = Math.pow(1 + rate, months)
  return (principal * rate * growth) / (growth - 1)
}

const oneMonth = sipIndependent(1000, 12, 1)
check("SIP one month is 1010", Math.abs(oneMonth.future - 1010) < 1e-9, String(oneMonth.future))
check("SIP library matches one month", Math.abs(calculateSip(1000, 12, 1).maturity - 1010) < 0.01)

const sipTen = sipIndependent(10000, 12, 120)
check("SIP library matches 10 year case", Math.abs(calculateSip(10000, 12, 120).maturity - sipTen.future) < 0.02, String(sipTen.future))
check("Lumpsum one month is 1010", Math.abs(lumpsumIndependent(1000, 12, 1) - 1010) < 1e-9)
check(
  "Lumpsum library matches",
  Math.abs(calculateLumpsum(100000, 12, 120).futureValue - lumpsumIndependent(100000, 12, 120)) < 0.02,
)

const stpReference = stpIndependent(500000, 10000, 7, 12, 36)
const stpLibrary = calculateStp(500000, 10000, 7, 12, 36)
check("STP source matches", Math.abs(stpReference.balance - stpLibrary.sourceRemaining) < 0.02)
check("STP destination matches", Math.abs(stpReference.destination - stpLibrary.destinationValue) < 0.02)
check("STP transferred matches", Math.abs(stpReference.moved - stpLibrary.totalTransferred) < 0.02)
check("STP stays non-negative", stpLibrary.sourceRemaining >= 0 && stpLibrary.destinationValue >= 0)

const swpReference = swpIndependent(1000000, 10000, 8, 120)
const swpLibrary = calculateSwp(1000000, 10000, 8, 120)
check("SWP remaining matches", Math.abs(swpReference.balance - swpLibrary.remaining) < 0.05)
check("SWP withdrawn matches", Math.abs(swpReference.taken - swpLibrary.totalWithdrawn) < 0.05)
check("SWP stays non-negative", swpLibrary.remaining >= 0)

const publishedEmi: Array<[number, number, number, number]> = [
  [1_000_000, 9, 240, 8997.259558501704],
  [5_000_000, 8.5, 240, 43391.161668276705],
]
for (const [principal, rate, months, expected] of publishedEmi) {
  const independent = emiIndependent(principal, rate, months)
  const library = calculateEmi(principal, rate, months)
  check(`EMI formula ${principal}/${rate}`, Math.abs(independent - expected) < 0.001, String(independent))
  check(`EMI library ${principal}/${rate}`, Math.abs(library.emi - independent) < 0.02, String(library.emi))
}

let sweepFails = 0
const samples: string[] = []
for (const principal of [10_000, 99_999.99, 500_000, 2_500_000, 10_000_000]) {
  for (const rate of [0, 0.01, 1, 7.25, 8.5, 12, 18, 24, 36]) {
    for (const months of [1, 2, 6, 12, 13, 60, 240, 360, 480]) {
      const result = calculateEmi(principal, rate, months)
      const negative = result.schedule.some(
        (row) => row.opening < -0.001 || row.closing < -0.001 || row.principal < -0.001 || row.interest < -0.001 || row.payment < -0.001,
      )
      const principalPaise = result.schedule.reduce((sum, row) => sum + Math.round(row.principal * 100), 0)
      const closed = Math.abs(result.schedule.at(-1)?.closing ?? 1) <= 0.001
      if (negative || !closed || Math.abs(principalPaise - Math.round(principal * 100)) > 100) {
        sweepFails += 1
        if (samples.length < 6) {
          samples.push(`${principal}/${rate}/${months} closed=${closed} principalPaise=${principalPaise} negative=${negative}`)
        }
      }
    }
  }
}
check("EMI sweep has no negative balance and closes at zero", sweepFails === 0, `${sweepFails} ${samples.join(" | ")}`)

const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8")
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
check("Sitemap has 31 URLs", locations.length === 31, String(locations.length))
check(
  "robots.txt points at the sitemap",
  readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8").includes("https://www.financialkatta.com/sitemap.xml"),
)

const titles = new Set<string>()
for (const location of locations) {
  const path = location.replace("https://www.financialkatta.com", "") || "/"
  const file = path === "/" ? new URL("../dist/index.html", import.meta.url) : new URL(`../dist${path}/index.html`, import.meta.url)
  check(`Prerendered HTML ${path}`, existsSync(file))
  if (!existsSync(file)) continue
  const html = readFileSync(file, "utf8")
  const title = html.match(/<title[^>]*>(.*?)<\/title>/)?.[1] ?? ""
  const canonical = html.match(/rel="canonical" href="([^"]*)"/)?.[1] ?? ""
  const description = html.match(/name="description" content="([^"]*)"/)?.[1] ?? ""
  check(`Title ${path}`, title.includes("FinancialKatta") && title.length > 10, title)
  check(`Canonical ${path}`, canonical === location, `${canonical} vs ${location}`)
  check(`Description ${path}`, description.length > 40, description.slice(0, 60))
  check(`Unique title ${path}`, !titles.has(title), title)
  titles.add(title)
  check(`Bundle script ${path}`, html.includes("/assets/index-"))
}

check("Open Graph image", existsSync(new URL("../dist/og-image.png", import.meta.url)))
check("Favicon", existsSync(new URL("../dist/favicon.svg", import.meta.url)))
check("Built sitemap", existsSync(new URL("../dist/sitemap.xml", import.meta.url)))
check("Built robots", existsSync(new URL("../dist/robots.txt", import.meta.url)))

const advisor = readFileSync(new URL("../src/content/advisor.ts", import.meta.url), "utf8")
const testimonials = readFileSync(new URL("../src/content/testimonials.ts", import.meta.url), "utf8")
const partners = readFileSync(new URL("../src/content/partners.ts", import.meta.url), "utf8")
const site = readFileSync(new URL("../src/config/site.ts", import.meta.url), "utf8")
check("Advisor name published", advisor.includes("Prasad Prakashrao Chidrawar"))
check("Testimonials list is empty", testimonials.includes("Testimonial[] = []"))
check("Partners list is empty", partners.includes("Partner[] = []"))
check("Published ARN", site.includes('amfiArn: "272207"'))
check("No other ARN", !/ARN[-\s]*(?!272207\b)\d{3,}/i.test(site + advisor))
check("Referral URL blank", site.includes('referralUrl: ""'))

if (failures.length > 0) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log(`Audit checks passed. ${locations.length} routes, ${titles.size} titles, EMI sweep clean.`)
