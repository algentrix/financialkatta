/** Original photographs generated for FinancialKatta. Not stock and not reused from another brand. */

export type Photo = {
  src: string
  srcSet: string
  alt: string
}

function shot(name: string, largeWidth: number, alt: string): Photo {
  const base = `/assets/editorial/${name}`
  return {
    src: `${base}-1600.webp`,
    srcSet: `${base}-800.webp 800w, ${base}-1600.webp ${largeWidth}w`,
    alt,
  }
}

export const photos = {
  heroFamily: shot(
    "hero-family",
    1280,
    "A mother, father and young son sitting together on a sofa in a Pune apartment",
  ),
  youngInvestors: shot(
    "young-investors",
    1280,
    "A young couple at their dining table in Pune, looking through household numbers on a laptop",
  ),
  familyProtection: shot(
    "family-protection",
    1152,
    "Parents and two children sitting together on the floor at home",
  ),
  homeLoan: shot(
    "home-loan",
    1280,
    "A young couple talking with a consultant about buying their first home",
  ),
  shopOwner: shot(
    "shop-owner",
    1152,
    "A shopkeeper in a small Pune store reviewing accounts on a laptop",
  ),
  retirement: shot(
    "retirement",
    1280,
    "A retired couple having morning tea on their apartment balcony",
  ),
  womanPlanning: shot(
    "woman-planning",
    864,
    "A woman in her thirties working through household finances on a laptop",
  ),
  childEducation: shot(
    "child-education",
    1152,
    "A mother sitting with her daughter as the girl studies at home",
  ),
} as const

export const servicePhotos: Record<string, Photo> = {
  "mutual-funds": photos.youngInvestors,
  loans: photos.homeLoan,
  insurance: photos.familyProtection,
  bonds: photos.womanPlanning,
  "financial-planning": photos.childEducation,
}

export const serviceGuides: Record<string, { everyday: string; questions: { q: string; a: string }[] }> = {
  "mutual-funds": {
    everyday:
      "Thinking about a SIP but not sure whether ₹1,000 or ₹5,000 is the right place to start? A mutual fund pools money and the value moves. We can walk through that before you pick a scheme.",
    questions: [
      {
        q: "Can I start with a small monthly amount?",
        a: "Many schemes allow a SIP from a few hundred rupees. The calculator on this site can sketch an illustration. It is not a promise of what you will receive.",
      },
      {
        q: "Is a mutual fund the same as a bank deposit?",
        a: "No. A bank deposit and a mutual fund follow different rules. A mutual fund is not covered by deposit insurance, and the amount you get back depends on the value on that day.",
      },
    ],
  },
  loans: {
    everyday:
      "Planning to buy a home? Looking at the EMI before you apply makes the conversation with the lender easier. The figure you calculate here is a sketch. The lender still decides.",
    questions: [
      {
        q: "Does a lower EMI always cost less?",
        a: "A longer tenure can make the monthly EMI smaller and the total interest larger. Look at both numbers before you decide.",
      },
      {
        q: "Will talking to FinancialKatta approve my loan?",
        a: "No. Only the lender can approve a loan, after looking at your income, existing EMIs and documents.",
      },
    ],
  },
  insurance: {
    everyday:
      "Insurance can be confusing. Let's first understand what you actually need: the income the family depends on, the hospital bill you could not pay at once, or the shop you cannot afford to replace.",
    questions: [
      {
        q: "Does buying a policy mean every expense is paid?",
        a: "No. Waiting periods, exclusions and claim conditions still apply. Read them before you rely on the cover.",
      },
      {
        q: "Which policy should my family buy first?",
        a: "That depends on who earns, who depends on that income, and which expense would be hardest to pay. There is no single policy for every home.",
      },
    ],
  },
  bonds: {
    everyday:
      "Have questions about bonds? They pay interest and you expect the money back later, but the issuer still has to pay. We can explain the basics before you decide whether a bond belongs in the plan.",
    questions: [
      {
        q: "Are bonds risk-free because they pay interest?",
        a: "No. The issuer can delay or miss a payment. The price can also change if you sell before maturity.",
      },
      {
        q: "Is a bond the same as a fixed deposit?",
        a: "No. A bond and a bank fixed deposit are different products, with different rules if something goes wrong.",
      },
    ],
  },
  "financial-planning": {
    everyday:
      "Every stage asks for a different conversation. A first salary, a home, school fees and the years after work do not fit in one product. Start with the goal and the date.",
    questions: [
      {
        q: "Do I need a large amount to begin?",
        a: "No. A first step can be a written list of goals and a monthly amount you can keep aside. The SIP calculator can illustrate ₹1,000. That figure is not a forecast.",
      },
      {
        q: "Will a plan guarantee the goal?",
        a: "No. Income, markets, health and policy terms can all change the outcome. A plan is a way to review those choices, not a promise.",
      },
    ],
  },
}
