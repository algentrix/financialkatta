export type LegalBlock = {
  id: string
  heading: string
  paragraphs: string[]
}

export type LegalDocument = {
  id: "privacy" | "terms" | "disclaimer"
  path: string
  title: string
  description: string
  sections: LegalBlock[]
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "privacy",
    path: "/privacy-policy",
    title: "Privacy policy",
    description:
      "How the FinancialKatta website handles information. Calculators stay in your browser. Enquiries go to WhatsApp only if you send them.",
    sections: [
      {
        id: "who",
        heading: "Who this notice describes",
        paragraphs: [
          "This notice describes the public website of FinancialKatta, the practice of Prasad Prakashrao Chidrawar of Prasad Star Trading Company, based in Pune, Maharashtra, India. The site is static. It does not create customer accounts and it does not have its own database.",
        ],
      },
      {
        id: "what",
        heading: "Information the website itself handles",
        paragraphs: [
          "You can read every page without giving your name. If you use the contact form, the form checks your entries in the browser and then opens WhatsApp with the message you chose to send. FinancialKatta’s website does not store that form.",
          "The phone number published for enquiries is +91 81779 50709.",
        ],
      },
      {
        id: "calculators",
        heading: "Calculators",
        paragraphs: [
          "SIP, lumpsum, STP, SWP and EMI calculations run on your device. The amounts you type are not sent to a FinancialKatta server, because this website does not operate one for that purpose.",
        ],
      },
      {
        id: "whatsapp",
        heading: "WhatsApp and other services",
        paragraphs: [
          "WhatsApp is provided by a third party. If you start a chat, that service receives the message, your phone number and whatever else its own terms describe. FinancialKatta does not control WhatsApp’s retention or security practices.",
          "A video on this site may be embedded from YouTube. YouTube can receive technical information under its own policy.",
          "Social links and partner links, when configured, leave this website. Read the destination’s own notice.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies, logs and analytics",
        paragraphs: [
          "This website does not set analytics cookies and does not include an advertising or analytics script. A hosting company may keep ordinary server logs, such as IP address and the page requested, under its own practices. Those logs are not a customer database built by this site.",
        ],
      },
      {
        id: "children",
        heading: "Children",
        paragraphs: [
          "The website is written for adults making household and business financial decisions. It is not directed at children.",
        ],
      },
      {
        id: "choices",
        heading: "Your choices",
        paragraphs: [
          "You may stop using the site at any time. You may choose not to open WhatsApp. Questions about this notice can be sent on WhatsApp to the number above.",
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        paragraphs: [
          "If this notice changes, the updated page will be published at the same address. This notice was last updated on 6 November 2026.",
        ],
      },
    ],
  },
  {
    id: "terms",
    path: "/terms",
    title: "Terms and conditions",
    description:
      "Terms for using the FinancialKatta website, including the limits of educational content and calculator illustrations.",
    sections: [
      {
        id: "use",
        heading: "Using the website",
        paragraphs: [
          "By using www.financialkatta.com you agree to these terms. If you do not agree, please leave the site. The site is an information resource for people considering financial products in India.",
        ],
      },
      {
        id: "education",
        heading: "Educational information",
        paragraphs: [
          "Articles, service pages and answers explain how products generally work. They are not a personal recommendation, a research report, an offer, or a solicitation to buy or sell any scheme, policy, bond or loan. A suitable choice depends on your goals, your time horizon and your ability to bear a loss or a premium.",
        ],
      },
      {
        id: "no-promise",
        heading: "No approval, return or claim is promised",
        paragraphs: [
          "FinancialKatta does not guarantee investment returns, loan approval, interest rates, insurance issuance or claim settlement. Those outcomes belong to markets, issuers, lenders and insurers, and to the documents you sign.",
        ],
      },
      {
        id: "calculators",
        heading: "Calculators",
        paragraphs: [
          "Calculator outputs are illustrations from the figures and the rate you enter. They ignore costs, taxes and product-specific rules unless a page says otherwise. Do not treat them as a projection or as a guaranteed maturity value.",
        ],
      },
      {
        id: "third",
        heading: "Third parties",
        paragraphs: [
          "Links to WhatsApp or to any partner, video or article elsewhere are provided for convenience. FinancialKatta is not responsible for the content or availability of those services.",
        ],
      },
      {
        id: "ip",
        heading: "Intellectual property",
        paragraphs: [
          "The text, layout and original graphics of this website belong to FinancialKatta unless a credit says otherwise. You may share a link. You may not copy the site and present it as your own.",
        ],
      },
      {
        id: "conduct",
        heading: "Acceptable use",
        paragraphs: [
          "Do not attempt to disrupt the site, probe it for data it does not hold, or use it to send misleading enquiries. The site has no login and no private customer vault.",
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        paragraphs: [
          "To the extent the law allows, FinancialKatta is not liable for decisions you take solely from these pages or from a calculator illustration. Nothing in these terms excludes liability that Indian law does not allow to be excluded.",
        ],
      },
      {
        id: "law",
        heading: "Governing law",
        paragraphs: [
          "These terms are to be read under the laws of India. Courts at Pune, Maharashtra, are the venue, subject to any right you have that cannot be limited by a website notice.",
        ],
      },
      {
        id: "changes",
        heading: "Changes and contact",
        paragraphs: [
          "Updated terms will be posted on this page. These terms were last updated on 6 November 2026. Questions can be sent on WhatsApp at +91 81779 50709.",
        ],
      },
    ],
  },
  {
    id: "disclaimer",
    path: "/disclaimer",
    title: "Financial disclaimer",
    description:
      "Risk disclosures for mutual funds, insurance, loans and bonds, and the registrations shown on this website.",
    sections: [
      {
        id: "general",
        heading: "General",
        paragraphs: [
          "FinancialKatta publishes explanations so customers can prepare for a decision. Nothing on this website is a promise of profit, safety of capital, loan sanction or insurance coverage.",
          "Past performance, where any third party mentions it, is not an indicator of future results. This website does not publish performance statistics of its own.",
        ],
      },
      {
        id: "mf",
        heading: "Mutual funds",
        paragraphs: [
          "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Equity, debt and hybrid schemes can all fall in value. A SIP does not assure a profit or protect against a loss in a declining market.",
          "STP and SWP are facilities. They do not remove market risk. Tax treatment depends on the scheme and on the law at the time, and this website is not tax advice.",
        ],
      },
      {
        id: "insurance",
        heading: "Insurance",
        paragraphs: [
          "Insurance cover is subject to the insurer’s underwriting, the proposal disclosures, the premium being paid, and the terms, conditions and exclusions of the policy. A waiting period or an exclusion can mean that a claim is not payable.",
          "Illustrations in a life insurance benefit are not the same as a guaranteed amount unless the policy expressly says so.",
        ],
      },
      {
        id: "loans",
        heading: "Loans",
        paragraphs: [
          "Loan approval, the rate of interest, fees and the sanctioned amount are decided by the lender after it assesses eligibility. A conversation or an EMI illustration is not a sanction. Secured loans put the security at risk if repayments are not made as agreed.",
        ],
      },
      {
        id: "bonds",
        heading: "Bonds",
        paragraphs: [
          "Bonds carry credit risk, interest-rate risk and liquidity risk. Prices can fall when yields rise. An issuer can default. You may not be able to sell before maturity at the price you expect. A bond is not a bank deposit. Tax treatment is specific to the instrument and is not assumed to be tax-free.",
        ],
      },
      {
        id: "registrations",
        heading: "Regulatory registrations",
        paragraphs: [
          "The AMFI registration shown on this website is ARN 272207, for mutual fund distribution. If another registration is not shown, do not assume it exists. Ask to see the current registration before you invest, buy a policy or apply for a loan.",
        ],
      },
      {
        id: "calculators",
        heading: "Calculators",
        paragraphs: [
          "All investment calculator outputs are illustrative estimates, not guaranteed returns. The EMI schedule is a mathematical illustration of the rate and tenure you enter. It is not a lender’s repayment schedule.",
        ],
      },
    ],
  },
]

export function getLegalDocument(id: LegalDocument["id"]) {
  return legalDocuments.find((document) => document.id === id)
}
