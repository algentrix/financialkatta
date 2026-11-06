import { calculatorTools } from "../content/calculators"
import { legalDocuments } from "../content/legal"
import { posts } from "../content/blogs"
import { services } from "../content/services"
import { aboutContent } from "../content/about"
import { visionContent } from "../content/vision"
import { site } from "../config/site"

export type Crumb = { name: string; path: string }

export type SeoPage = {
  path: string
  title: string
  description: string
  changefreq: "weekly" | "monthly" | "yearly"
  priority: string
  crumbs: Crumb[]
}

function entry(
  path: string,
  title: string,
  description: string,
  changefreq: SeoPage["changefreq"],
  priority: string,
  crumbs: Crumb[],
): SeoPage {
  return { path, title: `${title} | ${site.name}`, description, changefreq, priority, crumbs }
}

const homeCrumb: Crumb = { name: "Home", path: "/" }

export function allPages(): SeoPage[] {
  const home: SeoPage = {
    path: "/",
    title: `${site.name} | Investments, Insurance, Loans and Wealth Planning in Pune`,
    description:
      "FinancialKatta helps families in Pune understand investments, insurance, loans and bonds. Plan the next step and talk to us on WhatsApp.",
    changefreq: "weekly",
    priority: "1.0",
    crumbs: [homeCrumb],
  }

  const servicePages = services.map((service) =>
    entry(
      `/services/${service.slug}`,
      service.title,
      service.description,
      "monthly",
      "0.8",
      [homeCrumb, { name: service.navLabel, path: `/services/${service.slug}` }],
    ),
  )

  const calculatorPages = calculatorTools.map((tool) =>
    entry(tool.slug === "emi" ? "/calculators/emi" : `/calculators/${tool.slug}`, tool.title, tool.description, "monthly", "0.7", [
      homeCrumb,
      { name: "Calculators", path: "/calculators" },
      { name: tool.title, path: `/calculators/${tool.slug}` },
    ]),
  )

  const blogPages = posts.map((post) =>
    entry(`/knowledge/blogs/${post.slug}`, post.title, post.description, "monthly", "0.6", [
      homeCrumb,
      { name: "Knowledge Centre", path: "/knowledge" },
      { name: "Blogs", path: "/knowledge/blogs" },
      { name: post.title, path: `/knowledge/blogs/${post.slug}` },
    ]),
  )

  const legalPages = legalDocuments.map((document) =>
    entry(document.path, document.title, document.description, "yearly", "0.3", [
      homeCrumb,
      { name: document.title, path: document.path },
    ]),
  )

  return [
    home,
    entry("/about", aboutContent.title, aboutContent.description, "monthly", "0.8", [
      homeCrumb,
      { name: "About", path: "/about" },
    ]),
    entry(
      "/about/advisor",
      "Advisor profile",
      "Prasad Prakashrao Chidrawar is the mutual fund distributor for FinancialKatta in Pune. AMFI ARN 272207.",
      "monthly",
      "0.6",
      [homeCrumb, { name: "About", path: "/about" }, { name: "Advisor", path: "/about/advisor" }],
    ),
    entry("/about/vision", visionContent.title, visionContent.description, "yearly", "0.5", [
      homeCrumb,
      { name: "About", path: "/about" },
      { name: "Vision and mission", path: "/about/vision" },
    ]),
    ...servicePages,
    entry(
      "/calculators",
      "Financial calculators",
      "SIP, lumpsum, STP, SWP and loan EMI calculators. Results are illustrative estimates, not guaranteed returns.",
      "monthly",
      "0.9",
      [homeCrumb, { name: "Calculators", path: "/calculators" }],
    ),
    ...calculatorPages,
    entry(
      "/knowledge",
      "Knowledge Centre",
      "Articles, financial awareness notes, videos and answers from FinancialKatta. Educational information, not a personal recommendation.",
      "weekly",
      "0.7",
      [homeCrumb, { name: "Knowledge Centre", path: "/knowledge" }],
    ),
    entry(
      "/knowledge/blogs",
      "Blogs",
      "Notes on SIPs, insurance, bonds and goal-based planning from FinancialKatta in Pune.",
      "weekly",
      "0.7",
      [homeCrumb, { name: "Knowledge Centre", path: "/knowledge" }, { name: "Blogs", path: "/knowledge/blogs" }],
    ),
    ...blogPages,
    entry(
      "/knowledge/awareness",
      "Financial awareness",
      "Short notes on reserves, inflation, risk, costs and nominations. Written for households, not as product advice.",
      "monthly",
      "0.6",
      [homeCrumb, { name: "Knowledge Centre", path: "/knowledge" }, { name: "Financial awareness", path: "/knowledge/awareness" }],
    ),
    entry(
      "/knowledge/videos",
      "Videos",
      "Short financial explanations to watch. The articles and FAQs cover the same topics in writing.",
      "monthly",
      "0.5",
      [homeCrumb, { name: "Knowledge Centre", path: "/knowledge" }, { name: "Videos", path: "/knowledge/videos" }],
    ),
    entry(
      "/knowledge/faqs",
      "FAQs",
      "Answers about calculators, loan approval, insurance cover, mutual funds, bonds and how to contact FinancialKatta.",
      "monthly",
      "0.6",
      [homeCrumb, { name: "Knowledge Centre", path: "/knowledge" }, { name: "FAQs", path: "/knowledge/faqs" }],
    ),
    entry(
      "/testimonials",
      "Customer testimonials",
      "Client experiences are shared on this page only with the client’s permission.",
      "monthly",
      "0.4",
      [homeCrumb, { name: "Testimonials", path: "/testimonials" }],
    ),
    entry(
      "/partners",
      "Associate partners",
      "Firms associated with FinancialKatta. Clients are also welcome to speak with us directly.",
      "monthly",
      "0.4",
      [homeCrumb, { name: "Associate partners", path: "/partners" }],
    ),
    entry(
      "/invitation",
      "Invitation programme",
      "Invite someone to speak with FinancialKatta about investments, insurance, loans or a financial plan.",
      "monthly",
      "0.5",
      [homeCrumb, { name: "Invitation programme", path: "/invitation" }],
    ),
    entry(
      "/contact",
      "Contact us",
      "Contact FinancialKatta in Pune on WhatsApp at +91 81779 50709 for investments, insurance, loans and financial planning.",
      "monthly",
      "0.9",
      [homeCrumb, { name: "Contact", path: "/contact" }],
    ),
    ...legalPages,
  ]
}

export function pageMeta(path: string) {
  const found = allPages().find((page) => page.path === path)
  if (!found) throw new Error(`Missing SEO entry for ${path}`)
  return found
}

export function breadcrumbJson(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.domain}${crumb.path}`,
    })),
  }
}
