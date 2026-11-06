export const whatsappMessages = {
  general: "Hello, I would like to know more about FinancialKatta and your financial services.",
  mutualFunds: "Hello, I am interested in understanding mutual fund investment options.",
  insurance: "Hello, I would like assistance with my insurance requirements.",
  loans: "Hello, I would like to understand available loan options.",
  bonds: "Hello, I would like to know more about bond investment opportunities.",
  calculator:
    "Hello, I used your financial calculator and would like to discuss my financial requirements.",
} as const

export type WhatsAppIntent = keyof typeof whatsappMessages

export const site = {
  name: "FinancialKatta",
  legalName: "Prasad Star Trading Company",
  tagline: "Har sapne ki taiyari, sahi financial planning ke saath.",
  supporting:
    "Whether you're starting your first SIP, planning a home, choosing insurance or thinking about the years ahead, we'll help you understand your options.",
  heroDescription:
    "Every family has dreams. Let's make a plan for them. FinancialKatta explains investments, insurance, loans and bonds in plain language.",
  domain: "https://www.financialkatta.com",
  locale: "en_IN",
  contentUpdated: "2026-11-06",
  location: {
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    addressLines: [] as string[],
  },
  phoneE164: "+918177950709",
  phoneDisplay: "+91 81779 50709",
  email: "",
  hours: "",
  whatsapp: {
    number: "918177950709",
    baseUrl: "https://wa.me/918177950709",
    messages: whatsappMessages,
  },
  referralUrl: "https://www.assetplus.in/mfd/ARN-272207",
  referralIntro: [
    "Hey, I'm inviting you to invest with me on AssetPlus — India's leading Mutual Fund Distribution Platform. Join an ever-growing network of smart investors and take the first step towards maximising your wealth today! Fill this form to join as my client today.",
    "The form is Prasad Prakashrao Chidrawar’s AssetPlus client link, AMFI ARN 272207. Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Joining is not a loan approval, an insurance cover or a promised return.",
  ],
  social: [] as { label: string; href: string }[],
  registrations: {
    sebi: "",
    amfiArn: "272207",
    irdai: "",
    rbi: "",
    notes: "",
  },
}

export const publishedRegistrations = [
  site.registrations.sebi ? { label: "SEBI", value: site.registrations.sebi } : null,
  site.registrations.amfiArn ? { label: "AMFI ARN", value: site.registrations.amfiArn } : null,
  site.registrations.irdai ? { label: "IRDAI", value: site.registrations.irdai } : null,
  site.registrations.rbi ? { label: "RBI", value: site.registrations.rbi } : null,
].filter((item): item is { label: string; value: string } => item !== null)
