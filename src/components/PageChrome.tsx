import { Link } from "react-router-dom"
import type { Photo } from "../content/imagery"

export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text?: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">{title}</h2>
      {text ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{text}</p> : null}
    </div>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.to ? (
              <Link to={item.to} className="hover:text-forest">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  image,
}: {
  eyebrow: string
  title: string
  lede: string
  crumbs: { label: string; to?: string }[]
  image?: Photo
}) {
  return (
    <header className="hero-wash">
      <div className={`mx-auto grid max-w-[1240px] items-end gap-10 px-5 py-14 sm:py-20 ${image ? "lg:grid-cols-2" : ""}`}>
        <div>
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-leaf">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-light leading-[1.08] text-ink sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{lede}</p>
        </div>
        {image ? (
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 1024px) 46vw, 100vw"
            alt={image.alt}
            className="aspect-[4/3] w-full object-cover"
            width={1280}
            height={960}
          />
        ) : null}
      </div>
    </header>
  )
}

export function RiskList({ items }: { items: string[] }) {
  return (
    <aside className="border-t border-line pt-6">
      <h2 className="font-serif text-2xl font-medium text-ink">Please read this</h2>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  )
}
