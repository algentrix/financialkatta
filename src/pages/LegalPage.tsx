import { getLegalDocument, type LegalDocument } from "../content/legal"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { PageHero } from "../components/PageChrome"
import { Seo } from "../components/Seo"

export function LegalPage({ id }: { id: LegalDocument["id"] }) {
  const document = getLegalDocument(id)
  if (!document) return null
  const meta = pageMeta(document.path)
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Legal"
        title={document.title}
        lede={document.description}
        crumbs={[{ label: "Home", to: "/" }, { label: document.title }]}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-5 py-14">
        {document.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="font-serif text-3xl text-navy">{section.heading}</h2>
            <div className="mt-3 space-y-4 leading-relaxed text-ink">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
