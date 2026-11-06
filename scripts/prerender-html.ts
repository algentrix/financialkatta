import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { site } from "../src/config/site.ts"
import { allPages, breadcrumbJson } from "../src/seo/sitePages.ts"

const dist = join(process.cwd(), "dist")
const shell = readFileSync(join(dist, "index.html"), "utf8")

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function setContent(html: string, key: string, value: string) {
  const pattern = new RegExp(`(data-seo="${key}"[^>]*content=")[^"]*`)
  if (!pattern.test(html)) throw new Error(`Could not set meta ${key}`)
  return html.replace(pattern, `$1${escapeHtml(value)}`)
}

for (const page of allPages()) {
  const url = `${site.domain}${page.path}`
  let html = shell
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/, `<title data-seo="title">${escapeHtml(page.title)}</title>`)
  html = setContent(html, "description", page.description)
  html = setContent(html, "og:title", page.title)
  html = setContent(html, "og:description", page.description)
  html = setContent(html, "og:url", url)
  html = setContent(html, "twitter:title", page.title)
  html = setContent(html, "twitter:description", page.description)
  html = html.replace(/(data-seo="canonical"[^>]*href=")[^"]*/, `$1${escapeHtml(url)}`)
  const breadcrumb = JSON.stringify(breadcrumbJson(page.crumbs))
  html = html.replace(/(<script\s+data-seo="breadcrumb"[^>]*>)[\s\S]*?(<\/script>)/, `$1${breadcrumb}$2`)
  const target = page.path === "/" ? join(dist, "index.html") : join(dist, page.path.slice(1), "index.html")
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html)
}

console.log(`Prerendered ${allPages().length} HTML routes.`)
