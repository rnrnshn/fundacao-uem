import { createFileRoute } from '@tanstack/react-router'
import { validateCatalogSearch, catalogSearchMiddleware } from '../lib/catalog'
import { getCatalog } from '../lib/server-functions'
import { Directory } from '../components/directory'
import { PageBanner } from '../components/page-ui'
import { catalogSeo } from '../lib/seo'
export const Route = createFileRoute('/projectos/')({
  ssr: true, validateSearch: validateCatalogSearch,
  search: { middlewares: [catalogSearchMiddleware] },
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getCatalog({ data: { search: deps, kind: 'projectos' } }),
  head: ({ match, loaderData }) => catalogSeo({ title: 'Projectos em Moçambique', description: 'Explore o directório de projectos de mulheres e jovens por província, categoria e actividade. Catálogo de demonstração com filtros de pesquisa.', path: '/projectos', search: match.search, page: loaderData?.page }),
  component: Page,
})
function Page() { const navigate = Route.useNavigate(); return <><PageBanner title="Explorar projectos"/><Directory data={Route.useLoaderData()} search={Route.useSearch()} onSearch={search => { void navigate({ search }) }}/></> }
