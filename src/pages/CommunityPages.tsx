import { useState } from "react"
import { Link } from "react-router-dom"
import { partners } from "../content/partners"
import { verifiedTestimonials } from "../content/testimonials"
import { site } from "../config/site"
import { safeHttpUrl } from "../lib/format"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { PageHero } from "../components/PageChrome"
import { Seo } from "../components/Seo"

export function TestimonialsPage() {
  const meta = pageMeta("/testimonials")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Clients"
        title="Customer testimonials"
        lede="Words from people who have spoken with FinancialKatta, shared with their permission."
        crumbs={[{ label: "Home", to: "/" }, { label: "Testimonials" }]}
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        {verifiedTestimonials.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {verifiedTestimonials.map((item) => (
              <blockquote key={item.id} className="border-t border-line py-7">
                <p className="font-serif text-2xl leading-snug text-navy">“{item.quote}”</p>
                <footer className="mt-5 text-sm text-muted">
                  {item.name}
                  {item.context ? ` · ${item.context}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="max-w-2xl text-lg leading-relaxed text-ink">
            Client experiences are shared here only with the client’s permission.
          </p>
        )}
      </div>
    </>
  )
}

export function PartnersPage() {
  const meta = pageMeta("/partners")
  const visible = partners.filter((partner) => partner.name.trim())
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Practice"
        title="Associate partners"
        lede="Firms associated with FinancialKatta. You can also speak with us directly."
        crumbs={[{ label: "Home", to: "/" }, { label: "Associate partners" }]}
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        {visible.length === 0 ? (
          <p className="max-w-2xl text-lg leading-relaxed text-ink">
            There are no associate partners listed on this website. Clients meet FinancialKatta directly.
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((partner) => {
              const href = safeHttpUrl(partner.href)
              return (
                <li key={partner.name} className="border-t border-line py-6">
                  {partner.logoSrc ? (
                    <img src={partner.logoSrc} alt="" className="h-12 w-auto" loading="lazy" width={160} height={48} />
                  ) : null}
                  <h2 className="mt-4 font-serif text-2xl text-navy">{partner.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{partner.description}</p>
                  {href ? (
                    <a href={href} className="mt-4 inline-block text-sm font-semibold text-emerald" target="_blank" rel="noopener noreferrer">
                      Visit website
                    </a>
                  ) : null}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export function InvitationPage() {
  const meta = pageMeta("/invitation")
  const referral = safeHttpUrl(site.referralUrl)
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    if (!referral) return
    try {
      await navigator.clipboard.writeText(referral)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Invitation"
        title="Invitation programme"
        lede="Introduce someone who may want a clearer conversation about investments, insurance, loans or a financial plan."
        crumbs={[{ label: "Home", to: "/" }, { label: "Invitation programme" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-12">
        <div className="space-y-4 text-lg leading-relaxed text-ink lg:col-span-7">
          {site.referralIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            The person you invite should know you shared their interest. FinancialKatta will not describe your finances to
            them.
          </p>
        </div>
        <aside className="border-t border-line py-7 lg:col-span-5">
          <h2 className="font-serif text-2xl text-navy">Shareable link</h2>
          {referral ? (
            <>
              <p className="mt-3 break-all text-sm text-emerald">{referral}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={referral} className="bg-emerald px-4 py-3 text-sm font-semibold text-white" target="_blank" rel="noopener noreferrer">
                  Open link
                </a>
                <button type="button" onClick={copyLink} className="border border-navy px-4 py-3 text-sm font-semibold text-navy">
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              There is no separate referral link and no published reward. You can still{" "}
              <Link to="/contact" className="font-semibold text-emerald">
                start a conversation
              </Link>
              .
            </p>
          )}
        </aside>
      </div>
    </>
  )
}
