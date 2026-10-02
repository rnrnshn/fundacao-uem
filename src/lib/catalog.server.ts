import '@tanstack/react-start/server-only'
import { photo, type Project, type Offering, type CatalogSearch, type EntryKind, type CatalogEntry, type CatalogResult } from './catalog'

// Development fixtures, never presented as approved organisations or available offers.
// Replace this repository with approved records without changing the route/server-function API.
const projects: Project[] = [
  { slug: 'horta-comunitaria', name: 'Horta Comunitária', province: 'Manica', audience: 'mulheres', category: 'Agricultura e alimentos', description: 'Exemplo de uma iniciativa dedicada à produção de hortícolas e à ligação entre produtores e comunidades.', image: photo('photo-1542838132-92c53300491e'), gallery: [photo('photo-1546094096-0df4bcaaa337'), photo('photo-1500382017468-9049fed747ef')], status: 'demo' },
  { slug: 'frutos-da-terra', name: 'Frutos da Terra', province: 'Nampula', audience: 'jovens', category: 'Agricultura e alimentos', description: 'Exemplo de um projecto de jovens que apresenta fruta da época e valoriza a produção local.', image: photo('photo-1619566636858-adf3ef46400b'), gallery: [photo('photo-1553279768-865429fa0078'), photo('photo-1523049673857-eb18f1d7b578')], status: 'demo' },
  { slug: 'saberes-em-maos', name: 'Saberes em Mãos', province: 'Inhambane', audience: 'mulheres', category: 'Artesanato', description: 'Exemplo de uma iniciativa de artesanato e oficinas criativas que partilha técnicas e conhecimentos.', image: photo('photo-1452860606245-08befc0ff44b'), gallery: [], status: 'demo' },
  { slug: 'jovens-conectados', name: 'Jovens Conectados', province: 'Cidade de Maputo', audience: 'jovens', category: 'Serviços', description: 'Exemplo de serviços de comunicação e ferramentas digitais para pequenos negócios.', image: photo('photo-1522071820081-009f0129c71c'), gallery: [], status: 'demo' },
  { slug: 'sabores-da-zambezia', name: 'Sabores da Zambézia', province: 'Zambézia', audience: 'ambos', category: 'Agricultura e alimentos', description: 'Exemplo de uma montra de alimentos e produtos da terra, reunindo mulheres e jovens.', image: photo('photo-1447933601403-0c6688de566e'), gallery: [photo('photo-1587049352851-8d4e89133924')], status: 'demo' },
  { slug: 'mercado-local', name: 'Mercado Local', province: 'Maputo Província', audience: 'ambos', category: 'Comércio', description: 'Exemplo de uma iniciativa que facilita a apresentação de produtos de pequenos negócios locais.', image: photo('photo-1542838132-92c53300491e'), gallery: [], status: 'demo' },
  { slug: 'oficina-criativa', name: 'Oficina Criativa', province: 'Sofala', audience: 'jovens', category: 'Serviços', description: 'Exemplo de um espaço de aprendizagem e criação, com oficinas práticas para a comunidade.', image: photo('photo-1452860606245-08befc0ff44b'), gallery: [], status: 'demo' },
  { slug: 'cultivar-juntos', name: 'Cultivar Juntos', province: 'Gaza', audience: 'mulheres', category: 'Agricultura e alimentos', description: 'Exemplo de um projecto de agricultura que reúne conhecimentos e produtos hortícolas.', image: photo('photo-1500382017468-9049fed747ef'), gallery: [], status: 'demo' },
]
const offerings: Offering[] = [
  { slug: 'tomate-fresco', name: 'Tomate fresco', projectSlug: 'horta-comunitaria', kind: 'produtos', image: photo('photo-1546094096-0df4bcaaa337'), description: 'Exemplo de apresentação de tomate no catálogo agrícola.', price: null, unit: null },
  { slug: 'abacate', name: 'Abacate', projectSlug: 'frutos-da-terra', kind: 'produtos', image: photo('photo-1523049673857-eb18f1d7b578'), description: 'Exemplo de apresentação de fruta. Variedade e unidade a confirmar.', price: null, unit: null },
  { slug: 'manga', name: 'Manga', projectSlug: 'frutos-da-terra', kind: 'produtos', image: photo('photo-1553279768-865429fa0078'), description: 'Exemplo de apresentação de manga no catálogo de produtos locais.', price: null, unit: null },
  { slug: 'mel', name: 'Mel', projectSlug: 'sabores-da-zambezia', kind: 'produtos', image: photo('photo-1587049352851-8d4e89133924'), description: 'Exemplo de apresentação de um produto alimentar. Origem e embalagem a confirmar.', price: null, unit: null },
  { slug: 'cafe-em-grao', name: 'Café em grão', projectSlug: 'sabores-da-zambezia', kind: 'produtos', image: photo('photo-1447933601403-0c6688de566e'), description: 'Exemplo de apresentação de café. Variedade e embalagem a confirmar.', price: null, unit: null },
  { slug: 'fruta-da-epoca', name: 'Fruta da época', projectSlug: 'mercado-local', kind: 'produtos', image: photo('photo-1619566636858-adf3ef46400b'), description: 'Exemplo de uma selecção de frutas num catálogo local.', price: null, unit: null },
  { slug: 'horticolas-variadas', name: 'Hortícolas variadas', projectSlug: 'cultivar-juntos', kind: 'produtos', image: photo('photo-1542838132-92c53300491e'), description: 'Exemplo de uma selecção de hortícolas.', price: null, unit: null },
  { slug: 'oficinas-de-artesanato', name: 'Oficinas de artesanato', projectSlug: 'saberes-em-maos', kind: 'servicos', image: photo('photo-1452860606245-08befc0ff44b'), description: 'Exemplo de oficinas de técnicas criativas e artesanato. Condições e calendário a confirmar.', price: null, unit: null },
  { slug: 'comunicacao-digital', name: 'Comunicação digital', projectSlug: 'jovens-conectados', kind: 'servicos', image: photo('photo-1522071820081-009f0129c71c'), description: 'Exemplo de apoio à comunicação digital de pequenos negócios.', price: null, unit: null },
  { slug: 'formacao-criativa', name: 'Formação criativa', projectSlug: 'oficina-criativa', kind: 'servicos', image: photo('photo-1452860606245-08befc0ff44b'), description: 'Exemplo de formação prática orientada para novas competências.', price: null, unit: null },
]
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
export function listCatalog(search: CatalogSearch, kind: EntryKind): CatalogResult {
  let entries: CatalogEntry[] = kind === 'projectos'
    ? projects.map(p => ({ ...p, kind, projectSlug: p.slug, projectName: p.name, price: null, unit: null }))
    : offerings.filter(o => o.kind === kind).map(o => { const p = projects.find(p => p.slug === o.projectSlug)!; return { ...o, province: p.province, audience: p.audience, category: p.category, projectName: p.name } })
  entries = entries.filter(e => (!search.provincia || e.province === search.provincia)
    && (!search.categoria || e.category === search.categoria)
    && (search.publico === 'todos' || e.audience === search.publico || e.audience === 'ambos')
    && (search.tipo === 'todos' || (e.kind === 'projectos' ? offerings.some(o => o.projectSlug === e.slug && o.kind === search.tipo) : e.kind === search.tipo))
    && (!search.q || normalize(`${e.name} ${e.description} ${e.projectName} ${e.province} ${e.kind === 'projectos' ? offerings.filter(o => o.projectSlug === e.slug).map(o => o.name).join(' ') : ''}`).includes(normalize(search.q))))
  entries.sort((a, b) => a.name.localeCompare(b.name, 'pt') * (search.ordem === 'nome-desc' ? -1 : 1))
  const total = entries.length, perPage = 6, pages = Math.max(1, Math.ceil(total / perPage)), page = Math.min(search.pagina, pages)
  return { items: entries.slice((page - 1) * perPage, page * perPage), total, pages, page, perPage }
}
export function projectDetail(slug: string) { const project = projects.find(p => p.slug === slug); return project ? { project, offerings: offerings.filter(o => o.projectSlug === slug) } : null }
export function offeringDetail(slug: string) { const offering = offerings.find(o => o.slug === slug); return offering ? { offering, project: projects.find(p => p.slug === offering.projectSlug)! } : null }
export function relatedProjects(slug: string) { const current = projects.find(p => p.slug === slug); return projects.filter(p => p.slug !== slug).sort((a,b) => Number(b.category === current?.category) - Number(a.category === current?.category)).slice(0, 3) }
