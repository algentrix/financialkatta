import type { WhatsAppIntent } from "../config/site"

export type ServiceProduct = {
  name: string
  use: string
}

export type ServiceStart = {
  label: string
  href: string
  note: string
}

export type ServiceSection = {
  heading: string
  paragraphs: string[]
  points?: string[]
  pointsLabel?: string
  products?: ServiceProduct[]
}

export type ServicePage = {
  slug: string
  navLabel: string
  title: string
  description: string
  summary: string
  intro: string
  sections: ServiceSection[]
  risks: string[]
  intent: WhatsAppIntent
  calculators: { label: string; to: string }[]
  start?: ServiceStart
}

export const services: ServicePage[] = [
  {
    slug: "mutual-funds",
    navLabel: "Mutual Funds",
    title: "Mutual funds",
    description:
      "Understand equity, debt and hybrid mutual funds, SIPs, lumpsum investments, STP and SWP, and the risks that sit with each choice.",
    summary:
      "Pooled investments across equity, debt and hybrid schemes, including SIP, lumpsum, STP and SWP. Values move with the market.",
    intro:
      "A mutual fund pools money from many investors and invests it according to the scheme’s stated objective. You hold units. Their value is the net asset value, which changes as the underlying investments change.",
    intent: "mutualFunds",
    start: {
      label: "Get started",
      href: "https://www.assetplus.in/mfd/ARN-272207",
      note: "Hey, I'm inviting you to invest with me on AssetPlus — India's leading Mutual Fund Distribution Platform. Join an ever-growing network of smart investors and take the first step towards maximising your wealth today! Fill this form to join as my client today.",
    },
    calculators: [
      { label: "SIP calculator", to: "/calculators/sip" },
      { label: "Lumpsum calculator", to: "/calculators/lumpsum" },
      { label: "STP calculator", to: "/calculators/stp" },
      { label: "SWP calculator", to: "/calculators/swp" },
    ],
    sections: [
      {
        heading: "How a mutual fund works",
        paragraphs: [
          "The scheme information document explains where the money can be invested, what it costs and how you can enter or leave. Read that document and the riskometer before treating a scheme as suitable.",
          "Mutual fund units are not a bank deposit. They are not covered by deposit insurance. The amount you receive on redemption depends on the NAV on the applicable day, after any exit load.",
        ],
      },
      {
        heading: "Equity funds",
        paragraphs: [
          "Equity funds invest mainly in shares. The value can fall sharply and can stay down for a long time. They are worth discussing only when the money can stay invested through that kind of decline.",
          "A higher past return does not mean the next period will look the same. Sector and thematic funds concentrate risk further.",
        ],
      },
      {
        heading: "Debt funds",
        paragraphs: [
          "Debt funds invest in bonds, money-market instruments and other fixed-income securities. They can still lose value when interest rates move or when an issuer fails to pay.",
          "A debt fund is not a fixed deposit. Credit risk and interest-rate risk both remain, even when the portfolio looks quiet.",
        ],
      },
      {
        heading: "Hybrid funds",
        paragraphs: [
          "Hybrid funds mix equity and debt in a proportion described in the scheme documents. The mix, not the word “balanced”, tells you how much market risk you are taking.",
        ],
      },
      {
        heading: "SIP and lumpsum",
        paragraphs: [
          "A systematic investment plan invests a chosen amount on a regular date. It spreads the purchase dates. It does not remove market risk, and it does not guarantee a lower average cost.",
          "A lumpsum invests an amount at one time. The starting date has more influence on the outcome. Neither route is automatically better. The choice depends on when the money is available and when it will be needed.",
        ],
      },
      {
        heading: "STP and SWP",
        paragraphs: [
          "A systematic transfer plan moves money from one scheme to another in instalments. Both schemes can gain or lose value while the transfer is running.",
          "A systematic withdrawal plan pays a regular amount out of a scheme. Withdrawals and a falling market together can reduce the corpus faster than a straight-line illustration suggests.",
        ],
      },
      {
        heading: "What each option is used for",
        paragraphs: [
          "The scheme documents decide the actual portfolio. This list is only the everyday job of each route.",
        ],
        products: [
          { name: "Equity fund", use: "Used when the money can stay invested through sharp falls, usually for a goal that is many years away." },
          { name: "Debt fund", use: "Used for a more stable part of a portfolio. It can still fall when interest rates move or an issuer fails to pay." },
          { name: "Hybrid fund", use: "Used when you want one scheme that mixes shares and bonds. The mix in the document is the risk, not the word balanced." },
          { name: "SIP", use: "Used to invest a fixed amount on a regular date from monthly surplus. It spreads purchase dates. It does not remove market risk." },
          { name: "Lumpsum", use: "Used when a sum is already available and you invest it at one time." },
          { name: "STP", use: "Used to move money from one scheme to another in instalments, often from a quieter scheme into a growth scheme." },
          { name: "SWP", use: "Used to withdraw a regular amount from a scheme you already hold, for example in later years. Withdrawals can shrink the corpus." },
        ],
      },
      {
        heading: "Risk and investment horizon",
        paragraphs: [
          "Match the scheme category to the date the money is needed and to the decline you can accept without abandoning the goal. Money needed soon does not belong in a volatile equity scheme just because the long-term chart looks smooth.",
          "Costs, exit loads and taxes change what you keep. Tax treatment depends on the scheme category, the holding period and the law at the time of redemption.",
        ],
      },
    ],
    risks: [
      "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.",
      "Past performance is not a guide to future returns.",
      "Illustrations from the calculators on this website are not a projection of any scheme.",
    ],
  },
  {
    slug: "loans",
    navLabel: "Loans",
    title: "Loans",
    description:
      "Learn how home loans, personal loans, business loans and loans against property are assessed, and how EMIs and tenure change the total interest.",
    summary:
      "Home, personal, business and loan-against-property facilities. Approval depends on the lender, your income and the documents you submit.",
    intro:
      "A loan lets you use money now and repay it with interest over an agreed tenure. The lender decides whether to offer it. An enquiry, a calculator result or a conversation with FinancialKatta is not a sanction.",
    intent: "loans",
    calculators: [{ label: "Loan EMI calculator", to: "/calculators/emi" }],
    sections: [
      {
        heading: "Home loan",
        paragraphs: [
          "Used for buying, constructing or renovating a house. The property itself is the security. Tenures can go up to about 30 years. Because the loan is secured, the rate is usually lower than an unsecured personal loan.",
          "Tax benefits can be available under Sections 80C and 24(b) in the old tax regime. Whether they apply depends on the regime you use and the law at the time. This page is not tax advice. The lender still decides eligibility from income, existing EMIs, credit history and the property papers.",
        ],
      },
      {
        heading: "Loan against property (LAP)",
        paragraphs: [
          "Used when you mortgage a residential or commercial property you already own and borrow against the lender’s valuation. People use it for business expansion, education or another personal need.",
          "The rate is usually higher than a home loan and lower than a personal loan. If repayments are missed, the property used as security can be at risk.",
        ],
      },
      {
        heading: "Personal loan",
        paragraphs: [
          "Used when you need an unsecured loan with a flexible end use, such as a medical bill, a wedding, travel or consolidating other dues. Tenure is usually one to five years, and the interest rate is relatively high.",
          "Take it only if the EMI still fits after essential expenses and the loans you already pay.",
        ],
      },
      {
        heading: "Business loans",
        paragraphs: [
          "Used to fund a business need that you can name. The lender looks at the purpose, how long the business has run, income records and, where the product needs it, collateral.",
        ],
        products: [
          { name: "Term loan", use: "Used for expansion or for buying equipment, repaid over an agreed period." },
          { name: "Working capital, cash credit or overdraft", use: "Used for day-to-day operations, such as stock and receivables, within a limit the lender sets." },
          { name: "MSME and Mudra loans", use: "Used by small businesses under government-backed schemes. The scheme rules and the lender’s credit check both apply." },
          { name: "Invoice discounting or factoring", use: "Used to raise money against receivables instead of waiting for customers to pay." },
          { name: "Machinery or equipment loan", use: "Used to buy the machine or equipment the business needs to operate." },
        ],
      },
      {
        heading: "Eligibility",
        paragraphs: [
          "Lenders commonly look at age, income, employment or business stability, existing obligations, credit history and the property or other security. Meeting a thumb rule does not mean the loan will be approved.",
          "Interest rates, fees and insurance bundled with a loan should be read in the sanction terms before you sign.",
        ],
      },
      {
        heading: "EMI and repayment",
        paragraphs: [
          "An equated monthly instalment combines interest and principal. Early in the tenure, interest is usually the larger share. The EMI calculator on this website shows an illustrative schedule from the figures you enter.",
          "Missing EMIs can lead to charges and, for a secured loan, action against the security. Plan the EMI from income you can reasonably expect, not from a best month.",
        ],
      },
    ],
    risks: [
      "Loan approval, the interest rate and the sanctioned amount are decided by the lender.",
      "A calculator does not check eligibility and does not reserve a rate.",
      "Borrowing against property puts that property at risk if the loan is not repaid as agreed.",
    ],
  },
  {
    slug: "insurance",
    navLabel: "Insurance",
    title: "Insurance",
    description:
      "A plain-language guide to life, term, health, general, motor and personal accident insurance, including exclusions and why cover is not automatic.",
    summary:
      "Life, term, health, general, motor and personal accident cover. A policy pays only what its terms and your disclosures allow.",
    intro:
      "Insurance transfers a defined risk to an insurer in exchange for a premium. The policy wording decides the event, the amount and the exclusions. A conversation about cover is not a guarantee that a claim will be paid.",
    intent: "insurance",
    calculators: [],
    sections: [
      {
        heading: "Life insurance",
        paragraphs: [
          "Used to provide money to the family or nominee if the insured person dies. Some policies also pay a maturity benefit or an investment-related benefit. What is paid depends on the policy.",
          "Example: a person buys a term policy of ₹1 crore. If the insured person dies during the term, the nominee receives ₹1 crore, subject to the policy conditions.",
        ],
        products: [
          { name: "Term insurance", use: "Used for a high life cover over a fixed period. The nominee is paid the sum assured if the insured dies during the term." },
          { name: "Whole life insurance", use: "Used for life cover that continues for the insured person’s life, subject to the policy terms." },
          { name: "Endowment plan", use: "Used when you want life cover together with a savings benefit, paid on maturity or on death as the policy specifies." },
          { name: "Money back policy", use: "Used when you want periodic payouts during the term as well as life cover." },
          { name: "ULIP", use: "Used when you want life cover and a market-linked investment in one policy. The investment value can fall." },
          { name: "Child insurance plan", use: "Used by parents who want a fund earmarked for a child’s education and future needs, together with the life cover the policy describes." },
          { name: "Pension or retirement plan", use: "Used to build a retirement corpus and, where the policy says so, to receive income after retirement." },
          { name: "Annuity plan", use: "Used to receive a regular income in exchange for a lump sum or an accumulated retirement corpus." },
          { name: "Group life insurance", use: "Used to give life cover to employees or members of an organisation under one arrangement." },
        ],
      },
      {
        heading: "Health insurance",
        paragraphs: [
          "Used to pay eligible medical expenses from illness, accidents, hospitalisation and certain other healthcare needs. The sum insured is not the same as the amount you will receive.",
          "Example: a policy has a sum insured of ₹10 lakh. If a covered hospital bill is ₹5 lakh, the insurer pays the admissible amount under the policy terms.",
        ],
        products: [
          { name: "Individual health insurance", use: "Used to cover one person for eligible medical expenses." },
          { name: "Family floater", use: "Used to cover several family members under one shared sum insured." },
          { name: "Senior citizen health insurance", use: "Used for people who are generally 60 or older." },
          { name: "Critical illness insurance", use: "Used to pay a lump sum if a specified critical illness is diagnosed, subject to the policy." },
          { name: "Personal accident insurance", use: "Used for accidental death, disability and other covered accidental injuries. Illness is usually outside this cover." },
          { name: "Top-up health insurance", use: "Used for extra cover after a stated deductible on a single claim is crossed." },
          { name: "Super top-up health insurance", use: "Used for extra cover after eligible claims in the policy year add up past the deductible." },
          { name: "Group health insurance", use: "Used by an employer to cover employees." },
          { name: "Maternity insurance", use: "Used for specified pregnancy, delivery and related expenses, usually after a waiting period and within limits." },
          { name: "Disease-specific insurance", use: "Used for one named disease or medical condition rather than general hospitalisation." },
          { name: "OPD insurance", use: "Used for eligible outpatient costs such as consultations, tests and prescribed medicines." },
          { name: "Overseas medical insurance", use: "Used for eligible medical emergencies while travelling outside India." },
        ],
      },
      {
        heading: "Motor insurance",
        paragraphs: [
          "Used to protect a vehicle owner against accidents, theft, damage and legal liability to other people. Third-party cover is mandatory for a vehicle used in a public place in India.",
        ],
        products: [
          { name: "Third-party insurance", use: "Used to meet legal liability for injury, death or property damage caused to a third party." },
          { name: "Comprehensive insurance", use: "Used for third-party liability and for damage to your own vehicle, subject to the policy." },
          { name: "Standalone own-damage insurance", use: "Used for damage to the insured vehicle. The mandatory third-party policy still has to be bought separately." },
          { name: "Two-wheeler insurance", use: "Used for motorcycles and scooters." },
          { name: "Commercial vehicle insurance", use: "Used for vehicles that earn income, such as taxis, trucks and buses." },
        ],
        pointsLabel: "Popular motor insurance add-ons",
        points: [
          "Zero depreciation cover",
          "Roadside assistance",
          "Engine protection",
          "Return to invoice",
          "Consumables cover",
          "Key replacement",
          "Tyre protection",
          "Personal belongings cover",
        ],
      },
      {
        heading: "Travel insurance",
        paragraphs: [
          "Used to cover specified losses on a domestic or international journey, such as a medical emergency, lost baggage or a cancelled trip.",
        ],
        products: [
          { name: "International travel insurance", use: "Used for eligible medical emergencies and travel losses outside India." },
          { name: "Domestic travel insurance", use: "Used for a journey inside India." },
          { name: "Student travel insurance", use: "Used by students who are studying overseas." },
          { name: "Senior citizen travel insurance", use: "Used by older travellers, on the terms written for that age." },
          { name: "Corporate travel insurance", use: "Used for employees travelling on business." },
          { name: "Multi-trip travel insurance", use: "Used when several trips fall inside one policy period." },
        ],
        pointsLabel: "Benefits travel policies often include",
        points: [
          "Emergency medical expenses",
          "Loss of baggage",
          "Passport loss",
          "Flight cancellation or delay",
          "Trip cancellation or interruption",
          "Personal accident cover",
        ],
      },
      {
        heading: "Property and home insurance",
        paragraphs: [
          "Used to protect a home, a building or the things inside it against risks the policy names, such as fire or burglary.",
        ],
        products: [
          { name: "Home building insurance", use: "Used to cover the residential building against the risks named in the policy." },
          { name: "Home contents insurance", use: "Used to cover household belongings such as furniture, appliances and electronics." },
          { name: "Fire insurance", use: "Used for specified losses from fire and the other perils the policy lists with it." },
          { name: "Burglary insurance", use: "Used for specified losses from burglary or theft." },
          { name: "Shop insurance", use: "Used to protect a shop’s premises, stock and other insured assets." },
          { name: "Office insurance", use: "Used to cover an office, its equipment and its contents against insured risks." },
        ],
      },
      {
        heading: "Commercial and business insurance",
        paragraphs: [
          "Used to protect a business against losses from accidents, liabilities, employees and interruptions, as each policy defines them.",
        ],
        products: [
          { name: "Marine insurance", use: "Used to cover goods and cargo in transit by sea, air, road or rail, on the policy terms." },
          { name: "Fire and special perils", use: "Used to cover insured property against fire and the other perils named in the policy." },
          { name: "Machinery breakdown", use: "Used for accidental physical damage to insured machinery." },
          { name: "Engineering insurance", use: "Used for specified risks in construction, erection and engineering projects." },
          { name: "Business interruption", use: "Used for a specified loss of business income after insured damage." },
          { name: "Public liability", use: "Used for specified legal liability towards members of the public." },
          { name: "Professional indemnity", use: "Used for specified claims of professional negligence." },
          { name: "Product liability", use: "Used for specified legal liability arising from a defective product." },
          { name: "Cyber insurance", use: "Used for specified financial losses from a cyber incident." },
          { name: "Workmen compensation", use: "Used for an employer’s liability for specified employee injuries or occupational disease." },
          { name: "Directors and officers (D&O)", use: "Used to protect directors and officers against specified claims about their management decisions." },
          { name: "Fidelity guarantee", use: "Used for specified financial loss caused by an employee’s dishonesty." },
        ],
      },
    ],
    risks: [
      "Insurance is a contract. Coverage, exclusions and claim assessment belong to the insurer and the policy wording.",
      "FinancialKatta does not guarantee that a proposal will be accepted or that a claim will be paid.",
    ],
  },
  {
    slug: "bonds",
    navLabel: "Bonds",
    title: "Bonds",
    description:
      "Understand government securities, corporate bonds, yield, maturity, tax treatment and the credit, interest-rate and liquidity risks in bond investing.",
    summary:
      "Government securities and corporate bonds. Yield, maturity, tax and the risks of credit, interest rates and liquidity.",
    intro:
      "A bond is a way of lending to an issuer. The issuer sets out the interest and the date the face value is due. That promise can be delayed or broken, and the price you can get before maturity can change.",
    intent: "bonds",
    calculators: [],
    sections: [
      {
        heading: "Government securities",
        paragraphs: [
          "Government securities are issued by the government. Credit risk is generally considered low relative to a corporate bond. The market price can still move when interest rates change, so a sale before maturity can be at a profit or a loss.",
        ],
      },
      {
        heading: "Corporate bonds",
        paragraphs: [
          "Companies and other institutions issue bonds to borrow. Credit risk is the chance that the issuer does not pay interest or principal on time. A credit rating is an opinion. It is not a guarantee, and it can change.",
        ],
      },
      {
        heading: "Taxable and tax-free bonds",
        paragraphs: [
          "Interest and gains may be taxable. Some instruments issued under a specific notification have been described as tax-free. That treatment depends on the instrument and on the law, and it is not a feature of bonds in general.",
          "Do not treat a bond as tax-free unless the offer document says so. Tax rules and your own situation can change the result. This page is not tax advice.",
        ],
      },
      {
        heading: "Yield and maturity",
        paragraphs: [
          "The coupon is the interest rate printed on the bond. The yield is the return implied by the price you pay, the coupons and the time left to maturity. Buying above or below face value makes the yield different from the coupon.",
          "Maturity is when the principal is due, if the issuer pays. Some bonds can be called or repaid early on terms written in the document.",
        ],
      },
      {
        heading: "What each bond is used for",
        paragraphs: [
          "A bond is a loan to the issuer. The use depends on whether you need the government’s credit, a company’s credit, or a tax treatment that the offer document actually states.",
        ],
        products: [
          { name: "Government security", use: "Used when credit risk needs to stay low relative to a company bond. The price can still move with interest rates if you sell before maturity." },
          { name: "Corporate bond", use: "Used to lend to a company or institution for a stated coupon and date. Credit risk is the chance they do not pay." },
          { name: "Taxable bond", use: "Used as a normal bond, where interest or gains may be taxed. This is the usual case." },
          { name: "Tax-free bond", use: "Used only when that specific issue is notified as tax-free. Most bonds are not." },
        ],
      },
      {
        heading: "Credit, interest-rate and liquidity risk",
        paragraphs: [
          "Credit risk is default or delay. Interest-rate risk is the fall in a bond’s price when market yields rise. Longer-maturity bonds are usually more sensitive to that move.",
          "Liquidity risk is the chance that you cannot sell when you want, or only at a poor price. Many bonds trade infrequently. Holding to maturity is not always possible if you need the money earlier.",
        ],
      },
    ],
    risks: [
      "Bonds can lose money. They are not bank deposits.",
      "A quoted yield is not a guaranteed return if you sell early, if the issuer defaults, or if costs and taxes apply.",
      "Read the information memorandum or offer document before investing.",
    ],
  },
  {
    slug: "financial-planning",
    navLabel: "Financial Planning",
    title: "Financial planning",
    description:
      "See how FinancialKatta approaches goal-based planning: requirements, suitable products, risks and a periodic review where it applies.",
    summary:
      "A goal-based conversation covering protection, investing, borrowing and the order in which decisions should be made.",
    intro:
      "Financial planning at FinancialKatta is a structured conversation. It connects what you already have with what the money is for, and only then looks at products. A plan does not remove market, health, credit or longevity risk.",
    intent: "general",
    calculators: [{ label: "All calculators", to: "/calculators" }],
    sections: [
      {
        heading: "What the conversation covers",
        paragraphs: [
          "Typical themes include a cash reserve, protection for the family, loans already running, goals such as a home, education or retirement, and money that can stay invested.",
          "Clients include salaried professionals, families, business owners and people with more complex wealth. The depth of the conversation follows the complexity, not a label.",
        ],
      },
      {
        heading: "A working sequence",
        paragraphs: ["The same six steps sit behind a first meeting and a later review."],
        points: [
          "Understand customer requirements.",
          "Identify financial goals.",
          "Evaluate suitable products.",
          "Explain options and associated risks.",
          "Assist with the selected process.",
          "Review requirements periodically where applicable.",
        ],
      },
      {
        heading: "What a plan is not",
        paragraphs: [
          "A plan is not a promise to beat an index, to have a loan sanctioned or to have a claim paid. Product availability depends on the manufacturer, the distributor’s valid registration and your own eligibility.",
          "Bring documents you already have: salary or business income, existing policies, folios and loan statements. Decisions made from memory are easy to get slightly wrong.",
        ],
      },
    ],
    risks: [
      "Planning support is educational until a specific product is selected and its own documents are completed.",
      "Reviews depend on changes in your life and on the products you hold. They are not a standing guarantee of performance.",
    ],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
