import { Link } from "react-router-dom"
import { aboutContent } from "../content/about"
import { publishedRegistrations } from "../config/site"
import { advisor, advisorIsPublished } from "../content/advisor"
import { visionContent } from "../content/vision"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { PageHero } from "../components/PageChrome"
import { Seo } from "../components/Seo"
import { WhatsAppLink } from "../components/WhatsAppLink"

export function AboutPage() {
  const meta = pageMeta("/about")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero eyebrow="About us" title={aboutContent.title} lede={aboutContent.description} crumbs={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed text-ink lg:col-span-7">
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/about/vision" className="btn-sage inline-flex">
              Vision and mission
            </Link>
            <Link to="/about/advisor" className="btn-line inline-flex">
              Advisor profile
            </Link>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-5">
          {aboutContent.principles.map((principle) => (
            <article key={principle.title} className="border-t border-line py-6">
              <h2 className="font-serif text-2xl text-navy">{principle.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{principle.text}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export function AdvisorPage() {
  const meta = pageMeta("/about/advisor")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="About us"
        title="Advisor profile"
        lede={
          advisorIsPublished
            ? `${advisor.name} is a mutual fund distributor in Pune. AMFI ARN 272207.`
            : "Ask us on WhatsApp and we will tell you who you will be speaking with."
        }
        crumbs={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Advisor" }]}
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        {advisorIsPublished ? (
          <article className="grid items-start gap-10 lg:grid-cols-12">
            {advisor.photoSrc ? (
              <img
                src={advisor.photoSrc}
                alt={advisor.photoAlt || advisor.name}
                className="aspect-[4/5] w-full object-cover object-top lg:col-span-4"
                loading="lazy"
              />
            ) : null}
            <div className={advisor.photoSrc ? "lg:col-span-8" : "lg:col-span-12"}>
              <h2 className="font-serif text-4xl text-navy">{advisor.name}</h2>
              {advisor.role ? <p className="mt-2 text-emerald">{advisor.role}</p> : null}
              {advisor.experience ? <p className="mt-4 text-muted">{advisor.experience}</p> : null}
              <ProfileList title="Registrations" items={publishedRegistrations.map((item) => `${item.label} ${item.value}`)} />
              <ProfileList title="Qualifications" items={advisor.qualifications} />
              <ProfileList title="Certifications" items={advisor.certifications} />
              <div className="mt-6 space-y-4 leading-relaxed text-ink">
                {advisor.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        ) : (
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-navy">Speak with us directly</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Message us on WhatsApp and we will tell you who will take the conversation.
            </p>
            <WhatsAppLink intent="general" className="mt-6 inline-flex items-center gap-2 bg-emerald px-5 py-3 text-sm font-semibold text-white">
              Ask on WhatsApp
            </WhatsAppLink>
          </div>
        )}
      </div>
    </>
  )
}

function ProfileList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function VisionPage() {
  const meta = pageMeta("/about/vision")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="About us"
        title={visionContent.title}
        lede={visionContent.description}
        crumbs={[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Vision and mission" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-2">
        <article className="bg-night p-8 text-white">
          <h2 className="font-serif text-3xl">Vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">{visionContent.vision}</p>
        </article>
        <article className="border-t border-line pt-8">
          <h2 className="font-serif text-3xl text-navy">Mission</h2>
          <ul className="mt-4 space-y-3 leading-relaxed text-ink">
            {visionContent.mission.map((item) => (
              <li key={item} className="border-t border-line pt-3">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  )
}
