import { createFileRoute, notFound } from '@tanstack/react-router'
import { provinceRecords, validateCatalogSearch, catalogSearchMiddleware } from '../lib/catalog'
import { getCatalog } from '../lib/server-functions'
import { Directory } from '../components/directory'
import { PageBanner } from '../components/page-ui'
import { catalogSeo, pageSeo } from '../lib/seo'
export const Route = createFileRoute('/provincias/$slug')({
  ssr: true, validateSearch: validateCatalogSearch,
  search: { middlewares: [catalogSearchMiddleware] },
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, params }) => { const province = provinceRecords.find(p => p.slug === params.slug); if (!province) throw notFound(); return { province, data: await getCatalog({ data: { search: { ...deps, provincia: province.name }, kind: 'projectos' } }) } },
  head: ({ loaderData, match }) => loaderData ? catalogSeo({ title: `Projectos em ${loaderData.province.name}`, description: `Explore exemplos de projectos, produtos e serviços de mulheres e jovens em ${loaderData.province.name}. Filtre por categoria e actividade no directório.`, path: `/provincias/${loaderData.province.slug}`, search: match.search, page: loaderData.data.page }) : pageSeo({ title: 'Província não encontrada', description: 'A província solicitada não foi encontrada. Explore o directório de Moçambique.', noindex: true }),
  component: Page,
})
function Page() { const { province, data } = Route.useLoaderData(); const navigate = Route.useNavigate(); return <><PageBanner title={province.name} parent="Províncias"/><Directory data={data} province={province.name} search={Route.useSearch()} onSearch={search => { void navigate({ search: { ...search, provincia: '' } }) }}/></> }
