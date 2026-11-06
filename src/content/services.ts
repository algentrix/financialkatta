import type { WhatsAppIntent } from "../config/site"

export type ServiceSection = {
  heading: string
  paragraphs: string[]
  points?: string[]
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
        heading: "Home loans",
        paragraphs: [
          "A home loan is usually secured by the property you buy or build. The lender checks income, existing EMIs, credit history and the property’s own papers and valuation.",
          "A longer tenure lowers the monthly EMI and usually increases the total interest paid. Prepayment rules differ by lender and by the type of interest rate.",
        ],
      },
      {
        heading: "Personal loans",
        paragraphs: [
          "Personal loans are often unsecured. Tenures are usually shorter than a home loan, and the interest rate offered depends on the lender’s reading of your profile.",
          "Borrow for a reason you can name, and only if the EMI fits the monthly budget after essential expenses and existing commitments.",
        ],
      },
      {
        heading: "Business loans",
        paragraphs: [
          "Business facilities are assessed on the purpose, the vintage of the business, income records and, where the product requires it, collateral. A profitable year in conversation is not the same as the documents a lender will ask to see.",
        ],
      },
      {
        heading: "Loan against property",
        paragraphs: [
          "A loan against property uses an existing property as security. The amount is linked to the lender’s valuation and to your repayment capacity. If repayments are missed, the security can be at risk.",
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
          "Life insurance pays on death during the policy term and, in some products, on survival. Protection and investment are different jobs. If a illustration shows a future value, separate what is guaranteed from what is assumed.",
        ],
      },
      {
        heading: "Term insurance",
        paragraphs: [
          "Term insurance is primarily death cover for a chosen term. A pure term plan typically pays nothing if the insured person survives the term. That is why a large cover can cost less than a savings-linked policy.",
          "The sum assured should be thought about from the family’s expenses and liabilities, not from a round number alone. Medical tests and honest disclosures in the proposal affect the contract.",
        ],
      },
      {
        heading: "Health insurance",
        paragraphs: [
          "Health insurance contributes towards eligible hospital expenses as the policy defines them. Waiting periods, room-rent limits, co-pay, sub-limits, network hospitals and pre-existing conditions change the outcome.",
          "Read the exclusions before you treat the sum insured as the amount you will receive.",
        ],
      },
      {
        heading: "General insurance",
        paragraphs: [
          "General insurance covers non-life risks such as property and other named events. Each policy has its own insured events and its own list of what is left out. A household or shop policy should be matched to what you actually own.",
        ],
      },
      {
        heading: "Motor insurance",
        paragraphs: [
          "In India, third-party motor insurance is a legal requirement for a vehicle used in a public place. Own-damage cover is a separate contract and has its own deductions and exclusions.",
          "Declare modifications and the correct use of the vehicle. A claim can be affected by delay, by the driver and by what the policy says about those facts.",
        ],
      },
      {
        heading: "Personal accident insurance",
        paragraphs: [
          "Personal accident cover pays for accidental death or disability as the policy defines those words. Illness is usually outside this cover. The definition of disability, and any waiting or survival period, decides whether a benefit is payable.",
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
