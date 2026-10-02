import { createFileRoute, notFound } from '@tanstack/react-router'
import { getOffering } from '../lib/server-functions'
import { OfferingPage } from '../components/detail-pages'
import { pageSeo, homeCrumb } from '../lib/seo'
export const Route = createFileRoute('/produtos/$slug')({
  ssr: true,
  loader: async ({ params }) => { const detail = await getOffering({ data: params }); if (!detail || detail.offering.kind !== 'produtos') throw notFound(); return detail },
  head: ({ loaderData }) => loaderData ? pageSeo({ title: `${loaderData.offering.name} — demonstração`, description: `${loaderData.offering.description} Produto ilustrativo, sem preço ou disponibilidade confirmados.`, path: `/produtos/${loaderData.offering.slug}`, noindex: loaderData.project.status === 'demo', breadcrumbs: [homeCrumb, { name: 'Produtos', path: '/produtos' }, { name: loaderData.offering.name, path: `/produtos/${loaderData.offering.slug}` }] }) : pageSeo({ title: 'Produto não encontrado', description: 'O produto solicitado não foi encontrado. Consulte o catálogo de produtos locais.', noindex: true }),
  component: () => <OfferingPage {...Route.useLoaderData()}/>,
})
