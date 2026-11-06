import { useLayoutEffect } from "react"
import { Helmet } from "react-helmet-async"
import { site } from "../config/site"

type SeoProps = {
  title: string
  description: string
  path: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

export function Seo({ title, description, path, jsonLd, noindex }: SeoProps) {
  useLayoutEffect(() => {
    document.head.querySelectorAll("[data-seo]").forEach((node) => node.remove())
  }, [])

  const url = `${site.domain}${path}`
  const image = `${site.domain}/og-image.png`
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {noindex ? <meta name="robots" content="noindex" /> : <meta name="robots" content="index, follow" />}
      {blocks.map((block) => (
        <script key={JSON.stringify(block).slice(0, 48)} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
