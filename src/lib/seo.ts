import type { CatalogSearch } from './catalog'

export const siteName = 'Fundação Universitária'
export const siteDescription = 'Descubra projectos, produtos e serviços de mulheres e jovens em Moçambique. Explore por província e conheça o talento das comunidades locais.'

// Public build-time settings shared by SSR and client navigation. Never use request
// Host headers to build canonical URLs, and never guess the production domain.
export function parseSiteUrl(value: string | undefined) {
  if (!value?.trim()) return undefined
  const url = new URL(value.trim())
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('VITE_SITE_URL must be an http(s) origin without credentials, path, query or fragment.')
  }
  return url.origin
}
export const siteUrl = parseSiteUrl(import.meta.env.VITE_SITE_URL)
export const indexingEnabled = !!siteUrl && import.meta.env.VITE_SEO_INDEXABLE === 'true'
export const absoluteUrl = (path: string) => siteUrl ? new URL(path, `${siteUrl}/`).href : undefined
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')

type Breadcrumb = { name: string; path: string }
type SeoOptions = {
  title: string
  description: string
  path?: string
  noindex?: boolean
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage'
  breadcrumbs?: Breadcrumb[]
}

export function pageSeo({ title, description, path, noindex = false, type = 'WebPage', breadcrumbs = [] }: SeoOptions) {
  const fullTitle = `${title} | ${siteName}`
  const canonical = path ? absoluteUrl(path) : undefined
  const image = absoluteUrl('/og-image.png')
  const robots = noindex || !indexingEnabled ? 'noindex, follow' : 'index, follow, max-image-preview:large'
  const meta = [
    { title: fullTitle },
    { name: 'description', content: description },
    { name: 'robots', content: robots },
    { property: 'og:site_name', content: siteName },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'pt_MZ' },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    ...(canonical ? [{ property: 'og:url', content: canonical }] : []),
    ...(image ? [
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Fundação Universitária — projectos, produtos e serviços locais em Moçambique.' },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: 'Fundação Universitária — talento local em Moçambique.' },
    ] : []),
  ]
  const graph: Record<string, unknown>[] = canonical ? [{
    '@type': type, '@id': `${canonical}#page`, url: canonical, name: fullTitle,
    description, inLanguage: 'pt-MZ', isPartOf: { '@id': `${siteUrl}/#website` },
  }] : []
  if (canonical && breadcrumbs.length > 1) graph.push({
    '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, name: crumb.name, item: absoluteUrl(crumb.path) })),
  })
  return {
    meta,
    links: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    scripts: graph.length ? [{ id: 'page-schema', type: 'application/ld+json', children: jsonLd({ '@context': 'https://schema.org', '@graph': graph }) }] : [],
  }
}

export const homeCrumb: Breadcrumb = { name: 'Início', path: '/' }
export function catalogSeo({ title, description, path, search, page = 1 }: { title: string; description: string; path: string; search: CatalogSearch; page?: number }) {
  // Faceted/search URLs are not landing pages. Pagination keeps its own canonical;
  // sort/view/tracking parameters never create duplicate canonical URLs.
  const filtered = !!(search.q || search.categoria || search.provincia || search.publico !== 'todos' || search.tipo !== 'todos')
  const canonicalPath = !filtered && page > 1 ? `${path}?pagina=${page}` : path
  return pageSeo({ title: `${title}${page > 1 ? ` — página ${page}` : ''}`, description, path: canonicalPath,
    // The current repository consists entirely of demo records. Keep these pages
    // excluded even after informational pages are enabled for indexing.
    noindex: true, type: 'CollectionPage', breadcrumbs: [homeCrumb, { name: title, path }],
  })
}

// Only informational routes are eligible. Demo records, fixture catalogues,
// search/filter URLs and unapproved province listings never enter the sitemap.
export const sitemapPaths = ['/', '/sobre', '/contacto', '/privacidade', '/provincias'] as const
export function sitemapXml() {
  const locations = indexingEnabled ? sitemapPaths.map(path => `<url><loc>${absoluteUrl(path)!.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</loc></url>`).join('') : ''
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>\n`
}
export function robotsTxt() {
  // Allow page crawling so crawlers can see noindex; Disallow:/ would hide it.
  return `User-agent: *\nAllow: /\nDisallow: /_server/\n${indexingEnabled ? `\nSitemap: ${absoluteUrl('/sitemap.xml')}\n` : '\n# Preview: pages carry noindex; no sitemap is advertised.\n'}`
}
