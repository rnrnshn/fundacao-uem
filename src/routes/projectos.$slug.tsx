import { createFileRoute, notFound } from '@tanstack/react-router'
import { getProject, getRelated } from '../lib/server-functions'
import { ProjectPage } from '../components/detail-pages'
import { pageSeo, homeCrumb } from '../lib/seo'
export const Route = createFileRoute('/projectos/$slug')({
  ssr: true,
  loader: async ({ params }) => { const detail = await getProject({ data: params }); if (!detail) throw notFound(); return { ...detail, related: getRelated({ data: params }) } },
  head: ({ loaderData }) => loaderData ? pageSeo({ title: `${loaderData.project.name} — demonstração`, description: `${loaderData.project.description} Ficha de demonstração; não representa um projecto aprovado.`, path: `/projectos/${loaderData.project.slug}`, noindex: loaderData.project.status === 'demo', breadcrumbs: [homeCrumb, { name: 'Projectos', path: '/projectos' }, { name: loaderData.project.name, path: `/projectos/${loaderData.project.slug}` }] }) : pageSeo({ title: 'Projecto não encontrado', description: 'O projecto solicitado não foi encontrado. Explore outras iniciativas no directório.', noindex: true }),
  component: Page,
})
function Page() { const data = Route.useLoaderData(); return <ProjectPage key={data.project.slug} {...data}/> }
