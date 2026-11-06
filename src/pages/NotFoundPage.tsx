import { Link } from "react-router-dom"
import { Seo } from "../components/Seo"
import { WhatsAppLink } from "../components/WhatsAppLink"

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | FinancialKatta"
        description="This page is not on the FinancialKatta website."
        path="/404"
        noindex
      />
      <div className="mx-auto max-w-3xl px-5 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">404</p>
        <h1 className="mt-3 font-serif text-5xl font-medium leading-[1.08] text-ink">This page is not here</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The address may be mistyped, or the page may have moved. The services, calculators and contact details are still
          on the main site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-sage inline-flex">
            Back to home
          </Link>
          <WhatsAppLink intent="general" className="btn-line inline-flex">
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </>
  )
}
