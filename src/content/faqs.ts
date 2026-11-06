export type Faq = {
  question: string
  answer: string
}

export type FaqCategory = {
  id: string
  title: string
  items: Faq[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: "investing",
    title: "Investing and mutual funds",
    items: [
      {
        question: "Are mutual funds the same as a bank deposit?",
        answer:
          "No. Mutual fund units are market-linked. Their value can rise or fall. They are not bank deposits and they are not covered by deposit insurance.",
      },
      {
        question: "Is a calculator result a guaranteed return?",
        answer:
          "No. The calculators on this website use the rate and the duration you enter. They show an illustration. Markets, expenses, taxes and your own cash flows can produce a different result.",
      },
      {
        question: "What is a SIP used for?",
        answer:
          "A systematic investment plan invests a chosen amount on a regular date. It is used when you want to build a holding over time from monthly surplus. It does not remove market risk.",
      },
      {
        question: "How do I start a mutual fund investment with Prasad?",
        answer:
          "The mutual funds page has a Get started link to his AssetPlus client form: https://www.assetplus.in/mfd/ARN-272207. His AMFI ARN is 272207. The form is for joining as his client. It is not a promise of a return.",
      },
      {
        question: "Do bonds remove risk?",
        answer:
          "No. A bond can carry credit risk, interest-rate risk and liquidity risk. The coupon printed on a bond is not a promise that you can sell it later at the same price.",
      },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    items: [
      {
        question: "What is life insurance used for?",
        answer:
          "Life insurance provides money to the nominee if the insured person dies during the cover, subject to the policy. Some policies also pay a maturity or investment-linked benefit. Term insurance is mainly for a large death cover over a fixed period.",
      },
      {
        question: "What is health insurance used for?",
        answer:
          "Health insurance pays eligible medical expenses from illness, accident or hospitalisation, within the sum insured and the policy rules. Waiting periods, exclusions and sub-limits still apply.",
      },
      {
        question: "Will an insurance policy pay every hospital bill or every claim?",
        answer:
          "A policy pays only what its terms cover. Waiting periods, exclusions, sub-limits, co-pay and the disclosures in the proposal all matter. Read the policy document before you rely on it.",
      },
      {
        question: "What is third-party motor insurance used for?",
        answer:
          "It covers legal liability for injury, death or property damage caused to a third party. It is mandatory for vehicles used in public places in India. Damage to your own vehicle needs a separate own-damage or comprehensive cover.",
      },
      {
        question: "Is an insurance examination the same as an insurer’s licence number on this website?",
        answer:
          "Prasad completed his insurance advisory examinations in 2026. This website does not print a separate IRDAI licence number. Ask for the current registration before you buy a policy.",
      },
    ],
  },
  {
    id: "loans",
    title: "Loans",
    items: [
      {
        question: "What is a home loan used for?",
        answer:
          "A home loan is used to buy, construct or renovate a house. The property is the security. Tenures can run up to about 30 years. Tax treatment under Sections 80C and 24(b) depends on the old or new tax regime and on the law at the time. Approval is the lender’s decision.",
      },
      {
        question: "What is a loan against property used for?",
        answer:
          "You mortgage a residential or commercial property you already own and borrow against the lender’s valuation. People use it for business, education or another stated need. If repayments are missed, the property can be at risk.",
      },
      {
        question: "What is a personal loan used for?",
        answer:
          "A personal loan is usually unsecured and can be used for a medical bill, a wedding, travel or consolidating other dues. Tenure is often one to five years, and the interest rate is usually higher than a home loan.",
      },
      {
        question: "Does FinancialKatta promise loan approval?",
        answer:
          "No. A lender decides eligibility and approval from its own policy, your income, existing obligations, credit history and the documents you submit. An enquiry is not a sanction letter.",
      },
    ],
  },
  {
    id: "practice",
    title: "FinancialKatta and the advisor",
    items: [
      {
        question: "Who will I be speaking with?",
        answer:
          "Prasad Prakashrao Chidrawar, of Prasad Star Trading Company. He is a mutual fund distributor, AMFI ARN 272207, and he also consults on insurance and loans. The website is FinancialKatta.com.",
      },
      {
        question: "Where is FinancialKatta based?",
        answer:
          "FinancialKatta is based in Pune, Maharashtra, India. You can start an enquiry on WhatsApp at +91 81779 50709.",
      },
      {
        question: "Which regulatory registrations does the website display?",
        answer:
          "The website displays AMFI ARN 272207 for mutual fund distribution. It also records that the insurance advisory examinations were completed in 2026. A SEBI, IRDAI or RBI number is not printed here. Do not assume one exists. Ask before you transact.",
      },
      {
        question: "Is the information on this website personal advice?",
        answer:
          "The pages explain what each product is used for so you can prepare for a conversation. A suitable choice depends on your goals, your horizon and your ability to take risk. Use WhatsApp or the mutual fund Get started link when you want to talk about your own situation.",
      },
    ],
  },
  {
    id: "website",
    title: "Using this website",
    items: [
      {
        question: "Do you store calculator entries?",
        answer:
          "The calculators run in your browser. This website has no database and does not save the amounts you type. If you choose to send an enquiry, WhatsApp receives the message you submit.",
      },
      {
        question: "Can I invite someone else to speak with you?",
        answer:
          "Yes. The invitation page shares the AssetPlus client form used to join as a mutual fund client. You can also introduce someone on WhatsApp. No referral reward is published.",
      },
    ],
  },
]

export const faqs: Faq[] = faqCategories.flatMap((category) => category.items)
