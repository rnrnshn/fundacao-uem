import { createFileRoute } from '@tanstack/react-router'
import { validateCatalogSearch, catalogSearchMiddleware } from '../lib/catalog'
import { getCatalog } from '../lib/server-functions'
import { Directory } from '../components/directory'
import { PageBanner } from '../components/page-ui'
import { catalogSeo } from '../lib/seo'
export const Route = createFileRoute('/servicos/')({
  ssr: true, validateSearch: validateCatalogSearch,
  search: { middlewares: [catalogSearchMiddleware] },
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getCatalog({ data: { search: { ...deps, tipo: 'todos' }, kind: 'servicos' } }),
  head: ({ match, loaderData }) => catalogSeo({ title: 'Serviços locais em Moçambique', description: 'Encontre exemplos de serviços, formação e iniciativas criativas de mulheres e jovens em Moçambique. Pesquise por província e categoria.', path: '/servicos', search: match.search, page: loaderData?.page }),
  component: Page,
})
function Page() { const navigate = Route.useNavigate(); return <><PageBanner title="Serviços locais"/><Directory kind="servicos" data={Route.useLoaderData()} search={Route.useSearch()} onSearch={search => { void navigate({ search }) }}/></> }
