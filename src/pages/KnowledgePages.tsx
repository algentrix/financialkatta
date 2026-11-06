import { Link, useParams } from "react-router-dom"
import { awarenessTopics } from "../content/awareness"
import { getPost, postsByCategory } from "../content/blogs"
import { faqCategories, faqs } from "../content/faqs"
import { isYoutubeId, videos } from "../content/videos"
import { formatDisplayDate } from "../lib/format"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { site } from "../config/site"
import { NotFoundPage } from "./NotFoundPage"
import { PageHero } from "../components/PageChrome"
import { Seo } from "../components/Seo"

export function KnowledgePage() {
  const meta = pageMeta("/knowledge")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Knowledge Centre"
        title="Understand the decision before you make it"
        lede={meta.description}
        crumbs={[{ label: "Home", to: "/" }, { label: "Knowledge Centre" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-2">
        <HubCard to="/knowledge/blogs" title="Blogs" text="Short articles on SIPs, insurance, bonds and how to list a goal." />
        <HubCard to="/knowledge/awareness" title="Financial awareness" text="Reserves, inflation, risk, costs and the paperwork families forget." />
        <HubCard to="/knowledge/videos" title="Videos" text="Short explanations to watch. The articles cover the same topics in writing." />
        <HubCard to="/knowledge/faqs" title="FAQs" text="Direct answers on calculators, approvals, cover and registrations." />
      </div>
    </>
  )
}

function HubCard({ to, title, text }: { to: string; title: string; text: string }) {
  return (
    <Link to={to} className="block border-t border-line py-7 hover:text-forest">
      <h2 className="font-serif text-3xl text-navy">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted">{text}</p>
    </Link>
  )
}

export function BlogsPage() {
  const meta = pageMeta("/knowledge/blogs")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Knowledge Centre"
        title="Blogs"
        lede="Articles are grouped by subject. They explain a choice. They are not research reports and they are not personal advice."
        crumbs={[{ label: "Home", to: "/" }, { label: "Knowledge Centre", to: "/knowledge" }, { label: "Blogs" }]}
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <nav className="flex flex-wrap gap-3" aria-label="Article categories">
          {postsByCategory().map((group) => (
            <a key={group.title} href={`#${group.title.toLowerCase()}`} className="border border-line px-4 py-2 text-sm font-semibold text-ink hover:text-forest">
              {group.title}
            </a>
          ))}
        </nav>
        {postsByCategory().map((group) => (
          <section key={group.title} id={group.title.toLowerCase()} className="mt-12 scroll-mt-28">
            <h2 className="font-serif text-3xl text-navy">{group.title}</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              {group.posts.map((post) => (
                <article key={post.slug} className="flex h-full flex-col border-t border-line py-7">
                  <h3 className="font-serif text-2xl text-navy">{post.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{post.description}</p>
                  <p className="mt-4 text-sm text-muted">
                    {formatDisplayDate(post.date)} · {post.readingMinutes} min read
                  </p>
                  <Link to={`/knowledge/blogs/${post.slug}`} className="mt-4 text-sm font-semibold text-emerald">
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

export function BlogDetailPage() {
  const { slug = "" } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFoundPage />
  const meta = pageMeta(`/knowledge/blogs/${post.slug}`)
  const jsonLd = [
    breadcrumbJson(meta.crumbs),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { "@type": "Organization", name: site.name },
      publisher: { "@type": "Organization", name: site.name },
      mainEntityOfPage: `${site.domain}/knowledge/blogs/${post.slug}`,
    },
  ]
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={jsonLd} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        lede={post.description}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Knowledge Centre", to: "/knowledge" },
          { label: "Blogs", to: "/knowledge/blogs" },
          { label: post.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-sm text-muted">
          {formatDisplayDate(post.date)} · {post.readingMinutes} min read
        </p>
        <div className="mt-8 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-3xl text-navy">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-lg leading-relaxed text-ink">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-muted">
          This article is educational. It is not a recommendation to buy or sell any product. Read the{" "}
          <Link to="/disclaimer" className="font-semibold text-emerald">
            financial disclaimer
          </Link>
          .
        </p>
      </article>
    </>
  )
}

export function AwarenessPage() {
  const meta = pageMeta("/knowledge/awareness")
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Knowledge Centre"
        title="Financial awareness"
        lede="A few ideas that make later product conversations shorter. None of them is a target return."
        crumbs={[{ label: "Home", to: "/" }, { label: "Knowledge Centre", to: "/knowledge" }, { label: "Financial awareness" }]}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-5 py-14">
        {awarenessTopics.map((topic) => (
          <section key={topic.id} id={topic.id} className="scroll-mt-28">
            <h2 className="font-serif text-3xl text-navy">{topic.title}</h2>
            <div className="mt-3 space-y-4 leading-relaxed text-ink">
              {topic.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

export function VideosPage() {
  const meta = pageMeta("/knowledge/videos")
  const published = videos.filter((video) => isYoutubeId(video.youtubeId) && video.title.trim())
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Knowledge Centre"
        title="Videos"
        lede="Short explanations to watch. The articles and FAQs cover the same topics in writing."
        crumbs={[{ label: "Home", to: "/" }, { label: "Knowledge Centre", to: "/knowledge" }, { label: "Videos" }]}
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        {published.length === 0 ? (
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-navy">Start with the articles</h2>
            <p className="mt-4 leading-relaxed text-muted">
              The guides on SIPs, insurance, bonds and household planning are written out in full.
            </p>
            <Link to="/knowledge/blogs" className="mt-6 inline-block text-sm font-semibold text-emerald">
              Read the articles
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {published.map((video) => (
              <article key={video.id}>
                <div className="aspect-video bg-navy">
                  <iframe
                    title={video.title}
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h2 className="mt-4 font-serif text-2xl text-navy">{video.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{video.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export function FaqsPage() {
  const meta = pageMeta("/knowledge/faqs")
  const jsonLd = [
    breadcrumbJson(meta.crumbs),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ]
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={jsonLd} />
      <PageHero
        eyebrow="Knowledge Centre"
        title="FAQs"
        lede="Questions are grouped by subject. Where a decision is personal, the next step is a conversation."
        crumbs={[{ label: "Home", to: "/" }, { label: "Knowledge Centre", to: "/knowledge" }, { label: "FAQs" }]}
      />
      <div className="mx-auto max-w-3xl px-5 py-14">
        <nav className="flex flex-wrap gap-3" aria-label="FAQ categories">
          {faqCategories.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="border border-line px-4 py-2 text-sm font-semibold text-ink hover:text-forest">
              {category.title}
            </a>
          ))}
        </nav>
        {faqCategories.map((category) => (
          <section key={category.id} id={category.id} className="mt-12 scroll-mt-28">
            <h2 className="font-serif text-3xl text-navy">{category.title}</h2>
            <div className="mt-2">
              {category.items.map((faq) => (
                <details key={faq.question} className="group border-b border-line py-5">
                  <summary className="cursor-pointer list-none font-semibold text-navy [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {faq.question}
                      <span aria-hidden="true" className="text-emerald group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
