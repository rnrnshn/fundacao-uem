import { createFileRoute, notFound } from '@tanstack/react-router'
import { getOffering } from '../lib/server-functions'
import { OfferingPage } from '../components/detail-pages'
import { pageSeo, homeCrumb } from '../lib/seo'
export const Route = createFileRoute('/servicos/$slug')({
  ssr: true,
  loader: async ({ params }) => { const detail = await getOffering({ data: params }); if (!detail || detail.offering.kind !== 'servicos') throw notFound(); return detail },
  head: ({ loaderData }) => loaderData ? pageSeo({ title: `${loaderData.offering.name} — demonstração`, description: `${loaderData.offering.description} Serviço ilustrativo; condições e contactos aguardam confirmação.`, path: `/servicos/${loaderData.offering.slug}`, noindex: loaderData.project.status === 'demo', breadcrumbs: [homeCrumb, { name: 'Serviços', path: '/servicos' }, { name: loaderData.offering.name, path: `/servicos/${loaderData.offering.slug}` }] }) : pageSeo({ title: 'Serviço não encontrado', description: 'O serviço solicitado não foi encontrado. Explore outros serviços no directório.', noindex: true }),
  component: () => <OfferingPage {...Route.useLoaderData()}/>,
})
