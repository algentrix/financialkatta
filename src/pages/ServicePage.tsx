import { Link, useParams } from "react-router-dom"
import { getService } from "../content/services"
import { serviceGuides, servicePhotos } from "../content/imagery"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { NotFoundPage } from "./NotFoundPage"
import { PageHero, RiskList } from "../components/PageChrome"
import { Seo } from "../components/Seo"
import { WhatsAppLink } from "../components/WhatsAppLink"

export function ServicePage() {
  const { slug = "" } = useParams()
  const service = getService(slug)
  if (!service) return <NotFoundPage />
  const meta = pageMeta(`/services/${service.slug}`)
  const guide = serviceGuides[service.slug]
  const photo = servicePhotos[service.slug]
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Services"
        title={service.title}
        lede={guide?.everyday ?? service.summary}
        crumbs={[{ label: "Home", to: "/" }, { label: service.navLabel }]}
        image={photo}
      />
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-8">
          <section className="border-t border-line pt-8">
            <h2 className="font-serif text-3xl font-medium text-ink">What this means in practice</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{service.intro}</p>
          </section>
          {service.sections.map((section) => (
            <section key={section.heading} className="mt-12 border-t border-line pt-8">
              <h2 className="font-serif text-3xl font-medium text-ink">{section.heading}</h2>
              <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-ink">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.points ? (
                <ol className="mt-5 max-w-2xl list-decimal space-y-2 pl-5 leading-relaxed text-ink">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ol>
              ) : null}
            </section>
          ))}
          {guide ? (
            <section className="mt-12">
              <h2 className="font-serif text-3xl font-medium text-ink">Questions people ask</h2>
              <div className="mt-4 divide-y divide-line border-y border-line">
                {guide.questions.map((item) => (
                  <details key={item.q} className="py-5">
                    <summary className="cursor-pointer font-serif text-xl font-medium text-ink">{item.q}</summary>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted">{item.a}</p>
                  </details>
                ))}
              </div>
              <Link to="/knowledge/faqs" className="mt-6 inline-block text-sm font-semibold text-forest underline decoration-leaf/50 underline-offset-4">
                More questions
              </Link>
            </section>
          ) : null}
        </div>
        <aside className="space-y-8 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">Talk this through</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              An enquiry is a conversation about your requirements. It is not an approval, a quotation or a promise of cover.
            </p>
            <WhatsAppLink intent={service.intent} className="btn-sage mt-5 inline-flex w-full">
              Talk to Us
            </WhatsAppLink>
          </div>
          {service.calculators.length > 0 ? (
            <div className="border-t border-line pt-6">
              <h2 className="font-serif text-2xl font-medium text-ink">Related calculators</h2>
              <ul className="mt-3 space-y-2">
                {service.calculators.map((calculator) => (
                  <li key={calculator.to}>
                    <Link to={calculator.to} className="text-sm font-semibold text-forest underline decoration-leaf/50 underline-offset-4">
                      {calculator.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <RiskList items={service.risks} />
        </aside>
      </div>
    </>
  )
}
