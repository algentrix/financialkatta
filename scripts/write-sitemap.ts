import { writeFileSync } from "node:fs"
import { site } from "../src/config/site.ts"
import { allPages } from "../src/seo/sitePages.ts"

const urls = allPages()
  .map(
    (page) => `  <url>
    <loc>${site.domain}${page.path}</loc>
    <lastmod>${site.contentUpdated}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml)

const redirects = allPages()
  .filter((page) => page.path !== "/")
  .flatMap((page) => {
    const target = `${page.path}/index.html`
    return [`${page.path}    ${target}    200`, `${page.path}/    ${target}    200`]
  })
  .join("\n")

writeFileSync(
  new URL("../public/_redirects", import.meta.url),
  `${redirects}\n/*    /index.html   200\n`,
)

console.log(`Wrote sitemap with ${allPages().length} urls.`)
