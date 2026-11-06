import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { publishedRegistrations, site } from "../config/site"
import { partners } from "../content/partners"
import { safeHttpUrl } from "../lib/format"
import { services } from "../content/services"
import { calculatorTools } from "../content/calculators"
import { BrandMark } from "./BrandMark"
import { WhatsAppLink } from "./WhatsAppLink"

const social = site.social
  .map((item) => ({ ...item, href: safeHttpUrl(item.href) }))
  .filter((item) => item.href)

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-11 w-11" />
            <p className="font-serif text-[1.65rem] font-semibold leading-none">{site.name}</p>
          </div>
          {site.legalName ? <p className="mt-4 text-sm text-white/75">{site.legalName}</p> : null}
          <p className="mt-4 text-sm leading-relaxed text-white/75">{site.supporting}</p>
          <p className="mt-4 text-sm text-white/75">
            {site.location.city}, {site.location.state}, {site.location.country}
          </p>
          <a className="mt-2 inline-block text-sm text-gold" href={`tel:${site.phoneE164}`}>
            {site.phoneDisplay}
          </a>
          {site.email ? (
            <a className="mt-1 block text-sm text-gold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          ) : null}
        </div>
        <FooterColumn title="Practice">
          <FooterLink to="/about">About us</FooterLink>
          <FooterLink to="/about/advisor">Advisor profile</FooterLink>
          <FooterLink to="/about/vision">Vision and mission</FooterLink>
          <FooterLink to="/testimonials">Testimonials</FooterLink>
          <FooterLink to="/invitation">Invitation programme</FooterLink>
          {partners.length > 0 ? <FooterLink to="/partners">Associate partners</FooterLink> : null}
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterColumn>
        <FooterColumn title="Services">
          {services.map((service) => (
            <FooterLink key={service.slug} to={`/services/${service.slug}`}>
              {service.navLabel}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title="Tools and reading">
          <FooterLink to="/calculators">All calculators</FooterLink>
          {calculatorTools.map((tool) => (
            <FooterLink key={tool.slug} to={`/calculators/${tool.slug}`}>
              {tool.title}
            </FooterLink>
          ))}
          <FooterLink to="/knowledge">Knowledge Centre</FooterLink>
          <FooterLink to="/knowledge/blogs">Blogs</FooterLink>
          <FooterLink to="/knowledge/faqs">FAQs</FooterLink>
        </FooterColumn>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-6 text-sm leading-relaxed text-white/70">
          <p>
            Investments are subject to market risks. Insurance is subject to policy terms, exclusions and underwriting.
            Loans are subject to lender approval and eligibility. Bonds carry credit, interest-rate and liquidity risk.
            Calculator results are illustrations, not guaranteed returns. Read the{" "}
            <Link to="/disclaimer" className="text-gold">
              financial disclaimer
            </Link>
            .
          </p>
          {publishedRegistrations.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {publishedRegistrations.map((item) => (
                <li key={item.label}>
                  {item.label}: {item.value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">
              Ask which registration applies before you invest, buy a policy or apply for a loan.
            </p>
          )}
          {site.registrations.notes ? <p className="mt-3">{site.registrations.notes}</p> : null}
          {social.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-4">
              {social.map((item) => (
                <li key={item.href}>
                  <a href={item.href!} className="text-gold" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} {site.name}. {site.location.city}. Designed by{" "}
              <a href="https://algentrix.com" className="text-gold hover:text-white" target="_blank" rel="noopener noreferrer">
                Algentrix
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link to="/disclaimer" className="hover:text-white">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-white/80">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-white">
        {children}
      </Link>
    </li>
  )
}

export function WhatsAppFloat() {
  return (
    <WhatsAppLink
      intent="general"
      className="btn-sage fixed bottom-5 right-5 z-30 inline-flex"
    >
      <span className="sr-only">Enquire on </span>
      WhatsApp
    </WhatsAppLink>
  )
}
