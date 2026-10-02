import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import stylesheet from '../styles.css?url'
import { Header } from '../components/header'
import { Footer } from '../components/home-completion'
import { pageSeo, siteDescription, siteName, siteUrl, jsonLd } from '../lib/seo'
import { PageMotion, NavigationProgress } from '../components/page-motion'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...pageSeo({ title: 'Projectos e talento local em Moçambique', description: siteDescription, noindex: true }).meta,
      { name: 'theme-color', content: '#348f7a' },
    ],
    links: [
      { rel: 'stylesheet', href: stylesheet },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap' },
    ],
    scripts: siteUrl ? [{ id: 'website-schema', type: 'application/ld+json', children: jsonLd({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: siteName, description: siteDescription, inLanguage: 'pt-MZ' }) }] : [],
  }),
  component: RootDocument,
  notFoundComponent: () => (
    <div className="header-container py-24 text-center">
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <Link to="/" className="mt-4 inline-block underline">Voltar ao início</Link>
    </div>
  ),
  errorComponent: ({ reset }) => <div className="header-container py-24 text-center"><h1 className="text-2xl font-bold">Não foi possível carregar a página</h1><p className="mt-4 text-body">Ocorreu um erro ao carregar os dados.</p><button onClick={reset} className="mt-6 bg-primary px-6 py-3 text-white">Tentar novamente</button></div>,
  pendingComponent: () => <div role="status" className="header-container py-24 text-center text-body">A carregar a página…</div>,
})

function RootDocument() {
  return (
    <html lang="pt-MZ">
      <head><HeadContent /></head>
      <body>
        <NavigationProgress />
        <Header />
        <main id="main" tabIndex={-1} className="min-h-[50svh] bg-white"><PageMotion><Outlet /></PageMotion></main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
