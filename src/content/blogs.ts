export type BlogSection = {
  heading: string
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readingMinutes: number
  category: string
  sections: BlogSection[]
}

export const posts: BlogPost[] = [
  {
    slug: "sip-and-lumpsum",
    title: "SIP or lumpsum: what the difference actually changes",
    description:
      "A SIP spreads purchase dates. A lumpsum invests once. Neither removes market risk. Here is how to think about the choice.",
    date: "2026-10-12",
    readingMinutes: 5,
    category: "Investing",
    sections: [
      {
        heading: "The mechanical difference",
        paragraphs: [
          "A systematic investment plan takes a fixed amount from you on a regular date and buys units at that day’s value. A lumpsum buys units once, with the amount you have ready.",
          "The SIP route means you will buy at several prices. Some of those prices will look expensive later and some will look cheap. That spread is the whole idea. It is not a promise that your average price will be kind.",
        ],
      },
      {
        heading: "What a SIP does not do",
        paragraphs: [
          "A SIP does not protect you from a falling market. If values fall for a long time, the statement will still show a loss, even though you bought along the way. Stopping a SIP because the market fell is a separate decision, and it is often made at the worst moment.",
          "A SIP is also not automatically “safer” than a lumpsum in the same scheme. The scheme’s portfolio decides the risk. The instalment only decides the calendar.",
        ],
      },
      {
        heading: "When a lumpsum is the honest description",
        paragraphs: [
          "If the money is already in the bank and the goal is many years away, a lumpsum is simply the truth of the situation. Splitting it into a short transfer plan can make the first months easier to live with. It can also mean sitting in cash while values rise. Both outcomes are possible, which is why the choice is a preference about timing, not a formula with one winner.",
        ],
      },
      {
        heading: "Use the calculators as a sketch",
        paragraphs: [
          "The SIP and lumpsum calculators on this website compound the rate you type. Change the rate and the picture changes. That is useful for seeing how sensitive a goal is. It is not a forecast of any scheme, and it ignores costs and taxes.",
          "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.",
        ],
      },
    ],
  },
  {
    slug: "questions-before-buying-insurance",
    title: "Questions worth asking before you buy insurance",
    description:
      "Cover amount, exclusions, waiting periods and claim conditions matter more than a premium that looks small on a screen.",
    date: "2026-10-18",
    readingMinutes: 6,
    category: "Insurance",
    sections: [
      {
        heading: "Start with the event, not the brand",
        paragraphs: [
          "Write down the event you want help with: death during the working years, a hospital bill, damage to a vehicle, or a fire in a shop. The product family follows from that sentence. A policy that solves a different problem will look attractive and still leave the original risk open.",
        ],
      },
      {
        heading: "Ask what is not covered",
        paragraphs: [
          "Every policy has exclusions. In health insurance, waiting periods and pre-existing conditions are the usual surprise. In a term plan, non-disclosure of health or habits can become the argument later. In motor insurance, third-party cover and own-damage cover are not the same contract.",
          "Ask for the exclusion in plain words and for the waiting period in months. A brochure headline is not the contract.",
        ],
      },
      {
        heading: "Separate protection from a savings illustration",
        paragraphs: [
          "Some life policies show a future fund value next to the cover. Ask which part is guaranteed and which part depends on bonuses, markets or charges. If the main need is income replacement for the family, a large term cover and a separate investment are often easier to understand than one bundled illustration.",
        ],
      },
      {
        heading: "A premium quote is not an acceptance",
        paragraphs: [
          "The insurer can accept, postpone or decline a proposal after medical tests and underwriting. FinancialKatta cannot promise that a policy will be issued or that a future claim will be paid. The decision sits in the policy wording and in the facts disclosed.",
        ],
      },
    ],
  },
  {
    slug: "how-to-read-a-bond",
    title: "How to read a bond: coupon, yield, maturity and risk",
    description:
      "The interest printed on a bond is not the same as the return you will earn if you buy it at today’s price or sell it early.",
    date: "2026-10-24",
    readingMinutes: 6,
    category: "Bonds",
    sections: [
      {
        heading: "Coupon is not yield",
        paragraphs: [
          "The coupon is the interest rate on the face value. If you buy the bond for more or less than face value, your yield is different. A bond priced above face value can have an attractive coupon and a lower yield. Compare the yield, the price and the time left, not the coupon alone.",
        ],
      },
      {
        heading: "Maturity is a date, not a guarantee you can exit",
        paragraphs: [
          "Maturity is when the issuer is due to repay the face value, if it pays. Before that date you depend on someone else wanting to buy. Some bonds hardly trade. Liquidity is part of the risk even when the credit looks comfortable.",
        ],
      },
      {
        heading: "Three risks to name out loud",
        paragraphs: [
          "Credit risk: the issuer delays or defaults. A rating is an opinion and can be revised. Interest-rate risk: when market yields rise, existing bond prices usually fall, and longer bonds move more. Liquidity risk: you may not find a buyer at a fair price.",
          "Government securities are generally treated as having low credit risk compared with corporate bonds. Their prices still move with interest rates.",
        ],
      },
      {
        heading: "Tax is specific to the instrument",
        paragraphs: [
          "Do not assume a bond is tax-free. Some notified issues have carried that treatment. Most bonds do not. The offer document and a tax professional are the right places to confirm the treatment for your situation. This article is not tax advice.",
        ],
      },
    ],
  },
  {
    slug: "list-goals-before-products",
    title: "List the goals before you list the products",
    description:
      "A short written list of goals, dates and existing commitments makes the later product conversation shorter and more honest.",
    date: "2026-11-01",
    readingMinutes: 5,
    category: "Planning",
    sections: [
      {
        heading: "Write the date next to the goal",
        paragraphs: [
          "“Retirement”, “child’s education” and “a larger house” are not yet plans. Add the year you want the money and a rough rupee figure in today’s costs. The year tells you whether a fall in value is something you can wait out.",
        ],
      },
      {
        heading: "Put existing promises on the same page",
        paragraphs: [
          "EMIs, insurance premiums and support for parents already have a claim on the month. A new SIP that ignores those promises will be the first thing cancelled. The useful number is what remains after those commitments and after a reserve for surprises.",
        ],
      },
      {
        heading: "Name the risk you will not take",
        paragraphs: [
          "Some money cannot fall in value because it has a job next year. Say that out loud. It will rule out entire product categories, which is a successful outcome of the exercise, not a failure to be adventurous.",
        ],
      },
      {
        heading: "Then have the conversation",
        paragraphs: [
          "FinancialKatta’s planning sequence is simple: understand the requirement, name the goals, look at suitable products, explain the risks, help with the process you choose, and review when life changes. Bring the list. The products can wait until the list exists.",
        ],
      },
    ],
  },
  {
    slug: "which-loan-is-for-which-job",
    title: "Which loan is for which job",
    description:
      "A home loan, a loan against property, a personal loan and a business loan are not interchangeable. The use comes first.",
    date: "2026-11-06",
    readingMinutes: 6,
    category: "Loans",
    sections: [
      {
        heading: "Match the loan to the use",
        paragraphs: [
          "A home loan is for buying, building or renovating a house, with that property as security. A loan against property borrows against a home or shop you already own, for business, education or another need you can explain. A personal loan is unsecured and is often used for a medical bill, a wedding, travel or clearing other dues. A business loan is for the business itself: equipment, expansion, day-to-day working capital, or money against invoices.",
          "The lender decides whether to offer any of these. An enquiry is not a sanction.",
        ],
      },
      {
        heading: "Why the security changes the rate",
        paragraphs: [
          "A home loan is usually cheaper and longer, sometimes up to about 30 years, because the house is the security. A loan against property usually costs more than a home loan and less than a personal loan. A personal loan is shorter, often one to five years, and the rate is higher because nothing is mortgaged.",
          "Tax benefits sometimes discussed for a home loan, including Sections 80C and 24(b), belong to the old tax regime and to the law at the time. This article is not tax advice.",
        ],
      },
      {
        heading: "Business facilities are several products",
        paragraphs: [
          "A term loan suits expansion or machinery. A cash credit, overdraft or working-capital limit suits daily operations. MSME and Mudra loans are scheme-based facilities for smaller businesses. Invoice discounting raises money against bills customers have not paid yet. Each one still needs the lender’s documents, not only a conversation.",
        ],
      },
    ],
  },
]

const categoryOrder = ["Investing", "Insurance", "Loans", "Bonds", "Planning"]

export function postsByCategory() {
  const groups = new Map<string, BlogPost[]>()
  for (const post of posts) {
    const list = groups.get(post.category) ?? []
    list.push(post)
    groups.set(post.category, list)
  }
  const names = [
    ...categoryOrder.filter((name) => groups.has(name)),
    ...[...groups.keys()].filter((name) => !categoryOrder.includes(name)),
  ]
  return names.map((title) => ({ title, posts: groups.get(title) ?? [] }))
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}
