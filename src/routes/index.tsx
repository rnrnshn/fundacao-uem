import { createFileRoute, redirect } from '@tanstack/react-router'
import { provinceSlug, validateCatalogSearch, catalogSearchMiddleware } from '../lib/catalog'
import { DiscoveryHero, PromotionalBanners, ProductShowcase } from '../components/home-sections'
import { FeatureBanner, CommunityBanners } from '../components/community-banners'
import { ProvinceBanners, HowItWorks } from '../components/home-completion'
import { pageSeo, siteDescription } from '../lib/seo'

export const Route = createFileRoute('/')({
  ssr: true,
  head: () => pageSeo({ title: 'Projectos de mulheres e jovens em Moçambique', description: siteDescription, path: '/' }),
  validateSearch: validateCatalogSearch,
  search: { middlewares: [catalogSearchMiddleware] },
  // Preserve old homepage filter URLs while moving discovery to dedicated routes.
  beforeLoad: ({ search }) => {
    if (search.provincia) throw redirect({ to: '/provincias/$slug', params: { slug: provinceSlug(search.provincia) }, search: { ...search, provincia: '' } })
    if (search.tipo !== 'todos') throw redirect({ to: search.tipo === 'produtos' ? '/produtos' : '/servicos', search: { ...search, tipo: 'todos' } })
    if (search.q || search.categoria || search.publico !== 'todos') throw redirect({ to: '/projectos', search })
  },
  component: () => <><DiscoveryHero/><PromotionalBanners/><ProductShowcase/><FeatureBanner/><ProductShowcase collection/><CommunityBanners/><ProductShowcase collection sectionId="local-selection" title="Selecção de produtos locais" tabsOnly offset={2}/><ProvinceBanners/><ProductShowcase collection sectionId="discover-more" title="Mais para descobrir" offset={4}/><HowItWorks/></>,
})
