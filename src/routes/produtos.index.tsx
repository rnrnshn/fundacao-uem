import { createFileRoute } from '@tanstack/react-router'
import { validateCatalogSearch, catalogSearchMiddleware } from '../lib/catalog'
import { getCatalog } from '../lib/server-functions'
import { Directory } from '../components/directory'
import { PageBanner } from '../components/page-ui'
import { catalogSeo } from '../lib/seo'
export const Route = createFileRoute('/produtos/')({
  ssr: true, validateSearch: validateCatalogSearch,
  search: { middlewares: [catalogSearchMiddleware] },
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getCatalog({ data: { search: { ...deps, tipo: 'todos' }, kind: 'produtos' } }),
  head: ({ match, loaderData }) => catalogSeo({ title: 'Produtos locais de Moçambique', description: 'Descubra produtos agrícolas e alimentos de iniciativas locais. Explore o catálogo de demonstração por província, categoria e projecto.', path: '/produtos', search: match.search, page: loaderData?.page }),
  component: Page,
})
function Page() { const navigate = Route.useNavigate(); return <><PageBanner title="Produtos locais"/><Directory kind="produtos" data={Route.useLoaderData()} search={Route.useSearch()} onSearch={search => { void navigate({ search }) }}/></> }
